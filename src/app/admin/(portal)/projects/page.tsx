"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/ui/common";
import { DataTable, type Column } from "@/components/ui/data-table";
import { StatusBadge } from "@/components/ui/status-badges";
import { adminProjectsList } from "@/lib/mock-data";
import { getAcceptedAssignments } from "@/lib/assignments";
import { formatCurrency, isPaidProjectType } from "@/lib/platform-config";
import type { Project } from "@/types";

const FILTERS = ["All", "Matching", "Invitations", "In Progress", "Under Review", "Completed", "Paid", "Overdue"] as const;

function matchesFilter(project: Project, filter: string) {
  if (filter === "All") return true;
  if (filter === "Matching") return project.state === "Matching" || project.state === "AI Analysis";
  if (filter === "Invitations") return project.state === "Invitations Sent";
  if (filter === "Paid") return project.paymentStatus === "Paid" || project.state === "Purchased";
  if (filter === "Overdue") return new Date(project.deadline) < new Date() && project.state === "In Progress";
  return project.state === filter;
}

const columns: Column<Project>[] = [
  {
    key: "title",
    header: "Project",
    cell: (row) => (
      <Link href={`/admin/projects/${row.id}`} className="font-medium text-primary hover:underline">
        {row.title}
      </Link>
    ),
  },
  { key: "company", header: "Company", cell: (row) => row.company.name },
  { key: "type", header: "Type", cell: (row) => row.type },
  {
    key: "developers",
    header: "Developers Active",
    cell: (row) => getAcceptedAssignments(row).length,
  },
  {
    key: "state",
    header: "Overall State",
    cell: (row) => <StatusBadge status={row.state} />,
  },
  { key: "deadline", header: "Deadline", cell: (row) => row.deadline },
  {
    key: "budget",
    header: "Budget",
    cell: (row) => (isPaidProjectType(row.type) && row.budget != null ? formatCurrency(row.budget) : "—"),
  },
  {
    key: "payment",
    header: "Payment Status",
    cell: (row) => <StatusBadge status={row.paymentStatus ?? (isPaidProjectType(row.type) ? "Pending" : "Not Applicable")} />,
  },
  { key: "activity", header: "Last Activity", cell: (row) => row.lastActivity ?? "—" },
];

export default function AdminProjectsPage() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const data = useMemo(() => adminProjectsList.filter((p) => matchesFilter(p, filter)), [filter]);

  return (
    <>
      <PageHeader title="Projects" description="Live monitoring of company and internal project activity." />
      <DataTable
        data={data}
        columns={columns}
        searchKeys={["title"]}
        searchPlaceholder="Search projects..."
        filters={
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as (typeof FILTERS)[number])}
            className="h-9 rounded-[6px] border border-border bg-card px-3 text-sm"
          >
            {FILTERS.map((f) => (
              <option key={f}>{f}</option>
            ))}
          </select>
        }
      />
    </>
  );
}
