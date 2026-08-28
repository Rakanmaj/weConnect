import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  label: string;
  value: string | number;
  change?: string;
  icon?: LucideIcon;
  accent?: "primary" | "teal" | "navy" | "success";
  className?: string;
}

const accentStyles = {
  primary: "bg-blue-50 text-primary",
  teal: "bg-teal/10 text-teal",
  navy: "bg-navy/5 text-foreground",
  success: "bg-green-50 text-green-700",
};

export function StatCard({ label, value, change, icon: Icon, accent = "primary", className }: StatCardProps) {
  return (
    <Card className={className}>
      <CardContent className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-caption">{label}</p>
          <p className="text-h2 text-foreground mt-1 tabular-nums" data-count-up>{value}</p>
          {change && <p className="text-caption mt-1 text-teal">{change}</p>}
        </div>
        {Icon && (
          <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-[8px]", accentStyles[accent])}>
            <Icon className="h-5 w-5" />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
