"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const monthlyData = [
  {
    month: "Jan",
    "Data Access Requests": 42,
    Downloads: 156,
    "API Calls": 2340,
    "New Users": 28,
  },
  {
    month: "Feb",
    "Data Access Requests": 38,
    Downloads: 142,
    "API Calls": 2120,
    "New Users": 24,
  },
  {
    month: "Mar",
    "Data Access Requests": 45,
    Downloads: 168,
    "API Calls": 2580,
    "New Users": 32,
  },
  {
    month: "Apr",
    "Data Access Requests": 52,
    Downloads: 185,
    "API Calls": 2780,
    "New Users": 38,
  },
  {
    month: "May",
    "Data Access Requests": 48,
    Downloads: 172,
    "API Calls": 2650,
    "New Users": 35,
  },
  {
    month: "Jun",
    "Data Access Requests": 56,
    Downloads: 198,
    "API Calls": 2920,
    "New Users": 42,
  },
  {
    month: "Jul",
    "Data Access Requests": 62,
    Downloads: 215,
    "API Calls": 3150,
    "New Users": 48,
  },
  {
    month: "Aug",
    "Data Access Requests": 58,
    Downloads: 205,
    "API Calls": 3050,
    "New Users": 45,
  },
  {
    month: "Sep",
    "Data Access Requests": 65,
    Downloads: 228,
    "API Calls": 3280,
    "New Users": 52,
  },
]

const userTypeData = [
  { type: "Researchers", count: 245 },
  { type: "Data Providers", count: 78 },
  { type: "Industry Partners", count: 124 },
  { type: "Administrators", count: 32 },
  { type: "Public Viewers", count: 94 },
]

export function UsageStatistics() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">573</div>
            <p className="text-xs text-muted-foreground">+58 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Access Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">65</div>
            <p className="text-xs text-muted-foreground">+7 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Downloads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">228</div>
            <p className="text-xs text-muted-foreground">+23 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">API Calls</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,280</div>
            <p className="text-xs text-muted-foreground">+230 from last month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="activity">
        <TabsList>
          <TabsTrigger value="activity">Activity Trends</TabsTrigger>
          <TabsTrigger value="users">User Distribution</TabsTrigger>
        </TabsList>
        <TabsContent value="activity" className="pt-4">
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <YAxis />
                <XAxis dataKey="month" />
                <Line type="monotone" dataKey="Data Access Requests" stroke="#8884d8" />
                <Line type="monotone" dataKey="Downloads" stroke="#82ca9d" />
                <Line type="monotone" dataKey="New Users" stroke="#ffc658" />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
        <TabsContent value="users" className="pt-4">
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={userTypeData}>
                <CartesianGrid strokeDasharray="3 3" horizontal />
                <YAxis />
                <XAxis dataKey="type" />
                <Bar dataKey="count" fill="#8884d8" name="Users" />
                <Tooltip />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

