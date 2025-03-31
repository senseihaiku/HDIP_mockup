"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { FairScoreBadge } from "@/components/ui/fair-score-badge"
import { ChevronRight, Clock, FileText, Lock } from "lucide-react"
import Link from "next/link"

interface UserDataset {
  id: string
  name: string
  accessType: "owner" | "contributor" | "viewer"
  accessExpiry?: string
  lastAccessed: string
  fairScore: number
  status: "active" | "pending" | "expired"
}

const userDatasets: UserDataset[] = [
  {
    id: "DHA-EHR-001",
    name: "Real-world Cardiology EHR",
    accessType: "owner",
    lastAccessed: "2025-03-20",
    fairScore: 91,
    status: "active",
  },
  {
    id: "COVID-LT-023",
    name: "COVID-19 Long-term Effects",
    accessType: "contributor",
    accessExpiry: "2025-12-31",
    lastAccessed: "2025-03-20",
    fairScore: 95,
    status: "active",
  },
  {
    id: "ONCO-BM-047",
    name: "Oncology Biomarkers",
    accessType: "viewer",
    accessExpiry: "2025-06-30",
    lastAccessed: "2025-03-13",
    fairScore: 93,
    status: "active",
  },
  {
    id: "GEN-DB-042",
    name: "Genomic Markers Collection",
    accessType: "viewer",
    accessExpiry: "Awaiting approval",
    lastAccessed: "Never",
    fairScore: 88,
    status: "pending",
  },
  {
    id: "DIAB-REG-2023",
    name: "Diabetes Registry 2023",
    accessType: "viewer",
    accessExpiry: "2025-01-31",
    lastAccessed: "2025-01-15",
    fairScore: 87,
    status: "expired",
  },
]

export function ProfileDatasets() {
  return (
    <Tabs defaultValue="access">
      <TabsList>
        <TabsTrigger value="access">Your Access</TabsTrigger>
        <TabsTrigger value="owned">Owned Datasets</TabsTrigger>
        <TabsTrigger value="contributed">Contributed</TabsTrigger>
      </TabsList>

      <TabsContent value="access" className="mt-4 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Datasets You Can Access</CardTitle>
            <CardDescription>Datasets you own, contribute to, or have access permissions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userDatasets.map((dataset) => (
                <Card key={dataset.id} className="overflow-hidden">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{dataset.name}</h3>
                        <FairScoreBadge score={dataset.fairScore} size="sm" />
                      </div>

                      <div className="flex flex-wrap gap-2 text-xs">
                        <Badge
                          className={
                            dataset.accessType === "owner"
                              ? "bg-purple-100 text-purple-800"
                              : dataset.accessType === "contributor"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-gray-100 text-gray-800"
                          }
                        >
                          {dataset.accessType === "owner"
                            ? "Owner"
                            : dataset.accessType === "contributor"
                              ? "Contributor"
                              : "Viewer"}
                        </Badge>

                        <Badge
                          className={
                            dataset.status === "active"
                              ? "bg-green-100 text-green-800"
                              : dataset.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }
                        >
                          {dataset.status === "active"
                            ? "Active"
                            : dataset.status === "pending"
                              ? "Pending"
                              : "Expired"}
                        </Badge>
                      </div>

                      <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          Last accessed: {dataset.lastAccessed}
                        </div>
                        {dataset.accessExpiry && (
                          <div className="flex items-center">
                            <Lock className="h-3 w-3 mr-1" />
                            {dataset.status === "pending"
                              ? "Status: " + dataset.accessExpiry
                              : "Expires: " + dataset.accessExpiry}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {dataset.status === "active" && (
                        <Button variant="outline" size="sm" className="whitespace-nowrap">
                          <FileText className="h-4 w-4 mr-2" />
                          Access Data
                        </Button>
                      )}
                      <Button size="sm" className="whitespace-nowrap" asChild>
                        <Link href={`/catalog/${encodeURIComponent(dataset.id)}`}>
                          View Details
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Access Summary</CardTitle>
            <CardDescription>Your data access statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">Owned Datasets</h4>
                  <span className="text-sm text-muted-foreground">1/5</span>
                </div>
                <Progress value={20} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">Active Access</h4>
                  <span className="text-sm text-muted-foreground">3/5</span>
                </div>
                <Progress value={60} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">Pending Requests</h4>
                  <span className="text-sm text-muted-foreground">1/5</span>
                </div>
                <Progress value={20} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="owned" className="mt-4 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Datasets You Own</CardTitle>
            <CardDescription>Datasets you have uploaded and manage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userDatasets
                .filter((dataset) => dataset.accessType === "owner")
                .map((dataset) => (
                  <Card key={dataset.id} className="overflow-hidden">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{dataset.name}</h3>
                          <FairScoreBadge score={dataset.fairScore} size="sm" />
                        </div>

                        <div className="flex flex-wrap gap-2 text-xs">
                          <Badge className="bg-purple-100 text-purple-800">Owner</Badge>
                          <Badge className="bg-green-100 text-green-800">Active</Badge>
                        </div>

                        <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            Last accessed: {dataset.lastAccessed}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="whitespace-nowrap">
                          Manage Access
                        </Button>
                        <Button variant="outline" size="sm" className="whitespace-nowrap">
                          Edit Metadata
                        </Button>
                        <Button size="sm" className="whitespace-nowrap" asChild>
                          <Link href={`/catalog/${encodeURIComponent(dataset.id)}`}>
                            View Details
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}

              {userDatasets.filter((dataset) => dataset.accessType === "owner").length === 0 && (
                <div className="flex flex-col items-center justify-center p-8 text-center">
                  <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Datasets Found</h3>
                  <p className="text-muted-foreground mb-4">You haven't uploaded any datasets yet.</p>
                  <Button>Upload Dataset</Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="contributed" className="mt-4 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Datasets You Contribute To</CardTitle>
            <CardDescription>Datasets where you have contributor access</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userDatasets
                .filter((dataset) => dataset.accessType === "contributor")
                .map((dataset) => (
                  <Card key={dataset.id} className="overflow-hidden">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{dataset.name}</h3>
                          <FairScoreBadge score={dataset.fairScore} size="sm" />
                        </div>

                        <div className="flex flex-wrap gap-2 text-xs">
                          <Badge className="bg-blue-100 text-blue-800">Contributor</Badge>
                          <Badge className="bg-green-100 text-green-800">Active</Badge>
                        </div>

                        <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            Last accessed: {dataset.lastAccessed}
                          </div>
                          {dataset.accessExpiry && (
                            <div className="flex items-center">
                              <Lock className="h-3 w-3 mr-1" />
                              Expires: {dataset.accessExpiry}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="whitespace-nowrap">
                          <FileText className="h-4 w-4 mr-2" />
                          Access Data
                        </Button>
                        <Button size="sm" className="whitespace-nowrap" asChild>
                          <Link href={`/catalog/${encodeURIComponent(dataset.id)}`}>
                            View Details
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}

              {userDatasets.filter((dataset) => dataset.accessType === "contributor").length === 0 && (
                <div className="flex flex-col items-center justify-center p-8 text-center">
                  <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Contributions Found</h3>
                  <p className="text-muted-foreground mb-4">You don't contribute to any datasets yet.</p>
                  <Button>Browse Datasets</Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

