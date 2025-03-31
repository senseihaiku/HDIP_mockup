"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line, ResponsiveContainer, Legend } from "recharts"

const data = [
  {
    date: "Jan",
    Findable: 78,
    Accessible: 82,
    Interoperable: 70,
    Reusable: 76,
    Overall: 76.5,
  },
  {
    date: "Feb",
    Findable: 80,
    Accessible: 83,
    Interoperable: 72,
    Reusable: 78,
    Overall: 78.25,
  },
  {
    date: "Mar",
    Findable: 82,
    Accessible: 85,
    Interoperable: 75,
    Reusable: 80,
    Overall: 80.5,
  },
  {
    date: "Apr",
    Findable: 85,
    Accessible: 87,
    Interoperable: 78,
    Reusable: 82,
    Overall: 83,
  },
  {
    date: "May",
    Findable: 87,
    Accessible: 89,
    Interoperable: 80,
    Reusable: 84,
    Overall: 85,
  },
  {
    date: "Jun",
    Findable: 88,
    Accessible: 90,
    Interoperable: 83,
    Reusable: 86,
    Overall: 86.75,
  },
  {
    date: "Jul",
    Findable: 90,
    Accessible: 91,
    Interoperable: 85,
    Reusable: 88,
    Overall: 88.5,
  },
  {
    date: "Aug",
    Findable: 91,
    Accessible: 92,
    Interoperable: 87,
    Reusable: 89,
    Overall: 89.75,
  },
  {
    date: "Sep",
    Findable: 92,
    Accessible: 93,
    Interoperable: 88,
    Reusable: 90,
    Overall: 90.75,
  },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background p-3 border rounded-md shadow-md">
        <p className="font-medium">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={`item-${index}`} className="flex items-center gap-2 text-sm">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
            <span>{entry.name}: </span>
            <span className="font-medium">{entry.value}</span>
          </div>
        ))}
      </div>
    )
  }

  return null
}

export function FairScoreOverview() {
  const [timeRange, setTimeRange] = useState<"3m" | "6m" | "9m">("9m")

  const getFilteredData = () => {
    switch (timeRange) {
      case "3m":
        return data.slice(data.length - 3)
      case "6m":
        return data.slice(data.length - 6)
      default:
        return data
    }
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>FAIR Score Trends</CardTitle>
            <CardDescription>Track your data quality metrics over time</CardDescription>
          </div>
          <Tabs defaultValue="9m" onValueChange={(value) => setTimeRange(value as any)}>
            <TabsList className="h-8">
              <TabsTrigger value="3m" className="text-xs px-2">
                3M
              </TabsTrigger>
              <TabsTrigger value="6m" className="text-xs px-2">
                6M
              </TabsTrigger>
              <TabsTrigger value="9m" className="text-xs px-2">
                9M
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-[350px] w-full p-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={getFilteredData()}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" stroke="#6b7280" fontSize={12} tickLine={false} />
              <YAxis
                domain={[60, 100]}
                stroke="#6b7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="top" height={36} wrapperStyle={{ paddingTop: "10px" }} />
              <Line
                type="monotone"
                dataKey="Overall"
                stroke="#0B3D91"
                strokeWidth={3}
                dot={{ r: 4, strokeWidth: 2 }}
                activeDot={{ r: 6, strokeWidth: 2 }}
                name="Overall"
              />
              <Line
                type="monotone"
                dataKey="Findable"
                stroke="#2E7D32"
                strokeWidth={2}
                dot={{ r: 3 }}
                name="Findable"
              />
              <Line
                type="monotone"
                dataKey="Accessible"
                stroke="#1976D2"
                strokeWidth={2}
                dot={{ r: 3 }}
                name="Accessible"
              />
              <Line
                type="monotone"
                dataKey="Interoperable"
                stroke="#F57C00"
                strokeWidth={2}
                dot={{ r: 3 }}
                name="Interoperable"
              />
              <Line
                type="monotone"
                dataKey="Reusable"
                stroke="#7B1FA2"
                strokeWidth={2}
                dot={{ r: 3 }}
                name="Reusable"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

