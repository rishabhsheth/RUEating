"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableRow, TableHeader } from "@/components/ui/table"

export default function InputTable() {
  const [input, setInput] = useState("")
  const [tableData, setTableData] = useState<Array<[string, string, string]>>([])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInput(value)

    // Generate table data based on input
    const newData: Array<[string, string, string]> = [
      [value, value.split("").reverse().join(""), value.length.toString()],
      [value.toUpperCase(), value.toLowerCase(), (value.match(/[aeiou]/gi) || []).length.toString()],
      [
        value.slice(0, Math.floor(value.length / 2)),
        value.slice(Math.floor(value.length / 2)),
        value.split(" ").length.toString(),
      ],
    ]
    setTableData(newData)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-6 space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">Input to Table Generator</h1>
        <Input
          type="text"
          placeholder="Type something..."
          value={input}
          onChange={handleInputChange}
          className="w-full text-lg"
        />
        {input && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/3">Column 1</TableHead>
                <TableHead className="w-1/3">Column 2</TableHead>
                <TableHead className="w-1/3">Column 3</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row[0]}</TableCell>
                  <TableCell>{row[1]}</TableCell>
                  <TableCell>{row[2]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  )
}

