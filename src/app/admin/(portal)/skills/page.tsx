"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { PageHeader } from "@/components/ui/common";
import { DataTable, type Column } from "@/components/ui/data-table";
import { StatusBadge } from "@/components/ui/status-badges";
import { Button } from "@/components/ui/button";
import { adminSkills } from "@/lib/mock-data";
import type { PlatformSkill } from "@/types";

const columns: Column<PlatformSkill>[] = [
  {
    key: "name",
    header: "Skill",
    cell: (row) => (
      <Link href={`/admin/skills/${row.id}`} className="text-primary hover:underline">{row.name}</Link>
    ),
  },
  { key: "category", header: "Category", cell: (row) => row.category },
  { key: "paths", header: "Career Paths", cell: (row) => row.careerPaths.join(" / ") },
  { key: "status", header: "Status", cell: (row) => <StatusBadge status={row.status} /> },
  { key: "challenges", header: "Challenges", cell: (row) => row.challengeIds.length },
  { key: "assessments", header: "Assessments", cell: (row) => row.assessmentIds.length },
  { key: "developers", header: "Developers", cell: (row) => row.developerCount.toLocaleString() },
];

export default function AdminSkillsPage() {
  return (
    <>
      <PageHeader
        title="Skills"
        description="Create, edit and archive platform skills."
        action={
          <Link href="/admin/skills/new">
            <Button><Plus className="h-4 w-4" /> Add Skill</Button>
          </Link>
        }
      />
      <DataTable data={adminSkills} columns={columns} searchKeys={["name", "category"]} searchPlaceholder="Search skills..." />
    </>
  );
}
