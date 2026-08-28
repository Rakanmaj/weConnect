"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  Code2,
  ShieldCheck,
  Target,
  Users,
  Zap,
} from "lucide-react";
import { PublicLayout } from "@/components/layout/public-layout";
import { Button } from "@/components/ui/button";
import { CtaSection } from "@/components/public/cta-section";
import { HeroProductPreview } from "@/components/public/hero-product-preview";
import { HeroVisual } from "@/components/public/hero-visual";
import { ProfilePreview } from "@/components/public/profile-preview";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5 },
};

export default function HomePage() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_12%_20%,rgba(37,99,235,0.08),transparent_58%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_88%_35%,rgba(20,184,166,0.10),transparent_55%)]" />
        <div className="relative mx-auto max-w-7xl px-4 lg:px-8 py-10 sm:py-12 lg:flex lg:min-h-[calc(100vh-4rem)] lg:items-center lg:py-10">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
            <div className="max-w-xl">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="inline-flex items-center rounded-full border border-primary/15 bg-primary/5 px-3 py-1 text-[11px] sm:text-xs font-medium tracking-wide text-primary"
              >
                Real projects. Verified performance.
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.08 }}
                className="text-display text-navy mt-5 text-[2.15rem] sm:text-[2.75rem] lg:text-[3.15rem] xl:text-[3.35rem]"
              >
                Turn potential into{" "}
                <span className="text-primary">proven experience.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.16 }}
                className="mt-4 text-body-lg text-muted max-w-md"
              >
                Developers prove ability on real work. Companies hire from verified
                delivery — not resumes and guesswork.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.24 }}
                className="mt-7 flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
              >
                <Button size="lg" asChild>
                  <Link href="/register">
                    Get Started
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/how-it-works">How It Works</Link>
                </Button>
              </motion.div>
            </div>

            <HeroVisual />
          </div>
        </div>
      </section>

      <section className="relative border-y border-border bg-white pb-16 lg:pb-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <HeroProductPreview />
        </div>
      </section>

      {/* Problem */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <motion.div {...fadeUp} className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-h1 text-navy">The hiring gap is real</h2>
            <p className="mt-4 text-body-lg text-muted">
              Both sides lose when decisions are based on potential instead of proof.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <motion.div
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.1 }}
              className="public-card p-7 lg:p-8"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="public-card-icon">
                  <Code2 className="h-5 w-5" />
                </div>
                <h3 className="text-h2 text-navy">For Developers</h3>
              </div>
              <ul className="space-y-4">
                {[
                  "Strong skills buried behind keyword filters and credential bias",
                  "Endless interviews that test trivia, not delivery ability",
                  "No structured path to prove real-world competence",
                  "Portfolio projects that companies can't trust or compare",
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-body text-neutral-dark">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/developers"
                className="inline-flex items-center gap-1.5 mt-6 text-sm font-medium text-primary hover:underline"
              >
                Learn more for developers
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </motion.div>

            <motion.div
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.2 }}
              className="public-card public-card--teal p-7 lg:p-8"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="public-card-icon">
                  <Building2 className="h-5 w-5" />
                </div>
                <h3 className="text-h2 text-navy">For Companies</h3>
              </div>
              <ul className="space-y-4">
                {[
                  "Resume screening that misses capable talent",
                  "Technical interviews that don't predict on-the-job performance",
                  "High cost of mis-hires and lengthy hiring cycles",
                  "No unified view of candidate reliability and delivery history",
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-body text-neutral-dark">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-teal shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/companies"
                className="inline-flex items-center gap-1.5 mt-6 text-sm font-medium text-teal hover:underline"
              >
                Learn more for companies
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 lg:py-28 bg-surface/60 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <motion.div {...fadeUp} className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-h1 text-navy">How it works</h2>
            <p className="mt-4 text-body-lg text-muted">
              Two parallel journeys converging on verified, performance-based hiring.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <motion.div {...fadeUp}>
              <p className="text-label text-primary mb-6">Developer Journey</p>
              <div className="space-y-0">
                {[
                  {
                    step: "01",
                    title: "Build your profile",
                    desc: "Set up your skills, availability, and career track.",
                    icon: Users,
                  },
                  {
                    step: "02",
                    title: "Pass assessments & challenges",
                    desc: "Prove technical depth through structured, scored evaluations.",
                    icon: Target,
                  },
                  {
                    step: "03",
                    title: "Deliver real projects",
                    desc: "Complete training and paid projects with measurable outcomes.",
                    icon: Code2,
                  },
                  {
                    step: "04",
                    title: "Earn verified status",
                    desc: "Accumulate reliability scores, evaluations, and WeConnect verification.",
                    icon: ShieldCheck,
                  },
                ].map((item, i) => (
                  <div key={item.step} className="flex gap-4 pb-8 last:pb-0">
                    <div className="flex flex-col items-center">
                      <div className="h-10 w-10 rounded-lg bg-white border border-border flex items-center justify-center shrink-0">
                        <item.icon className="h-4 w-4 text-primary" />
                      </div>
                      {i < 3 && <div className="w-px flex-1 bg-border mt-2" />}
                    </div>
                    <div className="pt-1 min-w-0">
                      <p className="text-caption text-primary">{item.step}</p>
                      <p className="text-h4 text-navy mt-0.5">{item.title}</p>
                      <p className="text-body-sm text-muted mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.15 }}>
              <p className="text-label text-teal mb-6">Company Journey</p>
              <div className="space-y-0">
                {[
                  {
                    step: "01",
                    title: "Define your needs",
                    desc: "Post projects, roles, and skill requirements.",
                    icon: Building2,
                  },
                  {
                    step: "02",
                    title: "Review matched talent",
                    desc: "See developers ranked by verified skills and reliability.",
                    icon: Zap,
                  },
                  {
                    step: "03",
                    title: "Evaluate through projects",
                    desc: "Assess delivery on real work before extending offers.",
                    icon: Target,
                  },
                  {
                    step: "04",
                    title: "Hire with confidence",
                    desc: "Make decisions backed by performance data and company evaluations.",
                    icon: ShieldCheck,
                  },
                ].map((item, i) => (
                  <div key={item.step} className="flex gap-4 pb-8 last:pb-0">
                    <div className="flex flex-col items-center">
                      <div className="h-10 w-10 rounded-lg bg-white border border-border flex items-center justify-center shrink-0">
                        <item.icon className="h-4 w-4 text-teal" />
                      </div>
                      {i < 3 && <div className="w-px flex-1 bg-border mt-2" />}
                    </div>
                    <div className="pt-1 min-w-0">
                      <p className="text-caption text-teal">{item.step}</p>
                      <p className="text-h4 text-navy mt-0.5">{item.title}</p>
                      <p className="text-body-sm text-muted mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="mt-12 text-center">
            <Button variant="secondary" asChild>
              <Link href="/how-it-works">
                Explore the full process
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Profile Preview */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div {...fadeUp}>
              <p className="text-label text-teal mb-3">Verified Profiles</p>
              <h2 className="text-h1 text-navy">
                See the whole picture—not just a resume
              </h2>
              <p className="mt-4 text-body-lg text-muted">
                Every developer profile aggregates assessments, challenge scores,
                project delivery metrics, and company evaluations into a single,
                trusted view.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Skill levels verified through challenges",
                  "Reliability and on-time delivery scores",
                  "Real project history with company feedback",
                  "Match scores for open roles and projects",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-body-sm text-neutral-dark">
                    <ShieldCheck className="h-4 w-4 text-teal shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.15 }}>
              <ProfilePreview />
            </motion.div>
          </div>
        </div>
      </section>

      <CtaSection />
    </PublicLayout>
  );
}
