"use client";

import { useState } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/ui/common";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/developer/card";
import { Textarea } from "@/components/ui/textarea";
import { assessmentFollowUps } from "@/lib/mock-data";

export default function AssessmentFollowUpPage() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="max-w-3xl mx-auto">
      <PageHeader
        title="AI Follow-up Questions"
        description="Your coding answers triggered follow-up questions that check whether you understand the implementation choices you made. These are not new coding tasks."
      />

      {submitted ? (
        <Card className="text-center">
          <p className="text-h4">Follow-up submitted</p>
          <p className="text-body-sm text-muted mt-2">Your explanations will be included in the assessment result.</p>
          <Button className="mt-6" asChild>
            <Link href="/developer/assessment/results">View Results</Link>
          </Button>
        </Card>
      ) : (
        <div className="space-y-4">
          {assessmentFollowUps.map((q) => (
            <Card key={q.id}>
              <p className="text-caption">Follow-up from {q.sourceQuestionTitle}</p>
              <p className="text-label mt-2">{q.prompt}</p>
              <p className="text-caption mt-2">{q.rationale}</p>
              <Textarea
                className="mt-4"
                rows={4}
                placeholder="Explain your reasoning"
                value={answers[q.id] ?? ""}
                onChange={(e) => setAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))}
              />
            </Card>
          ))}
          <Button onClick={() => setSubmitted(true)}>Submit follow-up answers</Button>
        </div>
      )}
    </div>
  );
}
