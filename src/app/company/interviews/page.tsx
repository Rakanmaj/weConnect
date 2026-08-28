"use client";

import { PageHeader } from "@/components/ui/common";
import { DataTable, type Column } from "@/components/ui/data-table";
import { Avatar } from "@/components/ui/avatar";
import { StatusBadge } from "@/components/ui/status-badges";
import { companyInterviews } from "@/lib/mock-data";

type InterviewRow = (typeof companyInterviews)[0];

const columns: Column<InterviewRow>[] = [
  {
    key: "developer",
    header: "Developer",
    cell: (row) => (
      <div className="flex items-center gap-2">
        <Avatar name={row.developer.name} size="sm" />
        {row.developer.name}
      </div>
    ),
  },
  { key: "role", header: "Role", cell: (row) => row.role },
  { key: "date", header: "Date", cell: (row) => row.date },
  { key: "time", header: "Time", cell: (row) => row.time },
  { key: "type", header: "Type", cell: (row) => row.type },
  {
    key: "status",
    header: "Status",
    cell: (row) => <StatusBadge status={row.status} />,
  },
];

export default function CompanyInterviewsPage() {
  return (
    <>
      <PageHeader title="Interviews" description="Scheduled and requested interviews." />
      <DataTable
        data={companyInterviews}
        columns={columns}
        searchKeys={["role", "status", "type"]}
        searchPlaceholder="Search interviews..."
      />
    </>
  );
}
