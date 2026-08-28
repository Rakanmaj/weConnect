"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { PageHeader } from "@/components/ui/common";
import { DataTable, type Column } from "@/components/ui/data-table";
import { StatusBadge } from "@/components/ui/status-badges";
import { Button } from "@/components/ui/button";
import { adminAssessments } from "@/lib/mock-data";
import type { Assessment } from "@/types";

const columns: Column<Assessment>[] = [
  {
    key: "name",
    header: "Assessment",
    cell: (row) => (
      <Link href={`/admin/assessments/${row.id}`} className="text-primary hover:underline">
        {row.name}
      </Link>
    ),
  },
  { key: "careerPath", header: "Career Path", cell: (row) => row.careerPath },
  { key: "questions", header: "Questions", cell: (row) => row.questionCount },
  { key: "duration", header: "Duration", cell: (row) => `${row.duration} min` },
  { key: "status", header: "Status", cell: (row) => <StatusBadge status={row.status} /> },
  {
    key: "actions",
    header: "Actions",
    cell: (row) => (
      <div className="flex flex-wrap gap-2">
        <Link href={`/admin/assessments/${row.id}`}><Button variant="ghost" size="sm">View</Button></Link>
        <Link href={`/admin/assessments/${row.id}?tab=questions`}><Button variant="ghost" size="sm">Manage Questions</Button></Link>
      </div>
    ),
  },
];

export default function AdminAssessmentsPage() {
  return (
    <>
      <PageHeader
        title="Assessments"
        description="Create and manage initial assessments by career path."
        action={
          <Link href="/admin/assessments/new">
            <Button><Plus className="h-4 w-4" /> Create Assessment</Button>
          </Link>
        }
      />
      <DataTable data={adminAssessments} columns={columns} searchKeys={["name"]} searchPlaceholder="Search assessments..." />
    </>
  );
}
