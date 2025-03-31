"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ConsentFlagAlerts() {
  // Mock alerts data
  const alerts = [
    {
      id: 1,
      name: "Expired Consent",
      description: "Alert when patient consent has expired",
      severity: "High",
      status: "Active",
      triggerCount: 12,
      lastTriggered: "2025-03-29T14:22:18Z",
    },
    {
      id: 2,
      name: "Missing Research Consent",
      description: "Alert when research data is accessed without proper consent",
      severity: "Critical",
      status: "Active",
      triggerCount: 5,
      lastTriggered: "2025-03-30T09:15:42Z",
    },
    {
      id: 3,
      name: "Consent Scope Violation",
      description: "Alert when data is used outside of consent scope",
      severity: "Medium",
      status: "Inactive",
      triggerCount: 8,
      lastTriggered: "2025-03-25T12:08:33Z",
    },
    {
      id: 4,
      name: "Pending Consent Review",
      description: "Alert when consent forms are pending review for >7 days",
      severity: "Low",
      status: "Active",
      triggerCount: 23,
      lastTriggered: "2025-03-30T10:45:21Z",
    },
    {
      id: 5,
      name: "Consent Withdrawal",
      description: "Alert when patient withdraws consent",
      severity: "High",
      status: "Active",
      triggerCount: 3,
      lastTriggered: "2025-03-28T16:32:10Z",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Consent Flag Alerts</CardTitle>
          <Button>Create New Alert</Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="alerts">
          <TabsList className="mb-4">
            <TabsTrigger value="alerts">Alert Configuration</TabsTrigger>
            <TabsTrigger value="history">Alert History</TabsTrigger>
            <TabsTrigger value="settings">Notification Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="alerts">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Alert Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Trigger Count</TableHead>
                  <TableHead>Last Triggered</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {alerts.map((alert) => (
                  <TableRow key={alert.id}>
                    <TableCell className="font-medium">{alert.name}</TableCell>
                    <TableCell>{alert.description}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          alert.severity === "Critical"
                            ? "destructive"
                            : alert.severity === "High"
                              ? "default"
                              : alert.severity === "Medium"
                                ? "secondary"
                                : "outline"
                        }
                      >
                        {alert.severity}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Switch checked={alert.status === "Active"} />
                        <span>{alert.status}</span>
                      </div>
                    </TableCell>
                    <TableCell>{alert.triggerCount}</TableCell>
                    <TableCell>{new Date(alert.lastTriggered).toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          View Log
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="history">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-2">
                <Input placeholder="Search alerts..." className="w-64" />
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Alert Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Alerts</SelectItem>
                    <SelectItem value="expired">Expired Consent</SelectItem>
                    <SelectItem value="missing">Missing Consent</SelectItem>
                    <SelectItem value="violation">Scope Violation</SelectItem>
                    <SelectItem value="withdrawal">Consent Withdrawal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="outline">Export Log</Button>
            </div>

            <div className="border rounded-md p-4 text-center">
              <p className="text-muted-foreground">
                Alert history will be displayed here. Use the filters above to narrow down results.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Card className="p-4">
                  <h3 className="font-medium mb-2">Email Notifications</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span>Critical Alerts</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>High Severity Alerts</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Medium Severity Alerts</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Low Severity Alerts</span>
                      <Switch />
                    </div>
                  </div>
                </Card>

                <Card className="p-4">
                  <h3 className="font-medium mb-2">In-App Notifications</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span>Critical Alerts</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>High Severity Alerts</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Medium Severity Alerts</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Low Severity Alerts</span>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </Card>
              </div>

              <div className="flex justify-end">
                <Button>Save Settings</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

