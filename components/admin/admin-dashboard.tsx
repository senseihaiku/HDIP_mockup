"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { ArrowUpRight, CheckCircle, Clock, HelpCircle, Shield, Users, Database, AlertTriangle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const systemMetrics = [
  {
    title: "System Health",
    metric: "Healthy",
    icon: <CheckCircle className="h-4 w-4 text-green-500" />,
    description: "All systems operational",
    change: "+0%",
    changeType: "positive",
  },
  {
    title: "API Uptime",
    metric: "99.98%",
    icon: <Shield className="h-4 w-4 text-blue-500" />,
    description: "Last 30 days",
    change: "+0.08%",
    changeType: "positive",
  },
  {
    title: "Active Users",
    metric: "573",
    icon: <Users className="h-4 w-4 text-indigo-500" />,
    description: "Current online: 42",
    change: "+12%",
    changeType: "positive",
  },
  {
    title: "Total Datasets",
    metric: "142",
    icon: <Database className="h-4 w-4 text-purple-500" />,
    description: "47 updated this month",
    change: "+8%",
    changeType: "positive",
  },
]

const usageData = [
  { date: "Jan", users: 420, datasets: 115, apiCalls: 15400 },
  { date: "Feb", users: 428, datasets: 118, apiCalls: 15800 },
  { date: "Mar", users: 450, datasets: 120, apiCalls: 16200 },
  { date: "Apr", users: 470, datasets: 123, apiCalls: 17000 },
  { date: "May", users: 490, datasets: 126, apiCalls: 18200 },
  { date: "Jun", users: 515, datasets: 130, apiCalls: 19500 },
  { date: "Jul", users: 540, datasets: 135, apiCalls: 21000 },
  { date: "Aug", users: 560, datasets: 138, apiCalls: 22500 },
  { date: "Sep", users: 573, datasets: 142, apiCalls: 24000 },
]

const recentAlerts = [
  {
    id: "alert-1",
    title: "Unusual API Traffic Detected",
    description: "High volume of API requests from a single IP address",
    status: "warning",
    time: "2 hours ago",
  },
  {
    id: "alert-2",
    title: "Storage Capacity Warning",
    description: "Primary storage cluster reaching 85% capacity",
    status: "warning",
    time: "1 day ago",
  },
  {
    id: "alert-3",
    title: "Security Update Required",
    description: "Critical security patch available for platform components",
    status: "critical",
    time: "2 days ago",
  },
  {
    id: "alert-4",
    title: "Database Backup Failure",
    description: "Scheduled backup failed to complete",
    status: "critical",
    time: "3 days ago",
  },
]

const getAlertIcon = (status: string) => {
  switch (status) {
    case "warning":
      return <Clock className="h-5 w-5 text-amber-500" />
    case "critical":
      return <AlertTriangle className="h-5 w-5 text-red-500" />
    default:
      return <HelpCircle className="h-5 w-5 text-gray-500" />
  }
}

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background p-3 border rounded-md shadow-md">
        <p className="font-medium">{label}</p>
        {payload.map((entry, index) => (
          <div key={`item-${index}`} className="flex items-center gap-2 text-sm">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
            <span>{entry.name}: </span>
            <span className="font-medium">{entry.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    )
  }

  return null
}

export function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {systemMetrics.map((item, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
              {item.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.metric}</div>
              <p className="text-xs text-muted-foreground">{item.description}</p>
              <div className="mt-2 flex items-center text-xs">
                <ArrowUpRight className="h-3 w-3 mr-1 text-green-500" />
                <span className="text-green-500">{item.change}</span>
                <span className="text-muted-foreground ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="usage" className="space-y-4">
        <TabsList>
          <TabsTrigger value="usage">Usage Trends</TabsTrigger>
          <TabsTrigger value="alerts">System Alerts</TabsTrigger>
        </TabsList>
        <TabsContent value="usage" className="space-y-4">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Platform Usage</CardTitle>
              <CardDescription>User registrations, dataset counts, and API calls over time</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={usageData}>
                  <XAxis dataKey="date" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} />
                  <YAxis
                    yAxisId="left"
                    stroke="var(--muted-foreground)"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    stroke="var(--muted-foreground)"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="users"
                    stroke="#0B3D91"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                    name="Users"
                  />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="datasets"
                    stroke="#00B2A9"
                    strokeWidth={2}
                    name="Datasets"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="apiCalls"
                    stroke="#FF7F50"
                    strokeWidth={2}
                    name="API Calls"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-1 lg:col-span-2">
              <CardHeader>
                <CardTitle>User Distribution</CardTitle>
                <CardDescription>Breakdown of user roles and activity</CardDescription>
              </CardHeader>
              <CardContent className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { role: "Admin", count: 12 },
                      { role: "Contributor", count: 78 },
                      { role: "Public", count: 245 },
                      { role: "Data Provider", count: 45 },
                      { role: "Researcher", count: 193 },
                    ]}
                  >
                    <XAxis dataKey="role" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} />
                    <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="count" fill="#0B3D91" name="Users" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common administrative tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button className="w-full justify-start" variant="outline">
                    <Shield className="mr-2 h-4 w-4" />
                    View System Logs
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Database className="mr-2 h-4 w-4" />
                    Manage Access Policies
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Users className="mr-2 h-4 w-4" />
                    View Active Sessions
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Clock className="mr-2 h-4 w-4" />
                    Schedule Maintenance
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Alerts</CardTitle>
              <CardDescription>Recent alerts and warnings requiring attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`flex p-4 rounded-lg border ${
                      alert.status === "critical"
                        ? "border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-900"
                        : "border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-900"
                    }`}
                  >
                    <div className="mr-3">{getAlertIcon(alert.status)}</div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium">{alert.title}</h4>
                        <Badge
                          variant="outline"
                          className={
                            alert.status === "critical"
                              ? "bg-red-100 text-red-800 border-red-200 dark:bg-red-950/50 dark:text-red-300 dark:border-red-800"
                              : "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800"
                          }
                        >
                          {alert.status === "critical" ? "Critical" : "Warning"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{alert.description}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-muted-foreground">{alert.time}</span>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            Dismiss
                          </Button>
                          <Button size="sm">Resolve</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
