"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function RoleMatrixView() {
  // Mock roles and permissions data
  const roles = ["Administrator", "Data Steward", "Researcher", "Viewer"]

  const permissionGroups = [
    {
      name: "Dataset Management",
      permissions: [
        { id: "dataset.view", name: "View Datasets", description: "Can view dataset listings and details" },
        { id: "dataset.create", name: "Create Datasets", description: "Can create new datasets" },
        { id: "dataset.edit", name: "Edit Datasets", description: "Can modify existing datasets" },
        { id: "dataset.delete", name: "Delete Datasets", description: "Can delete datasets" },
        { id: "dataset.approve", name: "Approve Datasets", description: "Can approve datasets for publication" },
      ],
    },
    {
      name: "User Management",
      permissions: [
        { id: "user.view", name: "View Users", description: "Can view user listings and profiles" },
        { id: "user.create", name: "Create Users", description: "Can create new user accounts" },
        { id: "user.edit", name: "Edit Users", description: "Can modify user accounts" },
        { id: "user.delete", name: "Delete Users", description: "Can delete user accounts" },
        { id: "user.roles", name: "Manage Roles", description: "Can assign roles to users" },
      ],
    },
    {
      name: "Knowledge Base",
      permissions: [
        { id: "kb.view", name: "View Articles", description: "Can view knowledge base articles" },
        { id: "kb.create", name: "Create Articles", description: "Can create new articles" },
        { id: "kb.edit", name: "Edit Articles", description: "Can modify existing articles" },
        { id: "kb.delete", name: "Delete Articles", description: "Can delete articles" },
        { id: "kb.categories", name: "Manage Categories", description: "Can manage article categories" },
      ],
    },
  ]

  // Mock permission matrix (which roles have which permissions)
  const permissionMatrix = {
    Administrator: [
      "dataset.view",
      "dataset.create",
      "dataset.edit",
      "dataset.delete",
      "dataset.approve",
      "user.view",
      "user.create",
      "user.edit",
      "user.delete",
      "user.roles",
      "kb.view",
      "kb.create",
      "kb.edit",
      "kb.delete",
      "kb.categories",
    ],
    "Data Steward": [
      "dataset.view",
      "dataset.create",
      "dataset.edit",
      "dataset.approve",
      "user.view",
      "kb.view",
      "kb.create",
      "kb.edit",
    ],
    Researcher: ["dataset.view", "dataset.create", "user.view", "kb.view"],
    Viewer: ["dataset.view", "user.view", "kb.view"],
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Role Permission Matrix</CardTitle>
          <div className="flex space-x-2">
            <Button variant="outline">Create New Role</Button>
            <Button>Save Changes</Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="matrix">
          <TabsList className="mb-4">
            <TabsTrigger value="matrix">Permission Matrix</TabsTrigger>
            <TabsTrigger value="roles">Role Management</TabsTrigger>
            <TabsTrigger value="custom">Custom Permissions</TabsTrigger>
          </TabsList>

          <TabsContent value="matrix">
            <div className="space-y-6">
              <div className="flex justify-end">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="dataset">Dataset Management</SelectItem>
                    <SelectItem value="user">User Management</SelectItem>
                    <SelectItem value="kb">Knowledge Base</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {permissionGroups.map((group) => (
                <div key={group.name} className="space-y-2">
                  <h3 className="text-lg font-medium">{group.name}</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[300px]">Permission</TableHead>
                        {roles.map((role) => (
                          <TableHead key={role} className="text-center">
                            {role}
                          </TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {group.permissions.map((permission) => (
                        <TableRow key={permission.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{permission.name}</p>
                              <p className="text-sm text-muted-foreground">{permission.description}</p>
                            </div>
                          </TableCell>
                          {roles.map((role) => (
                            <TableCell key={`${role}-${permission.id}`} className="text-center">
                              <Checkbox checked={permissionMatrix[role].includes(permission.id)} className="mx-auto" />
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="roles">
            <div className="p-4 text-center">
              <p className="text-muted-foreground">Role management interface will be available in the next update.</p>
            </div>
          </TabsContent>

          <TabsContent value="custom">
            <div className="p-4 text-center">
              <p className="text-muted-foreground">
                Custom permissions interface will be available in the next update.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

