import Link from "next/link";
import {
  Briefcase,
  Mail,
  TrendingUp,
  Calendar,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { PageHeader, SectionHeader } from "@/components/ui/common";
import { Button } from "@/components/ui/button";
import { Card, StatCard } from "@/components/developer/card";
import { LevelBadge, StatusBadge } from "@/components/ui/status-badges";
import { VerifiedBadge } from "@/components/ui/verified-badge";
import { ProgressBar, MatchScore, PerformanceMetric } from "@/components/ui/progress";
import {
  ahmadAli,
  customerSupportProject,
  developerProjects,
  developerNotifications,
  skillChallenges,
  hiringPipeline,
} from "@/lib/mock-data";

export default function DeveloperDashboardPage() {
  const invitation = developerProjects.find((p) =>
    p.assignments?.some((a) => a.developerId === ahmadAli.id && (a.invitationStatus === "Invited" || a.invitationStatus === "Pending Response"))
  );
  const unread = developerNotifications.filter((n) => !n.read).length;
  const interview = hiringPipeline.find((h) => h.developer.id === ahmadAli.id);

  return (
    <div className="min-w-0 space-y-8">
      <PageHeader
        title={`Welcome back, ${ahmadAli.firstName}`}
        description="Your verified performance overview and next actions."
        action={
          <Button variant="secondary" size="sm" asChild>
            <Link href="/developer/notifications">
              Notifications {unread > 0 && `(${unread})`}
            </Link>
          </Button>
        }
      />

      {/* Level & verification row */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="sm:col-span-2">
          <LevelBadge level={ahmadAli.overallLevel} showDescription />
          <div className="flex flex-wrap gap-3 mt-4">
            <VerifiedBadge type="account" />
            <VerifiedBadge type="weconnect" />
          </div>
          <ProgressBar value={72} showLabel className="mt-4" color="teal" />
          <p className="text-caption mt-1">Progress toward Level 4 — Advanced</p>
          <Button variant="link" size="sm" className="mt-2 p-0 h-auto" asChild>
            <Link href="/developer/level">View progression <ArrowRight className="h-3 w-3" /></Link>
          </Button>
        </Card>
        <StatCard label="Reliability Score" value={`${ahmadAli.reliability}%`} sub="Top 10%" />
        <StatCard label="Challenges Passed" value={ahmadAli.challengesPassed} sub="12 total" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Active project */}
        <Card className="lg:col-span-2">
          <SectionHeader
            title="Active Project"
            action={
              <Button variant="ghost" size="sm" asChild>
                <Link href={`/developer/projects/${customerSupportProject.id}`}>Open workspace</Link>
              </Button>
            }
          />
          <div className="flex flex-col sm:flex-row gap-4 min-w-0">
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <StatusBadge status="In Progress" />
                <span className="text-caption">{customerSupportProject.type}</span>
              </div>
              <h3 className="text-h4 text-navy truncate">{customerSupportProject.title}</h3>
              <p className="text-body-sm text-muted mt-1 line-clamp-2">{customerSupportProject.description}</p>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {customerSupportProject.technologies.slice(0, 4).map((t) => (
                  <span key={t} className="text-xs px-2 py-0.5 rounded-[6px] bg-surface truncate">{t}</span>
                ))}
              </div>
            </div>
            <div className="flex sm:flex-col items-center sm:items-end gap-4 shrink-0">
              <MatchScore score={customerSupportProject.matchScore ?? 94} />
              <div className="flex items-center gap-2 text-sm text-muted">
                <Calendar className="h-4 w-4 shrink-0" />
                <span className="whitespace-nowrap">Due {customerSupportProject.deadline}</span>
              </div>
            </div>
          </div>
          <ProgressBar value={35} showLabel className="mt-4" />
        </Card>

        {/* Invitation */}
        {invitation && (
          <Card>
            <SectionHeader title="Project Invitation" />
            <div className="flex items-start gap-3 min-w-0">
              <div className="h-10 w-10 rounded-[6px] bg-teal/10 flex items-center justify-center shrink-0">
                <Mail className="h-5 w-5 text-teal" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-navy truncate">{invitation.title}</p>
                <p className="text-caption truncate">{invitation.company.name}</p>
                <MatchScore score={invitation.matchScore ?? 94} size="sm" className="mt-2" />
              </div>
            </div>
            <Button className="w-full mt-4" size="sm" asChild>
              <Link href={`/developer/projects/invitations/${invitation.id}`}>Review Invitation</Link>
            </Button>
          </Card>
        )}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Skill progress */}
        <Card>
          <SectionHeader
            title="Skill Progress"
            action={
              <Button variant="ghost" size="sm" asChild>
                <Link href="/developer/challenges">All challenges</Link>
              </Button>
            }
          />
          <div className="space-y-4">
            {skillChallenges.slice(0, 4).map((s) => (
              <div key={s.name} className="min-w-0">
                <div className="flex justify-between text-sm mb-1 gap-2">
                  <span className="font-medium truncate">{s.name}</span>
                  <span className="text-caption shrink-0">{s.completed}/{s.total}</span>
                </div>
                <ProgressBar value={s.completed} max={s.total} size="sm" color="teal" />
              </div>
            ))}
          </div>
        </Card>

        {/* Performance metrics */}
        <Card>
          <SectionHeader title="Performance Metrics" />
          <div className="grid grid-cols-2 gap-6">
            <PerformanceMetric label="Average Score" value={`${ahmadAli.averageScore}%`} />
            <PerformanceMetric label="Requirements Accuracy" value={`${ahmadAli.requirementsAccuracy}%`} />
            <PerformanceMetric label="On-Time Completion" value={`${ahmadAli.onTimeCompletion}%`} />
            <PerformanceMetric label="Company Evaluations" value={ahmadAli.companyEvaluations} />
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Deadlines */}
        <Card>
          <SectionHeader title="Upcoming Deadlines" />
          <div className="space-y-3">
            {[
              { title: "Ticket Dashboard UI", date: "Sep 1, 2026", project: customerSupportProject.title },
              { title: "REST API & PostgreSQL", date: "Sep 8, 2026", project: customerSupportProject.title },
              { title: "Interview — TechFlow", date: "Aug 25, 2026", project: "Career" },
            ].map((d) => (
              <div key={d.title} className="flex items-center justify-between gap-3 py-2 border-b border-border last:border-0 min-w-0">
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{d.title}</p>
                  <p className="text-caption truncate">{d.project}</p>
                </div>
                <span className="text-caption shrink-0 whitespace-nowrap">{d.date}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Career activity */}
        <Card>
          <SectionHeader
            title="Career Activity"
            action={
              <Button variant="ghost" size="sm" asChild>
                <Link href="/developer/career">View pipeline</Link>
              </Button>
            }
          />
          {interview && (
            <div className="flex items-start gap-3 min-w-0">
              <div className="h-10 w-10 rounded-[6px] bg-blue-50 flex items-center justify-center shrink-0">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="font-medium text-navy">{interview.stage}</p>
                <p className="text-body-sm text-muted truncate">{interview.role} at {interview.company}</p>
                <p className="text-caption mt-1">{interview.lastActivity}</p>
                <Button variant="link" size="sm" className="p-0 h-auto mt-2" asChild>
                  <Link href={`/developer/interviews/${interview.id}`}>View details</Link>
                </Button>
              </div>
            </div>
          )}
          <div className="mt-4 pt-4 border-t border-border flex items-center gap-2 text-sm">
            <ShieldCheck className="h-4 w-4 text-teal shrink-0" />
            <span className="text-muted">WeConnect Verified — 5/5 internal projects</span>
            <Button variant="link" size="sm" className="ml-auto p-0 h-auto shrink-0" asChild>
              <Link href="/developer/verified">Details</Link>
            </Button>
          </div>
        </Card>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Projects", href: "/developer/projects", icon: Briefcase },
          { label: "Skills", href: "/developer/skills", icon: TrendingUp },
          { label: "Portfolio", href: "/developer/portfolio", icon: ShieldCheck },
          { label: "Internal Projects", href: "/developer/internal-projects", icon: Briefcase },
        ].map(({ label, href, icon: Icon }) => (
          <Link
            key={label}
            href={href}
            className="flex items-center gap-2 p-4 rounded-[10px] border border-border bg-white hover:bg-surface transition-colors min-w-0"
          >
            <Icon className="h-4 w-4 text-primary shrink-0" />
            <span className="text-sm font-medium truncate">{label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
