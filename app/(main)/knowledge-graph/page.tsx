"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GraphVisualization } from "@/components/knowledge-graph/graph-visualization"
import { FileDown, Filter, Share2 } from "lucide-react"

export default function KnowledgeGraphPage() {
  return (
    <div className="flex flex-col p-6 space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Knowledge Graph</h1>
          <p className="text-muted-foreground">
            Explore the interconnections between health data resources, research, and applications
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button variant="outline" size="sm">
            <FileDown className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="visualization" className="space-y-4">
        <TabsList>
          <TabsTrigger value="visualization">Visualization</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
          <TabsTrigger value="your-data">Your Data</TabsTrigger>
        </TabsList>
        
        <TabsContent value="visualization" className="space-y-4">
          <GraphVisualization />
        </TabsContent>
        
        <TabsContent value="insights" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Most Connected Nodes</CardTitle>
                <CardDescription>
                  Nodes with the highest number of connections
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex justify-between items-center">
                    <span className="font-medium">FAIR Principles</span>
                    <span className="text-sm bg-primary/10 px-2 py-1 rounded-full">12 connections</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="font-medium">Clinical Data</span>
                    <span className="text-sm bg-primary/10 px-2 py-1 rounded-full">9 connections</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="font-medium">Genomic Data</span>
                    <span className="text-sm bg-primary/10 px-2 py-1 rounded-full">8 connections</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="font-medium">Mayo Clinic</span>
                    <span className="text-sm bg-primary/10 px-2 py-1 rounded-full">7 connections</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="font-medium">Digital Twin</span>
                    <span className="text-sm bg-primary/10 px-2 py-1 rounded-full">6 connections</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Key Data Clusters</CardTitle>
                <CardDescription>
                  Groups of highly interconnected data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex justify-between items-center">
                    <span className="font-medium">Oncology Research</span>
                    <span className="text-sm bg-primary/10 px-2 py-1 rounded-full">14 nodes</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="font-medium">Clinical Trials</span>
                    <span className="text-sm bg-primary/10 px-2 py-1 rounded-full">11 nodes</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="font-medium">Imaging Resources</span>
                    <span className="text-sm bg-primary/10 px-2 py-1 rounded-full">9 nodes</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="font-medium">Standards & Governance</span>
                    <span className="text-sm bg-primary/10 px-2 py-1 rounded-full">8 nodes</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="font-medium">Patient Data</span>
                    <span className="text-sm bg-primary/10 px-2 py-1 rounded-full">7 nodes</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Emerging Connections</CardTitle>
                <CardDescription>
                  Recently formed or strengthening relationships
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex justify-between items-center">
                    <span className="font-medium">Digital Twin & Genomics</span>
                    <span className="text-sm bg-green-500/10 text-green-500 px-2 py-1 rounded-full">+42%</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="font-medium">AI Models & Clinical Data</span>
                    <span className="text-sm bg-green-500/10 text-green-500 px-2 py-1 rounded-full">+38%</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="font-medium">Wearables & EHR</span>
                    <span className="text-sm bg-green-500/10 text-green-500 px-2 py-1 rounded-full">+27%</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="font-medium">Oncology & Cardiology</span>
                    <span className="text-sm bg-green-500/10 text-green-500 px-2 py-1 rounded-full">+21%</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="font-medium">FHIR & Mobile Apps</span>
                    <span className="text-sm bg-green-500/10 text-green-500 px-2 py-1 rounded-full">+18%</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Network Statistics</CardTitle>
                <CardDescription>
                  Analysis of graph structure and properties
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Total Nodes</div>
                    <div className="text-2xl font-bold">248</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Total Connections</div>
                    <div className="text-2xl font-bold">673</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Average Connections</div>
                    <div className="text-2xl font-bold">5.4</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Network Density</div>
                    <div className="text-2xl font-bold">0.37</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Modularity</div>
                    <div className="text-2xl font-bold">0.64</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Average Path Length</div>
                    <div className="text-2xl font-bold">3.2</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Network Growth</CardTitle>
                <CardDescription>
                  Evolution of the knowledge graph over time
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[200px] flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <p>Graph growth visualization would appear here</p>
                  <p className="text-sm">(Nodes +24% | Connections +37% this quarter)</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="your-data" className="space-y-4">
          <div className="bg-muted/20 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Your Data in the Knowledge Graph</h3>
            <p className="text-muted-foreground mb-4">
              Explore how your datasets connect with the broader health data ecosystem and discover 
              potential new connections and collaborations.
            </p>
            
            <div className="flex gap-4 flex-wrap">
              <Button>
                Connect Your Datasets
              </Button>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter to My Connections
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Your Connected Datasets</CardTitle>
                <CardDescription>
                  Your datasets in the knowledge graph
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center text-muted-foreground py-12">
                  <p>Connect your datasets to see them in the knowledge graph</p>
                  <Button variant="outline" className="mt-4">Connect Now</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Recommended Connections</CardTitle>
                <CardDescription>
                  Potential valuable connections for your data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center text-muted-foreground py-12">
                  <p>Connect your datasets to get personalized recommendations</p>
                  <Button variant="outline" className="mt-4">Connect Now</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
