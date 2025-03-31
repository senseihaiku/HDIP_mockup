import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FairScoreBadge } from "@/components/ui/fair-score-badge"
import { Calendar, User, ExternalLink, ThumbsUp } from "lucide-react"

interface RecommendedDataset {
  id: string
  name: string
  owner: string
  fairScore: number
  tags: string[]
  summary: string
  accessLevel: "open" | "controlled" | "restricted"
  lastUpdated: string
  recommendationReason: string
  matchScore: number
  previewImage?: string
}

const recommendedDatasets: RecommendedDataset[] = [
  {
    id: "DIAB-REG-2023",
    name: "Diabetes Registry 2023",
    owner: "Swedish Diabetes Association",
    fairScore: 87,
    tags: ["diabetes", "registry", "treatments"],
    summary: "National registry data on diabetes treatments and outcomes with 10-year longitudinal data.",
    accessLevel: "controlled",
    lastUpdated: "1 month ago",
    recommendationReason: "Matches your research profile",
    matchScore: 92,
    previewImage: "/placeholder.svg?height=100&width=200",
  },
  {
    id: "NEURO-IMG-056",
    name: "Neurological Imaging Collection",
    owner: "Brain Research Institute",
    fairScore: 93,
    tags: ["neurology", "imaging", "mri"],
    summary: "High-resolution MRI scans from 1,200 patients with various neurological conditions.",
    accessLevel: "restricted",
    lastUpdated: "2 weeks ago",
    recommendationReason: "Similar to your recent searches",
    matchScore: 85,
    previewImage: "/placeholder.svg?height=100&width=200",
  },
  {
    id: "PHARMA-TRIAL-108",
    name: "Pharmaceutical Trial Results",
    owner: "Open Pharma Consortium",
    fairScore: 90,
    tags: ["clinical-trials", "pharmaceuticals", "open-science"],
    summary: "Anonymized results from 50+ clinical trials for cardiovascular medications.",
    accessLevel: "open",
    lastUpdated: "3 days ago",
    recommendationReason: "Complements your datasets",
    matchScore: 88,
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

export function RecommendedDatasets() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {recommendedDatasets.map((dataset) => (
        <Card key={dataset.id} className="overflow-hidden flex flex-col">
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-lg">{dataset.name}</CardTitle>
                <CardDescription className="flex items-center gap-1 mt-1">
                  <User className="h-3 w-3" /> {dataset.owner}
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
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/80 to-transparent p-2">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center">
                        <ThumbsUp className="h-3 w-3 mr-1 text-primary" />
                        <span className="font-medium text-primary">{dataset.recommendationReason}</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {dataset.matchScore}% match
                      </Badge>
                    </div>
                  </div>
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
              <div className="flex items-center text-xs text-muted-foreground">
                <Calendar className="h-3 w-3 mr-1" /> Last updated: {dataset.lastUpdated}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between pt-2 border-t">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/catalog/${dataset.id}`}>
                <ExternalLink className="h-3 w-3 mr-1" /> View Details
              </Link>
            </Button>
            <Button size="sm">Request Access</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

