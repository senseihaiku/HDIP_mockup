"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DatasetCard } from "@/components/catalog/dataset-card"
import { DatasetFilters } from "@/components/catalog/dataset-filters"
import { Search, Plus, Filter } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function CatalogPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="flex flex-col p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Data Catalog</h1>
          <p className="text-muted-foreground">Browse and search available health datasets</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Dataset
        </Button>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <div className="md:w-1/4">
          {/* Mobile filter trigger */}
          <div className="md:hidden mb-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full">
                  <Filter className="mr-2 h-4 w-4" /> Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <div className="py-4">
                  <DatasetFilters />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop filters */}
          <div className="hidden md:block">
            <DatasetFilters />
          </div>
        </div>

        <div className="flex-1 space-y-4">
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search datasets..."
                className="pl-10 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="secondary" className="flex-1 sm:flex-none">
              <Search className="mr-2 h-4 w-4" /> Search
            </Button>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="w-full sm:w-auto">
              <TabsTrigger value="all" className="flex-1">
                All Datasets
              </TabsTrigger>
              <TabsTrigger value="recent" className="flex-1">
                Recently Added
              </TabsTrigger>
              <TabsTrigger value="popular" className="flex-1">
                Most Popular
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4 mt-4">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                <DatasetCard
                  id="DHA-EHR-001"
                  name="Real-world Cardiology EHR"
                  owner="AstraZeneca R&D"
                  fairScore={91}
                  tags={["cardiology", "ehr", "ai-ready"]}
                  summary="120k patients, longitudinal EHR 2010–2022"
                  accessLevel="controlled"
                  lastUpdated="2025-03-10"
                  trending={true}
                  aiReady={true}
                  popularity="high"
                />
                <DatasetCard
                  id="GEN-DB-042"
                  name="Genomic Markers Collection"
                  owner="Uppsala University"
                  fairScore={88}
                  tags={["genomics", "biomarkers", "research"]}
                  summary="Genomic markers from 5,000 individuals with rare diseases"
                  accessLevel="restricted"
                  lastUpdated="2025-02-28"
                  aiReady={true}
                />
                <DatasetCard
                  id="COVID-LT-023"
                  name="COVID-19 Long-term Effects"
                  owner="Karolinska Institute"
                  fairScore={95}
                  tags={["covid-19", "longitudinal", "symptoms"]}
                  summary="3-year follow-up data on 2,500 COVID-19 patients"
                  accessLevel="open"
                  lastUpdated="2025-03-05"
                  popularity="medium"
                />
                <DatasetCard
                  id="DIAB-REG-2023"
                  name="Diabetes Registry 2023"
                  owner="Swedish Diabetes Association"
                  fairScore={87}
                  tags={["diabetes", "registry", "treatments"]}
                  summary="National registry data on diabetes treatments and outcomes"
                  accessLevel="controlled"
                  lastUpdated="2025-01-15"
                />
              </div>
            </TabsContent>

            <TabsContent value="recent" className="space-y-4 mt-4">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                <DatasetCard
                  id="COVID-LT-023"
                  name="COVID-19 Long-term Effects"
                  owner="Karolinska Institute"
                  fairScore={95}
                  tags={["covid-19", "longitudinal", "symptoms"]}
                  summary="3-year follow-up data on 2,500 COVID-19 patients"
                  accessLevel="open"
                  lastUpdated="2025-03-05"
                  trending={true}
                />
                <DatasetCard
                  id="GEN-DB-042"
                  name="Genomic Markers Collection"
                  owner="Uppsala University"
                  fairScore={88}
                  tags={["genomics", "biomarkers", "research"]}
                  summary="Genomic markers from 5,000 individuals with rare diseases"
                  accessLevel="restricted"
                  lastUpdated="2025-02-28"
                />
              </div>
            </TabsContent>

            <TabsContent value="popular" className="space-y-4 mt-4">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                <DatasetCard
                  id="DHA-EHR-001"
                  name="Real-world Cardiology EHR"
                  owner="AstraZeneca R&D"
                  fairScore={91}
                  tags={["cardiology", "ehr", "ai-ready"]}
                  summary="120k patients, longitudinal EHR 2010–2022"
                  accessLevel="controlled"
                  lastUpdated="2025-03-10"
                  popularity="high"
                  aiReady={true}
                />
                <DatasetCard
                  id="DIAB-REG-2023"
                  name="Diabetes Registry 2023"
                  owner="Swedish Diabetes Association"
                  fairScore={87}
                  tags={["diabetes", "registry", "treatments"]}
                  summary="National registry data on diabetes treatments and outcomes"
                  accessLevel="controlled"
                  lastUpdated="2025-01-15"
                  popularity="medium"
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

