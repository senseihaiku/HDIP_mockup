"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface AdminUsageMetricsProps {
  className?: string
}

export function AdminUsageMetrics({ className }: AdminUsageMetricsProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Usage Metrics</CardTitle>
        <CardDescription>Platform activity and engagement</CardDescription>
      </CardHeader>
      <CardContent>
        {isClient ? (
          <div className="space-y-4">
            <p>Usage metrics data will be displayed here.</p>
          </div>
        ) : (
          <p className="text-muted-foreground">Loading usage metrics...</p>
        )}
      </CardContent>
    </Card>
  )
}
