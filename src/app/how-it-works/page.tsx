import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  ClipboardCheck,
  Code2,
  FileSearch,
  Handshake,
  Layers,
  UserCheck,
} from "lucide-react";
import { PublicLayout } from "@/components/layout/public-layout";
import { Button } from "@/components/ui/button";
import { CtaSection } from "@/components/public/cta-section";
import { PageHeader } from "@/components/public/page-header";

export const metadata: Metadata = {
  title: "How It Works",
  description: "Understand the WeConnect platform flow for developers and companies.",
};

const developerSteps = [
  {
    icon: UserCheck,
    title: "Create your profile",
    description:
      "Sign up, choose your career track, and set your availability. Your profile becomes the foundation for everything that follows.",
  },
  {
    icon: ClipboardCheck,
    title: "Complete assessments",
    description:
      "Take role-specific assessments covering coding, debugging, architecture, and problem-solving. Scores feed directly into your verified profile.",
  },
  {
    icon: Code2,
    title: "Pass skill challenges",
    description:
      "Work through tiered challenges for each technology—Level 1, Level 2, and Master—to earn verified skill badges.",
  },
  {
    icon: Layers,
    title: "Deliver on projects",
    description:
      "Accept training projects, paid engagements, and hiring challenges. Real delivery builds your reliability score and project history.",
  },
  {
    icon: BarChart3,
    title: "Build your track record",
    description:
      "Company evaluations, on-time metrics, and requirements accuracy aggregate into a performance profile companies trust.",
  },
];

const companySteps = [
  {
    icon: FileSearch,
    title: "Post requirements",
    description:
      "Define project scope, required skills, timeline, and role type. Our matching engine surfaces developers with verified fit.",
  },
  {
    icon: BarChart3,
    title: "Review verified talent",
    description:
      "Browse developer profiles with skill levels, reliability scores, project history, and match percentages—not just resumes.",
  },
  {
    icon: Layers,
    title: "Run project evaluations",
    description:
      "Engage developers on real work before hiring. Evaluate delivery quality, communication, and technical execution firsthand.",
  },
  {
    icon: ClipboardCheck,
    title: "Compare candidates",
    description:
      "Side-by-side comparison on verified metrics helps your team make objective, data-informed hiring decisions.",
  },
  {
    icon: Handshake,
    title: "Hire with proof",
    description:
      "Extend offers backed by demonstrated performance. Reduce mis-hires and shorten time-to-productivity.",
  },
];

export default function HowItWorksPage() {
  return (
    <PublicLayout>
      <section className="py-16 lg:py-24 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <PageHeader
            eyebrow="Platform Overview"
            title="From assessment to hire—fully verified"
            description="WeConnect creates a continuous loop of skill verification, project delivery, and performance evaluation that benefits both developers and companies."
          />
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <p className="text-label text-primary mb-2">For Developers</p>
              <h2 className="text-h1 text-foreground">Your path to verified status</h2>
            </div>
            <Button variant="secondary" size="sm" asChild>
              <Link href="/developers">
                Developer details
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="space-y-0 border-l-2 border-primary/20 ml-5 pl-8">
            {developerSteps.map((step, i) => (
              <div key={step.title} className="relative pb-10 last:pb-0">
                <div className="absolute -left-[calc(2rem+5px)] top-0 h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-white" />
                <div className="public-card flex flex-col sm:flex-row gap-4 p-5 sm:p-6">
                  <div className="public-card-icon shrink-0">
                    <step.icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-caption text-primary">Step {i + 1}</p>
                    <h3 className="text-h3 text-foreground mt-0.5">{step.title}</h3>
                    <p className="mt-2 text-body-sm text-muted max-w-2xl">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-surface/60 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <p className="text-label text-teal mb-2">For Companies</p>
              <h2 className="text-h1 text-foreground">Hire based on demonstrated ability</h2>
            </div>
            <Button variant="secondary" size="sm" asChild>
              <Link href="/companies">
                Company details
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="space-y-0 border-l-2 border-teal/20 ml-5 pl-8">
            {companySteps.map((step, i) => (
              <div key={step.title} className="relative pb-10 last:pb-0">
                <div className="absolute -left-[calc(2rem+5px)] top-0 h-2.5 w-2.5 rounded-full bg-teal ring-4 ring-surface" />
                <div className="public-card public-card--teal flex flex-col sm:flex-row gap-4 p-5 sm:p-6">
                  <div className="public-card-icon shrink-0">
                    <step.icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-caption text-teal">Step {i + 1}</p>
                    <h3 className="text-h3 text-foreground mt-0.5">{step.title}</h3>
                    <p className="mt-2 text-body-sm text-muted max-w-2xl">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-4 lg:px-8 text-center">
          <h2 className="text-h2 text-foreground">The verification loop</h2>
          <p className="mt-4 text-body text-muted">
            Assessments validate knowledge. Challenges prove skill depth. Projects demonstrate
            delivery. Evaluations capture real-world performance. Each cycle strengthens the
            profile—and the confidence behind every hire.
          </p>
        </div>
      </section>

      <CtaSection />
    </PublicLayout>
  );
}
