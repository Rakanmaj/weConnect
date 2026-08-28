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
import { adminSkills, adminAssessments, adminChallenges } from "@/lib/mock-data";
import { CAREER_PATHS } from "@/lib/platform-config";

export default function AdminSkillDetailPage({ params }: PageProps<"/admin/skills/[id]">) {
  const { id } = use(params);
  const skill = adminSkills.find((s) => s.id === id);
  if (!skill) notFound();

  const [status, setStatus] = useState(skill.status);
  const [saved, setSaved] = useState(false);
  const assessments = adminAssessments.filter((a) => skill.assessmentIds.includes(a.id));
  const challenges = adminChallenges.filter((c) => c.skill === skill.name);

  return (
    <>
      <Link href="/admin/skills" className="inline-flex items-center gap-1 text-body-sm text-muted mb-4"><ArrowLeft className="h-4 w-4" /> Back to skills</Link>
      <PageHeader title={skill.name} description={skill.category} action={<StatusBadge status={status} />} />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardContent className="pt-6">
            <FormField label="Skill name"><Input defaultValue={skill.name} /></FormField>
            <FormField label="Category"><Input defaultValue={skill.category} /></FormField>
            <FormField label="Related career paths">
              <div className="space-y-2">
                {CAREER_PATHS.map((p) => (
                  <label key={p} className="flex items-center gap-2 text-sm">
                    <input type="checkbox" defaultChecked={skill.careerPaths.includes(p)} className="rounded" />
                    {p}
                  </label>
                ))}
              </div>
            </FormField>
            <FormField label="Description"><Textarea rows={3} defaultValue={skill.description} /></FormField>
            <div className="flex gap-2">
              <Button onClick={() => setSaved(true)}>Save</Button>
              <Button variant="secondary" onClick={() => setStatus(status === "Active" ? "Archived" : "Active")}>
                {status === "Active" ? "Disable / Archive" : "Reactivate"}
              </Button>
            </div>
            {saved && <p className="text-caption text-teal mt-3">Skill updated.</p>}
          </CardContent>
        </Card>
        <div className="space-y-4">
          <Card>
            <CardContent className="pt-6 space-y-2 text-body-sm">
              <p className="text-caption">Challenge path</p>
              <p>Level 1 → Level 2 → Master</p>
              <p className="text-caption">Used in</p>
              <p>{assessments.length} assessments</p>
              <p>{challenges.length} challenges</p>
              <p>{skill.developerCount.toLocaleString()} developers</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
