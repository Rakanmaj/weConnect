import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Clock,
  Filter,
  Scale,
  Search,
  ShieldCheck,
  Users,
} from "lucide-react";
import { PublicLayout } from "@/components/layout/public-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CtaSection } from "@/components/public/cta-section";
import { PageHeader } from "@/components/public/page-header";
import { ahmadAli, topMatches, matchReasons } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "For Companies",
  description: "Hire developers based on verified performance, project delivery, and reliability scores.",
};

const benefits = [
  {
    icon: Search,
    title: "Discover pre-verified talent",
    description:
      "Access developers who have passed assessments, completed challenges, and delivered on real projects.",
  },
  {
    icon: BarChart3,
    title: "Compare on real metrics",
    description:
      "Reliability, on-time delivery, requirements accuracy, and company evaluations—not self-reported skills.",
  },
  {
    icon: Filter,
    title: "Smart matching",
    description:
      "Post a project or role and receive ranked matches based on verified skill fit and availability.",
  },
  {
    icon: Scale,
    title: "Evaluate before you hire",
    description:
      "Run project-based evaluations to assess delivery quality before extending an offer.",
  },
  {
    icon: Clock,
    title: "Faster, better hiring",
    description:
      "Reduce time-to-hire and mis-hire costs with data-backed decisions from day one.",
  },
  {
    icon: ShieldCheck,
    title: "Verified company status",
    description:
      "Build trust with developers through company verification and transparent project posting.",
  },
];

export default function CompaniesPage() {
  const reasons = matchReasons[ahmadAli.id] ?? [];

  return (
    <PublicLayout>
      <section className="py-16 lg:py-24 border-b border-border bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(20,184,166,0.06),transparent)]">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <PageHeader
              align="left"
              eyebrow="For Companies"
              title="Stop interviewing potential. Start evaluating proof."
              description="WeConnect gives your team verified performance data on every candidate—so hiring decisions are informed, objective, and faster."
            />
            <div className="flex flex-col sm:flex-row lg:justify-end gap-3">
              <Button size="lg" asChild>
                <Link href="/register/company">
                  Join as Company
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="secondary" asChild>
                <Link href="/pricing">View pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="text-h1 text-foreground text-center mb-12">Built for hiring teams</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {benefits.map((benefit, index) => (
              <article key={benefit.title} className="public-card public-card--teal group p-6 lg:p-7">
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div className="public-card-icon">
                    <benefit.icon className="h-5 w-5" />
                  </div>
                  <span className="public-card-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="text-h4 text-foreground max-w-[15rem]">{benefit.title}</h3>
                <p className="mt-3 text-body-sm text-muted leading-relaxed">
                  {benefit.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-surface/60 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <p className="text-label text-teal mb-3">Talent Matching</p>
              <h2 className="text-h1 text-foreground">See why each developer matches</h2>
              <p className="mt-4 text-body text-muted">
                Every match comes with transparent reasoning—verified skills, project history,
                reliability scores, and availability aligned to your requirements.
              </p>
              <ul className="mt-6 space-y-2">
                {reasons.map((reason) => (
                  <li
                    key={reason}
                    className="flex items-center gap-2 text-body-sm text-neutral-dark"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-teal shrink-0" />
                    {reason}
                  </li>
                ))}
              </ul>
            </div>

            <div className="public-showcase-card">
              <div className="border-b border-border/80 bg-surface/50 px-5 py-4 flex items-center justify-between">
                <span className="text-label text-foreground">Top Matches</span>
                <Badge variant="teal" size="sm">94% best match</Badge>
              </div>
              <div className="divide-y divide-border">
                {topMatches.map((dev, i) => (
                  <div key={dev.id} className="px-5 py-4 flex items-center gap-4 transition-colors hover:bg-surface/60">
                    <div className="h-9 w-9 rounded-md bg-navy flex items-center justify-center shrink-0">
                      <span className="text-white text-xs font-semibold">
                        {dev.firstName[0]}
                        {dev.lastName[0]}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-label text-foreground truncate">{dev.name}</p>
                      <p className="text-caption truncate">{dev.role}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-semibold text-teal">{dev.matchScore}%</p>
                      <p className="text-caption">#{i + 1}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="public-card public-card--dark public-card--static p-8 lg:p-12 text-center">
            <Users className="h-8 w-8 text-teal mx-auto mb-4" />
            <h2 className="text-h2 text-white">Join companies hiring with confidence</h2>
            <p className="mt-3 text-body text-white/70 max-w-xl mx-auto">
              From startups to enterprise teams, WeConnect helps you find developers who
              have already proven they can deliver.
            </p>
            <Button
              size="lg"
              className="mt-6 bg-white text-foreground hover:bg-white/90"
              asChild
            >
              <Link href="/register/company">
                Create company account
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <CtaSection />
    </PublicLayout>
  );
}
