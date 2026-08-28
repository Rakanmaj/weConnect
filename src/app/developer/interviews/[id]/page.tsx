import Link from "next/link";
import { Calendar, Clock, Video, MapPin, User, ExternalLink } from "lucide-react";
import { PageHeader } from "@/components/ui/common";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/developer/card";
import { StatusBadge } from "@/components/ui/status-badges";
import { developerInterview } from "@/lib/mock-data";

export default async function InterviewDetailPage({
  params,
}: PageProps<"/developer/interviews/[id]">) {
  const { id } = await params;
  const interview = { ...developerInterview, id };

  return (
    <div className="max-w-2xl mx-auto min-w-0">
      <PageHeader
        breadcrumb={
          <Link href="/developer/career" className="text-caption text-primary hover:underline">
            ← Back to Career
          </Link>
        }
        title={interview.type}
        description={`${interview.role} at ${interview.company.name}`}
      />

      <Card className="mb-6">
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <StatusBadge status="Active" />
          <span className="text-caption">{interview.status}</span>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { icon: Calendar, label: "Date", value: interview.date },
            { icon: Clock, label: "Time", value: `${interview.time} (${interview.timezone})` },
            { icon: Video, label: "Format", value: interview.format },
            { icon: Clock, label: "Duration", value: interview.duration },
            { icon: User, label: "Interviewer", value: interview.interviewer },
            { icon: MapPin, label: "Location", value: interview.company.location },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-start gap-3 min-w-0">
              <Icon className="h-4 w-4 text-muted shrink-0 mt-0.5" />
              <div className="min-w-0">
                <p className="text-caption">{label}</p>
                <p className="text-sm font-medium truncate">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="mb-6">
        <h3 className="text-h4 text-foreground mb-2">Preparation Notes</h3>
        <p className="text-body-sm text-muted">{interview.notes}</p>
      </Card>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button asChild className="flex-1">
          <a href={interview.meetingLink} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-4 w-4" />
            Join Meeting
          </a>
        </Button>
        <Button variant="secondary" className="flex-1">Reschedule</Button>
        <Button variant="ghost" className="flex-1">Decline</Button>
      </div>
    </div>
  );
}
