"use client"

import React from "react"

import { usePathname } from "next/navigation"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

interface RouteSegment {
  name: string
  href: string
}

export function BreadcrumbNav() {
  const pathname = usePathname()

  // Skip rendering breadcrumbs on the home page
  if (pathname === "/") {
    return null
  }

  // Generate breadcrumb segments from the current path
  const segments = pathname.split("/").filter(Boolean)

  // Map path segments to readable names
  const routeSegments: RouteSegment[] = segments.map((segment, index) => {
    const href = `/${segments.slice(0, index + 1).join("/")}`

    // Map segment IDs to readable names
    let name = segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")

    // Special case for KB
    if (segment === "kb") {
      name = "Knowledge Base"
    }

    return { name, href }
  })

  return (
    <Breadcrumb className="mb-4">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />

        {routeSegments.map((segment, index) => (
          <React.Fragment key={segment.href}>
            {index === routeSegments.length - 1 ? (
              <BreadcrumbItem>
                <BreadcrumbPage>{segment.name}</BreadcrumbPage>
              </BreadcrumbItem>
            ) : (
              <BreadcrumbItem>
                <BreadcrumbLink href={segment.href}>{segment.name}</BreadcrumbLink>
                <BreadcrumbSeparator />
              </BreadcrumbItem>
            )}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

