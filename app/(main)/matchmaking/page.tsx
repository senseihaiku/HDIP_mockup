"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Search,
  Filter,
  UserPlus,
  Activity,
  Database,
  FileText,
  Users,
  Briefcase,
  Clock,
  CalendarDays
} from "lucide-react"

export default function MatchmakingPage() {
  const [activeTab, setActiveTab] = useState("researchers")
  const [matchStatus, setMatchStatus] = useState<Record<string, string>>({
    "researcher1": "pending",
    "researcher2": "connected",
    "researcher3": "none",
    "dataset1": "connected",
    "dataset2": "none",
    "project1": "connected",
    "project2": "none",
  })
  
  const handleConnect = (id: string) => {
    setMatchStatus(prev => ({
      ...prev,
      [id]: prev[id] === "none" ? "pending" : prev[id]
    }))
  }
  
  return (
    <div className="flex flex-col p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Data Matchmaking</h1>
        <p className="text-muted-foreground">
          Find and connect with researchers, datasets, and projects aligned with your interests
        </p>
      </div>
      
      <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
        <div className="w-full md:w-3/4 space-y-4">
          <Card>
            <CardHeader className="pb-4">
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search for researchers, datasets, or projects..."
                      className="pl-8"
                    />
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center gap-2">
                  <Select defaultValue="relevance">
                    <SelectTrigger className="w-[160px]">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relevance">Relevance</SelectItem>
                      <SelectItem value="recent">Recently Added</SelectItem>
                      <SelectItem value="popular">Most Popular</SelectItem>
                      <SelectItem value="matching">Highest Match %</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[160px]">
                      <Activity className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Activity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Activity</SelectItem>
                      <SelectItem value="active">Recently Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
          </Card>
          
          <Tabs defaultValue="researchers" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="researchers">Researchers</TabsTrigger>
              <TabsTrigger value="datasets">Datasets</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
            </TabsList>
            
            <TabsContent value="researchers" className="space-y-4">
              {/* Researcher Card Example */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src="/placeholder-user.jpg" alt="Researcher" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                        <div>
                          <h3 className="font-medium text-lg">Dr. Jane Doe</h3>
                          <p className="text-sm text-muted-foreground">Clinical Data Scientist at Stockholm University Hospital</p>
                        </div>
                        <div className="flex gap-2">
                          <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200">
                            94% Match
                          </Badge>
                        </div>
                      </div>
                      
                      <p className="text-sm">
                        Specializing in integrating clinical and genomic data for personalized medicine. Looking to collaborate on FAIR data implementations for clinical datasets.
                      </p>
                      
                      <div className="flex flex-wrap gap-2 pt-2">
                        <Badge variant="secondary" className="text-xs">EHR Data Integration</Badge>
                        <Badge variant="secondary" className="text-xs">FAIR Principles</Badge>
                        <Badge variant="secondary" className="text-xs">Cardiovascular Research</Badge>
                      </div>
                      
                      <div className="flex justify-between items-center pt-4">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <UserPlus className="h-4 w-4 mr-1" />
                          <span>5 mutual connections</span>
                        </div>
                        
                        {matchStatus["researcher1"] === "none" && (
                          <Button size="sm" onClick={() => handleConnect("researcher1")}>
                            Connect
                          </Button>
                        )}
                        
                        {matchStatus["researcher1"] === "pending" && (
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-amber-500">Request Pending</span>
                            <Button variant="outline" size="sm" className="h-8 px-2">
                              <Clock className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                        
                        {matchStatus["researcher1"] === "connected" && (
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-green-500">Connected</span>
                            <Button variant="outline" size="sm" className="h-8 px-2">
                              <Users className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="datasets" className="space-y-4">
              {/* Dataset Card Example */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg">
                      <Database className="h-8 w-8 text-blue-600 dark:text-blue-300" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                        <div>
                          <h3 className="font-medium text-lg">Nordic Cardiology Clinical Database</h3>
                          <p className="text-sm text-muted-foreground">Helsinki Heart Institute</p>
                        </div>
                        <div className="flex gap-2">
                          <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200">
                            95% Match
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex flex-col md:flex-row gap-4 md:gap-8">
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground">FAIR Score</p>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">91</span>
                            <Progress value={91} className="h-2 w-16" />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground">Records</p>
                          <p className="font-semibold">7,452</p>
                        </div>
                      </div>
                      
                      <p className="text-sm">
                        Longitudinal clinical data for cardiovascular patients across Nordic countries, including treatments, outcomes, and risk factors.
                      </p>
                      
                      <div className="flex justify-between items-center pt-4">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Activity className="h-4 w-4 mr-1" />
                          <span>Used by 28 researchers</span>
                        </div>
                        
                        {matchStatus["dataset1"] === "connected" && (
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-green-500">Access Granted</span>
                            <Button variant="outline" size="sm" className="h-8 px-2">
                              <FileText className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="projects" className="space-y-4">
              {/* Project Card Example */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="bg-green-100 dark:bg-green-900 p-4 rounded-lg">
                      <Briefcase className="h-8 w-8 text-green-600 dark:text-green-300" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                        <div>
                          <h3 className="font-medium text-lg">Nordic Digital Twin Health Initiative</h3>
                          <p className="text-sm text-muted-foreground">Multi-institutional Research Project</p>
                        </div>
                        <div className="flex gap-2">
                          <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200">
                            97% Match
                          </Badge>
                        </div>
                      </div>
                      
                      <p className="text-sm">
                        Creating digital twin models for personalized health prediction and intervention across Nordic healthcare systems. Seeking partners with expertise in clinical integration.
                      </p>
                      
                      <div className="flex justify-between items-center pt-4">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <CalendarDays className="h-4 w-4 mr-1" />
                          <span>Positions open until May 1, 2025</span>
                        </div>
                        
                        {matchStatus["project1"] === "connected" && (
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-green-500">Member</span>
                            <Button variant="outline" size="sm" className="h-8 px-2">
                              <Users className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="w-full md:w-1/4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Profile</CardTitle>
              <CardDescription>
                Manage your matchmaking preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Match Statistics</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-muted/20 p-2 rounded text-center">
                      <div className="text-2xl font-bold">8</div>
                      <div className="text-xs text-muted-foreground">Active Connections</div>
                    </div>
                    <div className="bg-muted/20 p-2 rounded text-center">
                      <div className="text-2xl font-bold">3</div>
                      <div className="text-xs text-muted-foreground">Pending Requests</div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Recent Activity</h3>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p>• Dr. Jane Doe viewed your profile (1 day ago)</p>
                    <p>• You were matched with a new dataset (2 days ago)</p>
                    <p>• Digital Twin project approved your application (3 days ago)</p>
                  </div>
                </div>
                
                <div className="pt-2">
                  <Button className="w-full" size="sm">Manage Preferences</Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>For You</CardTitle>
              <CardDescription>
                Recommended matches based on your profile
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2 border-b pb-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-user.jpg" alt="Researcher" />
                    <AvatarFallback>ML</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">Dr. Maria Lopez</p>
                    <p className="text-xs text-muted-foreground">Genomics Expert</p>
                  </div>
                  <Badge className="text-xs">94%</Badge>
                </div>
                
                <div className="flex items-center gap-2 border-b pb-2">
                  <div className="bg-purple-100 dark:bg-purple-900 p-1 rounded">
                    <Database className="h-6 w-6 text-purple-600 dark:text-purple-300" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">Danish Biobank Collection</p>
                    <p className="text-xs text-muted-foreground">15,000+ samples</p>
                  </div>
                  <Badge className="text-xs">91%</Badge>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="bg-indigo-100 dark:bg-indigo-900 p-1 rounded">
                    <Briefcase className="h-6 w-6 text-indigo-600 dark:text-indigo-300" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">FAIR Data Initiative</p>
                    <p className="text-xs text-muted-foreground">Cross-European</p>
                  </div>
                  <Badge className="text-xs">89%</Badge>
                </div>
                
                <div className="pt-2">
                  <Button variant="outline" className="w-full" size="sm">View All Matches</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
