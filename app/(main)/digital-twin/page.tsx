"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { 
  Activity,
  Brain,
  Heart,
  LineChart,
  List,
  UserPlus,
  CircleSlash,
  Lock,
  AlertCircle,
  Database,
  CalendarDays,
  RefreshCw,
  Share2,
  Download,
  BarChart
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function DigitalTwinPage() {
  const [modelingProgress, setModelingProgress] = useState(78)
  const [healthScore, setHealthScore] = useState(83)
  const [dataQuality, setDataQuality] = useState(65)
  const [twinCreated, setTwinCreated] = useState(false)
  
  return (
    <div className="flex flex-col p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Digital Twin</h1>
          <p className="text-muted-foreground">
            Create and explore your health data digital twin for personalized insights
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled={!twinCreated}>
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button variant="outline" size="sm" disabled={!twinCreated}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm" disabled={!twinCreated}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Update Model
          </Button>
        </div>
      </div>

      {!twinCreated ? (
        <Card className="border-dashed border-2">
          <CardHeader>
            <CardTitle>Create Your Digital Twin</CardTitle>
            <CardDescription>
              Build a digital representation of your health profile to enable personalized insights, 
              better research matching, and accelerated discovery
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name Your Digital Twin</Label>
                  <Input id="name" placeholder="My Health Twin" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    placeholder="A brief description of your digital twin's purpose..." 
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Data Sources</Label>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Switch id="ehr" />
                        <Label htmlFor="ehr" className="font-normal">Electronic Health Records</Label>
                      </div>
                      <span className="text-xs text-muted-foreground">Required</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Switch id="wearables" defaultChecked />
                        <Label htmlFor="wearables" className="font-normal">Wearable Devices</Label>
                      </div>
                      <span className="text-xs text-muted-foreground">Optional</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Switch id="genomics" />
                        <Label htmlFor="genomics" className="font-normal">Genomic Data</Label>
                      </div>
                      <span className="text-xs text-muted-foreground">Optional</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="purpose">Primary Purpose</Label>
                  <Select>
                    <SelectTrigger id="purpose">
                      <SelectValue placeholder="Select primary purpose" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="personal">Personal Health Insights</SelectItem>
                      <SelectItem value="research">Research Participation</SelectItem>
                      <SelectItem value="clinical">Clinical Care Support</SelectItem>
                      <SelectItem value="all">All Purposes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="refresh">Update Frequency</Label>
                  <Select defaultValue="monthly">
                    <SelectTrigger id="refresh">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="manual">Manual Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="detail-level">Detail Level</Label>
                    <span className="text-sm text-muted-foreground">Medium</span>
                  </div>
                  <Slider defaultValue={[50]} min={0} max={100} step={10} />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Basic</span>
                    <span>Comprehensive</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button variant="outline">Cancel</Button>
            <Button onClick={() => setTwinCreated(true)}>Create Digital Twin</Button>
          </CardFooter>
        </Card>
      ) : (
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="health-domains">Health Domains</TabsTrigger>
            <TabsTrigger value="data-sources">Data Sources</TabsTrigger>
            <TabsTrigger value="matching">Data Matching</TabsTrigger>
            <TabsTrigger value="permissions">Permissions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Digital Twin Status</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Active</div>
                  <p className="text-xs text-muted-foreground">Last updated: 2 days ago</p>
                  <div className="mt-4">
                    <div className="flex justify-between text-xs mb-1">
                      <span>Modeling Progress</span>
                      <span>{modelingProgress}%</span>
                    </div>
                    <Progress value={modelingProgress} className="h-2" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Health Score</CardTitle>
                  <Heart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{healthScore}/100</div>
                  <p className="text-xs text-green-500">+3 points from last month</p>
                  <div className="mt-3 text-xs text-muted-foreground">
                    Top factor: Improved activity levels
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Data Quality</CardTitle>
                  <Database className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dataQuality}%</div>
                  <p className="text-xs text-amber-500">Missing genomic data</p>
                  <div className="mt-3 text-xs text-muted-foreground">
                    3 data sources connected
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Data Matches</CardTitle>
                  <UserPlus className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-green-500">7 new potential matches</p>
                  <div className="mt-3 text-xs text-muted-foreground">
                    12 datasets, 8 research projects, 4 clinical trials
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid gap-4 md:grid-cols-7">
              <Card className="md:col-span-4">
                <CardHeader>
                  <CardTitle>Digital Twin Insights</CardTitle>
                  <CardDescription>Key characteristics and patterns from your health data</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium flex items-center">
                        <Heart className="h-4 w-4 mr-2 text-red-500" />
                        Cardiovascular Health
                      </h4>
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-sm">Risk Score</span>
                          <span className="text-sm font-medium">Low (18%)</span>
                        </div>
                        <Progress value={18} className="h-2" />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Based on blood pressure, cholesterol levels, and activity patterns
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium flex items-center">
                        <Brain className="h-4 w-4 mr-2 text-purple-500" />
                        Cognitive Function
                      </h4>
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-sm">Performance</span>
                          <span className="text-sm font-medium">Above Average</span>
                        </div>
                        <Progress value={76} className="h-2" />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Based on cognitive assessments and daily activity patterns
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="md:col-span-3">
                <CardHeader>
                  <CardTitle>Recommendations</CardTitle>
                  <CardDescription>Personalized suggestions based on your digital twin</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-2 pb-2 border-b">
                      <div className="bg-green-100 dark:bg-green-900 p-2 rounded">
                        <Database className="h-4 w-4 text-green-600 dark:text-green-300" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-sm font-medium">Connect genomic data</h4>
                        <p className="text-xs text-muted-foreground">
                          Adding genomic data would improve your twin's predictive capabilities by 43%
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2 pb-2 border-b">
                      <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded">
                        <CalendarDays className="h-4 w-4 text-blue-600 dark:text-blue-300" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-sm font-medium">Research opportunity</h4>
                        <p className="text-xs text-muted-foreground">
                          Your digital twin matches criteria for the Cardiac Health Longevity study
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="health-domains">
            <Card>
              <CardHeader>
                <CardTitle>Health Domains</CardTitle>
                <CardDescription>
                  Key health domains modeled in your digital twin
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center text-muted-foreground py-8">
                  <p>Digital twin health domain visualization would appear here.</p>
                  <p className="text-sm">Progress: {modelingProgress}% complete</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="data-sources">
            <Card>
              <CardHeader>
                <CardTitle>Data Sources</CardTitle>
                <CardDescription>
                  Connected data sources powering your digital twin
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center text-muted-foreground py-8">
                  <p>Connected data sources would appear here.</p>
                  <p className="text-sm">3 active connections</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="matching">
            <Card>
              <CardHeader>
                <CardTitle>Data Matching</CardTitle>
                <CardDescription>
                  Potential matches for research and clinical trials
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center text-muted-foreground py-8">
                  <p>Data matching visualization would appear here.</p>
                  <p className="text-sm">24 potential matches identified</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="permissions">
            <Card>
              <CardHeader>
                <CardTitle>Permissions Management</CardTitle>
                <CardDescription>
                  Control who can access your digital twin and how
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center text-muted-foreground py-8">
                  <p>Permission management controls would appear here.</p>
                  <p className="text-sm">Current access: Controlled access</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
