"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Building2, Code2 } from "lucide-react";
import { CircularLogo } from "@/components/brand/logo";
import { AuthNetwork } from "@/components/auth/immersive-auth-layout";
import { RoleAtmosphere } from "@/components/auth/auth-visuals";

const roles = [
  {
    href: "/register/developer",
    icon: Code2,
    eyebrow: "Build your proof",
    title: "Developer",
    description: "Turn skills, challenges, and real project delivery into a verified professional record.",
    theme: "blue" as const,
  },
  {
    href: "/register/company",
    icon: Building2,
    eyebrow: "Discover proven talent",
    title: "Company",
    description: "Evaluate developers through verified performance, transparent metrics, and project evidence.",
    theme: "teal" as const,
  },
];

export function RoleChoiceExperience() {
  const reduceMotion = useReducedMotion();

  return (
    <main className="auth-stage relative min-h-screen overflow-hidden bg-[#071126] text-white">
      <AuthNetwork theme="mixed" />
      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1500px] flex-col px-4 py-5 sm:px-6 lg:px-10 lg:py-7">
        <div className="flex items-center justify-between">
          <Link href="/" aria-label="WeConnect home" className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal">
            <CircularLogo size={58} priority className="shadow-[0_12px_30px_rgba(0,0,0,0.28)]" />
          </Link>
          <Link href="/login" className="text-sm font-medium text-white/65 transition-colors hover:text-white">
            Already a member? <span className="text-white">Sign in</span>
          </Link>
        </div>

        <div className="flex flex-1 flex-col justify-center py-10">
          <div className="mx-auto mb-9 max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/45">Choose your path</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">How will you connect?</h1>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-white/55">
              Select your side of the network. Your choice shapes the experience that follows.
            </p>
          </div>

          <div className="relative grid gap-5 lg:grid-cols-2 lg:gap-7">
            <motion.div
              aria-hidden
              className="absolute left-1/2 top-1/2 z-20 hidden h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#0B1730]/70 shadow-[0_20px_60px_rgba(0,0,0,0.42),0_0_36px_rgba(45,212,191,0.2)] lg:flex"
              animate={reduceMotion ? undefined : { y: [0, -7, 0], rotate: [0, 2, 0, -2, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <CircularLogo size={68} className="border-white/25 shadow-inner" />
            </motion.div>

            {roles.map((role, index) => (
              <motion.div
                key={role.href}
                initial={reduceMotion ? false : { opacity: 0, x: index === 0 ? -24 : 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={reduceMotion ? undefined : { y: -7, scale: 1.008 }}
                whileTap={reduceMotion ? undefined : { scale: 1.018 }}
              >
                <Link
                  href={role.href}
                  className={`group relative block min-h-[390px] overflow-hidden rounded-[30px] border p-6 backdrop-blur-xl sm:p-8 lg:min-h-[460px] ${
                    role.theme === "blue"
                      ? "border-primary/30 bg-primary/[0.095] hover:border-blue-300/55"
                      : "border-teal/30 bg-teal/[0.085] hover:border-teal-300/55"
                  }`}
                >
                  <div className={`absolute -right-20 -top-20 h-64 w-64 rounded-full blur-3xl transition-opacity group-hover:opacity-100 ${role.theme === "blue" ? "bg-primary/20" : "bg-teal/20"}`} />
                  <div className="relative z-10 flex h-full flex-col">
                    <div className={`flex h-14 w-14 items-center justify-center rounded-2xl border ${role.theme === "blue" ? "border-primary/30 bg-primary/15 text-blue-300" : "border-teal/30 bg-teal/15 text-teal-300"}`}>
                      <role.icon className="h-6 w-6" />
                    </div>
                    <p className={`mt-7 text-xs font-semibold uppercase tracking-[0.18em] ${role.theme === "blue" ? "text-blue-300" : "text-teal-300"}`}>
                      {role.eyebrow}
                    </p>
                    <h2 className="mt-2 text-4xl font-semibold tracking-[-0.04em]">{role.title}</h2>
                    <p className="mt-4 max-w-md text-sm leading-6 text-white/58">{role.description}</p>
                    <RoleAtmosphere type={role.theme === "blue" ? "developer" : "company"} />
                    <div className="mt-auto flex items-center justify-between pt-9 text-sm font-semibold">
                      <span>Continue as {role.title}</span>
                      <span className={`flex h-10 w-10 items-center justify-center rounded-full transition-transform group-hover:translate-x-1 ${role.theme === "blue" ? "bg-primary text-white" : "bg-teal text-navy"}`}>
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
