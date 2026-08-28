"use client";

import { notFound } from "next/navigation";
import { use, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PageHeader, FormField } from "@/components/ui/common";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badges";
import { adminChallenges, adminSkills } from "@/lib/mock-data";

export default function AdminChallengeDetailPage({ params }: PageProps<"/admin/challenges/[id]">) {
  const { id } = use(params);
  const challenge = adminChallenges.find((c) => c.id === id);
  if (!challenge) notFound();
  const [status, setStatus] = useState(challenge.status);
  const [saved, setSaved] = useState(false);

  return (
    <>
      <Link href="/admin/challenges" className="inline-flex items-center gap-1 text-body-sm text-muted mb-4"><ArrowLeft className="h-4 w-4" /> Back to challenges</Link>
      <PageHeader title={challenge.name} description={`${challenge.skill} · ${challenge.level}`} action={<StatusBadge status={status} />} />
      <Card className="max-w-2xl">
        <CardContent className="pt-6">
          <FormField label="Name"><Input defaultValue={challenge.name} /></FormField>
          <FormField label="Skill">
            <select defaultValue={challenge.skill} className="flex h-11 w-full rounded-[6px] border border-border bg-card px-3 text-sm">
              {adminSkills.map((s) => <option key={s.id}>{s.name}</option>)}
            </select>
          </FormField>
          <FormField label="Challenge level">
            <select defaultValue={challenge.level} className="flex h-11 w-full rounded-[6px] border border-border bg-card px-3 text-sm">
              <option>Level 1</option>
              <option>Level 2</option>
              <option>Master</option>
            </select>
          </FormField>
          <FormField label="Description"><Textarea rows={3} defaultValue={challenge.description} /></FormField>
          <FormField label="Difficulty">
            <select defaultValue={challenge.difficulty} className="flex h-11 w-full rounded-[6px] border border-border bg-card px-3 text-sm">
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </FormField>
          <FormField label="Instructions"><Textarea rows={4} defaultValue={challenge.instructions} /></FormField>
          <FormField label="Starter code"><Textarea rows={4} defaultValue={challenge.starterCode} /></FormField>
          <FormField label="Test cases"><Textarea rows={3} defaultValue={(challenge.testCases ?? []).join("\n")} /></FormField>
          <div className="flex gap-2">
            <Button onClick={() => setSaved(true)}>Save</Button>
            <Button variant="secondary" onClick={() => setStatus(status === "Active" ? "Archived" : "Active")}>
              {status === "Active" ? "Disable / Archive" : "Reactivate"}
            </Button>
          </div>
          {saved && <p className="text-caption text-teal mt-3">Challenge updated.</p>}
        </CardContent>
      </Card>
    </>
  );
}
