import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FairScoreBadge } from "@/components/ui/fair-score-badge"

interface Dataset {
  id: string
  name: string
  owner: string
  fairScore: number
  tags: string[]
  summary: string
  accessLevel: "open" | "controlled" | "restricted"
}

const datasets: Dataset[] = [
  {
    id: "DHA-EHR-001",
    name: "Real-world Cardiology EHR",
    owner: "AstraZeneca R&D",
    fairScore: 91,
    tags: ["cardiology", "ehr", "ai-ready"],
    summary: "120k patients, longitudinal EHR 2010–2022",
    accessLevel: "controlled",
  },
  {
    id: "GEN-DB-042",
    name: "Genomic Markers Collection",
    owner: "Uppsala University",
    fairScore: 88,
    tags: ["genomics", "biomarkers", "research"],
    summary: "Genomic markers from 5,000 individuals with rare diseases",
    accessLevel: "restricted",
  },
  {
    id: "COVID-LT-023",
    name: "COVID-19 Long-term Effects",
    owner: "Karolinska Institute",
    fairScore: 95,
    tags: ["covid-19", "longitudinal", "symptoms"],
    summary: "3-year follow-up data on 2,500 COVID-19 patients",
    accessLevel: "open",
  },
  {
    id: "DIAB-REG-2023",
    name: "Diabetes Registry 2023",
    owner: "Swedish Diabetes Association",
    fairScore: 87,
    tags: ["diabetes", "registry", "treatments"],
    summary: "National registry data on diabetes treatments and outcomes",
    accessLevel: "controlled",
  },
]

const getAccessLevelBadge = (level: Dataset["accessLevel"]) => {
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

export function PopularDatasets() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {datasets.map((dataset) => (
        <Card key={dataset.id} className="overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-lg">{dataset.name}</CardTitle>
                <CardDescription>{dataset.owner}</CardDescription>
              </div>
              <FairScoreBadge score={dataset.fairScore} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {dataset.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
                {getAccessLevelBadge(dataset.accessLevel)}
              </div>
              <p className="text-sm text-muted-foreground">{dataset.summary}</p>
              <div className="flex justify-between items-center">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/catalog/${encodeURIComponent(dataset.id)}`}>View Details</Link>
                </Button>
                <Button size="sm">Request Access</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

