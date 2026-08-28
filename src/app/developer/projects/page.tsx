"use client";

import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { PageHeader, EmptyState } from "@/components/ui/common";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/developer/card";
import { StatusBadge } from "@/components/ui/status-badges";
import { MatchScore } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { allDeveloperProjects, ahmadAli } from "@/lib/mock-data";
import { assignmentDisplayStatus, developerListTab, getAssignmentForDeveloper } from "@/lib/assignments";
import { Briefcase } from "lucide-react";
import type { Project } from "@/types";

const TABS = ["invitations", "active", "submitted", "completed", "not-completed"] as const;

function ProjectCard({ project }: { project: Project }) {
  const assignment = getAssignmentForDeveloper(project, ahmadAli.id);
  const status = assignment ? assignmentDisplayStatus(assignment) : project.state;
  const href =
    assignment && (assignment.invitationStatus === "Invited" || assignment.invitationStatus === "Pending Response")
      ? `/developer/projects/invitations/${project.id}`
      : `/developer/projects/${project.id}`;

  return (
    <Card>
      <div className="flex flex-col sm:flex-row gap-4 min-w-0">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <StatusBadge status={status} />
            <span className="text-caption truncate">{project.type}</span>
          </div>
          <h3 className="text-h4 text-foreground truncate">{project.title}</h3>
          <p className="text-body-sm text-muted mt-1 truncate">{project.company.name}</p>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {project.technologies.slice(0, 3).map((t) => (
              <span key={t} className="text-xs px-2 py-0.5 rounded-[6px] bg-surface">{t}</span>
            ))}
          </div>
        </div>
        <div className="flex sm:flex-col items-start sm:items-end justify-between gap-3 shrink-0">
          {assignment?.matchScore != null && <MatchScore score={assignment.matchScore} size="sm" />}
          <p className="text-caption whitespace-nowrap">Due {project.deadline}</p>
          <Button size="sm" variant="secondary" asChild>
            <Link href={href}>View</Link>
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default function DeveloperProjectsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tab = searchParams.get("tab") || "invitations";

  return (
    <div className="min-w-0">
      <PageHeader
        title="Projects"
        description="Manage invitations, active work, and completed deliverables. Each assignment has its own work status."
      />

      <Tabs value={tab} onValueChange={(v) => router.push(`/developer/projects?tab=${v}`)}>
        <TabsList className="mb-0">
          {TABS.map((t) => (
            <TabsTrigger key={t} value={t} className="capitalize">
              {t.replace("-", " ")}
            </TabsTrigger>
          ))}
        </TabsList>

        {TABS.map((t) => {
          const projects = allDeveloperProjects.filter(
            (p) => developerListTab(getAssignmentForDeveloper(p, ahmadAli.id)) === t
          );
          return (
            <TabsContent key={t} value={t}>
              {projects.length === 0 ? (
                <EmptyState
                  icon={Briefcase}
                  title="No projects"
                  description={`You have no ${t.replace("-", " ")} projects.`}
                />
              ) : (
                <div className="space-y-4">
                  {projects.map((p) => (
                    <ProjectCard key={p.id} project={p} />
                  ))}
                </div>
              )}
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}
