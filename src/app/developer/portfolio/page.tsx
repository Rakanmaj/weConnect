import Link from "next/link";
import {
  MapPin,
  Code,
  Link2,
  Globe,
  Briefcase,
  Award,
  ExternalLink,
} from "lucide-react";
import { PageHeader } from "@/components/ui/common";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/developer/card";
import { Avatar } from "@/components/ui/avatar";
import { LevelBadge, SkillBadge, StatusBadge } from "@/components/ui/status-badges";
import { VerifiedBadge } from "@/components/ui/verified-badge";
import { PerformanceMetric } from "@/components/ui/progress";
import { ahmadAli } from "@/lib/mock-data";

export default function PortfolioPage() {
  return (
    <div className="min-w-0">
      {/* Hero */}
      <div className="rounded-[14px] bg-gradient-to-br from-navy to-[#1a3a6e] text-white p-6 sm:p-10 mb-8 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="relative flex flex-col sm:flex-row gap-6 items-start">
          <Avatar name={ahmadAli.name} size="lg" className="h-20 w-20 text-2xl ring-4 ring-white/20" />
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h1 className="text-h1 text-white truncate">{ahmadAli.name}</h1>
              <VerifiedBadge type="weconnect" className="text-teal" />
            </div>
            <p className="text-body-lg text-white/80">{ahmadAli.role}</p>
            <p className="text-body-sm text-white/60 flex items-center gap-1.5 mt-2">
              <MapPin className="h-4 w-4 shrink-0" />
              {ahmadAli.location}
            </p>
            <div className="flex flex-wrap gap-3 mt-4">
              <LevelBadge level={ahmadAli.overallLevel} className="text-white [&_span]:text-white" />
              <StatusBadge status="Verified" />
            </div>
          </div>
          <Button variant="secondary" size="sm" className="shrink-0" asChild>
            <Link href="/developer/profile">Edit Profile</Link>
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <h2 className="text-h3 text-foreground mb-3">About</h2>
            <p className="text-body-sm text-muted">{ahmadAli.bio}</p>
          </Card>

          <Card>
            <h2 className="text-h3 text-foreground mb-4">Verified Skills</h2>
            <div className="flex flex-wrap gap-2">
              {ahmadAli.skills.map((s) => (
                <SkillBadge key={s.name} name={s.name} level={s.level} verified={s.verified} />
              ))}
            </div>
          </Card>

          <Card>
            <h2 className="text-h3 text-foreground mb-4">Featured Projects</h2>
            <div className="space-y-4">
              {[
                { title: "Customer Support Management Dashboard", company: "TechFlow Solutions", score: 94 },
                { title: "Customer Management Dashboard", company: "TechFlow Solutions", score: 91 },
              ].map((p) => (
                <div key={p.title} className="flex items-center justify-between gap-4 p-4 rounded-[6px] bg-surface min-w-0">
                  <div className="min-w-0">
                    <p className="font-medium truncate">{p.title}</p>
                    <p className="text-caption truncate">{p.company}</p>
                  </div>
                  <span className="text-teal font-semibold shrink-0">{p.score}%</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <h2 className="text-h4 text-foreground mb-4">Performance</h2>
            <div className="grid grid-cols-2 gap-4">
              <PerformanceMetric label="Reliability" value={`${ahmadAli.reliability}%`} />
              <PerformanceMetric label="Avg Score" value={`${ahmadAli.averageScore}%`} />
              <PerformanceMetric label="Projects" value={ahmadAli.realProjectsCompleted} />
              <PerformanceMetric label="Evaluations" value={ahmadAli.companyEvaluations} />
            </div>
          </Card>

          <Card>
            <h2 className="text-h4 text-foreground mb-4">Links</h2>
            <div className="space-y-3">
              {[
                { icon: Code, label: "GitHub", href: ahmadAli.github },
                { icon: Link2, label: "LinkedIn", href: ahmadAli.linkedin },
                { icon: Globe, label: "Portfolio", href: ahmadAli.portfolio },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-primary hover:underline min-w-0"
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="truncate flex-1">{label}</span>
                  <ExternalLink className="h-3 w-3 shrink-0" />
                </a>
              ))}
            </div>
          </Card>

          <Card>
            <h2 className="text-h4 text-foreground mb-3">Availability</h2>
            <p className="text-body-sm">{ahmadAli.availability}</p>
          </Card>

          <div className="flex flex-col gap-2">
            <Button variant="secondary" asChild>
              <Link href="/developer/level"><Award className="h-4 w-4" /> Level Progression</Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link href="/developer/projects"><Briefcase className="h-4 w-4" /> View Projects</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
