"use client"

import type React from "react"

import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import {
  BarChart3,
  BookOpen,
  Calculator,
  Database,
  FileText,
  Home,
  LockKeyhole,
  Settings,
  ShieldCheck,
  Search,
  Upload,
  TrendingUp,
  Users,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarItemProps {
  href: string
  icon: React.ReactNode
  title: string
  isActive?: boolean
  badge?: string
  onClick?: () => void
}

function SidebarItem({ href, icon, title, isActive, badge, onClick }: SidebarItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
        isActive ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted",
      )}
      onClick={onClick}
    >
      {icon}
      <span>{title}</span>
      {badge && (
        <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-xs font-medium">
          {badge}
        </span>
      )}
    </Link>
  )
}

export function AppSidebar() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const mode = searchParams?.get("mode") || ""

  // Fix the active state logic to be more specific
  const isActive = (path: string, checkMode?: string) => {
    if (path === "/dashboard" && checkMode) {
      return pathname === "/dashboard" && mode === checkMode
    }
    return pathname === path || (path !== "/dashboard" && pathname?.startsWith(path))
  }

  return (
    <div className="hidden md:block border-r w-64 overflow-y-auto">
      <div className="py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Navigation</h2>
          <div className="space-y-1">
            <SidebarItem
              href="/dashboard"
              icon={<Home className="h-4 w-4" />}
              title="Dashboard"
              isActive={isActive("/dashboard") && !mode}
            />
          </div>

          <h2 className="mb-2 mt-4 px-4 text-lg font-semibold tracking-tight">Marketplace</h2>
          <div className="space-y-1">
            <SidebarItem
              href="/dashboard?mode=discover"
              icon={<Search className="h-4 w-4" />}
              title="Discover Datasets"
              isActive={isActive("/dashboard", "discover")}
            />
            <SidebarItem
              href="/catalog"
              icon={<Database className="h-4 w-4" />}
              title="Browse Catalog"
              isActive={isActive("/catalog")}
            />
            <SidebarItem
              href="/trending"
              icon={<TrendingUp className="h-4 w-4" />}
              title="Trending"
              isActive={isActive("/trending")}
            />
            <SidebarItem
              href="/requests"
              icon={<FileText className="h-4 w-4" />}
              title="My Requests"
              isActive={isActive("/requests")}
              badge="3"
            />
          </div>

          <h2 className="mb-2 mt-4 px-4 text-lg font-semibold tracking-tight">Contribution</h2>
          <div className="space-y-1">
            <SidebarItem
              href="/dashboard?mode=contribute"
              icon={<Upload className="h-4 w-4" />}
              title="My Datasets"
              isActive={isActive("/dashboard", "contribute")}
            />
            <SidebarItem
              href="/contribute/new"
              icon={<Database className="h-4 w-4" />}
              title="Add New Dataset"
              isActive={isActive("/contribute/new")}
            />
            <SidebarItem
              href="/analytics"
              icon={<BarChart3 className="h-4 w-4" />}
              title="Impact Analytics"
              isActive={isActive("/analytics")}
            />
            <SidebarItem
              href="/governance"
              icon={<ShieldCheck className="h-4 w-4" />}
              title="Governance"
              isActive={isActive("/governance")}
            />
          </div>

          <h2 className="mb-2 mt-4 px-4 text-lg font-semibold tracking-tight">Resources</h2>
          <div className="space-y-1">
            <SidebarItem
              href="/kb"
              icon={<BookOpen className="h-4 w-4" />}
              title="Knowledge Base"
              isActive={isActive("/kb")}
            />
            <SidebarItem
              href="/community"
              icon={<Users className="h-4 w-4" />}
              title="Community"
              isActive={isActive("/community")}
            />
            <SidebarItem
              href="/value-calculator"
              icon={<Calculator className="h-4 w-4" />}
              title="Value Calculator"
              isActive={isActive("/value-calculator")}
            />
            <SidebarItem
              href="/knowledge-graph"
              icon={<svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 2H15C16.1046 2 17 2.89543 17 4V6C17 7.10457 16.1046 8 15 8H9C7.89543 8 7 7.10457 7 6V4C7 2.89543 7.89543 2 9 2Z" stroke="currentColor" strokeWidth="2" />
                <path d="M3 14H9C10.1046 14 11 14.8954 11 16V18C11 19.1046 10.1046 20 9 20H3C1.89543 20 1 19.1046 1 18V16C1 14.8954 1.89543 14 3 14Z" stroke="currentColor" strokeWidth="2" />
                <path d="M15 14H21C22.1046 14 23 14.8954 23 16V18C23 19.1046 22.1046 20 21 20H15C13.8954 20 13 19.1046 13 18V16C13 14.8954 13.8954 14 15 14Z" stroke="currentColor" strokeWidth="2" />
                <path d="M12 8V14" stroke="currentColor" strokeWidth="2" />
                <path d="M7 14L9 12" stroke="currentColor" strokeWidth="2" />
                <path d="M17 14L15 12" stroke="currentColor" strokeWidth="2" />
              </svg>}
              title="Knowledge Graph"
              isActive={isActive("/knowledge-graph")}
            />
            <SidebarItem
              href="/digital-twin"
              icon={<svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" />
                <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" stroke="currentColor" strokeWidth="2" />
                <path d="M17.5 6.5L16 8" stroke="currentColor" strokeWidth="2" />
                <path d="M6.5 17.5L8 16" stroke="currentColor" strokeWidth="2" />
              </svg>}
              title="Digital Twin"
              isActive={isActive("/digital-twin")}
            />
            <SidebarItem
              href="/matchmaking"
              icon={<svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 9V5C14 3.89543 13.1046 3 12 3L8 3C6.89543 3 6 3.89543 6 5L6 9C6 10.1046 6.89543 11 8 11L12 11C13.1046 11 14 10.1046 14 9Z" stroke="currentColor" strokeWidth="2" />
                <path d="M18 9L18 5C18 3.89543 17.1046 3 16 3" stroke="currentColor" strokeWidth="2" />
                <path d="M18 9C18 10.1046 17.1046 11 16 11" stroke="currentColor" strokeWidth="2" />
                <path d="M6 15L6 19C6 20.1046 6.89543 21 8 21L12 21C13.1046 21 14 20.1046 14 19L14 15C14 13.8954 13.1046 13 12 13L8 13C6.89543 13 6 13.8954 6 15Z" stroke="currentColor" strokeWidth="2" />
                <path d="M18 15L18 19C18 20.1046 17.1046 21 16 21" stroke="currentColor" strokeWidth="2" />
                <path d="M18 15C18 13.8954 17.1046 13 16 13" stroke="currentColor" strokeWidth="2" />
              </svg>}
              title="Matchmaking"
              isActive={isActive("/matchmaking")}
            />
          </div>

          <h2 className="mb-2 mt-4 px-4 text-lg font-semibold tracking-tight">Settings</h2>
          <div className="space-y-1">
            <SidebarItem
              href="/profile"
              icon={<Settings className="h-4 w-4" />}
              title="Profile Settings"
              isActive={isActive("/profile")}
            />
            <SidebarItem
              href="/admin"
              icon={<LockKeyhole className="h-4 w-4" />}
              title="Admin Panel"
              isActive={isActive("/admin")}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
