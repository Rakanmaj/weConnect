import Link from "next/link";
import { Code, ChevronRight } from "lucide-react";
import { PageHeader } from "@/components/ui/common";
import { Card } from "@/components/developer/card";
import { ProgressBar } from "@/components/ui/progress";
import { skillChallenges } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default function ChallengesPage() {
  return (
    <div className="min-w-0">
      <PageHeader
        title="Skill Challenges"
        description="Prove your skills through progressive challenges. Verified levels unlock project matching."
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {skillChallenges.map((s) => {
          const href = s.name === "React" ? "/developer/challenges/react?view=path" : "#";
          const pct = Math.round((s.completed / s.total) * 100);
          const isComplete = s.completed >= s.total;

          return (
            <Link key={s.name} href={href} className={cn(!href.startsWith("/") && "pointer-events-none")}>
              <Card className="h-full hover:border-primary/30 transition-colors">
                <div className="flex items-start justify-between gap-2 mb-4">
                  <div className="h-10 w-10 rounded-[6px] bg-blue-50 flex items-center justify-center shrink-0">
                    <Code className="h-5 w-5 text-primary" />
                  </div>
                  <span className={cn(
                    "text-xs font-medium px-2 py-0.5 rounded-[6px]",
                    s.level === "Master" ? "bg-teal/10 text-teal" : "bg-surface text-muted"
                  )}>
                    {s.level}
                  </span>
                </div>
                <h3 className="text-h4 text-foreground mb-1">{s.name}</h3>
                <p className="text-caption mb-4">
                  {isComplete ? "All challenges complete" : `Next: ${s.next}`}
                </p>
                <ProgressBar value={s.completed} max={s.total} size="sm" color={isComplete ? "success" : "teal"} />
                <p className="text-caption mt-2">{s.completed}/{s.total} completed · {pct}%</p>
                {href.startsWith("/") && (
                  <span className="inline-flex items-center gap-1 text-sm text-primary mt-4 font-medium">
                    Open path <ChevronRight className="h-4 w-4" />
                  </span>
                )}
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
