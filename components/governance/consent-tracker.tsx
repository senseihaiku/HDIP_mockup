import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FileText, Info, Settings } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ConsentRecord {
  id: string
  dataset: string
  dataProvider: string
  consentType: string
  status: "active" | "expired" | "revoked" | "pending"
  expiryDate: string
  purposes: string[]
}

const consentRecords: ConsentRecord[] = [
  {
    id: "CONS-001",
    dataset: "Real-world Cardiology EHR",
    dataProvider: "AstraZeneca R&D",
    consentType: "Broad Research",
    status: "active",
    expiryDate: "2026-12-31",
    purposes: ["Research", "Algorithm Development", "Education"],
  },
  {
    id: "CONS-002",
    dataset: "Genomic Markers Collection",
    dataProvider: "Uppsala University",
    consentType: "Specific Purpose",
    status: "active",
    expiryDate: "2025-06-30",
    purposes: ["Rare Disease Research"],
  },
  {
    id: "CONS-003",
    dataset: "COVID-19 Long-term Effects",
    dataProvider: "Karolinska Institute",
    consentType: "Broad Research",
    status: "active",
    expiryDate: "2027-03-15",
    purposes: ["Research", "Public Health"],
  },
  {
    id: "CONS-004",
    dataset: "Diabetes Registry 2023",
    dataProvider: "Swedish Diabetes Association",
    consentType: "Specific Purpose",
    status: "expired",
    expiryDate: "2025-01-31",
    purposes: ["Treatment Effectiveness"],
  },
  {
    id: "CONS-005",
    dataset: "Mental Health Survey 2024",
    dataProvider: "Stockholm University",
    consentType: "Pending Approval",
    status: "pending",
    expiryDate: "N/A",
    purposes: ["Research", "Public Health"],
  },
]

const getStatusBadge = (status: ConsentRecord["status"]) => {
  switch (status) {
    case "active":
      return <Badge className="bg-green-100 text-green-800">Active</Badge>
    case "expired":
      return <Badge className="bg-amber-100 text-amber-800">Expired</Badge>
    case "revoked":
      return <Badge className="bg-red-100 text-red-800">Revoked</Badge>
    case "pending":
      return <Badge className="bg-blue-100 text-blue-800">Pending</Badge>
    default:
      return null
  }
}

export function ConsentTracker() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Checkbox id="show-active" defaultChecked />
          <Label htmlFor="show-active">Active</Label>

          <Checkbox id="show-expired" defaultChecked />
          <Label htmlFor="show-expired">Expired</Label>

          <Checkbox id="show-revoked" />
          <Label htmlFor="show-revoked">Revoked</Label>

          <Checkbox id="show-pending" defaultChecked />
          <Label htmlFor="show-pending">Pending</Label>
        </div>
        <Button variant="outline" size="sm">
          <Settings className="h-4 w-4 mr-2" />
          Manage Filters
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Dataset</TableHead>
              <TableHead>Data Provider</TableHead>
              <TableHead>Consent Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Expiry Date</TableHead>
              <TableHead>Allowed Purposes</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {consentRecords.map((record) => (
              <TableRow key={record.id}>
                <TableCell className="font-medium">{record.dataset}</TableCell>
                <TableCell>{record.dataProvider}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    {record.consentType}
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs max-w-xs">
                            {record.consentType === "Broad Research"
                              ? "Consent for a wide range of research purposes within specified domains."
                              : "Consent for specific research purposes only."}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(record.status)}</TableCell>
                <TableCell>{record.expiryDate}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {record.purposes.map((purpose, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {purpose}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon">
                    <FileText className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

