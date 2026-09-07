"use client";

import { useState } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/ui/common";
import { DataTable, type Column } from "@/components/ui/data-table";
import { Avatar } from "@/components/ui/avatar";
import { StatusBadge } from "@/components/ui/status-badges";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { companyOffers } from "@/lib/mock-data";

type OfferRow = (typeof companyOffers)[0];

export default function CompanyOffersPage() {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<OfferRow | null>(null);
  const [sentOfferIds, setSentOfferIds] = useState<string[]>([]);

  const columns: Column<OfferRow>[] = [
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
    { key: "role", header: "Role", cell: (row) => row.role },
    { key: "salary", header: "Compensation", cell: (row) => row.salary },
    {
      key: "status",
      header: "Status",
      cell: (row) => <StatusBadge status={sentOfferIds.includes(row.id) ? "Sent" : row.status} />,
    },
    { key: "sentDate", header: "Sent", cell: (row) => row.sentDate },
    { key: "expires", header: "Expires", cell: (row) => row.expires },
    {
      key: "actions",
      header: "Actions",
      cell: (row) =>
        row.status === "Draft" && !sentOfferIds.includes(row.id) ? (
          <Button
            size="sm"
            onClick={() => {
              setSelectedOffer(row);
              setConfirmOpen(true);
            }}
          >
            Send offer
          </Button>
        ) : (
          <span className="text-caption text-teal">{sentOfferIds.includes(row.id) ? "Sent in demo" : "—"}</span>
        ),
    },
  ];

  return (
    <>
      <PageHeader
        title="Offers"
        description="Manage job offers to candidates."
        action={<Button variant="secondary" asChild><Link href="/company/payments">Continue to Payments</Link></Button>}
      />
      <DataTable
        data={companyOffers}
        columns={columns}
        searchKeys={["role", "status"]}
        searchPlaceholder="Search offers..."
      />
      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Send offer?"
        description={`Send offer to ${selectedOffer?.developer.name} for ${selectedOffer?.role} at ${selectedOffer?.salary}?`}
        confirmLabel="Send offer"
        onConfirm={() => {
          if (selectedOffer) setSentOfferIds((current) => [...current, selectedOffer.id]);
          setConfirmOpen(false);
        }}
      />
    </>
  );
}
