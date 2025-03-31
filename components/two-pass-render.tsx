"use client"

import { useState, useEffect, type ReactNode } from "react"
import { Header } from "@/components/header"
import { AppSidebar } from "@/components/app-sidebar"

export function TwoPassRender({ children }: { children: ReactNode }) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // This is what will be rendered on the server and during the first client render
  if (!isClient) {
    return (
      <div className="flex h-screen flex-col">
        <div className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
          <div className="hidden md:block md:w-64">
            <span className="text-xl font-semibold">HDIP</span>
          </div>
        </div>
        <div className="flex flex-1 overflow-hidden">
          <div className="hidden md:block border-r w-64">{/* Static sidebar placeholder */}</div>
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </div>
    )
  }

  // This is what will be rendered after the component mounts on the client
  return (
    <div className="flex h-screen flex-col">
      <Header userRole="admin" />
      <div className="flex flex-1 overflow-hidden">
        <AppSidebar />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  )
}

