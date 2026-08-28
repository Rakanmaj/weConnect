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

export default function NewAssessmentPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [created, setCreated] = useState(false);

  return (
    <>
      <Link href="/admin/assessments" className="inline-flex items-center gap-1 text-body-sm text-muted hover:text-foreground mb-4">
        <ArrowLeft className="h-4 w-4" /> Back to assessments
      </Link>
      <PageHeader title="Create Assessment" description="Configure a career-path assessment. Questions can be added after save." />
      <Card className="max-w-2xl">
        <CardContent className="pt-6">
          {created ? (
            <div>
              <p className="text-body-sm text-teal mb-4">Assessment “{name || "Untitled"}” created as a draft.</p>
              <Button onClick={() => router.push("/admin/assessments")}>Back to list</Button>
            </div>
          ) : (
            <>
              <FormField label="Assessment Name" required>
                <Input value={name} onChange={(e) => setName(e.target.value)} />
              </FormField>
              <FormField label="Career Path" required>
                <select className="flex h-11 w-full rounded-[6px] border border-border bg-card px-3 text-sm">
                  {CAREER_PATHS.map((p) => <option key={p}>{p}</option>)}
                </select>
              </FormField>
              <FormField label="Description">
                <Textarea rows={4} />
              </FormField>
              <FormField label="Duration (minutes)">
                <Input type="number" defaultValue={90} />
              </FormField>
              <FormField label="Pass score (%)">
                <Input type="number" defaultValue={70} />
              </FormField>
              <FormField label="Status">
                <select className="flex h-11 w-full rounded-[6px] border border-border bg-card px-3 text-sm">
                  <option>Draft</option>
                  <option>Active</option>
                </select>
              </FormField>
              <label className="flex items-center gap-2 text-sm mb-6">
                <input type="checkbox" defaultChecked className="rounded" />
                Enable AI-generated follow-up questions
              </label>
              <Button disabled={!name.trim()} onClick={() => setCreated(true)}>Create Assessment</Button>
            </>
          )}
        </CardContent>
      </Card>
    </>
  );
}
