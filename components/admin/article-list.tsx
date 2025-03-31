"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ArticleList() {
  const [searchQuery, setSearchQuery] = useState("")

  // Mock articles data
  const articles = [
    {
      id: 1,
      title: "Introduction to FAIR Data Principles",
      category: "FAIR",
      status: "Published",
      author: "Dr. Jane Smith",
      views: 1245,
      lastUpdated: "2025-03-15",
    },
    {
      id: 2,
      title: "Data Governance Best Practices",
      category: "Governance",
      status: "Published",
      author: "Prof. Robert Johnson",
      views: 982,
      lastUpdated: "2025-03-01",
    },
    {
      id: 3,
      title: "Securing Health Data: A Comprehensive Guide",
      category: "Security",
      status: "Draft",
      author: "Dr. Michael Brown",
      views: 0,
      lastUpdated: "2025-03-28",
    },
    {
      id: 4,
      title: "Ethical Considerations in Health Data Sharing",
      category: "Ethics",
      status: "Review",
      author: "Dr. Sarah Williams",
      views: 0,
      lastUpdated: "2025-03-25",
    },
    {
      id: 5,
      title: "Data Interoperability Standards",
      category: "Interoperability",
      status: "Published",
      author: "Prof. David Miller",
      views: 756,
      lastUpdated: "2025-02-20",
    },
  ]

  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.author.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Knowledge Base Articles</CardTitle>
          <Button>Create New Article</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-sm"
            />
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="review">Under Review</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all-categories">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-categories">All Categories</SelectItem>
                <SelectItem value="fair">FAIR</SelectItem>
                <SelectItem value="governance">Governance</SelectItem>
                <SelectItem value="security">Security</SelectItem>
                <SelectItem value="ethics">Ethics</SelectItem>
                <SelectItem value="interoperability">Interoperability</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Views</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredArticles.map((article) => (
                <TableRow key={article.id}>
                  <TableCell className="font-medium">{article.title}</TableCell>
                  <TableCell>{article.category}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        article.status === "Published"
                          ? "default"
                          : article.status === "Review"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {article.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{article.author}</TableCell>
                  <TableCell>{article.views}</TableCell>
                  <TableCell>{article.lastUpdated}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        Preview
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

