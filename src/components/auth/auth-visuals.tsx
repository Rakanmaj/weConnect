"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  BadgeCheck,
  BarChart3,
  BriefcaseBusiness,
  Check,
  CircleDot,
  Code2,
  GitBranch,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";
import { CircularLogo } from "@/components/brand/logo";

export function LoginNetworkVisual({ active }: { active: boolean }) {
  const reduceMotion = useReducedMotion();
  const connectionPaths = [
    "M260 260 L260 54",
    "M260 260 L422 126",
    "M260 260 L468 286",
    "M260 260 L380 432",
    "M260 260 L168 454",
    "M260 260 L56 346",
    "M260 260 L80 150",
    "M260 260 L188 92",
  ];

  return (
    <div className="relative flex min-h-[360px] items-center justify-center lg:min-h-[560px]">
      <motion.svg
        aria-hidden
        viewBox="0 0 520 520"
        className="absolute h-[500px] w-[500px] max-w-[94vw]"
        animate={active && !reduceMotion ? { scale: 0.72, opacity: 0.86 } : { scale: 1, opacity: 1 }}
        transition={{ duration: 0.82, ease: [0.22, 1, 0.36, 1] }}
      >
        {connectionPaths.map((path, index) => (
          <g key={path}>
            <motion.path
              d={path}
              fill="none"
              stroke={index % 2 ? "rgba(45,212,191,0.28)" : "rgba(96,165,250,0.24)"}
              strokeWidth="1"
              animate={reduceMotion ? undefined : { opacity: [0.16, 0.56, 0.18] }}
              transition={{ duration: 3.5 + index * 0.28, delay: index * 0.16, repeat: Infinity }}
            />
            <motion.path
              d={path}
              fill="none"
              stroke="#2DD4BF"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeDasharray="3 22"
              animate={reduceMotion ? undefined : { strokeDashoffset: [0, -75], opacity: [0.2, 0.9, 0.2] }}
              transition={{ duration: 3.2 + index * 0.18, delay: index * 0.22, repeat: Infinity, ease: "linear" }}
            />
          </g>
        ))}
      </motion.svg>

      {[1, 2, 3].map((ring) => (
        <motion.div
          key={ring}
          className="absolute rounded-full border border-white/[0.14] shadow-[inset_0_0_44px_rgba(45,212,191,0.018)]"
          style={{ width: `${ring * 148}px`, height: `${ring * 148}px` }}
          animate={
            reduceMotion
              ? undefined
              : {
                  rotate: ring % 2 ? 360 : -360,
                  scale: active ? 0.72 : [1, 1.025 + ring * 0.004, 1],
                }
          }
          transition={{
            rotate: { duration: 24 + ring * 6, repeat: Infinity, ease: "linear" },
            scale: { duration: 4.2 + ring, repeat: active ? 0 : Infinity, ease: "easeInOut" },
          }}
        >
          <span className="absolute left-1/2 top-[-5px] h-2.5 w-2.5 rounded-full bg-blue-300 shadow-[0_0_26px_rgba(96,165,250,0.95)]" />
          <span className="absolute bottom-[12%] right-[8%] h-2.5 w-2.5 rounded-full bg-teal-300 shadow-[0_0_24px_rgba(45,212,191,0.9)]" />
          <span className="absolute left-[8%] top-[28%] h-1.5 w-1.5 rounded-full bg-white/75 shadow-[0_0_16px_rgba(255,255,255,0.7)]" />
        </motion.div>
      ))}

      <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className="relative flex h-28 w-28 items-center justify-center rounded-full border border-white/70 bg-white/95 shadow-[0_24px_70px_rgba(0,0,0,0.46),0_0_0_10px_rgba(255,255,255,0.035),0_0_56px_rgba(45,212,191,0.22)] backdrop-blur-md sm:h-32 sm:w-32"
          animate={active && !reduceMotion ? { scale: [1, 0.92, 1.06, 1] } : { scale: 1 }}
          transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.span
            aria-hidden
            className="absolute -inset-5 -z-10 rounded-full bg-gradient-to-br from-primary/35 to-teal/30 blur-2xl"
            animate={reduceMotion ? undefined : { scale: [0.88, 1.22, 0.88], opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut" }}
          />
          <CircularLogo
            size={98}
            priority
            className="relative z-10 border-0 shadow-[0_8px_14px_rgba(13,27,61,0.16)] sm:scale-110"
          />
        </motion.div>
      </div>

      <motion.div
        className="absolute inset-x-4 top-[calc(50%+94px)] z-10 mx-auto flex max-w-lg flex-col items-center text-center sm:top-[calc(50%+108px)]"
        animate={active && !reduceMotion ? { opacity: [1, 0.75, 1], y: [0, 5, 0] } : { opacity: 1, y: 0 }}
        transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2 className="mt-5 text-2xl font-semibold tracking-[-0.035em] text-white sm:text-[28px]">
          Welcome to the verified talent network.
        </h2>
        <p className="mt-3 max-w-md text-sm leading-6 text-white/52">
          Where skills become evidence, projects become experience, and performance creates opportunities.
        </p>
      </motion.div>
    </div>
  );
}

const developerJourney = ["Profile", "Verification", "Assessment", "Skills", "Projects", "Experience"];

export function DeveloperProfilePreview({
  name,
  role,
  location,
  github,
}: {
  name: string;
  role: string;
  location: string;
  github: string;
}) {
  const reduceMotion = useReducedMotion();
  const displayName = name.trim() || "Your verified profile";
  const displayRole = role || "Choose your developer path";
  const initials = name.trim()
    ? name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase()
    : "YC";
  const tech = role.includes("Frontend")
    ? ["React", "TypeScript", "UI"]
    : role.includes("Backend")
      ? ["Node", "APIs", "SQL"]
      : role.includes("Full-Stack")
        ? ["React", "Node", "SQL"]
        : ["Skills", "Projects", "Proof"];

  return (
    <div className="relative py-4 lg:py-10">
      <div className="mb-7 max-w-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">Build your proof</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
          Watch your professional identity take shape.
        </h2>
        <p className="mt-3 text-sm leading-6 text-white/58">
          Every verified step strengthens the evidence behind your profile.
        </p>
      </div>

      <motion.div
        layout
        className="relative overflow-hidden rounded-[26px] border border-white/15 bg-white/[0.09] p-5 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-6"
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent" />
        <div className="flex items-start gap-4">
          <motion.div layout className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary text-lg font-semibold text-white shadow-lg shadow-primary/30">
            {initials}
          </motion.div>
          <div className="min-w-0 flex-1">
            <motion.h3 layout className="truncate text-xl font-semibold text-white">{displayName}</motion.h3>
            <motion.p layout className="mt-1 text-sm text-blue-300">{displayRole}</motion.p>
            <p className="mt-1 text-xs text-white/45">{location || "Location appears here"}</p>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full border border-teal/30 bg-teal/10 px-2.5 py-1 text-[11px] font-semibold text-teal-300">
            <ShieldCheck className="h-3.5 w-3.5" /> Building
          </span>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-2">
          <AnimatePresence mode="popLayout">
            {tech.map((item, index) => (
              <motion.div
                key={item}
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ delay: index * 0.06 }}
                className="rounded-xl border border-white/10 bg-white/[0.06] px-3 py-3 text-center text-xs font-medium text-white/75"
              >
                {item}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-5 flex items-center justify-between rounded-xl border border-white/10 bg-black/10 px-3 py-2.5">
          <span className="inline-flex items-center gap-2 text-xs text-white/55">
            <GitBranch className="h-4 w-4 text-white/70" /> GitHub source
          </span>
          <span className={`text-xs font-semibold ${github ? "text-teal-300" : "text-white/35"}`}>
            {github ? "Connected" : "Not connected"}
          </span>
        </div>
      </motion.div>

      <div className="mt-8 grid gap-0 sm:grid-cols-6">
        {developerJourney.map((step, index) => {
          const active = index === 0 || (index === 1 && Boolean(name.trim()));
          return (
            <div key={step} className="relative flex items-center gap-3 pb-4 sm:flex-col sm:gap-2 sm:pb-0">
              {index < developerJourney.length - 1 && (
                <div className="absolute left-[11px] top-6 h-[calc(100%-4px)] w-px bg-white/15 sm:left-1/2 sm:top-[11px] sm:h-px sm:w-full" />
              )}
              <motion.span
                animate={{ scale: active ? 1 : 0.82, backgroundColor: active ? "#2563EB" : "rgba(255,255,255,0.13)" }}
                className="relative z-10 flex h-[22px] w-[22px] items-center justify-center rounded-full border border-white/15"
              >
                {active ? <Check className="h-3 w-3 text-white" /> : <CircleDot className="h-2.5 w-2.5 text-white/35" />}
              </motion.span>
              <span className={`text-[11px] font-medium ${active ? "text-white" : "text-white/38"}`}>{step}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const companyJourney = ["Company", "Verification", "Create Projects", "AI Matching", "Evaluate", "Hire"];

export function CompanyNetworkPreview({
  companyName,
  industry,
  size,
}: {
  companyName: string;
  industry: string;
  size: string;
}) {
  const reduceMotion = useReducedMotion();
  const talent = [
    { initials: "AA", role: "Full-Stack", score: "96%", offset: -1 },
    { initials: "LN", role: "Frontend", score: "93%", offset: 1 },
    { initials: "MK", role: "Backend", score: "91%", offset: 0 },
  ];

  return (
    <div className="relative py-4 lg:py-10">
      <div className="mb-7 max-w-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-300">Discover proven talent</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
          Build a trusted hiring network.
        </h2>
        <p className="mt-3 text-sm leading-6 text-white/58">
          Your company, projects, and verified developer matches connect in one clear workflow.
        </p>
      </div>

      <div className="relative min-h-[390px] overflow-hidden rounded-[28px] border border-white/15 bg-white/[0.075] p-5 shadow-2xl shadow-black/20 backdrop-blur-xl">
        <div className="absolute left-1/2 top-1/2 h-[240px] w-[240px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-teal/20" />
        <div className="absolute left-1/2 top-1/2 h-[330px] w-[330px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.07]" />

        <motion.div
          layout
          className="absolute left-1/2 top-1/2 z-20 w-[210px] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-teal/30 bg-[#0B2138]/90 p-4 text-center shadow-[0_22px_60px_rgba(20,184,166,0.2)]"
        >
          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-teal/15 text-teal-300">
            <BriefcaseBusiness className="h-5 w-5" />
          </div>
          <h3 className="mt-3 truncate text-base font-semibold text-white">{companyName || "Your company"}</h3>
          <p className="mt-1 truncate text-xs text-white/46">{industry || "Industry"}{size ? ` · ${size} people` : ""}</p>
          <span className="mt-3 inline-flex items-center gap-1 rounded-full bg-teal/10 px-2 py-1 text-[10px] font-semibold text-teal-300">
            <BadgeCheck className="h-3 w-3" /> Company node
          </span>
        </motion.div>

        {talent.map((person, index) => {
          const positions = ["left-4 top-9", "right-4 top-20", "bottom-8 left-12"];
          return (
            <motion.div
              key={person.initials}
              className={`absolute z-10 w-[142px] rounded-2xl border border-white/12 bg-white/[0.095] p-3 backdrop-blur-md ${positions[index]}`}
              animate={reduceMotion ? undefined : { x: [person.offset * 4, person.offset * -4, person.offset * 4], y: [0, -8, 0] }}
              transition={{ duration: 5 + index, delay: index * 0.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20 text-[11px] font-semibold text-blue-300">{person.initials}</span>
                <div>
                  <p className="text-xs font-semibold text-white">{person.role}</p>
                  <p className="text-[10px] text-teal-300">{person.score} match</p>
                </div>
              </div>
            </motion.div>
          );
        })}

        <motion.div
          className="absolute bottom-8 right-8 rounded-xl border border-white/10 bg-[#0A1930]/85 p-3"
          animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="flex items-center gap-2 text-xs font-medium text-white/70">
            <BarChart3 className="h-4 w-4 text-teal-300" /> Verified analytics
          </div>
          <div className="mt-2 flex h-8 items-end gap-1">
            {[45, 72, 58, 88, 76].map((height, index) => (
              <motion.span
                key={height}
                className="w-2 rounded-sm bg-gradient-to-t from-teal/40 to-teal-300"
                initial={{ height: 4 }}
                animate={{ height: `${height}%` }}
                transition={{ delay: 0.15 * index, duration: 0.5 }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] font-medium text-white/42">
        {companyJourney.map((step, index) => (
          <div key={step} className="flex items-center gap-2">
            <span className={`flex h-5 w-5 items-center justify-center rounded-full ${index === 0 ? "bg-teal text-navy" : "bg-white/10 text-white/40"}`}>
              {index === 0 ? <Check className="h-3 w-3" /> : index + 1}
            </span>
            <span className={index === 0 ? "text-white" : undefined}>{step}</span>
            {index < companyJourney.length - 1 && <span className="text-white/15">→</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

export function RoleAtmosphere({ type }: { type: "developer" | "company" }) {
  const developer = type === "developer";
  const items = developer
    ? [
        { icon: Code2, label: "Code challenges" },
        { icon: GitBranch, label: "Project proof" },
        { icon: Sparkles, label: "Skill progress" },
      ]
    : [
        { icon: BriefcaseBusiness, label: "Project briefs" },
        { icon: UserRound, label: "Verified profiles" },
        { icon: BarChart3, label: "Talent analytics" },
      ];

  return (
    <div className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
      {items.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 * index }}
          className="rounded-2xl border border-white/10 bg-white/[0.06] p-3 text-center backdrop-blur-sm"
        >
          <item.icon className={`mx-auto h-4 w-4 ${developer ? "text-blue-300" : "text-teal-300"}`} />
          <p className="mt-2 text-[11px] font-medium text-white/58">{item.label}</p>
        </motion.div>
      ))}
    </div>
  );
}
