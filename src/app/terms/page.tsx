import type { Metadata } from "next";
import { PublicLayout } from "@/components/layout/public-layout";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "WeConnect terms of service and platform usage agreement.",
};

const sections = [
  {
    title: "1. Acceptance of Terms",
    content: `By accessing or using WeConnect, you agree to be bound by these Terms of Service. If you do not agree, you may not use the platform. These terms apply to all users, including developers, companies, and visitors.`,
  },
  {
    title: "2. Account Registration",
    content: `You must provide accurate information when creating an account. Developers and companies are responsible for maintaining the confidentiality of their credentials. You are responsible for all activity under your account. WeConnect reserves the right to suspend accounts that violate these terms.`,
  },
  {
    title: "3. Platform Usage",
    content: `Developers may use the platform to build verified profiles, complete assessments and challenges, and participate in projects. Companies may use the platform to post projects, evaluate talent, and manage hiring pipelines. Both parties agree to interact professionally and in good faith.`,
  },
  {
    title: "4. Verification and Performance Data",
    content: `Assessment scores, challenge results, project delivery metrics, and company evaluations constitute verified performance data on the platform. Users may not falsify, manipulate, or misrepresent performance data. WeConnect reserves the right to audit, adjust, or revoke verification status based on platform activity.`,
  },
  {
    title: "5. Projects and Payments",
    content: `Paid projects are governed by separate project agreements between developers and companies. WeConnect facilitates matching and evaluation but is not a party to employment contracts. Payment terms, deliverables, and dispute resolution for paid projects are outlined in individual project agreements.`,
  },
  {
    title: "6. Intellectual Property",
    content: `Developers retain ownership of their work unless otherwise specified in a project agreement. WeConnect retains ownership of the platform, its design, assessments, challenges, and proprietary matching algorithms. Users grant WeConnect a license to display profile and performance data on the platform.`,
  },
  {
    title: "7. Prohibited Conduct",
    content: `Users may not: share account credentials, submit plagiarized assessment work, harass other users, circumvent platform verification, scrape platform data, or use the platform for any unlawful purpose. Violations may result in account suspension or termination.`,
  },
  {
    title: "8. Limitation of Liability",
    content: `WeConnect is provided "as is" without warranties of any kind. We are not liable for hiring decisions, project outcomes, or disputes between developers and companies. Our total liability is limited to the fees paid to WeConnect in the twelve months preceding the claim.`,
  },
  {
    title: "9. Termination",
    content: `Either party may terminate their account at any time. WeConnect may suspend or terminate accounts that violate these terms. Upon termination, certain performance data may be retained in anonymized form for platform integrity.`,
  },
  {
    title: "10. Governing Law",
    content: `These terms are governed by the laws of the Hashemite Kingdom of Jordan. Disputes shall be resolved through binding arbitration in Amman, Jordan, unless otherwise required by applicable law.`,
  },
];

export default function TermsPage() {
  return (
    <PublicLayout>
      <section className="py-16 lg:py-20 border-b border-border">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <p className="text-label text-primary mb-3">Legal</p>
          <h1 className="text-display text-foreground text-[2.25rem]">Terms of Service</h1>
          <p className="mt-4 text-body-sm text-muted">Last updated: August 1, 2026</p>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <p className="text-body text-neutral-dark leading-relaxed mb-10">
            These Terms of Service (&ldquo;Terms&rdquo;) govern your use of the WeConnect platform.
            Please read them carefully before creating an account or using our services.
          </p>

          <div className="space-y-8">
            {sections.map((section) => (
              <div key={section.title}>
                <h2 className="text-h3 text-foreground">{section.title}</h2>
                <p className="mt-3 text-body-sm text-neutral-dark leading-relaxed whitespace-pre-line">
                  {section.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
