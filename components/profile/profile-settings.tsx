"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

export function ProfileSettings() {
  const [isSaving, setIsSaving] = useState(false)

  // In a real app, this would be fetched from user context/state
  const userInfo = {
    name: "Jane Doe",
    email: "jane.doe@example.com",
    organization: "Uppsala University",
    department: "Department of Medical Sciences",
    role: "Researcher",
    bio: "Clinical researcher focused on cardiovascular disease prevention and health data analytics. Interested in collaborative projects using real-world data.",
    expertise: ["Cardiology", "Biostatistics", "Machine Learning"],
    orcid: "0000-0002-1234-5678",
  }

  const handleSave = () => {
    setIsSaving(true)
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
    }, 1000)
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Update your personal information and profile</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col items-center space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src="/placeholder.svg?height=96&width=96" alt="User" />
              <AvatarFallback className="text-3xl">JD</AvatarFallback>
            </Avatar>
            <div className="flex flex-col space-y-2">
              <Button variant="outline" size="sm">
                Upload New Image
              </Button>
              <Button variant="ghost" size="sm">
                Remove Image
              </Button>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" defaultValue={userInfo.name} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" defaultValue={userInfo.email} type="email" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="organization">Organization</Label>
              <Input id="organization" defaultValue={userInfo.organization} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="department">Department</Label>
              <Input id="department" defaultValue={userInfo.department} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="role">Role</Label>
              <Select defaultValue={userInfo.role}>
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Researcher">Researcher</SelectItem>
                  <SelectItem value="Data Steward">Data Steward</SelectItem>
                  <SelectItem value="Data Scientist">Data Scientist</SelectItem>
                  <SelectItem value="Administrator">Administrator</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="orcid">ORCID ID</Label>
              <Input id="orcid" defaultValue={userInfo.orcid} />
            </div>
          </div>
        </CardContent>
        <CardFooter className="justify-end">
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </CardFooter>
      </Card>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Professional Profile</CardTitle>
            <CardDescription>Share information about your work and expertise</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="bio">Biography</Label>
              <Textarea
                id="bio"
                defaultValue={userInfo.bio}
                rows={6}
                placeholder="Tell others about your background and research interests"
              />
            </div>

            <div className="grid gap-2">
              <Label>Areas of Expertise</Label>
              <div className="flex flex-wrap gap-2">
                {userInfo.expertise.map((item, index) => (
                  <Badge key={index} variant="outline" className="flex items-center gap-1">
                    {item}
                    <button className="ml-1 text-muted-foreground hover:text-foreground">&times;</button>
                  </Badge>
                ))}
                <Input className="w-full mt-2" placeholder="Add a new area of expertise" />
              </div>
            </div>
          </CardContent>
          <CardFooter className="justify-end">
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
            <CardDescription>Manage how you receive notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive email notifications about your account activity</p>
              </div>
              <Switch id="email-notifications" defaultChecked />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="access-notifications">Access Request Updates</Label>
                <p className="text-sm text-muted-foreground">Get notified when your access requests change status</p>
              </div>
              <Switch id="access-notifications" defaultChecked />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="newsletter">Newsletter</Label>
                <p className="text-sm text-muted-foreground">Receive monthly updates about the platform</p>
              </div>
              <Switch id="newsletter" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

