"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function CommentModeration() {
  const [searchQuery, setSearchQuery] = useState("")

  // Mock comments data
  const comments = [
    {
      id: 1,
      content: "This article was very helpful for understanding FAIR principles. Thank you!",
      author: "john.doe@example.com",
      article: "Introduction to FAIR Data Principles",
      status: "Approved",
      datePosted: "2025-03-29T14:22:18Z",
      flags: 0,
    },
    {
      id: 2,
      content: "I disagree with some points in this article. The implementation section needs more detail.",
      author: "sarah.smith@example.com",
      article: "Data Governance Best Practices",
      status: "Approved",
      datePosted: "2025-03-30T09:15:42Z",
      flags: 0,
    },
    {
      id: 3,
      content: "This content contains potentially sensitive information that should be reviewed.",
      author: "robert.johnson@example.com",
      article: "Securing Health Data: A Comprehensive Guide",
      status: "Pending",
      datePosted: "2025-03-30T12:08:33Z",
      flags: 2,
    },
    {
      id: 4,
      content: "Spam comment with inappropriate links and content.",
      author: "unknown@example.com",
      article: "Ethical Considerations in Health Data Sharing",
      status: "Rejected",
      datePosted: "2025-03-28T10:45:21Z",
      flags: 5,
    },
    {
      id: 5,
      content: "Could you provide more examples of interoperability standards in practice?",
      author: "emily.davis@example.com",
      article: "Data Interoperability Standards",
      status: "Pending",
      datePosted: "2025-03-30T16:32:10Z",
      flags: 0,
    },
  ]

  const filteredComments = comments.filter(
    (comment) =>
      comment.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comment.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comment.article.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Comment Moderation</CardTitle>
          <div className="flex space-x-2">
            <Button variant="outline">Moderation Settings</Button>
            <Button>Approve Selected</Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="pending">
          <TabsList className="mb-4">
            <TabsTrigger value="pending">Pending Review</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
            <TabsTrigger value="flagged">Flagged</TabsTrigger>
          </TabsList>

          <div className="flex items-center space-x-2 mb-4">
            <Input
              placeholder="Search comments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-sm"
            />
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by article" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Articles</SelectItem>
                <SelectItem value="fair">Introduction to FAIR Data Principles</SelectItem>
                <SelectItem value="governance">Data Governance Best Practices</SelectItem>
                <SelectItem value="security">Securing Health Data</SelectItem>
                <SelectItem value="ethics">Ethical Considerations</SelectItem>
                <SelectItem value="interoperability">Data Interoperability Standards</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[30px]">
                  <input type="checkbox" />
                </TableHead>
                <TableHead>Comment</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Article</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date Posted</TableHead>
                <TableHead>Flags</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredComments.map((comment) => (
                <TableRow key={comment.id}>
                  <TableCell>
                    <input type="checkbox" />
                  </TableCell>
                  <TableCell className="max-w-md truncate">{comment.content}</TableCell>
                  <TableCell>{comment.author}</TableCell>
                  <TableCell className="max-w-xs truncate">{comment.article}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        comment.status === "Approved"
                          ? "default"
                          : comment.status === "Pending"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {comment.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(comment.datePosted).toLocaleString()}</TableCell>
                  <TableCell>
                    {comment.flags > 0 ? <Badge variant="destructive">{comment.flags}</Badge> : "0"}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        Approve
                      </Button>
                      <Button variant="outline" size="sm">
                        Reject
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <TabsContent value="pending">{/* Content for pending tab is shown by default */}</TabsContent>

          <TabsContent value="approved">
            <div className="p-4 text-center">
              <p className="text-muted-foreground">Filter is applied to show only approved comments.</p>
            </div>
          </TabsContent>

          <TabsContent value="rejected">
            <div className="p-4 text-center">
              <p className="text-muted-foreground">Filter is applied to show only rejected comments.</p>
            </div>
          </TabsContent>

          <TabsContent value="flagged">
            <div className="p-4 text-center">
              <p className="text-muted-foreground">Filter is applied to show only flagged comments.</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

