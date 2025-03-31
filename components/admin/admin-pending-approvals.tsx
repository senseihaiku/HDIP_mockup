"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Database, FileText } from "lucide-react"

interface AdminPendingApprovalsProps {
  className?: string
  fullView?: boolean
}

export function AdminPendingApprovals({ className, fullView = false }: AdminPendingApprovalsProps) {
  // Use state to handle client-side rendering
  const [isClient, setIsClient] = useState(false)

  // Set isClient to true after component mounts
  useEffect(() => {
    setIsClient(true)
  }, [])

  const pendingItems = [
    {
      id: "DS-2025-042",
      type: "dataset",
      name: "Genomic Markers Collection",
      submitter: "Uppsala University",
      date: "2025-03-18",
      status: "needs_fair_review",
    },
    {
      id: "DS-2025-041",
      type: "dataset",
      name: "Mental Health Survey 2024",
      submitter: "Stockholm University",
      date: "2025-03-17",
      status: "new",
    },
    {
      id: "AR-2025-078",
      type: "access",
      name: "Real-world Cardiology EHR",
      submitter: "Dr. Emma Johnson",
      date: "2025-03-20",
      status: "pending",
    },
    {
      id: "AR-2025-077",
      type: "access",
      name: "Diabetes Registry 2023",
      submitter: "Dr. Michael Chen",
      date: "2025-03-19",
      status: "pending",
    },
    {
      id: "DS-2025-040",
      type: "dataset",
      name: "Pediatric Asthma Cohort",
      submitter: "Karolinska Institute",
      date: "2025-03-16",
      status: "rework_requested",
    },
  ]

  const getTypeIcon = (type: string) => {
    if (!isClient) return null

    switch (type) {
      case "dataset":
        return <Database className="h-4 w-4 text-blue-500" />
      case "access":
        return <FileText className="h-4 w-4 text-purple-500" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    if (!isClient) return null

    switch (status) {
      case "new":
        return <Badge className="bg-blue-100 text-blue-800">New</Badge>
      case "needs_fair_review":
        return <Badge className="bg-yellow-100 text-yellow-800">Needs FAIR Review</Badge>
      case "rework_requested":
        return <Badge className="bg-orange-100 text-orange-800">Rework Requested</Badge>
      case "pending":
        return <Badge className="bg-purple-100 text-purple-800">Pending</Badge>
      default:
        return null
    }
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Pending Approvals</CardTitle>
        <CardDescription>Items waiting for review and approval</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {pendingItems.slice(0, fullView ? pendingItems.length : 3).map((item) => (
            <div key={item.id} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {getTypeIcon(item.type)}
                <div>
                  <div className="font-medium">{item.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {item.submitter} • {item.date}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {getStatusBadge(item.status)}
                {isClient && (
                  <Button variant="outline" size="sm">
                    Review
                  </Button>
                )}
              </div>
            </div>
          ))}
          {!fullView && pendingItems.length > 3 && isClient && (
            <Button variant="link" className="w-full">
              View all {pendingItems.length} pending items
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

