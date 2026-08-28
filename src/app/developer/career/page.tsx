import Link from "next/link";
import { Calendar, Video, FileText, ArrowRight } from "lucide-react";
import { PageHeader, SectionHeader } from "@/components/ui/common";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/developer/card";
import { StatusBadge } from "@/components/ui/status-badges";
import { Avatar } from "@/components/ui/avatar";
import { hiringPipeline, ahmadAli, developerOffer } from "@/lib/mock-data";

const STAGE_ORDER = [
  "Recommended",
  "Interview Requested",
  "Interview Scheduled",
  "Offer",
  "Hired",
  "Rejected",
];

export default function CareerPage() {
  const myPipeline = hiringPipeline.filter((h) => h.developer.id === ahmadAli.id);
  const myEntry = myPipeline[0];
  const stageIndex = myEntry ? STAGE_ORDER.indexOf(myEntry.stage) : -1;

  return (
    <div className="min-w-0 space-y-8">
      <PageHeader
        title="Career"
        description="Track hiring pipeline, interview requests, and offers from companies."
      />

      {/* Pipeline visualization */}
      {myEntry && (
        <Card>
          <SectionHeader title="Your Hiring Pipeline" description={`${myEntry.role} at ${myEntry.company}`} />
          <div className="flex flex-wrap gap-2 mb-4">
            {STAGE_ORDER.slice(0, 5).map((stage, i) => (
              <div
                key={stage}
                className={`flex items-center gap-2 text-xs px-3 py-1.5 rounded-[6px] ${
                  i <= stageIndex ? "bg-teal/10 text-teal font-medium" : "bg-surface text-muted"
                }`}
              >
                {stage}
                {i < 4 && <ArrowRight className="h-3 w-3 hidden sm:inline" />}
              </div>
            ))}
          </div>
          <p className="text-body-sm text-muted">{myEntry.lastActivity}</p>
          <Button className="mt-4" size="sm" asChild>
            <Link href="/developer/interviews/int-1">View Interview</Link>
          </Button>
        </Card>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Interview requests */}
        <section>
          <SectionHeader title="Interview Requests" />
          <Card>
            <div className="flex items-start gap-4 min-w-0">
              <Avatar name={ahmadAli.name} size="md" />
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <p className="font-medium truncate">Full-Stack Developer</p>
                  <StatusBadge status="Active" />
                </div>
                <p className="text-body-sm text-muted truncate">TechFlow Solutions</p>
                <div className="flex items-center gap-2 mt-2 text-caption">
                  <Calendar className="h-3.5 w-3.5 shrink-0" />
                  <span>Aug 25, 2026 at 14:00</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  <Button size="sm" asChild>
                    <Link href="/developer/interviews/int-1">View Details</Link>
                  </Button>
                  <Button size="sm" variant="secondary">Reschedule</Button>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Offers */}
        <section>
          <SectionHeader title="Offers" />
          <Card>
            <div className="flex items-start gap-3 min-w-0">
              <div className="h-10 w-10 rounded-[6px] bg-green-50 flex items-center justify-center shrink-0">
                <FileText className="h-5 w-5 text-success" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{developerOffer.role}</p>
                <p className="text-body-sm text-muted truncate">{developerOffer.company.name}</p>
                <p className="text-sm font-medium text-foreground mt-2">{developerOffer.salary}</p>
                <p className="text-caption">Expires {developerOffer.expiresAt}</p>
                <Button size="sm" className="mt-4" asChild>
                  <Link href={`/developer/offers/${developerOffer.id}`}>Review Offer</Link>
                </Button>
              </div>
            </div>
          </Card>
        </section>
      </div>

      {/* All pipeline entries for context */}
      <section>
        <SectionHeader title="Platform Activity" description="Other developers in hiring pipeline (demo context)." />
        <div className="space-y-3">
          {hiringPipeline.map((h) => (
            <Card key={h.id} padding={false} className="p-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 min-w-0">
                <div className="flex items-center gap-3 min-w-0">
                  <Avatar name={h.developer.name} size="sm" />
                  <div className="min-w-0">
                    <p className="font-medium truncate">{h.developer.name}</p>
                    <p className="text-caption truncate">{h.role} · {h.company}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <StatusBadge status={h.stage === "Offer" ? "Submitted" : "Active"} />
                  <span className="text-caption whitespace-nowrap">{h.lastActivity}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
