"use client";

import { motion } from "framer-motion";
import { BadgeCheck, CheckCircle2, Sparkles } from "lucide-react";

const cards = [
  {
    label: "Developer Verified",
    icon: BadgeCheck,
    className: "left-0 top-[12%] sm:left-2",
    delay: 0.35,
  },
  {
    label: "94% Project Match",
    icon: Sparkles,
    className: "right-0 top-[8%] sm:right-2",
    delay: 0.5,
  },
  {
    label: "Project Completed",
    icon: CheckCircle2,
    className: "bottom-[10%] left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:right-6 sm:bottom-[14%]",
    delay: 0.65,
  },
] as const;

export function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[440px] px-2 pt-8 pb-12 lg:max-w-none lg:px-4">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.22)_0%,rgba(20,184,166,0.14)_42%,transparent_70%)] blur-2xl sm:h-72 sm:w-72"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-[58%] top-[40%] h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(20,184,166,0.18),transparent_68%)] blur-xl"
      />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-[1] flex items-center justify-center py-4"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brand/weconnect-hero-animation.gif"
          alt="WeConnect"
          width={960}
          height={640}
          className="relative h-auto w-[240px] sm:w-[280px] lg:w-[300px] object-contain mix-blend-multiply select-none"
          draggable={false}
        />
      </motion.div>

      {cards.map((card) => (
        <motion.div
          key={card.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: card.delay, ease: [0.22, 1, 0.36, 1] }}
          className={`absolute z-[2] ${card.className}`}
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: card.delay }}
            className="flex items-center gap-2 rounded-full border border-white/80 bg-white/90 px-3 py-1.5 shadow-[0_8px_24px_rgba(13,27,61,0.08)] backdrop-blur-md"
          >
            <card.icon className="h-3.5 w-3.5 text-teal shrink-0" />
            <span className="text-[11px] sm:text-xs font-medium text-navy whitespace-nowrap">
              {card.label}
            </span>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
