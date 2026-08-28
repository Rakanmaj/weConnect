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
  Briefcase,
  Building2,
  DollarSign,
  TrendingUp,
  UserCheck,
  Users,
} from "lucide-react";
import { PageHeader, SectionHeader } from "@/components/ui/common";
import { StatCard } from "@/components/ui/stat-card";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badges";
import { adminMetrics, reportChartData } from "@/lib/mock-data";

export default function AdminDashboardPage() {
  return (
    <>
      <PageHeader
        title="Platform Dashboard"
        description="WeConnect platform metrics and activity overview."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard label="Total developers" value={adminMetrics.totalDevelopers.toLocaleString()} icon={Users} />
        <StatCard label="WeConnect verified" value={adminMetrics.weconnectVerifiedDevelopers} icon={UserCheck} accent="teal" />
        <StatCard label="Total companies" value={adminMetrics.totalCompanies} icon={Building2} accent="navy" />
        <StatCard label="Active projects" value={adminMetrics.activeProjects} icon={Briefcase} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard label="Gross project volume" value={`$${(adminMetrics.grossProjectVolume / 1000).toFixed(0)}k`} icon={DollarSign} accent="success" />
        <StatCard label="WeConnect project commission" value={`$${(adminMetrics.projectCommissionRevenue / 1000).toFixed(0)}k`} icon={TrendingUp} accent="teal" />
        <StatCard label="Hiring fee revenue" value={`$${(adminMetrics.hiringFeeRevenue / 1000).toFixed(0)}k`} icon={DollarSign} accent="primary" />
        <StatCard label="Subscription revenue" value={`$${(adminMetrics.subscriptionRevenue / 1000).toFixed(0)}k`} icon={UserCheck} accent="navy" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2 mb-8">
        <Card>
          <CardHeader><SectionHeader title="Developer growth" /></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={reportChartData.developerGrowth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="developers" fill="#2563EB" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><SectionHeader title="Pending verifications" /></CardHeader>
          <CardContent className="space-y-3">
            <Link href="/admin/developer-verification" className="flex justify-between rounded-[8px] border border-border p-4 hover:bg-surface/50">
              <span className="text-body-sm text-navy">Developer verification queue</span>
              <StatusBadge status="Pending" />
              <span className="text-h4 text-navy tabular-nums">{adminMetrics.pendingDeveloperVerification}</span>
            </Link>
            <Link href="/admin/company-verification" className="flex justify-between rounded-[8px] border border-border p-4 hover:bg-surface/50">
              <span className="text-body-sm text-navy">Company verification queue</span>
              <span className="text-h4 text-navy tabular-nums">{adminMetrics.pendingCompanyVerification}</span>
            </Link>
            <div className="flex justify-between rounded-[8px] border border-border p-4">
              <span className="text-body-sm text-navy">Projects awaiting evaluation</span>
              <span className="text-h4 text-navy tabular-nums">{adminMetrics.projectsAwaitingEvaluation}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><SectionHeader title="Platform health" /></CardHeader>
        <CardContent>
          <div className="grid gap-6 sm:grid-cols-3">
            <div>
              <p className="text-caption">Completion rate</p>
              <p className="text-h2 text-navy">{adminMetrics.completionRate}%</p>
            </div>
            <div>
              <p className="text-caption">Hiring conversion</p>
              <p className="text-h2 text-navy">{adminMetrics.hiringConversion}%</p>
            </div>
            <div>
              <p className="text-caption">Completed projects</p>
              <p className="text-h2 text-navy">{adminMetrics.completedProjects.toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
