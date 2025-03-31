"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface AdminDataSyncStatusProps {
  className?: string
}

export function AdminDataSyncStatus({ className }: AdminDataSyncStatusProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Data Sync Status</CardTitle>
        <CardDescription>Status of data synchronization processes</CardDescription>
      </CardHeader>
      <CardContent>
        {isClient ? (
          <div className="space-y-4">
            <p>Data sync status will be displayed here.</p>
          </div>
        ) : (
          <p className="text-muted-foreground">Loading sync status...</p>
        )}
      </CardContent>
    </Card>
  )
}
