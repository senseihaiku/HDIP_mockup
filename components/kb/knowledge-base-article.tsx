"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Edit, MessageSquare, Eye } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"

interface KnowledgeBaseArticleProps {
  title: string
  description: string
  content: string
  lastUpdated?: string
  author?: string
}

export function KnowledgeBaseArticle({
  title,
  description,
  content,
  lastUpdated = "2025-03-15",
  author = "System Admin",
}: KnowledgeBaseArticleProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedContent, setEditedContent] = useState(content)
  const [showComments, setShowComments] = useState(false)

  // This would come from a user context in a real app
  const userRole = "admin" // or "contributor" or "public"

  const toggleEdit = () => {
    if (isEditing) {
      // Save changes logic would go here
      setIsEditing(false)
    } else {
      setIsEditing(true)
    }
  }

  const toggleComments = () => {
    setShowComments(!showComments)
  }

  // Simple markdown-like rendering
  const renderContent = (text: string) => {
    // Split by lines
    const lines = text.split("\n")

    return lines.map((line, index) => {
      // Headers
      if (line.startsWith("# ")) {
        return (
          <h1 key={index} className="text-2xl font-bold mt-6 mb-4">
            {line.substring(2)}
          </h1>
        )
      }
      if (line.startsWith("## ")) {
        return (
          <h2 key={index} className="text-xl font-bold mt-5 mb-3">
            {line.substring(3)}
          </h2>
        )
      }
      if (line.startsWith("### ")) {
        return (
          <h3 key={index} className="text-lg font-bold mt-4 mb-2">
            {line.substring(4)}
          </h3>
        )
      }

      // Lists
      if (line.startsWith("- ")) {
        return (
          <li key={index} className="ml-6 list-disc">
            {line.substring(2)}
          </li>
        )
      }

      // Empty line
      if (line.trim() === "") {
        return <div key={index} className="h-4"></div>
      }

      // Regular paragraph
      return (
        <p key={index} className="my-2">
          {line}
        </p>
      )
    })
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-2xl">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            {userRole === "admin" && (
              <Button variant="outline" size="sm" onClick={toggleEdit}>
                {isEditing ? <Eye className="h-4 w-4 mr-2" /> : <Edit className="h-4 w-4 mr-2" />}
                {isEditing ? "Preview" : "Edit"}
              </Button>
            )}
            <Button variant="outline" size="sm" onClick={toggleComments}>
              <MessageSquare className="h-4 w-4 mr-2" />
              Comments
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              Last updated: {lastUpdated}
            </Badge>
            <Badge variant="outline" className="text-xs">
              By: {author}
            </Badge>
          </div>
          <Badge className="bg-green-100 text-green-800">Public</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="prose max-w-none">
          {isEditing ? (
            <div className="space-y-4">
              <Textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                rows={20}
                className="font-mono text-sm"
              />
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button onClick={toggleEdit}>Save Changes</Button>
              </div>
            </div>
          ) : (
            <div>{renderContent(editedContent)}</div>
          )}
        </div>

        {showComments && (
          <div className="mt-8">
            <Separator className="my-4" />
            <h3 className="text-lg font-medium mb-4">Comments</h3>

            <div className="space-y-4">
              <div className="flex gap-4">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Jane Doe</p>
                    <span className="text-xs text-muted-foreground">2 days ago</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Could we add more details about the FAIR implementation checklist?
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                  <AvatarFallback>MS</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Mark Smith</p>
                    <span className="text-xs text-muted-foreground">1 day ago</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    The cross-cutting processes section could use some examples.
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <Textarea placeholder="Add a comment..." className="mb-2" />
                <div className="flex justify-end">
                  <Button size="sm">Post Comment</Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

