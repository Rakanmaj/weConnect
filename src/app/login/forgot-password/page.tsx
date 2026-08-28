"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";
import { PublicLayout } from "@/components/layout/public-layout";
import { AuthLayout } from "@/components/public/auth-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1200);
  }

  return (
    <PublicLayout>
      <AuthLayout
        title="Reset your password"
        description="Enter your email and we'll send you a reset link"
        footer={
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 text-primary font-medium hover:underline"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to sign in
          </Link>
        }
      >
        {sent ? (
          <div className="text-center py-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-h4 text-foreground">Check your email</h2>
            <p className="mt-2 text-body-sm text-muted">
              If an account exists for that email, we&apos;ve sent password reset
              instructions.
            </p>
            <Button variant="secondary" className="mt-6" asChild>
              <Link href="/login">Return to sign in</Link>
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" required>
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
              />
            </div>

            <Button type="submit" className="auth-primary-cta w-full" loading={loading}>
              Send reset link
            </Button>
          </form>
        )}
      </AuthLayout>
    </PublicLayout>
  );
}
