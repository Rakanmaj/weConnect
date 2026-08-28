"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Clock, Flag, Play, CheckCircle2 } from "lucide-react";
import { PageHeader } from "@/components/ui/common";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/developer/card";
import { ProgressBar } from "@/components/ui/progress";
import { assessmentQuestions } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default function AssessmentPage() {
  const searchParams = useSearchParams();
  const view = searchParams.get("view") || "intro";
  const answered = assessmentQuestions.filter((q) => q.answered).length;

  if (view === "intro") {
    return (
      <div className="max-w-3xl mx-auto min-w-0">
        <PageHeader
          title="Platform Assessment"
          description="Demonstrate your full-stack capabilities across coding, debugging, and architecture."
        />
        <Card>
          <div className="space-y-6">
            <div>
              <h2 className="text-h3 text-foreground mb-2">Full-Stack Developer Assessment</h2>
              <p className="text-body-sm text-muted">
                This assessment evaluates your skills across React, JavaScript, Node.js, REST APIs, and system design.
                Your result determines your platform level (Level 1–4).
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { label: "Duration", value: "90 min" },
                { label: "Questions", value: "6" },
                { label: "Format", value: "Mixed" },
              ].map(({ label, value }) => (
                <div key={label} className="p-4 rounded-[6px] bg-surface text-center min-w-0">
                  <p className="text-h4 text-foreground">{value}</p>
                  <p className="text-caption">{label}</p>
                </div>
              ))}
            </div>
            <ul className="text-body-sm text-muted space-y-2">
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-teal shrink-0 mt-0.5" />Coding challenges with live test cases</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-teal shrink-0 mt-0.5" />Multiple choice and debugging sections</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-teal shrink-0 mt-0.5" />Architecture and explanation questions</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-teal shrink-0 mt-0.5" />AI follow-up questions after coding submissions to test understanding</li>
            </ul>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild>
                <Link href="/developer/assessment?view=exam">
                  <Play className="h-4 w-4" />
                  Start Assessment
                </Link>
              </Button>
              <Button variant="secondary" asChild>
                <Link href="/developer/dashboard">Back to Dashboard</Link>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-w-0 -mx-4 lg:-mx-8">
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-8rem)]">
        {/* Question nav */}
        <aside className="lg:w-56 shrink-0 border-b lg:border-b-0 lg:border-r border-border bg-card p-4 overflow-x-auto lg:overflow-y-auto">
          <div className="flex lg:flex-col gap-2">
            {assessmentQuestions.map((q, i) => (
              <button
                key={q.id}
                className={cn(
                  "flex items-center gap-2 rounded-[6px] px-3 py-2 text-left text-sm min-w-[140px] lg:min-w-0 shrink-0 lg:shrink",
                  i === 3 ? "bg-primary text-white" : q.answered ? "bg-teal/10 text-teal" : "hover:bg-surface"
                )}
              >
                <span className="font-medium shrink-0">Q{q.id}</span>
                <span className="truncate hidden sm:inline">{q.title}</span>
                {q.flagged && <Flag className="h-3 w-3 ml-auto shrink-0" />}
              </button>
            ))}
          </div>
        </aside>

        {/* Code editor */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 border-b border-border bg-card">
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground truncate">Q4 — REST API Endpoint</p>
              <ProgressBar value={answered} max={assessmentQuestions.length} size="sm" className="mt-2 max-w-xs" />
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-foreground shrink-0">
              <Clock className="h-4 w-4 text-muted" />
              <span className="tabular-nums">58:24</span>
            </div>
          </div>

          <div className="p-4 bg-card border-b border-border">
            <p className="text-body-sm text-muted mb-2">
              Implement a GET endpoint that returns paginated support tickets filtered by status.
            </p>
          </div>

          <div className="flex-1 code-editor p-4 overflow-auto min-h-[200px]">
            <pre className="whitespace-pre-wrap break-words">{`// Implement GET /api/tickets
export async function getTickets(req, res) {
  const { status, page = 1, limit = 20 } = req.query;
  
  // TODO: Query PostgreSQL with filters
  // TODO: Return { data, total, page, limit }
  
}`}</pre>
          </div>

          <div className="flex flex-wrap gap-3 p-4 border-t border-border bg-card">
            <Button variant="secondary" size="sm">Previous</Button>
            <Button variant="secondary" size="sm"><Flag className="h-3 w-3" /> Flag</Button>
            <Button size="sm" className="ml-auto" asChild>
              <Link href="/developer/assessment/processing">Submit Assessment</Link>
            </Button>
          </div>
        </div>

        {/* Tests panel */}
        <aside className="lg:w-72 shrink-0 border-t lg:border-t-0 lg:border-l border-border bg-card p-4">
          <h3 className="text-sm font-medium text-foreground mb-3">Test Cases</h3>
          <div className="space-y-3">
            {[
              { name: "Returns paginated results", pass: true },
              { name: "Filters by status", pass: true },
              { name: "Handles invalid page param", pass: false },
              { name: "Returns correct total count", pass: false },
            ].map((t) => (
              <div key={t.name} className="flex items-start gap-2 text-sm min-w-0">
                <span className={cn("h-2 w-2 rounded-full mt-1.5 shrink-0", t.pass ? "bg-success" : "bg-gray-300")} />
                <span className="truncate">{t.name}</span>
              </div>
            ))}
          </div>
          <Button variant="secondary" size="sm" className="w-full mt-4">Run Tests</Button>
        </aside>
      </div>
    </div>
  );
}
