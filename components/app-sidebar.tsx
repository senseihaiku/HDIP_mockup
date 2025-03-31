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

