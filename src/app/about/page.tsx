import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Eye, Heart, Rocket } from "lucide-react";
import { PublicLayout } from "@/components/layout/public-layout";
import { CtaSection } from "@/components/public/cta-section";
import { PageHeader } from "@/components/public/page-header";
import { adminMetrics } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about WeConnect's mission to transform developer hiring through verified performance.",
};

const values = [
  {
    icon: Eye,
    title: "Transparency over assumptions",
    description:
      "We believe hiring decisions should be grounded in observable performance, not opaque signals or interview performance art.",
  },
  {
    icon: Rocket,
    title: "Growth through real work",
    description:
      "Developers advance by doing—through assessments, challenges, and projects that mirror the work they'll deliver on the job.",
  },
  {
    icon: Heart,
    title: "Fair access to opportunity",
    description:
      "Talent exists everywhere. WeConnect creates structured pathways for capable developers to be discovered regardless of background.",
  },
];

export default function AboutPage() {
  return (
    <PublicLayout>
      <section className="py-16 lg:py-24 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <PageHeader
            eyebrow="About WeConnect"
            title="Building the future of performance-based hiring"
            description="WeConnect connects developer talent development with company hiring—so both sides win when ability is proven, not assumed."
          />
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <h2 className="text-h2 text-foreground">Our mission</h2>
              <p className="mt-4 text-body text-neutral-dark leading-relaxed">
                The tech industry spends billions on hiring, yet mis-hires remain common and
                talented developers are overlooked. WeConnect was built to close that gap by
                creating a platform where developers prove their abilities through structured
                assessments, skill challenges, and real project delivery—and where companies
                can evaluate talent based on verified track records.
              </p>
              <p className="mt-4 text-body text-neutral-dark leading-relaxed">
                We're not replacing human judgment. We're giving both sides better data to
                make it—replacing "trust me" with "here's the proof."
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Developers", value: adminMetrics.totalDevelopers.toLocaleString() },
                { label: "Companies", value: adminMetrics.totalCompanies.toLocaleString() },
                { label: "Projects Completed", value: adminMetrics.completedProjects.toLocaleString() },
                { label: "Successful Hires", value: adminMetrics.successfulHires.toLocaleString() },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="public-stat-card px-5 py-6"
                >
                  <p className="text-h1 text-foreground">{stat.value}</p>
                  <p className="text-body-sm text-muted mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-surface/60 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="text-h1 text-foreground text-center mb-12">What we stand for</h2>
          <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
            {values.map((value, index) => (
              <article key={value.title} className="public-card p-6 lg:p-7">
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div className="public-card-icon">
                    <value.icon className="h-5 w-5" />
                  </div>
                  <span className="public-card-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="text-h4 text-foreground">{value.title}</h3>
                <p className="mt-3 text-body-sm text-muted leading-relaxed">
                  {value.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-4 lg:px-8 text-center">
          <h2 className="text-h2 text-foreground">Want to learn more?</h2>
          <p className="mt-3 text-body text-muted">
            Explore how WeConnect works or get in touch with our team.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/how-it-works"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
            >
              How it works
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <span className="hidden sm:inline text-muted">·</span>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
            >
              Contact us
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      <CtaSection />
    </PublicLayout>
  );
}
