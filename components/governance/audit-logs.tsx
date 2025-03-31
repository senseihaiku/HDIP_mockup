import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, Filter } from "lucide-react"

interface AuditLog {
  id: string
  timestamp: string
  user: string
  action: string
  resource: string
  resourceType: string
  status: "success" | "failure" | "warning"
  ipAddress: string
}

const auditLogs: AuditLog[] = [
  {
    id: "LOG-20250320-001",
    timestamp: "2025-03-20 14:32:15",
    user: "emma.johnson@uppsala.se",
    action: "DATA_ACCESS",
    resource: "Real-world Cardiology EHR",
    resourceType: "Dataset",
    status: "success",
    ipAddress: "192.168.1.45",
  },
  {
    id: "LOG-20250320-002",
    timestamp: "2025-03-20 14:30:22",
    user: "michael.chen@ki.se",
    action: "APPROVE_REQUEST",
    resource: "REQ-2025-039",
    resourceType: "Access Request",
    status: "success",
    ipAddress: "192.168.1.22",
  },
  {
    id: "LOG-20250320-003",
    timestamp: "2025-03-20 13:45:10",
    user: "sarah.williams@astrazeneca.com",
    action: "UPLOAD_DATASET",
    resource: "Genomic Markers Collection",
    resourceType: "Dataset",
    status: "success",
    ipAddress: "192.168.1.78",
  },
  {
    id: "LOG-20250320-004",
    timestamp: "2025-03-20 12:22:05",
    user: "david.miller@su.se",
    action: "LOGIN_ATTEMPT",
    resource: "User Account",
    resourceType: "Authentication",
    status: "failure",
    ipAddress: "192.168.1.90",
  },
  {
    id: "LOG-20250320-005",
    timestamp: "2025-03-20 11:15:33",
    user: "system",
    action: "BACKUP_COMPLETE",
    resource: "Platform Database",
    resourceType: "System",
    status: "success",
    ipAddress: "192.168.1.2",
  },
  {
    id: "LOG-20250320-006",
    timestamp: "2025-03-20 10:05:18",
    user: "lisa.anderson@ki.se",
    action: "MODIFY_METADATA",
    resource: "Pediatric Asthma Cohort",
    resourceType: "Dataset",
    status: "warning",
    ipAddress: "192.168.1.65",
  },
  {
    id: "LOG-20250320-007",
    timestamp: "2025-03-20 09:30:42",
    user: "robert.taylor@su.se",
    action: "DOWNLOAD_DATA",
    resource: "Mental Health Survey 2024",
    resourceType: "Dataset",
    status: "success",
    ipAddress: "192.168.1.33",
  },
]

const getStatusBadge = (status: AuditLog["status"]) => {
  switch (status) {
    case "success":
      return <Badge className="bg-green-100 text-green-800">Success</Badge>
    case "failure":
      return <Badge className="bg-red-100 text-red-800">Failure</Badge>
    case "warning":
      return <Badge className="bg-amber-100 text-amber-800">Warning</Badge>
    default:
      return null
  }
}

export function AuditLogs() {
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="space-y-2">
            <Label htmlFor="date-from">From</Label>
            <Input id="date-from" type="date" className="w-full md:w-auto" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="date-to">To</Label>
            <Input id="date-to" type="date" className="w-full md:w-auto" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="action-filter">Action</Label>
            <Input id="action-filter" placeholder="Filter by action" className="w-full md:w-auto" />
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Apply Filters
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Logs
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Timestamp</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Resource</TableHead>
              <TableHead>Resource Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>IP Address</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {auditLogs.map((log) => (
              <TableRow key={log.id}>
                <TableCell className="font-mono text-xs">{log.timestamp}</TableCell>
                <TableCell>{log.user}</TableCell>
                <TableCell>{log.action}</TableCell>
                <TableCell className="max-w-[200px] truncate">{log.resource}</TableCell>
                <TableCell>{log.resourceType}</TableCell>
                <TableCell>{getStatusBadge(log.status)}</TableCell>
                <TableCell className="font-mono text-xs">{log.ipAddress}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

