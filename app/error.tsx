"use client"

import { useEffect } from "react"
import Link from "next/link"
import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <Card className="max-w-md w-full">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-500" />
            <CardTitle>Something went wrong</CardTitle>
          </div>
          <CardDescription>We encountered an error while trying to process your request.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">
            <p>Error: {error.message || "An unexpected error occurred"}</p>
            {error.digest && <p className="mt-2 font-mono text-xs">Reference: {error.digest}</p>}
          </div>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/">Return Home</Link>
          </Button>
          <Button onClick={reset}>Try Again</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

