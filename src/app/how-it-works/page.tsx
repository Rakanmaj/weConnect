import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PublicLayout } from "@/components/layout/public-layout";
import { CtaSection } from "@/components/public/cta-section";
import { PageHeader } from "@/components/public/page-header";
import { CompanyJourney, DeveloperJourney } from "@/components/public/developer-journey";

export const metadata: Metadata = {
  title: "How It Works",
  description: "Understand the WeConnect platform flow for developers and companies.",
};

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

      <section className="relative overflow-hidden bg-[#F7F9FC] py-20 lg:py-28">
        <div aria-hidden className="absolute -left-40 top-10 h-[420px] w-[420px] rounded-full bg-navy/[0.055] blur-[110px]" />
        <div aria-hidden className="absolute -right-40 top-[38%] h-[460px] w-[460px] rounded-full bg-teal/[0.075] blur-[120px]" />
        <div aria-hidden className="absolute bottom-10 left-[35%] h-[320px] w-[320px] rounded-full bg-primary/[0.045] blur-[100px]" />

        <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-teal">For Developers</p>
              <h2 className="max-w-3xl text-4xl font-semibold tracking-[-0.045em] text-[#0D1B3D] sm:text-5xl">
                Your path to verified status
              </h2>
            </div>
            <Link
              href="/developers"
              className="group inline-flex h-10 w-fit items-center gap-2 rounded-full border border-navy/10 bg-white/55 px-4 text-sm font-medium text-navy shadow-sm backdrop-blur-sm transition-colors hover:border-teal/30 hover:bg-white"
            >
              Developer details
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          <DeveloperJourney />
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-navy/[0.055] bg-[#F7F9FC] py-20 lg:py-28">
        <div aria-hidden className="absolute -right-40 top-10 h-[440px] w-[440px] rounded-full bg-teal/[0.085] blur-[115px]" />
        <div aria-hidden className="absolute -left-44 top-[42%] h-[460px] w-[460px] rounded-full bg-navy/[0.05] blur-[120px]" />
        <div aria-hidden className="absolute bottom-8 right-[32%] h-[320px] w-[320px] rounded-full bg-primary/[0.04] blur-[100px]" />

        <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-teal">For Companies</p>
              <h2 className="max-w-3xl text-4xl font-semibold tracking-[-0.045em] text-[#0D1B3D] sm:text-5xl">
                Hire based on demonstrated ability
              </h2>
            </div>
            <Link
              href="/companies"
              className="group inline-flex h-10 w-fit items-center gap-2 rounded-full border border-navy/10 bg-white/55 px-4 text-sm font-medium text-navy shadow-sm backdrop-blur-sm transition-colors hover:border-teal/30 hover:bg-white"
            >
              Company details
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          <CompanyJourney />
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
