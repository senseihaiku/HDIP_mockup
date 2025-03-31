import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, FileText } from "lucide-react"

interface Request {
  id: string
  title: string
  dataset: string
  requester: {
    name: string
    organization: string
    avatar: string
    initials: string
  }
  status: "pending" | "approved" | "rejected"
  submittedDate: string
  purpose: string
}

const requests: Request[] = [
  {
    id: "REQ-2025-042",
    title: "Cardiovascular Risk Prediction Model",
    dataset: "Real-world Cardiology EHR",
    requester: {
      name: "Dr. Emma Johnson",
      organization: "Uppsala University",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "EJ",
    },
    status: "pending",
    submittedDate: "2025-03-10",
    purpose:
      "Academic research to develop and validate a cardiovascular risk prediction model using machine learning techniques.",
  },
  {
    id: "REQ-2025-039",
    title: "Treatment Patterns Analysis",
    dataset: "Diabetes Registry 2023",
    requester: {
      name: "Dr. Michael Chen",
      organization: "Karolinska Institute",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "MC",
    },
    status: "approved",
    submittedDate: "2025-03-05",
    purpose: "Analysis of treatment patterns and outcomes for diabetes patients across different demographic groups.",
  },
  {
    id: "REQ-2025-036",
    title: "Biomarker Discovery Project",
    dataset: "Genomic Markers Collection",
    requester: {
      name: "Dr. Sarah Williams",
      organization: "AstraZeneca R&D",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "SW",
    },
    status: "rejected",
    submittedDate: "2025-03-01",
    purpose: "Commercial research to identify novel biomarkers for early disease detection.",
  },
  {
    id: "REQ-2025-033",
    title: "Long COVID Analysis",
    dataset: "COVID-19 Long-term Effects",
    requester: {
      name: "Dr. David Miller",
      organization: "Stockholm University",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "DM",
    },
    status: "approved",
    submittedDate: "2025-02-25",
    purpose: "Academic research on long-term effects of COVID-19 on cardiovascular health.",
  },
]

const getStatusBadge = (status: Request["status"]) => {
  switch (status) {
    case "approved":
      return <Badge className="bg-green-100 text-green-800">Approved</Badge>
    case "pending":
      return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
    case "rejected":
      return <Badge className="bg-red-100 text-red-800">Rejected</Badge>
    default:
      return null
  }
}

export function RequestsList({ status }: { status?: Request["status"] }) {
  const filteredRequests = status ? requests.filter((request) => request.status === status) : requests

  return (
    <div className="space-y-4">
      {filteredRequests.map((request) => (
        <Card key={request.id}>
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-xl">{request.title}</CardTitle>
                <CardDescription className="flex items-center gap-1 mt-1">
                  <FileText className="h-3 w-3" /> {request.dataset}
                </CardDescription>
              </div>
              {getStatusBadge(request.status)}
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={request.requester.avatar} alt={request.requester.name} />
                <AvatarFallback>{request.requester.initials}</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <div className="font-medium">{request.requester.name}</div>
                <div className="text-sm text-muted-foreground">{request.requester.organization}</div>
              </div>
            </div>
            <div className="mt-4">
              <div className="text-sm font-medium">Purpose:</div>
              <p className="text-sm text-muted-foreground mt-1">{request.purpose}</p>
            </div>
            <div className="flex items-center text-xs text-muted-foreground mt-4">
              <Calendar className="h-3 w-3 mr-1" /> Submitted: {request.submittedDate}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between pt-2">
            <Button variant="outline" size="sm">
              View Details
            </Button>
            {request.status === "pending" && (
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                  Reject
                </Button>
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                  Approve
                </Button>
              </div>
            )}
            {request.status === "approved" && <Button size="sm">Manage Access</Button>}
            {request.status === "rejected" && (
              <Button variant="outline" size="sm">
                Review Decision
              </Button>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

