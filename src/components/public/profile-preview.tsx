import { ahmadAli } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { VerifiedBadge } from "@/components/ui/verified-badge";
import { MapPin, TrendingUp, CheckCircle2 } from "lucide-react";

export function ProfilePreview() {
  const topSkills = ahmadAli.skills.slice(0, 4);

  return (
    <div className="public-showcase-card">
      <div className="border-b border-border/80 bg-surface/60 px-5 py-3.5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <div className="h-2 w-2 rounded-full bg-red-400 shrink-0" />
          <div className="h-2 w-2 rounded-full bg-amber-400 shrink-0" />
          <div className="h-2 w-2 rounded-full bg-green-400 shrink-0" />
          <span className="text-caption ml-2 truncate">Verified Developer Profile</span>
        </div>
        <Badge variant="teal" size="sm" className="shrink-0">
          Live Preview
        </Badge>
      </div>

      <div className="p-5 lg:p-6">
        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
          <div className="h-14 w-14 rounded-lg bg-navy flex items-center justify-center shrink-0">
            <span className="text-white text-lg font-semibold">
              {ahmadAli.firstName[0]}
              {ahmadAli.lastName[0]}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <h3 className="text-h3 text-foreground truncate">{ahmadAli.name}</h3>
              <Badge variant="primary" size="sm">
                Level {ahmadAli.overallLevel} · {ahmadAli.levelLabel}
              </Badge>
            </div>
            <p className="text-body-sm text-muted mt-0.5 truncate">{ahmadAli.role}</p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2">
              <span className="inline-flex items-center gap-1 text-caption">
                <MapPin className="h-3 w-3 shrink-0" />
                <span className="truncate">{ahmadAli.location}</span>
              </span>
              <VerifiedBadge type="weconnect" />
            </div>
          </div>
        </div>

        <p className="mt-4 text-body-sm text-neutral-dark line-clamp-2">{ahmadAli.bio}</p>

        <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Reliability", value: `${ahmadAli.reliability}%` },
            { label: "Avg Score", value: `${ahmadAli.averageScore}%` },
            { label: "Projects", value: ahmadAli.realProjectsCompleted },
            { label: "Match", value: `${ahmadAli.matchScore}%` },
          ].map((stat) => (
            <div key={stat.label} className="rounded-lg border border-border/70 bg-surface/70 px-3 py-2.5 min-w-0">
              <p className="text-caption truncate">{stat.label}</p>
              <p className="text-h4 text-foreground mt-0.5 truncate">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-5">
          <p className="text-table-header mb-2">Verified Skills</p>
          <div className="flex flex-wrap gap-2">
            {topSkills.map((skill) => (
              <span
                key={skill.name}
                className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1 text-xs font-medium text-neutral-dark"
              >
                <CheckCircle2 className="h-3 w-3 text-teal shrink-0" />
                <span className="truncate">{skill.name}</span>
                <span className="text-muted shrink-0">· {skill.level}</span>
              </span>
            ))}
          </div>
        </div>

        <div className="mt-5 flex items-center gap-2 rounded-md border border-teal/20 bg-teal/5 px-3 py-2.5">
          <TrendingUp className="h-4 w-4 text-teal shrink-0" />
          <p className="text-body-sm text-neutral-dark truncate">
            {ahmadAli.availability} · {ahmadAli.challengesPassed} challenges passed
          </p>
        </div>
      </div>
    </div>
  );
}
