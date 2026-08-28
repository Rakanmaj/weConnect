"use client";

import Link from "next/link";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  AlertCircle,
  Briefcase,
  CreditCard,
  Plus,
  Sparkles,
  Users,
} from "lucide-react";
import { PageHeader, SectionHeader } from "@/components/ui/common";
import { StatCard } from "@/components/ui/stat-card";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badges";
import { Avatar } from "@/components/ui/avatar";
import { MatchScore } from "@/components/ui/progress";
import {
  companyDashboardChart,
  companyPayments,
  companyProjects,
  hiringPipeline,
} from "@/lib/mock-data";
import { getAcceptedAssignments } from "@/lib/assignments";

const pendingActions = [
  { id: 1, action: "Invite Top 4 matches", project: "Fleet Maintenance Dashboard", href: "/company/projects/proj-inv-1/matches" },
  { id: 2, action: "Review 4 submissions", project: "Customer Support Dashboard", href: "/company/projects/proj-csm-dashboard/submissions" },
  { id: 3, action: "Complete evaluations", project: "Customer Support Dashboard", href: "/company/projects/proj-csm-dashboard/evaluation" },
];

export default function CompanyDashboardPage() {
  const activeProjects = companyProjects.filter((p) => p.state === "In Progress" || p.state === "Under Review");
  const pendingPayment = companyPayments.find((p) => p.status === "Pending");

  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Overview of projects, hiring, and payments."
        action={
          <Link href="/company/projects/new">
            <Button>
              <Plus className="h-4 w-4" />
              New project
            </Button>
          </Link>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard label="Active projects" value={activeProjects.length} icon={Briefcase} accent="primary" />
        <StatCard label="Developers working" value={getAcceptedAssignments(companyProjects[0]).length} icon={Users} accent="teal" change="Independent contributors" />
        <StatCard label="Pipeline candidates" value={hiringPipeline.length} icon={Sparkles} accent="navy" />
        <StatCard
          label="Pending payment"
          value={pendingPayment ? `$${pendingPayment.amount.toLocaleString()}` : "$0"}
          icon={CreditCard}
          accent="success"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3 mb-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <SectionHeader title="Active projects" />
          </CardHeader>
          <CardContent className="space-y-3">
            {activeProjects.map((project) => (
              <Link
                key={project.id}
                href={`/company/projects/${project.id}`}
                className="flex items-center justify-between rounded-[8px] border border-border p-4 hover:bg-surface/50 transition-colors"
              >
                <div className="min-w-0">
                  <p className="text-label text-navy truncate">{project.title}</p>
                  <p className="text-caption">{project.role} · {project.duration}</p>
                </div>
                <StatusBadge status={project.state} />
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <SectionHeader title="Pending actions" />
          </CardHeader>
          <CardContent className="space-y-3">
            {pendingActions.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="flex gap-3 rounded-[8px] border border-border p-3 hover:bg-surface/50"
              >
                <AlertCircle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <p className="text-body-sm font-medium text-navy">{item.action}</p>
                  <p className="text-caption truncate">{item.project}</p>
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 mb-8">
        <Card>
          <CardHeader>
            <SectionHeader
              title="AI top matches"
              description="Best-fit developers for active projects"
              action={
                <Link href="/company/projects/proj-csm-dashboard/matches">
                  <Button variant="ghost" size="sm">View all</Button>
                </Link>
              }
            />
          </CardHeader>
          <CardContent className="space-y-3">
            {getAcceptedAssignments(companyProjects[0]).map((a) => (
              <div key={a.id} className="flex items-center gap-3 rounded-[8px] border border-border p-3">
                <Avatar name={a.developer.name} size="sm" />
                <div className="min-w-0 flex-1">
                  <p className="text-label text-navy truncate">{a.developer.name}</p>
                  <p className="text-caption truncate">{a.workStatus ?? a.invitationStatus}</p>
                </div>
                <MatchScore score={a.matchScore} size="sm" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <SectionHeader title="Hiring funnel" />
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={companyDashboardChart.hiringFunnel}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="stage" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="count" fill="#14B8A6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <SectionHeader
            title="Payments summary"
            action={
              <Link href="/company/payments">
                <Button variant="secondary" size="sm">View all</Button>
              </Link>
            }
          />
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3 mb-4">
            <div>
              <p className="text-caption">Total paid (YTD)</p>
              <p className="text-h3 text-navy">$12,400</p>
            </div>
            <div>
              <p className="text-caption">Outstanding</p>
              <p className="text-h3 text-navy">${pendingPayment?.amount.toLocaleString() ?? 0}</p>
            </div>
            <div>
              <p className="text-caption">Next due</p>
              <p className="text-h3 text-navy">{pendingPayment?.date ?? "—"}</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={companyDashboardChart.spendByMonth}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip formatter={(v) => [`$${v}`, "Spend"]} />
              <Bar dataKey="amount" fill="#2563EB" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </>
  );
}
