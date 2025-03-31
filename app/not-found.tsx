import Link from "next/link"
import { FileQuestion } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <Card className="max-w-md w-full">
        <CardHeader>
          <div className="flex flex-col items-center text-center">
            <FileQuestion className="h-12 w-12 text-muted-foreground mb-2" />
            <CardTitle className="text-2xl">Page Not Found</CardTitle>
            <CardDescription>The page you&apos;re looking for doesn&apos;t exist or has been moved.</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-sm text-muted-foreground">
            Check the URL or navigate back to the homepage to find what you&apos;re looking for.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild>
            <Link href="/">Return to Home</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
