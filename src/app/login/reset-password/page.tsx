"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { PublicLayout } from "@/components/layout/public-layout";
import { AuthLayout } from "@/components/public/auth-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ResetPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDone(true);
    }, 1200);
  }

  return (
    <PublicLayout>
      <AuthLayout
        title="Set new password"
        description="Choose a strong password for your account"
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
        {done ? (
          <div className="text-center py-4">
            <div className="h-12 w-12 rounded-full bg-teal/10 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="h-6 w-6 text-teal" />
            </div>
            <h2 className="text-h4 text-foreground">Password updated</h2>
            <p className="mt-2 text-body-sm text-muted">
              Your password has been reset successfully. You can now sign in with your
              new credentials.
            </p>
            <Button className="auth-primary-cta mt-6" asChild>
              <Link href="/login">Sign in</Link>
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="password" required>
                New password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="new-password"
                placeholder="••••••••"
                minLength={8}
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
                autoComplete="new-password"
                placeholder="••••••••"
                minLength={8}
              />
            </div>

            <Button type="submit" className="auth-primary-cta w-full" loading={loading}>
              Update password
            </Button>
          </form>
        )}
      </AuthLayout>
    </PublicLayout>
  );
}
