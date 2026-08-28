"use client";

import { notFound, useRouter } from "next/navigation";
import { use, useState } from "react";
import Link from "next/link";
import { ArrowLeft, FileText, Github, Linkedin, Globe } from "lucide-react";
import { PageHeader, FormField } from "@/components/ui/common";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { StatusBadge } from "@/components/ui/status-badges";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { Textarea } from "@/components/ui/textarea";
import { adminDeveloperQueue } from "@/lib/mock-data";
import type { VerificationStatus } from "@/types";

export default function AdminDeveloperVerificationDetailPage({
  params,
}: PageProps<"/admin/developer-verification/[id]">) {
  const { id } = use(params);
  const router = useRouter();
  const item = adminDeveloperQueue.find((q) => q.id === id);
  if (!item) notFound();

  const developer = item.developer;
  const pending = !developer.accountVerified;
  const [dialog, setDialog] = useState<"approve" | "reject" | "more-info" | null>(null);
  const [notes, setNotes] = useState(developer.adminNotes ?? "");
  const [status, setStatus] = useState<VerificationStatus>(developer.accountVerificationStatus);

  const confirm = (next: VerificationStatus) => {
    setStatus(next);
    setDialog(null);
  };

  return (
    <>
      <Link href="/admin/developer-verification" className="inline-flex items-center gap-1 text-body-sm text-muted hover:text-foreground mb-4">
        <ArrowLeft className="h-4 w-4" /> Back to queue
      </Link>

      <PageHeader
        title={developer.name}
        description={`Account verification review · Submitted ${item.submitted}`}
        action={<StatusBadge status={status} />}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4 mb-6">
                <Avatar name={developer.name} size="lg" />
                <div>
                  <p className="text-label text-foreground">Preferred role</p>
                  <p className="text-body-sm">{developer.preferredRole ?? developer.role}</p>
                  <p className="text-caption">{developer.location} · {developer.email}</p>
                </div>
              </div>
              {pending && (
                <p className="text-caption mb-4">
                  Overall level, skill levels, assessment results and project performance are not shown until the account is verified.
                </p>
              )}
              <dl className="grid sm:grid-cols-2 gap-4 text-body-sm">
                <div>
                  <dt className="text-caption">Phone</dt>
                  <dd>{developer.phone ?? "—"}</dd>
                </div>
                <div>
                  <dt className="text-caption">Availability</dt>
                  <dd>{developer.availability}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-caption">Bio</dt>
                  <dd>{developer.bio ?? "—"}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h2 className="text-h3 text-foreground mb-3">Education</h2>
              {developer.education?.length ? (
                <ul className="space-y-3">
                  {developer.education.map((ed) => (
                    <li key={ed.id} className="text-body-sm">
                      <p className="font-medium">{ed.degree} {ed.field}</p>
                      <p className="text-caption">{ed.institution} · {ed.startYear}–{ed.endYear}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-body-sm text-muted">No education submitted.</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h2 className="text-h3 text-foreground mb-3">Experience</h2>
              {developer.experience?.length ? (
                <ul className="space-y-3">
                  {developer.experience.map((ex) => (
                    <li key={ex.id} className="text-body-sm">
                      <p className="font-medium">{ex.title} · {ex.company}</p>
                      <p className="text-caption">{ex.startDate} – {ex.endDate}</p>
                      <p className="text-muted mt-1">{ex.summary}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-body-sm text-muted">No experience submitted.</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 space-y-3">
              <h2 className="text-h3 text-foreground mb-3">Links & CV</h2>
              <p className="flex items-center gap-2 text-body-sm"><FileText className="h-4 w-4" /> {developer.cvUrl ?? "No CV uploaded"}</p>
              <p className="flex items-center gap-2 text-body-sm"><Github className="h-4 w-4" /> {developer.github ?? "—"}</p>
              <p className="flex items-center gap-2 text-body-sm"><Linkedin className="h-4 w-4" /> {developer.linkedin ?? "—"}</p>
              <p className="flex items-center gap-2 text-body-sm"><Globe className="h-4 w-4" /> {developer.portfolio ?? "—"}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h2 className="text-h3 text-foreground mb-3">Certificates</h2>
              {developer.certificates?.length ? (
                <ul className="space-y-2 text-body-sm">
                  {developer.certificates.map((c) => (
                    <li key={c.id}>{c.name} — {c.issuer} ({c.issuedDate})</li>
                  ))}
                </ul>
              ) : (
                <p className="text-body-sm text-muted">No certificates uploaded.</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h2 className="text-h3 text-foreground mb-3">Supporting evidence ({developer.verificationDocuments?.length ?? 0})</h2>
              <ul className="space-y-2">
                {(developer.verificationDocuments ?? []).map((doc) => (
                  <li key={doc.id} className="flex items-center justify-between gap-3 text-body-sm border-b border-border py-2 last:border-0">
                    <span>{doc.name} · {doc.fileName}</span>
                    <StatusBadge status={doc.status} />
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardContent className="pt-6 space-y-3">
              <p className="text-caption">Verification status</p>
              <StatusBadge status={status} />
              <p className="text-caption">This is account verification, not WeConnect Verified.</p>
              <FormField label="Admin notes">
                <Textarea rows={4} value={notes} onChange={(e) => setNotes(e.target.value)} />
              </FormField>
              <Button className="w-full" onClick={() => setDialog("approve")}>Approve Developer Account</Button>
              <Button variant="secondary" className="w-full" onClick={() => setDialog("more-info")}>
                Request more information
              </Button>
              <Button variant="destructive" className="w-full" onClick={() => setDialog("reject")}>
                Reject
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <ConfirmDialog
        open={dialog === "approve"}
        onOpenChange={() => setDialog(null)}
        title="Approve developer account?"
        description={`Grant Account Verified status to ${developer.name}. This does not award WeConnect Verified. After approval they can choose a career path and take the initial assessment.`}
        confirmLabel="Grant Account Verified"
        onConfirm={() => {
          confirm("Verified");
          router.push("/admin/developer-verification");
        }}
      />
      <ConfirmDialog
        open={dialog === "reject"}
        onOpenChange={() => setDialog(null)}
        title="Reject account verification?"
        description="The developer will be notified with the rejection reason. This does not affect WeConnect Verified, which is earned later."
        confirmLabel="Reject"
        variant="destructive"
        onConfirm={() => confirm("Rejected")}
      />
      <ConfirmDialog
        open={dialog === "more-info"}
        onOpenChange={() => setDialog(null)}
        title="Request more information?"
        description="The developer will be asked to submit additional documents. Status will change to More Information Required."
        confirmLabel="Send request"
        onConfirm={() => confirm("More Information Required")}
      />
    </>
  );
}
