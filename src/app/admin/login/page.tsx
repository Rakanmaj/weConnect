"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Logo, BrandTagline } from "@/components/brand/logo";

export default function AdminLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => router.push("/admin/dashboard"), 600);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0A1628] px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex flex-col items-center gap-3 mb-2">
            <Logo iconSize={40} inverted />
            <BrandTagline inverted />
          </Link>
          <h1 className="text-h2 text-white mt-4">Admin Portal</h1>
          <p className="text-body-sm text-gray-400 mt-1">WeConnect platform administration</p>
        </div>

        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Admin email</Label>
                <Input id="email" type="email" defaultValue="admin@weconnect.io" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" defaultValue="••••••••" required />
              </div>
              <Button type="submit" className="w-full" loading={loading}>
                Sign in
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="mt-6 text-center text-caption text-gray-500">
          <Link href="/" className="hover:text-gray-300">
            ← Back to WeConnect
          </Link>
        </p>
      </div>
    </div>
  );
}
