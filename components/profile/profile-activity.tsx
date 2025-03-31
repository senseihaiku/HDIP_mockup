"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Download, Search } from "lucide-react"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { ScrollArea } from "@/components/ui/scroll-area"

interface ActivityItem {
  id: string
  action: string
  dataset: string
  timestamp: string
  status: "completed" | "pending" | "rejected" | "in-review"
}

const activityData: ActivityItem[] = [
  {
    id: "ACT-2025-001",
    action: "Accessed Dataset",
    dataset: "COVID-19 Long-term Effects",
    timestamp: "2025-03-20 14:32:15",
    status: "completed",
  },
  {
    id: "ACT-2025-002",
    action: "Downloaded Data",
    dataset: "COVID-19 Long-term Effects",
    timestamp: "2025-03-20 14:35:22",
    status: "completed",
  },
  {
    id: "ACT-2025-003",
    action: "Requested Access",
    dataset: "Diabetes Registry 2023",
    timestamp: "2025-03-19 11:45:10",
    status: "in-review",
  },
  {
    id: "ACT-2025-004",
    action: "View Dataset Details",
    dataset: "Genomic Markers Collection",
    timestamp: "2025-03-18 09:22:05",
    status: "completed",
  },
  {
    id: "ACT-2025-005",
    action: "Requested Access",
    dataset: "Genomic Markers Collection",
    timestamp: "2025-03-18 09:25:33",
    status: "pending",
  },
  {
    id: "ACT-2025-006",
    action: "View Dataset Details",
    dataset: "Pediatric Asthma Cohort",
    timestamp: "2025-03-17 16:05:18",
    status: "completed",
  },
  {
    id: "ACT-2025-007",
    action: "Requested Access",
    dataset: "Real-world Cardiology EHR",
    timestamp: "2025-03-15 13:30:42",
    status: "rejected",
  },
  {
    id: "ACT-2025-008",
    action: "View Dataset Details",
    dataset: "Mental Health Survey 2024",
    timestamp: "2025-03-14 10:15:22",
    status: "completed",
  },
  {
    id: "ACT-2025-009",
    action: "Downloaded Data",
    dataset: "Oncology Biomarkers",
    timestamp: "2025-03-13 14:45:02",
    status: "completed",
  },
  {
    id: "ACT-2025-010",
    action: "Accessed Dataset",
    dataset: "Oncology Biomarkers",
    timestamp: "2025-03-13 14:40:18",
    status: "completed",
  },
]

const getStatusBadge = (status: ActivityItem["status"]) => {
  switch (status) {
    case "completed":
      return <Badge className="bg-green-100 text-green-800">Completed</Badge>
    case "pending":
      return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
    case "rejected":
      return <Badge className="bg-red-100 text-red-800">Rejected</Badge>
    case "in-review":
      return <Badge className="bg-blue-100 text-blue-800">In Review</Badge>
    default:
      return null
  }
}

export function ProfileActivity() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredData, setFilteredData] = useState(activityData)

  // Filter data based on search query
  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (!query) {
      setFilteredData(activityData)
    } else {
      const lowerQuery = query.toLowerCase()
      setFilteredData(
        activityData.filter(
          (item) => item.action.toLowerCase().includes(lowerQuery) || item.dataset.toLowerCase().includes(lowerQuery),
        ),
      )
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity History</CardTitle>
        <CardDescription>Track your interactions with datasets and platform usage</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="flex items-center gap-2 max-w-sm">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search activity..."
                  className="w-full rounded-md border border-input bg-background pl-8 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-2 items-center">
              <DatePickerWithRange />
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <ScrollArea className="h-[450px] rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Dataset</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                      No activity found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-mono text-xs">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          {item.timestamp}
                        </div>
                      </TableCell>
                      <TableCell>{item.action}</TableCell>
                      <TableCell>{item.dataset}</TableCell>
                      <TableCell>{getStatusBadge(item.status)}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  )
}

