import Link from "next/link";
import { Clock, Code } from "lucide-react";
import { PageHeader } from "@/components/ui/common";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/developer/card";
import { StatusBadge } from "@/components/ui/status-badges";
import { internalProjects } from "@/lib/mock-data";

export default function InternalProjectsPage() {
  return (
    <div className="min-w-0">
      <PageHeader
        title="Internal Projects"
        description="WeConnect platform projects that count toward WeConnect Verified status."
        action={
          <Button variant="secondary" size="sm" asChild>
            <Link href="/developer/verified">Verification Progress</Link>
          </Button>
        }
      />

      <div className="grid sm:grid-cols-2 gap-4">
        {internalProjects.map((p) => (
          <Card key={p.id}>
            <div className="flex items-start justify-between gap-2 mb-3">
              <div className="h-10 w-10 rounded-[6px] bg-navy/5 flex items-center justify-center shrink-0">
                <Code className="h-5 w-5 text-foreground" />
              </div>
              <StatusBadge status={p.status === "Open" ? "Invitation" : "Active"} />
            </div>
            <h3 className="text-h4 text-foreground mb-2 line-clamp-2">{p.title}</h3>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {p.skills.map((t) => (
                <span key={t} className="text-xs px-2 py-0.5 rounded-[6px] bg-surface">{t}</span>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-4 text-caption">
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {p.duration}
              </span>
              <span>{p.difficulty}</span>
              <span>{p.careerPath}</span>
            </div>
            {p.status === "Open" ? (
              <Button size="sm" className="mt-4 w-full sm:w-auto" asChild>
                <Link href="/developer/projects/invitations/proj-inv-1">Review &amp; Apply</Link>
              </Button>
            ) : (
              <Button size="sm" className="mt-4 w-full sm:w-auto" variant="secondary" asChild>
                <Link href="/developer/projects/proj-active-1">Open Workspace</Link>
              </Button>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
