"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { PageHeader } from "@/components/ui/common";
import { StatCard } from "@/components/ui/stat-card";
import { DataTable, type Column } from "@/components/ui/data-table";
import { StatusBadge } from "@/components/ui/status-badges";
import { Card, CardContent } from "@/components/ui/card";
import { companyDashboardChart, companyPayments } from "@/lib/mock-data";
import { CreditCard, DollarSign, Receipt } from "lucide-react";

type PaymentRow = (typeof companyPayments)[0];

const columns: Column<PaymentRow>[] = [
  { key: "invoice", header: "Invoice", cell: (row) => row.invoice },
  { key: "project", header: "Project", cell: (row) => row.project },
  {
    key: "amount",
    header: "Amount",
    cell: (row) => `$${row.amount.toLocaleString()}`,
  },
  {
    key: "status",
    header: "Status",
    cell: (row) => <StatusBadge status={row.status} />,
  },
  { key: "date", header: "Date", cell: (row) => row.date },
];

export default function CompanyPaymentsPage() {
  const totalPaid = companyPayments.filter((p) => p.status === "Paid").reduce((s, p) => s + p.amount, 0);
  const pending = companyPayments.filter((p) => p.status === "Pending").reduce((s, p) => s + p.amount, 0);

  return (
    <>
      <PageHeader title="Payments" description="Invoices, billing history, and spend analytics." />

      <div className="grid gap-4 sm:grid-cols-3 mb-8">
        <StatCard label="Total paid" value={`$${totalPaid.toLocaleString()}`} icon={DollarSign} />
        <StatCard label="Outstanding" value={`$${pending.toLocaleString()}`} icon={Receipt} accent="teal" />
        <StatCard label="Invoices" value={companyPayments.length} icon={CreditCard} accent="navy" />
      </div>

      <Card className="mb-8">
        <CardContent className="pt-6">
          <h2 className="text-h3 text-foreground mb-4">Monthly spend</h2>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={companyDashboardChart.spendByMonth}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(v) => [`$${v}`, "Amount"]} />
              <Bar dataKey="amount" fill="#2563EB" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <DataTable
        data={companyPayments}
        columns={columns}
        searchKeys={["invoice", "project", "status"]}
        searchPlaceholder="Search payments..."
      />
    </>
  );
}
