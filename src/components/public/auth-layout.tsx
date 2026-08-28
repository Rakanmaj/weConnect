import Link from "next/link";
import { Logo } from "@/components/brand/logo";

interface AuthLayoutProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function AuthLayout({ title, description, children, footer }: AuthLayoutProps) {
  return (
    <div className="flex flex-1 items-center justify-center px-4 py-12 lg:py-16 bg-surface/40">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex justify-center mb-6">
            <Logo iconSize={36} />
          </Link>
          <h1 className="text-h1 text-navy">{title}</h1>
          {description && (
            <p className="mt-2 text-body-sm text-muted">{description}</p>
          )}
        </div>

        <div className="public-card public-card--static p-6">
          {children}
        </div>

        {footer && <div className="mt-6 text-center text-body-sm text-muted">{footer}</div>}
      </div>
    </div>
  );
}
