"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { 
  ZoomIn, 
  ZoomOut, 
  RefreshCw, 
  Filter, 
  Search, 
  Download 
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface GraphNode {
  id: string
  label: string
  type: string
  size?: number
  color?: string
}

interface GraphLink {
  source: string
  target: string
  label?: string
  strength?: number
  color?: string
}

interface GraphData {
  nodes: GraphNode[]
  links: GraphLink[]
}

export function GraphVisualization() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [forceStrength, setForceStrength] = useState(50)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Sample data for the knowledge graph
  const sampleGraphData: GraphData = {
    nodes: [
      // Health Data Categories
      { id: "clinical", label: "Clinical Data", type: "category", size: 30, color: "#3498db" },
      { id: "genomic", label: "Genomic Data", type: "category", size: 30, color: "#3498db" },
      { id: "imaging", label: "Medical Imaging", type: "category", size: 30, color: "#3498db" },
      { id: "sensors", label: "Sensor Data", type: "category", size: 30, color: "#3498db" },
      { id: "ehr", label: "Electronic Health Records", type: "category", size: 30, color: "#3498db" },
      
      // Research Domains
      { id: "oncology", label: "Oncology", type: "domain", size: 25, color: "#e74c3c" },
      { id: "cardiology", label: "Cardiology", type: "domain", size: 25, color: "#e74c3c" },
      { id: "neurology", label: "Neurology", type: "domain", size: 25, color: "#e74c3c" },
      { id: "pediatrics", label: "Pediatrics", type: "domain", size: 25, color: "#e74c3c" },
      
      // Datasets
      { id: "dataset1", label: "Cancer Genome Atlas", type: "dataset", size: 20, color: "#2ecc71" },
      { id: "dataset2", label: "Heart Disease Study", type: "dataset", size: 20, color: "#2ecc71" },
      { id: "dataset3", label: "Brain MRI Collection", type: "dataset", size: 20, color: "#2ecc71" },
      { id: "dataset4", label: "Diabetes Monitoring", type: "dataset", size: 20, color: "#2ecc71" },
      { id: "dataset5", label: "COVID-19 Patient Records", type: "dataset", size: 20, color: "#2ecc71" },
      
      // Research Institutes
      { id: "institute1", label: "Mayo Clinic", type: "organization", size: 22, color: "#9b59b6" },
      { id: "institute2", label: "Johns Hopkins", type: "organization", size: 22, color: "#9b59b6" },
      { id: "institute3", label: "Stanford Medicine", type: "organization", size: 22, color: "#9b59b6" },
      
      // Methods and Standards
      { id: "fair", label: "FAIR Principles", type: "standard", size: 18, color: "#f39c12" },
      { id: "hipaa", label: "HIPAA", type: "standard", size: 18, color: "#f39c12" },
      { id: "hl7", label: "HL7 FHIR", type: "standard", size: 18, color: "#f39c12" },
      
      // Applications
      { id: "app1", label: "Precision Medicine", type: "application", size: 22, color: "#1abc9c" },
      { id: "app2", label: "Digital Twin", type: "application", size: 22, color: "#1abc9c" },
      { id: "app3", label: "Disease Prediction", type: "application", size: 22, color: "#1abc9c" }
    ],
    links: [
      // Category to Dataset links
      { source: "genomic", target: "dataset1", label: "includes" },
      { source: "clinical", target: "dataset2", label: "includes" },
      { source: "imaging", target: "dataset3", label: "includes" },
      { source: "sensors", target: "dataset4", label: "includes" },
      { source: "ehr", target: "dataset5", label: "includes" },
      
      // Domain to Dataset links
      { source: "oncology", target: "dataset1", label: "studies" },
      { source: "cardiology", target: "dataset2", label: "studies" },
      { source: "neurology", target: "dataset3", label: "studies" },
      { source: "pediatrics", target: "dataset4", label: "supports" },
      
      // Institute to Dataset links
      { source: "institute1", target: "dataset1", label: "maintains" },
      { source: "institute2", target: "dataset2", label: "maintains" },
      { source: "institute3", target: "dataset3", label: "maintains" },
      { source: "institute1", target: "dataset4", label: "maintains" },
      { source: "institute2", target: "dataset5", label: "maintains" },
      
      // Standards to Categories links
      { source: "fair", target: "genomic", label: "governs" },
      { source: "fair", target: "clinical", label: "governs" },
      { source: "fair", target: "imaging", label: "governs" },
      { source: "hipaa", target: "ehr", label: "regulates" },
      { source: "hl7", target: "clinical", label: "standardizes" },
      { source: "hl7", target: "ehr", label: "standardizes" },
      
      // Applications to Datasets links
      { source: "app1", target: "dataset1", label: "utilizes" },
      { source: "app2", target: "dataset2", label: "utilizes" },
      { source: "app2", target: "dataset3", label: "utilizes" },
      { source: "app3", target: "dataset4", label: "utilizes" },
      { source: "app3", target: "dataset5", label: "utilizes" },
      
      // Interconnections
      { source: "oncology", target: "cardiology", label: "relates to" },
      { source: "app1", target: "app2", label: "complements" },
      { source: "app2", target: "app3", label: "complements" }
    ]
  }

  useEffect(() => {
    // This would be replaced with an actual D3.js or other graph visualization library implementation
    // For now we'll simulate loading the visualization
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    // Cleanup function
    return () => clearTimeout(timer)
  }, [])

  // This function would handle the actual graph rendering using D3.js or similar
  // For now it's just a placeholder
  const renderGraph = () => {
    // D3.js or other graph visualization library would be used here
    // This would involve setting up forces, drag behavior, zoom, etc.
    console.log("Graph rendering with:", {
      nodes: sampleGraphData.nodes.length,
      links: sampleGraphData.links.length,
      forceStrength
    })
  }

  // In a real implementation, this would filter nodes based on search and type
  const getFilteredData = () => {
    let filteredNodes = sampleGraphData.nodes
    if (searchQuery) {
      filteredNodes = filteredNodes.filter(node => 
        node.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    if (filterType !== "all") {
      filteredNodes = filteredNodes.filter(node => node.type === filterType)
    }
    
    // Only include links where both source and target are in the filtered nodes
    const filteredNodeIds = filteredNodes.map(node => node.id)
    const filteredLinks = sampleGraphData.links.filter(link => 
      filteredNodeIds.includes(link.source as string) && 
      filteredNodeIds.includes(link.target as string)
    )
    
    return { nodes: filteredNodes, links: filteredLinks }
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    // In a real implementation, this would trigger graph re-rendering
  }

  const handleFilterChange = (value: string) => {
    setFilterType(value)
    // In a real implementation, this would trigger graph re-rendering
  }

  const handleForceStrengthChange = (value: number[]) => {
    setForceStrength(value[0])
    // In a real implementation, this would update the force simulation
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const exportGraph = () => {
    // In a real implementation, this would export the graph as SVG or PNG
    alert("Graph exported (simulation)")
  }

  return (
    <div className={`flex flex-col ${isFullscreen ? 'fixed inset-0 z-50 bg-background' : ''}`}>
      <div className="flex flex-wrap gap-2 mb-4 p-2 bg-muted/20 rounded-md">
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search nodes..."
              value={searchQuery}
              onChange={handleSearch}
              className="pl-8"
            />
          </div>
        </div>
        
        <div className="flex-1 min-w-[150px]">
          <Select value={filterType} onValueChange={handleFilterChange}>
            <SelectTrigger className="w-full">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="category">Categories</SelectItem>
              <SelectItem value="domain">Research Domains</SelectItem>
              <SelectItem value="dataset">Datasets</SelectItem>
              <SelectItem value="organization">Organizations</SelectItem>
              <SelectItem value="standard">Standards</SelectItem>
              <SelectItem value="application">Applications</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" title="Zoom In">
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" title="Zoom Out">
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" title="Reset View" onClick={renderGraph}>
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" title="Export" onClick={exportGraph}>
            <Download className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" title="Toggle Fullscreen" onClick={toggleFullscreen}>
            {isFullscreen ? (
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 9V4M9 9H4M9 9L3 3M15 9V4M15 9H20M15 9L21 3M9 15V20M9 15H4M9 15L3 21M15 15V20M15 15H20M15 15L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 14H10V20M20 10H14V4M14 10L21 3M3 21L10 14M4 4L10 10M14 20L20 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col space-y-2 mb-4">
        <div className="flex justify-between items-center">
          <span className="text-sm">Force Strength</span>
          <span className="text-sm">{forceStrength}%</span>
        </div>
        <Slider 
          value={[forceStrength]} 
          min={10} 
          max={100} 
          step={5} 
          onValueChange={handleForceStrengthChange} 
        />
      </div>
      
      <Card className={`flex-1 ${isFullscreen ? 'h-[calc(100vh-200px)]' : 'h-[600px]'}`}>
        <CardContent className="p-0 h-full relative">
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                <p className="mt-4 text-muted-foreground">Loading graph visualization...</p>
              </div>
            </div>
          ) : (
            <div ref={containerRef} className="w-full h-full bg-muted/10 rounded-md flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <p className="mb-2">Knowledge Graph Visualization</p>
                <p className="text-sm mb-4">{getFilteredData().nodes.length} nodes and {getFilteredData().links.length} connections</p>
                <div className="flex flex-wrap justify-center gap-3 max-w-lg mx-auto">
                  {["category", "domain", "dataset", "organization", "standard", "application"].map(type => {
                    const color = sampleGraphData.nodes.find(n => n.type === type)?.color || "#ccc"
                    return (
                      <div key={type} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }}></div>
                        <span className="text-xs capitalize">{type}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      <div className="mt-4">
        <p className="text-sm text-muted-foreground">
          This visualization shows the relationships between different health data resources, 
          research domains, and applications. Hover over nodes and edges to see more details.
        </p>
      </div>
    </div>
  )
}
