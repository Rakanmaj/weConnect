"use client";

import { useState, use } from "react";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { CheckCircle2, XCircle, Clock, Users } from "lucide-react";
import { PageHeader } from "@/components/ui/common";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/developer/card";
import { StatusBadge } from "@/components/ui/status-badges";
import { MatchScore } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { PaidProjectGuard, ProjectFinancialSummary } from "@/components/shared/financial-summary";
import { allDeveloperProjects, matchReasons, ahmadAli } from "@/lib/mock-data";
import { getAssignmentForDeveloper, assignmentDisplayStatus } from "@/lib/assignments";

export default function ProjectInvitationPage({
  params,
}: PageProps<"/developer/projects/invitations/[id]">) {
  const { id } = use(params);
  const router = useRouter();
  const [acceptOpen, setAcceptOpen] = useState(false);
  const [declined, setDeclined] = useState(false);
  const [accepted, setAccepted] = useState(false);

  const project = allDeveloperProjects.find((p) => p.id === id);
  if (!project) notFound();

  const assignment = getAssignmentForDeveloper(project, ahmadAli.id);
  const reasons = matchReasons[ahmadAli.id] ?? [];
  const alreadyAccepted = assignment?.invitationStatus === "Accepted" || accepted;

  return (
    <div className="max-w-3xl mx-auto min-w-0">
      <PageHeader
        breadcrumb={
          <Link href="/developer/projects?tab=invitations" className="text-caption text-primary hover:underline">
            ← Back to invitations
          </Link>
        }
        title={project.title}
        description={`${project.company.name} · ${project.type}`}
      />

      {declined ? (
        <Card className="text-center">
          <XCircle className="h-12 w-12 text-muted mx-auto mb-4" />
          <p className="text-h4 text-foreground">Invitation Declined</p>
          <p className="text-body-sm text-muted mt-2">
            Rejecting this invitation does not affect your reliability score.
          </p>
          <Button className="mt-6" variant="secondary" asChild>
            <Link href="/developer/projects?tab=invitations">Back to Projects</Link>
          </Button>
        </Card>
      ) : alreadyAccepted ? (
        <Card className="text-center">
          <CheckCircle2 className="h-12 w-12 text-teal mx-auto mb-4" />
          <p className="text-h4 text-foreground">Invitation Accepted</p>
          <p className="text-body-sm text-muted mt-2">You are expected to follow through on this commitment.</p>
          <Button className="mt-6" asChild>
            <Link href={`/developer/projects/${project.id}`}>Open project workspace</Link>
          </Button>
        </Card>
      ) : (
        <>
          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            <Card className="text-center">
              <MatchScore score={assignment?.matchScore ?? project.matchScore ?? 94} />
            </Card>
            <Card className="text-center">
              <Clock className="h-5 w-5 text-muted mx-auto mb-1" />
              <p className="text-sm font-medium">{project.duration}</p>
              <p className="text-caption">Duration</p>
            </Card>
            <Card className="text-center">
              <p className="text-sm font-medium">{project.workload}</p>
              <p className="text-caption">Workload</p>
            </Card>
          </div>

          <Card className="mb-6">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <StatusBadge status={assignment ? assignmentDisplayStatus(assignment) : "Invited"} />
              <span className="text-caption">Deadline: {project.deadline}</span>
            </div>
            <p className="text-body-sm text-muted mb-4">{project.description}</p>
            <h3 className="text-sm font-medium text-foreground mb-2">Requirements</h3>
            <ul className="space-y-1.5">
              {project.requirements.map((r) => (
                <li key={r} className="flex items-start gap-2 text-sm text-muted">
                  <CheckCircle2 className="h-4 w-4 text-teal shrink-0 mt-0.5" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2 mt-4">
              {project.technologies.map((t) => (
                <span key={t} className="text-xs px-2.5 py-1 rounded-[6px] border border-border bg-surface">{t}</span>
              ))}
            </div>
          </Card>

          <PaidProjectGuard type={project.type}>
            <div className="mb-6">
              <ProjectFinancialSummary budget={project.budget} variant="developer" />
            </div>
          </PaidProjectGuard>

          <Card className="mb-6">
            <h3 className="text-h4 text-foreground mb-3">Why you were matched</h3>
            <ul className="space-y-2">
              {reasons.map((r) => (
                <li key={r} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-teal shrink-0" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </Card>

          {project.assignments && (
            <Card className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Users className="h-4 w-4 text-muted" />
                <h3 className="text-h4 text-foreground">Other matched developers</h3>
              </div>
              <p className="text-caption mb-3">
                You were invited by the company from the Top 4 matches. Other matched developers may still be waiting for their invitation.
              </p>
              <div className="flex flex-wrap gap-2">
                {project.assignments.filter((a) => a.developerId !== ahmadAli.id).map((a) => (
                  <span key={a.id} className="text-sm px-3 py-1.5 rounded-[6px] bg-surface truncate">
                    {a.developer.name} — {a.matchScore}% match
                  </span>
                ))}
              </div>
            </Card>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <Button className="flex-1" onClick={() => setAcceptOpen(true)}>
              Accept Project
            </Button>
            <Button variant="secondary" className="flex-1" onClick={() => setDeclined(true)}>
              Decline
            </Button>
          </div>
        </>
      )}

      <Dialog open={acceptOpen} onOpenChange={setAcceptOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Accept Project Invitation?</DialogTitle>
            <DialogDescription>
              Rejecting this invitation will not affect your reliability score. If you accept the project, you are expected to follow through on the commitment.
            </DialogDescription>
          </DialogHeader>
          <div className="p-4 rounded-[6px] bg-teal/5 border border-teal/20 text-sm">
            Accepting and successfully completing is a positive reliability signal. Accepting and then abandoning the work is a negative reliability signal. Declining before you accept has no penalty.
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setAcceptOpen(false)}>Cancel</Button>
            <Button
              onClick={() => {
                setAcceptOpen(false);
                setAccepted(true);
                router.push(`/developer/projects/${project.id}`);
              }}
            >
              Confirm Accept
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
