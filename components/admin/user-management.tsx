"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronDown, MoreHorizontal, Search } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"

interface User {
  id: string
  name: string
  email: string
  organization: string
  role: "admin" | "contributor" | "public" | "data_provider" | "researcher"
  status: "active" | "pending" | "suspended" | "inactive"
  lastActive: string
  joinDate: string
  avatar?: string
}

const users: User[] = [
  {
    id: "USR001",
    name: "Emma Johnson",
    email: "emma.johnson@example.com",
    organization: "Uppsala University",
    role: "researcher",
    status: "active",
    lastActive: "Just now",
    joinDate: "2024-09-15",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "USR002",
    name: "Michael Chen",
    email: "michael.chen@example.com",
    organization: "Karolinska Institute",
    role: "contributor",
    status: "active",
    lastActive: "2 hours ago",
    joinDate: "2024-08-22",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "USR003",
    name: "Sarah Williams",
    email: "sarah.williams@example.com",
    organization: "AstraZeneca R&D",
    role: "data_provider",
    status: "active",
    lastActive: "1 day ago",
    joinDate: "2024-07-10",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "USR004",
    name: "David Miller",
    email: "david.miller@example.com",
    organization: "Stockholm University",
    role: "public",
    status: "inactive",
    lastActive: "2 weeks ago",
    joinDate: "2024-06-05",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "USR005",
    name: "Lisa Anderson",
    email: "lisa.anderson@example.com",
    organization: "Karolinska Institute",
    role: "researcher",
    status: "active",
    lastActive: "3 days ago",
    joinDate: "2024-05-20",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "USR006",
    name: "Robert Taylor",
    email: "robert.taylor@example.com",
    organization: "Swedish Medical Products Agency",
    role: "admin",
    status: "active",
    lastActive: "5 hours ago",
    joinDate: "2024-04-12",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "USR007",
    name: "Jennifer Lopez",
    email: "jennifer.lopez@example.com",
    organization: "Stockholm University",
    role: "contributor",
    status: "pending",
    lastActive: "Never",
    joinDate: "2025-03-18",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

const getRoleBadge = (role: User["role"]) => {
  switch (role) {
    case "admin":
      return <Badge className="bg-purple-100 text-purple-800">Admin</Badge>
    case "contributor":
      return <Badge className="bg-blue-100 text-blue-800">Contributor</Badge>
    case "data_provider":
      return <Badge className="bg-green-100 text-green-800">Data Provider</Badge>
    case "researcher":
      return <Badge className="bg-indigo-100 text-indigo-800">Researcher</Badge>
    case "public":
      return <Badge className="bg-gray-100 text-gray-800">Public</Badge>
    default:
      return null
  }
}

const getStatusBadge = (status: User["status"]) => {
  switch (status) {
    case "active":
      return <Badge className="bg-green-100 text-green-800">Active</Badge>
    case "pending":
      return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
    case "suspended":
      return <Badge className="bg-red-100 text-red-800">Suspended</Badge>
    case "inactive":
      return <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>
    default:
      return null
  }
}

export function UserManagement() {
  const [filteredUsers, setFilteredUsers] = useState(users)
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    applyFilters(query, roleFilter, statusFilter)
  }

  const handleRoleFilter = (role: string) => {
    setRoleFilter(role)
    applyFilters(searchQuery, role, statusFilter)
  }

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status)
    applyFilters(searchQuery, roleFilter, status)
  }

  const applyFilters = (query: string, role: string, status: string) => {
    let result = users

    if (query) {
      const lowerQuery = query.toLowerCase()
      result = result.filter(
        (user) =>
          user.name.toLowerCase().includes(lowerQuery) ||
          user.email.toLowerCase().includes(lowerQuery) ||
          user.organization.toLowerCase().includes(lowerQuery),
      )
    }

    if (role !== "all") {
      result = result.filter((user) => user.role === role)
    }

    if (status !== "all") {
      result = result.filter((user) => user.status === status)
    }

    setFilteredUsers(result)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Management</CardTitle>
        <CardDescription>View and manage platform users</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search users..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <Select value={roleFilter} onValueChange={handleRoleFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="contributor">Contributor</SelectItem>
                  <SelectItem value="data_provider">Data Provider</SelectItem>
                  <SelectItem value="researcher">Researcher</SelectItem>
                  <SelectItem value="public">Public</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={handleStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline">
                <ChevronDown className="h-4 w-4 mr-2" />
                More Filters
              </Button>

              <Dialog>
                <DialogTrigger asChild>
                  <Button>Add User</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New User</DialogTitle>
                    <DialogDescription>Create a new user account</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input id="name" placeholder="Full name" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="email" className="text-right">
                        Email
                      </Label>
                      <Input id="email" placeholder="Email address" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="organization" className="text-right">
                        Organization
                      </Label>
                      <Input id="organization" placeholder="Organization" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="role" className="text-right">
                        Role
                      </Label>
                      <Select>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="contributor">Contributor</SelectItem>
                          <SelectItem value="data_provider">Data Provider</SelectItem>
                          <SelectItem value="researcher">Researcher</SelectItem>
                          <SelectItem value="public">Public</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="send-invite" className="text-right">
                        Send invite
                      </Label>
                      <div className="col-span-3 flex items-center space-x-2">
                        <Switch id="send-invite" defaultChecked />
                        <Label htmlFor="send-invite">Send invitation email</Label>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Create User</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <ScrollArea className="h-[450px] rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Organization</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      No users found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-muted-foreground">{user.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{user.organization}</TableCell>
                      <TableCell>{getRoleBadge(user.role)}</TableCell>
                      <TableCell>{getStatusBadge(user.status)}</TableCell>
                      <TableCell>{user.lastActive}</TableCell>
                      <TableCell>{user.joinDate}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Profile</DropdownMenuItem>
                            <DropdownMenuItem>Edit User</DropdownMenuItem>
                            <DropdownMenuItem>Reset Password</DropdownMenuItem>
                            {user.status === "active" ? (
                              <DropdownMenuItem>Suspend User</DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem>Activate User</DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  )
}

