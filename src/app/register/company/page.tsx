"use client";

import { useState } from "react";
import Link from "next/link";
import { PublicLayout } from "@/components/layout/public-layout";
import { AuthLayout } from "@/components/public/auth-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const companySizes = ["1-10", "11-50", "50-200", "200-500", "500+"];

export default function RegisterCompanyPage() {
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      window.location.href = "/register/verify-email?status=success";
    }, 1200);
  }

  return (
    <PublicLayout>
      <AuthLayout
        title="Create company account"
        description="Start hiring based on verified performance"
        footer={
          <>
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-medium hover:underline">
              Sign in
            </Link>
          </>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="companyName" required>
              Company name
            </Label>
            <Input
              id="companyName"
              name="companyName"
              required
              placeholder="TechFlow Solutions"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="industry" required>
                Industry
              </Label>
              <Input
                id="industry"
                name="industry"
                required
                placeholder="Software & Technology"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="size" required>
                Company size
              </Label>
              <select
                id="size"
                name="size"
                required
                className="flex h-11 w-full rounded-[6px] border border-border bg-card px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
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

          <div className="space-y-2">
            <Label htmlFor="website" required>
              Website
            </Label>
            <Input
              id="website"
              name="website"
              type="url"
              required
              placeholder="https://yourcompany.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" required>
              Location
            </Label>
            <Input id="location" name="location" required placeholder="Amman, Jordan" />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contactName" required>
                Contact name
              </Label>
              <Input id="contactName" name="contactName" required placeholder="Jane Smith" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactTitle" required>
                Job title
              </Label>
              <Input
                id="contactTitle"
                name="contactTitle"
                required
                placeholder="Head of Engineering"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" required>
              Work email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@company.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="about">
              About your company
            </Label>
            <Textarea
              id="about"
              name="about"
              placeholder="Brief description of your company and hiring needs..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" required>
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              minLength={8}
              placeholder="••••••••"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" required>
              Confirm password
            </Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              minLength={8}
              placeholder="••••••••"
            />
          </div>

          <p className="text-caption">
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

          <Button type="submit" className="w-full" loading={loading}>
            Create company account
          </Button>

          <p className="text-center text-body-sm text-muted">
            Looking to join as a developer?{" "}
            <Link href="/register/developer" className="text-primary hover:underline">
              Register as developer
            </Link>
          </p>
        </form>
      </AuthLayout>
    </PublicLayout>
  );
}
