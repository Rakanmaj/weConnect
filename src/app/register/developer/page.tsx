"use client";

import { useState } from "react";
import Link from "next/link";
import { ImmersiveAuthLayout } from "@/components/auth/immersive-auth-layout";
import { DeveloperProfilePreview } from "@/components/auth/auth-visuals";
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
  const [firstName, setFirstName] = useState("Ahmad");
  const [lastName, setLastName] = useState("Ali");
  const [preferredRole, setPreferredRole] = useState("Full-Stack Developer");
  const [location, setLocation] = useState("Amman, Jordan");
  const [github, setGithub] = useState("https://github.com/ahmad-ali");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      window.location.href = "/register/verify-email?status=success&role=developer";
    }, 650);
  }

  return (
    <ImmersiveAuthLayout
      eyebrow="Build your proof"
      title="Create developer account"
      description="Your profile begins here and becomes stronger with every verified step."
      theme="blue"
      formSide="left"
      compact
      visual={
        <DeveloperProfilePreview
          name={`${firstName} ${lastName}`}
          role={preferredRole}
          location={location}
          github={github}
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
              <Label htmlFor="firstName" required>
                First name
              </Label>
              <Input
                id="firstName"
                name="firstName"
                required
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                className="h-10 rounded-xl"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="lastName" required>
                Last name
              </Label>
              <Input
                id="lastName"
                name="lastName"
                required
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
                className="h-10 rounded-xl"
              />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="email" required>
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                defaultValue="ahmad.ali@example.com"
                className="h-10 rounded-xl"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="preferredRole">Preferred position</Label>
              <select
                id="preferredRole"
                name="preferredRole"
                value={preferredRole}
                onChange={(event) => setPreferredRole(event.target.value)}
                className="flex h-10 w-full rounded-xl border border-border bg-card px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <option value="">Select (optional)</option>
                {careerTracks.map((track) => (
                  <option key={track} value={track}>
                    {track}
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
              <Input
                id="location"
                name="location"
                required
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                className="h-10 rounded-xl"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="github">GitHub profile</Label>
              <Input
                id="github"
                name="github"
                type="url"
                value={github}
                onChange={(event) => setGithub(event.target.value)}
                className="h-10 rounded-xl"
              />
            </div>
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
            Create account
          </Button>

          <p className="text-center text-xs text-muted">
            Hiring instead?{" "}
            <Link href="/register/company" className="text-primary hover:underline">
              Register as company
            </Link>
          </p>
      </form>
    </ImmersiveAuthLayout>
  );
}
