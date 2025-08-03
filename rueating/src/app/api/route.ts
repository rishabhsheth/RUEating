import { NextResponse } from "next/server" 
import postgres from "postgres";

import { createClient } from '@supabase/supabase-js'
// Create a single supabase client for interacting with your database

// Allowed campuses hardcoded in this file
const ALLOWED_LOCATIONS = ["Busch", "Livingston", "Neilson", "The Atrium"]

function validateLocations(raw: string | undefined): string[] {
  if (!raw) return []

  // Parse comma-separated input and filter allowed ones
  return raw
    .split(",")
    .map(loc => loc.trim())
    .filter(loc => ALLOWED_LOCATIONS.includes(loc))
}

const supabase = createClient(
  process.env.API_HOST!,    // https://zzrmamcywlcbpqtaaobv.supabase.co
  process.env.PUBLIC_API_KEY! // your anon/public API key
);

async function fetchData(data: string, locations: string[]): Promise<string[][]> {
  const { data: result, error } = await supabase
    .rpc('query_food_location', { f: data, locations: locations });

  if (error) {
    console.error('Supabase RPC error:', error);
    return [[]];
  }

  const rowsAsArrays: string[][] = result.map((row: postgres.Row) => Object.values(row).map(String));
  return rowsAsArrays;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const input = searchParams.get("input") || ""
  const rawLocations = searchParams.get("locations") || ""
  // console.log("Input: %s, Locations: %s", input, rawLocations)

  const validatedLocations = validateLocations(rawLocations)

  // console.log("Validated Locations:", validatedLocations, validatedLocations.length)

  if (!input || validatedLocations.length == 0) {
    return NextResponse.json({ error: "Input is required" }, { status: 200 })
  }

  // console.log(input)
  // const array = fetchData(input);

  // var variable_data = null;

  // fetchData(input)
  // .then(data => variable_data = data)

  const data = await fetchData(input, validatedLocations);
  // console.log(data)

  return NextResponse.json({data: data});

//   // Simulate backend processing
//   const processedData = [
//     [input, input.split("").reverse().join(""), input.length.toString()],
//     [input.toUpperCase(), input.toLowerCase(), (input.match(/[aeiou]/gi) || []).length.toString()],
//     [
//       input.slice(0, Math.floor(input.length / 2)),
//       input.slice(Math.floor(input.length / 2)),
//       input.split(" ").length.toString(),
//     ],
//     // Add more rows based on input length
//     ...[...Array(Math.min(5, Math.floor(input.length / 3)))].map((_, i) => [
//       input.slice(i * 3, (i + 1) * 3),
//       input
//         .slice(-((i + 1) * 3), -(i * 3) || undefined)
//         .split("")
//         .reverse()
//         .join(""),
//       (input.charCodeAt(i) || 0).toString(),
//     ]),
//   ]

//   return NextResponse.json({ data: processedData })
// }

  // const processedData = input.split("").map((char) => [char, char.charCodeAt(0).toString()]);
  // console.log(NextResponse.json({ data: processedData }))
  // console.log(processedData)
  // return NextResponse.json({ data: processedData });
}
