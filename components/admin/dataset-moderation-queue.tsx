"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { FairScoreBadge } from "@/components/ui/fair-score-badge"

export function DatasetModerationQueue() {
  // selectedDataset state is set but not currently used - will be needed for future API integration
  const [, setSelectedDataset] = useState<string | null>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const datasets = [
    {
      id: "DS-2025-042",
      name: "Genomic Markers Collection",
      submitter: "Uppsala University",
      date: "2025-03-18",
      status: "needs_fair_review",
      fairScore: 0,
    },
    {
      id: "DS-2025-041",
      name: "Mental Health Survey 2024",
      submitter: "Stockholm University",
      date: "2025-03-17",
      status: "new",
      fairScore: 0,
    },
    {
      id: "DS-2025-040",
      name: "Pediatric Asthma Cohort",
      submitter: "Karolinska Institute",
      date: "2025-03-16",
      status: "rework_requested",
      fairScore: 72,
    },
    {
      id: "DS-2025-039",
      name: "Oncology Biomarkers",
      submitter: "Uppsala University",
      date: "2025-03-15",
      status: "needs_fair_review",
      fairScore: 0,
    },
    {
      id: "DS-2025-038",
      name: "Neurological Disorders",
      submitter: "Stockholm University",
      date: "2025-03-14",
      status: "new",
      fairScore: 0,
    },
  ]

  const getStatusBadge = (status: string) => {
    if (!isClient) return null

    switch (status) {
      case "new":
        return <Badge className="bg-blue-100 text-blue-800">New</Badge>
      case "needs_fair_review":
        return <Badge className="bg-yellow-100 text-yellow-800">Needs FAIR Review</Badge>
      case "rework_requested":
        return <Badge className="bg-orange-100 text-orange-800">Rework Requested</Badge>
      default:
        return null
    }
  }

  if (!isClient) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Dataset Moderation Queue</CardTitle>
          <CardDescription>Review and approve datasets submitted to the platform</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Loading dataset moderation queue...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dataset Moderation Queue</CardTitle>
        <CardDescription>Review and approve datasets submitted to the platform</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Dataset Name</TableHead>
              <TableHead>Submitter</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>FAIR Score</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {datasets.map((dataset) => (
              <TableRow key={dataset.id}>
                <TableCell className="font-mono text-xs">{dataset.id}</TableCell>
                <TableCell className="font-medium">{dataset.name}</TableCell>
                <TableCell>{dataset.submitter}</TableCell>
                <TableCell>{dataset.date}</TableCell>
                <TableCell>{getStatusBadge(dataset.status)}</TableCell>
                <TableCell>
                  {dataset.fairScore > 0 ? (
                    <FairScoreBadge score={dataset.fairScore} size="sm" />
                  ) : (
                    <span className="text-muted-foreground text-sm">Not scored</span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => setSelectedDataset(dataset.id)}>
                        Review
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl">
                      <DialogHeader>
                        <DialogTitle>Review Dataset: {dataset.name}</DialogTitle>
                        <DialogDescription>
                          Review the dataset details and provide feedback or approval
                        </DialogDescription>
                      </DialogHeader>

                      <Tabs defaultValue="details" className="mt-4">
                        <TabsList>
                          <TabsTrigger value="details">Dataset Details</TabsTrigger>
                          <TabsTrigger value="fair">FAIR Assessment</TabsTrigger>
                          <TabsTrigger value="feedback">Feedback</TabsTrigger>
                        </TabsList>

                        <TabsContent value="details" className="space-y-4 mt-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h4 className="text-sm font-medium mb-1">Dataset Name</h4>
                              <p className="text-sm">{dataset.name}</p>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium mb-1">Submitter</h4>
                              <p className="text-sm">{dataset.submitter}</p>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium mb-1">Submission Date</h4>
                              <p className="text-sm">{dataset.date}</p>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium mb-1">Status</h4>
                              <p className="text-sm">{getStatusBadge(dataset.status)}</p>
                            </div>
                          </div>

                          <div>
                            <h4 className="text-sm font-medium mb-1">Description</h4>
                            <p className="text-sm text-muted-foreground">
                              This dataset contains genomic markers from 5,000 individuals with rare diseases. The data
                              has been collected between 2020-2024 and includes detailed genetic information.
                            </p>
                          </div>

                          <div>
                            <h4 className="text-sm font-medium mb-1">Data Elements</h4>
                            <ul className="text-sm text-muted-foreground list-disc list-inside">
                              <li>Genetic markers</li>
                              <li>Demographic information</li>
                              <li>Clinical diagnoses</li>
                              <li>Treatment outcomes</li>
                            </ul>
                          </div>
                        </TabsContent>

                        <TabsContent value="fair" className="space-y-4 mt-4">
                          <div className="space-y-4">
                            <div>
                              <h4 className="text-sm font-medium mb-2">Findable</h4>
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <input type="checkbox" id="f1" className="h-4 w-4" />
                                  <label htmlFor="f1" className="text-sm">
                                    F1: Dataset has a globally unique, persistent identifier
                                  </label>
                                </div>
                                <div className="flex items-center gap-2">
                                  <input type="checkbox" id="f2" className="h-4 w-4" />
                                  <label htmlFor="f2" className="text-sm">
                                    F2: Data is described with rich metadata
                                  </label>
                                </div>
                                <div className="flex items-center gap-2">
                                  <input type="checkbox" id="f3" className="h-4 w-4" />
                                  <label htmlFor="f3" className="text-sm">
                                    F3: Metadata clearly includes the identifier of the data
                                  </label>
                                </div>
                                <div className="flex items-center gap-2">
                                  <input type="checkbox" id="f4" className="h-4 w-4" />
                                  <label htmlFor="f4" className="text-sm">
                                    F4: Data is registered or indexed in a searchable resource
                                  </label>
                                </div>
                              </div>
                            </div>

                            <div>
                              <h4 className="text-sm font-medium mb-2">Accessible</h4>
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <input type="checkbox" id="a1" className="h-4 w-4" />
                                  <label htmlFor="a1" className="text-sm">
                                    A1: Data retrievable by their identifier using standardized protocol
                                  </label>
                                </div>
                                <div className="flex items-center gap-2">
                                  <input type="checkbox" id="a2" className="h-4 w-4" />
                                  <label htmlFor="a2" className="text-sm">
                                    A2: Protocol is open, free, and universally implementable
                                  </label>
                                </div>
                              </div>
                            </div>

                            <div className="flex justify-end">
                              <Button>Calculate FAIR Score</Button>
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="feedback" className="space-y-4 mt-4">
                          <div>
                            <h4 className="text-sm font-medium mb-1">Feedback</h4>
                            <Textarea
                              placeholder="Provide feedback to the dataset submitter..."
                              className="min-h-[150px]"
                            />
                          </div>
                        </TabsContent>
                      </Tabs>

                      <DialogFooter className="flex justify-between mt-4">
                        <div className="flex gap-2">
                          <Button variant="destructive">Reject</Button>
                          <Button variant="outline">Request Changes</Button>
                        </div>
                        <Button>Approve Dataset</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
