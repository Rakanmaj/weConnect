"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function PageHeader({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: PageHeaderProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.46, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <p className="text-label text-primary mb-3 tracking-wide uppercase text-xs">
          {eyebrow}
        </p>
      )}
      <h1 className="text-display text-foreground sm:text-[2.75rem]">{title}</h1>
      {description && (
        <p className="mt-4 text-body-lg text-muted max-w-2xl mx-auto">{description}</p>
      )}
    </motion.div>
  );
}
