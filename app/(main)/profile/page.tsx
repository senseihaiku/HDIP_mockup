"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProfileSettings } from "@/components/profile/profile-settings"
import { ProfileActivity } from "@/components/profile/profile-activity"
import { ProfileSecurity } from "@/components/profile/profile-security"
import { ProfileDatasets } from "@/components/profile/profile-datasets"

export default function ProfilePage() {
  return (
    <div className="flex flex-col p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>

      <Tabs defaultValue="settings" className="w-full">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="settings" className="flex-1">
            Settings
          </TabsTrigger>
          <TabsTrigger value="datasets" className="flex-1">
            My Datasets
          </TabsTrigger>
          <TabsTrigger value="activity" className="flex-1">
            Activity
          </TabsTrigger>
          <TabsTrigger value="security" className="flex-1">
            Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="settings" className="space-y-4 mt-4">
          <ProfileSettings />
        </TabsContent>

        <TabsContent value="datasets" className="space-y-4 mt-4">
          <ProfileDatasets />
        </TabsContent>

        <TabsContent value="activity" className="space-y-4 mt-4">
          <ProfileActivity />
        </TabsContent>

        <TabsContent value="security" className="space-y-4 mt-4">
          <ProfileSecurity />
        </TabsContent>
      </Tabs>
    </div>
  )
}

