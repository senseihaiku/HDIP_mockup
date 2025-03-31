"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function SettingsPage() {
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = () => {
    setIsSaving(true)
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
    }, 1000)
  }

  return (
    <div className="flex flex-col p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account preferences and settings
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your profile information visible to other users
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/placeholder-user.jpg" alt="User" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button size="sm">Upload New Photo</Button>
                  <p className="text-xs text-muted-foreground">
                    JPG, GIF or PNG. 1MB max.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input id="first-name" defaultValue="Jacob" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" defaultValue="Miller" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="jacob.miller@example.com" />
                <p className="text-xs text-muted-foreground">
                  This email is used for notifications and login.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Professional Title</Label>
                <Input id="title" defaultValue="Data Scientist" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="organization">Organization</Label>
                <Input id="organization" defaultValue="Uppsala University" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea 
                  id="bio" 
                  rows={3} 
                  defaultValue="Data scientist specializing in health informatics and FAIR data principles. Working on improving standardization of clinical research data."
                />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="research-interests">Research Interests</Label>
                <Input id="research-interests" defaultValue="Health informatics, FAIR data, Clinical standards" />
                <p className="text-xs text-muted-foreground">
                  Comma separated interests to help connect with others.
                </p>
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
              <CardTitle>External Profiles</CardTitle>
              <CardDescription>
                Link your external professional profiles
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="orcid">ORCID ID</Label>
                <Input id="orcid" defaultValue="0000-0001-2345-6789" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="researcher-id">Researcher ID</Label>
                <Input id="researcher-id" defaultValue="F-1234-2022" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Personal Website/Portfolio</Label>
                <Input id="website" type="url" defaultValue="https://jacobmiller.example.com" />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="account" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>
                Manage your account authentication and security
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Two-Factor Authentication</Label>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="text-sm">Enhance your account security</p>
                    <p className="text-sm text-muted-foreground">
                      Require an additional authentication step when signing in
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? "Saving..." : "Update Account"}
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Language & Timezone</CardTitle>
              <CardDescription>
                Set your preferred language and timezone
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select defaultValue="en">
                  <SelectTrigger id="language">
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
                <Label htmlFor="timezone">Timezone</Label>
                <Select defaultValue="europe-stockholm">
                  <SelectTrigger id="timezone">
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="europe-stockholm">Europe/Stockholm (UTC+01:00)</SelectItem>
                    <SelectItem value="europe-london">Europe/London (UTC+00:00)</SelectItem>
                    <SelectItem value="europe-berlin">Europe/Berlin (UTC+01:00)</SelectItem>
                    <SelectItem value="europe-helsinki">Europe/Helsinki (UTC+02:00)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="date-format">Date Format</Label>
                <Select defaultValue="yyyy-mm-dd">
                  <SelectTrigger id="date-format">
                    <SelectValue placeholder="Select date format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                    <SelectItem value="dd-mm-yyyy">DD-MM-YYYY</SelectItem>
                    <SelectItem value="mm-dd-yyyy">MM-DD-YYYY</SelectItem>
                    <SelectItem value="mmmm-d-yyyy">Month D, YYYY</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Preferences"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Choose how and when you want to be notified
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Email Notifications</h3>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-data-requests">Data Access Requests</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive emails when someone requests access to your datasets
                    </p>
                  </div>
                  <Switch id="email-data-requests" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-request-updates">Request Status Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified when your data access requests change status
                    </p>
                  </div>
                  <Switch id="email-request-updates" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-new-datasets">New Relevant Datasets</Label>
                    <p className="text-sm text-muted-foreground">
                      Notifications about new datasets matching your interests
                    </p>
                  </div>
                  <Switch id="email-new-datasets" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-community">Community Activity</Label>
                    <p className="text-sm text-muted-foreground">
                      Replies to your posts, mentions, and community updates
                    </p>
                  </div>
                  <Switch id="email-community" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-newsletters">Platform Updates & News</Label>
                    <p className="text-sm text-muted-foreground">
                      Newsletters and updates about the platform
                    </p>
                  </div>
                  <Switch id="email-newsletters" />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Platform Notifications</h3>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="platform-messages">Direct Messages</Label>
                    <p className="text-sm text-muted-foreground">
                      Notify when you receive a direct message
                    </p>
                  </div>
                  <Switch id="platform-messages" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="platform-usage">Dataset Usage Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Updates on usage statistics for your datasets
                    </p>
                  </div>
                  <Switch id="platform-usage" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="platform-reminders">Deadline Reminders</Label>
                    <p className="text-sm text-muted-foreground">
                      Reminders for upcoming access expirations and renewals
                    </p>
                  </div>
                  <Switch id="platform-reminders" defaultChecked />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Notification Settings"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>
                Control your data visibility and privacy preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Profile Visibility</h3>

                <div className="space-y-2">
                  <Label htmlFor="profile-visibility">Profile Visibility</Label>
                  <Select defaultValue="registered">
                    <SelectTrigger id="profile-visibility">
                      <SelectValue placeholder="Select visibility" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public - Visible to everyone</SelectItem>
                      <SelectItem value="registered">Registered Users Only</SelectItem>
                      <SelectItem value="connections">My Connections Only</SelectItem>
                      <SelectItem value="private">Private - Only visible to me</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-visibility">Email Visibility</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow other platform users to see your email address
                    </p>
                  </div>
                  <Switch id="email-visibility" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="org-visibility">Organization Visibility</Label>
                    <p className="text-sm text-muted-foreground">
                      Display your organization on your public profile
                    </p>
                  </div>
                  <Switch id="org-visibility" defaultChecked />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Activity Privacy</h3>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="record-activity">Activity Tracking</Label>
                    <p className="text-sm text-muted-foreground">
                      Record your activity on datasets and platform features
                    </p>
                  </div>
                  <Switch id="record-activity" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="discovery-opt-in">Discovery Opt-in</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow your profile to be suggested to other researchers
                    </p>
                  </div>
                  <Switch id="discovery-opt-in" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="data-usage-stats">Dataset Usage Statistics</Label>
                    <p className="text-sm text-muted-foreground">
                      Share anonymized usage statistics for datasets you access
                    </p>
                  </div>
                  <Switch id="data-usage-stats" defaultChecked />
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Button variant="outline" className="w-full">Download My Data</Button>
                <p className="text-xs text-muted-foreground text-center">
                  Request a copy of all personal data stored on the platform
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Privacy Settings"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
