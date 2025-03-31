import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FairScoreBadge } from "@/components/ui/fair-score-badge"
import { Calendar, User, Lock, Eye } from "lucide-react"

interface DatasetCardProps {
  id: string
  name: string
  owner: string
  fairScore: number
  tags: string[]
  summary: string
  accessLevel: "open" | "controlled" | "restricted"
  lastUpdated: string
  trending?: boolean
  aiReady?: boolean
  popularity?: "low" | "medium" | "high"
}

export function DatasetCard({
  id,
  name,
  owner,
  fairScore,
  tags,
  summary,
  accessLevel,
  lastUpdated,
  trending = false,
  aiReady = false,
  popularity = "low",
}: DatasetCardProps) {
  const getAccessLevelBadge = (level: string) => {
    switch (level) {
      case "open":
        return (
          <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 flex items-center gap-1 dark:bg-emerald-950/30 dark:text-emerald-300 dark:hover:bg-emerald-900/50">
            <Eye className="h-3 w-3" />
            <span>Open</span>
          </Badge>
        )
      case "controlled":
        return (
          <Badge className="bg-teal-100 text-teal-800 hover:bg-teal-200 flex items-center gap-1 dark:bg-teal-950/30 dark:text-teal-300 dark:hover:bg-teal-900/50">
            <Lock className="h-3 w-3" />
            <span>Controlled</span>
          </Badge>
        )
      case "restricted":
        return (
          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 flex items-center gap-1 dark:bg-amber-950/30 dark:text-amber-300 dark:hover:bg-amber-900/50">
            <Lock className="h-3 w-3" />
            <span>Restricted</span>
          </Badge>
        )
      default:
        return null
    }
  }

  const getPopularityIndicator = () => {
    if (popularity === "high") {
      return (
        <Badge
          variant="outline"
          className="bg-violet-50 text-violet-800 border-violet-200 dark:bg-violet-950/30 dark:text-violet-300 dark:border-violet-800"
        >
          High Demand
        </Badge>
      )
    }
    return null
  }

  const getAiReadyBadge = () => {
    if (aiReady) {
      return (
        <Badge
          variant="outline"
          className="bg-indigo-50 text-indigo-800 border-indigo-200 dark:bg-indigo-950/30 dark:text-indigo-300 dark:border-indigo-800"
        >
          AI-Ready
        </Badge>
      )
    }
    return null
  }

  const getTrendingBadge = () => {
    if (trending) {
      return (
        <Badge className="bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-950/30 dark:text-rose-300 dark:border-rose-800">
          Trending
        </Badge>
      )
    }
    return null
  }

  return (
    <Card className="h-full hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl">{name}</CardTitle>
            <CardDescription className="flex items-center gap-1 mt-1">
              <User className="h-3 w-3" /> {owner}
            </CardDescription>
          </div>
          <FairScoreBadge score={fairScore} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
            {getAccessLevelBadge(accessLevel)}
            {getPopularityIndicator()}
            {getAiReadyBadge()}
            {getTrendingBadge()}
          </div>
          <p className="text-sm text-muted-foreground">{summary}</p>
          <div className="flex items-center text-xs text-muted-foreground">
            <Calendar className="h-3 w-3 mr-1" /> Last updated: {lastUpdated}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <Button variant="outline" size="sm" asChild>
          <Link href={`/catalog/${id}`}>View Details</Link>
        </Button>
        <Button size="sm">Request Access</Button>
      </CardFooter>
    </Card>
  )
}

