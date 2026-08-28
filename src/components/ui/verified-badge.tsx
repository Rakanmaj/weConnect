import { cn } from "@/lib/utils";
import { ShieldCheck, BadgeCheck } from "lucide-react";

interface VerifiedBadgeProps {
  type: "account" | "weconnect" | "company";
  className?: string;
}

export function VerifiedBadge({ type, className }: VerifiedBadgeProps) {
  const config = {
    account: { label: "Account Verified", icon: ShieldCheck, variant: "text-primary" },
    weconnect: { label: "WeConnect Verified", icon: BadgeCheck, variant: "text-teal" },
    company: { label: "Verified Company", icon: ShieldCheck, variant: "text-primary" },
  }[type];

  const Icon = config.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 text-xs font-medium",
        config.variant,
        className
      )}
    >
      <Icon className="h-3.5 w-3.5 shrink-0" />
      <span className="truncate">{config.label}</span>
    </span>
  );
}
