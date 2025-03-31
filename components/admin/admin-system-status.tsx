"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertTriangle, XCircle } from "lucide-react"

interface AdminSystemStatusProps {
  className?: string
  fullView?: boolean
}

export function AdminSystemStatus({ className, fullView = false }: AdminSystemStatusProps) {
  // Use state to handle client-side rendering
  const [isClient, setIsClient] = useState(false)

  // Initial data for server rendering
  const services = [
    { name: "Data Catalog", status: "operational", uptime: "99.99%" },
    { name: "API Gateway", status: "operational", uptime: "99.95%" },
    { name: "Query Engine", status: "operational", uptime: "99.98%" },
    { name: "Trusted Research Environment", status: "operational", uptime: "100%" },
    { name: "Authentication Service", status: "operational", uptime: "99.99%" },
    { name: "Storage Service", status: "degraded", uptime: "98.5%" },
  ]

  // Set isClient to true after component mounts
  useEffect(() => {
    setIsClient(true)
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "degraded":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case "outage":
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "operational":
        return <Badge className="bg-green-100 text-green-800">Operational</Badge>
      case "degraded":
        return <Badge className="bg-yellow-100 text-yellow-800">Degraded</Badge>
      case "outage":
        return <Badge className="bg-red-100 text-red-800">Outage</Badge>
      default:
        return null
    }
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>System Status</CardTitle>
        <CardDescription>Health of key platform services</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {services.slice(0, fullView ? services.length : 4).map((service) => (
            <div key={service.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {isClient && getStatusIcon(service.status)}
                <span className="font-medium">{service.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">{service.uptime}</span>
                {isClient && getStatusBadge(service.status)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

