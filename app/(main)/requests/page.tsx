"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RequestsList } from "@/components/requests/requests-list"

export default function RequestsPage() {
  return (
    <div className="flex flex-col p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Access Requests</h1>
        <p className="text-muted-foreground">Manage your data access requests</p>
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="pending" className="flex-1">
            Pending (3)
          </TabsTrigger>
          <TabsTrigger value="approved" className="flex-1">
            Approved
          </TabsTrigger>
          <TabsTrigger value="rejected" className="flex-1">
            Rejected
          </TabsTrigger>
          <TabsTrigger value="all" className="flex-1">
            All Requests
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4 mt-4">
          <RequestsList status="pending" />
        </TabsContent>

        <TabsContent value="approved" className="space-y-4 mt-4">
          <RequestsList status="approved" />
        </TabsContent>

        <TabsContent value="rejected" className="space-y-4 mt-4">
          <RequestsList status="rejected" />
        </TabsContent>

        <TabsContent value="all" className="space-y-4 mt-4">
          <RequestsList />
        </TabsContent>
      </Tabs>
    </div>
  )
}

/*
Original data removed as RequestsList uses internal data:
              {
                id: "REQ-2023-001",
                datasetId: "DHA-EHR-001",
                datasetName: "Real-world Cardiology EHR",
                requestDate: "2025-03-15",
                status: "pending",
                requestor: "Dr. Jane Smith",
                organization: "Uppsala University Hospital",
                purpose: "Research on heart failure prediction models",
              },
              {
                id: "REQ-2023-002",
                datasetId: "GEN-DB-042",
                datasetName: "Genomic Markers Collection",
                requestDate: "2025-03-10",
                status: "pending",
                requestor: "Dr. Michael Johnson",
                organization: "Karolinska Institute",
                purpose: "Genetic analysis of rare diseases",
              },
              {
                id: "REQ-2023-003",
                datasetId: "COVID-LT-023",
                datasetName: "COVID-19 Long-term Effects",
                requestDate: "2025-03-05",
                status: "pending",
                requestor: "Dr. Sarah Williams",
                organization: "Stockholm University",
                purpose: "Long COVID research study",
              },
/*
Original data removed as RequestsList uses internal data:
              {
                id: "REQ-2023-004",
                datasetId: "DIAB-REG-2023",
                datasetName: "Diabetes Registry 2023",
                requestDate: "2025-02-20",
                approvalDate: "2025-02-25",
                status: "approved",
                requestor: "Dr. Robert Brown",
                organization: "Gothenburg University",
                purpose: "Diabetes treatment effectiveness study",
              },
/*
Original data removed as RequestsList uses internal data:
              {
                id: "REQ-2023-005",
                datasetId: "DHA-EHR-001",
                datasetName: "Real-world Cardiology EHR",
                requestDate: "2025-02-15",
                rejectionDate: "2025-02-18",
                status: "rejected",
                requestor: "Dr. Emily Davis",
                organization: "Commercial Research Inc.",
                purpose: "Proprietary algorithm development",
                rejectionReason: "Commercial use not permitted under current data sharing agreement",
              },
/*
Original data removed as RequestsList uses internal data:
              {
                id: "REQ-2023-001",
                datasetId: "DHA-EHR-001",
                datasetName: "Real-world Cardiology EHR",
                requestDate: "2025-03-15",
                status: "pending",
                requestor: "Dr. Jane Smith",
                organization: "Uppsala University Hospital",
                purpose: "Research on heart failure prediction models",
              },
              {
                id: "REQ-2023-002",
                datasetId: "GEN-DB-042",
                datasetName: "Genomic Markers Collection",
                requestDate: "2025-03-10",
                status: "pending",
                requestor: "Dr. Michael Johnson",
                organization: "Karolinska Institute",
                purpose: "Genetic analysis of rare diseases",
              },
              {
                id: "REQ-2023-003",
                datasetId: "COVID-LT-023",
                datasetName: "COVID-19 Long-term Effects",
                requestDate: "2025-03-05",
                status: "pending",
                requestor: "Dr. Sarah Williams",
                organization: "Stockholm University",
                purpose: "Long COVID research study",
              },
              {
                id: "REQ-2023-004",
                datasetId: "DIAB-REG-2023",
                datasetName: "Diabetes Registry 2023",
                requestDate: "2025-02-20",
                approvalDate: "2025-02-25",
                status: "approved",
                requestor: "Dr. Robert Brown",
                organization: "Gothenburg University",
                purpose: "Diabetes treatment effectiveness study",
              },
              {
                id: "REQ-2023-005",
                datasetId: "DHA-EHR-001",
                datasetName: "Real-world Cardiology EHR",
                requestDate: "2025-02-15",
                rejectionDate: "2025-02-18",
                status: "rejected",
                requestor: "Dr. Emily Davis",
                organization: "Commercial Research Inc.",
                purpose: "Proprietary algorithm development",
                rejectionReason: "Commercial use not permitted under current data sharing agreement",
              },
*/
