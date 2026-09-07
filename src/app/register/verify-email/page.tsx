"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Mail, XCircle } from "lucide-react";
import { PublicLayout } from "@/components/layout/public-layout";
import { AuthLayout } from "@/components/public/auth-layout";
import { Button } from "@/components/ui/button";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const role = searchParams.get("role") === "company" ? "company" : "developer";
  const continueHref = role === "company"
    ? "/company/verification?status=pending"
    : "/developer/onboarding?step=1";
  const registerHref = role === "company" ? "/register/company" : "/register/developer";

  if (status === "success") {
    return (
      <AuthLayout
        title="Email verified"
        description="Your account is ready to go"
        footer={
          <Link href={continueHref} className="text-primary font-medium hover:underline">
            Continue the {role} journey
          </Link>
        }
      >
        <div className="text-center py-4">
          <div className="h-14 w-14 rounded-full bg-teal/10 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="h-7 w-7 text-teal" />
          </div>
          <h2 className="text-h4 text-foreground">You&apos;re all set</h2>
          <p className="mt-2 text-body-sm text-muted">
            Your email has been verified successfully. Continue to the next
            prefilled setup step in this prototype journey.
          </p>
          <Button className="auth-primary-cta mt-6 w-full" asChild>
            <Link href={continueHref}>
              {role === "company" ? "Continue to company verification" : "Continue to developer profile"}
            </Link>
          </Button>
        </div>
      </AuthLayout>
    );
  }

  if (status === "error") {
    return (
      <AuthLayout
        title="Verification failed"
        description="We couldn't verify your email"
        footer={
          <Link href="/contact" className="text-primary font-medium hover:underline">
            Contact support
          </Link>
        }
      >
        <div className="text-center py-4">
          <div className="h-14 w-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
            <XCircle className="h-7 w-7 text-red-500" />
          </div>
          <h2 className="text-h4 text-foreground">Link expired or invalid</h2>
          <p className="mt-2 text-body-sm text-muted">
            This verification link may have expired or already been used. Request a
            new verification email from your account settings, or contact support.
          </p>
          <div className="mt-6 flex flex-col gap-2">
            <Button className="auth-primary-cta w-full" asChild>
              <Link href={`/register/verify-email?role=${role}`}>Try again</Link>
            </Button>
            <Button variant="secondary" className="w-full" asChild>
              <Link href={registerHref}>Create new account</Link>
            </Button>
          </div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Check your email"
      description="We sent you a verification link"
      footer={
        <>
          Wrong email?{" "}
          <Link href={registerHref} className="text-primary font-medium hover:underline">
            Go back
          </Link>
        </>
      }
    >
      <div className="text-center py-4">
        <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <Mail className="h-7 w-7 text-primary" />
        </div>
        <h2 className="text-h4 text-foreground">Verify your email address</h2>
        <p className="mt-2 text-body-sm text-muted">
          We&apos;ve sent a verification link to your email. Click the link to
          activate your account—it expires in 24 hours.
        </p>
        <div className="mt-6 rounded-md bg-surface px-4 py-3 text-left">
          <p className="text-caption">Didn&apos;t receive it?</p>
          <ul className="mt-2 space-y-1 text-body-sm text-muted">
            <li>· Check your spam or promotions folder</li>
            <li>· Make sure you entered the correct email</li>
            <li>· Wait a few minutes and try again</li>
          </ul>
        </div>
        <Button variant="secondary" className="mt-6 w-full" asChild>
          <Link href={`/register/verify-email?status=success&role=${role}`}>
            Open demo verification link
          </Link>
        </Button>
      </div>
    </AuthLayout>
  );
}

export default function VerifyEmailPage() {
  return (
    <PublicLayout>
      <Suspense
        fallback={
          <AuthLayout title="Loading..." description="">
            <div className="py-8 text-center text-body-sm text-muted">Loading...</div>
          </AuthLayout>
        }
      >
        <VerifyEmailContent />
      </Suspense>
    </PublicLayout>
  );
}
