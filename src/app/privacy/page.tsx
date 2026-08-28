import type { Metadata } from "next";
import { PublicLayout } from "@/components/layout/public-layout";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "WeConnect privacy policy and data handling practices.",
};

const sections = [
  {
    title: "1. Information We Collect",
    content: `We collect information you provide directly, including account registration details, profile information, assessment results, project delivery data, and communications with our team. We also collect usage data such as log files, device information, and interaction patterns to improve the platform.`,
  },
  {
    title: "2. How We Use Your Information",
    content: `We use collected information to operate and improve WeConnect, facilitate matching between developers and companies, verify skills and performance, process payments, communicate with users, and ensure platform security. Developer performance data is shared with companies only as part of the matching and evaluation process.`,
  },
  {
    title: "3. Information Sharing",
    content: `We do not sell personal information. We share data with companies when developers apply to or are matched with projects, with service providers who assist in platform operations, and when required by law. Aggregated, anonymized data may be used for analytics and platform improvement.`,
  },
  {
    title: "4. Data Security",
    content: `We implement industry-standard security measures including encryption in transit and at rest, access controls, and regular security audits. While we strive to protect your data, no method of transmission over the Internet is 100% secure.`,
  },
  {
    title: "5. Your Rights",
    content: `Depending on your jurisdiction, you may have the right to access, correct, delete, or export your personal data. You may also opt out of marketing communications. To exercise these rights, contact us at privacy@weconnect.io.`,
  },
  {
    title: "6. Cookies and Tracking",
    content: `We use cookies and similar technologies to maintain sessions, remember preferences, and analyze platform usage. You can control cookie settings through your browser, though some features may not function properly without essential cookies.`,
  },
  {
    title: "7. Data Retention",
    content: `We retain account and performance data for as long as your account is active or as needed to provide services. Verification records and project history may be retained to maintain platform integrity even after account deletion, in anonymized form where applicable.`,
  },
  {
    title: "8. Changes to This Policy",
    content: `We may update this privacy policy from time to time. We will notify users of material changes via email or platform notification. Continued use of WeConnect after changes constitutes acceptance of the updated policy.`,
  },
  {
    title: "9. Contact Us",
    content: `For privacy-related inquiries, contact our Data Protection team at privacy@weconnect.io or write to WeConnect, Amman, Jordan.`,
  },
];

export default function PrivacyPage() {
  return (
    <PublicLayout>
      <section className="py-16 lg:py-20 border-b border-border">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <p className="text-label text-primary mb-3">Legal</p>
          <h1 className="text-display text-foreground text-[2.25rem]">Privacy Policy</h1>
          <p className="mt-4 text-body-sm text-muted">Last updated: August 1, 2026</p>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <p className="text-body text-neutral-dark leading-relaxed mb-10">
            WeConnect (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is committed to
            protecting your privacy. This policy describes how we collect, use, and safeguard
            information when you use our platform.
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
