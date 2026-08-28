"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FaqItem {
  question: string;
  answer: string;
}

interface FaqListProps {
  items: FaqItem[];
}

export function FaqList({ items }: FaqListProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const reduceMotion = useReducedMotion();

  return (
    <div className="public-showcase-card divide-y divide-border/80">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.question} className={cn("transition-colors", isOpen && "bg-primary/[0.025]")}>
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left hover:bg-surface/50 transition-colors"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
            >
              <span className="text-label text-foreground">{item.question}</span>
              <span className={cn("flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors", isOpen && "bg-primary/10 text-primary")}>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 shrink-0 transition-transform duration-300",
                    isOpen && "rotate-180"
                  )}
                />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={reduceMotion ? { opacity: 1 } : { opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.24, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 -mt-1">
                    <p className="text-body-sm text-muted leading-relaxed">{item.answer}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
