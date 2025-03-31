"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DateRangePicker } from "@/components/ui/date-range-picker"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function UserActivityLogs() {
  const [searchQuery, setSearchQuery] = useState("")

  // Mock activity logs data
  const activityLogs = [
    {
      id: 1,
      user: "John Doe",
      email: "john.doe@example.com",
      action: "Dataset Access",
      details: "Accessed Clinical Trial Dataset #4872",
      timestamp: "2025-03-30T14:22:18Z",
      ip: "192.168.1.105",
    },
    {
      id: 2,
      user: "Sarah Smith",
      email: "sarah.smith@example.com",
      action: "Login",
      details: "Successful login",
      timestamp: "2025-03-30T09:15:42Z",
      ip: "192.168.1.42",
    },
    {
      id: 3,
      user: "Robert Johnson",
      email: "robert.johnson@example.com",
      action: "Dataset Creation",
      details: "Created new dataset 'Genomic Sequencing Data'",
      timestamp: "2025-03-30T12:08:33Z",
      ip: "192.168.1.78",
    },
    {
      id: 4,
      user: "Emily Davis",
      email: "emily.davis@example.com",
      action: "Profile Update",
      details: "Updated user profile information",
      timestamp: "2025-03-29T10:45:21Z",
      ip: "192.168.1.91",
    },
    {
      id: 5,
      user: "Michael Wilson",
      email: "michael.wilson@example.com",
      action: "Data Export",
      details: "Exported anonymized patient records",
      timestamp: "2025-03-28T16:32:10Z",
      ip: "192.168.1.112",
    },
  ]

  const filteredLogs = activityLogs.filter(
    (log) =>
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>User Activity Logs</CardTitle>
          <Button variant="outline">Export Logs</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Search logs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-sm"
            />
            <DateRangePicker />
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Actions</SelectItem>
                <SelectItem value="login">Login</SelectItem>
                <SelectItem value="access">Dataset Access</SelectItem>
                <SelectItem value="create">Dataset Creation</SelectItem>
                <SelectItem value="export">Data Export</SelectItem>
                <SelectItem value="profile">Profile Update</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>IP Address</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{log.user}</p>
                      <p className="text-sm text-muted-foreground">{log.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        log.action === "Login"
                          ? "outline"
                          : log.action === "Dataset Access"
                            ? "secondary"
                            : log.action === "Data Export"
                              ? "default"
                              : "outline"
                      }
                    >
                      {log.action}
                    </Badge>
                  </TableCell>
                  <TableCell>{log.details}</TableCell>
                  <TableCell>{new Date(log.timestamp).toLocaleString()}</TableCell>
                  <TableCell>{log.ip}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">
                Showing {filteredLogs.length} of {activityLogs.length} logs
              </p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">Load More</Button>
              <Button variant="outline">Advanced Filters</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

