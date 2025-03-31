"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState("discussions")

  return (
    <div className="flex flex-col p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Community</h1>
          <p className="text-muted-foreground">
            Connect with other health data professionals and researchers
          </p>
        </div>
        <Button>Create New Post</Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="discussions" className="flex-1">Discussions</TabsTrigger>
          <TabsTrigger value="questions" className="flex-1">Questions</TabsTrigger>
          <TabsTrigger value="events" className="flex-1">Events</TabsTrigger>
          <TabsTrigger value="members" className="flex-1">Members</TabsTrigger>
        </TabsList>

        <TabsContent value="discussions" className="space-y-6">
          <div className="flex gap-6 flex-col lg:flex-row">
            <div className="lg:w-3/4 space-y-4">
              {["Data Quality Standards", "FAIR Implementation Challenges", "Federated Learning for Health Data", "Standardizing Medical Imaging Formats", "Ethics in Health Data Sharing"].map((title, i) => (
                <Card key={i} className="hover:bg-muted/50 transition-colors">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <CardTitle className="text-xl">{title}</CardTitle>
                      <Badge variant={i === 0 ? "default" : i === 1 ? "destructive" : "outline"}>
                        {i === 0 ? "Hot" : i === 1 ? "Trending" : "Discussion"}
                      </Badge>
                    </div>
                    <CardDescription>
                      Started by <span className="font-medium">Dr. Sarah Johnson</span> • {2 + i} days ago
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="line-clamp-2">
                      Discussing the challenges and opportunities in implementing {title.toLowerCase()} across multiple research institutions. Looking for insights from those who have successfully navigated regulatory requirements.
                    </p>
                  </CardContent>
                  <CardFooter className="text-sm text-muted-foreground pt-0 flex justify-between">
                    <div className="flex items-center gap-4">
                      <span>{10 + i * 3} replies</span>
                      <span>{35 + i * 12} views</span>
                    </div>
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map((j) => (
                        <Avatar key={j} className="h-6 w-6 border-2 border-background">
                          <AvatarFallback>U{j}</AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="lg:w-1/4 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Popular Tags</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {["FAIR", "Interoperability", "Privacy", "Governance", "Research", "Ethics", "Standards", "Metadata", "Security", "Patient Data"].map((tag, i) => (
                      <Badge key={i} variant="outline" className="cursor-pointer hover:bg-muted">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Contributors</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>U{i}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">Dr. Sarah Johnson</div>
                        <div className="text-xs text-muted-foreground">{120 - i * 15} contributions</div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="questions" className="space-y-6">
          <div className="flex gap-6 flex-col lg:flex-row">
            <div className="w-full space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Ask a Question</CardTitle>
                  <CardDescription>Get help from the community</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Input placeholder="Question title" />
                  </div>
                  <div className="space-y-2">
                    <Textarea placeholder="Describe your question in detail..." rows={4} />
                  </div>
                  <div className="space-y-2">
                    <Input placeholder="Add tags (comma separated)" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Post Question</Button>
                </CardFooter>
              </Card>

              <div className="text-xl font-bold mb-2">Recent Questions</div>
              {["How to handle missing values in clinical data sets?", "Best practices for de-identification", "Implementing FAIR principles for genomic data", "Regulatory requirements for cross-border data sharing", "Tools for automated metadata generation"].map((title, i) => (
                <Card key={i} className="hover:bg-muted/50 transition-colors">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <CardTitle className="text-xl">{title}</CardTitle>
                      <Badge variant={i < 2 ? "outline" : "secondary"}>
                        {i < 2 ? (i === 0 ? "Answered" : "New") : "Open"}
                      </Badge>
                    </div>
                    <CardDescription>
                      Asked by <span className="font-medium">Mark Wilson</span> • {1 + i} days ago
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="line-clamp-2">
                      I'm working on a project involving {title.toLowerCase()} and need some guidance on best approaches and potential pitfalls to avoid.
                    </p>
                  </CardContent>
                  <CardFooter className="text-sm text-muted-foreground pt-0">
                    <div className="flex items-center gap-4">
                      <span>{i < 2 ? 3 - i : 0} answers</span>
                      <span>{15 + i * 8} views</span>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="events" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {["Health Data Innovation Summit", "FAIR Data Workshop", "Ethics in AI for Healthcare", "Federated Learning Masterclass", "Data Governance Symposium", "Open Health Data Hackathon"].map((title, i) => (
              <Card key={i} className="hover:bg-muted/50 transition-colors">
                <CardHeader>
                  <CardTitle>{title}</CardTitle>
                  <CardDescription>
                    {i % 2 === 0 ? "Virtual" : "In-person"} • {new Date(2025, 3 + i, 10 + i).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-3">
                    Join us for this {i % 2 === 0 ? "virtual" : "in-person"} event focused on {title.toLowerCase()}. Connect with experts and practitioners in the field of health data.
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Badge variant="outline">{i % 3 === 0 ? "Free" : `$${(i+1) * 50}`}</Badge>
                  <Button variant="outline">Register</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="members" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 9 }).map((_, i) => (
              <Card key={i}>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback>{`${String.fromCharCode(65 + i % 26)}${String.fromCharCode(65 + (i+1) % 26)}`}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>{["Dr. Sarah Johnson", "Mark Wilson", "Emma Chen", "Dr. Robert Garcia", "Priya Patel", "James Thompson", "Dr. Sophia Lee", "Michael Brown", "Olivia Martinez"][i % 9]}</CardTitle>
                      <CardDescription>{["Lead Researcher", "Data Scientist", "Clinical Informatician", "Medical Director", "Policy Analyst", "IT Specialist", "Biostatistician", "Health Economist", "Ethics Officer"][i % 9]}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {[["FAIR", "Governance", "Policy"], ["ML", "Statistics", "Data Quality"], ["Clinical", "Research", "Standards"], ["Ethics", "Governance", "Privacy"], ["Policy", "Standards", "Documentation"], ["Infrastructure", "Security", "API"], ["Research", "Statistics", "Clinical Trials"], ["Economics", "Value", "ROI"], ["Ethics", "Privacy", "Patient Rights"]][i % 9].map((tag, j) => (
                      <Badge key={j} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Member since {new Date(2024, i % 12, 1 + i % 28).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">View Profile</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
