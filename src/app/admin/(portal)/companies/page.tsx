"use client";

import Link from "next/link";
import { PageHeader } from "@/components/ui/common";
import { DataTable, type Column } from "@/components/ui/data-table";
import { StatusBadge } from "@/components/ui/status-badges";
import { adminCompaniesList } from "@/lib/mock-data";
import type { Company } from "@/types";

const columns: Column<Company>[] = [
  {
    key: "name",
    header: "Company",
    cell: (row) => (
      <Link href={`/admin/companies/${row.id}`} className="font-medium text-primary hover:underline">
        {row.name}
      </Link>
    ),
  },
  { key: "industry", header: "Industry", cell: (row) => row.industry },
  { key: "location", header: "Location", cell: (row) => row.location },
  { key: "size", header: "Size", cell: (row) => row.size },
  {
    key: "status",
    header: "Status",
    cell: (row) => <StatusBadge status={row.verificationStatus} />,
  },
];

export default function AdminCompaniesPage() {
  return (
    <>
      <PageHeader title="Companies" description="Manage registered companies." />
      <DataTable data={adminCompaniesList} columns={columns} searchKeys={["name", "industry", "location"]} searchPlaceholder="Search companies..." />
    </>
  );
}
