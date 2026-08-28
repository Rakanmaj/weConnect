"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Clock, CheckCircle2, AlertCircle, XCircle, FileText, Upload } from "lucide-react";
import { PageHeader } from "@/components/ui/common";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/developer/card";
import { StatusBadge } from "@/components/ui/status-badges";
import { ahmadAli } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

type Status = "pending" | "verified" | "more-info" | "rejected";

const STATUS_CONFIG: Record<
  Status,
  { label: string; badge: string; icon: typeof Clock; color: string; message: string }
> = {
  pending: {
    label: "Pending Verification",
    badge: "Pending Verification",
    icon: Clock,
    color: "text-amber-600 bg-amber-50",
    message: "Your profile is under review. We typically respond within 2–3 business days.",
  },
  verified: {
    label: "Verified",
    badge: "Verified",
    icon: CheckCircle2,
    color: "text-green-600 bg-green-50",
    message: "Your account is verified. You can access assessments, projects, and career features.",
  },
  "more-info": {
    label: "More Information Required",
    badge: "More Information Required",
    icon: AlertCircle,
    color: "text-orange-600 bg-orange-50",
    message: "We need additional documents to complete your verification.",
  },
  rejected: {
    label: "Rejected",
    badge: "Rejected",
    icon: XCircle,
    color: "text-red-600 bg-red-50",
    message: "Your verification was not approved. Review the feedback below and resubmit.",
  },
};

export default function VerificationPage() {
  const searchParams = useSearchParams();
  const status = (searchParams.get("status") as Status) || "verified";
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.verified;
  const Icon = config.icon;

  return (
    <div className="max-w-2xl mx-auto min-w-0">
      <PageHeader title="Account Verification" description="Track your verification status on WeConnect." />

      <Card className="text-center mb-6">
        <div className={cn("inline-flex h-16 w-16 items-center justify-center rounded-full mb-4", config.color)}>
          <Icon className="h-8 w-8" />
        </div>
        <StatusBadge status={config.badge} className="mb-3" />
        <p className="text-body-sm text-muted max-w-md mx-auto">{config.message}</p>

        {status === "verified" && (
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild>
              <Link href="/developer/career-path">Choose Career Path</Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link href="/developer/dashboard">Go to Dashboard</Link>
            </Button>
          </div>
        )}

        {status === "more-info" && (
          <div className="mt-6 text-left">
            <p className="text-sm font-medium text-foreground mb-2">Required:</p>
            <ul className="text-body-sm text-muted space-y-1 list-disc list-inside">
              <li>Clear photo of government ID</li>
              <li>Updated CV with recent experience</li>
            </ul>
            <Button className="mt-4">
              <Upload className="h-4 w-4" />
              Upload Documents
            </Button>
          </div>
        )}

        {status === "rejected" && (
          <div className="mt-6 text-left p-4 rounded-[6px] bg-red-50 border border-red-100">
            <p className="text-sm text-red-800">Profile information could not be verified. Ensure your name matches your ID and resubmit.</p>
            <Button variant="secondary" className="mt-4" asChild>
              <Link href="/developer/onboarding?step=1">Edit Profile</Link>
            </Button>
          </div>
        )}
      </Card>

      <Card>
        <h3 className="text-h4 text-foreground mb-4">Submitted Information</h3>
        <div className="space-y-3 text-sm">
          {[
            ["Name", ahmadAli.name],
            ["Email", ahmadAli.email],
            ["Location", ahmadAli.location],
            ["Preferred role", ahmadAli.preferredRole ?? ahmadAli.role],
          ].map(([k, v]) => (
            <div key={k} className="flex flex-col sm:flex-row sm:justify-between gap-1 min-w-0">
              <span className="text-muted">{k}</span>
              <span className="truncate">{v}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-2 text-sm text-muted">
          <FileText className="h-4 w-4 shrink-0" />
          <span className="truncate">Ahmad_Ali_CV.pdf — submitted Aug 18, 2026</span>
        </div>
      </Card>

      <div className="mt-6 flex flex-wrap gap-2">
        {(["pending", "verified", "more-info", "rejected"] as Status[]).map((s) => (
          <Link
            key={s}
            href={`/developer/verification?status=${s}`}
            className={cn(
              "text-xs px-3 py-1.5 rounded-[6px] border",
              status === s ? "border-primary bg-blue-50 text-primary" : "border-border text-muted hover:bg-surface"
            )}
          >
            {s}
          </Link>
        ))}
      </div>
    </div>
  );
}
