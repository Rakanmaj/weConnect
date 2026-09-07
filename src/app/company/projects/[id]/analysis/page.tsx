import { notFound } from "next/navigation";
import { ProjectTabs } from "@/components/company/project-tabs";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { companyProjects, projectAnalysis } from "@/lib/mock-data";

export default async function ProjectAnalysisPage({ params }: PageProps<"/company/projects/[id]/analysis">) {
  const { id } = await params;
  const project = companyProjects.find((p) => p.id === id);
  if (!project) notFound();

  return (
    <>
      <ProjectTabs projectId={project.id} projectTitle={project.title} />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        {[
          { label: "Complexity", value: projectAnalysis.complexity },
          { label: "Est. hours", value: projectAnalysis.estimatedHours },
          { label: "Skill match", value: `${projectAnalysis.skillMatch}%` },
          { label: "Risk level", value: projectAnalysis.riskLevel },
        ].map((item) => (
          <Card key={item.label}>
            <CardContent className="pt-6">
              <p className="text-caption">{item.label}</p>
              <p className="text-h3 text-foreground mt-1">{item.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <h2 className="text-h3 text-foreground">AI recommendations</h2>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {projectAnalysis.recommendations.map((rec) => (
                <li key={rec} className="flex gap-3 text-body-sm">
                  <Badge variant="teal" size="sm">Tip</Badge>
                  <span className="text-muted">{rec}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-h3 text-foreground">Requirement breakdown</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            {projectAnalysis.requirementBreakdown.map((item) => (
              <div key={item.requirement}>
                <div className="flex justify-between text-body-sm mb-1">
                  <span className="text-foreground truncate pr-2">{item.requirement}</span>
                  <span className="text-muted shrink-0">{item.hours}h · {item.difficulty}</span>
                </div>
                <ProgressBar value={item.hours} max={20} color="teal" size="sm" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
      <div className="mt-6 flex justify-end">
        <Button asChild>
          <Link href={`/company/projects/${project.id}/matches`}>Review Top 4 Matches</Link>
        </Button>
      </div>
    </>
  );
}
