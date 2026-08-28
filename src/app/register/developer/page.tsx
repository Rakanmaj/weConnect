"use client";

import { useState } from "react";
import Link from "next/link";
import { PublicLayout } from "@/components/layout/public-layout";
import { AuthLayout } from "@/components/public/auth-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const careerTracks = [
  "Frontend Developer",
  "Backend Developer",
  "Full-Stack Developer",
];

export default function RegisterDeveloperPage() {
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
        title="Create developer account"
        description="Start building your verified profile"
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
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" required>
                First name
              </Label>
              <Input id="firstName" name="firstName" required placeholder="Ahmad" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" required>
                Last name
              </Label>
              <Input id="lastName" name="lastName" required placeholder="Ali" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" required>
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="preferredRole">
              Preferred job position
            </Label>
            <select
              id="preferredRole"
              name="preferredRole"
              className="flex h-11 w-full rounded-[6px] border border-border bg-card px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <option value="">Select a preference (optional)</option>
              {careerTracks.map((track) => (
                <option key={track} value={track}>
                  {track}
                </option>
              ))}
            </select>
            <p className="text-caption">This is a preference only. You choose the career path used for the assessment after your account is verified.</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" required>
              Location
            </Label>
            <Input id="location" name="location" required placeholder="Amman, Jordan" />
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
            <p className="text-caption">Must be at least 8 characters</p>
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
            Create account
          </Button>

          <p className="text-center text-body-sm text-muted">
            Hiring instead?{" "}
            <Link href="/register/company" className="text-primary hover:underline">
              Register as company
            </Link>
          </p>
        </form>
      </AuthLayout>
    </PublicLayout>
  );
}
