"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { DataGridTable } from "@/components/ui/table" // <-- import your new wrapper
import { GridColDef, GridRowsProp } from "@mui/x-data-grid"


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
  const [queryLocations, setQueryLocations] = useState<string[]>([])

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
      return prev.includes(location)
        ? prev.filter(l => l !== location)
        : [...prev, location]
    })
  }

  const handleSearch = () => {
    setQueryInput(input)
    setQueryLocations(selectedLocations)
  }

  // Convert fetched data to MUI DataGrid format
  const columns: GridColDef[] = [
    { field: "item", headerName: "Item", flex: 1 },
    { field: "campus", headerName: "Campus", flex: 1 },
    { field: "time", headerName: "Time", flex: 1 },
    { field: "date", headerName: "Date", flex: 1 },
  ]

  const rows: GridRowsProp = Array.isArray(data?.data)
    ? data.data.map((row: string[], index: number) => ({
        id: index,
        item: row[0],
        campus: row[1],
        time: row[2],
        date: row[3],
      }))
    : []

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
              if (e.key === "Enter") handleSearch()
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

        {queryInput && (
          <div className="w-full h-[400px]">
            <DataGridTable
            rows={rows}
            columns={columns}
            pageSize={10}
            checkboxSelection
          />
          </div>
        )}
      </div>
    </div>
  )
}
