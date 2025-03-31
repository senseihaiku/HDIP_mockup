"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DateRangePicker } from "@/components/ui/date-range-picker"
import { Input } from "@/components/ui/input"

export function AuditLogViewer() {
  const [searchQuery, setSearchQuery] = useState("")

  // Mock audit log data
  const auditLogs = [
    {
      id: 1,
      timestamp: "2025-03-30T14:22:18Z",
      user: "john.doe@example.com",
      action: "Dataset Access",
      details: "Accessed Clinical Trial Dataset #4872",
      ip: "192.168.1.105",
    },
    {
      id: 2,
      timestamp: "2025-03-30T13:15:42Z",
      user: "admin@healthorg.org",
      action: "User Permission Change",
      details: "Updated permissions for user sarah.smith@example.com",
      ip: "192.168.1.10",
    },
    {
      id: 3,
      timestamp: "2025-03-30T12:08:33Z",
      user: "sarah.smith@example.com",
      action: "Data Export",
      details: "Exported anonymized patient records",
      ip: "192.168.1.42",
    },
    {
      id: 4,
      timestamp: "2025-03-30T10:45:21Z",
      user: "system",
      action: "Automated Backup",
      details: "Daily backup completed successfully",
      ip: "192.168.1.5",
    },
    {
      id: 5,
      timestamp: "2025-03-29T16:32:10Z",
      user: "john.doe@example.com",
      action: "Login",
      details: "Successful login",
      ip: "192.168.1.105",
    },
  ]

  const filteredLogs = auditLogs.filter(
    (log) =>
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Audit Log Viewer</CardTitle>
        <div className="flex items-center space-x-2">
          <DateRangePicker className="w-[300px]" />
          <Input
            placeholder="Search logs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-sm"
          />
          <Button variant="outline">Export Logs</Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Timestamp</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Details</TableHead>
              <TableHead>IP Address</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLogs.map((log) => (
              <TableRow key={log.id}>
                <TableCell>{new Date(log.timestamp).toLocaleString()}</TableCell>
                <TableCell>{log.user}</TableCell>
                <TableCell>{log.action}</TableCell>
                <TableCell>{log.details}</TableCell>
                <TableCell>{log.ip}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

