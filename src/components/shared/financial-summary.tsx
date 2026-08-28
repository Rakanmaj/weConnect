"use client";

import type { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { usePlatformSettings } from "@/lib/platform-settings";
import { formatCurrency, isPaidProjectType } from "@/lib/platform-config";
import type { PaymentStatus } from "@/types";

type Variant = "developer" | "company" | "admin" | "compact";

export function ProjectFinancialSummary({
  budget,
  paymentStatus,
  variant = "company",
  className,
}: {
  budget?: number;
  paymentStatus?: PaymentStatus;
  variant?: Variant;
  className?: string;
}) {
  const { financialsFor, settings } = usePlatformSettings();

  if (budget == null) return null;

  const { commissionPercentage, commissionAmount, developerPayout } = financialsFor(budget);

  if (variant === "developer") {
    return (
      <Card className={className}>
        <CardContent className="pt-6 space-y-4">
          <h3 className="text-h4 text-foreground">Project Compensation</h3>
          <dl className="space-y-3 text-body-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Company Project Budget</dt>
              <dd className="font-medium tabular-nums">{formatCurrency(budget)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted">WeConnect Platform Commission</dt>
              <dd className="font-medium tabular-nums">
                {commissionPercentage}% — {formatCurrency(commissionAmount)}
              </dd>
            </div>
            <div className="flex justify-between gap-4 pt-3 border-t border-border">
              <dt className="text-foreground font-medium">Your Potential Payout</dt>
              <dd className="text-h4 text-teal tabular-nums">{formatCurrency(developerPayout)}</dd>
            </div>
          </dl>
          <p className="text-caption">
            Potential payout if your submission is purchased. Payment is made if the company
            purchases your successfully completed submission. Multiple developers may work on this
            project independently — only the selected submission is paid.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (variant === "compact") {
    return (
      <div className={className}>
        <p className="text-caption">Potential payout if purchased</p>
        <p className="text-h4 text-foreground tabular-nums">{formatCurrency(developerPayout)}</p>
        <p className="text-caption">
          {settings.projectCommissionPercentage}% platform commission · {formatCurrency(commissionAmount)}
        </p>
      </div>
    );
  }

  return (
    <Card className={className}>
      <CardContent className="pt-6 space-y-4">
        <h3 className="text-h4 text-foreground">Financial Summary</h3>
        <dl className="space-y-3 text-body-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-muted">Project Budget</dt>
            <dd className="font-medium tabular-nums">{formatCurrency(budget)}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted">Developer Payout</dt>
            <dd className="font-medium tabular-nums">{formatCurrency(developerPayout)}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted">WeConnect Commission</dt>
            <dd className="font-medium tabular-nums">
              {formatCurrency(commissionAmount)} ({commissionPercentage}%)
            </dd>
          </div>
          {paymentStatus && (
            <div className="flex justify-between gap-4 pt-3 border-t border-border">
              <dt className="text-muted">Payment Status</dt>
              <dd className="font-medium">{paymentStatus}</dd>
            </div>
          )}
        </dl>
        <p className="text-caption">
          {variant === "admin"
            ? "Developer payout is released only after the company purchases a successfully completed submission."
            : "Payment is processed when the company purchases the selected completed project. Commission is taken from the project budget, not added on top."}
        </p>
      </CardContent>
    </Card>
  );
}

export function PaidProjectGuard({
  type,
  children,
}: {
  type: string;
  children: ReactNode;
}) {
  if (!isPaidProjectType(type)) return null;
  return <>{children}</>;
}
