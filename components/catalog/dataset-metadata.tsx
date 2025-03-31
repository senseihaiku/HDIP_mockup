import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface DatasetMetadataProps {
  dataset: any
}

export function DatasetMetadata({ dataset }: DatasetMetadataProps) {
  const metadataGroups = [
    {
      title: "Basic Information",
      fields: [
        { label: "Dataset ID", value: dataset.datasetId },
        { label: "Name", value: dataset.name },
        { label: "Owner", value: dataset.owner },
        { label: "Last Updated", value: dataset.lastUpdated },
        { label: "Access Level", value: dataset.accessLevel, isBadge: true },
      ],
    },
    {
      title: "Data Characteristics",
      fields: [
        { label: "Population", value: dataset.population },
        { label: "Data Elements", value: dataset.dataElements, isList: true },
        { label: "Standards", value: dataset.standards, isList: true },
        { label: "Formats", value: dataset.formats, isList: true },
      ],
    },
    {
      title: "Technical Metadata",
      fields: [
        { label: "Size", value: "4.2 TB" },
        { label: "Number of Records", value: "120,000 patients" },
        { label: "Time Period", value: "2010-2022" },
        { label: "Update Frequency", value: "Quarterly" },
      ],
    },
    {
      title: "Governance & Compliance",
      fields: [
        { label: "Data Controller", value: "AstraZeneca R&D" },
        { label: "Ethics Approval", value: "Yes - Swedish Ethical Review Authority (Ref: 2023-1234)" },
        { label: "GDPR Compliance", value: "Pseudonymized data, Article 9(2)(j) basis" },
        { label: "Access Restrictions", value: "Requires DUA and ethics approval" },
      ],
    },
  ]

  return (
    <div className="space-y-6">
      {metadataGroups.map((group) => (
        <Card key={group.title}>
          <CardHeader>
            <CardTitle>{group.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid gap-4 sm:grid-cols-2">
              {group.fields.map((field) => (
                <div key={field.label} className="space-y-1">
                  <dt className="text-sm font-medium text-muted-foreground">{field.label}</dt>
                  <dd className="text-sm">
                    {field.isList && Array.isArray(field.value) ? (
                      <div className="flex flex-wrap gap-2">
                        {field.value.map((item: string, index: number) =>
                          field.isBadge ? (
                            <Badge key={index} variant="outline">
                              {item}
                            </Badge>
                          ) : (
                            <div key={index}>{item}</div>
                          ),
                        )}
                      </div>
                    ) : field.isBadge ? (
                      <Badge className="bg-blue-100 text-blue-800">{field.value}</Badge>
                    ) : (
                      field.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

