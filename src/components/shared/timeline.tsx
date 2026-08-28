import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/utils";

interface TimelineItem {
  id: string;
  title: string;
  description?: string;
  date?: string;
  status?: "complete" | "current" | "upcoming";
}

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

export function Timeline({ items, className }: TimelineProps) {
  return (
    <div className={cn("space-y-0", className)}>
      {items.map((item, index) => (
        <div key={item.id} className="flex gap-4">
          <div className="flex flex-col items-center">
            <div
              className={cn(
                "h-3 w-3 rounded-full shrink-0 mt-1.5",
                item.status === "complete" && "bg-primary",
                item.status === "current" && "bg-teal ring-4 ring-teal/20",
                item.status === "upcoming" && "bg-border"
              )}
            />
            {index < items.length - 1 && (
              <div className="w-0.5 flex-1 bg-border my-1 min-h-[32px]" />
            )}
          </div>
          <div className="pb-6 min-w-0 flex-1">
            <p className="text-sm font-medium text-navy">{item.title}</p>
            {item.description && (
              <p className="text-body-sm text-muted mt-0.5">{item.description}</p>
            )}
            {item.date && (
              <p className="text-caption mt-1">{formatDate(item.date)}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

interface ActivityItem {
  id: string;
  title: string;
  description: string;
  time: string;
}

export function ActivityFeed({ items, className }: { items: ActivityItem[]; className?: string }) {
  return (
    <div className={cn("space-y-4", className)}>
      {items.map((item) => (
        <div key={item.id} className="flex gap-3 min-w-0">
          <div className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-navy truncate">{item.title}</p>
            <p className="text-body-sm text-muted mt-0.5 line-clamp-2">{item.description}</p>
            <p className="text-caption mt-1">{item.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

interface EvaluationScoreProps {
  label: string;
  score: number;
  max?: number;
}

export function EvaluationScore({ label, score, max = 5 }: EvaluationScoreProps) {
  const percent = (score / max) * 100;
  return (
    <div className="min-w-0">
      <div className="flex justify-between mb-1.5">
        <span className="text-body-sm text-navy truncate">{label}</span>
        <span className="text-body-sm font-medium tabular-nums shrink-0 ml-2">{score}/{max}</span>
      </div>
      <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
        <div className="metric-progress-fill h-full rounded-full bg-primary" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
