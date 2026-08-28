import type { Metadata } from "next";
import Link from "next/link";
import { PublicLayout } from "@/components/layout/public-layout";
import { FaqList, type FaqItem } from "@/components/public/faq-list";
import { PageHeader } from "@/components/public/page-header";
import { CtaSection } from "@/components/public/cta-section";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about WeConnect for developers and companies.",
};

const faqItems: FaqItem[] = [
  {
    question: "What is WeConnect?",
    answer:
      "WeConnect is a performance-based developer talent platform. Developers prove their abilities through assessments, skill challenges, and real project delivery. Companies use verified profiles and match scores to make informed hiring decisions.",
  },
  {
    question: "Is WeConnect free for developers?",
    answer:
      "Yes. Developers can create profiles, take assessments, complete challenges, and get matched to opportunities at no cost. Premium features may be introduced in the future, but core profile building remains free.",
  },
  {
    question: "How does WeConnect verification work?",
    answer:
      "WeConnect Verified status is earned through consistent performance—passing assessments, completing skill challenges, delivering projects on time, and receiving positive company evaluations. It's not a one-time badge but an ongoing track record.",
  },
  {
    question: "What types of projects are available?",
    answer:
      "WeConnect offers three project types: Training Projects (internal, skill-building), Paid Projects (real client work with compensation), and Hiring Challenges (project-based evaluations for open roles).",
  },
  {
    question: "How does matching work for companies?",
    answer:
      "When you post a project or role, our engine ranks developers based on verified skill levels, reliability scores, project history, availability, and requirements fit. Each match includes transparent reasoning.",
  },
  {
    question: "Can companies evaluate developers before hiring?",
    answer:
      "Absolutely. Companies can engage developers on training projects or hiring challenges to assess delivery quality, communication, and technical execution before extending an offer.",
  },
  {
    question: "What pricing plans are available?",
    answer:
      "We offer Starter ($299/mo), Growth ($799/mo), and Enterprise (custom) plans for companies. See our pricing page for full feature comparisons.",
  },
  {
    question: "How do I get started?",
    answer:
      "Developers can sign up at /register/developer and begin building their profile immediately. Companies can register at /register/company and start posting projects after verification.",
  },
];

export default function FaqPage() {
  return (
    <PublicLayout>
      <section className="py-16 lg:py-24 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <PageHeader
            eyebrow="FAQ"
            title="Common questions"
            description="Everything you need to know about getting started with WeConnect."
          />
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <FaqList items={faqItems} />
          <p className="mt-8 text-center text-body-sm text-muted">
            Still have questions?{" "}
            <Link href="/contact" className="text-primary font-medium hover:underline">
              Contact our team
            </Link>
          </p>
        </div>
      </section>

      <CtaSection />
    </PublicLayout>
  );
}
