import Link from "next/link";
import { PageHeader, SectionHeader } from "@/components/ui/common";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/developer/card";
import { LevelBadge } from "@/components/ui/status-badges";
import { ProgressBar } from "@/components/ui/progress";
import { assessmentResults } from "@/lib/mock-data";

export default function AssessmentResultsPage() {
  return (
    <div className="max-w-3xl mx-auto min-w-0">
      <PageHeader
        title="Assessment Results"
        description={`Completed on ${assessmentResults.passedAt}`}
        action={
          <Button variant="secondary" asChild>
            <Link href="/developer/dashboard">Dashboard</Link>
          </Button>
        }
      />

      <Card className="mb-6 text-center">
        <p className="text-caption mb-2">Your Platform Level</p>
        <div className="flex justify-center mb-2">
          <LevelBadge level={assessmentResults.overallLevel} showDescription />
        </div>
        <p className="text-h2 text-foreground tabular-nums">{assessmentResults.score}%</p>
        <p className="text-body-sm text-muted mt-1">Overall assessment score</p>
      </Card>

      <SectionHeader title="Skill Breakdown" description="Performance across assessed skill areas." />
      <div className="space-y-4">
        {assessmentResults.skillBreakdown.map((s) => (
          <Card key={s.skill} padding={false} className="p-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 min-w-0">
              <div className="min-w-0">
                <p className="font-medium text-foreground truncate">{s.skill}</p>
                <p className="text-caption">{s.level}</p>
              </div>
              <span className="text-h4 text-foreground tabular-nums shrink-0">{s.score}%</span>
            </div>
            <ProgressBar value={s.score} color={s.score >= 80 ? "teal" : "primary"} />
          </Card>
        ))}
      </div>

      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <Button asChild>
          <Link href="/developer/challenges">Start Skill Challenges</Link>
        </Button>
        <Button variant="secondary" asChild>
          <Link href="/developer/level">View Level Progression</Link>
        </Button>
      </div>
    </div>
  );
}
