"use client";

import { useState } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/ui/common";
import { Card } from "@/components/developer/card";
import { Button } from "@/components/ui/button";
import { CAREER_PATHS } from "@/lib/platform-config";

export default function CareerPathPage() {
  const [path, setPath] = useState<(typeof CAREER_PATHS)[number] | "">("Full-Stack Developer");
  const [saved, setSaved] = useState(false);

  return (
    <div className="max-w-2xl mx-auto">
      <PageHeader
        title="Choose Career Path"
        description="Select the career path used for your initial assessment. This happens after your account is verified. A preferred job position given at registration is not the finalized assessment path."
      />
      <Card>
        <div className="space-y-3">
          {CAREER_PATHS.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPath(p)}
              className={`w-full rounded-[8px] border p-4 text-left ${path === p ? "border-primary bg-blue-50" : "border-border hover:bg-surface"}`}
            >
              <p className="text-label">{p}</p>
            </button>
          ))}
        </div>
        {saved ? (
          <div className="mt-6">
            <p className="text-body-sm text-teal mb-3">Career path saved: {path}. You can now take the initial assessment.</p>
            <Button asChild>
              <Link href="/developer/assessment?view=intro">Start Assessment</Link>
            </Button>
          </div>
        ) : (
          <Button className="mt-6" disabled={!path} onClick={() => setSaved(true)}>
            Confirm career path
          </Button>
        )}
      </Card>
    </div>
  );
}
