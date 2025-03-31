import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function KnowledgeBaseOverview() {
  const sections = [
    {
      title: "Operating Model",
      description: "The HDIP operating model consists of 6 domains and cross-cutting processes",
      link: "/kb/operating-model",
      items: [
        "Data Governance",
        "Data Acquisition",
        "Data Quality & FAIR",
        "Access Management",
        "Platform Operations",
        "Stakeholder Engagement",
      ],
    },
    {
      title: "Workflow Diagrams",
      description: "Step-by-step processes for key platform activities",
      link: "/kb/workflows",
      items: [
        "Data Onboarding Workflow",
        "Access Request Workflow",
        "Consent Management Workflow",
        "Data Quality Assessment",
      ],
    },
    {
      title: "Data Catalog & FAIR",
      description: "Understanding and implementing FAIR data principles",
      link: "/kb/fair",
      items: [
        "FAIR Principles Overview",
        "FAIR Implementation Checklist",
        "Data Catalog Structure",
        "Metadata Standards",
      ],
    },
    {
      title: "Templates & Glossary",
      description: "Standard templates and definitions used across the platform",
      link: "/kb/templates",
      items: ["Data Use Agreement (DUA)", "Dataset Onboarding Form", "RACI Matrix", "Glossary of Terms"],
    },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Welcome to the HDIP Knowledge Base</CardTitle>
          <CardDescription>
            A comprehensive resource for understanding the Health Data Innovation Platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            The Health Data Innovation Platform (HDIP) Knowledge Base provides documentation, guides, and resources to
            help you understand and use the platform effectively. Whether you're a data provider, researcher, or
            administrator, you'll find information tailored to your needs.
          </p>
          <p>
            Browse the sections below to learn about the platform's operating model, workflows, FAIR data principles,
            and available templates.
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {sections.map((section) => (
          <Card key={section.title}>
            <CardHeader>
              <CardTitle>{section.title}</CardTitle>
              <CardDescription>{section.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-4">
                {section.items.map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <Button variant="outline" asChild className="w-full">
                <Link href={section.link}>
                  View Section <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

