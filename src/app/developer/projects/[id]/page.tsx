"use client";

import Link from "next/link";
import { use, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Calendar,
  Upload,
  MessageSquare,
  Star,
  Activity,
  CheckCircle2,
} from "lucide-react";
import { PageHeader, SectionHeader } from "@/components/ui/common";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/developer/card";
import { StatusBadge, SkillBadge } from "@/components/ui/status-badges";
import { ProgressBar } from "@/components/ui/progress";
import {
  allDeveloperProjects,
  customerSupportProject,
  projectMilestones,
  developerProjectSubmissions,
  projectFeedback,
  projectActivity,
  ahmadAli,
} from "@/lib/mock-data";
import { PaidProjectGuard, ProjectFinancialSummary } from "@/components/shared/financial-summary";
import { assignmentDisplayStatus, getAssignmentForDeveloper } from "@/lib/assignments";

const TABS = ["overview", "requirements", "milestones", "submissions", "feedback", "evaluation", "activity"];

export default function ProjectWorkspacePage({
  params,
}: PageProps<"/developer/projects/[id]">) {
  const { id } = use(params);
  const searchParams = useSearchParams();
  const router = useRouter();
  const tab = searchParams.get("tab") || "overview";

  const project = allDeveloperProjects.find((p) => p.id === id) ?? { ...customerSupportProject, id };
  const assignment = getAssignmentForDeveloper(project, ahmadAli.id);
  const [extraSubmissions, setExtraSubmissions] = useState<{ id: string; title: string; date: string; status: string; score: number | null }[]>([]);

  return (
    <div className="min-w-0">
      <PageHeader
        breadcrumb={
          <Link href="/developer/projects?tab=active" className="text-caption text-primary hover:underline">
            ← Back to projects
          </Link>
        }
        title={project.title}
        description={`${project.company.name} · ${project.type}`}
        action={
          <Button size="sm" variant="secondary" onClick={() => router.push(`/developer/projects/${id}?tab=submissions`)}>
            <Upload className="h-4 w-4" />
            Submit Work
          </Button>
        }
      />

      <div className="flex flex-wrap items-center gap-3 mb-6">
        <StatusBadge status={assignment ? assignmentDisplayStatus(assignment) : project.state} />
        <span className="text-caption flex items-center gap-1">
          <Calendar className="h-3.5 w-3.5" />
          Due {project.deadline}
        </span>
        <ProgressBar value={assignment?.progress ?? 35} className="flex-1 min-w-[120px] max-w-xs" showLabel size="sm" />
      </div>

      <Tabs value={tab} onValueChange={(v) => router.push(`/developer/projects/${id}?tab=${v}`)}>
        <TabsList className="flex-wrap">
          {TABS.map((t) => (
            <TabsTrigger key={t} value={t} className="capitalize">
              {t}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="overview">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <SectionHeader title="Description" />
              <p className="text-body-sm text-muted">{project.description}</p>
              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div><span className="text-muted">Duration</span><p className="font-medium">{project.duration}</p></div>
                <div><span className="text-muted">Workload</span><p className="font-medium">{project.workload}</p></div>
                <div><span className="text-muted">Role</span><p className="font-medium">{project.role}</p></div>
                <div><span className="text-muted">Deadline</span><p className="font-medium">{project.deadline}</p></div>
              </div>
              <PaidProjectGuard type={project.type}>
                <div className="mt-6">
                  <ProjectFinancialSummary budget={project.budget} paymentStatus={project.paymentStatus} variant="developer" />
                </div>
              </PaidProjectGuard>
            </Card>
            <Card>
              <SectionHeader title="Technologies" />
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((t) => (
                  <SkillBadge key={t} name={t} level="Verified" verified />
                ))}
              </div>
              <SectionHeader title="Company" className="mt-6" />
              <p className="font-medium">{project.company.name}</p>
              <p className="text-body-sm text-muted">{project.company.about}</p>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="requirements">
          <Card>
            <ul className="space-y-3">
              {project.requirements.map((r, i) => (
                <li key={r} className="flex items-start gap-3 text-sm py-2 border-b border-border last:border-0">
                  <span className="h-6 w-6 rounded-full bg-surface flex items-center justify-center text-xs font-medium shrink-0">{i + 1}</span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </Card>
        </TabsContent>

        <TabsContent value="milestones">
          <div className="space-y-4">
            {projectMilestones.map((m) => (
              <Card key={m.id}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 min-w-0">
                  <div className="min-w-0">
                    <p className="font-medium truncate">{m.title}</p>
                    <p className="text-caption">Due {m.dueDate}</p>
                  </div>
                  <StatusBadge status={m.status === "In Progress" ? "Active" : m.status === "Completed" ? "Completed" : "Pending"} />
                </div>
                <ProgressBar value={m.progress} className="mt-3" size="sm" />
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="submissions">
          <div className="space-y-4">
            {[...developerProjectSubmissions, ...extraSubmissions].map((s) => (
              <Card key={s.id}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 min-w-0">
                  <div className="min-w-0">
                    <p className="font-medium truncate">{s.title}</p>
                    <p className="text-caption">{s.date}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    {s.score && <span className="text-sm font-medium text-teal">{s.score}%</span>}
                    <StatusBadge status={s.status === "Approved" ? "Completed" : s.status === "Submitted" ? "Submitted" : "Pending"} />
                  </div>
                </div>
              </Card>
            ))}
            <Button
              variant="secondary"
              onClick={() =>
                setExtraSubmissions((prev) => [
                  ...prev,
                  {
                    id: `new-${prev.length + 1}`,
                    title: "Latest work package",
                    date: new Date().toISOString().slice(0, 10),
                    status: "Submitted",
                    score: null,
                  },
                ])
              }
            >
              <Upload className="h-4 w-4" /> New Submission
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="feedback">
          {projectFeedback.map((f) => (
            <Card key={f.id}>
              <div className="flex items-start gap-3">
                <MessageSquare className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <p className="font-medium">{f.from}</p>
                  <p className="text-caption mb-2">{f.date}</p>
                  <p className="text-body-sm text-muted">{f.message}</p>
                  <div className="flex items-center gap-1 mt-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < f.rating ? "text-amber-400 fill-amber-400" : "text-gray-200"}`} />
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="evaluation">
          <Card>
            <div className="text-center py-8">
              <p className="text-h4 text-navy">Evaluation Pending</p>
              <p className="text-body-sm text-muted mt-2 max-w-md mx-auto">
                Company evaluation will be available after final submission and project completion.
              </p>
              <div className="mt-6 inline-flex items-center gap-2 text-sm text-muted">
                <CheckCircle2 className="h-4 w-4 text-teal" />
                Milestone 1 evaluated — 92%
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="activity">
          <Card padding={false}>
            <div className="divide-y divide-border">
              {projectActivity.map((a) => (
                <div key={a.id} className="flex items-start gap-3 p-4 min-w-0">
                  <Activity className="h-4 w-4 text-muted shrink-0 mt-0.5" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate">{a.action}</p>
                    <p className="text-caption truncate">{a.detail}</p>
                  </div>
                  <span className="text-caption shrink-0 whitespace-nowrap">{a.time}</span>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
