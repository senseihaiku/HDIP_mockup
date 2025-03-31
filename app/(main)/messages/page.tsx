"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Search } from "lucide-react"

export default function MessagesPage() {
  const [activeConversation, setActiveConversation] = useState<string | null>(null)
  
  // Sample messages data
  const conversations = [
    {
      id: "1",
      user: "Dr. Sarah Johnson",
      role: "Lead Researcher",
      lastMessage: "I've reviewed your access request for the Genomic Markers Collection.",
      time: "2 hours ago",
      unread: true,
      avatar: "/placeholder-user.jpg",
    },
    {
      id: "2",
      user: "Mark Wilson",
      role: "Data Administrator",
      lastMessage: "The data quality assessment for your submitted dataset is now complete.",
      time: "Yesterday",
      unread: false,
      avatar: "/placeholder-user.jpg",
    },
    {
      id: "3",
      user: "Emma Chen",
      role: "Clinical Informatician",
      lastMessage: "Do you have time to discuss standardization of the clinical variables?",
      time: "2 days ago",
      unread: false,
      avatar: "/placeholder-user.jpg",
    },
    {
      id: "4",
      user: "Robert Garcia",
      role: "Ethics Officer",
      lastMessage: "Your consent documentation has been approved by the ethics committee.",
      time: "1 week ago",
      unread: false,
      avatar: "/placeholder-user.jpg",
    },
    {
      id: "5",
      user: "Priya Patel",
      role: "Policy Analyst",
      lastMessage: "We've updated our data sharing policy. Please review the changes.",
      time: "2 weeks ago",
      unread: false,
      avatar: "/placeholder-user.jpg",
    }
  ]

  const messages = [
    {
      id: "1-1",
      conversationId: "1",
      sender: "Dr. Sarah Johnson",
      content: "Hello, I've received your request for access to the Genomic Markers Collection dataset.",
      time: "2 days ago, 10:24 AM",
      isUser: false,
    },
    {
      id: "1-2",
      conversationId: "1",
      sender: "You",
      content: "Thank you for your prompt response. I'm working on a research project focused on identifying biomarkers for early disease detection.",
      time: "2 days ago, 11:15 AM",
      isUser: true,
    },
    {
      id: "1-3",
      conversationId: "1",
      sender: "Dr. Sarah Johnson",
      content: "That sounds interesting. Could you provide more information about your research methodology and how you intend to use the data?",
      time: "Yesterday, 9:30 AM",
      isUser: false,
    },
    {
      id: "1-4",
      conversationId: "1",
      sender: "You",
      content: "Certainly. We're employing machine learning algorithms to identify patterns in genomic data that correlate with early-stage disease markers. Our approach involves...",
      time: "Yesterday, 11:42 AM",
      isUser: true,
    },
    {
      id: "1-5",
      conversationId: "1",
      sender: "Dr. Sarah Johnson",
      content: "I've reviewed your access request for the Genomic Markers Collection and it looks good. I'll be recommending approval to the data governance committee.",
      time: "2 hours ago",
      isUser: false,
    },
  ]

  const selectedConversation = conversations.find(c => c.id === activeConversation)
  const conversationMessages = messages.filter(m => m.conversationId === activeConversation)

  return (
    <div className="flex flex-col p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
        <p className="text-muted-foreground">
          Connect with dataset owners and administrators
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 h-[calc(100vh-220px)]">
        <div className="md:w-1/3 flex flex-col">
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search messages..."
                className="pl-8"
              />
            </div>
          </div>
          
          <Tabs defaultValue="all" className="mb-4">
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unread" className="relative">
                Unread
                <span className="absolute top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                  1
                </span>
              </TabsTrigger>
              <TabsTrigger value="flagged">Flagged</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex-1 overflow-auto space-y-2">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  activeConversation === conversation.id
                    ? "bg-muted"
                    : "hover:bg-muted/50"
                } ${conversation.unread ? "border-l-4 border-primary" : ""}`}
                onClick={() => setActiveConversation(conversation.id)}
              >
                <div className="flex items-start gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={conversation.avatar} alt={conversation.user} />
                    <AvatarFallback>{conversation.user.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between">
                      <span className="font-medium">{conversation.user}</span>
                      <span className="text-xs text-muted-foreground">
                        {conversation.time}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {conversation.role}
                    </div>
                    <p className="text-sm line-clamp-1">
                      {conversation.lastMessage}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="md:w-2/3 flex flex-col">
          {activeConversation ? (
            <Card className="flex flex-col h-full">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={selectedConversation?.avatar} alt={selectedConversation?.user} />
                  <AvatarFallback>{selectedConversation?.user.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{selectedConversation?.user}</CardTitle>
                  <CardDescription>{selectedConversation?.role}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="flex-1 overflow-auto p-4 space-y-4">
                {conversationMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.isUser
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <p>{message.content}</p>
                      <div
                        className={`text-xs mt-1 ${
                          message.isUser ? "text-primary-foreground/80" : "text-muted-foreground"
                        }`}
                      >
                        {message.time}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter className="pt-0">
                <div className="grid w-full gap-2">
                  <Textarea
                    placeholder="Type your message..."
                    className="resize-none"
                    rows={3}
                  />
                  <Button>Send Message</Button>
                </div>
              </CardFooter>
            </Card>
          ) : (
            <Card className="flex items-center justify-center h-full">
              <CardContent className="py-12 text-center">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">No Conversation Selected</h3>
                  <p className="text-muted-foreground">
                    Select a conversation from the list to view messages
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
