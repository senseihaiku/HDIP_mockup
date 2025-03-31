import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FairScoreBadge } from "@/components/ui/fair-score-badge"

interface RelatedDatasetsProps {
  currentDatasetId: string
}

export function RelatedDatasets({ currentDatasetId }: RelatedDatasetsProps) {
  // This would normally come from an API call based on the current dataset
  const relatedDatasets = [
    {
      id: "DHA-EHR-002",
      name: "Cardiology Imaging Dataset",
      owner: "AstraZeneca R&D",
      fairScore: 88,
      tags: ["cardiology", "imaging", "echocardiogram"],
      summary: "Echocardiogram images from 50,000 patients",
      accessLevel: "restricted",
      relation: "Same cohort, imaging subset",
    },
    {
      id: "HEART-FAIL-001",
      name: "Heart Failure Registry",
      owner: "Swedish Heart Association",
      fairScore: 92,
      tags: ["heart-failure", "registry", "outcomes"],
      summary: "National registry of heart failure patients and outcomes",
      accessLevel: "controlled",
      relation: "Complementary clinical data",
    },
    {
      id: "CARDIO-BIOMARK-005",
      name: "Cardiovascular Biomarkers",
      owner: "Karolinska Institute",
      fairScore: 85,
      tags: ["biomarkers", "cardiology", "blood-samples"],
      summary: "Biomarker data from 30,000 cardiovascular patients",
      accessLevel: "controlled",
      relation: "Can be linked via pseudonymized IDs",
    },
  ]

  const getAccessLevelBadge = (level: string) => {
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

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Related Datasets</CardTitle>
          <CardDescription>Datasets that can be used together with or complement this dataset</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {relatedDatasets.map((dataset) => (
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
                  <div className="bg-muted p-2 rounded-md">
                    <p className="text-xs font-medium">Relation to current dataset:</p>
                    <p className="text-xs">{dataset.relation}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between pt-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/catalog/${dataset.id}`}>View Details</Link>
                </Button>
                <Button size="sm">Request Access</Button>
              </CardFooter>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

