"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, ArrowRight } from "lucide-react"

export default function TourPage() {
  const [step, setStep] = useState(1)
  const totalSteps = 3

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
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <Card className="w-full max-w-4xl">
          <CardContent className="p-6">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">
                  Step {step} of {totalSteps}
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
              <div className="space-y-6 text-center">
                <h2 className="text-3xl font-bold mb-4">Welcome to the Health Data Innovation Platform</h2>
                <p className="text-lg mb-4">
                  We&apos;re building a community where health data can be securely shared, discovered, and utilized to drive
                  innovation.
                </p>
                <p className="text-muted-foreground mb-6">
                  This quick tour will show you how the platform works and how you can get the most out of it.
                </p>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 text-center">
                <h2 className="text-2xl font-bold mb-4">Discover and Share Health Data</h2>
                <p className="mb-4">
                  Our platform makes it easy to find the health data you need and share your own datasets with the
                  research community.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Discover Datasets</h3>
                    <p className="text-sm text-muted-foreground">
                      Search, filter, and browse high-quality health datasets from trusted sources.
                    </p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Share Your Data</h3>
                    <p className="text-sm text-muted-foreground">
                      Contribute your datasets and track their impact on research and innovation.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6 text-center">
                <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
                <p className="text-lg mb-8 max-w-2xl mx-auto">
                  You&apos;re all set to explore the Health Data Innovation Platform. Choose how you&apos;d like to begin:
                </p>

                <div className="flex flex-col md:flex-row gap-4 justify-center">
                  <Link href="/dashboard?mode=discover">
                    <Button size="lg">Explore Datasets</Button>
                  </Link>

                  <Link href="/dashboard?mode=contribute">
                    <Button size="lg" variant="outline">
                      Share Your Data
                    </Button>
                  </Link>
                </div>
              </div>
            )}

            <div className="flex justify-between mt-8">
              {step > 1 ? (
                <Button variant="outline" onClick={prevStep}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                </Button>
              ) : (
                <Button variant="outline" asChild>
                  <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
                  </Link>
                </Button>
              )}

              {step < totalSteps ? (
                <Button onClick={nextStep}>
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Link href="/dashboard">
                  <Button>
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
