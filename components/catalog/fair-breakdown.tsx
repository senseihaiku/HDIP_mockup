import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { FairScoreBadge } from "@/components/ui/fair-score-badge"
import { CheckCircle2, HelpCircle, XCircle } from "lucide-react"

interface FairBreakdownProps {
  score: number
  breakdown: {
    Findable: boolean
    Accessible: boolean
    Interoperable: boolean
    Reusable: boolean
  }
}

export function FairBreakdown({ score, breakdown }: FairBreakdownProps) {
  const fairPrinciples = [
    {
      name: "Findable",
      status: breakdown.Findable,
      description: "Data and metadata are easy to find by both humans and computers.",
      criteria: [
        { name: "Globally unique persistent identifiers", met: true },
        { name: "Rich metadata describing the data", met: true },
        { name: "Metadata clearly includes identifier for the data", met: true },
        { name: "Metadata registered in searchable resource", met: true },
      ],
    },
    {
      name: "Accessible",
      status: breakdown.Accessible,
      description: "Once found, data and metadata can be retrieved using standardized protocols.",
      criteria: [
        { name: "Retrievable by identifier using standardized protocol", met: true },
        { name: "Protocol is open, free, and universally implementable", met: true },
        { name: "Authentication and authorization procedures where necessary", met: true },
        { name: "Metadata accessible even when data is no longer available", met: false },
      ],
    },
    {
      name: "Interoperable",
      status: breakdown.Interoperable,
      description:
        "Data and metadata use formal, accessible, shared, and broadly applicable language for knowledge representation.",
      criteria: [
        { name: "Uses formal, accessible, shared vocabularies", met: true },
        { name: "Uses FAIR-compliant vocabularies", met: true },
        { name: "Includes qualified references to other data", met: false },
      ],
    },
    {
      name: "Reusable",
      status: breakdown.Reusable,
      description: "Data and metadata are richly described with a plurality of accurate and relevant attributes.",
      criteria: [
        { name: "Accurate and relevant attributes", met: true },
        { name: "Clear and accessible data usage license", met: true },
        { name: "Detailed provenance", met: true },
        { name: "Meets domain-relevant community standards", met: true },
      ],
    },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle>FAIR Score Assessment</CardTitle>
            <FairScoreBadge score={score} size="lg" showLabel />
          </div>
          <CardDescription>
            Evaluation of dataset against FAIR principles (Findable, Accessible, Interoperable, Reusable)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Progress value={score} className="h-2" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {fairPrinciples.map((principle) => (
                <div
                  key={principle.name}
                  className={`p-3 rounded-lg border ${principle.status ? "border-green-200 bg-green-50" : "border-yellow-200 bg-yellow-50"}`}
                >
                  <div className="flex justify-center mb-2">
                    {principle.status ? (
                      <CheckCircle2 className="h-6 w-6 text-green-600" />
                    ) : (
                      <HelpCircle className="h-6 w-6 text-yellow-600" />
                    )}
                  </div>
                  <h3 className="font-medium">{principle.name}</h3>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {fairPrinciples.map((principle) => (
          <Card key={principle.name}>
            <CardHeader>
              <div className="flex items-center gap-2">
                {principle.status ? (
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                ) : (
                  <HelpCircle className="h-5 w-5 text-yellow-600" />
                )}
                <CardTitle>{principle.name}</CardTitle>
              </div>
              <CardDescription>{principle.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {principle.criteria.map((criterion, index) => (
                  <li key={index} className="flex items-start gap-2">
                    {criterion.met ? (
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
                    )}
                    <span>{criterion.name}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

