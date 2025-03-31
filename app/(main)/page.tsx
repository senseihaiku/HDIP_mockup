import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { FairScoreOverview } from "@/components/dashboard/fair-score-overview"
import { PopularDatasets } from "@/components/dashboard/popular-datasets"

export default function Home() {
  return (
    <div className="container mx-auto p-4 md:p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid gap-6">
        <DashboardStats />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FairScoreOverview />
          <PopularDatasets />
        </div>

        <RecentActivity />
      </div>
    </div>
  )
}

