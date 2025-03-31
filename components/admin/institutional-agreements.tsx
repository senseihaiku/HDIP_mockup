"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DateRangePicker } from "@/components/ui/date-range-picker"

export function InstitutionalAgreements() {
  const [searchQuery, setSearchQuery] = useState("")

  // Mock agreements data
  const agreements = [
    {
      id: 1,
      name: "University Medical Center Data Sharing",
      institution: "University Medical Center",
      type: "Data Sharing",
      status: "Active",
      startDate: "2025-01-15",
      endDate: "2026-01-14",
      contactPerson: "Dr. Jane Smith",
    },
    {
      id: 2,
      name: "Research Institute Collaboration",
      institution: "National Research Institute",
      type: "Research Collaboration",
      status: "Active",
      startDate: "2024-11-01",
      endDate: "2025-10-31",
      contactPerson: "Prof. Robert Johnson",
    },
    {
      id: 3,
      name: "Healthcare Provider Data Access",
      institution: "Regional Healthcare Provider",
      type: "Data Access",
      status: "Pending Approval",
      startDate: "2025-04-01",
      endDate: "2026-03-31",
      contactPerson: "Dr. Michael Brown",
    },
    {
      id: 4,
      name: "Pharmaceutical Company Clinical Trial",
      institution: "PharmaCorp Inc.",
      type: "Clinical Trial",
      status: "Draft",
      startDate: "2025-05-01",
      endDate: "2027-04-30",
      contactPerson: "Dr. Sarah Williams",
    },
    {
      id: 5,
      name: "Academic Research Consortium",
      institution: "Multi-University Consortium",
      type: "Research Collaboration",
      status: "Expired",
      startDate: "2023-06-01",
      endDate: "2025-02-28",
      contactPerson: "Prof. David Miller",
    },
  ]

  const filteredAgreements = agreements.filter(
    (agreement) =>
      agreement.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agreement.institution.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agreement.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agreement.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Institutional Agreements</CardTitle>
          <Button>New Agreement</Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="active">
          <TabsList className="mb-4">
            <TabsTrigger value="active">Active Agreements</TabsTrigger>
            <TabsTrigger value="pending">Pending Approval</TabsTrigger>
            <TabsTrigger value="drafts">Drafts</TabsTrigger>
            <TabsTrigger value="expired">Expired</TabsTrigger>
          </TabsList>

          <div className="flex items-center space-x-2 mb-4">
            <Input
              placeholder="Search agreements..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-sm"
            />
            <DateRangePicker />
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Agreement Name</TableHead>
                <TableHead>Institution</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Contact Person</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAgreements.map((agreement) => (
                <TableRow key={agreement.id}>
                  <TableCell className="font-medium">{agreement.name}</TableCell>
                  <TableCell>{agreement.institution}</TableCell>
                  <TableCell>{agreement.type}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        agreement.status === "Active"
                          ? "default"
                          : agreement.status === "Pending Approval"
                            ? "secondary"
                            : agreement.status === "Draft"
                              ? "outline"
                              : "destructive"
                      }
                    >
                      {agreement.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {agreement.startDate} to {agreement.endDate}
                  </TableCell>
                  <TableCell>{agreement.contactPerson}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <TabsContent value="active">{/* Content for active tab is shown by default */}</TabsContent>

          <TabsContent value="pending">
            <div className="p-4 text-center">
              <p className="text-muted-foreground">Filter is applied to show only pending agreements.</p>
            </div>
          </TabsContent>

          <TabsContent value="drafts">
            <div className="p-4 text-center">
              <p className="text-muted-foreground">Filter is applied to show only draft agreements.</p>
            </div>
          </TabsContent>

          <TabsContent value="expired">
            <div className="p-4 text-center">
              <p className="text-muted-foreground">Filter is applied to show only expired agreements.</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

