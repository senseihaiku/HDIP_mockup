"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ConsentTracker } from "@/components/governance/consent-tracker"
import { AgreementsList } from "@/components/governance/agreements-list"
import { AuditLogs } from "@/components/governance/audit-logs"

export default function GovernancePage() {
  return (
    <div className="flex flex-col p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Data Governance</h1>
        <p className="text-muted-foreground">Manage consents, agreements, and audit logs</p>
      </div>

      <Tabs defaultValue="consents" className="w-full">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="consents" className="flex-1">
            Consent Management
          </TabsTrigger>
          <TabsTrigger value="agreements" className="flex-1">
            Data Agreements
          </TabsTrigger>
          <TabsTrigger value="audit" className="flex-1">
            Audit Logs
          </TabsTrigger>
        </TabsList>

        <TabsContent value="consents" className="space-y-4 mt-4">
          <ConsentTracker />
        </TabsContent>

        <TabsContent value="agreements" className="space-y-4 mt-4">
          <AgreementsList />
        </TabsContent>

        <TabsContent value="audit" className="space-y-4 mt-4">
          <AuditLogs />
        </TabsContent>
      </Tabs>
    </div>
  )
}

