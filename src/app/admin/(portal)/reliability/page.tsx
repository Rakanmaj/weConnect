"use client";

import { PageHeader } from "@/components/ui/common";
import { DataTable, type Column } from "@/components/ui/data-table";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { adminReliabilityHistory } from "@/lib/mock-data";

type ReliabilityRow = (typeof adminReliabilityHistory)[0];

const columns: Column<ReliabilityRow>[] = [
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
  { key: "event", header: "Event", cell: (row) => row.event },
  {
    key: "impact",
    header: "Impact",
    cell: (row) => (
      <Badge variant={row.impact.startsWith("+") ? "success" : "danger"}>{row.impact}</Badge>
    ),
  },
  { key: "score", header: "Score", cell: (row) => `${row.score}%` },
  { key: "date", header: "Date", cell: (row) => row.date },
];

export default function AdminReliabilityPage() {
  return (
    <>
      <PageHeader title="Reliability History" description="Track reliability score changes across the platform." />
      <DataTable data={adminReliabilityHistory} columns={columns} searchKeys={["event"]} searchPlaceholder="Search events..." />
    </>
  );
}
