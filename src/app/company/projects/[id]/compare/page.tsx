import { notFound } from "next/navigation";
import Link from "next/link";
import { ProjectTabs } from "@/components/company/project-tabs";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { companyProjects, projectSubmissions } from "@/lib/mock-data";
import { getSubmittedAssignments } from "@/lib/assignments";
import { Button } from "@/components/ui/button";

export default async function ProjectComparePage({ params }: PageProps<"/company/projects/[id]/compare">) {
  const { id } = await params;
  const project = companyProjects.find((p) => p.id === id);
  if (!project) notFound();

  const submitted = getSubmittedAssignments(project);
  const rows = submitted.map((a) => ({
    assignment: a,
    submission: projectSubmissions.find((s) => s.assignmentId === a.id),
  }));

  return (
    <>
      <ProjectTabs projectId={project.id} projectTitle={project.title} />

      {rows.length === 0 ? (
        <Card className="p-6 text-body-sm text-muted">No submissions to compare yet. Developers who declined are not included.</Card>
      ) : (
        <Card className="overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead>
              <tr className="border-b border-border bg-surface/50">
                <th className="px-4 py-3 text-left text-table-header">Criteria</th>
                {rows.map(({ assignment }) => (
                  <th key={assignment.id} className="px-4 py-3 text-left text-table-header">
                    <div className="flex items-center gap-2">
                      <Avatar name={assignment.developer.name} size="sm" />
                      {assignment.developer.name.split(" ")[0]}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="px-4 py-3 text-body-sm font-medium">Work status</td>
                {rows.map(({ assignment }) => (
                  <td key={assignment.id} className="px-4 py-3 text-body-sm">{assignment.workStatus}</td>
                ))}
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 text-body-sm font-medium">Requirements met</td>
                {rows.map(({ assignment, submission }) => (
                  <td key={assignment.id} className="px-4 py-3 text-body-sm">
                    {submission ? `${submission.requirementsMet}/${submission.requirementsTotal}` : "—"}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-4 py-3 text-body-sm font-medium">Completion</td>
                {rows.map(({ assignment }) => (
                  <td key={assignment.id} className="px-4 py-3 text-body-sm">{assignment.completionStatus}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </Card>
      )}
      <div className="mt-6 flex justify-end">
        <Button asChild>
          <Link href={`/company/projects/${project.id}/evaluation`}>Evaluate Submission</Link>
        </Button>
      </div>
    </>
  );
}
