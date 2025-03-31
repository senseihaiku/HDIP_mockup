"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface RequestAccessFormProps {
  dataset: any
}

export function RequestAccessForm({ dataset }: RequestAccessFormProps) {
  const [step, setStep] = useState(1)
  const totalSteps = 4

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    }
  }

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Request Access to {dataset.name}</CardTitle>
        <CardDescription>
          Complete this form to request access to this dataset. Your request will be reviewed by the data access
          committee.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">
              Step {step} of {totalSteps}
            </span>
            <span className="text-sm text-muted-foreground">
              {step === 1 && "Project Information"}
              {step === 2 && "Data Usage Details"}
              {step === 3 && "Legal & Compliance"}
              {step === 4 && "Review & Submit"}
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary rounded-full h-2 transition-all"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {step === 1 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="project-title">Project Title</Label>
              <Input id="project-title" placeholder="Enter the title of your research project" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="project-description">Project Description</Label>
              <Textarea id="project-description" placeholder="Describe your research project and objectives" rows={4} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="institution">Institution</Label>
              <Input id="institution" placeholder="Your organization or institution" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="project-duration">Project Duration</Label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="start-date" className="text-xs">
                    Start Date
                  </Label>
                  <Input id="start-date" type="date" />
                </div>
                <div>
                  <Label htmlFor="end-date" className="text-xs">
                    End Date
                  </Label>
                  <Input id="end-date" type="date" />
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Data Usage Purpose</Label>
              <RadioGroup defaultValue="research">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="research" id="purpose-research" />
                  <Label htmlFor="purpose-research">Academic Research</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="commercial" id="purpose-commercial" />
                  <Label htmlFor="purpose-commercial">Commercial Research</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="clinical" id="purpose-clinical" />
                  <Label htmlFor="purpose-clinical">Clinical Application</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="purpose-other" />
                  <Label htmlFor="purpose-other">Other</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>Required Data Elements</Label>
              <div className="space-y-2">
                {dataset.dataElements.map((element: string, index: number) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Checkbox id={`element-${index}`} />
                    <Label htmlFor={`element-${index}`}>{element}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="data-format">Preferred Data Format</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  {dataset.formats.map((format: string, index: number) => (
                    <SelectItem key={index} value={format}>
                      {format}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="analysis-environment">Analysis Environment</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select environment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tre">Trusted Research Environment</SelectItem>
                  <SelectItem value="download">Data Download</SelectItem>
                  <SelectItem value="api">API Access</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Ethics Approval</Label>
              <RadioGroup defaultValue="yes">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="ethics-yes" />
                  <Label htmlFor="ethics-yes">Yes, I have ethics approval</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="pending" id="ethics-pending" />
                  <Label htmlFor="ethics-pending">Pending approval</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="ethics-no" />
                  <Label htmlFor="ethics-no">Not required for this project</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="ethics-reference">Ethics Reference Number (if applicable)</Label>
              <Input id="ethics-reference" placeholder="e.g., ERB-2023-0123" />
            </div>

            <Separator className="my-4" />

            <div className="space-y-2">
              <div className="flex items-start space-x-2">
                <Checkbox id="terms" />
                <div className="grid gap-1.5 leading-none">
                  <Label htmlFor="terms" className="text-sm font-normal">
                    I agree to the terms of the Data Use Agreement
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    By checking this box, you agree to use the data only for the stated purpose and comply with all
                    applicable regulations.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-start space-x-2">
                <Checkbox id="gdpr" />
                <div className="grid gap-1.5 leading-none">
                  <Label htmlFor="gdpr" className="text-sm font-normal">
                    I will comply with GDPR and other applicable data protection laws
                  </Label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-start space-x-2">
                <Checkbox id="publication" />
                <div className="grid gap-1.5 leading-none">
                  <Label htmlFor="publication" className="text-sm font-normal">
                    I will acknowledge the data source in any publications
                  </Label>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="project">
                <AccordionTrigger>Project Information</AccordionTrigger>
                <AccordionContent>
                  <dl className="space-y-2">
                    <div className="flex flex-col">
                      <dt className="text-sm font-medium">Project Title</dt>
                      <dd className="text-sm text-muted-foreground">Cardiovascular Risk Prediction Model</dd>
                    </div>
                    <div className="flex flex-col">
                      <dt className="text-sm font-medium">Institution</dt>
                      <dd className="text-sm text-muted-foreground">Uppsala University</dd>
                    </div>
                    <div className="flex flex-col">
                      <dt className="text-sm font-medium">Project Duration</dt>
                      <dd className="text-sm text-muted-foreground">2025-04-01 to 2026-03-31</dd>
                    </div>
                  </dl>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="usage">
                <AccordionTrigger>Data Usage Details</AccordionTrigger>
                <AccordionContent>
                  <dl className="space-y-2">
                    <div className="flex flex-col">
                      <dt className="text-sm font-medium">Purpose</dt>
                      <dd className="text-sm text-muted-foreground">Academic Research</dd>
                    </div>
                    <div className="flex flex-col">
                      <dt className="text-sm font-medium">Data Format</dt>
                      <dd className="text-sm text-muted-foreground">OMOP Parquet</dd>
                    </div>
                    <div className="flex flex-col">
                      <dt className="text-sm font-medium">Analysis Environment</dt>
                      <dd className="text-sm text-muted-foreground">Trusted Research Environment</dd>
                    </div>
                  </dl>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="legal">
                <AccordionTrigger>Legal & Compliance</AccordionTrigger>
                <AccordionContent>
                  <dl className="space-y-2">
                    <div className="flex flex-col">
                      <dt className="text-sm font-medium">Ethics Approval</dt>
                      <dd className="text-sm text-muted-foreground">Yes, ERB-2023-0456</dd>
                    </div>
                    <div className="flex flex-col">
                      <dt className="text-sm font-medium">Agreements</dt>
                      <dd className="text-sm text-muted-foreground">
                        <ul className="list-disc list-inside">
                          <li>Data Use Agreement</li>
                          <li>GDPR Compliance</li>
                          <li>Publication Acknowledgment</li>
                        </ul>
                      </dd>
                    </div>
                  </dl>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="p-4 bg-muted rounded-md">
              <p className="text-sm">
                Your request will be reviewed by the data access committee for {dataset.owner}. You will receive a
                notification when your request has been processed. This typically takes 5-10 business days.
              </p>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {step > 1 ? (
          <Button variant="outline" onClick={prevStep}>
            Previous
          </Button>
        ) : (
          <Button variant="outline" disabled>
            Previous
          </Button>
        )}

        {step < totalSteps ? <Button onClick={nextStep}>Next</Button> : <Button>Submit Request</Button>}
      </CardFooter>
    </Card>
  )
}

