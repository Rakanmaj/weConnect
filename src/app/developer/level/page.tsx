import Link from "next/link";
import { CheckCircle2, Circle, ArrowRight } from "lucide-react";
import { PageHeader, SectionHeader } from "@/components/ui/common";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/developer/card";
import { LevelBadge } from "@/components/ui/status-badges";
import { ProgressBar } from "@/components/ui/progress";
import { LEVELS } from "@/lib/constants";
import { ahmadAli } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import type { OverallLevel } from "@/types";

const LEVEL_REQUIREMENTS: Record<OverallLevel, string[]> = {
  1: ["Complete onboarding", "Pass account verification"],
  2: ["Complete platform assessment", "Pass 2 skill challenges"],
  3: ["Complete 3+ real projects", "Maintain 90%+ reliability", "Receive company evaluations"],
  4: ["Complete 5+ real projects", "WeConnect Verified status", "Consistent Level 3+ performance"],
};

export default function LevelPage() {
  const current = ahmadAli.overallLevel;

  return (
    <div className="min-w-0 space-y-8">
      <PageHeader
        title="Level Progression"
        description="Your platform level reflects verified assessments, projects, and performance."
      />

      <Card>
        <LevelBadge level={current} showDescription />
        <ProgressBar value={72} showLabel className="mt-6" color="teal" />
        <p className="text-caption mt-2">72% progress toward Level 4 — Advanced</p>
      </Card>

      <SectionHeader title="All Levels" />
      <div className="space-y-4">
        {([1, 2, 3, 4] as OverallLevel[]).map((level) => {
          const info = LEVELS[level];
          const achieved = level <= current;
          const isCurrent = level === current;

          return (
            <Card
              key={level}
              className={cn(isCurrent && "border-primary ring-1 ring-primary/20")}
            >
              <div className="flex flex-col sm:flex-row gap-4 min-w-0">
                <div className={cn(
                  "h-12 w-12 rounded-full flex items-center justify-center shrink-0 text-lg font-bold",
                  achieved ? "bg-teal text-white" : "bg-surface text-muted"
                )}>
                  {achieved ? <CheckCircle2 className="h-6 w-6" /> : level}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h3 className="text-h4 text-foreground">Level {level} — {info.label}</h3>
                    {isCurrent && (
                      <span className="text-xs px-2 py-0.5 rounded-[6px] bg-primary text-white">Current</span>
                    )}
                    {achieved && !isCurrent && (
                      <span className="text-xs px-2 py-0.5 rounded-[6px] bg-teal/10 text-teal">Achieved</span>
                    )}
                  </div>
                  <p className="text-body-sm text-muted mb-3">{info.description}</p>
                  <ul className="space-y-1.5">
                    {LEVEL_REQUIREMENTS[level].map((req) => (
                      <li key={req} className="flex items-center gap-2 text-sm">
                        {achieved ? (
                          <CheckCircle2 className="h-4 w-4 text-teal shrink-0" />
                        ) : (
                          <Circle className="h-4 w-4 text-gray-300 shrink-0" />
                        )}
                        <span className={achieved ? "text-muted" : ""}>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-3">
        <Button asChild>
          <Link href="/developer/assessment?view=intro">Retake Assessment <ArrowRight className="h-4 w-4" /></Link>
        </Button>
        <Button variant="secondary" asChild>
          <Link href="/developer/verified">WeConnect Verified</Link>
        </Button>
      </div>
    </div>
  );
}
