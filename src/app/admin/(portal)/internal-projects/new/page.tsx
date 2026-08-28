"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PageHeader, FormField } from "@/components/ui/common";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CAREER_PATHS } from "@/lib/platform-config";
import type { InternalProject } from "@/types";

export function InternalProjectForm({
  title,
  initial,
  submitLabel,
}: {
  title: string;
  initial?: Partial<InternalProject>;
  submitLabel: string;
}) {
  const router = useRouter();
  const [name, setName] = useState(initial?.title ?? "");
  const [saved, setSaved] = useState(false);

  return (
    <>
      <Link href="/admin/internal-projects" className="inline-flex items-center gap-1 text-body-sm text-muted mb-4">
        <ArrowLeft className="h-4 w-4" /> Back to internal projects
      </Link>
      <PageHeader title={title} />
      <Card className="max-w-2xl">
        <CardContent className="pt-6">
          {saved ? (
            <div>
              <p className="text-body-sm text-teal mb-4">Project saved.</p>
              <Button onClick={() => router.push("/admin/internal-projects")}>Back to list</Button>
            </div>
          ) : (
            <>
              <FormField label="Project title" required><Input value={name} onChange={(e) => setName(e.target.value)} /></FormField>
              <FormField label="Description" required><Textarea rows={4} defaultValue={initial?.description} /></FormField>
              <FormField label="Career path" required>
                <select defaultValue={initial?.careerPath} className="flex h-11 w-full rounded-[6px] border border-border bg-card px-3 text-sm">
                  {CAREER_PATHS.map((p) => <option key={p}>{p}</option>)}
                </select>
              </FormField>
              <FormField label="Required skills" helper="Comma-separated"><Input defaultValue={initial?.skills?.join(", ")} /></FormField>
              <FormField label="Functional requirements" helper="One per line"><Textarea rows={4} defaultValue={initial?.functionalRequirements?.join("\n")} /></FormField>
              <FormField label="Technical requirements"><Textarea rows={4} defaultValue={initial?.technicalRequirements?.join("\n")} /></FormField>
              <FormField label="Expected deliverables"><Textarea rows={3} defaultValue={initial?.deliverables?.join("\n")} /></FormField>
              <FormField label="Difficulty / complexity">
                <select defaultValue={initial?.difficulty} className="flex h-11 w-full rounded-[6px] border border-border bg-card px-3 text-sm">
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </FormField>
              <FormField label="Duration"><Input defaultValue={initial?.duration ?? "3 weeks"} /></FormField>
              <FormField label="Estimated workload"><Input defaultValue={initial?.estimatedWorkload ?? "20 hrs/week"} /></FormField>
              <FormField label="Status">
                <select defaultValue={initial?.status ?? "Draft"} className="flex h-11 w-full rounded-[6px] border border-border bg-card px-3 text-sm">
                  <option>Draft</option>
                  <option>Open</option>
                  <option>In Progress</option>
                  <option>Archived</option>
                </select>
              </FormField>
              <Button disabled={!name.trim()} onClick={() => setSaved(true)}>{submitLabel}</Button>
            </>
          )}
        </CardContent>
      </Card>
    </>
  );
}

export default function NewInternalProjectPage() {
  return <InternalProjectForm title="Create internal project" submitLabel="Create project" />;
}
