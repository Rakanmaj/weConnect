"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { PageHeader } from "@/components/ui/common";
import { DataTable, type Column } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badges";
import { internalProjects } from "@/lib/mock-data";
import type { InternalProject } from "@/types";

const columns: Column<InternalProject>[] = [
  {
    key: "title",
    header: "Project",
    cell: (row) => (
      <Link href={`/admin/internal-projects/${row.id}/edit`} className="text-primary hover:underline">{row.title}</Link>
    ),
  },
  { key: "careerPath", header: "Career path", cell: (row) => row.careerPath },
  { key: "skills", header: "Skills", cell: (row) => row.skills.join(", ") },
  { key: "duration", header: "Duration", cell: (row) => row.duration },
  { key: "difficulty", header: "Difficulty", cell: (row) => row.difficulty },
  { key: "status", header: "Status", cell: (row) => <StatusBadge status={row.status} /> },
  {
    key: "actions",
    header: "Actions",
    cell: (row) => (
      <Link href={`/admin/internal-projects/${row.id}/edit`}>
        <Button variant="ghost" size="sm">Edit</Button>
      </Link>
    ),
  },
];

export default function AdminInternalProjectsPage() {
  return (
    <>
      <PageHeader
        title="Internal Projects"
        description="Create and edit WeConnect internal training projects."
        action={
          <Link href="/admin/internal-projects/new">
            <Button><Plus className="h-4 w-4" /> Create project</Button>
          </Link>
        }
      />
      <DataTable data={internalProjects} columns={columns} searchKeys={["title"]} searchPlaceholder="Search internal projects..." />
    </>
  );
}
