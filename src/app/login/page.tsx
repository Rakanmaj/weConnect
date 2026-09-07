"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Building2, Code2, ShieldCheck } from "lucide-react";
import { ImmersiveAuthLayout } from "@/components/auth/immersive-auth-layout";
import { LoginNetworkVisual } from "@/components/auth/auth-visuals";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<"developer" | "company">("developer");
  const [email, setEmail] = useState("ahmad.ali@example.com");
  const [password, setPassword] = useState("WeConnect2026!");

  function chooseRole(nextRole: "developer" | "company") {
    setRole(nextRole);
    setEmail(nextRole === "developer" ? "ahmad.ali@example.com" : "sarah@techflow.example.com");
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => router.push(`/${role}/dashboard`), 650);
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
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">Choose demo account</p>
          <div className="grid grid-cols-2 gap-2" role="group" aria-label="Demo account type">
            {([
              { id: "developer" as const, label: "Developer", icon: Code2 },
              { id: "company" as const, label: "Company", icon: Building2 },
            ]).map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => chooseRole(id)}
                className={`flex h-11 items-center justify-center gap-2 rounded-xl border text-sm font-semibold transition-colors ${
                  role === id
                    ? "border-primary bg-primary text-white"
                    : "border-navy/[0.08] bg-white/55 text-navy/70 hover:border-navy/20 hover:bg-white"
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ))}
          </div>
          <p className="text-[11px] text-muted">Presentation data is prefilled; no live account is required.</p>
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
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
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
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="h-11 rounded-xl bg-white"
          />
        </div>

        <Button
          type="submit"
          className="auth-primary-cta h-11 w-full rounded-xl"
          loading={loading}
        >
          Continue as {role === "developer" ? "Developer" : "Company"}
        </Button>

        <div className="flex items-center gap-3">
          <span className="h-px flex-1 bg-border" />
          <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted">presentation shortcuts</span>
          <span className="h-px flex-1 bg-border" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button type="button" variant="secondary" onClick={() => router.push("/developer/dashboard")}>
            <Code2 className="h-4 w-4" /> Developer demo
          </Button>
          <Button type="button" variant="secondary" onClick={() => router.push("/company/dashboard")}>
            <Building2 className="h-4 w-4" /> Company demo
          </Button>
        </div>
        <Button variant="ghost" className="w-full" asChild>
          <Link href="/admin/login"><ShieldCheck className="h-4 w-4" /> Open admin sign in</Link>
        </Button>
      </form>
    </ImmersiveAuthLayout>
  );
}
