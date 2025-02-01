"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableRow, TableHeader } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"

async function fetchTableData(input: string) {
  const response = await fetch(`/api/table-data?input=${encodeURIComponent(input)}`)
  if (!response.ok) {
    throw new Error("Network response was not ok")
  }
  return response.json()
}

export default function InputTable() {
  const [input, setInput] = useState("")

  const { data, isLoading, isError } = useQuery({
    queryKey: ["tableData", input],
    queryFn: () => fetchTableData(input),
    enabled: input.length > 0,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-400 to-black flex items-top justify-center p-4">
      <div className="w-full bg-white rounded-xl shadow-lg p-6 space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">RUEating</h1>
        <Input
          type="text"
          placeholder="Enter Food Item..."
          value={input}
          onChange={handleInputChange}
          className="w-full max-w-2xl font-bold text-x1 p-4"
        />
        {input && (
          <Table className="text-lg">
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/3 py-4">Item</TableHead>
                <TableHead className="w-1/3 py-4">Campus</TableHead>
                <TableHead className="w-1/3 py-4">Time</TableHead>
                <TableHead className="w-1/3 py-4">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y">
              {isLoading ? (
                [...Array(3)].map((_, index) => (
                  <TableRow key={index}>
                    <TableCell className="py-4">
                      <Skeleton className="h-6 w-full" />
                    </TableCell>
                    <TableCell className="py-4">
                      <Skeleton className="h-6 w-full" />
                    </TableCell>
                    <TableCell className="py-4">
                      <Skeleton className="h-6 w-full" />
                    </TableCell>
                    <TableCell className="py-4">
                      <Skeleton className="h-6 w-full" />
                    </TableCell>
                  </TableRow>
                ))
              ) : isError ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center text-red-500 py-4">
                    Error fetching data
                  </TableCell>
                </TableRow>
              ) : (
                data?.data.map((row: string[], index: number) => (
                  <TableRow key={index}>
                    <TableCell className="py-4">{row[0]}</TableCell>
                    <TableCell className="py-4">{row[1]}</TableCell>
                    <TableCell className="py-4">{row[2]}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  )
}

