"use client";

import Link from "next/link";
import { PageHeader } from "@/components/ui/common";
import { DataTable, type Column } from "@/components/ui/data-table";
import { StatusBadge } from "@/components/ui/status-badges";
import { adminCompanyQueue } from "@/lib/mock-data";

type QueueRow = (typeof adminCompanyQueue)[0];

const columns: Column<QueueRow>[] = [
  {
    key: "company",
    header: "Company",
    cell: (row) => (
      <Link href={`/admin/company-verification/${row.id}`} className="font-medium text-primary hover:underline">
        {row.company.name}
      </Link>
    ),
  },
  { key: "industry", header: "Industry", cell: (row) => row.company.industry },
  { key: "location", header: "Location", cell: (row) => row.company.location },
  {
    key: "status",
    header: "Status",
    cell: (row) => <StatusBadge status={row.company.verificationStatus} />,
  },
  { key: "submitted", header: "Submitted", cell: (row) => row.submitted },
  { key: "contact", header: "Contact", cell: (row) => row.contact },
];

export default function AdminCompanyVerificationPage() {
  return (
    <>
      <PageHeader title="Company Verification" description="Review company registration requests." />
      <DataTable
        data={adminCompanyQueue}
        columns={columns}
        searchKeys={["submitted", "contact"]}
        searchPlaceholder="Search companies..."
      />
    </>
  );
}
