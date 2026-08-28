"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/common";
import { DataTable, type Column } from "@/components/ui/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { adminDisputes } from "@/lib/mock-data";

type DisputeRow = (typeof adminDisputes)[0];

export default function AdminDisputesPage() {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selected, setSelected] = useState<DisputeRow | null>(null);

  const columns: Column<DisputeRow>[] = [
    { key: "id", header: "ID", cell: (row) => row.id },
    { key: "type", header: "Type", cell: (row) => row.type },
    { key: "parties", header: "Parties", cell: (row) => row.parties },
    { key: "status", header: "Status", cell: (row) => row.status },
    {
      key: "priority",
      header: "Priority",
      cell: (row) => (
        <Badge variant={row.priority === "High" ? "danger" : "warning"}>{row.priority}</Badge>
      ),
    },
    { key: "opened", header: "Opened", cell: (row) => row.opened },
    {
      key: "actions",
      header: "Actions",
      cell: (row) => (
        <Button
          size="sm"
          variant="secondary"
          onClick={() => {
            setSelected(row);
            setConfirmOpen(true);
          }}
        >
          Resolve
        </Button>
      ),
    },
  ];

  return (
    <>
      <PageHeader title="Disputes" description="Manage platform disputes between parties." />
      <DataTable data={adminDisputes} columns={columns} searchKeys={["type", "parties", "status"]} searchPlaceholder="Search disputes..." />
      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Resolve dispute?"
        description={`Mark dispute ${selected?.id} (${selected?.type}) as resolved?`}
        confirmLabel="Resolve"
        onConfirm={() => setConfirmOpen(false)}
      />
    </>
  );
}
