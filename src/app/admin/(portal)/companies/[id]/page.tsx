"use client";

import { notFound } from "next/navigation";
import { use } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PageHeader } from "@/components/ui/common";
import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badges";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ActivityFeed } from "@/components/shared/timeline";
import {
  adminCompaniesList,
  adminDisputes,
  adminPaymentsList,
  adminProjectsList,
  companyTeamMembers,
  hiringPipeline,
} from "@/lib/mock-data";
import { formatCurrency } from "@/lib/platform-config";

export default function AdminCompanyDetailPage({ params }: PageProps<"/admin/companies/[id]">) {
  const { id } = use(params);
  const company = adminCompaniesList.find((c) => c.id === id);
  if (!company) notFound();

  const projects = adminProjectsList.filter((p) => p.company.id === company.id || p.company.name === company.name);
  const payments = adminPaymentsList.filter((p) => p.company === company.name);
  const hiring = hiringPipeline.filter((h) => h.company === company.name);
  const disputes = adminDisputes.filter((d) => d.parties.includes(company.name.split(" ")[0]) || d.companyId === company.id);

  return (
    <>
      <Link href="/admin/companies" className="inline-flex items-center gap-1 text-body-sm text-muted mb-4">
        <ArrowLeft className="h-4 w-4" /> Back to companies
      </Link>
      <PageHeader title={company.name} action={<StatusBadge status={company.verificationStatus} />} />

      <Tabs defaultValue="profile">
        <TabsList className="flex-wrap">
          {["profile", "verification", "projects", "team", "payments", "hiring", "disputes", "activity"].map((t) => (
            <TabsTrigger key={t} value={t} className="capitalize">{t === "team" ? "Team / Evaluators" : t}</TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="profile">
          <Card className="max-w-xl">
            <CardContent className="pt-6 space-y-4">
              <div><p className="text-caption">Industry</p><p className="text-label">{company.industry}</p></div>
              <div><p className="text-caption">Location</p><p className="text-label">{company.location}</p></div>
              <div><p className="text-caption">Website</p><p className="text-label">{company.website}</p></div>
              <div><p className="text-caption">Size</p><p className="text-label">{company.size}</p></div>
              <div><p className="text-caption">Official email</p><p className="text-label">{company.officialEmail ?? "—"}</p></div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="verification">
          <Card>
            <CardContent className="pt-6 space-y-3 text-body-sm">
              <p>Status: <StatusBadge status={company.verificationStatus} /></p>
              <p>Registration: {company.registrationNumber ?? "—"} ({company.registrationCountry ?? "—"})</p>
              <p>Contact: {company.contactPerson?.name ?? "—"} · {company.contactPerson?.email ?? "—"}</p>
              {(company.verificationDocuments ?? []).map((d) => (
                <p key={d.id}>{d.name} · {d.status}</p>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects">
          {projects.map((p) => (
            <Card key={p.id} className="mb-3">
              <CardContent className="pt-6 flex justify-between">
                <Link href={`/admin/projects/${p.id}`} className="text-primary hover:underline">{p.title}</Link>
                <StatusBadge status={p.state} />
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="team">
          {company.id === "company-1" ? companyTeamMembers.map((m) => (
            <Card key={m.id} className="mb-3"><CardContent className="pt-6"><p className="text-label">{m.name}</p><p className="text-caption">{m.role} · {m.email}</p></CardContent></Card>
          )) : <p className="text-body-sm text-muted">No team members recorded.</p>}
        </TabsContent>

        <TabsContent value="payments">
          {payments.map((p) => (
            <Card key={p.id} className="mb-3"><CardContent className="pt-6 flex justify-between"><span>{p.type} · {p.project}</span><span>{formatCurrency(p.weconnectRevenue)} · {p.status}</span></CardContent></Card>
          ))}
        </TabsContent>

        <TabsContent value="hiring">
          {hiring.map((h) => (
            <Card key={h.id} className="mb-3"><CardContent className="pt-6"><p>{h.developer.name} · {h.stage}</p></CardContent></Card>
          ))}
        </TabsContent>

        <TabsContent value="disputes">
          {disputes.length === 0 ? <p className="text-body-sm text-muted">No disputes.</p> : disputes.map((d) => (
            <Card key={d.id} className="mb-3"><CardContent className="pt-6">{d.type} · {d.status}</CardContent></Card>
          ))}
        </TabsContent>

        <TabsContent value="activity">
          <ActivityFeed items={[{ id: "1", title: "Company registered", description: company.name, time: company.submittedAt ?? "—" }]} />
        </TabsContent>
      </Tabs>
    </>
  );
}
