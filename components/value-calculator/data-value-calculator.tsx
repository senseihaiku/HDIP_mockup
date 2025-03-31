"use client"

import { useState, useEffect } from "react"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { InfoIcon as InfoCircle, Download } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Switch } from "@/components/ui/switch"

export function DataValueCalculator() {
  // State for all calculator inputs
  const [dataSize, setDataSize] = useState(100) // in GB
  const [dataCompleteness, setDataCompleteness] = useState(70) // percentage
  const [dataUniqueness, setDataUniqueness] = useState(50) // percentage
  const [dataType, setDataType] = useState("clinical")
  const [fairScore, setFairScore] = useState(65) // percentage
  const [complianceLevel, setComplianceLevel] = useState("hipaa")
  const [hasConsent, setHasConsent] = useState(true)
  const [timeSpan, setTimeSpan] = useState(3) // years
  const [potentialUseCase, setPotentialUseCase] = useState("research")

  // Calculated value
  const [estimatedValue, setEstimatedValue] = useState(0)
  const [valueRange, setValueRange] = useState({ min: 0, max: 0 })
  const [valuePerRecord, setValuePerRecord] = useState(0)

  // Estimated records based on data size (simplified calculation)
  const estimatedRecords = Math.round(dataSize * 1000) // Rough estimate: 1GB = 1000 records

  // Calculate the data value whenever inputs change
  useEffect(() => {
    // Base value calculation (simplified algorithm)
    const baseValue = dataSize * 100 // $100 per GB as base value

    // Multipliers based on different factors
    const completenessMultiplier = dataCompleteness / 50 // 100% completeness = 2x multiplier
    const uniquenessMultiplier = 0.5 + dataUniqueness / 100 // 100% uniqueness = 1.5x multiplier
    const timeSpanMultiplier = 0.8 + timeSpan / 10 // 10 years = 1.8x multiplier

    // Type multipliers
    const typeMultipliers = {
      clinical: 1.5,
      genomic: 2.0,
      imaging: 1.8,
      claims: 1.2,
      survey: 0.8,
      wearable: 1.3,
    }

    // Use case multipliers
    const useCaseMultipliers = {
      research: 1.2,
      clinical: 1.5,
      commercial: 2.0,
      educational: 0.7,
      policy: 0.9,
    }

    // Compliance multipliers
    const complianceMultipliers = {
      hipaa: 1.0,
      gdpr: 1.1,
      both: 1.3,
      none: 0.5,
    }

    // FAIR score impact (0.5 to 1.5 multiplier)
    const fairMultiplier = 0.5 + fairScore / 100

    // Consent impact
    const consentMultiplier = hasConsent ? 1.2 : 0.6

    // Calculate total value
    let calculatedValue =
      baseValue *
      completenessMultiplier *
      uniquenessMultiplier *
      timeSpanMultiplier *
      typeMultipliers[dataType as keyof typeof typeMultipliers] *
      useCaseMultipliers[potentialUseCase as keyof typeof useCaseMultipliers] *
      complianceMultipliers[complianceLevel as keyof typeof complianceMultipliers] *
      fairMultiplier *
      consentMultiplier

    // Round to nearest thousand
    calculatedValue = Math.round(calculatedValue / 1000) * 1000

    // Set value range (±20%)
    const minValue = Math.round(calculatedValue * 0.8)
    const maxValue = Math.round(calculatedValue * 1.2)

    // Calculate per-record value
    const perRecordValue = calculatedValue / estimatedRecords

    setEstimatedValue(calculatedValue)
    setValueRange({ min: minValue, max: maxValue })
    setValuePerRecord(perRecordValue)
  }, [
    dataSize,
    dataCompleteness,
    dataUniqueness,
    dataType,
    fairScore,
    complianceLevel,
    hasConsent,
    timeSpan,
    potentialUseCase,
    estimatedRecords,
  ])

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="shadow-lg">
        <CardHeader className="bg-primary/5">
          <CardTitle className="text-2xl">Health Data Value Calculator</CardTitle>
          <CardDescription>
            Estimate the potential value of your health dataset based on key characteristics
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 grid gap-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left column - inputs */}
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="data-size">
                    Dataset Size (GB)
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <InfoCircle className="h-4 w-4 ml-1 inline text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="w-80">The total size of your dataset in gigabytes</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Label>
                  <Input
                    id="data-size"
                    type="number"
                    value={dataSize}
                    onChange={(e) => setDataSize(Number(e.target.value))}
                    className="w-20 text-right"
                  />
                </div>
                <Slider
                  value={[dataSize]}
                  min={1}
                  max={1000}
                  step={1}
                  onValueChange={(value) => setDataSize(value[0])}
                />
                <p className="text-sm text-muted-foreground">Estimated records: {estimatedRecords.toLocaleString()}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="data-completeness">
                    Data Completeness
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <InfoCircle className="h-4 w-4 ml-1 inline text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="w-80">How complete your dataset is (percentage of fields populated)</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Label>
                  <span>{dataCompleteness}%</span>
                </div>
                <Slider
                  value={[dataCompleteness]}
                  min={10}
                  max={100}
                  step={5}
                  onValueChange={(value) => setDataCompleteness(value[0])}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="data-uniqueness">
                    Data Uniqueness
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <InfoCircle className="h-4 w-4 ml-1 inline text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="w-80">How unique or rare your dataset is compared to others available</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Label>
                  <span>{dataUniqueness}%</span>
                </div>
                <Slider
                  value={[dataUniqueness]}
                  min={10}
                  max={100}
                  step={5}
                  onValueChange={(value) => setDataUniqueness(value[0])}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="data-type">
                  Primary Data Type
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <InfoCircle className="h-4 w-4 ml-1 inline text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-80">The main type of health data in your dataset</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <Select value={dataType} onValueChange={setDataType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select data type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="clinical">Clinical/EHR Data</SelectItem>
                    <SelectItem value="genomic">Genomic/Molecular Data</SelectItem>
                    <SelectItem value="imaging">Medical Imaging</SelectItem>
                    <SelectItem value="claims">Claims/Administrative</SelectItem>
                    <SelectItem value="survey">Survey/Patient Reported</SelectItem>
                    <SelectItem value="wearable">Wearable/Sensor Data</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="fair-score">
                    FAIR Score
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <InfoCircle className="h-4 w-4 ml-1 inline text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="w-80">
                            How well your data meets FAIR principles (Findable, Accessible, Interoperable, Reusable)
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Label>
                  <span>{fairScore}%</span>
                </div>
                <Slider
                  value={[fairScore]}
                  min={10}
                  max={100}
                  step={5}
                  onValueChange={(value) => setFairScore(value[0])}
                />
              </div>
            </div>

            {/* Right column - more inputs */}
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="compliance-level">
                  Compliance Framework
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <InfoCircle className="h-4 w-4 ml-1 inline text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-80">The regulatory frameworks your data complies with</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <Select value={complianceLevel} onValueChange={setComplianceLevel}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select compliance level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hipaa">HIPAA Compliant</SelectItem>
                    <SelectItem value="gdpr">GDPR Compliant</SelectItem>
                    <SelectItem value="both">HIPAA & GDPR Compliant</SelectItem>
                    <SelectItem value="none">No Specific Compliance</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="time-span">
                    Time Span (Years)
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <InfoCircle className="h-4 w-4 ml-1 inline text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="w-80">The time period covered by your dataset</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Label>
                  <Input
                    id="time-span"
                    type="number"
                    value={timeSpan}
                    onChange={(e) => setTimeSpan(Number(e.target.value))}
                    className="w-20 text-right"
                  />
                </div>
                <Slider value={[timeSpan]} min={1} max={20} step={1} onValueChange={(value) => setTimeSpan(value[0])} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="potential-use-case">
                  Primary Use Case
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <InfoCircle className="h-4 w-4 ml-1 inline text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-80">The main intended use for this dataset</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <Select value={potentialUseCase} onValueChange={setPotentialUseCase}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select primary use case" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="research">Academic Research</SelectItem>
                    <SelectItem value="clinical">Clinical Decision Support</SelectItem>
                    <SelectItem value="commercial">Commercial/Industry</SelectItem>
                    <SelectItem value="educational">Educational</SelectItem>
                    <SelectItem value="policy">Policy/Public Health</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 pt-2">
                <div className="flex items-center space-x-2">
                  <Switch id="consent" checked={hasConsent} onCheckedChange={setHasConsent} />
                  <Label htmlFor="consent" className="flex items-center">
                    Patient Consent Available
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <InfoCircle className="h-4 w-4 ml-1 inline text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="w-80">Whether you have explicit patient consent for data sharing</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Label>
                </div>
              </div>

              {/* Value Results */}
              <Card className="mt-4 bg-primary/5 border-primary/20">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <h3 className="text-lg font-medium">Estimated Data Value</h3>
                    <div className="mt-2 text-4xl font-bold text-primary">${estimatedValue.toLocaleString()}</div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Range: ${valueRange.min.toLocaleString()} - ${valueRange.max.toLocaleString()}
                    </p>
                    <div className="mt-4 text-sm">
                      <div className="flex justify-between">
                        <span>Value per record:</span>
                        <span className="font-medium">${valuePerRecord.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="bg-muted/50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">About This Calculator</h3>
            <p className="text-sm text-muted-foreground">
              This calculator provides an estimate of your health dataset's potential value based on industry benchmarks
              and HDIP platform metrics. Actual value may vary based on market conditions, specific use cases, and data
              quality factors not captured here. Use this as a starting point for understanding your data's worth in the
              healthcare ecosystem.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t p-4">
          <Button variant="outline">Reset Values</Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Download Report
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

