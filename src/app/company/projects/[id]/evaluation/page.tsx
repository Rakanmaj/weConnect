"use client";

import { use, useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ProjectTabs } from "@/components/company/project-tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { Avatar } from "@/components/ui/avatar";
import { StatusBadge } from "@/components/ui/status-badges";
import { FormField } from "@/components/ui/common";
import { Textarea } from "@/components/ui/textarea";
import { companyProjects } from "@/lib/mock-data";
import { getAcceptedAssignments, getEvaluableAssignments } from "@/lib/assignments";
import { usePlatformSettings } from "@/lib/platform-settings";
import { assignmentDisplayStatus } from "@/lib/assignments";
import type { CompanyEvaluationCriterionKey, CompletionStatus } from "@/types";

export default function ProjectEvaluationPage({ params }: PageProps<"/company/projects/[id]/evaluation">) {
  const { id } = use(params);
  const project = companyProjects.find((p) => p.id === id);
  if (!project) notFound();

  const { settings } = usePlatformSettings();
  const participants = getAcceptedAssignments(project);
  const evaluable = getEvaluableAssignments(project);
  const [selectedId, setSelectedId] = useState(evaluable[0]?.id ?? participants[0]?.id);
  const selected = participants.find((a) => a.id === selectedId) ?? evaluable[0];

  const criteria = settings.companyEvaluationRubric.filter((c) => c.enabled);
  const [scores, setScores] = useState<Record<string, number>>(() =>
    Object.fromEntries(criteria.map((criterion) => [criterion.key, 4]))
  );
  const [comments, setComments] = useState<Record<string, string>>(() =>
    Object.fromEntries(criteria.map((criterion) => [criterion.key, "Clear, reliable delivery with strong evidence in the submitted prototype."]))
  );
  const [overall, setOverall] = useState("The submission meets the project requirements and demonstrates dependable full-stack delivery.");
  const [decision, setDecision] = useState<CompletionStatus | null>("Completed");
  const [submittedFor, setSubmittedFor] = useState<Record<string, CompletionStatus>>({});
  const [confirmOpen, setConfirmOpen] = useState(false);

  const canEvaluate = selected && ["Submitted", "Under Review", "Completed", "Not Completed"].includes(selected.workStatus ?? "");

  const setScore = (key: CompanyEvaluationCriterionKey, value: number) => {
    setScores((prev) => ({ ...prev, [key]: value }));
  };

  const selectedDecision = selected ? submittedFor[selected.id] : undefined;

  return (
    <>
      <ProjectTabs projectId={project.id} projectTitle={project.title} />

      <p className="text-body-sm text-muted mb-4">
        Evaluate one developer submission at a time. Completed / Not Completed belongs to that developer only — never to the whole project.
      </p>

      <div className="flex gap-2 overflow-x-auto mb-6">
        {participants.map((a) => (
          <button
            key={a.id}
            type="button"
            onClick={() => {
              setSelectedId(a.id);
              setDecision(null);
            }}
            className={`flex items-center gap-2 rounded-[8px] border px-3 py-2 text-left shrink-0 ${
              selectedId === a.id ? "border-primary bg-blue-50" : "border-border hover:bg-surface"
            }`}
          >
            <Avatar name={a.developer.name} size="sm" />
            <div>
              <p className="text-sm font-medium">{a.developer.name.split(" ")[0]}</p>
              <StatusBadge status={assignmentDisplayStatus(a)} />
            </div>
          </button>
        ))}
      </div>

      {!selected ? (
        <Card><CardContent className="pt-6 text-body-sm text-muted">No accepted developers to evaluate.</CardContent></Card>
      ) : !canEvaluate ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-label">{selected.developer.name} is {assignmentDisplayStatus(selected)}.</p>
            <p className="text-body-sm text-muted mt-2">Evaluation is available after this developer submits their own version of the project.</p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="pt-6 space-y-6">
            <div>
              <h2 className="text-h3 text-foreground">Evaluate {selected.developer.name}</h2>
              <p className="text-caption mt-1">Company project rubric — not the AI initial-assessment scoring system.</p>
            </div>

            {criteria.map((criterion) => (
              <div key={criterion.key} className="border-b border-border pb-4">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div>
                    <p className="text-label">{criterion.label}</p>
                    <p className="text-caption">{criterion.description}</p>
                  </div>
                </div>
                <div className="flex gap-2 mb-3">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setScore(criterion.key, n)}
                      className={`h-9 w-9 rounded-[6px] border text-sm font-medium ${
                        scores[criterion.key] === n ? "border-primary bg-blue-50 text-primary" : "border-border hover:bg-surface"
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
                <Textarea
                  rows={2}
                  placeholder="Optional comments"
                  value={comments[criterion.key] ?? ""}
                  onChange={(e) => setComments((prev) => ({ ...prev, [criterion.key]: e.target.value }))}
                />
              </div>
            ))}

            <FormField label="Overall feedback">
              <Textarea rows={4} value={overall} onChange={(e) => setOverall(e.target.value)} placeholder="Summary for this developer only" />
            </FormField>

            <div>
              <p className="text-label mb-3">Final completion decision — {selected.developer.name} only</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setDecision("Completed")}
                  className={`rounded-[8px] border p-4 text-left ${decision === "Completed" ? "border-green-500 bg-green-50" : "border-border hover:bg-surface"}`}
                >
                  <p className="text-label text-green-800">Completed</p>
                  <p className="text-caption mt-1">This developer’s submission meets the requirements.</p>
                </button>
                <button
                  type="button"
                  onClick={() => setDecision("Not Completed")}
                  className={`rounded-[8px] border p-4 text-left ${decision === "Not Completed" ? "border-red-500 bg-red-50" : "border-border hover:bg-surface"}`}
                >
                  <p className="text-label text-red-800">Not Completed</p>
                  <p className="text-caption mt-1">This developer’s submission did not fully meet requirements.</p>
                </button>
              </div>
            </div>

            {selectedDecision && (
              <div className="rounded-[8px] border border-teal/30 bg-teal/5 p-4">
                <p className="text-body-sm text-teal">{selected.developer.name} marked {selectedDecision}.</p>
                <Button className="mt-3" size="sm" asChild>
                  <Link href={`/company/projects/${project.id}/decision`}>Continue to Final Decision</Link>
                </Button>
              </div>
            )}

            <Button disabled={!decision} onClick={() => setConfirmOpen(true)}>
              Submit Evaluation
            </Button>
          </CardContent>
        </Card>
      )}

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title={`Submit evaluation for ${selected?.developer.name}?`}
        description={`This marks ${selected?.developer.name}'s submission as "${decision}". Other developers are not affected. Successful completion does not automatically trigger payment.`}
        confirmLabel="Submit evaluation"
        onConfirm={() => {
          if (selected && decision) {
            setSubmittedFor((prev) => ({ ...prev, [selected.id]: decision }));
          }
          setConfirmOpen(false);
        }}
      />
    </>
  );
}
