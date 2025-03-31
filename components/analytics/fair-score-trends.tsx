"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const fairScoreData = [
  {
    quarter: "Q1 2024",
    Overall: 78,
    Findable: 82,
    Accessible: 85,
    Interoperable: 72,
    Reusable: 73,
  },
  {
    quarter: "Q2 2024",
    Overall: 81,
    Findable: 85,
    Accessible: 87,
    Interoperable: 76,
    Reusable: 76,
  },
  {
    quarter: "Q3 2024",
    Overall: 84,
    Findable: 88,
    Accessible: 90,
    Interoperable: 79,
    Reusable: 79,
  },
  {
    quarter: "Q4 2024",
    Overall: 86,
    Findable: 90,
    Accessible: 92,
    Interoperable: 82,
    Reusable: 80,
  },
  {
    quarter: "Q1 2025",
    Overall: 89,
    Findable: 92,
    Accessible: 94,
    Interoperable: 85,
    Reusable: 85,
  },
]

const datasetScores = [
  { dataset: "Real-world Cardiology EHR", score: 91 },
  { dataset: "Genomic Markers Collection", score: 88 },
  { dataset: "COVID-19 Long-term Effects", score: 95 },
  { dataset: "Diabetes Registry 2023", score: 87 },
  { dataset: "Mental Health Survey 2024", score: 82 },
  { dataset: "Pediatric Asthma Cohort", score: 89 },
  { dataset: "Oncology Biomarkers", score: 93 },
  { dataset: "Neurological Disorders", score: 85 },
]

export function FairScoreTrends() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="trends">
        <TabsList>
          <TabsTrigger value="trends">Score Trends</TabsTrigger>
          <TabsTrigger value="datasets">Dataset Comparison</TabsTrigger>
        </TabsList>
        <TabsContent value="trends" className="pt-4">
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={fairScoreData}>
                <CartesianGrid strokeDasharray="3 3" />
                <YAxis domain={[60, 100]} />
                <XAxis dataKey="quarter" />
                <Line type="monotone" dataKey="Overall" stroke="#8884d8" name="Overall" />
                <Line type="monotone" dataKey="Findable" stroke="#82ca9d" name="Findable" />
                <Line type="monotone" dataKey="Accessible" stroke="#ffc658" name="Accessible" />
                <Line type="monotone" dataKey="Interoperable" stroke="#ff8042" name="Interoperable" />
                <Line type="monotone" dataKey="Reusable" stroke="#0088fe" name="Reusable" />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <Card>
              <CardContent className="p-4">
                <div className="text-sm font-medium">Findable</div>
                <div className="text-2xl font-bold">92</div>
                <div className="text-xs text-muted-foreground">+2 from last quarter</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-sm font-medium">Accessible</div>
                <div className="text-2xl font-bold">94</div>
                <div className="text-xs text-muted-foreground">+2 from last quarter</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-sm font-medium">Interoperable</div>
                <div className="text-2xl font-bold">85</div>
                <div className="text-xs text-muted-foreground">+3 from last quarter</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-sm font-medium">Reusable</div>
                <div className="text-2xl font-bold">85</div>
                <div className="text-xs text-muted-foreground">+5 from last quarter</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="datasets" className="pt-4">
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={datasetScores}>
                <CartesianGrid strokeDasharray="3 3" horizontal />
                <YAxis domain={[60, 100]} />
                <XAxis dataKey="dataset" />
                <Bar dataKey="score" fill="#8884d8" name="FAIR Score" />
                <Tooltip />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

