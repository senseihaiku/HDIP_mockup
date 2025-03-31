"use client"

import { Button } from "@/components/ui/button"
import { Search, Upload } from "lucide-react"

interface ModeToggleProps {
  currentMode: "discover" | "contribute"
  onModeChange: (mode: "discover" | "contribute") => void
}

export function ModeToggle({ currentMode, onModeChange }: ModeToggleProps) {
  return (
    <div className="flex space-x-2">
      <Button
        variant={currentMode === "discover" ? "default" : "outline"}
        size="sm"
        onClick={() => onModeChange("discover")}
      >
        <Search className="h-4 w-4 mr-2" />
        Discover
      </Button>
      <Button
        variant={currentMode === "contribute" ? "default" : "outline"}
        size="sm"
        onClick={() => onModeChange("contribute")}
      >
        <Upload className="h-4 w-4 mr-2" />
        Contribute
      </Button>
    </div>
  )
}

