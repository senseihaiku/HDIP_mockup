"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"

export function CategoryManager() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false)

  // Mock categories data
  const categories = [
    {
      id: 1,
      name: "FAIR Principles",
      description: "Articles about Findable, Accessible, Interoperable, and Reusable data principles",
      articleCount: 12,
      isVisible: true,
      order: 1,
    },
    {
      id: 2,
      name: "Data Governance",
      description: "Best practices and guidelines for data governance",
      articleCount: 8,
      isVisible: true,
      order: 2,
    },
    {
      id: 3,
      name: "Security",
      description: "Information about data security and protection",
      articleCount: 5,
      isVisible: true,
      order: 3,
    },
    {
      id: 4,
      name: "Ethics",
      description: "Ethical considerations in health data management",
      articleCount: 7,
      isVisible: true,
      order: 4,
    },
    {
      id: 5,
      name: "Interoperability",
      description: "Standards and practices for data interoperability",
      articleCount: 6,
      isVisible: true,
      order: 5,
    },
    {
      id: 6,
      name: "Compliance",
      description: "Regulatory compliance information",
      articleCount: 4,
      isVisible: false,
      order: 6,
    },
  ]

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Category Manager</CardTitle>
          <Dialog open={isAddCategoryOpen} onOpenChange={setIsAddCategoryOpen}>
            <DialogTrigger asChild>
              <Button>Add Category</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Category</DialogTitle>
                <DialogDescription>Create a new category for knowledge base articles.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Category Name</label>
                  <Input placeholder="Enter category name" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <Textarea placeholder="Enter category description" />
                </div>
                <div className="flex items-center justify-between">
                  <span>Visible in Navigation</span>
                  <Switch defaultChecked />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Display Order</label>
                  <Input type="number" defaultValue="1" min="1" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddCategoryOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsAddCategoryOpen(false)}>Save Category</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Input
            placeholder="Search categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-sm"
          />

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Articles</TableHead>
                <TableHead>Visibility</TableHead>
                <TableHead>Order</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCategories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className="font-medium">{category.name}</TableCell>
                  <TableCell className="max-w-md">{category.description}</TableCell>
                  <TableCell>{category.articleCount}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Switch checked={category.isVisible} />
                      <span>{category.isVisible ? "Visible" : "Hidden"}</span>
                    </div>
                  </TableCell>
                  <TableCell>{category.order}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        View Articles
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">
                Showing {filteredCategories.length} of {categories.length} categories
              </p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">Reorder Categories</Button>
              <Button variant="outline">Export Categories</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

