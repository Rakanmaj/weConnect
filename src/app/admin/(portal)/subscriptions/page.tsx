"use client";

import { PageHeader } from "@/components/ui/common";
import { DataTable, type Column } from "@/components/ui/data-table";
import { StatusBadge } from "@/components/ui/status-badges";
import { Badge } from "@/components/ui/badge";
import { adminSubscriptions } from "@/lib/mock-data";

type SubRow = (typeof adminSubscriptions)[0];

const columns: Column<SubRow>[] = [
  { key: "company", header: "Company", cell: (row) => row.company },
  {
    key: "plan",
    header: "Plan",
    cell: (row) => <Badge variant="primary">{row.plan}</Badge>,
  },
  { key: "mrr", header: "MRR", cell: (row) => `$${row.mrr.toLocaleString()}` },
  { key: "status", header: "Status", cell: (row) => <StatusBadge status={row.status} /> },
  { key: "renews", header: "Renews", cell: (row) => row.renews },
];

export default function AdminSubscriptionsPage() {
  return (
    <>
      <PageHeader title="Subscriptions" description="Company subscription plans and billing." />
      <DataTable data={adminSubscriptions} columns={columns} searchKeys={["company", "plan", "status"]} searchPlaceholder="Search subscriptions..." />
    </>
  );
}
