"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, CheckCircle, Database, Lock, RefreshCw, ShieldAlert } from "lucide-react"

export function SystemSettings() {
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = () => {
    setIsSaving(true)
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
    }, 1000)
  }

  return (
    <Tabs defaultValue="general">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
        <TabsTrigger value="storage">Storage & Backups</TabsTrigger>
        <TabsTrigger value="emails">Email Templates</TabsTrigger>
      </TabsList>

      <TabsContent value="general" className="space-y-4 mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Platform Settings</CardTitle>
            <CardDescription>Configure general platform settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="platform-name">Platform Name</Label>
              <Input id="platform-name" defaultValue="Health Data Innovation Platform" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="platform-url">Platform URL</Label>
              <Input id="platform-url" defaultValue="https://hdip.example.org" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="admin-contact">Administrator Contact Email</Label>
              <Input id="admin-contact" defaultValue="admin@hdip.example.org" type="email" />
            </div>

            <Separator />

            <div className="space-y-2">
              <Label htmlFor="default-language">Default Language</Label>
              <Select defaultValue="en">
                <SelectTrigger id="default-language">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="sv">Swedish</SelectItem>
                  <SelectItem value="no">Norwegian</SelectItem>
                  <SelectItem value="fi">Finnish</SelectItem>
                  <SelectItem value="da">Danish</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timezone">Default Time Zone</Label>
              <Select defaultValue="europe-stockholm">
                <SelectTrigger id="timezone">
                  <SelectValue placeholder="Select time zone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="europe-stockholm">Europe/Stockholm (UTC+01:00)</SelectItem>
                  <SelectItem value="europe-london">Europe/London (UTC+00:00)</SelectItem>
                  <SelectItem value="europe-berlin">Europe/Berlin (UTC+01:00)</SelectItem>
                  <SelectItem value="europe-helsinki">Europe/Helsinki (UTC+02:00)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                <p className="text-sm text-muted-foreground">
                  When enabled, only administrators can access the platform
                </p>
              </div>
              <Switch id="maintenance-mode" />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="user-registration">Allow User Registration</Label>
                <p className="text-sm text-muted-foreground">Allow users to register for new accounts</p>
              </div>
              <Switch id="user-registration" defaultChecked />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="security" className="space-y-4 mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
            <CardDescription>Configure platform security and access policies</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Authentication</h3>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="require-2fa">Require Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">Require all users to set up 2FA for their accounts</p>
                </div>
                <Switch id="require-2fa" defaultChecked />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password-policy">Password Policy</Label>
                <Select defaultValue="strong">
                  <SelectTrigger id="password-policy">
                    <SelectValue placeholder="Select password policy" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basic (8+ characters)</SelectItem>
                    <SelectItem value="medium">Medium (8+ chars, mixed case)</SelectItem>
                    <SelectItem value="strong">Strong (12+ chars, mixed case, numbers, symbols)</SelectItem>
                    <SelectItem value="custom">Custom Policy</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                <Input id="session-timeout" type="number" min="5" defaultValue="30" />
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Access Controls</h3>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="ip-restrictions">IP Address Restrictions</Label>
                  <p className="text-sm text-muted-foreground">Limit platform access to specific IP ranges</p>
                </div>
                <Switch id="ip-restrictions" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="allowed-ips">Allowed IP Addresses/Ranges</Label>
                <Textarea
                  id="allowed-ips"
                  placeholder="Enter IP addresses or ranges, one per line"
                  className="font-mono"
                />
                <p className="text-xs text-muted-foreground">Example: 192.168.1.0/24, 10.0.0.1</p>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Security Monitoring</h3>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="breach-detection">Breach Detection</Label>
                  <p className="text-sm text-muted-foreground">Monitor for unusual access patterns</p>
                </div>
                <Switch id="breach-detection" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="login-alerts">Failed Login Alerts</Label>
                  <p className="text-sm text-muted-foreground">Send alerts after multiple failed login attempts</p>
                </div>
                <Switch id="login-alerts" defaultChecked />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-amber-500" />
              <span>Security Audit Log</span>
            </CardTitle>
            <CardDescription>View recent security events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-md border p-4">
                <div className="flex items-start gap-4">
                  <CheckCircle className="mt-0.5 h-5 w-5 text-green-500" />
                  <div>
                    <div className="font-medium">Security scan completed</div>
                    <div className="text-sm text-muted-foreground">No vulnerabilities detected</div>
                    <div className="text-xs text-muted-foreground mt-1">2025-03-20 09:15:22</div>
                  </div>
                </div>
              </div>

              <div className="rounded-md border p-4">
                <div className="flex items-start gap-4">
                  <AlertCircle className="mt-0.5 h-5 w-5 text-amber-500" />
                  <div>
                    <div className="font-medium">Multiple failed login attempts</div>
                    <div className="text-sm text-muted-foreground">IP: 192.168.1.45 - User: admin@hdip.example.org</div>
                    <div className="text-xs text-muted-foreground mt-1">2025-03-19 14:22:37</div>
                  </div>
                </div>
              </div>

              <div className="rounded-md border p-4">
                <div className="flex items-start gap-4">
                  <CheckCircle className="mt-0.5 h-5 w-5 text-green-500" />
                  <div>
                    <div className="font-medium">Admin password policy updated</div>
                    <div className="text-sm text-muted-foreground">Changed by: system.admin@hdip.example.org</div>
                    <div className="text-xs text-muted-foreground mt-1">2025-03-18 10:05:11</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline">View Full Security Log</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="storage" className="space-y-4 mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Storage Configuration</CardTitle>
            <CardDescription>Configure data storage and backup settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-md border p-4 bg-muted/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-blue-500" />
                  <div>
                    <div className="font-medium">Primary Storage</div>
                    <div className="text-sm text-muted-foreground">85.3 TB / 100 TB (85.3% used)</div>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Configure
                </Button>
              </div>
              <div className="mt-2 h-2 w-full rounded-full bg-muted">
                <div className="h-2 rounded-full bg-blue-500" style={{ width: "85.3%" }} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="storage-connection">Storage Connection String</Label>
              <div className="flex gap-2">
                <Input
                  id="storage-connection"
                  type="password"
                  defaultValue="••••••••••••••••••••••••••••••••"
                  className="font-mono"
                  readOnly
                />
                <Button variant="outline" size="icon">
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Backup Schedule</h3>

              <div className="space-y-2">
                <Label htmlFor="backup-frequency">Backup Frequency</Label>
                <Select defaultValue="daily">
                  <SelectTrigger id="backup-frequency">
                    <SelectValue placeholder="Select backup frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">Hourly</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="custom">Custom Schedule</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="retention-policy">Retention Policy</Label>
                <Select defaultValue="30days">
                  <SelectTrigger id="retention-policy">
                    <SelectValue placeholder="Select retention policy" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7days">7 Days</SelectItem>
                    <SelectItem value="30days">30 Days</SelectItem>
                    <SelectItem value="90days">90 Days</SelectItem>
                    <SelectItem value="1year">1 Year</SelectItem>
                    <SelectItem value="custom">Custom Policy</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="backup-encryption">Backup Encryption</Label>
                  <p className="text-sm text-muted-foreground">Apply additional encryption to backup archives</p>
                </div>
                <Switch id="backup-encryption" defaultChecked />
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Remote Storage</h3>
                <Switch id="remote-storage" defaultChecked />
              </div>

              <div className="space-y-2">
                <Label htmlFor="remote-provider">Remote Storage Provider</Label>
                <Select defaultValue="aws">
                  <SelectTrigger id="remote-provider">
                    <SelectValue placeholder="Select provider" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aws">Amazon S3</SelectItem>
                    <SelectItem value="azure">Azure Blob Storage</SelectItem>
                    <SelectItem value="gcp">Google Cloud Storage</SelectItem>
                    <SelectItem value="custom">Custom Provider</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="remote-bucket">Bucket/Container Name</Label>
                <Input id="remote-bucket" defaultValue="hdip-backups" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="remote-key">API Key/Access Key</Label>
                <div className="flex gap-2">
                  <Input
                    id="remote-key"
                    type="password"
                    defaultValue="••••••••••••••••••••••••••••••••"
                    className="font-mono"
                    readOnly
                  />
                  <Button variant="outline" size="icon">
                    <Lock className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Backup History</CardTitle>
            <CardDescription>Recent backup operations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-md border p-4">
                <div className="flex items-start gap-4">
                  <CheckCircle className="mt-0.5 h-5 w-5 text-green-500" />
                  <div>
                    <div className="font-medium">Daily Backup Completed</div>
                    <div className="text-sm text-muted-foreground">
                      Size: 1.2TB • Duration: 45m • Location: S3/hdip-backups
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">2025-03-20 02:00:15</div>
                  </div>
                </div>
              </div>

              <div className="rounded-md border p-4">
                <div className="flex items-start gap-4">
                  <CheckCircle className="mt-0.5 h-5 w-5 text-green-500" />
                  <div>
                    <div className="font-medium">Daily Backup Completed</div>
                    <div className="text-sm text-muted-foreground">
                      Size: 1.18TB • Duration: 43m • Location: S3/hdip-backups
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">2025-03-19 02:00:12</div>
                  </div>
                </div>
              </div>

              <div className="rounded-md border p-4">
                <div className="flex items-start gap-4">
                  <AlertCircle className="mt-0.5 h-5 w-5 text-red-500" />
                  <div>
                    <div className="font-medium">Daily Backup Failed</div>
                    <div className="text-sm text-muted-foreground">Error: Network timeout during data transfer</div>
                    <div className="text-xs text-muted-foreground mt-1">2025-03-18 02:15:33</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline">Run Manual Backup</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="emails" className="space-y-4 mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Email Templates</CardTitle>
            <CardDescription>Configure system email notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="smtp-host">SMTP Server</Label>
              <Input id="smtp-host" defaultValue="smtp.example.org" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="smtp-port">SMTP Port</Label>
                <Input id="smtp-port" defaultValue="587" type="number" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="smtp-encryption">Encryption</Label>
                <Select defaultValue="tls">
                  <SelectTrigger id="smtp-encryption">
                    <SelectValue placeholder="Select encryption" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="ssl">SSL</SelectItem>
                    <SelectItem value="tls">TLS</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="smtp-user">SMTP Username</Label>
              <Input id="smtp-user" defaultValue="noreply@hdip.example.org" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="smtp-password">SMTP Password</Label>
              <Input id="smtp-password" type="password" defaultValue="••••••••••••••••" readOnly />
            </div>

            <div className="space-y-2">
              <Label htmlFor="default-sender">Default Sender Name</Label>
              <Input id="default-sender" defaultValue="HDIP Platform" />
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Email Templates</h3>

              <div className="space-y-4">
                <div className="rounded-md border p-4 hover:bg-muted/50 cursor-pointer">
                  <h4 className="font-medium">Welcome Email</h4>
                  <p className="text-sm text-muted-foreground">Sent to new users when they register</p>
                </div>

                <div className="rounded-md border p-4 hover:bg-muted/50 cursor-pointer">
                  <h4 className="font-medium">Password Reset</h4>
                  <p className="text-sm text-muted-foreground">Sent when users request a password reset</p>
                </div>

                <div className="rounded-md border p-4 hover:bg-muted/50 cursor-pointer">
                  <h4 className="font-medium">Access Request Notification</h4>
                  <p className="text-sm text-muted-foreground">
                    Sent to dataset owners when a new access request is made
                  </p>
                </div>

                <div className="rounded-md border p-4 hover:bg-muted/50 cursor-pointer">
                  <h4 className="font-medium">Access Approval</h4>
                  <p className="text-sm text-muted-foreground">Sent to users when their access request is approved</p>
                </div>

                <div className="rounded-md border p-4 hover:bg-muted/50 cursor-pointer">
                  <h4 className="font-medium">Access Expiration Warning</h4>
                  <p className="text-sm text-muted-foreground">
                    Sent to users when their access to a dataset is about to expire
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-footer">Custom Email Footer</Label>
                <p className="text-sm text-muted-foreground">Add a custom footer to all outgoing emails</p>
              </div>
              <Switch id="email-footer" defaultChecked />
            </div>

            <div className="space-y-2">
              <Label htmlFor="footer-text">Footer Text</Label>
              <Textarea
                id="footer-text"
                defaultValue="Health Data Innovation Platform • https://hdip.example.org • Contact: support@hdip.example.org"
                rows={2}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Email Test</CardTitle>
            <CardDescription>Send a test email to verify configuration</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="test-email">Test Email Address</Label>
                <Input id="test-email" type="email" placeholder="Enter email address" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="test-template">Email Template</Label>
                <Select defaultValue="welcome">
                  <SelectTrigger id="test-template">
                    <SelectValue placeholder="Select template" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="welcome">Welcome Email</SelectItem>
                    <SelectItem value="password-reset">Password Reset</SelectItem>
                    <SelectItem value="access-request">Access Request Notification</SelectItem>
                    <SelectItem value="access-approval">Access Approval</SelectItem>
                    <SelectItem value="expiration">Access Expiration Warning</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline">Send Test Email</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
