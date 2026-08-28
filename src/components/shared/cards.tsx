import Link from "next/link";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { LevelBadge, SkillBadge } from "@/components/ui/status-badges";
import { VerifiedBadge } from "@/components/ui/verified-badge";
import { MatchScore, PerformanceMetric } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import type { Developer } from "@/types";
import { matchReasons } from "@/lib/mock-data";

interface DeveloperCardProps {
  developer: Developer;
  showMatch?: boolean;
  showActions?: boolean;
  href?: string;
  className?: string;
  compact?: boolean;
}

export function DeveloperCard({
  developer,
  showMatch,
  showActions,
  href,
  className,
  compact,
}: DeveloperCardProps) {
  const reasons = matchReasons[developer.id] || [];

  const content = (
    <div
      className={cn(
        "border border-border rounded-[10px] bg-white p-5 min-w-0",
        href && "hover:border-primary/30 transition-colors",
        className
      )}
    >
      <div className="flex items-start gap-4">
        <Avatar name={developer.name} size={compact ? "md" : "lg"} />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="text-h4 text-navy truncate">{developer.name}</h3>
              <p className="text-body-sm text-muted truncate">{developer.role}</p>
            </div>
            {showMatch && developer.matchScore && (
              <MatchScore score={developer.matchScore} size="sm" className="shrink-0 text-right" />
            )}
          </div>
          <div className="mt-2">
            <LevelBadge level={developer.overallLevel} />
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {developer.accountVerified && <VerifiedBadge type="account" />}
            {developer.weconnectVerified && <VerifiedBadge type="weconnect" />}
          </div>
          {!compact && (
            <>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {developer.skills.slice(0, 3).map((skill) => (
                  <SkillBadge key={skill.name} name={skill.name} level={skill.level} verified={skill.verified} />
                ))}
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-border">
                <PerformanceMetric label="Avg Score" value={`${developer.averageScore}%`} />
                <PerformanceMetric label="Reliability" value={`${developer.reliability}%`} />
                <PerformanceMetric label="Projects" value={developer.realProjectsCompleted} />
              </div>
              {reasons.length > 0 && (
                <div className="mt-4">
                  <p className="text-caption font-medium mb-2">Why matched</p>
                  <ul className="space-y-1">
                    {reasons.map((r) => (
                      <li key={r} className="text-body-sm text-muted flex items-center gap-2">
                        <span className="h-1 w-1 rounded-full bg-teal shrink-0" />
                        <span className="truncate">{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
          {showActions && (
            <div className="flex gap-2 mt-4">
              <Button size="sm" asChild>
                <Link href={`/company/talent/${developer.id}`}>View Profile</Link>
              </Button>
              <Button variant="secondary" size="sm">Save</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  if (href) {
    return <Link href={href} className="block min-w-0">{content}</Link>;
  }
  return content;
}

interface ProjectCardProps {
  title: string;
  company: string;
  type: string;
  status: string;
  technologies: string[];
  deadline?: string;
  matchScore?: number;
  href?: string;
  verified?: boolean;
}

export function ProjectCard({
  title,
  company,
  type,
  status,
  technologies,
  deadline,
  matchScore,
  href,
  verified,
}: ProjectCardProps) {
  const content = (
    <div className="border border-border rounded-[10px] bg-white p-5 min-w-0 hover:border-primary/30 transition-colors">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="min-w-0 flex-1">
          <h3 className="text-h4 text-navy truncate">{title}</h3>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <span className="text-body-sm text-muted truncate">{company}</span>
            {verified && <VerifiedBadge type="company" />}
          </div>
        </div>
        {matchScore && <MatchScore score={matchScore} size="sm" className="shrink-0" />}
      </div>
      <div className="flex flex-wrap gap-2 mb-3">
        <span className="text-xs font-medium px-2 py-0.5 rounded-[6px] bg-surface border border-border">{type}</span>
        <span className="text-xs font-medium px-2 py-0.5 rounded-[6px] bg-blue-50 text-primary border border-blue-100">{status}</span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {technologies.slice(0, 4).map((t) => (
          <span key={t} className="text-xs text-muted bg-surface px-2 py-0.5 rounded-[4px] truncate max-w-[120px]">{t}</span>
        ))}
      </div>
      {deadline && (
        <p className="text-caption mt-3">Deadline: {deadline}</p>
      )}
    </div>
  );

  if (href) {
    return <Link href={href} className="block min-w-0">{content}</Link>;
  }
  return content;
}
