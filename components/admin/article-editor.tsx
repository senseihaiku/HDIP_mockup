"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

export function ArticleEditor() {
  const [articleTitle, setArticleTitle] = useState("Introduction to FAIR Data Principles")
  const [articleContent, setArticleContent] = useState(`# Introduction to FAIR Data Principles

The FAIR data principles were first introduced in 2016 to guide the management and stewardship of scientific data. FAIR stands for:

- **Findable**: Data should be easy to find for both humans and computers.
- **Accessible**: Once found, data should be accessible, potentially with authentication and authorization.
- **Interoperable**: Data should be able to be integrated with other data and work with applications for analysis, storage, and processing.
- **Reusable**: Data should be well-described so it can be replicated and/or combined in different settings.

## Why FAIR Matters in Healthcare

In healthcare, FAIR data principles are particularly important because:

1. They enable better research collaboration
2. They improve data quality and reliability
3. They support reproducible science
4. They maximize the value of healthcare data investments

## Implementing FAIR Principles

To implement FAIR principles in your organization:

1. Assign persistent identifiers to datasets
2. Create comprehensive metadata
3. Use standardized vocabularies and ontologies
4. Document clear data access procedures
5. Include detailed provenance information`)

  return (
    <Card className="border-0 shadow-none">
      <CardHeader className="px-0">
        <div className="flex justify-between items-center">
          <CardTitle>Article Editor</CardTitle>
          <div className="flex space-x-2">
            <Button variant="outline">Save Draft</Button>
            <Button variant="outline">Preview</Button>
            <Button>Publish</Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-0">
        <Tabs defaultValue="edit">
          <TabsList className="mb-4">
            <TabsTrigger value="edit">Edit</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="history">Version History</TabsTrigger>
          </TabsList>

          <TabsContent value="edit">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Article Title</label>
                <Input value={articleTitle} onChange={(e) => setArticleTitle(e.target.value)} className="text-lg" />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <Select defaultValue="fair">
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fair">FAIR</SelectItem>
                      <SelectItem value="governance">Governance</SelectItem>
                      <SelectItem value="security">Security</SelectItem>
                      <SelectItem value="ethics">Ethics</SelectItem>
                      <SelectItem value="interoperability">Interoperability</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Author</label>
                  <Input defaultValue="Dr. Jane Smith" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Status</label>
                  <Select defaultValue="published">
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="review">Under Review</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Content (Markdown)</label>
                <Textarea
                  value={articleContent}
                  onChange={(e) => setArticleContent(e.target.value)}
                  className="min-h-[500px] font-mono"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="preview">
            <div className="border rounded-md p-6">
              <h1 className="text-2xl font-bold mb-4">{articleTitle}</h1>
              <div className="prose max-w-none">
                {/* This would render the markdown content */}
                <p>Preview of the rendered markdown would appear here.</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <Card className="p-4">
                  <h3 className="font-medium mb-2">Visibility Settings</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span>Featured Article</span>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Show in Navigation</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Allow Comments</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Require Authentication to View</span>
                      <Switch />
                    </div>
                  </div>
                </Card>

                <Card className="p-4">
                  <h3 className="font-medium mb-2">SEO Settings</h3>
                  <div className="space-y-2">
                    <div>
                      <label className="block text-sm font-medium mb-1">Meta Title</label>
                      <Input defaultValue="Introduction to FAIR Data Principles | Health Data Platform" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Meta Description</label>
                      <Textarea defaultValue="Learn about the FAIR data principles and why they matter for healthcare data management. Discover how to implement findable, accessible, interoperable, and reusable data practices." />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Keywords</label>
                      <Input defaultValue="FAIR principles, healthcare data, data management, findable, accessible, interoperable, reusable" />
                    </div>
                  </div>
                </Card>
              </div>

              <div className="flex justify-end">
                <Button>Save Settings</Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="history">
            <div className="p-4 text-center">
              <p className="text-muted-foreground">Version history will be available in the next update.</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

