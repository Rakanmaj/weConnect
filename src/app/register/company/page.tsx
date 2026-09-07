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
  const [companyName, setCompanyName] = useState("TechFlow Solutions");
  const [industry, setIndustry] = useState("Software & Technology");
  const [companySize, setCompanySize] = useState("50-200");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      window.location.href = "/register/verify-email?status=success&role=company";
    }, 650);
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
                value={companyName}
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
                defaultValue="https://techflow.example.com"
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
                value={industry}
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
                value={companySize}
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
              <Input id="location" name="location" required defaultValue="Amman, Jordan" className="h-10 rounded-xl" />
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
                defaultValue="sarah@techflow.example.com"
                className="h-10 rounded-xl"
              />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="contactName" required>
                Contact name
              </Label>
              <Input id="contactName" name="contactName" required defaultValue="Sarah Al-Masri" className="h-10 rounded-xl" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="contactTitle" required>
                Job title
              </Label>
              <Input
                id="contactTitle"
                name="contactTitle"
                required
                defaultValue="Head of Engineering"
                className="h-10 rounded-xl"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="about">About your company</Label>
            <Textarea
              id="about"
              name="about"
              defaultValue="TechFlow builds customer-support software and is hiring verified full-stack developers for product delivery."
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
                defaultValue="WeConnect2026!"
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
                defaultValue="WeConnect2026!"
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
