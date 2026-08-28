"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { PageHeader, SectionHeader } from "@/components/ui/common";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { reportChartData } from "@/lib/mock-data";

export default function AdminReportsPage() {
  return (
    <>
      <PageHeader title="Reports" description="Platform analytics and business intelligence." />

      <div className="grid gap-6 lg:grid-cols-2 mb-6">
        <Card>
          <CardHeader><SectionHeader title="Developer Growth" description="Total vs verified developers" /></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={reportChartData.developerGrowth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="developers" stroke="#2563EB" strokeWidth={2} name="Total" />
                <Line type="monotone" dataKey="verified" stroke="#14B8A6" strokeWidth={2} name="Verified" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><SectionHeader title="Project Volume" description="Active vs completed projects" /></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={reportChartData.projectVolume}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="active" fill="#2563EB" name="Active" radius={[4, 4, 0, 0]} />
                <Bar dataKey="completed" fill="#14B8A6" name="Completed" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><SectionHeader title="Revenue Breakdown" description="Project commission, hiring fees, and subscriptions" /></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={reportChartData.revenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
              <Tooltip formatter={(v) => [`$${Number(v).toLocaleString()}`, ""]} />
              <Legend />
              <Area type="monotone" dataKey="commission" stackId="1" stroke="#2563EB" fill="#2563EB" fillOpacity={0.6} name="Project commission" />
              <Area type="monotone" dataKey="recruitment" stackId="1" stroke="#14B8A6" fill="#14B8A6" fillOpacity={0.6} name="Hiring fees" />
              <Area type="monotone" dataKey="subscriptions" stackId="1" stroke="#0D1B3D" fill="#0D1B3D" fillOpacity={0.5} name="Subscriptions" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </>
  );
}
