"use client";

import Link from "next/link";
import { PageHeader } from "@/components/ui/common";
import { DataTable, type Column } from "@/components/ui/data-table";
import { Avatar } from "@/components/ui/avatar";
import { hiringPipeline } from "@/lib/mock-data";

type HiringRow = (typeof hiringPipeline)[0];

const columns: Column<HiringRow>[] = [
  {
    key: "developer",
    header: "Developer",
    cell: (row) => (
      <Link href={`/admin/hiring/${row.id}`} className="flex items-center gap-2 text-primary hover:underline">
        <Avatar name={row.developer.name} size="sm" />
        {row.developer.name}
      </Link>
    ),
  },
  { key: "company", header: "Company", cell: (row) => row.company },
  { key: "role", header: "Role", cell: (row) => row.role },
  { key: "stage", header: "Stage", cell: (row) => row.stage },
  { key: "lastActivity", header: "Last activity", cell: (row) => row.lastActivity },
];

export default function AdminHiringPage() {
  return (
    <>
      <PageHeader title="Hiring Management" description="Platform-wide hiring pipeline oversight." />
      <DataTable data={hiringPipeline} columns={columns} searchKeys={["company", "role", "stage"]} searchPlaceholder="Search hiring records..." />
    </>
  );
}
