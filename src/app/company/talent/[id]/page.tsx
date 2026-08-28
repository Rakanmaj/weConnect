"use client";

import { notFound, useSearchParams } from "next/navigation";
import { Suspense, use, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Code, Globe, Link2, UserPlus } from "lucide-react";
import { PageHeader } from "@/components/ui/common";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { PerformanceMetric } from "@/components/ui/progress";
import { LevelBadge, SkillBadge, StatusBadge } from "@/components/ui/status-badges";
import { VerifiedBadge } from "@/components/ui/verified-badge";
import { allDevelopers, companyProjects } from "@/lib/mock-data";
import { getAssignmentForDeveloper, isAwaitingInvite, isInvitationPending } from "@/lib/assignments";

function TalentDetailContent({ id }: { id: string }) {
  const searchParams = useSearchParams();
  const projectId = searchParams.get("projectId");
  const developer = allDevelopers.find((d) => d.id === id);
  if (!developer) notFound();

  const project = useMemo(
    () => (projectId ? companyProjects.find((p) => p.id === projectId) : undefined),
    [projectId]
  );
  const assignment = project ? getAssignmentForDeveloper(project, developer.id) : undefined;

  const [inviteOpen, setInviteOpen] = useState(false);
  const [interviewOpen, setInterviewOpen] = useState(false);
  const [invited, setInvited] = useState(
    () => !!assignment && isInvitationPending(assignment)
  );

  const canInvite =
    !!project &&
    !!assignment &&
    (isAwaitingInvite(assignment) || (!invited && assignment.invitationStatus === "Matched"));
  const showInvited = invited || (!!assignment && isInvitationPending(assignment));

  return (
    <>
      <Link
        href={project ? `/company/projects/${project.id}/matches` : "/company/talent"}
        className="inline-flex items-center gap-1 text-body-sm text-muted hover:text-navy mb-4"
      >
        <ArrowLeft className="h-4 w-4" />
        {project ? "Back to matches" : "Back to talent"}
      </Link>

      <PageHeader
        title={developer.name}
        description={`${developer.role} · ${developer.location}`}
        action={
          <div className="flex flex-wrap gap-2">
            {project && canInvite && !showInvited && (
              <Button onClick={() => setInviteOpen(true)}>
                <UserPlus className="h-4 w-4" />
                Invite to project
              </Button>
            )}
            {project && showInvited && (
              <Button variant="secondary" disabled>
                Invitation sent
              </Button>
            )}
            {project && (
              <StatusBadge status={showInvited ? "Invited" : assignment ? "Matched" : "Matched"} />
            )}
            {!project && (
              <Button variant="secondary" onClick={() => setInterviewOpen(true)}>
                Request interview
              </Button>
            )}
          </div>
        }
      />

      {project && (
        <div className="mb-6 rounded-[8px] border border-border bg-surface/60 px-4 py-3 text-body-sm text-muted">
          Project match: <span className="text-foreground font-medium">{project.title}</span>
          {" — "}
          invite them to the project first. Interview requests happen later in hiring, after evaluation.
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-4">
                {developer.weconnectVerified && <VerifiedBadge type="weconnect" />}
                <LevelBadge level={developer.overallLevel} />
              </div>
              {developer.bio && <p className="text-body-sm text-muted">{developer.bio}</p>}
              <div className="flex flex-wrap gap-2 mt-4">
                {developer.skills.map((s) => (
                  <SkillBadge key={s.name} name={s.name} level={s.level} verified={s.verified} />
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h2 className="text-h3 text-navy mb-4">Performance metrics</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                <PerformanceMetric label="Reliability" value={`${developer.reliability}%`} />
                <PerformanceMetric label="Avg. score" value={`${developer.averageScore}%`} />
                <PerformanceMetric label="Requirements accuracy" value={`${developer.requirementsAccuracy}%`} />
                <PerformanceMetric label="On-time completion" value={`${developer.onTimeCompletion}%`} />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardContent className="pt-6 text-center">
              <Avatar name={developer.name} size="xl" className="mx-auto" />
              <p className="text-label text-navy mt-4">{developer.availability}</p>
              <p className="text-caption">{developer.email}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 space-y-3">
              <p className="text-label text-navy">Links</p>
              {developer.github && (
                <a href={developer.github} className="flex items-center gap-2 text-body-sm text-primary hover:underline">
                  <Code className="h-4 w-4" /> GitHub
                </a>
              )}
              {developer.linkedin && (
                <a href={developer.linkedin} className="flex items-center gap-2 text-body-sm text-primary hover:underline">
                  <Link2 className="h-4 w-4" /> LinkedIn
                </a>
              )}
              {developer.portfolio && (
                <a href={developer.portfolio} className="flex items-center gap-2 text-body-sm text-primary hover:underline">
                  <Globe className="h-4 w-4" /> Portfolio
                </a>
              )}
            </CardContent>
          </Card>

          {project && showInvited && (
            <Card>
              <CardContent className="pt-6">
                <p className="text-label text-navy mb-2">Hiring (later)</p>
                <p className="text-caption mb-3">
                  Request an interview only after project delivery and evaluation — not as the first step.
                </p>
                <Button variant="secondary" size="sm" className="w-full" onClick={() => setInterviewOpen(true)}>
                  Request interview
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <ConfirmDialog
        open={inviteOpen}
        onOpenChange={setInviteOpen}
        title="Invite to project?"
        description={`Send a project invitation to ${developer.name} for ${project?.title ?? "this project"}? They can accept or decline with no penalty.`}
        confirmLabel="Send invitation"
        onConfirm={() => {
          setInvited(true);
          setInviteOpen(false);
        }}
      />

      <ConfirmDialog
        open={interviewOpen}
        onOpenChange={setInterviewOpen}
        title="Request interview?"
        description={`Send an interview request to ${developer.name}? Use this after they have delivered and been evaluated on a project.`}
        confirmLabel="Send request"
        onConfirm={() => setInterviewOpen(false)}
      />
    </>
  );
}

export default function TalentDetailPage({ params }: PageProps<"/company/talent/[id]">) {
  const { id } = use(params);
  return (
    <Suspense fallback={<div className="text-body-sm text-muted">Loading profile…</div>}>
      <TalentDetailContent id={id} />
    </Suspense>
  );
}
