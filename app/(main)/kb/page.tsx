"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Search, BookOpen, FileText, Users, Settings } from "lucide-react"

export default function KnowledgeBasePage() {
  return (
    <div className="flex flex-col p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Knowledge Base</h1>
        <p className="text-muted-foreground">Resources and guides for using the platform</p>
      </div>

      <div className="relative w-full max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search knowledge base..." className="pl-10" />
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="all" className="flex-1">
            All Resources
          </TabsTrigger>
          <TabsTrigger value="guides" className="flex-1">
            Guides
          </TabsTrigger>
          <TabsTrigger value="fair" className="flex-1">
            FAIR Principles
          </TabsTrigger>
          <TabsTrigger value="templates" className="flex-1">
            Templates
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4 mt-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/kb/operating-model">
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    Operating Model
                  </CardTitle>
                  <CardDescription>Learn about the platform&apos;s operating model</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    Understand how the platform facilitates secure data sharing and collaboration
                  </p>
                </CardContent>
                <CardFooter className="text-xs text-muted-foreground">Updated: March 15, 2025</CardFooter>
              </Card>
            </Link>

            <Link href="/kb/workflows">
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Workflows
                  </CardTitle>
                  <CardDescription>Step-by-step guides for common tasks</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">Follow detailed workflows for contributing, discovering, and accessing data</p>
                </CardContent>
                <CardFooter className="text-xs text-muted-foreground">Updated: March 10, 2025</CardFooter>
              </Card>
            </Link>

            <Link href="/kb/fair">
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5 text-primary" />
                    FAIR Principles
                  </CardTitle>
                  <CardDescription>Understanding FAIR data principles</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    Learn how to make your data Findable, Accessible, Interoperable, and Reusable
                  </p>
                </CardContent>
                <CardFooter className="text-xs text-muted-foreground">Updated: March 5, 2025</CardFooter>
              </Card>
            </Link>

            <Link href="/kb/templates">
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Templates
                  </CardTitle>
                  <CardDescription>Standardized templates for data sharing</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">Access templates for data sharing agreements, consent forms, and metadata</p>
                </CardContent>
                <CardFooter className="text-xs text-muted-foreground">Updated: February 28, 2025</CardFooter>
              </Card>
            </Link>

            <Link href="/kb/community">
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Community Guidelines
                  </CardTitle>
                  <CardDescription>Best practices for community engagement</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">Learn how to effectively collaborate and engage with the platform community</p>
                </CardContent>
                <CardFooter className="text-xs text-muted-foreground">Updated: February 20, 2025</CardFooter>
              </Card>
            </Link>
          </div>
        </TabsContent>

        {/* Other tab contents would be similar */}
      </Tabs>
    </div>
  )
}
