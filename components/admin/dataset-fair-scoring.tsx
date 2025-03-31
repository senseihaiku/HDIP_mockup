"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

export function DatasetFairScoring() {
  const [searchQuery, setSearchQuery] = useState("")

  // Mock datasets data
  const datasets = [
    {
      id: 1,
      name: "Clinical Trial Results 2024",
      fairScore: 92,
      findable: 95,
      accessible: 90,
      interoperable: 88,
      reusable: 95,
      lastEvaluated: "2025-03-15",
    },
    {
      id: 2,
      name: "Patient Demographics Database",
      fairScore: 78,
      findable: 85,
      accessible: 70,
      interoperable: 75,
      reusable: 80,
      lastEvaluated: "2025-03-10",
    },
    {
      id: 3,
      name: "Genomic Sequencing Data",
      fairScore: 88,
      findable: 90,
      accessible: 85,
      interoperable: 92,
      reusable: 85,
      lastEvaluated: "2025-03-20",
    },
    {
      id: 4,
      name: "Medical Imaging Repository",
      fairScore: 65,
      findable: 60,
      accessible: 75,
      interoperable: 55,
      reusable: 70,
      lastEvaluated: "2025-02-28",
    },
    {
      id: 5,
      name: "Healthcare Provider Network",
      fairScore: 81,
      findable: 85,
      accessible: 80,
      interoperable: 75,
      reusable: 85,
      lastEvaluated: "2025-03-05",
    },
  ]

  const filteredDatasets = datasets.filter((dataset) => dataset.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Dataset FAIR Scoring</CardTitle>
          <div className="flex space-x-2">
            <Button variant="outline">Batch Evaluate</Button>
            <Button>Configure Scoring</Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="datasets">
          <TabsList className="mb-4">
            <TabsTrigger value="datasets">Dataset Scores</TabsTrigger>
            <TabsTrigger value="criteria">Scoring Criteria</TabsTrigger>
            <TabsTrigger value="history">Score History</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          </TabsList>

          <TabsContent value="datasets">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Input
                  placeholder="Search datasets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="max-w-sm"
                />
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by score" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Scores</SelectItem>
                    <SelectItem value="high">High (80-100)</SelectItem>
                    <SelectItem value="medium">Medium (60-79)</SelectItem>
                    <SelectItem value="low">Low (0-59)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Dataset Name</TableHead>
                    <TableHead>FAIR Score</TableHead>
                    <TableHead>Findable</TableHead>
                    <TableHead>Accessible</TableHead>
                    <TableHead>Interoperable</TableHead>
                    <TableHead>Reusable</TableHead>
                    <TableHead>Last Evaluated</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDatasets.map((dataset) => (
                    <TableRow key={dataset.id}>
                      <TableCell className="font-medium">{dataset.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Progress value={dataset.fairScore} className="w-[60px]" />
                          <span>{dataset.fairScore}%</span>
                        </div>
                      </TableCell>
                      <TableCell>{dataset.findable}%</TableCell>
                      <TableCell>{dataset.accessible}%</TableCell>
                      <TableCell>{dataset.interoperable}%</TableCell>
                      <TableCell>{dataset.reusable}%</TableCell>
                      <TableCell>{dataset.lastEvaluated}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            Evaluate
                          </Button>
                          <Button variant="outline" size="sm">
                            Details
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="criteria">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Findable</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">F1: Persistent Identifier</p>
                      <p className="text-sm text-muted-foreground">
                        Data is assigned a globally unique and persistent identifier
                      </p>
                    </div>
                    <div className="w-[200px]">
                      <Slider defaultValue={[25]} max={25} step={1} />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">F2: Rich Metadata</p>
                      <p className="text-sm text-muted-foreground">Data is described with rich metadata</p>
                    </div>
                    <div className="w-[200px]">
                      <Slider defaultValue={[25]} max={25} step={1} />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">F3: Metadata Registration</p>
                      <p className="text-sm text-muted-foreground">
                        Metadata clearly includes the identifier for the data
                      </p>
                    </div>
                    <div className="w-[200px]">
                      <Slider defaultValue={[25]} max={25} step={1} />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">F4: Searchability</p>
                      <p className="text-sm text-muted-foreground">
                        Data is registered or indexed in a searchable resource
                      </p>
                    </div>
                    <div className="w-[200px]">
                      <Slider defaultValue={[25]} max={25} step={1} />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Accessible</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">A1: Retrievable by Identifier</p>
                      <p className="text-sm text-muted-foreground">
                        Data is retrievable by their identifier using a standardized protocol
                      </p>
                    </div>
                    <div className="w-[200px]">
                      <Slider defaultValue={[35]} max={35} step={1} />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">A2: Metadata Accessibility</p>
                      <p className="text-sm text-muted-foreground">
                        Metadata remains accessible even when data is no longer available
                      </p>
                    </div>
                    <div className="w-[200px]">
                      <Slider defaultValue={[35]} max={35} step={1} />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">A3: Authentication & Authorization</p>
                      <p className="text-sm text-muted-foreground">
                        Clear access conditions and authorization procedures
                      </p>
                    </div>
                    <div className="w-[200px]">
                      <Slider defaultValue={[30]} max={30} step={1} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline">Reset to Defaults</Button>
                <Button>Save Configuration</Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="history">
            <div className="p-4 text-center">
              <p className="text-muted-foreground">Score history visualization will be available in the next update.</p>
            </div>
          </TabsContent>

          <TabsContent value="recommendations">
            <div className="p-4 text-center">
              <p className="text-muted-foreground">
                Automated recommendations based on FAIR scores will be available in the next update.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

