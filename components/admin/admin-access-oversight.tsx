"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface AdminAccessOversightProps {
  className?: string
}

export function AdminAccessOversight({ className }: AdminAccessOversightProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Access Oversight</CardTitle>
        <CardDescription>Recent access requests and decisions</CardDescription>
      </CardHeader>
      <CardContent>
        {isClient ? (
          <div className="space-y-4">
            <p>Access oversight data will be displayed here.</p>
          </div>
        ) : (
          <p className="text-muted-foreground">Loading access data...</p>
        )}
      </CardContent>
    </Card>
  )
}
