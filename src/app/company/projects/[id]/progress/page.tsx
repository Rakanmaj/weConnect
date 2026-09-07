import { notFound } from "next/navigation";
import { Users } from "lucide-react";
import Link from "next/link";
import { ProjectTabs } from "@/components/company/project-tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { ProgressBar } from "@/components/ui/progress";
import { StatusBadge } from "@/components/ui/status-badges";
import { Button } from "@/components/ui/button";
import { companyProjects } from "@/lib/mock-data";
import { assignmentDisplayStatus, getAcceptedAssignments } from "@/lib/assignments";

export default async function ProjectProgressPage({ params }: PageProps<"/company/projects/[id]/progress">) {
  const { id } = await params;
  const project = companyProjects.find((p) => p.id === id);
  if (!project) notFound();

  const accepted = getAcceptedAssignments(project);

  return (
    <>
      <ProjectTabs projectId={project.id} projectTitle={project.title} />

      <div className="mb-6 rounded-[8px] border border-amber-200 bg-amber-50 p-4 flex items-start gap-3">
        <Users className="h-5 w-5 text-amber-700 shrink-0 mt-0.5" />
        <div>
          <p className="text-label text-amber-900">Independent contributors — not a team</p>
          <p className="text-body-sm text-amber-800 mt-0.5">
            Only developers who accepted appear here. Declined invitations are excluded from active progress tracking.
          </p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {accepted.map((assignment) => (
          <Card key={assignment.id}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <Avatar name={assignment.developer.name} />
                <div>
                  <p className="text-label text-foreground">{assignment.developer.name}</p>
                  <p className="text-caption">{assignment.developer.role} · Solo contributor</p>
                  <StatusBadge status={assignmentDisplayStatus(assignment)} className="mt-1" />
                </div>
              </div>
              <ProgressBar value={assignment.progress} showLabel color="teal" />
              <p className="text-caption mt-2">Updated {assignment.lastUpdate ?? "—"}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-6 flex justify-end">
        <Button asChild>
          <Link href={`/company/projects/${project.id}/submissions`}>Review Submissions</Link>
        </Button>
      </div>
    </>
  );
}
