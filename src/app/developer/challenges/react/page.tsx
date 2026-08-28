"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Circle, Play, Trophy, Clock } from "lucide-react";
import { PageHeader } from "@/components/ui/common";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/developer/card";
import { ProgressBar } from "@/components/ui/progress";
import { reactChallengePath } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default function ReactChallengePage() {
  const searchParams = useSearchParams();
  const view = searchParams.get("view") || "path";

  if (view === "challenge") {
    return (
      <div className="min-w-0">
        <PageHeader
          breadcrumb={
            <Link href="/developer/challenges/react?view=path" className="text-caption text-primary hover:underline">
              ← React Skill Path
            </Link>
          }
          title="Architecture Challenge"
          description="Design a scalable component architecture for a dashboard with real-time updates."
        />

        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <p className="text-body-sm text-muted mb-4">
              Build a React component tree for a customer support dashboard that handles ticket lists,
              filters, and real-time status updates via WebSocket.
            </p>
            <div className="code-editor rounded-[6px] p-4 min-h-[280px] overflow-auto">
              <pre>{`// Design your component architecture
// TicketDashboard
//   ├── TicketFilters
//   ├── TicketList
//   │     └── TicketCard
//   └── TicketDetailPanel

export function TicketDashboard() {
  // Your implementation
}`}</pre>
            </div>
            <div className="flex flex-wrap gap-3 mt-4">
              <Button>Submit Solution</Button>
              <Button variant="secondary">Run Tests</Button>
            </div>
          </Card>
          <Card>
            <h3 className="text-sm font-medium mb-3">Test Cases</h3>
            <div className="space-y-2 text-sm">
              {["Component separation", "State management", "Real-time updates", "Performance"].map((t) => (
                <div key={t} className="flex items-center gap-2">
                  <Circle className="h-3 w-3 text-gray-300" />
                  <span>{t}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 mt-4 text-sm text-muted">
              <Clock className="h-4 w-4" />
              <span>45:00 remaining</span>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (view === "result") {
    return (
      <div className="max-w-lg mx-auto min-w-0">
        <Card className="text-center">
          <Trophy className="h-12 w-12 text-teal mx-auto mb-4" />
          <p className="text-h3 text-foreground">Challenge Passed!</p>
          <p className="text-h2 text-teal tabular-nums mt-2">88%</p>
          <p className="text-body-sm text-muted mt-1">React — Master level unlocked</p>
          <ProgressBar value={100} className="mt-6" color="success" showLabel />
          <div className="flex flex-col sm:flex-row gap-3 mt-8 justify-center">
            <Button asChild>
              <Link href="/developer/skills">View Skills</Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link href="/developer/challenges/react?view=path">Back to Path</Link>
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-w-0">
      <PageHeader
        breadcrumb={
          <Link href="/developer/challenges" className="text-caption text-primary hover:underline">
            ← All Challenges
          </Link>
        }
        title="React Skill Path"
        description="Progress through challenges to earn verified React credentials."
        action={
          <Button size="sm" asChild>
            <Link href="/developer/challenges/react?view=challenge">
              <Play className="h-4 w-4" />
              Current Challenge
            </Link>
          </Button>
        }
      />

      <Card className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-caption">Current Level</p>
            <p className="text-h3 text-foreground">Master</p>
          </div>
          <ProgressBar value={4} max={5} showLabel className="sm:max-w-xs flex-1" color="teal" />
        </div>
      </Card>

      <div className="space-y-3">
        {reactChallengePath.map((step, i) => (
          <Card
            key={step.id}
            className={cn(step.current && "border-primary ring-1 ring-primary/20")}
          >
            <div className="flex items-center gap-4 min-w-0">
              <div className={cn(
                "h-10 w-10 rounded-full flex items-center justify-center shrink-0",
                step.completed ? "bg-teal/10 text-teal" : step.current ? "bg-primary text-white" : "bg-surface text-muted"
              )}>
                {step.completed ? <CheckCircle2 className="h-5 w-5" /> : <span className="text-sm font-medium">{i + 1}</span>}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{step.title}</p>
                <p className="text-caption">{step.level}</p>
              </div>
              {step.current && (
                <Button size="sm" asChild className="shrink-0">
                  <Link href="/developer/challenges/react?view=challenge">Start</Link>
                </Button>
              )}
              {step.completed && !step.current && (
                <Button size="sm" variant="ghost" asChild className="shrink-0">
                  <Link href="/developer/challenges/react?view=result">Review</Link>
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
