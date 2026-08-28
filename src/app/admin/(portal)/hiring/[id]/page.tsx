import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PageHeader } from "@/components/ui/common";
import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badges";
import { Avatar } from "@/components/ui/avatar";
import { Timeline } from "@/components/shared/timeline";
import { hiringPipeline } from "@/lib/mock-data";

const PIPELINE = ["Recommended", "Interview Requested", "Interview Scheduled", "Offer", "Hired"] as const;

export default async function AdminHiringDetailPage({ params }: PageProps<"/admin/hiring/[id]">) {
  const { id } = await params;
  const record = hiringPipeline.find((h) => h.id === id);
  if (!record) notFound();

  const stageIndex = PIPELINE.indexOf(record.stage as (typeof PIPELINE)[number]);

  return (
    <>
      <Link href="/admin/hiring" className="inline-flex items-center gap-1 text-body-sm text-muted mb-4">
        <ArrowLeft className="h-4 w-4" /> Back to hiring
      </Link>
      <PageHeader
        title={`${record.developer.name} · ${record.role}`}
        description={`${record.company} · Admin monitors this journey. The company remains responsible for hiring decisions.`}
        action={<StatusBadge status={record.stage} />}
      />

      <div className="flex flex-wrap gap-2 mb-6">
        {PIPELINE.map((stage, i) => (
          <span
            key={stage}
            className={`text-xs px-3 py-1.5 rounded-[6px] ${i <= stageIndex ? "bg-teal/10 text-teal font-medium" : "bg-surface text-muted"}`}
          >
            {stage}
          </span>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardContent className="pt-6">
            <h2 className="text-h4 mb-4">Journey</h2>
            <Timeline
              items={(record.timeline ?? []).map((e, i, arr) => ({
                id: e.id,
                title: e.stage,
                description: `${e.detail} · ${e.actor}`,
                date: e.date,
                status: i === arr.length - 1 ? "current" : "complete",
              }))}
            />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <Avatar name={record.developer.name} size="lg" className="mx-auto" />
            <p className="text-label mt-3">{record.developer.name}</p>
            <p className="text-caption">{record.lastActivity}</p>
            {record.hiringFee != null && <p className="text-caption mt-2">Hiring fee is separate from project commission.</p>}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
