"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DateRangePicker } from "@/components/ui/date-range-picker"
import { FairScoreTrends } from "@/components/analytics/fair-score-trends"
import { UsageStatistics } from "@/components/analytics/usage-statistics"
import { DatasetPopularity } from "@/components/analytics/dataset-popularity"
import { addDays } from "date-fns"

export default function AnalyticsPage() {
  const [date, setDate] = useState({
    from: addDays(new Date(), -30),
    to: new Date(),
  })

  return (
    <div className="flex flex-col p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">Track usage and impact of your datasets</p>
        </div>
        <DateRangePicker date={date} setDate={setDate} />
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="overview" className="flex-1">
            Overview
          </TabsTrigger>
          <TabsTrigger value="usage" className="flex-1">
            Usage
          </TabsTrigger>
          <TabsTrigger value="fair" className="flex-1">
            FAIR Metrics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-4">
          <div className="grid gap-6 md:grid-cols-2">
            <UsageStatistics dateRange={date} />
            <DatasetPopularity dateRange={date} />
          </div>
        </TabsContent>

        <TabsContent value="usage" className="space-y-4 mt-4">
          <UsageStatistics dateRange={date} detailed />
        </TabsContent>

        <TabsContent value="fair" className="space-y-4 mt-4">
          <FairScoreTrends dateRange={date} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

