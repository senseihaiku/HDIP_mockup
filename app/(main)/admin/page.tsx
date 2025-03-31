"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminDashboard } from "@/components/admin/admin-dashboard"
import { UserManagement } from "@/components/admin/user-management"
import { DatasetManagement } from "@/components/admin/dataset-management"
import { SystemSettings } from "@/components/admin/system-settings"

export default function AdminPage() {
  return (
    <div className="flex flex-col p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Panel</h1>
        <p className="text-muted-foreground">Manage platform settings and users</p>
      </div>

      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="dashboard" className="flex-1">
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="users" className="flex-1">
            Users
          </TabsTrigger>
          <TabsTrigger value="datasets" className="flex-1">
            Datasets
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex-1">
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-4 mt-4">
          <AdminDashboard />
        </TabsContent>

        <TabsContent value="users" className="space-y-4 mt-4">
          <UserManagement />
        </TabsContent>

        <TabsContent value="datasets" className="space-y-4 mt-4">
          <DatasetManagement />
        </TabsContent>

        <TabsContent value="settings" className="space-y-4 mt-4">
          <SystemSettings />
        </TabsContent>
      </Tabs>
    </div>
  )
}

