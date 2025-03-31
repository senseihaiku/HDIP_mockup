"use client"

import type React from "react"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { Clock, FileText, Lock, MessageSquare, Shield, UserPlus } from "lucide-react"

interface Notification {
  id: string
  icon: React.ReactNode
  title: string
  description: string
  time: string
  type: "request" | "message" | "system" | "governance"
  read: boolean
}

const notifications: Notification[] = [
  {
    id: "not-1",
    icon: <FileText className="h-4 w-4 text-blue-500" />,
    title: "Access Request Approved",
    description: "Your request for 'COVID-19 Long-term Effects' dataset has been approved.",
    time: "Just now",
    type: "request",
    read: false,
  },
  {
    id: "not-2",
    icon: <MessageSquare className="h-4 w-4 text-indigo-500" />,
    title: "New message from Data Steward",
    description: "We need additional information for your recent data access request.",
    time: "2 hours ago",
    type: "message",
    read: false,
  },
  {
    id: "not-3",
    icon: <UserPlus className="h-4 w-4 text-green-500" />,
    title: "New collaborator invitation",
    description: "Dr. Emma Johnson has invited you to collaborate on a project.",
    time: "Yesterday",
    type: "request",
    read: false,
  },
  {
    id: "not-4",
    icon: <Lock className="h-4 w-4 text-amber-500" />,
    title: "DUA Update Required",
    description: "Please review and sign the updated Data Use Agreement.",
    time: "2 days ago",
    type: "governance",
    read: true,
  },
  {
    id: "not-5",
    icon: <Shield className="h-4 w-4 text-red-500" />,
    title: "Security Alert",
    description: "New device login detected from Stockholm, Sweden.",
    time: "3 days ago",
    type: "system",
    read: true,
  },
  {
    id: "not-6",
    icon: <Clock className="h-4 w-4 text-purple-500" />,
    title: "Access Expiration Reminder",
    description: "Your access to 'Diabetes Registry 2023' expires in 7 days.",
    time: "4 days ago",
    type: "governance",
    read: true,
  },
]

export function NotificationsList() {
  const [readIds, setReadIds] = useState<string[]>(notifications.filter((n) => n.read).map((n) => n.id))

  const markAsRead = (id: string) => {
    if (!readIds.includes(id)) {
      setReadIds([...readIds, id])
    }
  }

  const markAllAsRead = () => {
    setReadIds(notifications.map((n) => n.id))
  }

  return (
    <Tabs defaultValue="all">
      <div className="flex items-center justify-between mb-4">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="unread">
            Unread <Badge className="ml-1 h-4 px-1">{notifications.length - readIds.length}</Badge>
          </TabsTrigger>
        </TabsList>
        <Button variant="ghost" size="sm" onClick={markAllAsRead}>
          Mark all as read
        </Button>
      </div>

      <TabsContent value="all" className="m-0">
        <ScrollArea className="h-[400px]">
          <div className="space-y-4 pr-3">
            {notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                isRead={readIds.includes(notification.id)}
                onMarkAsRead={() => markAsRead(notification.id)}
              />
            ))}
          </div>
        </ScrollArea>
      </TabsContent>

      <TabsContent value="unread" className="m-0">
        <ScrollArea className="h-[400px]">
          <div className="space-y-4 pr-3">
            {notifications
              .filter((notification) => !readIds.includes(notification.id))
              .map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  isRead={false}
                  onMarkAsRead={() => markAsRead(notification.id)}
                />
              ))}
          </div>
        </ScrollArea>
      </TabsContent>
    </Tabs>
  )
}

function NotificationItem({
  notification,
  isRead,
  onMarkAsRead,
}: {
  notification: Notification
  isRead: boolean
  onMarkAsRead: () => void
}) {
  return (
    <div
      className={cn(
        "flex items-start gap-4 rounded-lg border p-3 transition-colors hover:bg-muted/50",
        !isRead && "bg-muted/50",
      )}
      onClick={onMarkAsRead}
    >
      <div className="mt-1">{notification.icon}</div>
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <p className={cn("text-sm font-medium", !isRead && "font-semibold")}>{notification.title}</p>
          <p className="text-xs text-muted-foreground whitespace-nowrap">{notification.time}</p>
        </div>
        <p className="text-sm text-muted-foreground">{notification.description}</p>
      </div>
      {!isRead && (
        <div className="flex-shrink-0 mt-1">
          <div className="h-2 w-2 rounded-full bg-primary" />
        </div>
      )}
    </div>
  )
}

