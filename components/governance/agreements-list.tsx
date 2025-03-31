import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Download, Eye, FileText } from "lucide-react"

interface Agreement {
  id: string
  title: string
  type: "DUA" | "MTA" | "DPA" | "Collaboration"
  parties: string[]
  status: "active" | "expired" | "pending" | "terminated"
  effectiveDate: string
  expiryDate: string
  description: string
}

const agreements: Agreement[] = [
  {
    id: "AGR-2025-001",
    title: "Data Use Agreement - Cardiology Research",
    type: "DUA",
    parties: ["AstraZeneca R&D", "Uppsala University"],
    status: "active",
    effectiveDate: "2025-01-15",
    expiryDate: "2027-01-14",
    description: "Agreement governing the use of cardiology EHR data for research purposes.",
  },
  {
    id: "AGR-2025-002",
    title: "Material Transfer Agreement - Biosamples",
    type: "MTA",
    parties: ["Karolinska Institute", "Stockholm University"],
    status: "active",
    effectiveDate: "2025-02-01",
    expiryDate: "2026-01-31",
    description: "Agreement for the transfer of biological samples for COVID-19 research.",
  },
  {
    id: "AGR-2024-015",
    title: "Data Processing Agreement - Registry Data",
    type: "DPA",
    parties: ["Swedish Diabetes Association", "Health Data Analytics AB"],
    status: "active",
    effectiveDate: "2024-11-01",
    expiryDate: "2026-10-31",
    description: "GDPR-compliant data processing agreement for diabetes registry data.",
  },
  {
    id: "AGR-2025-003",
    title: "Research Collaboration Agreement",
    type: "Collaboration",
    parties: ["Uppsala University", "Karolinska Institute", "AstraZeneca R&D"],
    status: "pending",
    effectiveDate: "2025-04-01",
    expiryDate: "2028-03-31",
    description: "Multi-party collaboration for cardiovascular research using shared datasets.",
  },
]

const getStatusBadge = (status: Agreement["status"]) => {
  switch (status) {
    case "active":
      return <Badge className="bg-green-100 text-green-800">Active</Badge>
    case "expired":
      return <Badge className="bg-amber-100 text-amber-800">Expired</Badge>
    case "pending":
      return <Badge className="bg-blue-100 text-blue-800">Pending</Badge>
    case "terminated":
      return <Badge className="bg-red-100 text-red-800">Terminated</Badge>
    default:
      return null
  }
}

const getTypeBadge = (type: Agreement["type"]) => {
  switch (type) {
    case "DUA":
      return <Badge variant="outline">Data Use Agreement</Badge>
    case "MTA":
      return <Badge variant="outline">Material Transfer Agreement</Badge>
    case "DPA":
      return <Badge variant="outline">Data Processing Agreement</Badge>
    case "Collaboration":
      return <Badge variant="outline">Collaboration Agreement</Badge>
    default:
      return null
  }
}

export function AgreementsList() {
  return (
    <div className="space-y-4">
      {agreements.map((agreement) => (
        <Card key={agreement.id}>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-medium">{agreement.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {getTypeBadge(agreement.type)}
                  {getStatusBadge(agreement.status)}
                </div>
                <p className="text-sm text-muted-foreground">{agreement.description}</p>
                <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    Effective: {agreement.effectiveDate}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    Expires: {agreement.expiryDate}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium">Parties:</div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {agreement.parties.map((party, index) => (
                    <li key={index}>{party}</li>
                  ))}
                </ul>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

