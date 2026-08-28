import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectTabs } from "@/components/company/project-tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/ui/status-badges";
import { Button } from "@/components/ui/button";
import { companyProjects } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";
import { ProjectFinancialSummary, PaidProjectGuard } from "@/components/shared/financial-summary";
import { getAcceptedAssignments } from "@/lib/assignments";

export default async function ProjectDetailPage({ params }: PageProps<"/company/projects/[id]">) {
  const { id } = await params;
  const project = companyProjects.find((p) => p.id === id);
  if (!project) notFound();

  const accepted = getAcceptedAssignments(project);

  return (
    <>
      <ProjectTabs projectId={project.id} projectTitle={project.title} />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-wrap gap-2 mb-4">
                <StatusBadge status={project.state} />
                <Badge variant="primary">{project.type}</Badge>
              </div>
              <p className="text-body text-muted">{project.description}</p>
              <h3 className="text-label text-foreground mt-6 mb-3">Functional requirements</h3>
              <ul className="space-y-2">
                {(project.functionalRequirements ?? project.requirements).map((req) => (
                  <li key={req} className="flex items-center gap-2 text-body-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-teal shrink-0" />
                    {req}
                  </li>
                ))}
              </ul>
              {project.technicalRequirements && (
                <>
                  <h3 className="text-label text-foreground mt-6 mb-3">Technical requirements</h3>
                  <ul className="space-y-2">
                    {project.technicalRequirements.map((req) => (
                      <li key={req} className="flex items-center gap-2 text-body-sm">
                        <span className="h-1.5 w-1.5 rounded-full bg-teal shrink-0" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="text-h4 text-foreground mb-4">Evaluator & review stages</h3>
              <p className="text-label">{project.evaluator?.name ?? "Unassigned"}</p>
              <p className="text-caption mb-4">{project.evaluator?.title}</p>
              <div className="space-y-2">
                {(project.reviewStages ?? []).map((stage) => (
                  <div key={stage.id} className="flex items-center justify-between text-body-sm">
                    <span>{stage.label}</span>
                    <StatusBadge status={stage.status} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <PaidProjectGuard type={project.type}>
            <ProjectFinancialSummary budget={project.budget} paymentStatus={project.paymentStatus} variant="company" />
          </PaidProjectGuard>
        </div>

        <div className="space-y-4">
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div>
                <p className="text-caption">Role</p>
                <p className="text-label text-foreground">{project.role}</p>
              </div>
              <div>
                <p className="text-caption">Duration</p>
                <p className="text-label text-foreground">{project.duration}</p>
              </div>
              <div>
                <p className="text-caption">Deadline</p>
                <p className="text-label text-foreground">{formatDate(project.deadline)}</p>
              </div>
              <div>
                <p className="text-caption">Workload</p>
                <p className="text-label text-foreground">{project.workload}</p>
              </div>
              <div>
                <p className="text-caption">Accepted developers</p>
                <p className="text-label text-foreground">{accepted.length} working independently</p>
              </div>
              <div>
                <p className="text-caption mb-2">Technologies</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((t) => (
                    <Badge key={t} variant="default" size="sm">{t}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-2">
            <Link href={`/company/projects/${project.id}/matches`}>
              <Button className="w-full">View AI matches</Button>
            </Link>
            <Link href={`/company/projects/${project.id}/progress`}>
              <Button variant="secondary" className="w-full">Track progress</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
