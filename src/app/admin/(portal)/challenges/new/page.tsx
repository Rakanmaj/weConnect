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
import { adminSkills } from "@/lib/mock-data";

export default function NewChallengePage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [saved, setSaved] = useState(false);

  return (
    <>
      <Link href="/admin/challenges" className="inline-flex items-center gap-1 text-body-sm text-muted mb-4"><ArrowLeft className="h-4 w-4" /> Back</Link>
      <PageHeader title="Create Challenge" />
      <Card className="max-w-2xl">
        <CardContent className="pt-6">
          {saved ? (
            <div>
              <p className="text-body-sm text-teal mb-4">Challenge created.</p>
              <Button onClick={() => router.push("/admin/challenges")}>Back to challenges</Button>
            </div>
          ) : (
            <>
              <FormField label="Name" required><Input value={name} onChange={(e) => setName(e.target.value)} /></FormField>
              <FormField label="Skill">
                <select className="flex h-11 w-full rounded-[6px] border border-border bg-card px-3 text-sm">
                  {adminSkills.map((s) => <option key={s.id}>{s.name}</option>)}
                </select>
              </FormField>
              <FormField label="Challenge level">
                <select className="flex h-11 w-full rounded-[6px] border border-border bg-card px-3 text-sm">
                  <option>Level 1</option>
                  <option>Level 2</option>
                  <option>Master</option>
                </select>
              </FormField>
              <FormField label="Description"><Textarea rows={3} /></FormField>
              <FormField label="Difficulty">
                <select className="flex h-11 w-full rounded-[6px] border border-border bg-card px-3 text-sm">
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </FormField>
              <FormField label="Instructions"><Textarea rows={4} /></FormField>
              <FormField label="Starter code"><Textarea rows={4} /></FormField>
              <FormField label="Test cases / evaluation configuration"><Textarea rows={3} /></FormField>
              <Button disabled={!name.trim()} onClick={() => setSaved(true)}>Create Challenge</Button>
            </>
          )}
        </CardContent>
      </Card>
    </>
  );
}
