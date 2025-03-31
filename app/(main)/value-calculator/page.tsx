import type { Metadata } from "next"
import { DataValueCalculator } from "@/components/value-calculator/data-value-calculator"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"

export const metadata: Metadata = {
  title: "Data Value Calculator | HDIP",
  description: "Estimate the potential value of your health datasets",
}

export default function ValueCalculatorPage() {
  return (
    <div className="container mx-auto py-6 space-y-8">
      <BreadcrumbNav />

      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Data Value Calculator</h1>
          <p className="text-muted-foreground mt-2">
            Estimate the potential economic value of your health datasets based on key characteristics and market
            factors.
          </p>
        </div>

        <DataValueCalculator />

        <div className="mt-12 space-y-6">
          <h2 className="text-2xl font-semibold">Understanding Data Value</h2>
          <p>
            The value of health data is influenced by numerous factors including data quality, uniqueness, compliance
            with standards, and potential use cases. This calculator provides an estimate based on industry benchmarks
            and HDIP platform metrics.
          </p>

          <h3 className="text-xl font-semibold mt-6">Key Value Drivers</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Data Completeness:</strong> More complete datasets with fewer missing values are more valuable for
              analysis and research.
            </li>
            <li>
              <strong>Uniqueness:</strong> Rare or hard-to-obtain data types command premium value in the marketplace.
            </li>
            <li>
              <strong>FAIR Principles:</strong> Data that is Findable, Accessible, Interoperable, and Reusable has
              greater utility and therefore value.
            </li>
            <li>
              <strong>Compliance:</strong> Data that meets regulatory requirements (HIPAA, GDPR) reduces legal risks and
              increases usability.
            </li>
            <li>
              <strong>Consent:</strong> Having proper patient consent for data sharing opens more use cases and reduces
              legal barriers.
            </li>
          </ul>

          <div className="bg-primary/5 p-6 rounded-lg mt-8">
            <h3 className="text-xl font-semibold">Need Help Maximizing Your Data Value?</h3>
            <p className="mt-2">
              Our team can help you improve your data&apos;s quality, compliance, and market fit to maximize its value in the
              healthcare ecosystem. Schedule a consultation with our data specialists.
            </p>
            <div className="mt-4">
              <a href="/contact" className="text-primary font-medium hover:underline">
                Contact our team →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
