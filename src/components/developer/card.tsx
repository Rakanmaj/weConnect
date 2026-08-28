import { cn } from "@/lib/utils";

export function Card({
  children,
  className,
  padding = true,
}: {
  children: React.ReactNode;
  className?: string;
  padding?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-[10px] border border-border bg-white min-w-0",
        padding && "p-4 sm:p-6",
        className
      )}
    >
      {children}
    </div>
  );
}

export function StatCard({
  label,
  value,
  sub,
  className,
}: {
  label: string;
  value: string | number;
  sub?: string;
  className?: string;
}) {
  return (
    <Card className={className}>
      <p className="text-h3 text-navy tabular-nums truncate" data-count-up>{value}</p>
      <p className="text-caption mt-1 truncate">{label}</p>
      {sub && <p className="text-caption text-teal mt-0.5 truncate">{sub}</p>}
    </Card>
  );
}
