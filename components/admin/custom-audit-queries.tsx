"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function CustomAuditQueries() {
  const [queryText, setQueryText] = useState(
    "SELECT * FROM audit_logs WHERE action = 'Dataset Access' AND timestamp > NOW() - INTERVAL '7 days'",
  )
  // Using useState but ignoring the setter since we're using static data for now
  const [savedQueries] = useState([
    {
      id: 1,
      name: "Recent Dataset Access",
      query: "SELECT * FROM audit_logs WHERE action = 'Dataset Access' AND timestamp > NOW() - INTERVAL '7 days'",
    },
    {
      id: 2,
      name: "Failed Login Attempts",
      query:
        "SELECT * FROM audit_logs WHERE action = 'Login' AND details LIKE '%failed%' AND timestamp > NOW() - INTERVAL '30 days'",
    },
    {
      id: 3,
      name: "Admin Actions",
      query:
        "SELECT * FROM audit_logs WHERE user IN (SELECT email FROM users WHERE role = 'admin') AND timestamp > NOW() - INTERVAL '14 days'",
    },
  ])

  // Mock query results
  const queryResults = [
    {
      id: 1,
      timestamp: "2025-03-30T14:22:18Z",
      user: "john.doe@example.com",
      action: "Dataset Access",
      details: "Accessed Clinical Trial Dataset #4872",
    },
    {
      id: 2,
      timestamp: "2025-03-29T09:15:42Z",
      user: "sarah.smith@example.com",
      action: "Dataset Access",
      details: "Accessed Patient Records Dataset #2341",
    },
    {
      id: 3,
      timestamp: "2025-03-28T16:08:33Z",
      user: "robert.johnson@example.com",
      action: "Dataset Access",
      details: "Accessed Genomic Data Dataset #7823",
    },
    {
      id: 4,
      timestamp: "2025-03-27T11:45:21Z",
      user: "emily.davis@example.com",
      action: "Dataset Access",
      details: "Accessed Clinical Trial Dataset #4872",
    },
    {
      id: 5,
      timestamp: "2025-03-26T13:32:10Z",
      user: "michael.wilson@example.com",
      action: "Dataset Access",
      details: "Accessed Patient Records Dataset #2341",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Custom Audit Queries</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="query">
          <TabsList className="mb-4">
            <TabsTrigger value="query">Query Builder</TabsTrigger>
            <TabsTrigger value="saved">Saved Queries</TabsTrigger>
            <TabsTrigger value="templates">Query Templates</TabsTrigger>
          </TabsList>

          <TabsContent value="query">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Select defaultValue="sql">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Query Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sql">SQL</SelectItem>
                    <SelectItem value="graphql">GraphQL</SelectItem>
                    <SelectItem value="json">JSON Query</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">Validate</Button>
                <Button>Run Query</Button>
                <Button variant="outline">Save Query</Button>
              </div>

              <Textarea value={queryText} onChange={(e) => setQueryText(e.target.value)} className="font-mono h-32" />

              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead>Details</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {queryResults.map((result) => (
                      <TableRow key={result.id}>
                        <TableCell>{new Date(result.timestamp).toLocaleString()}</TableCell>
                        <TableCell>{result.user}</TableCell>
                        <TableCell>{result.action}</TableCell>
                        <TableCell>{result.details}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="saved">
            <div className="space-y-4">
              {savedQueries.map((query) => (
                <Card key={query.id} className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">{query.name}</h3>
                    <div className="space-x-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        Run
                      </Button>
                    </div>
                  </div>
                  <pre className="bg-muted p-2 rounded text-xs overflow-x-auto">{query.query}</pre>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="templates">
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4 cursor-pointer hover:bg-muted/50">
                <h3 className="font-medium mb-2">Access Patterns</h3>
                <p className="text-sm text-muted-foreground">Analyze dataset access patterns over time</p>
              </Card>
              <Card className="p-4 cursor-pointer hover:bg-muted/50">
                <h3 className="font-medium mb-2">Security Audit</h3>
                <p className="text-sm text-muted-foreground">Comprehensive security audit queries</p>
              </Card>
              <Card className="p-4 cursor-pointer hover:bg-muted/50">
                <h3 className="font-medium mb-2">User Activity</h3>
                <p className="text-sm text-muted-foreground">Track user activity across the platform</p>
              </Card>
              <Card className="p-4 cursor-pointer hover:bg-muted/50">
                <h3 className="font-medium mb-2">Compliance Check</h3>
                <p className="text-sm text-muted-foreground">Verify compliance with regulations</p>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
