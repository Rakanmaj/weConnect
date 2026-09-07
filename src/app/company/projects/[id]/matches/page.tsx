"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { use, useMemo, useState } from "react";
import { Check, Sparkles, UserPlus } from "lucide-react";
import { ProjectTabs } from "@/components/company/project-tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { MatchScore } from "@/components/ui/progress";
import { LevelBadge, SkillBadge, StatusBadge } from "@/components/ui/status-badges";
import { VerifiedBadge } from "@/components/ui/verified-badge";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { companyProjects, matchReasons } from "@/lib/mock-data";
import {
  assignmentDisplayStatus,
  getMatchedAssignments,
  isAwaitingInvite,
  isInvitationPending,
} from "@/lib/assignments";
import type { InvitationStatus } from "@/types";

export default function ProjectMatchesPage({ params }: PageProps<"/company/projects/[id]/matches">) {
  const { id } = use(params);
  const project = companyProjects.find((p) => p.id === id);
  if (!project) notFound();

  const baseMatches = getMatchedAssignments(project);
  const [statuses, setStatuses] = useState<Record<string, InvitationStatus>>(() =>
    Object.fromEntries(baseMatches.map((a) => [a.id, a.invitationStatus]))
  );
  const [inviteTarget, setInviteTarget] = useState<{ id: string; name: string } | null>(null);
  const [inviteAllOpen, setInviteAllOpen] = useState(false);

  const matches = useMemo(
    () =>
      baseMatches.map((a) => ({
        ...a,
        invitationStatus: statuses[a.id] ?? a.invitationStatus,
      })),
    [baseMatches, statuses]
  );

  const awaitingInvite = matches.filter((a) => isAwaitingInvite(a));
  const allInvited = awaitingInvite.length === 0;

  const inviteOne = (assignmentId: string) => {
    setStatuses((prev) => ({ ...prev, [assignmentId]: "Invited" }));
    setInviteTarget(null);
  };

  const inviteAll = () => {
    setStatuses((prev) => {
      const next = { ...prev };
      for (const a of awaitingInvite) next[a.id] = "Invited";
      return next;
    });
    setInviteAllOpen(false);
  };

  return (
    <>
      <ProjectTabs projectId={project.id} projectTitle={project.title} />

      <div className="mb-6 rounded-[8px] border border-teal/30 bg-teal/5 p-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <Sparkles className="h-5 w-5 text-teal shrink-0 mt-0.5" />
          <div>
            <p className="text-label text-foreground">AI Top 4 Matches</p>
            <p className="text-body-sm text-muted mt-0.5">
              Review the matched developers, then invite them to this project. Interview requests come later — after delivery and evaluation.
            </p>
          </div>
        </div>
        {!allInvited && (
          <Button size="sm" className="shrink-0" onClick={() => setInviteAllOpen(true)}>
            <UserPlus className="h-4 w-4" />
            Invite all Top 4
          </Button>
        )}
        {allInvited && (
          <p className="text-body-sm text-teal font-medium shrink-0 flex items-center gap-1.5">
            <Check className="h-4 w-4" />
            All matches invited
          </p>
        )}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {matches.map((assignment, index) => {
          const dev = assignment.developer;
          const canInvite = isAwaitingInvite(assignment);
          const invited = isInvitationPending(assignment);

          return (
            <Card key={assignment.id}>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <Avatar name={dev.name} size="lg" />
                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-navy text-[10px] font-bold text-white">
                      {index + 1}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-h4 text-foreground">{dev.name}</h3>
                          {dev.weconnectVerified && <VerifiedBadge type="weconnect" />}
                        </div>
                        <p className="text-caption">{dev.role} · {dev.location}</p>
                        <StatusBadge status={assignmentDisplayStatus(assignment)} className="mt-2" />
                      </div>
                      <MatchScore score={assignment.matchScore} />
                    </div>
                    <LevelBadge level={dev.overallLevel} className="mt-3" />
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {dev.skills.slice(0, 3).map((s) => (
                        <SkillBadge key={s.name} name={s.name} level={s.level} verified={s.verified} />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-caption font-medium mb-2">Match reasons</p>
                  <ul className="space-y-1">
                    {(matchReasons[dev.id] || []).map((reason) => (
                      <li key={reason} className="text-body-sm text-muted flex items-center gap-2">
                        <span className="h-1 w-1 rounded-full bg-teal shrink-0" />
                        {reason}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  {canInvite && (
                    <Button
                      size="sm"
                      onClick={() => setInviteTarget({ id: assignment.id, name: dev.name })}
                    >
                      <UserPlus className="h-4 w-4" />
                      Invite to project
                    </Button>
                  )}
                  {invited && (
                    <Button size="sm" variant="secondary" disabled>
                      <Check className="h-4 w-4" />
                      Invitation sent
                    </Button>
                  )}
                  <Button variant="secondary" size="sm" asChild>
                    <Link href={`/company/talent/${dev.id}?projectId=${project.id}`}>
                      View profile
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-6 flex justify-end">
        <Button asChild>
          <Link href={`/company/projects/${project.id}/progress`}>Continue to Project Progress</Link>
        </Button>
      </div>

      <ConfirmDialog
        open={!!inviteTarget}
        onOpenChange={(open) => !open && setInviteTarget(null)}
        title="Invite to project?"
        description={
          inviteTarget
            ? `Send a project invitation to ${inviteTarget.name}? They can accept or decline with no penalty.`
            : ""
        }
        confirmLabel="Send invitation"
        onConfirm={() => inviteTarget && inviteOne(inviteTarget.id)}
      />

      <ConfirmDialog
        open={inviteAllOpen}
        onOpenChange={setInviteAllOpen}
        title="Invite all Top 4?"
        description={`Send project invitations to all ${awaitingInvite.length} matched developers? Interviews are not part of this step.`}
        confirmLabel="Invite all"
        onConfirm={inviteAll}
      />
    </>
  );
}
