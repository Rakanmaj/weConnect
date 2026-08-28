import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Building2, Code2 } from "lucide-react";
import { PublicLayout } from "@/components/layout/public-layout";
import { AuthLayout } from "@/components/public/auth-layout";

export const metadata: Metadata = {
  title: "Register",
  description: "Create your WeConnect account as a developer or company.",
};

const roles = [
  {
    href: "/register/developer",
    icon: Code2,
    title: "Developer",
    description:
      "Build a verified profile through assessments, challenges, and real project delivery.",
    features: ["Free to join", "Skill verification", "Project matching"],
    accent: "primary" as const,
  },
  {
    href: "/register/company",
    icon: Building2,
    title: "Company",
    description:
      "Hire developers based on verified performance, not assumptions.",
    features: ["Talent matching", "Project evaluations", "Hiring pipeline"],
    accent: "teal" as const,
  },
];

export default function RegisterPage() {
  return (
    <PublicLayout>
      <AuthLayout
        title="Create your account"
        description="Choose how you'll use WeConnect"
        footer={
          <>
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-medium hover:underline">
              Sign in
            </Link>
          </>
        }
      >
        <div className="grid gap-4">
          {roles.map((role) => (
            <Link
              key={role.href}
              href={role.href}
              className={`public-card group p-5 ${role.accent === "teal" ? "public-card--teal" : ""}`}
            >
              <div className="flex items-start gap-4">
                <div className="public-card-icon shrink-0">
                  <role.icon
                    className="h-5 w-5"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="text-h4 text-navy">{role.title}</h2>
                    <ArrowRight className="h-4 w-4 text-muted group-hover:text-primary transition-colors shrink-0" />
                  </div>
                  <p className="mt-1 text-body-sm text-muted">{role.description}</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {role.features.map((feature) => (
                      <li
                        key={feature}
                        className="text-xs px-2 py-0.5 rounded-md bg-surface text-neutral-dark"
                      >
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </AuthLayout>
    </PublicLayout>
  );
}
