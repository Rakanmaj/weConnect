"use client";

import Link from "next/link";
import { CheckCircle2, Circle, BadgeCheck } from "lucide-react";
import { PageHeader, SectionHeader } from "@/components/ui/common";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/developer/card";
import { VerifiedBadge } from "@/components/ui/verified-badge";
import { ProgressBar } from "@/components/ui/progress";
import { ahmadAli } from "@/lib/mock-data";
import { usePlatformSettings } from "@/lib/platform-settings";
import { cn } from "@/lib/utils";

export default function VerifiedPage() {
  const { settings } = usePlatformSettings();
  const criteria = [
    { label: "Account verified", met: ahmadAli.accountVerified },
    { label: "Initial assessment completed", met: Boolean(ahmadAli.assessmentCompleted) },
    {
      label: `${settings.weconnectVerifiedMinInternalProjects} successful internal projects`,
      met: ahmadAli.internalProjectsCompleted >= settings.weconnectVerifiedMinInternalProjects,
      current: ahmadAli.internalProjectsCompleted,
      required: settings.weconnectVerifiedMinInternalProjects,
    },
    {
      label: `${settings.weconnectVerifiedMinReliability}%+ reliability`,
      met: ahmadAli.reliability >= settings.weconnectVerifiedMinReliability,
    },
    {
      label: `Average project performance ${settings.weconnectVerifiedMinAverageScore}%+`,
      met: ahmadAli.averageScore >= settings.weconnectVerifiedMinAverageScore,
    },
    { label: "Verified skills on the chosen career path", met: ahmadAli.skills.some((s) => s.verified) },
    {
      label: `${settings.weconnectVerifiedMinCompanyEvaluations}+ company evaluations`,
      met: ahmadAli.companyEvaluations >= settings.weconnectVerifiedMinCompanyEvaluations,
    },
    { label: "Platform integrity in good standing", met: ahmadAli.accountVerificationStatus !== "Suspended" },
  ];
  const metCount = criteria.filter((c) => c.met).length;

  return (
    <div className="min-w-0 space-y-8">
      <PageHeader
        title="WeConnect Verified"
        description="Earned performance status. Separate from Account Verified, which is the earlier administrative review."
      />

      <Card className="text-center">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-teal/10 mb-4">
          <BadgeCheck className="h-10 w-10 text-teal" />
        </div>
        <VerifiedBadge type="weconnect" className="text-base justify-center" />
        <p className="text-body-sm text-muted mt-3 max-w-md mx-auto">
          Ahmad Ali has earned WeConnect Verified through successful internal projects, reliability, project performance, verified skills and platform integrity — not only account verification.
        </p>
        <ProgressBar value={metCount} max={criteria.length} showLabel className="mt-6 max-w-sm mx-auto" color="teal" />
        <p className="text-caption mt-2">{metCount}/{criteria.length} criteria met</p>
      </Card>

      <SectionHeader title="Verification Criteria" />
      <div className="space-y-3">
        {criteria.map((c) => (
          <Card key={c.label} padding={false} className="p-4">
            <div className="flex items-center gap-4 min-w-0">
              {c.met ? (
                <CheckCircle2 className="h-5 w-5 text-teal shrink-0" />
              ) : (
                <Circle className="h-5 w-5 text-gray-300 shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <p className={cn("font-medium", c.met ? "text-foreground" : "text-muted")}>{c.label}</p>
                {"current" in c && c.current !== undefined && (
                  <p className="text-caption">{c.current}/{c.required} completed</p>
                )}
              </div>
              {c.met && <span className="text-xs text-teal font-medium shrink-0">Complete</span>}
            </div>
          </Card>
        ))}
      </div>

      <Card>
        <SectionHeader title="Internal Projects Progress" description={`${ahmadAli.internalProjectsCompleted}/${settings.weconnectVerifiedMinInternalProjects} internal projects completed`} />
        <ProgressBar value={ahmadAli.internalProjectsCompleted} max={settings.weconnectVerifiedMinInternalProjects} showLabel color="success" />
        <Button variant="secondary" className="mt-4" asChild>
          <Link href="/developer/internal-projects">Browse Internal Projects</Link>
        </Button>
      </Card>
    </div>
  );
}
