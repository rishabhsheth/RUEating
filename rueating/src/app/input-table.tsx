"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableRow, TableHeader } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"

const LOCATIONS = ["Busch", "Livingston", "Neilson", "The Atrium"]

async function fetchTableData(input: string, locations: string[]) {
  const params = new URLSearchParams()
  if (input) params.append("input", input)
  if (locations.length) params.append("locations", locations.join(","))
  const response = await fetch(`/api?${params.toString()}`)
  if (!response.ok) {
    throw new Error("Network response was not ok")
  }
  return response.json()
}

export default function InputTable() {
  const [input, setInput] = useState("")
  const [selectedLocations, setSelectedLocations] = useState<string[]>(LOCATIONS)
  const [queryInput, setQueryInput] = useState("")
  const [queryLocations, setQueryLocations] = useState<string[]>(LOCATIONS)

  const { data, isLoading, isError } = useQuery({
    queryKey: ["tableData", queryInput, queryLocations],
    queryFn: () => fetchTableData(queryInput, queryLocations),
    enabled: true,
    refetchOnWindowFocus: false,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const toggleLocation = (location: string) => {
    setSelectedLocations(prev => {
      const newSelected = prev.includes(location) 
        ? prev.filter(l => l !== location) 
        : [...prev, location]

      // console.log("Campuses toggled:", newSelected) // <--- print statement here

      return newSelected
    })
  }

  const handleSearch = () => {
    setQueryInput(input)
    setQueryLocations(selectedLocations)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-400 to-black flex items-top justify-center p-4">
      <div className="w-full bg-white rounded-xl shadow-lg p-6 space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">RUEating</h1>
        <div className="flex w-full max-w-2xl space-x-2">
          <Input
            type="text"
            placeholder="Enter Food Item..."
            value={input}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch()
              }
            }}
            className="flex-grow font-bold text-xl p-4"
          />
          <Button onClick={handleSearch} className="text-xl px-6">
            Search
          </Button>
        </div>

        {/* Location selectors */}
        <div className="flex flex-wrap gap-4 max-w-2xl justify-center">
          {LOCATIONS.map((loc) => (
            <label key={loc} className="inline-flex items-center space-x-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={selectedLocations.includes(loc)}
                onChange={() => toggleLocation(loc)}
                className="form-checkbox h-5 w-5 text-red-600"
              />
              <span className="text-lg font-medium">{loc}</span>
            </label>
          ))}
        </div>

        {queryInput !== null && (
          <Table className="text-lg">
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/4 py-4">Item</TableHead>
                <TableHead className="w-1/4 py-4">Campus</TableHead>
                <TableHead className="w-1/4 py-4">Time</TableHead>
                <TableHead className="w-1/4 py-4">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y">
              {isLoading ? (
                [...Array(3)].map((_, index) => (
                  <TableRow key={index}>
                    <TableCell className="py-4"><Skeleton className="h-6 w-full" /></TableCell>
                    <TableCell className="py-4"><Skeleton className="h-6 w-full" /></TableCell>
                    <TableCell className="py-4"><Skeleton className="h-6 w-full" /></TableCell>
                    <TableCell className="py-4"><Skeleton className="h-6 w-full" /></TableCell>
                  </TableRow>
                ))
              ) : isError ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-red-500 py-4">
                    Error fetching data
                  </TableCell>
                </TableRow>
              ) : (
                Array.isArray(data?.data) && data.data.length > 0 ? (
                  data.data.map((row: string[], index: number) => (
                    <TableRow key={index}>
                      <TableCell className="py-4">{row[0]}</TableCell>
                      <TableCell className="py-4">{row[1]}</TableCell>
                      <TableCell className="py-4">{row[2]}</TableCell>
                      <TableCell className="py-4">{row[3]}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-gray-500 py-4">
                      No results found
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  )
}
