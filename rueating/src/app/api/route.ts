import { NextResponse } from "next/server" 
import axios from "axios";


async function fetchData (data: String) : Promise<String[][]> {
  try { 
    const response = await axios.post('http://localhost:5228/api/getquery', {
      food: data
    });
    // console.log(response.data)
    // return new Promise(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
  return [[]];
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const input = searchParams.get("input")

  if (!input) {
    
    return NextResponse.json({ error: "Input is required" }, { status: 400 })
  }

  // console.log(input)
  // const array = fetchData(input);

  // var variable_data = null;

  // fetchData(input)
  // .then(data => variable_data = data)

  const data = await fetchData(input);
  console.log(data)

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
