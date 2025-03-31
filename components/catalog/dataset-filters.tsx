"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

// Add this debounce utility function at the top of your component
function debounce(fn: Function, ms = 300) {
  let timeoutId: ReturnType<typeof setTimeout>
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn.apply(this, args), ms)
  }
}

export function DatasetFilters() {
  // Replace the existing fairScoreRange state and slider implementation with this:
  const [fairScoreMin, setFairScoreMin] = useState(60)
  const [fairScoreMax, setFairScoreMax] = useState(100)
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  // Debounced update function to reduce state changes
  const debouncedUpdate = useCallback(
    debounce((min: number, max: number) => {
      console.log(`Range updated: ${min}-${max}`)
      // Here you would typically update filters or fetch data
    }, 300),
    [],
  )

  // Update both min and max values when they change
  useEffect(() => {
    debouncedUpdate(fairScoreMin, fairScoreMax)
  }, [fairScoreMin, fairScoreMax, debouncedUpdate])

  const dataTypes = [
    { id: "ehr", label: "Electronic Health Records" },
    { id: "genomics", label: "Genomic Data" },
    { id: "imaging", label: "Medical Imaging" },
    { id: "registry", label: "Registry Data" },
    { id: "survey", label: "Survey Data" },
    { id: "clinical-trial", label: "Clinical Trial Data" },
  ]

  const accessLevels = [
    { id: "open", label: "Open Access" },
    { id: "controlled", label: "Controlled Access" },
    { id: "restricted", label: "Restricted Access" },
  ]

  const standards = [
    { id: "omop", label: "OMOP" },
    { id: "fhir", label: "FHIR" },
    { id: "snomed", label: "SNOMED CT" },
    { id: "loinc", label: "LOINC" },
    { id: "dicom", label: "DICOM" },
  ]

  const handleFilterToggle = (id: string) => {
    setActiveFilters((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-sm font-medium">FAIR Score</h3>
          <div className="px-2">
            <div className="py-4">
              <div className="relative h-2 bg-muted rounded-full">
                {/* Track fill between handles */}
                <div
                  className="absolute h-full bg-primary rounded-full"
                  style={{
                    left: `${fairScoreMin}%`,
                    right: `${100 - fairScoreMax}%`,
                  }}
                />

                {/* Min handle - simplified event handling */}
                <div
                  role="slider"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={fairScoreMin}
                  tabIndex={0}
                  className="absolute w-5 h-5 bg-background border-2 border-primary rounded-full -mt-1.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  style={{ left: `${fairScoreMin}%` }}
                  onMouseDown={(e) => {
                    e.preventDefault()

                    const slider = e.currentTarget.parentElement
                    if (!slider) return

                    const rect = slider.getBoundingClientRect()
                    const width = rect.width

                    const handleMouseMove = (moveEvent: MouseEvent) => {
                      const offset = moveEvent.clientX - rect.left
                      const newValue = Math.max(0, Math.min(fairScoreMax - 5, Math.round((offset / width) * 100)))
                      if (newValue !== fairScoreMin) {
                        setFairScoreMin(newValue)
                      }
                    }

                    const handleMouseUp = () => {
                      document.removeEventListener("mousemove", handleMouseMove)
                      document.removeEventListener("mouseup", handleMouseUp)
                    }

                    document.addEventListener("mousemove", handleMouseMove)
                    document.addEventListener("mouseup", handleMouseUp)
                  }}
                />

                {/* Max handle - simplified event handling */}
                <div
                  role="slider"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={fairScoreMax}
                  tabIndex={0}
                  className="absolute w-5 h-5 bg-background border-2 border-primary rounded-full -mt-1.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  style={{ left: `${fairScoreMax}%` }}
                  onMouseDown={(e) => {
                    e.preventDefault()

                    const slider = e.currentTarget.parentElement
                    if (!slider) return

                    const rect = slider.getBoundingClientRect()
                    const width = rect.width

                    const handleMouseMove = (moveEvent: MouseEvent) => {
                      const offset = moveEvent.clientX - rect.left
                      const newValue = Math.max(fairScoreMin + 5, Math.min(100, Math.round((offset / width) * 100)))
                      if (newValue !== fairScoreMax) {
                        setFairScoreMax(newValue)
                      }
                    }

                    const handleMouseUp = () => {
                      document.removeEventListener("mousemove", handleMouseMove)
                      document.removeEventListener("mouseup", handleMouseUp)
                    }

                    document.addEventListener("mousemove", handleMouseMove)
                    document.addEventListener("mouseup", handleMouseUp)
                  }}
                />
              </div>

              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                <span>{fairScoreMin}</span>
                <span>{fairScoreMax}</span>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-sm font-medium">Data Type</h3>
          <div className="space-y-2">
            {dataTypes.map((type) => (
              <div key={type.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`type-${type.id}`}
                  checked={activeFilters.includes(type.id)}
                  onCheckedChange={() => handleFilterToggle(type.id)}
                />
                <Label htmlFor={`type-${type.id}`} className="text-sm font-normal cursor-pointer">
                  {type.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-sm font-medium">Access Level</h3>
          <div className="space-y-2">
            {accessLevels.map((level) => (
              <div key={level.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`level-${level.id}`}
                  checked={activeFilters.includes(level.id)}
                  onCheckedChange={() => handleFilterToggle(level.id)}
                />
                <Label htmlFor={`level-${level.id}`} className="text-sm font-normal cursor-pointer">
                  {level.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-sm font-medium">Standards</h3>
          <div className="space-y-2">
            {standards.map((standard) => (
              <div key={standard.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`standard-${standard.id}`}
                  checked={activeFilters.includes(standard.id)}
                  onCheckedChange={() => handleFilterToggle(standard.id)}
                />
                <Label htmlFor={`standard-${standard.id}`} className="text-sm font-normal cursor-pointer">
                  {standard.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-2 flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => setActiveFilters([])}
            disabled={activeFilters.length === 0}
          >
            Reset
          </Button>
          <Button size="sm" className="w-full">
            Apply
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

