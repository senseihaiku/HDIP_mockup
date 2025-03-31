"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export function AutoRedirect() {
  const router = useRouter()

  useEffect(() => {
    // Add a small delay to ensure the page is fully loaded
    const timer = setTimeout(() => {
      router.push("/dashboard")
    }, 100)

    return () => clearTimeout(timer)
  }, [router])

  return null
}

