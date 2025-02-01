"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import InputTable from "./input-table"

const queryClient = new QueryClient()

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <InputTable />
    </QueryClientProvider>
  )
}

