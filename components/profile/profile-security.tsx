"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Lock, Smartphone, AlertTriangle } from "lucide-react"

interface LoginSession {
  id: string
  device: string
  browser: string
  location: string
  ip: string
  lastActive: string
  current: boolean
}

const sessions: LoginSession[] = [
  {
    id: "session-1",
    device: "MacBook Pro",
    browser: "Chrome 123.0",
    location: "Stockholm, Sweden",
    ip: "194.68.32.112",
    lastActive: "Just now",
    current: true,
  },
  {
    id: "session-2",
    device: "iPhone 15",
    browser: "Safari Mobile 17.0",
    location: "Stockholm, Sweden",
    ip: "194.68.32.114",
    lastActive: "1 hour ago",
    current: false,
  },
  {
    id: "session-3",
    device: "Windows PC",
    browser: "Firefox 112.0",
    location: "Uppsala, Sweden",
    ip: "192.176.85.23",
    lastActive: "2 days ago",
    current: false,
  },
  {
    id: "session-4",
    device: "iPad Pro",
    browser: "Safari 17.0",
    location: "Malmö, Sweden",
    ip: "176.52.12.98",
    lastActive: "5 days ago",
    current: false,
  },
]

export function ProfileSecurity() {
  const [passwordValues, setPasswordValues] = useState({
    current: "",
    new: "",
    confirm: "",
  })

  const [isSaving, setIsSaving] = useState(false)
  const [isRevoking, setIsRevoking] = useState<string | null>(null)

  const handlePasswordChange = () => {
    setIsSaving(true)
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      setPasswordValues({
        current: "",
        new: "",
        confirm: "",
      })
    }, 1000)
  }

  const handleRevokeSession = (sessionId: string) => {
    setIsRevoking(sessionId)
    // Simulate API call
    setTimeout(() => {
      setIsRevoking(null)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Password</CardTitle>
          <CardDescription>Update your password to keep your account secure</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current">Current Password</Label>
            <Input
              id="current"
              type="password"
              value={passwordValues.current}
              onChange={(e) => setPasswordValues({ ...passwordValues, current: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="new">New Password</Label>
            <Input
              id="new"
              type="password"
              value={passwordValues.new}
              onChange={(e) => setPasswordValues({ ...passwordValues, new: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm">Confirm New Password</Label>
            <Input
              id="confirm"
              type="password"
              value={passwordValues.confirm}
              onChange={(e) => setPasswordValues({ ...passwordValues, confirm: e.target.value })}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handlePasswordChange} disabled={isSaving}>
            {isSaving ? "Updating..." : "Update Password"}
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>
          <CardDescription>Add an extra layer of security to your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <Smartphone className="h-4 w-4 text-muted-foreground" />
                <Label htmlFor="2fa-app">Authenticator App</Label>
              </div>
              <p className="text-sm text-muted-foreground">Use an authenticator app for one-time codes</p>
            </div>
            <Switch id="2fa-app" />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <Smartphone className="h-4 w-4 text-muted-foreground" />
                <Label htmlFor="2fa-sms">SMS Verification</Label>
              </div>
              <p className="text-sm text-muted-foreground">Receive a code on your mobile phone</p>
            </div>
            <Switch id="2fa-sms" defaultChecked />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-muted-foreground" />
                <Label htmlFor="2fa-recovery">Recovery Codes</Label>
              </div>
              <p className="text-sm text-muted-foreground">Generate recovery codes for emergency access</p>
            </div>
            <Button variant="outline" size="sm">
              Generate Codes
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Active Sessions</CardTitle>
          <CardDescription>Manage devices currently logged into your account</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Device</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sessions.map((session) => (
                <TableRow key={session.id}>
                  <TableCell>
                    <div className="font-medium">{session.device}</div>
                    <div className="text-xs text-muted-foreground">{session.browser}</div>
                  </TableCell>
                  <TableCell>
                    <div>{session.location}</div>
                    <div className="text-xs text-muted-foreground">{session.ip}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {session.lastActive}
                      {session.current && <Badge className="ml-2 bg-green-100 text-green-800 text-xs">Current</Badge>}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    {!session.current && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRevokeSession(session.id)}
                        disabled={isRevoking === session.id}
                      >
                        {isRevoking === session.id ? "Revoking..." : "Revoke"}
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <Button variant="destructive" className="w-full sm:w-auto">
            Log Out Of All Devices
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
            <div>
              <CardTitle>Danger Zone</CardTitle>
              <CardDescription>Irreversible account actions</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 rounded-md border border-destructive/20 bg-destructive/5">
            <div>
              <h3 className="font-medium">Delete Account</h3>
              <p className="text-sm text-muted-foreground">Permanently delete your account and all associated data</p>
            </div>
            <Button variant="destructive">Delete Account</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

