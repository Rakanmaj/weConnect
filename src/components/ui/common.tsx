import { cn } from "@/lib/utils";
import { type LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({ icon: Icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-16 px-6 text-center",
        className
      )}
    >
      {Icon && (
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-primary/10 bg-gradient-to-br from-primary/10 to-teal/10 shadow-sm">
          <Icon className="h-5 w-5 text-primary" strokeWidth={2.15} />
        </div>
      )}
      <h3 className="text-h4 text-navy">{title}</h3>
      {description && (
        <p className="text-body-sm text-muted mt-2 max-w-sm">{description}</p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn("animate-pulse rounded-[6px] bg-gray-100", className)}
      aria-hidden
    />
  );
}

export function PageHeader({
  title,
  description,
  action,
  breadcrumb,
  className,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
  breadcrumb?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mb-8 min-w-0", className)}>
      {breadcrumb && <div className="mb-2">{breadcrumb}</div>}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <h1 className="text-h1 text-navy truncate">{title}</h1>
          {description && (
            <p className="text-body-sm text-muted mt-1 max-w-2xl">{description}</p>
          )}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
    </div>
  );
}

export function SectionHeader({
  title,
  description,
  action,
  className,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-start justify-between gap-4 mb-4 min-w-0", className)}>
      <div className="min-w-0">
        <h2 className="text-h3 text-navy">{title}</h2>
        {description && <p className="text-body-sm text-muted mt-0.5">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export function FormField({
  label,
  required,
  helper,
  error,
  children,
  className,
}: {
  label: string;
  required?: boolean;
  helper?: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("space-y-2 mb-5", className)}>
      <label className="text-label text-navy block">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
      {(helper || error) && (
        <p className={cn("text-caption", error ? "text-red-600" : "")}>
          {error || helper}
        </p>
      )}
    </div>
  );
}
