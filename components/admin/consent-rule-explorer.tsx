"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ConsentRuleExplorer() {
  const [searchQuery, setSearchQuery] = useState("")

  // Mock consent rules data
  const consentRules = [
    {
      id: 1,
      name: "Clinical Data Research Use",
      description: "Allows use of clinical data for research purposes",
      dataTypes: ["Clinical", "Diagnostic"],
      status: "Active",
      lastUpdated: "2025-02-15",
    },
    {
      id: 2,
      name: "Genomic Data Sharing",
      description: "Governs sharing of genomic data with research partners",
      dataTypes: ["Genomic"],
      status: "Active",
      lastUpdated: "2025-03-01",
    },
    {
      id: 3,
      name: "Patient Records Access",
      description: "Controls access to patient records for treatment purposes",
      dataTypes: ["Clinical", "Demographic"],
      status: "Active",
      lastUpdated: "2025-03-10",
    },
    {
      id: 4,
      name: "Anonymized Data Export",
      description: "Rules for exporting anonymized data sets",
      dataTypes: ["Clinical", "Genomic", "Demographic"],
      status: "Under Review",
      lastUpdated: "2025-03-25",
    },
    {
      id: 5,
      name: "Third-Party Research",
      description: "Governs data sharing with third-party research institutions",
      dataTypes: ["Clinical", "Genomic"],
      status: "Inactive",
      lastUpdated: "2024-11-05",
    },
  ]

  const filteredRules = consentRules.filter(
    (rule) =>
      rule.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rule.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rule.dataTypes.some((type) => type.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Consent Rule Explorer</CardTitle>
          <Button>Create New Rule</Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="rules">
          <TabsList className="mb-4">
            <TabsTrigger value="rules">Rules Library</TabsTrigger>
            <TabsTrigger value="editor">Rule Editor</TabsTrigger>
            <TabsTrigger value="dependencies">Rule Dependencies</TabsTrigger>
            <TabsTrigger value="validation">Validation</TabsTrigger>
          </TabsList>

          <TabsContent value="rules">
            <div className="space-y-4">
              <Input
                placeholder="Search rules..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-sm"
              />

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rule Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Data Types</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRules.map((rule) => (
                    <TableRow key={rule.id}>
                      <TableCell className="font-medium">{rule.name}</TableCell>
                      <TableCell>{rule.description}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {rule.dataTypes.map((type, index) => (
                            <Badge key={index} variant="outline">
                              {type}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            rule.status === "Active"
                              ? "default"
                              : rule.status === "Under Review"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {rule.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{rule.lastUpdated}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button variant="outline" size="sm">
                            Clone
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="editor">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Rule Name</label>
                  <Input placeholder="Enter rule name" defaultValue="Clinical Data Research Use" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Status</label>
                  <Select defaultValue="active">
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="review">Under Review</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <Textarea
                  placeholder="Enter rule description"
                  defaultValue="Allows use of clinical data for research purposes"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Rule Definition (JSON)</label>
                <Textarea
                  className="font-mono h-64"
                  defaultValue={`{
  "ruleType": "consent",
  "dataTypes": ["Clinical", "Diagnostic"],
  "allowedPurposes": ["Research", "Quality Improvement"],
  "restrictions": {
    "timeLimit": "5 years",
    "requiresIrbApproval": true,
    "allowsCommercialUse": false
  },
  "dataMinimization": {
    "requiresJustification": true,
    "allowsFullDataset": false
  }
}`}
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline">Cancel</Button>
                <Button variant="outline">Save Draft</Button>
                <Button>Save & Activate</Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="dependencies">
            <div className="p-4 text-center">
              <p className="text-muted-foreground">
                Rule dependency visualization will be available in the next update.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="validation">
            <div className="p-4 text-center">
              <p className="text-muted-foreground">Rule validation tools will be available in the next update.</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

