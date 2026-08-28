import { cn } from "@/lib/utils";
import { LEVELS } from "@/lib/constants";
import type { OverallLevel } from "@/types";

interface LevelBadgeProps {
  level: OverallLevel;
  className?: string;
  showDescription?: boolean;
}

export function LevelBadge({ level, className, showDescription }: LevelBadgeProps) {
  const info = LEVELS[level];
  return (
    <div className={cn("min-w-0", className)}>
      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-navy">
        <span className="inline-flex h-5 w-5 items-center justify-center rounded bg-navy text-[10px] font-bold text-white shrink-0">
          {level}
        </span>
        <span className="truncate">Level {level} — {info.label}</span>
      </span>
      {showDescription && (
        <p className="text-caption mt-1">{info.description}</p>
      )}
    </div>
  );
}

interface SkillBadgeProps {
  name: string;
  level: string;
  verified?: boolean;
  className?: string;
}

export function SkillBadge({ name, level, verified, className }: SkillBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-[6px] border border-border bg-white px-2.5 py-1 text-xs font-medium text-navy min-w-0",
        className
      )}
    >
      <span className="truncate">{name}</span>
      <span className="text-muted shrink-0">—</span>
      <span className={cn("shrink-0", level === "Master" && "text-teal font-semibold")}>
        {level}
      </span>
      {verified && (
        <span className="h-1.5 w-1.5 rounded-full bg-teal shrink-0" title="Verified" />
      )}
    </span>
  );
}

interface StatusBadgeProps {
  status: string;
  className?: string;
}

const statusColors: Record<string, string> = {
  Verified: "bg-green-50 text-green-700 border-green-100",
  "Account Verified": "bg-green-50 text-green-700 border-green-100",
  "Pending Verification": "bg-amber-50 text-amber-700 border-amber-100",
  "More Information Required": "bg-orange-50 text-orange-700 border-orange-100",
  Rejected: "bg-red-50 text-red-700 border-red-100",
  Suspended: "bg-red-50 text-red-700 border-red-100",
  Active: "bg-blue-50 text-primary border-blue-100",
  Completed: "bg-green-50 text-green-700 border-green-100",
  Submitted: "bg-purple-50 text-purple-700 border-purple-100",
  Invitation: "bg-teal/10 text-teal border-teal/20",
  Invited: "bg-teal/10 text-teal border-teal/20",
  "Invitation Sent": "bg-teal/10 text-teal border-teal/20",
  "Pending Response": "bg-amber-50 text-amber-700 border-amber-100",
  Accepted: "bg-blue-50 text-primary border-blue-100",
  Declined: "bg-surface text-neutral-dark border-border",
  "In Progress": "bg-blue-50 text-primary border-blue-100",
  "Under Review": "bg-purple-50 text-purple-700 border-purple-100",
  "Not Completed": "bg-red-50 text-red-700 border-red-100",
  Pending: "bg-amber-50 text-amber-700 border-amber-100",
  Matching: "bg-teal/10 text-teal border-teal/20",
  "AI Analysis": "bg-teal/10 text-teal border-teal/20",
  Matched: "bg-primary/10 text-primary border-primary/20",
  "Invitations Sent": "bg-teal/10 text-teal border-teal/20",
  Purchased: "bg-green-50 text-green-700 border-green-100",
  Paid: "bg-green-50 text-green-700 border-green-100",
  Overdue: "bg-red-50 text-red-700 border-red-100",
  Draft: "bg-surface text-neutral-dark border-border",
  Disabled: "bg-surface text-neutral-dark border-border",
  Archived: "bg-surface text-neutral-dark border-border",
  Open: "bg-blue-50 text-primary border-blue-100",
  "Not Applicable": "bg-surface text-neutral-dark border-border",
  Processing: "bg-amber-50 text-amber-700 border-amber-100",
  "Not Started": "bg-surface text-neutral-dark border-border",
  Earned: "bg-teal/10 text-teal border-teal/20",
  Upcoming: "bg-amber-50 text-amber-700 border-amber-100",
  Scheduled: "bg-blue-50 text-primary border-blue-100",
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[6px] border px-2 py-0.5 text-xs font-medium whitespace-nowrap",
        statusColors[status] || "bg-surface text-neutral-dark border-border",
        className
      )}
    >
      {status}
    </span>
  );
}
