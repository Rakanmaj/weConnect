import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  Briefcase,
  LineChart,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";
import { PublicLayout } from "@/components/layout/public-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CtaSection } from "@/components/public/cta-section";
import { PageHeader } from "@/components/public/page-header";
import { ProfilePreview } from "@/components/public/profile-preview";
import { skillChallenges } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "For Developers",
  description: "Build a verified track record and get matched to real projects and hiring opportunities.",
};

const benefits = [
  {
    icon: Target,
    title: "Prove skills, not just list them",
    description:
      "Pass tiered challenges and assessments that validate your abilities with scores companies can compare.",
  },
  {
    icon: Briefcase,
    title: "Work on real projects",
    description:
      "Training projects, paid engagements, and hiring challenges give you portfolio-worthy experience with verified outcomes.",
  },
  {
    icon: LineChart,
    title: "Build a performance profile",
    description:
      "Reliability, on-time delivery, and requirements accuracy scores show companies how you actually perform.",
  },
  {
    icon: Award,
    title: "Earn WeConnect verification",
    description:
      "Reach verified status through consistent performance—a signal that sets you apart from the crowd.",
  },
  {
    icon: Sparkles,
    title: "Get matched to opportunities",
    description:
      "Our matching engine connects you to projects and roles where your verified skills align.",
  },
  {
    icon: ShieldCheck,
    title: "Fair evaluation process",
    description:
      "Structured assessments and objective scoring reduce bias and give every developer a fair shot.",
  },
];

export default function DevelopersPage() {
  return (
    <PublicLayout>
      <section className="py-16 lg:py-24 border-b border-border bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(37,99,235,0.06),transparent)]">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <PageHeader
              align="left"
              eyebrow="For Developers"
              title="Your skills deserve more than a bullet point"
              description="Stop chasing interviews that go nowhere. Build a verified profile through assessments, challenges, and real project delivery."
            />
            <div className="flex flex-col sm:flex-row lg:justify-end gap-3">
              <Button size="lg" asChild>
                <Link href="/register/developer">
                  Start as Developer
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="secondary" asChild>
                <Link href="/how-it-works">See how it works</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="text-h1 text-foreground text-center mb-12">Why developers choose WeConnect</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {benefits.map((benefit, index) => (
              <article key={benefit.title} className="public-card group p-6 lg:p-7">
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
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-label text-primary mb-3">Skill Challenges</p>
              <h2 className="text-h1 text-foreground">Level up with verified challenges</h2>
              <p className="mt-4 text-body text-muted">
                Each technology has a progression path. Complete challenges to earn verified
                skill badges that appear on your profile and factor into match scores.
              </p>
              <div className="mt-6 space-y-3">
                {skillChallenges.slice(0, 4).map((skill) => (
                  <div
                    key={skill.name}
                    className="public-list-card flex items-center justify-between gap-4 px-5 py-3.5"
                  >
                    <div className="min-w-0">
                      <p className="text-label text-foreground truncate">{skill.name}</p>
                      <p className="text-caption truncate">
                        {skill.completed}/{skill.total} completed · Next: {skill.next}
                      </p>
                    </div>
                    <Badge variant={skill.level === "Master" ? "teal" : "primary"} size="sm" className="shrink-0">
                      {skill.level}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
            <ProfilePreview />
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-4 lg:px-8 text-center">
          <h2 className="text-h2 text-foreground">Ready to prove what you can do?</h2>
          <p className="mt-3 text-body text-muted">
            Create your developer profile and start building your verified track record today.
          </p>
          <Button size="lg" className="mt-6" asChild>
            <Link href="/register/developer">
              Get started free
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      <CtaSection />
    </PublicLayout>
  );
}
