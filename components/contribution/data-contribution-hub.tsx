import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FairScoreBadge } from "@/components/ui/fair-score-badge"
import { Calendar, ExternalLink, BarChart, Eye, Download, Plus } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface ContributedDataset {
  id: string
  name: string
  fairScore: number
  tags: string[]
  summary: string
  accessLevel: "open" | "controlled" | "restricted"
  lastUpdated: string
  status: "published" | "draft" | "under-review"
  views: number
  downloads: number
  previewImage?: string
}

const contributedDatasets: ContributedDataset[] = [
  {
    id: "YOUR-CARDIO-001",
    name: "Cardiovascular Outcomes Study",
    fairScore: 92,
    tags: ["cardiology", "outcomes", "longitudinal"],
    summary: "Your longitudinal study of cardiovascular outcomes in 5,000 patients over 8 years.",
    accessLevel: "controlled",
    lastUpdated: "1 week ago",
    status: "published",
    views: 342,
    downloads: 78,
    previewImage: "/placeholder.svg?height=100&width=200",
  },
  {
    id: "YOUR-GENOMIC-002",
    name: "Genomic Markers Dataset",
    fairScore: 87,
    tags: ["genomics", "biomarkers", "sequencing"],
    summary: "Genomic sequencing data from your research on genetic markers for disease prediction.",
    accessLevel: "restricted",
    lastUpdated: "2 days ago",
    status: "published",
    views: 156,
    downloads: 42,
    previewImage: "/placeholder.svg?height=100&width=200",
  },
  {
    id: "YOUR-IMAGING-003",
    name: "Neural Imaging Collection",
    fairScore: 76,
    tags: ["neurology", "imaging", "mri"],
    summary: "Collection of MRI scans from your neurological research studies.",
    accessLevel: "controlled",
    lastUpdated: "Just now",
    status: "draft",
    views: 0,
    downloads: 0,
    previewImage: "/placeholder.svg?height=100&width=200",
  },
]

const getAccessLevelBadge = (level: "open" | "controlled" | "restricted") => {
  switch (level) {
    case "open":
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Open</Badge>
    case "controlled":
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Controlled</Badge>
    case "restricted":
      return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">Restricted</Badge>
    default:
      return null
  }
}

const getStatusBadge = (status: "published" | "draft" | "under-review") => {
  switch (status) {
    case "published":
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Published</Badge>
    case "draft":
      return <Badge className="bg-slate-100 text-slate-800 hover:bg-slate-200">Draft</Badge>
    case "under-review":
      return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">Under Review</Badge>
    default:
      return null
  }
}

export function DataContributionHub() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Your Datasets</h2>
        <Button>+ Add New Dataset</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {contributedDatasets.map((dataset) => (
          <Card key={dataset.id} className="overflow-hidden flex flex-col">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{dataset.name}</CardTitle>
                  <CardDescription className="flex items-center gap-1 mt-1">
                    {getStatusBadge(dataset.status)}
                  </CardDescription>
                </div>
                <FairScoreBadge score={dataset.fairScore} />
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="space-y-4">
                {dataset.previewImage && (
                  <div className="relative h-32 w-full overflow-hidden rounded-md bg-muted">
                    <img
                      src={dataset.previewImage || "/placeholder.svg"}
                      alt={`Preview of ${dataset.name}`}
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}
                <div className="flex flex-wrap gap-2">
                  {dataset.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                  {getAccessLevelBadge(dataset.accessLevel)}
                </div>
                <p className="text-sm text-muted-foreground">{dataset.summary}</p>

                {dataset.status === "published" && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span>{dataset.views} views</span>
                      </div>
                      <div className="flex items-center">
                        <Download className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span>{dataset.downloads} downloads</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>FAIR Score</span>
                        <span className="font-medium">{dataset.fairScore}%</span>
                      </div>
                      <Progress value={dataset.fairScore} className="h-1" />
                    </div>
                  </div>
                )}

                <div className="flex items-center text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3 mr-1" /> Updated: {dataset.lastUpdated}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between pt-2 border-t">
              <Button variant="outline" size="sm" asChild>
                <Link href={`/contribute/${dataset.id}`}>
                  <ExternalLink className="h-3 w-3 mr-1" /> Manage
                </Link>
              </Button>
              {dataset.status === "draft" ? (
                <Button size="sm">Publish</Button>
              ) : (
                <Button size="sm" variant="secondary">
                  <BarChart className="h-3 w-3 mr-1" /> View Analytics
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}

        {/* Add New Dataset Card */}
        <Card className="overflow-hidden flex flex-col border-dashed">
          <div className="flex flex-col items-center justify-center h-full p-6 text-center">
            <div className="rounded-full bg-primary/10 p-3 mb-4">
              <Plus className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-medium mb-2">Add New Dataset</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Share your valuable health data with the research community
            </p>
            <Button asChild>
              <Link href="/contribute/new">Start Contributing</Link>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}

