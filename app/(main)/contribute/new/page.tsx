"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

export default function NewContributionPage() {
  const [step, setStep] = useState(1)

  return (
    <div className="flex flex-col p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Contribute New Dataset</h1>
        <p className="text-muted-foreground">Share your valuable health data with the community</p>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div
            className={`rounded-full h-8 w-8 flex items-center justify-center ${step >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
          >
            1
          </div>
          <div className={`h-1 w-12 ${step >= 2 ? "bg-primary" : "bg-muted"}`}></div>
          <div
            className={`rounded-full h-8 w-8 flex items-center justify-center ${step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
          >
            2
          </div>
          <div className={`h-1 w-12 ${step >= 3 ? "bg-primary" : "bg-muted"}`}></div>
          <div
            className={`rounded-full h-8 w-8 flex items-center justify-center ${step >= 3 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
          >
            3
          </div>
          <div className={`h-1 w-12 ${step >= 4 ? "bg-primary" : "bg-muted"}`}></div>
          <div
            className={`rounded-full h-8 w-8 flex items-center justify-center ${step >= 4 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
          >
            4
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {step === 1 && "Basic Information"}
            {step === 2 && "Metadata & Documentation"}
            {step === 3 && "Access Control"}
            {step === 4 && "Review & Submit"}
          </CardTitle>
          <CardDescription>
            {step === 1 && "Provide basic details about your dataset"}
            {step === 2 && "Add metadata to make your dataset FAIR-compliant"}
            {step === 3 && "Set access permissions and conditions"}
            {step === 4 && "Review all information before submission"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {step === 1 && (
            <>
              <div className="space-y-2">
                <Label htmlFor="title">Dataset Title</Label>
                <Input id="title" placeholder="Enter a descriptive title" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the dataset, its contents, and potential uses"
                  rows={4}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="clinical">Clinical Data</SelectItem>
                      <SelectItem value="genomic">Genomic Data</SelectItem>
                      <SelectItem value="imaging">Medical Imaging</SelectItem>
                      <SelectItem value="trials">Clinical Trials</SelectItem>
                      <SelectItem value="public">Public Health</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="source">Data Source</Label>
                  <Input id="source" placeholder="e.g., Hospital EHR, Research Study" />
                </div>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="space-y-2">
                <Label htmlFor="keywords">Keywords (comma-separated)</Label>
                <Input id="keywords" placeholder="e.g., cardiology, genomics, diabetes" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="methodology">Methodology</Label>
                <Textarea id="methodology" placeholder="Describe how the data was collected" rows={3} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="timeframe">Time Frame</Label>
                  <Input id="timeframe" placeholder="e.g., 2020-2023" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="size">Dataset Size</Label>
                  <Input id="size" placeholder="e.g., 500 patients, 10GB" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="documentation">Documentation URL</Label>
                <Input id="documentation" placeholder="Link to additional documentation" />
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div className="space-y-2">
                <Label>Access Level</Label>
                <Select defaultValue="restricted">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="open">Open Access</SelectItem>
                    <SelectItem value="restricted">Restricted Access</SelectItem>
                    <SelectItem value="controlled">Controlled Access</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Access Requirements</Label>
                <Textarea placeholder="Describe who can access this data and under what conditions" rows={3} />
              </div>
              <div className="space-y-2">
                <Label>License</Label>
                <Select defaultValue="cc-by">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cc-by">Creative Commons Attribution (CC BY)</SelectItem>
                    <SelectItem value="cc-by-sa">CC Attribution-ShareAlike (CC BY-SA)</SelectItem>
                    <SelectItem value="cc-by-nc">CC Attribution-NonCommercial (CC BY-NC)</SelectItem>
                    <SelectItem value="custom">Custom License</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-start space-x-2 pt-2">
                <Checkbox id="consent" />
                <div className="grid gap-1.5 leading-none">
                  <Label htmlFor="consent" className="text-sm font-medium leading-none">
                    I confirm that I have the right to share this data and that all necessary consents have been
                    obtained
                  </Label>
                </div>
              </div>
            </>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <div className="border rounded-md p-4 space-y-2">
                <h3 className="font-medium">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Title:</span> Sample Clinical Dataset
                  </div>
                  <div>
                    <span className="text-muted-foreground">Category:</span> Clinical Data
                  </div>
                  <div className="md:col-span-2">
                    <span className="text-muted-foreground">Description:</span> This dataset contains anonymized
                    clinical data...
                  </div>
                </div>
              </div>

              <div className="border rounded-md p-4 space-y-2">
                <h3 className="font-medium">Metadata & Documentation</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Keywords:</span> cardiology, clinical, research
                  </div>
                  <div>
                    <span className="text-muted-foreground">Time Frame:</span> 2020-2023
                  </div>
                  <div>
                    <span className="text-muted-foreground">Dataset Size:</span> 500 patients
                  </div>
                </div>
              </div>

              <div className="border rounded-md p-4 space-y-2">
                <h3 className="font-medium">Access Control</h3>
                <div className="grid grid-cols-1 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Access Level:</span> Restricted Access
                  </div>
                  <div>
                    <span className="text-muted-foreground">License:</span> Creative Commons Attribution (CC BY)
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => setStep(Math.max(1, step - 1))} disabled={step === 1}>
            Previous
          </Button>
          <Button
            onClick={() => {
              if (step < 4) {
                setStep(step + 1)
              } else {
                // Submit form
                console.log("Form submitted")
              }
            }}
          >
            {step < 4 ? "Next" : "Submit Dataset"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

