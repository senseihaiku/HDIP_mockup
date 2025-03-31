import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FairScoreBadge } from "@/components/ui/fair-score-badge"
import { TrendingUp, Calendar, User, ExternalLink } from "lucide-react"

interface TrendingDataset {
  id: string
  name: string
  owner: string
  fairScore: number
  tags: string[]
  summary: string
  accessLevel: "open" | "controlled" | "restricted"
  lastUpdated: string
  trendingReason: string
  previewImage?: string
}

const trendingDatasets: TrendingDataset[] = [
  {
    id: "DHA-EHR-001",
    name: "Real-world Cardiology EHR",
    owner: "AstraZeneca R&D",
    fairScore: 91,
    tags: ["cardiology", "ehr", "ai-ready"],
    summary: "120k patients, longitudinal EHR 2010–2022 with comprehensive cardiovascular outcomes and treatments.",
    accessLevel: "controlled",
    lastUpdated: "2 weeks ago",
    trendingReason: "High demand in AI research",
    previewImage: "/placeholder.svg?height=100&width=200",
  },
  {
    id: "GEN-DB-042",
    name: "Genomic Markers Collection",
    owner: "Uppsala University",
    fairScore: 88,
    tags: ["genomics", "biomarkers", "research"],
    summary: "Genomic markers from 5,000 individuals with rare diseases, including full sequencing data.",
    accessLevel: "restricted",
    lastUpdated: "1 month ago",
    trendingReason: "Featured in recent publication",
    previewImage: "/placeholder.svg?height=100&width=200",
  },
  {
    id: "COVID-LT-023",
    name: "COVID-19 Long-term Effects",
    owner: "Karolinska Institute",
    fairScore: 95,
    tags: ["covid-19", "longitudinal", "symptoms"],
    summary: "3-year follow-up data on 2,500 COVID-19 patients with detailed symptom progression.",
    accessLevel: "open",
    lastUpdated: "3 weeks ago",
    trendingReason: "Recently updated with new cohort",
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

export function MarketplaceTrending() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {trendingDatasets.map((dataset) => (
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
                    <div className="flex items-center text-xs">
                      <TrendingUp className="h-3 w-3 mr-1 text-primary" />
                      <span className="font-medium text-primary">{dataset.trendingReason}</span>
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

