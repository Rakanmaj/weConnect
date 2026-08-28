import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink, ImageIcon, Play } from "lucide-react";
import { ProjectTabs } from "@/components/company/project-tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badges";
import { companyProjects, projectSubmissions } from "@/lib/mock-data";
import { getSubmittedAssignments } from "@/lib/assignments";
import { formatDate } from "@/lib/utils";

export default async function ProjectSubmissionsPage({ params }: PageProps<"/company/projects/[id]/submissions">) {
  const { id } = await params;
  const project = companyProjects.find((p) => p.id === id);
  if (!project) notFound();

  const submitted = getSubmittedAssignments(project);
  const purchased = Boolean(project.purchasedAssignmentId);

  return (
    <>
      <ProjectTabs projectId={project.id} projectTitle={project.title} />

      <p className="text-body-sm text-muted mb-4">
        Review each developer’s own submission. Source code stays locked until the company purchases a completed submission.
      </p>

      <div className="space-y-4">
        {submitted.length === 0 && (
          <Card>
            <CardContent className="pt-6 text-body-sm text-muted">No submissions yet. Developers who declined or are still in progress are not listed here.</CardContent>
          </Card>
        )}
        {submitted.map((assignment) => {
          const sub = projectSubmissions.find((s) => s.assignmentId === assignment.id);
          const unlocked = purchased && project.purchasedAssignmentId === assignment.id;
          return (
            <Card key={assignment.id}>
              <CardContent className="pt-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-center gap-3 min-w-0">
                    <Avatar name={assignment.developer.name} />
                    <div className="min-w-0">
                      <p className="text-label text-foreground">{assignment.developer.name}</p>
                      <p className="text-caption">
                        {assignment.submittedAt ? `Submitted ${formatDate(assignment.submittedAt)}` : "Submitted"}
                      </p>
                      <StatusBadge status={assignment.workStatus ?? "Submitted"} className="mt-2" />
                    </div>
                  </div>
                  {sub && (
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant={sub.requirementsMet === sub.requirementsTotal ? "success" : "warning"}>
                        {sub.requirementsMet}/{sub.requirementsTotal} requirements
                      </Badge>
                    </div>
                  )}
                </div>
                {sub && (
                  <div className="mt-4 space-y-3">
                    <p className="text-body-sm text-muted">{sub.summary}</p>
                    <p className="text-body-sm"><span className="text-caption">Technical summary. </span>{sub.technicalSummary}</p>
                    <div className="flex flex-wrap gap-2">
                      {sub.screenshots.map((shot) => (
                        <span key={shot} className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-[6px] border border-border">
                          <ImageIcon className="h-3 w-3" /> {shot}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <a href={sub.demoUrl} target="_blank" rel="noopener noreferrer">
                        <Button variant="secondary" size="sm"><Play className="h-4 w-4" /> View Demo</Button>
                      </a>
                      <a href={sub.previewUrl} target="_blank" rel="noopener noreferrer">
                        <Button variant="secondary" size="sm"><ExternalLink className="h-4 w-4" /> Open Preview</Button>
                      </a>
                      <Link href={`/company/projects/${project.id}/evaluation`}>
                        <Button variant="secondary" size="sm">View Submission</Button>
                      </Link>
                      {unlocked ? (
                        <a href={`https://${sub.repositoryUrl}`} target="_blank" rel="noopener noreferrer">
                          <Button size="sm">Repository (purchased)</Button>
                        </a>
                      ) : (
                        <Button size="sm" variant="secondary" disabled>
                          Source code locked until purchase
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-6">
        <Link href={`/company/projects/${project.id}/compare`}>
          <Button>Compare submissions</Button>
        </Link>
      </div>
    </>
  );
}
