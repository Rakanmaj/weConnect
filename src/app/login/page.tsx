"use client";

import { useState } from "react";
import Link from "next/link";
import { ImmersiveAuthLayout } from "@/components/auth/immersive-auth-layout";
import { LoginNetworkVisual } from "@/components/auth/auth-visuals";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1200);
  }

  return (
    <ImmersiveAuthLayout
      eyebrow="Enter the network"
      title="Welcome back"
      description="Access your verified work, opportunities, and hiring network."
      theme="mixed"
      compact
      converging={loading}
      visual={<LoginNetworkVisual active={loading} />}
      footer={
        <>
          New to WeConnect?{" "}
          <Link href="/register" className="font-semibold text-primary hover:underline">
            Create account
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
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
            className="h-11 rounded-xl bg-white"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" required>
              Password
            </Label>
            <Link
              href="/login/forgot-password"
              className="text-[11px] font-medium text-navy/48 transition-colors hover:text-teal hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            placeholder="••••••••"
            className="h-11 rounded-xl bg-white"
          />
        </div>

        <Button
          type="submit"
          className="auth-primary-cta h-11 w-full rounded-xl"
          loading={loading}
        >
          Continue
        </Button>

        <div className="flex items-center gap-3">
          <span className="h-px flex-1 bg-border" />
          <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted">or continue with</span>
          <span className="h-px flex-1 bg-border" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button type="button" className="flex h-10 items-center justify-center gap-2 rounded-xl border border-navy/[0.08] bg-white/55 text-sm font-medium text-navy/75 transition-colors hover:border-navy/15 hover:bg-white hover:text-navy">
            <span className="flex h-5 w-5 items-center justify-center rounded-full border border-border text-[11px] font-bold">G</span>
            Google
          </button>
          <button type="button" className="flex h-10 items-center justify-center gap-2 rounded-xl border border-navy/[0.08] bg-white/55 text-sm font-medium text-navy/75 transition-colors hover:border-navy/15 hover:bg-white hover:text-navy">
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-navy px-1 text-[9px] font-bold text-white">GH</span>
            GitHub
          </button>
        </div>
      </form>
    </ImmersiveAuthLayout>
  );
}
