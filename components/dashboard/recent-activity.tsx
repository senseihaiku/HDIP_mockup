import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface ActivityItem {
  id: string
  user: {
    name: string
    avatar: string
    initials: string
  }
  action: string
  dataset: string
  status: "approved" | "pending" | "rejected" | "completed"
  timestamp: string
}

const activityData: ActivityItem[] = [
  {
    id: "act-1",
    user: {
      name: "Emma Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "EJ",
    },
    action: "Requested access to",
    dataset: "Real-world Cardiology EHR",
    status: "pending",
    timestamp: "2 hours ago",
  },
  {
    id: "act-2",
    user: {
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "MC",
    },
    action: "Approved access for",
    dataset: "Diabetes Registry 2023",
    status: "approved",
    timestamp: "5 hours ago",
  },
  {
    id: "act-3",
    user: {
      name: "Sarah Williams",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "SW",
    },
    action: "Added new dataset",
    dataset: "Genomic Markers Collection",
    status: "completed",
    timestamp: "Yesterday",
  },
  {
    id: "act-4",
    user: {
      name: "David Miller",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "DM",
    },
    action: "Rejected access to",
    dataset: "Clinical Trial XYZ-123",
    status: "rejected",
    timestamp: "2 days ago",
  },
  {
    id: "act-5",
    user: {
      name: "Lisa Anderson",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "LA",
    },
    action: "Updated metadata for",
    dataset: "Pediatric Asthma Cohort",
    status: "completed",
    timestamp: "3 days ago",
  },
]

const moreActivityData: ActivityItem[] = [
  {
    id: "act-6",
    user: {
      name: "Robert Taylor",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "RT",
    },
    action: "Requested access to",
    dataset: "Mental Health Survey 2024",
    status: "pending",
    timestamp: "3 days ago",
  },
  {
    id: "act-7",
    user: {
      name: "Jennifer Lopez",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "JL",
    },
    action: "Added new dataset",
    dataset: "COVID-19 Long-term Effects",
    status: "completed",
    timestamp: "4 days ago",
  },
  {
    id: "act-8",
    user: {
      name: "Thomas Brown",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "TB",
    },
    action: "Approved access for",
    dataset: "Oncology Biomarkers",
    status: "approved",
    timestamp: "5 days ago",
  },
]

const getStatusColor = (status: ActivityItem["status"]) => {
  switch (status) {
    case "approved":
      return "bg-green-500"
    case "pending":
      return "bg-yellow-500"
    case "rejected":
      return "bg-red-500"
    case "completed":
      return "bg-blue-500"
    default:
      return "bg-gray-500"
  }
}

const getStatusBadge = (status: ActivityItem["status"]) => {
  switch (status) {
    case "approved":
      return (
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          Approved
        </Badge>
      )
    case "pending":
      return (
        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
          Pending
        </Badge>
      )
    case "rejected":
      return (
        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
          Rejected
        </Badge>
      )
    case "completed":
      return (
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
          Completed
        </Badge>
      )
    default:
      return null
  }
}

export function RecentActivity({ fullView = false }: { fullView?: boolean }) {
  const displayData = fullView ? [...activityData, ...moreActivityData] : activityData.slice(0, 4)

  return (
    <div className="space-y-4">
      {displayData.map((item) => (
        <div key={item.id} className="flex items-start space-x-4">
          <div className="relative">
            <Avatar className="h-8 w-8">
              <AvatarImage src={item.user.avatar} alt={item.user.name} />
              <AvatarFallback>{item.user.initials}</AvatarFallback>
            </Avatar>
            <span
              className={`absolute bottom-0 right-0 h-2 w-2 rounded-full ${getStatusColor(item.status)} ring-1 ring-white`}
            />
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">{item.user.name}</p>
              <span className="text-xs text-muted-foreground">{item.timestamp}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {item.action} <span className="font-medium text-foreground">{item.dataset}</span>
            </p>
          </div>
          <div>{getStatusBadge(item.status)}</div>
        </div>
      ))}
    </div>
  )
}

