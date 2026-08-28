"use client";

import { useState } from "react";
import Link from "next/link";
import { ImmersiveAuthLayout } from "@/components/auth/immersive-auth-layout";
import { CompanyNetworkPreview } from "@/components/auth/auth-visuals";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const companySizes = ["1-10", "11-50", "50-200", "200-500", "500+"];

export default function RegisterCompanyPage() {
  const [loading, setLoading] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("");
  const [companySize, setCompanySize] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      window.location.href = "/register/verify-email?status=success";
    }, 1200);
  }

  return (
    <ImmersiveAuthLayout
      eyebrow="Discover proven talent"
      title="Create company account"
      description="Establish your company node and start building a performance-based hiring network."
      theme="teal"
      formSide="left"
      compact
      visual={
        <CompanyNetworkPreview
          companyName={companyName}
          industry={industry}
          size={companySize}
        />
      }
      footer={
        <>
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-primary hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="companyName" required>
                Company name
              </Label>
              <Input
                id="companyName"
                name="companyName"
                required
                placeholder="TechFlow Solutions"
                onChange={(event) => setCompanyName(event.target.value)}
                className="h-10 rounded-xl"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="website" required>
                Website
              </Label>
              <Input
                id="website"
                name="website"
                type="url"
                required
                placeholder="https://company.com"
                className="h-10 rounded-xl"
              />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="industry" required>
                Industry
              </Label>
              <Input
                id="industry"
                name="industry"
                required
                placeholder="Software & Technology"
                onChange={(event) => setIndustry(event.target.value)}
                className="h-10 rounded-xl"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="size" required>
                Company size
              </Label>
              <select
                id="size"
                name="size"
                required
                onChange={(event) => setCompanySize(event.target.value)}
                className="flex h-10 w-full rounded-xl border border-border bg-card px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <option value="">Select size</option>
                {companySizes.map((size) => (
                  <option key={size} value={size}>
                    {size} employees
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="location" required>
                Location
              </Label>
              <Input id="location" name="location" required placeholder="Amman, Jordan" className="h-10 rounded-xl" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email" required>
                Work email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@company.com"
                className="h-10 rounded-xl"
              />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="contactName" required>
                Contact name
              </Label>
              <Input id="contactName" name="contactName" required placeholder="Jane Smith" className="h-10 rounded-xl" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="contactTitle" required>
                Job title
              </Label>
              <Input
                id="contactTitle"
                name="contactTitle"
                required
                placeholder="Head of Engineering"
                className="h-10 rounded-xl"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="about">About your company</Label>
            <Textarea
              id="about"
              name="about"
              placeholder="Brief description of your company and hiring needs..."
              rows={2}
              className="min-h-16 rounded-xl"
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="password" required>
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                minLength={8}
                placeholder="8+ characters"
                className="h-10 rounded-xl"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="confirmPassword" required>
                Confirm password
              </Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                minLength={8}
                placeholder="Repeat password"
                className="h-10 rounded-xl"
              />
            </div>
          </div>

          <p className="text-[11px] leading-4 text-muted">
            By creating an account, you agree to our{" "}
            <Link href="/terms" className="text-primary hover:underline">
              Terms
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
            .
          </p>

          <Button type="submit" className="auth-primary-cta h-11 w-full rounded-xl" loading={loading}>
            Create company account
          </Button>

          <p className="text-center text-xs text-muted">
            Looking to join as a developer?{" "}
            <Link href="/register/developer" className="text-primary hover:underline">
              Register as developer
            </Link>
          </p>
      </form>
    </ImmersiveAuthLayout>
  );
}
