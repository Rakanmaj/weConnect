"use client";

import Link from "next/link";
import { PageHeader } from "@/components/ui/common";
import { DataTable, type Column } from "@/components/ui/data-table";
import { Avatar } from "@/components/ui/avatar";
import { StatusBadge } from "@/components/ui/status-badges";
import { companyEvaluations } from "@/lib/mock-data";

type EvalRow = (typeof companyEvaluations)[0];

const columns: Column<EvalRow>[] = [
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
  {
    key: "project",
    header: "Project",
    cell: (row) => (
      <Link href="/company/projects/proj-csm-dashboard/evaluation" className="text-primary hover:underline">
        {row.project}
      </Link>
    ),
  },
  {
    key: "status",
    header: "Status",
    cell: (row) => <StatusBadge status={row.status} />,
  },
  { key: "dueDate", header: "Due date", cell: (row) => row.dueDate },
  {
    key: "score",
    header: "Score",
    cell: (row) => ("score" in row && row.score ? `${row.score}%` : "—"),
  },
];

export default function CompanyEvaluationsPage() {
  const pending = companyEvaluations.filter((e) => e.status === "Pending").length;
  const completed = companyEvaluations.filter((e) => e.status === "Completed").length;

  return (
    <>
      <PageHeader
        title="Evaluations"
        description={`${pending} pending · ${completed} completed`}
      />
      <DataTable
        data={companyEvaluations}
        columns={columns}
        searchKeys={["status"]}
        searchPlaceholder="Search evaluations..."
      />
    </>
  );
}
