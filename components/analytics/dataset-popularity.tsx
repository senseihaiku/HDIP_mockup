"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const popularityData = [
  { dataset: "Real-world Cardiology EHR", requests: 78, downloads: 245, views: 1250 },
  { dataset: "COVID-19 Long-term Effects", requests: 65, downloads: 210, views: 980 },
  { dataset: "Genomic Markers Collection", requests: 52, downloads: 185, views: 820 },
  { dataset: "Diabetes Registry 2023", requests: 48, downloads: 165, views: 750 },
  { dataset: "Oncology Biomarkers", requests: 42, downloads: 150, views: 680 },
  { dataset: "Mental Health Survey 2024", requests: 38, downloads: 135, views: 620 },
  { dataset: "Pediatric Asthma Cohort", requests: 35, downloads: 125, views: 580 },
  { dataset: "Neurological Disorders", requests: 32, downloads: 115, views: 520 },
]

export function DatasetPopularity() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="chart">
        <TabsList>
          <TabsTrigger value="chart">Chart View</TabsTrigger>
          <TabsTrigger value="table">Table View</TabsTrigger>
        </TabsList>
        <TabsContent value="chart" className="pt-4">
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={popularityData}>
                <CartesianGrid strokeDasharray="3 3" horizontal />
                <YAxis />
                <XAxis dataKey="dataset" />
                <Bar dataKey="requests" fill="#8884d8" name="Access Requests" />
                <Bar dataKey="downloads" fill="#82ca9d" name="Downloads" />
                <Tooltip />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
        <TabsContent value="table" className="pt-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Dataset</TableHead>
                  <TableHead className="text-right">Access Requests</TableHead>
                  <TableHead className="text-right">Downloads</TableHead>
                  <TableHead className="text-right">Views</TableHead>
                  <TableHead>Popularity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {popularityData.map((item, index) => (
                  <TableRow key={item.dataset}>
                    <TableCell className="font-medium">{item.dataset}</TableCell>
                    <TableCell className="text-right">{item.requests}</TableCell>
                    <TableCell className="text-right">{item.downloads}</TableCell>
                    <TableCell className="text-right">{item.views}</TableCell>
                    <TableCell>
                      {index === 0 && <Badge className="bg-green-100 text-green-800">Very High</Badge>}
                      {index === 1 && <Badge className="bg-green-100 text-green-800">Very High</Badge>}
                      {(index === 2 || index === 3) && <Badge className="bg-blue-100 text-blue-800">High</Badge>}
                      {(index === 4 || index === 5) && <Badge className="bg-blue-100 text-blue-800">Medium</Badge>}
                      {(index === 6 || index === 7) && <Badge className="bg-gray-100 text-gray-800">Low</Badge>}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Top Access Requests</CardTitle>
            <CardDescription>Most requested datasets this quarter</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {popularityData.slice(0, 4).map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{item.dataset}</p>
                    <p className="text-sm text-muted-foreground">{item.requests} requests</p>
                  </div>
                  <div
                    className={`
                    h-2 w-24 rounded-full 
                    ${index === 0 ? "bg-green-500" : ""}
                    ${index === 1 ? "bg-green-400" : ""}
                    ${index === 2 ? "bg-blue-500" : ""}
                    ${index === 3 ? "bg-blue-400" : ""}
                  `}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Top Downloads</CardTitle>
            <CardDescription>Most downloaded datasets this quarter</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {popularityData.slice(0, 4).map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{item.dataset}</p>
                    <p className="text-sm text-muted-foreground">{item.downloads} downloads</p>
                  </div>
                  <div
                    className={`
                    h-2 w-24 rounded-full 
                    ${index === 0 ? "bg-green-500" : ""}
                    ${index === 1 ? "bg-green-400" : ""}
                    ${index === 2 ? "bg-blue-500" : ""}
                    ${index === 3 ? "bg-blue-400" : ""}
                  `}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

