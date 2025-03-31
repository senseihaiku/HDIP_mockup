"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { DateRangePicker } from "@/components/ui/date-range-picker"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

export function ComplianceReports() {
  // Mock data for reports
  const accessComplianceData = [
    { name: "Jan", compliant: 95, nonCompliant: 5 },
    { name: "Feb", compliant: 92, nonCompliant: 8 },
    { name: "Mar", compliant: 98, nonCompliant: 2 },
    { name: "Apr", compliant: 97, nonCompliant: 3 },
    { name: "May", compliant: 94, nonCompliant: 6 },
    { name: "Jun", compliant: 99, nonCompliant: 1 },
  ]

  const consentStatusData = [
    { name: "Valid", value: 68, color: "#4ade80" },
    { name: "Pending Review", value: 15, color: "#facc15" },
    { name: "Expired", value: 12, color: "#f87171" },
    { name: "Revoked", value: 5, color: "#94a3b8" },
  ]

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Compliance Reports</CardTitle>
          <div className="flex items-center space-x-2">
            <DateRangePicker />
            <Button>Generate Report</Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="access">
          <TabsList className="mb-4">
            <TabsTrigger value="access">Access Compliance</TabsTrigger>
            <TabsTrigger value="consent">Consent Status</TabsTrigger>
            <TabsTrigger value="gdpr">GDPR Compliance</TabsTrigger>
            <TabsTrigger value="hipaa">HIPAA Compliance</TabsTrigger>
          </TabsList>

          <TabsContent value="access">
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={accessComplianceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="compliant" stackId="a" fill="#4ade80" name="Compliant Access" />
                  <Bar dataKey="nonCompliant" stackId="a" fill="#f87171" name="Non-Compliant Access" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="consent">
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={consentStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={150}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {consentStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="gdpr">
            <div className="p-4 text-center">
              <p className="text-muted-foreground">GDPR compliance reporting will be available in the next update.</p>
            </div>
          </TabsContent>

          <TabsContent value="hipaa">
            <div className="p-4 text-center">
              <p className="text-muted-foreground">HIPAA compliance reporting will be available in the next update.</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

