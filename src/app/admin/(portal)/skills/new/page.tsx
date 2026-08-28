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

export default function NewSkillPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [saved, setSaved] = useState(false);

  return (
    <>
      <Link href="/admin/skills" className="inline-flex items-center gap-1 text-body-sm text-muted mb-4"><ArrowLeft className="h-4 w-4" /> Back to skills</Link>
      <PageHeader title="Add Skill" />
      <Card className="max-w-xl">
        <CardContent className="pt-6">
          {saved ? (
            <div>
              <p className="text-body-sm text-teal mb-4">{name} added to the skill catalog.</p>
              <Button onClick={() => router.push("/admin/skills")}>Back to skills</Button>
            </div>
          ) : (
            <>
              <FormField label="Skill name" required><Input value={name} onChange={(e) => setName(e.target.value)} /></FormField>
              <FormField label="Category"><Input defaultValue="Frontend" /></FormField>
              <FormField label="Related career paths">
                <div className="space-y-2">
                  {CAREER_PATHS.map((p) => (
                    <label key={p} className="flex items-center gap-2 text-sm"><input type="checkbox" defaultChecked className="rounded" />{p}</label>
                  ))}
                </div>
              </FormField>
              <FormField label="Description"><Textarea rows={3} /></FormField>
              <Button disabled={!name.trim()} onClick={() => setSaved(true)}>Create skill</Button>
            </>
          )}
        </CardContent>
      </Card>
    </>
  );
}
