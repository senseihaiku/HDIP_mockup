import { CheckCircle2, Clock, XCircle } from "lucide-react"

interface TimelineStep {
  title: string
  description: string
  date: string
  status: "completed" | "in-progress" | "pending" | "rejected"
}

interface RequestTimelineProps {
  requestId: string
  steps: TimelineStep[]
}

export function RequestTimeline({ requestId, steps }: RequestTimelineProps) {
  const getStatusIcon = (status: TimelineStep["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-6 w-6 text-green-600" />
      case "in-progress":
        return <Clock className="h-6 w-6 text-blue-600 animate-pulse" />
      case "rejected":
        return <XCircle className="h-6 w-6 text-red-600" />
      default:
        return <div className="h-6 w-6 rounded-full border-2 border-muted-foreground/20" />
    }
  }

  return (
    <div className="space-y-2">
      <div className="text-sm text-muted-foreground mb-4">Request ID: {requestId}</div>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-muted-foreground/20" />

        {/* Timeline steps */}
        <div className="space-y-8">
          {steps.map((step, index) => (
            <div key={index} className="relative pl-10">
              {/* Status icon */}
              <div className="absolute left-0 top-0 flex items-center justify-center z-10 bg-background">
                {getStatusIcon(step.status)}
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-medium">{step.title}</h3>
                  <span className={`text-sm ${step.status === "pending" ? "text-muted-foreground" : "font-medium"}`}>
                    {step.date}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{step.description}</p>

                {step.status === "in-progress" && (
                  <div className="mt-2 text-xs text-blue-600">In progress - estimated completion in 2-3 days</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

