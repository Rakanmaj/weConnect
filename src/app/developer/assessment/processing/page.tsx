"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2, CheckCircle2 } from "lucide-react";
import { PageHeader } from "@/components/ui/common";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/developer/card";
import { ProgressBar } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const STAGES = [
  "Submitting responses",
  "Running code tests",
  "Evaluating architecture answers",
  "Calculating skill breakdown",
  "Determining platform level",
];

export default function AssessmentProcessingPage() {
  const [stage, setStage] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) return 100;
        return p + 2;
      });
    }, 120);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const idx = Math.min(STAGES.length - 1, Math.floor(progress / (100 / STAGES.length)));
    setStage(idx);
  }, [progress]);

  const done = progress >= 100;

  return (
    <div className="max-w-lg mx-auto min-w-0">
      <PageHeader title="Processing Assessment" description="Analyzing your responses and calculating your platform level." />

      <Card className="text-center">
        {!done ? (
          <Loader2 className="h-12 w-12 text-primary animate-spin mx-auto mb-6" />
        ) : (
          <CheckCircle2 className="h-12 w-12 text-success mx-auto mb-6" />
        )}

        <ProgressBar value={progress} showLabel className="mb-8" />

        <div className="space-y-3 text-left">
          {STAGES.map((label, i) => (
            <div
              key={label}
              className={cn(
                "flex items-center gap-3 text-sm transition-opacity",
                i > stage && "opacity-40",
                i === stage && !done && "text-primary font-medium",
                i < stage && "text-teal"
              )}
            >
              {i < stage || done ? (
                <CheckCircle2 className="h-4 w-4 shrink-0" />
              ) : i === stage ? (
                <Loader2 className="h-4 w-4 animate-spin shrink-0" />
              ) : (
                <span className="h-4 w-4 rounded-full border-2 border-border shrink-0" />
              )}
              <span className="truncate">{label}</span>
            </div>
          ))}
        </div>

        {done && (
          <Button className="mt-8 w-full sm:w-auto" asChild>
            <Link href="/developer/assessment/follow-up">View Follow-up Questions</Link>
          </Button>
        )}
      </Card>
    </div>
  );
}
