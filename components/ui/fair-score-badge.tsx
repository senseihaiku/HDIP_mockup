import { cn } from "@/lib/utils"

interface FairScoreBadgeProps {
  score: number
  size?: "sm" | "md" | "lg"
  showLabel?: boolean
  showAnimation?: boolean
  className?: string
}

export function FairScoreBadge({
  score,
  size = "md",
  showLabel = false,
  showAnimation = false,
  className,
}: FairScoreBadgeProps) {
  // Determine color based on score
  const getColor = () => {
    if (score >= 90)
      return "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-800"
    if (score >= 80)
      return "bg-teal-100 text-teal-800 border-teal-200 dark:bg-teal-950/30 dark:text-teal-300 dark:border-teal-800"
    if (score >= 70)
      return "bg-violet-100 text-violet-800 border-violet-200 dark:bg-violet-950/30 dark:text-violet-300 dark:border-violet-800"
    if (score >= 60)
      return "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-800"
    return "bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-950/30 dark:text-rose-300 dark:border-rose-800"
  }

  // Determine size classes
  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "text-xs px-1.5 py-0.5"
      case "lg":
        return "text-base px-3 py-1.5"
      default:
        return "text-sm px-2 py-1"
    }
  }

  return (
    <div
      className={cn("flex items-center gap-1 rounded-md border font-medium", getColor(), getSizeClasses(), className)}
      aria-label={`FAIR score: ${score}`}
    >
      {showLabel && <span className="mr-1 font-medium">FAIR:</span>}
      <span className="font-bold">{score}</span>
    </div>
  )
}

