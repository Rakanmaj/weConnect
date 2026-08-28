import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { PublicLayout } from "@/components/layout/public-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CtaSection } from "@/components/public/cta-section";
import { PageHeader } from "@/components/public/page-header";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Pricing",
  description: "WeConnect pricing plans for companies of every size.",
};

const plans = [
  {
    name: "Starter",
    price: "$299",
    period: "/month",
    description: "For small teams exploring performance-based hiring.",
    features: [
      "Up to 3 active projects",
      "10 talent searches per month",
      "Basic developer profiles",
      "Project posting & matching",
      "Email support",
    ],
    cta: "Start free trial",
    href: "/register/company",
    highlighted: false,
  },
  {
    name: "Growth",
    price: "$799",
    period: "/month",
    description: "For growing teams with regular hiring needs.",
    features: [
      "Up to 10 active projects",
      "Unlimited talent searches",
      "Full verified profiles & comparisons",
      "Hiring pipeline management",
      "Project evaluations & scoring",
      "Priority support",
    ],
    cta: "Get started",
    href: "/register/company",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For organizations with advanced hiring workflows.",
    features: [
      "Unlimited projects & seats",
      "Custom matching criteria",
      "Dedicated account manager",
      "SSO & advanced security",
      "API access & integrations",
      "SLA & onboarding support",
    ],
    cta: "Contact sales",
    href: "/contact",
    highlighted: false,
  },
];

export default function PricingPage() {
  return (
    <PublicLayout>
      <section className="py-16 lg:py-24 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <PageHeader
            eyebrow="Pricing"
            title="Plans that scale with your hiring"
            description="Transparent pricing for companies. Developers join and build profiles for free."
          />
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-start">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={cn(
                  "public-card p-6 lg:p-8 flex flex-col h-full",
                  plan.highlighted && "public-card--featured"
                )}
              >
                {plan.highlighted && (
                  <Badge variant="primary" size="sm" className="self-start mb-5 shadow-sm">
                    Most popular
                  </Badge>
                )}
                <h3 className="text-h3 text-foreground">{plan.name}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-display text-[2.25rem] text-foreground">{plan.price}</span>
                  {plan.period && (
                    <span className="text-body-sm text-muted">{plan.period}</span>
                  )}
                </div>
                <p className="mt-4 min-h-11 text-body-sm text-muted">{plan.description}</p>

                <div className="my-6 h-px bg-gradient-to-r from-border via-border to-transparent" />
                <ul className="space-y-3.5 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-body-sm text-neutral-dark">
                      <Check className="h-4 w-4 text-teal shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className="mt-8 w-full"
                  variant={plan.highlighted ? "primary" : "secondary"}
                  asChild
                >
                  <Link href={plan.href}>{plan.cta}</Link>
                </Button>
              </div>
            ))}
          </div>

          <p className="mt-10 text-center text-body-sm text-muted">
            All plans include company verification, project management, and access to the
            WeConnect talent pool.{" "}
            <Link href="/faq" className="text-primary hover:underline">
              See FAQ
            </Link>{" "}
            for details.
          </p>
        </div>
      </section>

      <section className="py-12 bg-surface/60 border-y border-border">
        <div className="mx-auto max-w-3xl px-4 lg:px-8 text-center">
          <h2 className="text-h3 text-foreground">Developers join for free</h2>
          <p className="mt-2 text-body-sm text-muted">
            Build your verified profile, take assessments, and get matched to opportunities
            at no cost.
          </p>
          <Button variant="secondary" className="mt-4" asChild>
            <Link href="/register/developer">Create developer account</Link>
          </Button>
        </div>
      </section>

      <CtaSection />
    </PublicLayout>
  );
}
