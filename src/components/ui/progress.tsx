"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

function AnimatedProgressValue({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const displayValue = useTransform(motionValue, (latest) => `${Math.round(latest)}%`);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(motionValue, value, {
      duration: reduceMotion ? 0 : motionValue.get() === 0 ? 0.9 : 0.3,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => controls.stop();
  }, [isInView, motionValue, reduceMotion, value]);

  return (
    <motion.span ref={ref} className="text-caption font-medium" data-count-up-ignore>
      {displayValue}
    </motion.span>
  );
}

interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
  showLabel?: boolean;
  size?: "sm" | "md";
  color?: "primary" | "teal" | "success";
}

export function ProgressBar({
  value,
  max = 100,
  className,
  showLabel,
  size = "md",
  color = "primary",
}: ProgressBarProps) {
  const percent = Math.min(100, Math.round((value / max) * 100));
  const colorClass = {
    primary: "bg-primary",
    teal: "bg-teal",
    success: "bg-success",
  }[color];

  return (
    <div className={cn("w-full min-w-0", className)}>
      {showLabel && (
        <div className="flex justify-between mb-1.5">
          <span className="text-caption">Progress</span>
          <AnimatedProgressValue value={percent} />
        </div>
      )}
      <div
        className={cn(
          "w-full rounded-full bg-gray-100 overflow-hidden",
          size === "sm" ? "h-1.5" : "h-2"
        )}
      >
        <div
          className={cn("metric-progress-fill h-full rounded-full transition-[width] duration-300", colorClass)}
          style={{ width: `${percent}%` }}
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
}

interface MatchScoreProps {
  score: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function MatchScore({ score, size = "md", className }: MatchScoreProps) {
  const sizeClasses = {
    sm: "text-sm",
    md: "text-2xl",
    lg: "text-3xl",
  };

  return (
    <div className={cn("min-w-0", className)}>
      <span className={cn("font-semibold text-teal tabular-nums", sizeClasses[size])}>
        {score}%
      </span>
      <span className="text-caption block">Match</span>
    </div>
  );
}

interface PerformanceMetricProps {
  label: string;
  value: string | number;
  className?: string;
}

export function PerformanceMetric({ label, value, className }: PerformanceMetricProps) {
  return (
    <div className={cn("min-w-0", className)}>
      <p className="text-h3 text-navy tabular-nums truncate">{value}</p>
      <p className="text-caption mt-0.5 truncate">{label}</p>
    </div>
  );
}
