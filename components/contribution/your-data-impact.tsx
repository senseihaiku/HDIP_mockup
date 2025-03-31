import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { BarChart, LineChart, PieChart } from "lucide-react"

export function YourDataImpact() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Citations</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+5 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Research Impact</CardTitle>
            <LineChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">High</div>
            <p className="text-xs text-muted-foreground">Top 15% in your field</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usage Distribution</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Global</div>
            <p className="text-xs text-muted-foreground">12 countries accessing</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="usage" className="space-y-4">
        <TabsList>
          <TabsTrigger value="usage">Usage Analytics</TabsTrigger>
          <TabsTrigger value="citations">Citations & Publications</TabsTrigger>
          <TabsTrigger value="collaborations">Collaboration Opportunities</TabsTrigger>
        </TabsList>
        <TabsContent value="usage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Dataset Usage Over Time</CardTitle>
              <CardDescription>How your datasets are being accessed and used</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center">Usage Analytics Chart</div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Top Datasets by Usage</CardTitle>
                <CardDescription>Your most accessed datasets</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">Cardiovascular Outcomes Study</h4>
                      <p className="text-sm text-muted-foreground">342 views, 78 downloads</p>
                    </div>
                    <Badge>High Impact</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">Genomic Markers Dataset</h4>
                      <p className="text-sm text-muted-foreground">156 views, 42 downloads</p>
                    </div>
                    <Badge variant="outline">Medium Impact</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Demographics</CardTitle>
                <CardDescription>Who is using your data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center">Demographics Chart</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="citations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Publications Citing Your Data</CardTitle>
              <CardDescription>Research that has referenced your datasets</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium">Novel Approaches to Cardiovascular Risk Prediction</h4>
                  <p className="text-sm text-muted-foreground">Journal of Medical Informatics, 2024</p>
                  <div className="flex items-center mt-2">
                    <Badge variant="outline" className="mr-2">
                      Impact Factor: 4.2
                    </Badge>
                    <Badge variant="outline">Citations: 8</Badge>
                  </div>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium">Genomic Markers for Early Disease Detection</h4>
                  <p className="text-sm text-muted-foreground">Nature Genetics, 2023</p>
                  <div className="flex items-center mt-2">
                    <Badge variant="outline" className="mr-2">
                      Impact Factor: 12.8
                    </Badge>
                    <Badge variant="outline">Citations: 16</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="collaborations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Collaboration Opportunities</CardTitle>
              <CardDescription>Potential research partners based on your data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium">Uppsala University Research Group</h4>
                  <p className="text-sm text-muted-foreground">Working on similar cardiovascular outcomes research</p>
                  <div className="flex items-center mt-2">
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-200 mr-2">High Match</Badge>
                    <Badge variant="outline">5 mutual connections</Badge>
                  </div>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium">AstraZeneca R&D Division</h4>
                  <p className="text-sm text-muted-foreground">Interested in genomic markers for drug development</p>
                  <div className="flex items-center mt-2">
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 mr-2">Medium Match</Badge>
                    <Badge variant="outline">2 mutual connections</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

