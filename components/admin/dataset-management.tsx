"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, ChevronDown, MoreHorizontal, Eye, Edit, Lock, AlertTriangle } from "lucide-react"
import { FairScoreBadge } from "@/components/ui/fair-score-badge"
import { ScrollArea } from "@/components/ui/scroll-area"

interface DatasetItem {
  id: string
  name: string
  owner: string
  accessLevel: "open" | "controlled" | "restricted"
  fairScore: number
  status: "published" | "draft" | "archived" | "flagged"
  lastUpdated: string
  tags: string[]
}

const datasets: DatasetItem[] = [
  {
    id: "DHA-EHR-001",
    name: "Real-world Cardiology EHR",
    owner: "AstraZeneca R&D",
    accessLevel: "controlled",
    fairScore: 91,
    status: "published",
    lastUpdated: "2025-03-10",
    tags: ["cardiology", "ehr", "ai-ready"],
  },
  {
    id: "GEN-DB-042",
    name: "Genomic Markers Collection",
    owner: "Uppsala University",
    accessLevel: "restricted",
    fairScore: 88,
    status: "published",
    lastUpdated: "2025-02-28",
    tags: ["genomics", "biomarkers", "research"],
  },
  {
    id: "COVID-LT-023",
    name: "COVID-19 Long-term Effects",
    owner: "Karolinska Institute",
    accessLevel: "open",
    fairScore: 95,
    status: "published",
    lastUpdated: "2025-03-05",
    tags: ["covid-19", "longitudinal", "symptoms"],
  },
  {
    id: "DIAB-REG-2023",
    name: "Diabetes Registry 2023",
    owner: "Swedish Diabetes Association",
    accessLevel: "controlled",
    fairScore: 87,
    status: "published",
    lastUpdated: "2025-01-15",
    tags: ["diabetes", "registry", "treatments"],
  },
  {
    id: "MENTAL-SUR-2024",
    name: "Mental Health Survey 2024",
    owner: "Stockholm University",
    accessLevel: "controlled",
    fairScore: 82,
    status: "draft",
    lastUpdated: "2025-03-18",
    tags: ["mental-health", "survey", "psychology"],
  },
  {
    id: "PED-ASTH-002",
    name: "Pediatric Asthma Cohort",
    owner: "Karolinska Institute",
    accessLevel: "restricted",
    fairScore: 89,
    status: "published",
    lastUpdated: "2025-02-10",
    tags: ["pediatric", "asthma", "longitudinal"],
  },
  {
    id: "ONCO-BM-047",
    name: "Oncology Biomarkers",
    owner: "Uppsala University",
    accessLevel: "restricted",
    fairScore: 93,
    status: "published",
    lastUpdated: "2025-03-01",
    tags: ["oncology", "biomarkers", "precision-medicine"],
  },
]

const getAccessLevelBadge = (level: DatasetItem["accessLevel"]) => {
  switch (level) {
    case "open":
      return <Badge className="bg-green-100 text-green-800">Open</Badge>
    case "controlled":
      return <Badge className="bg-blue-100 text-blue-800">Controlled</Badge>
    case "restricted":
      return <Badge className="bg-amber-100 text-amber-800">Restricted</Badge>
    default:
      return null
  }
}

const getStatusBadge = (status: DatasetItem["status"]) => {
  switch (status) {
    case "published":
      return <Badge className="bg-green-100 text-green-800">Published</Badge>
    case "draft":
      return <Badge className="bg-gray-100 text-gray-800">Draft</Badge>
    case "archived":
      return <Badge className="bg-purple-100 text-purple-800">Archived</Badge>
    case "flagged":
      return <Badge className="bg-red-100 text-red-800">Flagged</Badge>
    default:
      return null
  }
}

export function DatasetManagement() {
  const [filteredDatasets, setFilteredDatasets] = useState(datasets)
  const [searchQuery, setSearchQuery] = useState("")
  const [accessFilter, setAccessFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    applyFilters(query, accessFilter, statusFilter)
  }

  const handleAccessFilter = (access: string) => {
    setAccessFilter(access)
    applyFilters(searchQuery, access, statusFilter)
  }

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status)
    applyFilters(searchQuery, accessFilter, status)
  }

  const applyFilters = (query: string, access: string, status: string) => {
    let result = datasets

    if (query) {
      const lowerQuery = query.toLowerCase()
      result = result.filter(
        (dataset) =>
          dataset.name.toLowerCase().includes(lowerQuery) ||
          dataset.owner.toLowerCase().includes(lowerQuery) ||
          dataset.id.toLowerCase().includes(lowerQuery) ||
          dataset.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)),
      )
    }

    if (access !== "all") {
      result = result.filter((dataset) => dataset.accessLevel === access)
    }

    if (status !== "all") {
      result = result.filter((dataset) => dataset.status === status)
    }

    setFilteredDatasets(result)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dataset Management</CardTitle>
        <CardDescription>View and manage datasets in the platform</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search datasets..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <Select value={accessFilter} onValueChange={handleAccessFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Access level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Access Levels</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="controlled">Controlled</SelectItem>
                  <SelectItem value="restricted">Restricted</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={handleStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                  <SelectItem value="flagged">Flagged</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline">
                <ChevronDown className="h-4 w-4 mr-2" />
                More Filters
              </Button>

              <Button>Add Dataset</Button>
            </div>
          </div>

          <ScrollArea className="h-[450px] rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Dataset</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Access Level</TableHead>
                  <TableHead>FAIR Score</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDatasets.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      No datasets found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredDatasets.map((dataset) => (
                    <TableRow key={dataset.id}>
                      <TableCell>
                        <div className="font-medium">{dataset.name}</div>
                        <div className="text-xs text-muted-foreground">{dataset.id}</div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {dataset.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>{dataset.owner}</TableCell>
                      <TableCell>{getAccessLevelBadge(dataset.accessLevel)}</TableCell>
                      <TableCell>
                        <FairScoreBadge score={dataset.fairScore} size="sm" />
                      </TableCell>
                      <TableCell>{getStatusBadge(dataset.status)}</TableCell>
                      <TableCell>{dataset.lastUpdated}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" /> View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" /> Edit Metadata
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Lock className="h-4 w-4 mr-2" /> Manage Access
                            </DropdownMenuItem>
                            {dataset.status === "published" ? (
                              <DropdownMenuItem>
                                <AlertTriangle className="h-4 w-4 mr-2" /> Archive Dataset
                              </DropdownMenuItem>
                            ) : dataset.status === "draft" ? (
                              <DropdownMenuItem>Publish Dataset</DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem>Restore Dataset</DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  )
}

