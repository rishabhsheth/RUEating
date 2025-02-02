import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const input = searchParams.get("input")

  if (!input) {
    
    return NextResponse.json({ error: "Input is required" }, { status: 400 })
  }

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

  const processedData = input.split("").map((char) => [char, char.charCodeAt(0).toString()]);

  return NextResponse.json({ data: processedData });
}
