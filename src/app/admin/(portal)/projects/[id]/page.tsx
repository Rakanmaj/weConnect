"use client";

import { notFound } from "next/navigation";
import { use } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PageHeader } from "@/components/ui/common";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/ui/status-badges";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar } from "@/components/ui/avatar";
import { ProgressBar } from "@/components/ui/progress";
import { adminProjectsList, projectActivityTimeline, projectSubmissions, developerEvaluations } from "@/lib/mock-data";
import {
  assignmentDisplayStatus,
  getAcceptedAssignments,
  getMatchedAssignments,
} from "@/lib/assignments";
import { useProjectFinancials } from "@/lib/platform-settings";
import { formatCurrency, isPaidProjectType } from "@/lib/platform-config";
import { ActivityFeed } from "@/components/shared/timeline";

export default function AdminProjectDetailPage({ params }: PageProps<"/admin/projects/[id]">) {
  const { id } = use(params);
  const project = adminProjectsList.find((p) => p.id === id);
  if (!project) notFound();

  const matches = getMatchedAssignments(project);
  const accepted = getAcceptedAssignments(project);
  const financials = useProjectFinancials(project.budget ?? 0);
  const daysRemaining = Math.ceil((new Date(project.deadline).getTime() - Date.now()) / 86400000);
  const overdue = daysRemaining < 0 && project.state === "In Progress";

  return (
    <>
      <Link href="/admin/projects" className="inline-flex items-center gap-1 text-body-sm text-muted hover:text-foreground mb-4">
        <ArrowLeft className="h-4 w-4" /> Back to projects
      </Link>
      <PageHeader
        title={project.title}
        description={`${project.company.name} · ${project.type}`}
        action={<StatusBadge status={project.state} />}
      />

      <Tabs defaultValue="overview">
        <TabsList className="flex-wrap">
          {["overview", "matched", "progress", "submissions", "evaluations", "payments", "activity"].map((tab) => (
            <TabsTrigger key={tab} value={tab} className="capitalize">{tab === "matched" ? "Matched Developers" : tab}</TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardContent className="pt-6 grid sm:grid-cols-2 gap-4 text-body-sm">
                <div><p className="text-caption">Project</p><p className="text-label">{project.title}</p></div>
                <div><p className="text-caption">Company</p><p className="text-label">{project.company.name}</p></div>
                <div><p className="text-caption">Type</p><p className="text-label">{project.type}</p></div>
                <div><p className="text-caption">Required role</p><p className="text-label">{project.role}</p></div>
                <div><p className="text-caption">Duration</p><p className="text-label">{project.duration}</p></div>
                <div><p className="text-caption">Deadline</p><p className="text-label">{project.deadline}</p></div>
                <div><p className="text-caption">Overall state</p><StatusBadge status={project.state} /></div>
                <div><p className="text-caption">Last activity</p><p className="text-label">{project.lastActivity ?? "—"}</p></div>
                <div className="sm:col-span-2">
                  <p className="text-caption mb-2">Technologies</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((t) => <Badge key={t} size="sm">{t}</Badge>)}
                  </div>
                </div>
                {isPaidProjectType(project.type) && project.budget != null && (
                  <>
                    <div><p className="text-caption">Budget</p><p className="text-label">{formatCurrency(project.budget)}</p></div>
                    <div><p className="text-caption">WeConnect Commission</p><p className="text-label">{financials.commissionPercentage}% — {formatCurrency(financials.commissionAmount)}</p></div>
                    <div><p className="text-caption">Developer payout if purchased</p><p className="text-label">{formatCurrency(financials.developerPayout)}</p></div>
                    <div><p className="text-caption">Payment status</p><StatusBadge status={project.paymentStatus ?? "Pending"} /></div>
                  </>
                )}
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-caption">Evaluator</p>
                <p className="text-label">{project.evaluator?.name ?? "Unassigned"}</p>
                <div className="mt-4 space-y-2">
                  {(project.reviewStages ?? []).map((s) => (
                    <div key={s.id} className="flex justify-between text-body-sm">
                      <span>{s.label}</span>
                      <StatusBadge status={s.status} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="matched">
          <Card className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b border-border bg-surface/50">
                  {["Developer", "Match", "Invitation", "Work Status", "Progress", "Submission", "Evaluation"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-table-header">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {matches.map((a) => (
                  <tr key={a.id} className="border-b border-border">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Avatar name={a.developer.name} size="sm" />
                        {a.developer.name}
                      </div>
                    </td>
                    <td className="px-4 py-3 tabular-nums">{a.matchScore}%</td>
                    <td className="px-4 py-3"><StatusBadge status={a.invitationStatus === "Invited" ? "Invitation Sent" : a.invitationStatus} /></td>
                    <td className="px-4 py-3">{a.workStatus ? <StatusBadge status={a.workStatus} /> : "—"}</td>
                    <td className="px-4 py-3">{a.invitationStatus === "Declined" ? "—" : `${a.progress}%`}</td>
                    <td className="px-4 py-3">{a.submissionStatus === "Not Submitted" ? "—" : a.submissionStatus}</td>
                    <td className="px-4 py-3">{a.evaluationStatus === "Not Started" ? "—" : a.evaluationStatus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </TabsContent>

        <TabsContent value="progress">
          <div className="grid gap-4 lg:grid-cols-2">
            {accepted.map((a) => (
              <Card key={a.id}>
                <CardContent className="pt-6">
                  <div className="flex justify-between mb-3">
                    <p className="text-label">{a.developer.name}</p>
                    <StatusBadge status={assignmentDisplayStatus(a)} />
                  </div>
                  <ProgressBar value={a.progress} showLabel />
                  <dl className="grid grid-cols-2 gap-3 mt-4 text-body-sm">
                    <div><p className="text-caption">Last update</p><p>{a.lastUpdate ?? "—"}</p></div>
                    <div><p className="text-caption">Deadline</p><p>{project.deadline}</p></div>
                    <div><p className="text-caption">Days remaining</p><p>{overdue ? "Overdue" : `${Math.max(daysRemaining, 0)} days`}</p></div>
                    <div><p className="text-caption">Overdue</p><p>{overdue ? "Yes" : "No"}</p></div>
                  </dl>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="submissions">
          <div className="space-y-3">
            {accepted.map((a) => {
              const sub = projectSubmissions.find((s) => s.assignmentId === a.id);
              return (
                <Card key={a.id}>
                  <CardContent className="pt-6">
                    <p className="text-label">{a.developer.name}</p>
                    <p className="text-caption">{a.submissionStatus} {a.submittedAt ? `· ${a.submittedAt}` : ""}</p>
                    {sub && <p className="text-body-sm text-muted mt-2">{sub.summary}</p>}
                    {!sub && <p className="text-body-sm text-muted mt-2">No submission yet.</p>}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="evaluations">
          <div className="space-y-3">
            {accepted.map((a) => {
              const evaluation = developerEvaluations.find((e) => e.assignmentId === a.id);
              return (
                <Card key={a.id}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between">
                      <p className="text-label">{a.developer.name}</p>
                      <StatusBadge status={a.evaluationStatus} />
                    </div>
                    <p className="text-body-sm mt-2">Completion: {a.completionStatus}</p>
                    {evaluation?.overallFeedback && <p className="text-body-sm text-muted mt-2">{evaluation.overallFeedback}</p>}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="payments">
          {isPaidProjectType(project.type) ? (
            <Card>
              <CardContent className="pt-6 space-y-3 text-body-sm">
                <div className="flex justify-between"><span>Gross project budget</span><span>{formatCurrency(financials.budget)}</span></div>
                <div className="flex justify-between"><span>Commission %</span><span>{financials.commissionPercentage}%</span></div>
                <div className="flex justify-between"><span>WeConnect revenue</span><span>{formatCurrency(financials.commissionAmount)}</span></div>
                <div className="flex justify-between"><span>Developer payout</span><span>{formatCurrency(financials.developerPayout)}</span></div>
                <div className="flex justify-between"><span>Payment status</span><StatusBadge status={project.paymentStatus ?? "Pending"} /></div>
                <div className="flex justify-between"><span>Selected developer</span><span>{accepted.find((a) => a.purchased)?.developer.name ?? "Not purchased yet"}</span></div>
                <p className="text-caption">Developer payout is released only if the company purchases a successfully completed submission.</p>
              </CardContent>
            </Card>
          ) : (
            <p className="text-body-sm text-muted">This project type does not use the paid-project commission model.</p>
          )}
        </TabsContent>

        <TabsContent value="activity">
          <Card>
            <CardContent className="pt-6">
              <ActivityFeed
                items={(project.id === "proj-csm-dashboard" ? projectActivityTimeline : [
                  { id: "x1", title: "Project Created", description: project.title, time: project.createdAt ?? "—" },
                  { id: "x2", title: "Last activity", description: project.lastActivity ?? "—", time: project.lastActivity ?? "—" },
                ]).map((i) => ({
                  id: i.id,
                  title: i.title,
                  description: "detail" in i ? i.detail : i.description,
                  time: i.time,
                }))}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}
