"use client";

import { notFound, useRouter, useSearchParams } from "next/navigation";
import { Suspense, use, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, ChevronUp, ChevronDown } from "lucide-react";
import { PageHeader, FormField } from "@/components/ui/common";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { StatusBadge } from "@/components/ui/status-badges";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { adminAssessments, adminQuestions } from "@/lib/mock-data";
import { CAREER_PATHS } from "@/lib/platform-config";
import type { AssessmentQuestion, QuestionType } from "@/types";

const QUESTION_TYPES: QuestionType[] = [
  "Multiple Choice",
  "Coding",
  "Debugging",
  "Architecture / Scenario",
  "Explanation / Reasoning",
];

function AdminAssessmentDetailPage({ params }: PageProps<"/admin/assessments/[id]">) {
  const { id } = use(params);
  const searchParams = useSearchParams();
  const router = useRouter();
  const found = adminAssessments.find((a) => a.id === id);
  const assessment = found ?? adminAssessments[0];
  const [status, setStatus] = useState(assessment.status);
  const [aiFollowUp, setAiFollowUp] = useState(assessment.aiFollowUpEnabled);
  const [saved, setSaved] = useState(false);
  const [questions, setQuestions] = useState<AssessmentQuestion[]>(
    adminQuestions.filter((q) => q.assessmentId === assessment.id).sort((a, b) => a.order - b.order)
  );
  const [editing, setEditing] = useState<AssessmentQuestion | null>(null);
  const [preview, setPreview] = useState<AssessmentQuestion | null>(null);
  const [archiveId, setArchiveId] = useState<string | null>(null);
  const tab = searchParams.get("tab") || "details";

  if (!found) notFound();

  const move = (index: number, dir: -1 | 1) => {
    const next = index + dir;
    if (next < 0 || next >= questions.length) return;
    const copy = [...questions];
    [copy[index], copy[next]] = [copy[next], copy[index]];
    setQuestions(copy.map((q, i) => ({ ...q, order: i + 1 })));
  };

  return (
    <>
      <Link href="/admin/assessments" className="inline-flex items-center gap-1 text-body-sm text-muted hover:text-foreground mb-4">
        <ArrowLeft className="h-4 w-4" /> Back to assessments
      </Link>
      <PageHeader title={assessment.name} description={assessment.careerPath} action={<StatusBadge status={status} />} />

      <Tabs value={tab} onValueChange={(v) => router.push(`/admin/assessments/${id}?tab=${v}`)}>
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="questions">Question Bank</TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <Card className="max-w-2xl">
            <CardContent className="pt-6">
              <FormField label="Assessment Name">
                <Input defaultValue={assessment.name} />
              </FormField>
              <FormField label="Career Path">
                <select defaultValue={assessment.careerPath} className="flex h-11 w-full rounded-[6px] border border-border bg-card px-3 text-sm">
                  {CAREER_PATHS.map((p) => <option key={p}>{p}</option>)}
                </select>
              </FormField>
              <FormField label="Description">
                <Textarea rows={4} defaultValue={assessment.description} />
              </FormField>
              <FormField label="Duration (minutes)">
                <Input type="number" defaultValue={assessment.duration} />
              </FormField>
              <FormField label="Question count">
                <Input readOnly value={questions.length} />
              </FormField>
              <FormField label="Pass score (%)">
                <Input type="number" defaultValue={assessment.passScore} />
              </FormField>
              <label className="flex items-center gap-2 text-sm mb-4">
                <input type="checkbox" checked={aiFollowUp} onChange={(e) => setAiFollowUp(e.target.checked)} className="rounded" />
                Enable AI-generated follow-up questions
              </label>
              <div className="flex gap-2">
                <Button onClick={() => setSaved(true)}>Save</Button>
                <Button variant="secondary" onClick={() => setStatus(status === "Active" ? "Disabled" : "Active")}>
                  {status === "Active" ? "Disable / Archive" : "Reactivate"}
                </Button>
              </div>
              {saved && <p className="text-caption text-teal mt-3">Assessment updated.</p>}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="questions">
          <div className="flex justify-end mb-4">
            <Button onClick={() => setEditing({
              id: `q-new-${questions.length + 1}`,
              assessmentId: assessment.id,
              order: questions.length + 1,
              type: "Multiple Choice",
              prompt: "",
              points: 10,
              status: "Draft",
              aiFollowUpEnabled: aiFollowUp,
            })}>
              <Plus className="h-4 w-4" /> Add Question
            </Button>
          </div>
          <div className="space-y-3">
            {questions.map((q, i) => (
              <Card key={q.id}>
                <CardContent className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-label truncate">Q{q.order} · {q.type}</p>
                    <p className="text-body-sm text-muted truncate">{q.prompt}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="ghost" size="sm" onClick={() => move(i, -1)}><ChevronUp className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="sm" onClick={() => move(i, 1)}><ChevronDown className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="sm" onClick={() => setPreview(q)}>Preview</Button>
                    <Button variant="ghost" size="sm" onClick={() => setEditing(q)}>Edit</Button>
                    <Button variant="ghost" size="sm" onClick={() => setArchiveId(q.id)}>Archive</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {editing && (
        <QuestionForm
          question={editing}
          onClose={() => setEditing(null)}
          onSave={(q) => {
            setQuestions((prev) => {
              const exists = prev.some((p) => p.id === q.id);
              return exists ? prev.map((p) => (p.id === q.id ? q : p)) : [...prev, q];
            });
            setEditing(null);
          }}
        />
      )}

      <ConfirmDialog
        open={Boolean(preview)}
        onOpenChange={() => setPreview(null)}
        title={preview ? `${preview.type}` : "Preview"}
        description={preview?.prompt ?? ""}
        confirmLabel="Close"
        onConfirm={() => setPreview(null)}
      />
      <ConfirmDialog
        open={Boolean(archiveId)}
        onOpenChange={() => setArchiveId(null)}
        title="Archive question?"
        description="The question will be removed from the active bank."
        confirmLabel="Archive"
        variant="destructive"
        onConfirm={() => {
          setQuestions((prev) => prev.filter((q) => q.id !== archiveId));
          setArchiveId(null);
        }}
      />
    </>
  );
}

function QuestionForm({
  question,
  onClose,
  onSave,
}: {
  question: AssessmentQuestion;
  onClose: () => void;
  onSave: (q: AssessmentQuestion) => void;
}) {
  const [draft, setDraft] = useState(question);
  const coding = draft.type === "Coding" || draft.type === "Debugging";

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-end sm:items-center justify-center p-4">
      <Card className="w-full max-w-xl max-h-[90vh] overflow-y-auto">
        <CardContent className="pt-6">
          <h3 className="text-h3 mb-4">{question.prompt ? "Edit Question" : "Add Question"}</h3>
          <FormField label="Type">
            <select
              value={draft.type}
              onChange={(e) => setDraft({ ...draft, type: e.target.value as QuestionType })}
              className="flex h-11 w-full rounded-[6px] border border-border bg-card px-3 text-sm"
            >
              {QUESTION_TYPES.map((t) => <option key={t}>{t}</option>)}
            </select>
          </FormField>
          <FormField label="Prompt" required>
            <Textarea rows={4} value={draft.prompt} onChange={(e) => setDraft({ ...draft, prompt: e.target.value })} />
          </FormField>
          {draft.type === "Multiple Choice" && (
            <FormField label="Options (one per line)">
              <Textarea
                rows={4}
                value={(draft.options ?? ["", "", "", ""]).join("\n")}
                onChange={(e) => setDraft({ ...draft, options: e.target.value.split("\n") })}
              />
            </FormField>
          )}
          {coding && (
            <>
              <FormField label="Language / technology">
                <Input value={draft.language ?? "JavaScript"} onChange={(e) => setDraft({ ...draft, language: e.target.value })} />
              </FormField>
              <FormField label="Starter code">
                <Textarea rows={5} value={draft.starterCode ?? ""} onChange={(e) => setDraft({ ...draft, starterCode: e.target.value })} />
              </FormField>
              <FormField label="Expected outcome / test cases">
                <Textarea
                  rows={3}
                  value={(draft.testCases ?? []).join("\n")}
                  onChange={(e) => setDraft({ ...draft, testCases: e.target.value.split("\n"), expectedOutcome: e.target.value })}
                />
              </FormField>
            </>
          )}
          <label className="flex items-center gap-2 text-sm mb-4">
            <input
              type="checkbox"
              checked={draft.aiFollowUpEnabled}
              onChange={(e) => setDraft({ ...draft, aiFollowUpEnabled: e.target.checked })}
              className="rounded"
            />
            Enable AI-generated follow-up questions
          </label>
          <div className="flex gap-2">
            <Button onClick={() => onSave({ ...draft, status: "Active" })}>Save question</Button>
            <Button variant="secondary" onClick={onClose}>Cancel</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function AdminAssessmentDetailRoute(props: PageProps<"/admin/assessments/[id]">) {
  return (
    <Suspense>
      <AdminAssessmentDetailPage {...props} />
    </Suspense>
  );
}
