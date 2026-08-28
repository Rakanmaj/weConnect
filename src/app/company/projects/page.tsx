"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { PageHeader } from "@/components/ui/common";
import { DataTable, type Column } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badges";
import { companyProjects } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";
import type { Project } from "@/types";

const columns: Column<Project>[] = [
  {
    key: "title",
    header: "Project",
    cell: (row) => (
      <Link href={`/company/projects/${row.id}`} className="font-medium text-foreground hover:text-primary">
        {row.title}
      </Link>
    ),
  },
  { key: "type", header: "Type", cell: (row) => row.type },
  { key: "role", header: "Role", cell: (row) => row.role },
  {
    key: "deadline",
    header: "Deadline",
    cell: (row) => formatDate(row.deadline),
  },
  {
    key: "state",
    header: "Status",
    cell: (row) => <StatusBadge status={row.state} />,
  },
];

export default function CompanyProjectsPage() {
  return (
    <>
      <PageHeader
        title="Projects"
        description="Manage training, paid, and hiring challenge projects."
        action={
          <Button asChild>
            <Link href="/company/projects/new">
              <Plus className="h-4 w-4" />
              Create project
            </Link>
          </Button>
        }
      />
      <DataTable
        data={companyProjects}
        columns={columns}
        searchKeys={["title", "role", "type"]}
        searchPlaceholder="Search projects..."
      />
    </>
  );
}
