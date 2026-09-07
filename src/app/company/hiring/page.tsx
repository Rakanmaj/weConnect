"use client";

import Link from "next/link";
import { PageHeader } from "@/components/ui/common";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { hiringPipeline } from "@/lib/mock-data";
import type { HiringStage } from "@/types";
import { Button } from "@/components/ui/button";

const stages: HiringStage[] = [
  "Recommended",
  "Interview Requested",
  "Interview Scheduled",
  "Offer",
  "Hired",
  "Rejected",
];

export default function CompanyHiringPage() {
  return (
    <>
      <PageHeader
        title="Hiring Pipeline"
        description="Track candidates from recommendation through hire."
      />

      <div className="flex gap-4 overflow-x-auto pb-4">
        {stages.map((stage) => {
          const candidates = hiringPipeline.filter((c) => c.stage === stage);
          return (
            <div key={stage} className="flex-shrink-0 w-72">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-label text-foreground">{stage}</h2>
                <Badge variant="default" size="sm">{candidates.length}</Badge>
              </div>
              <div className="space-y-3 min-h-[200px] rounded-[10px] bg-surface/80 p-3 border border-border">
                {candidates.length === 0 ? (
                  <p className="text-caption text-center py-8">No candidates</p>
                ) : (
                  candidates.map((candidate) => (
                    <Card key={candidate.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Avatar name={candidate.developer.name} size="sm" />
                          <div className="min-w-0">
                            <p className="text-body-sm font-medium text-foreground truncate">
                              {candidate.developer.name}
                            </p>
                            <p className="text-caption truncate">{candidate.role}</p>
                          </div>
                        </div>
                        <p className="text-caption">{candidate.lastActivity}</p>
                        <Button size="sm" variant="secondary" className="mt-3 w-full" asChild>
                          <Link href={`/company/talent/${candidate.developer.id}`}>View Candidate</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-6 flex justify-end">
        <Button asChild><Link href="/company/interviews">Continue to Interviews</Link></Button>
      </div>
    </>
  );
}
