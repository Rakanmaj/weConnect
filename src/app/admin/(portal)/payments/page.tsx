"use client";

import { PageHeader } from "@/components/ui/common";
import { StatCard } from "@/components/ui/stat-card";
import { DataTable, type Column } from "@/components/ui/data-table";
import { StatusBadge } from "@/components/ui/status-badges";
import { adminMetrics, adminPaymentsList } from "@/lib/mock-data";
import { usePlatformSettings } from "@/lib/platform-settings";
import { calculateProjectFinancials, formatCurrency } from "@/lib/platform-config";
import { DollarSign } from "lucide-react";

type PaymentRow = (typeof adminPaymentsList)[0];

export default function AdminPaymentsPage() {
  const { settings } = usePlatformSettings();

  const rows = adminPaymentsList.map((row) => {
    if (row.type !== "Project Commission") return row;
    const next = calculateProjectFinancials(row.grossAmount, settings.projectCommissionPercentage);
    return {
      ...row,
      commissionPercentage: next.commissionPercentage,
      weconnectRevenue: next.commissionAmount,
      developerPayout: next.developerPayout,
      amount: next.commissionAmount,
    };
  });

  const columns: Column<(typeof rows)[0]>[] = [
    { key: "project", header: "Project", cell: (row) => row.project },
    { key: "company", header: "Company", cell: (row) => row.company },
    { key: "developer", header: "Developer", cell: (row) => row.developer },
    { key: "gross", header: "Gross Amount", cell: (row) => formatCurrency(row.grossAmount) },
    { key: "commission", header: "Commission %", cell: (row) => (row.type === "Project Commission" ? `${row.commissionPercentage}%` : "—") },
    { key: "revenue", header: "WeConnect Revenue", cell: (row) => formatCurrency(row.weconnectRevenue) },
    { key: "payout", header: "Developer Payout", cell: (row) => (row.developerPayout ? formatCurrency(row.developerPayout) : "—") },
    { key: "type", header: "Type", cell: (row) => row.type },
    { key: "status", header: "Status", cell: (row) => <StatusBadge status={row.status} /> },
  ];

  const commissionRevenue = rows.filter((r) => r.type === "Project Commission" && r.status === "Paid").reduce((s, r) => s + r.weconnectRevenue, 0);
  const hiring = rows.filter((r) => r.type === "Hiring Fee").reduce((s, r) => s + r.weconnectRevenue, 0);
  const subs = rows.filter((r) => r.type === "Subscription").reduce((s, r) => s + r.weconnectRevenue, 0);

  return (
    <>
      <PageHeader title="Payments" description="Paid project commissions, hiring fees and subscriptions are tracked separately." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard label="Gross project volume" value={formatCurrency(adminMetrics.grossProjectVolume)} icon={DollarSign} />
        <StatCard label="Project commission revenue" value={formatCurrency(adminMetrics.projectCommissionRevenue)} accent="teal" />
        <StatCard label="Hiring fee revenue" value={formatCurrency(adminMetrics.hiringFeeRevenue)} accent="navy" />
        <StatCard label="Subscription revenue" value={formatCurrency(adminMetrics.subscriptionRevenue)} accent="primary" />
      </div>
      <div className="grid gap-4 sm:grid-cols-3 mb-6">
        <p className="text-caption">Sample paid commissions: {formatCurrency(commissionRevenue)}</p>
        <p className="text-caption">Sample hiring fees: {formatCurrency(hiring)}</p>
        <p className="text-caption">Sample subscriptions: {formatCurrency(subs)}</p>
      </div>
      <DataTable data={rows} columns={columns} searchKeys={["company", "type", "status", "project"]} searchPlaceholder="Search payments..." />
    </>
  );
}
