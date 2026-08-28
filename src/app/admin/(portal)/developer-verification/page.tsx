"use client";

import Link from "next/link";
import { PageHeader } from "@/components/ui/common";
import { DataTable, type Column } from "@/components/ui/data-table";
import { Avatar } from "@/components/ui/avatar";
import { StatusBadge } from "@/components/ui/status-badges";
import { adminDeveloperQueue } from "@/lib/mock-data";

type QueueRow = (typeof adminDeveloperQueue)[0];

const columns: Column<QueueRow>[] = [
  {
    key: "developer",
    header: "Developer",
    cell: (row) => (
      <Link href={`/admin/developer-verification/${row.id}`} className="flex items-center gap-2 text-primary hover:underline">
        <Avatar name={row.developer.name} size="sm" />
        {row.developer.name}
      </Link>
    ),
  },
  { key: "role", header: "Role", cell: (row) => row.developer.role },
  { key: "location", header: "Location", cell: (row) => row.developer.location },
  {
    key: "status",
    header: "Status",
    cell: (row) => <StatusBadge status={row.developer.accountVerificationStatus} />,
  },
  { key: "submitted", header: "Submitted", cell: (row) => row.submitted },
  { key: "documents", header: "Documents", cell: (row) => row.documents },
];

export default function AdminDeveloperVerificationPage() {
  return (
    <>
      <PageHeader
        title="Developer Verification"
        description="Review and approve developer verification requests."
      />
      <DataTable
        data={adminDeveloperQueue}
        columns={columns}
        searchKeys={["submitted"]}
        searchPlaceholder="Search queue..."
        filters={
          <select className="h-9 rounded-[6px] border border-border bg-card px-3 text-sm">
            <option>All statuses</option>
            <option>Pending Verification</option>
            <option>More Information Required</option>
          </select>
        }
      />
    </>
  );
}
