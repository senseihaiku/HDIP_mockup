"use client"

import Link from "next/link"
import { Bell, MessageSquare, Search, Menu, Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { AppSidebar } from "./app-sidebar"
import { useTheme } from "next-themes"

export function Header({ userRole = "contributor" }: { userRole?: "public" | "contributor" | "admin" }) {
  const { theme, setTheme } = useTheme()

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/95 backdrop-blur-sm px-4 sm:px-6">
      <div className="hidden md:flex md:w-64 items-center">
        <Link href="/" className="text-xl font-semibold">HDIP</Link>
      </div>

      {/* Mobile menu trigger */}
      <Sheet>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[240px] sm:w-[300px]">
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between border-b px-2 py-4">
              <Link href="/" className="text-lg font-semibold">HDIP</Link>
            </div>
            <div className="flex-1 overflow-auto py-2">
              <AppSidebar />
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <Button variant="outline" size="sm" className="h-9 w-9 p-0 ml-auto md:ml-0 md:w-fit md:px-3">
        <Search className="h-4 w-4 md:mr-2" />
        <span className="hidden md:inline">Search</span>
      </Button>

      <div className="flex items-center gap-2 ml-auto">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <Badge className="absolute -top-1.5 -right-1.5 h-4 w-4 p-0 flex items-center justify-center">3</Badge>
              <span className="sr-only">Notifications</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[300px]">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-[300px] overflow-auto">
              <DropdownMenuItem className="flex flex-col items-start">
                <div className="font-medium">Dataset access approved</div>
                <div className="text-xs text-muted-foreground">
                  Your request for "Genomic Markers Collection" was approved
                </div>
                <div className="text-xs text-muted-foreground mt-1">2 hours ago</div>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start">
                <div className="font-medium">New dataset available</div>
                <div className="text-xs text-muted-foreground">
                  A new dataset matching your interests is now available
                </div>
                <div className="text-xs text-muted-foreground mt-1">Yesterday</div>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start">
                <div className="font-medium">Access request received</div>
                <div className="text-xs text-muted-foreground">Someone requested access to your dataset</div>
                <div className="text-xs text-muted-foreground mt-1">3 days ago</div>
              </DropdownMenuItem>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/notifications" className="w-full text-center justify-center">
                View all notifications
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {userRole !== "public" && (
          <Link href="/messages">
            <Button variant="outline" size="icon">
              <MessageSquare className="h-4 w-4" />
              <span className="sr-only">Messages</span>
            </Button>
          </Link>
        )}

        <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          <span className="sr-only">Toggle theme</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder-user.jpg" alt="User" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">User</p>
                <p className="text-xs leading-none text-muted-foreground capitalize">{userRole}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/settings">Settings</Link>
            </DropdownMenuItem>
            {userRole === "admin" && (
              <DropdownMenuItem asChild>
                <Link href="/admin">Admin Panel</Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
