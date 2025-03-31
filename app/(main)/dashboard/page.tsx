"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { FairScoreOverview } from "@/components/dashboard/fair-score-overview"
import { ModeToggle } from "@/components/dashboard/mode-toggle"
import { MarketplaceTrending } from "@/components/marketplace/marketplace-trending"
import { RecommendedDatasets } from "@/components/marketplace/recommended-datasets"
import { DataContributionHub } from "@/components/contribution/data-contribution-hub"
import { YourDataImpact } from "@/components/contribution/your-data-impact"

export default function DashboardPage() {
  const searchParams = useSearchParams()
  const initialMode = searchParams?.get("mode") || "discover"
  const [mode, setMode] = useState(initialMode)

  // Update mode when URL changes
  useEffect(() => {
    const newMode = searchParams?.get("mode") || "discover"
    setMode(newMode)
  }, [searchParams])

  return (
    <div className="flex flex-col p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            {mode === "discover" ? "Discover and access health datasets" : "Manage and track your contributed datasets"}
          </p>
        </div>
        <ModeToggle currentMode={mode} />
      </div>

      <DashboardStats mode={mode} />

      <Tabs defaultValue={mode} value={mode} onValueChange={setMode} className="space-y-4">
        <TabsList>
          <TabsTrigger value="discover">Discover</TabsTrigger>
          <TabsTrigger value="contribute">Contribute</TabsTrigger>
        </TabsList>

        <TabsContent value="discover" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="md:col-span-2">
              <MarketplaceTrending />
            </div>
            <div className="md:row-span-2">
              <RecentActivity />
            </div>
            <div className="md:col-span-2">
              <RecommendedDatasets />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="contribute" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="md:col-span-2">
              <DataContributionHub />
            </div>
            <div className="md:row-span-2">
              <FairScoreOverview />
            </div>
            <div className="md:col-span-2">
              <YourDataImpact />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

