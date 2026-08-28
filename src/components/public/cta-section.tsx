"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Building2, Code2 } from "lucide-react";
import { BRAND } from "@/lib/constants";

export function CtaSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-t border-border bg-navy">
      <motion.div
        aria-hidden
        className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-primary/20 blur-3xl"
        animate={reduceMotion ? undefined : { x: [0, 36, 0], y: [0, 22, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-teal/15 blur-3xl"
        animate={reduceMotion ? undefined : { x: [0, -30, 0], y: [0, -18, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="mx-auto max-w-7xl px-4 lg:px-8 py-20 lg:py-24">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: reduceMotion ? 0 : 0.5 }}
          className="relative max-w-2xl mx-auto text-center"
        >
          <h2 className="text-h1 text-white tracking-tight">
            Ready to see ability, not assumptions?
          </h2>
          <p className="mt-4 text-body-lg text-white/70">
            {BRAND.tagline} Join developers building verified track records and companies hiring with confidence.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/register/developer"
              className="inline-flex h-12 items-center justify-center gap-2 px-6 text-base font-medium rounded-[6px] bg-white text-navy hover:bg-white/90 w-full sm:w-auto transition-all hover:-translate-y-0.5"
            >
              <Code2 className="h-4 w-4" /> Start as Developer
            </Link>
            <Link
              href="/register/company"
              className="inline-flex h-12 items-center justify-center gap-2 px-6 text-base font-medium rounded-[6px] border border-white/20 bg-transparent text-white hover:bg-white/10 w-full sm:w-auto transition-all hover:-translate-y-0.5"
            >
              <Building2 className="h-4 w-4" /> Join as Company
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
