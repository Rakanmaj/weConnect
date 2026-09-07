"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { Building2, CheckCircle2, Clock, FileWarning, XCircle } from "lucide-react";
import { PageHeader } from "@/components/ui/common";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badges";
import { techFlowCompany } from "@/lib/mock-data";

const statusConfig = {
  pending: {
    title: "Verification in progress",
    description: "Your company profile is being reviewed by the WeConnect team. This typically takes 1–3 business days.",
    status: "Pending Verification" as const,
    icon: Clock,
    color: "text-amber-600 bg-amber-50",
  },
  verified: {
    title: "Company verified",
    description: "Your company is fully verified. You can post projects, hire developers, and access all platform features.",
    status: "Verified" as const,
    icon: CheckCircle2,
    color: "text-green-700 bg-green-50",
  },
  "more-info": {
    title: "More information required",
    description: "We need additional documents to complete your verification. Please upload your business registration certificate.",
    status: "More Information Required" as const,
    icon: FileWarning,
    color: "text-orange-700 bg-orange-50",
  },
  rejected: {
    title: "Verification rejected",
    description: "Your verification application was not approved. Contact support@weconnect.io for details.",
    status: "Rejected" as const,
    icon: XCircle,
    color: "text-red-700 bg-red-50",
  },
};

function VerificationContent() {
  const searchParams = useSearchParams();
  const statusKey = (searchParams.get("status") || "verified") as keyof typeof statusConfig;
  const config = statusConfig[statusKey] || statusConfig.verified;
  const Icon = config.icon;

  return (
    <>
      <PageHeader
        title="Company Verification"
        description="Verify your company to unlock full platform access."
      />

      <Card className="max-w-2xl">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-[10px] ${config.color}`}>
              <Icon className="h-6 w-6" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <h2 className="text-h3 text-foreground">{config.title}</h2>
                <StatusBadge status={config.status} />
              </div>
              <p className="text-body-sm text-muted">{config.description}</p>
            </div>
          </div>

          <div className="mt-6 rounded-[8px] border border-border bg-surface/50 p-4">
            <div className="flex items-center gap-3">
              <Building2 className="h-5 w-5 text-muted shrink-0" />
              <div>
                <p className="text-label text-foreground">{techFlowCompany.name}</p>
                <p className="text-caption">{techFlowCompany.industry} · {techFlowCompany.location}</p>
              </div>
            </div>
          </div>

          {statusKey === "more-info" && (
            <div className="mt-6">
              <Button asChild>
                <Link href="/company/verification?status=pending">Upload Demo Documents</Link>
              </Button>
            </div>
          )}

          {statusKey === "pending" && (
            <div className="mt-6">
              <Button asChild>
                <Link href="/company/verification?status=verified">Preview Approved State</Link>
              </Button>
            </div>
          )}

          {statusKey === "verified" && (
            <div className="mt-6">
              <Link href="/company/dashboard">
                <Button>Go to dashboard</Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>

      <p className="text-caption mt-6">
        Preview states:{" "}
        {(["pending", "verified", "more-info", "rejected"] as const).map((s) => (
          <Link key={s} href={`/company/verification?status=${s}`} className="text-primary hover:underline mr-2">
            {s}
          </Link>
        ))}
      </p>
    </>
  );
}

export default function CompanyVerificationPage() {
  return (
    <Suspense>
      <VerificationContent />
    </Suspense>
  );
}
