import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Database, FileText, Users, BarChart } from "lucide-react"

interface DashboardStatsProps {
  mode?: "discover" | "contribute"
}

export function DashboardStats({ mode = "discover" }: DashboardStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            {mode === "discover" ? "Total Datasets" : "Your Datasets"}
          </CardTitle>
          <Database className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{mode === "discover" ? "142" : "7"}</div>
          <p className="text-xs text-muted-foreground">
            {mode === "discover" ? "+12 from last month" : "+2 from last month"}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            {mode === "discover" ? "Access Requests" : "Pending Approvals"}
          </CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{mode === "discover" ? "24" : "5"}</div>
          <p className="text-xs text-muted-foreground">
            {mode === "discover" ? "8 pending approval" : "2 new this week"}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            {mode === "discover" ? "Active Users" : "Dataset Views"}
          </CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{mode === "discover" ? "573" : "1,204"}</div>
          <p className="text-xs text-muted-foreground">
            {mode === "discover" ? "+58 from last month" : "+32% this month"}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg. FAIR Score</CardTitle>
          <BarChart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{mode === "discover" ? "87.3" : "92.7"}</div>
          <p className="text-xs text-muted-foreground">
            {mode === "discover" ? "+2.1 from last month" : "Top 10% of contributors"}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

