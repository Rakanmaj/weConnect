"use client";

import { notFound } from "next/navigation";
import { use, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PageHeader, FormField } from "@/components/ui/common";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badges";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { Textarea } from "@/components/ui/textarea";
import { adminCompanyQueue } from "@/lib/mock-data";
import type { VerificationStatus } from "@/types";

export default function AdminCompanyVerificationDetailPage({
  params,
}: PageProps<"/admin/company-verification/[id]">) {
  const { id } = use(params);
  const item = adminCompanyQueue.find((q) => q.id === id);
  if (!item) notFound();

  const company = item.company;
  const [dialog, setDialog] = useState<"approve" | "reject" | "more-info" | null>(null);
  const [status, setStatus] = useState<VerificationStatus>(company.verificationStatus);
  const [notes, setNotes] = useState(company.adminNotes ?? "");

  return (
    <>
      <Link href="/admin/company-verification" className="inline-flex items-center gap-1 text-body-sm text-muted hover:text-foreground mb-4">
        <ArrowLeft className="h-4 w-4" /> Back to queue
      </Link>

      <PageHeader
        title={company.name}
        description={`Company verification · ${company.industry}`}
        action={<StatusBadge status={status} />}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="pt-6 grid sm:grid-cols-2 gap-4 text-body-sm">
              <div><p className="text-caption">Company name</p><p className="text-label">{company.name}</p></div>
              <div><p className="text-caption">Industry</p><p className="text-label">{company.industry}</p></div>
              <div><p className="text-caption">Official email</p><p className="text-label">{company.officialEmail ?? item.contact}</p></div>
              <div><p className="text-caption">Website</p><p className="text-label">{company.website}</p></div>
              <div><p className="text-caption">Registration number</p><p className="text-label">{company.registrationNumber ?? "—"}</p></div>
              <div><p className="text-caption">Registration country</p><p className="text-label">{company.registrationCountry ?? "—"}</p></div>
              <div><p className="text-caption">Company size</p><p className="text-label">{company.size}</p></div>
              <div><p className="text-caption">Location</p><p className="text-label">{company.location}</p></div>
              <div><p className="text-caption">Named contact</p><p className="text-label">{company.contactPerson?.name ?? "—"}</p></div>
              <div><p className="text-caption">Contact email</p><p className="text-label">{company.contactPerson?.email ?? item.contact}</p></div>
              <div><p className="text-caption">Contact title</p><p className="text-label">{company.contactPerson?.title ?? "—"}</p></div>
              <div><p className="text-caption">Submitted</p><p className="text-label">{item.submitted}</p></div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-h4 mb-3">Registration documents</h2>
              <ul className="space-y-2 text-body-sm">
                {(company.verificationDocuments ?? []).map((d) => (
                  <li key={d.id} className="flex justify-between"><span>{d.name} · {d.fileName}</span><StatusBadge status={d.status} /></li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="pt-6 space-y-3">
            <FormField label="Admin notes">
              <Textarea rows={4} value={notes} onChange={(e) => setNotes(e.target.value)} />
            </FormField>
            <Button className="w-full" onClick={() => setDialog("approve")}>Approve</Button>
            <Button variant="secondary" className="w-full" onClick={() => setDialog("more-info")}>Request more information</Button>
            <Button variant="destructive" className="w-full" onClick={() => setDialog("reject")}>Reject</Button>
          </CardContent>
        </Card>
      </div>

      <ConfirmDialog open={dialog === "approve"} onOpenChange={() => setDialog(null)} title="Approve company?" description={`Verify ${company.name} after reviewing the submitted identity, registration and contact information.`} confirmLabel="Approve" onConfirm={() => { setStatus("Verified"); setDialog(null); }} />
      <ConfirmDialog open={dialog === "reject"} onOpenChange={() => setDialog(null)} title="Reject company?" description="The company will be notified." confirmLabel="Reject" variant="destructive" onConfirm={() => { setStatus("Rejected"); setDialog(null); }} />
      <ConfirmDialog open={dialog === "more-info"} onOpenChange={() => setDialog(null)} title="Request more info?" description="Additional business documents will be requested." confirmLabel="Send request" onConfirm={() => { setStatus("More Information Required"); setDialog(null); }} />
    </>
  );
}
