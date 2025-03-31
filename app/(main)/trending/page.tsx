"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MarketplaceTrending } from "@/components/marketplace/marketplace-trending"
import { RecommendedDatasets } from "@/components/marketplace/recommended-datasets"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function TrendingPage() {
  return (
    <div className="flex flex-col p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Trending</h1>
        <p className="text-muted-foreground">
          Discover popular and recently updated datasets
        </p>
      </div>

      <Tabs defaultValue="popular" className="space-y-4">
        <TabsList>
          <TabsTrigger value="popular">Popular</TabsTrigger>
          <TabsTrigger value="recent">Recently Updated</TabsTrigger>
          <TabsTrigger value="featured">Featured</TabsTrigger>
        </TabsList>

        <TabsContent value="popular" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="md:col-span-2">
              <MarketplaceTrending />
            </div>
            <div className="md:row-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Most Requested</CardTitle>
                  <CardDescription>Datasets with the highest request volume</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="font-medium">National Health Survey 2024</div>
                        </div>
                        <div className="text-sm text-muted-foreground">{120 - i * 15} requests</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="md:col-span-2">
              <RecommendedDatasets />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="recent" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="md:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle>Recently Updated Datasets</CardTitle>
                  <CardDescription>Datasets with recent significant updates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                      <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                        <div className="flex items-center gap-3">
                          <div>
                            <div className="font-medium">COVID-19 Regional Data Set {i}</div>
                            <div className="text-sm text-muted-foreground">
                              Updated: {i} day{i !== 1 ? "s" : ""} ago
                            </div>
                          </div>
                        </div>
                        <div className="text-sm">
                          <div className="text-xs inline-block px-2 py-1 rounded-full bg-green-100 text-green-800">
                            + {i * 512} records
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="featured" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-1">
            <Card>
              <CardHeader>
                <CardTitle>Featured Collection: Health Equity Research</CardTitle>
                <CardDescription>
                  Curated datasets focusing on health disparities and equity research
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center gap-4 p-3 border rounded-md hover:bg-muted/50">
                      <div className="flex-1">
                        <div className="font-medium">Social Determinants of Health - Dataset {i}</div>
                        <div className="text-sm text-muted-foreground">
                          Comprehensive data on social factors affecting health outcomes
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium">FAIR Score</div>
                        <div className="text-xl font-bold text-blue-600">{80 + i}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
