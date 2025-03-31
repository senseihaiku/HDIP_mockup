import type React from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { Header } from "@/components/header"
import { ThemeProvider } from "@/components/theme-provider"

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // In a real app, this would come from a user session/context
  const userRole = "admin"

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      <div className="flex h-screen flex-col">
        <Header userRole={userRole} />
        <div className="flex flex-1 overflow-hidden">
          <AppSidebar />
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </div>
    </ThemeProvider>
  )
}

