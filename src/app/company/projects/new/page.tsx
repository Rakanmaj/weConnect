"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Loader2, CheckCircle2 } from "lucide-react";
import { PageHeader, FormField } from "@/components/ui/common";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ProgressBar } from "@/components/ui/progress";
import { usePlatformSettings } from "@/lib/platform-settings";
import { formatCurrency, isPaidProjectType } from "@/lib/platform-config";
import { CAREER_PATHS } from "@/lib/platform-config";

const STEPS = [
  "Project type",
  "Role & skills",
  "Description",
  "Requirements",
  "Technologies",
  "Timeline",
  "Workload",
  "Budget",
  "Review",
  "Submit",
];

function WizardContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const step = Math.min(10, Math.max(1, Number(searchParams.get("step") || 1)));
  const [projectType, setProjectType] = useState("Paid Project");
  const [role, setRole] = useState("Full-Stack Developer");
  const [skills, setSkills] = useState("React, Node.js, PostgreSQL");
  const [title, setTitle] = useState("Customer Support Management Dashboard");
  const [description, setDescription] = useState("Build a customer support management dashboard that enables support teams to track tickets, assign agents, monitor SLA performance, and generate operational reports.");
  const [functional, setFunctional] = useState("Support agents can create, assign and resolve tickets\nManagers can monitor SLA performance\nRole-based views for agent, lead and admin");
  const [technical, setTechnical] = useState("React dashboard with authenticated sessions\nNode.js REST API backed by PostgreSQL\nResponsive layout for desktop and tablet");
  const [deliverables, setDeliverables] = useState("Deployed preview\nTechnical summary\nDemo recording");
  const [technologies, setTechnologies] = useState("React, Node.js, PostgreSQL, REST APIs");
  const [duration, setDuration] = useState("3 Weeks");
  const [deadline, setDeadline] = useState("2026-09-15");
  const [difficulty, setDifficulty] = useState("Intermediate");
  const [workload, setWorkload] = useState("20–25 hours per week");
  const [budget, setBudget] = useState(5800);
  const [phase, setPhase] = useState<"form" | "processing" | "done">("form");
  const { financialsFor, settings } = usePlatformSettings();
  const financials = useMemo(() => financialsFor(Number(budget) || 0), [budget, financialsFor]);

  const goToStep = (s: number) => router.push(`/company/projects/new?step=${s}`);

  if (phase === "processing" || phase === "done") {
    return (
      <>
        <PageHeader title="AI Analysis" description="Analyzing project requirements and generating Top 4 matches." />
        <Card className="max-w-xl">
          <CardContent className="pt-6 text-center">
            {phase === "processing" ? (
              <Loader2 className="h-10 w-10 text-primary animate-spin mx-auto mb-4" />
            ) : (
              <CheckCircle2 className="h-10 w-10 text-teal mx-auto mb-4" />
            )}
            <ol className="text-left space-y-2 text-body-sm mb-6">
              {["Project submitted", "AI analyzes requirements", "Structured requirements generated", "Eligible developers scored", "Top 4 selected", "Ready for company invitations"].map((label, i) => (
                <li key={label} className={i < (phase === "done" ? 6 : 3) ? "text-teal" : "text-muted"}>{label}</li>
              ))}
            </ol>
            {phase === "done" && (
              <Button onClick={() => router.push("/company/projects/proj-inv-1/matches")}>
                Review & invite Top 4
              </Button>
            )}
          </CardContent>
        </Card>
      </>
    );
  }

  return (
    <>
      <PageHeader
        title="Create project"
        description={`Step ${step} of 10 — ${STEPS[step - 1]}`}
      />

      <ProgressBar value={step} max={10} showLabel className="mb-8" />

      <Card className="max-w-2xl">
        <CardContent className="pt-6">
          {step === 1 && (
            <div className="space-y-3">
              <FormField label="Project title" required>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} />
              </FormField>
              <p className="text-label text-foreground mb-4">Project type</p>
              {["Training Project", "Paid Project", "Hiring Challenge"].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setProjectType(type)}
                  className={`w-full rounded-[8px] border p-4 text-left transition-colors ${
                    projectType === type ? "border-primary bg-blue-50" : "border-border hover:bg-surface"
                  }`}
                >
                  <p className="text-label text-foreground">{type}</p>
                  <p className="text-caption mt-1">
                    {type === "Training Project" && "Skill-building project with no paid-project payout"}
                    {type === "Paid Project" && "Real deliverable. Payment is processed if the company purchases a successfully completed submission."}
                    {type === "Hiring Challenge" && "Evaluate candidates through a scoped challenge"}
                  </p>
                </button>
              ))}
            </div>
          )}

          {step === 2 && (
            <>
              <FormField label="Required developer type" required>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="flex h-11 w-full rounded-[6px] border border-border bg-card px-3 text-sm"
                >
                  {CAREER_PATHS.map((path) => (
                    <option key={path}>{path}</option>
                  ))}
                </select>
              </FormField>
              <FormField label="Required skills" helper="Comma-separated" required>
                <Input value={skills} onChange={(e) => setSkills(e.target.value)} />
              </FormField>
            </>
          )}

          {step === 3 && (
            <FormField label="Project description" required>
              <Textarea rows={5} value={description} onChange={(e) => setDescription(e.target.value)} />
            </FormField>
          )}

          {step === 4 && (
            <>
              <FormField label="Functional requirements" helper="One per line" required>
                <Textarea rows={5} value={functional} onChange={(e) => setFunctional(e.target.value)} />
              </FormField>
              <FormField label="Technical requirements" helper="One per line" required>
                <Textarea rows={5} value={technical} onChange={(e) => setTechnical(e.target.value)} />
              </FormField>
              <FormField label="Expected deliverables" required>
                <Textarea rows={4} value={deliverables} onChange={(e) => setDeliverables(e.target.value)} />
              </FormField>
            </>
          )}

          {step === 5 && (
            <FormField label="Required technologies" required>
              <Input value={technologies} onChange={(e) => setTechnologies(e.target.value)} />
            </FormField>
          )}

          {step === 6 && (
            <>
              <FormField label="Duration" helper="Intended model is 2–4 weeks" required>
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="flex h-11 w-full rounded-[6px] border border-border bg-card px-3 text-sm"
                >
                  <option>2 Weeks</option>
                  <option>3 Weeks</option>
                  <option>4 Weeks</option>
                </select>
              </FormField>
              <FormField label="Deadline" required>
                <Input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
              </FormField>
            </>
          )}

          {step === 7 && (
            <>
              <FormField label="Difficulty / complexity" required>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="flex h-11 w-full rounded-[6px] border border-border bg-card px-3 text-sm"
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </FormField>
              <FormField label="Estimated weekly workload" required>
                <Input value={workload} onChange={(e) => setWorkload(e.target.value)} />
              </FormField>
            </>
          )}

          {step === 8 && (
            <>
              {isPaidProjectType(projectType) ? (
                <>
                  <FormField label="Project budget (USD)" required helper="This is the total project budget. WeConnect commission is taken from this amount, not added on top.">
                    <Input type="number" value={budget} onChange={(e) => setBudget(Number(e.target.value))} />
                  </FormField>
                  <div className="rounded-[8px] border border-border p-4 space-y-2 text-body-sm mb-4">
                    <div className="flex justify-between"><span className="text-muted">Project Budget</span><span>{formatCurrency(financials.budget)}</span></div>
                    <div className="flex justify-between"><span className="text-muted">Developer payout if selected submission is purchased</span><span>{formatCurrency(financials.developerPayout)}</span></div>
                    <div className="flex justify-between"><span className="text-muted">WeConnect Platform Commission ({settings.projectCommissionPercentage}%)</span><span>{formatCurrency(financials.commissionAmount)}</span></div>
                    <div className="flex justify-between font-medium pt-2 border-t border-border"><span>Total Project Budget</span><span>{formatCurrency(financials.budget)}</span></div>
                  </div>
                  <p className="text-caption">Payment is processed when the company purchases the selected completed project.</p>
                </>
              ) : (
                <p className="text-body-sm text-muted">
                  {projectType} does not use the paid-project commission model. No developer payout is shown.
                </p>
              )}
            </>
          )}

          {step === 9 && (
            <div className="space-y-4">
              <p className="text-body-sm text-muted">Review the project. Top 4 matches are generated only after you submit for AI analysis.</p>
              <dl className="grid gap-2 text-body-sm">
                <div className="flex justify-between"><dt className="text-muted">Title</dt><dd className="text-foreground">{title}</dd></div>
                <div className="flex justify-between"><dt className="text-muted">Type</dt><dd className="text-foreground">{projectType}</dd></div>
                <div className="flex justify-between"><dt className="text-muted">Role</dt><dd className="text-foreground">{role}</dd></div>
                <div className="flex justify-between"><dt className="text-muted">Duration</dt><dd className="text-foreground">{duration}</dd></div>
                <div className="flex justify-between"><dt className="text-muted">Difficulty</dt><dd className="text-foreground">{difficulty}</dd></div>
                {isPaidProjectType(projectType) && (
                  <div className="flex justify-between"><dt className="text-muted">Budget</dt><dd className="text-foreground">{formatCurrency(financials.budget)}</dd></div>
                )}
              </dl>
            </div>
          )}

          {step === 10 && (
            <div className="space-y-4">
              <p className="text-body-sm text-muted">
                Submit this project to start AI analysis. You will review the Top 4 matches, then invite them to the project. Interview requests are a later hiring step — not part of matching.
              </p>
            </div>
          )}

          <div className="flex justify-between mt-8 pt-6 border-t border-border">
            <Button
              variant="secondary"
              disabled={step <= 1}
              onClick={() => goToStep(step - 1)}
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </Button>
            {step < 10 ? (
              <Button onClick={() => goToStep(step + 1)}>
                Continue
                <ChevronRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={() => {
                  setPhase("processing");
                  setTimeout(() => setPhase("done"), 2200);
                }}
              >
                Submit project
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default function NewProjectPage() {
  return (
    <Suspense>
      <WizardContent />
    </Suspense>
  );
}
