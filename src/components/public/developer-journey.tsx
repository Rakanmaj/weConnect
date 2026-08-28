"use client";

import { useRef, useState, type ReactNode } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import {
  BadgeCheck,
  BarChart3,
  BriefcaseBusiness,
  Building2,
  Check,
  ClipboardCheck,
  Code2,
  FileSearch,
  Handshake,
  Layers,
  ShieldCheck,
  UserCheck,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

type JourneyStep = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const journeySteps: JourneyStep[] = [
  {
    icon: UserCheck,
    title: "Create your profile",
    description: "Build the foundation of your verified professional journey.",
  },
  {
    icon: ClipboardCheck,
    title: "Complete assessments",
    description: "Prove your technical foundation through role-specific evaluation.",
  },
  {
    icon: Code2,
    title: "Pass skill challenges",
    description: "Turn practical skills into clear, verified evidence.",
  },
  {
    icon: Layers,
    title: "Deliver on projects",
    description: "Build reliability through real work and measurable delivery.",
  },
  {
    icon: BarChart3,
    title: "Build your track record",
    description: "Earn trusted recommendations backed by consistent performance.",
  },
];

const companyJourneySteps: JourneyStep[] = [
  {
    icon: FileSearch,
    title: "Post requirements",
    description: "Turn a clear project brief into a structured talent request.",
  },
  {
    icon: BarChart3,
    title: "Review verified talent",
    description: "Explore developers through proven skills and delivery evidence.",
  },
  {
    icon: Layers,
    title: "Run project evaluations",
    description: "Observe technical execution, communication, and reliability.",
  },
  {
    icon: ClipboardCheck,
    title: "Compare candidates",
    description: "Make decisions using consistent performance indicators.",
  },
  {
    icon: Handshake,
    title: "Hire with proof",
    description: "Connect offers to demonstrated ability and trusted results.",
  },
];

function ProfilePreview({ active }: { active: boolean }) {
  return (
    <div className="relative h-full overflow-hidden rounded-[20px] border border-navy/8 bg-white/80 p-4 shadow-sm">
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
      <div className="flex items-center gap-3">
        <motion.div
          animate={{ scale: active ? 1 : 0.88 }}
          className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary"
        >
          <UserCheck className="h-5 w-5" />
        </motion.div>
        <div className="flex-1">
          <motion.div animate={{ width: active ? "72%" : "48%" }} className="h-2 rounded-full bg-navy/70" />
          <motion.div animate={{ width: active ? "48%" : "30%" }} className="mt-2 h-1.5 rounded-full bg-navy/15" />
        </div>
      </div>
      <div className="mt-5 grid grid-cols-3 gap-2">
        {["React", "Node", "SQL"].map((skill, index) => (
          <motion.span
            key={skill}
            animate={{ opacity: active ? 1 : 0.45, y: active ? 0 : 5 }}
            transition={{ delay: index * 0.08 }}
            className="rounded-lg bg-surface px-2 py-2 text-center text-[10px] font-semibold text-navy/65"
          >
            {skill}
          </motion.span>
        ))}
      </div>
      <motion.div
        animate={{ scaleX: active ? 0.68 : 0.18 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mt-4 h-1.5 origin-left rounded-full bg-gradient-to-r from-teal to-primary"
      />
    </div>
  );
}

function AssessmentPreview({ active }: { active: boolean }) {
  return (
    <div className="relative h-full overflow-hidden rounded-[20px] border border-navy/8 bg-[#0D1B3D] p-4 shadow-lg shadow-navy/10">
      <div className="flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-full bg-red-300/80" />
        <span className="h-2 w-2 rounded-full bg-amber-300/80" />
        <span className="h-2 w-2 rounded-full bg-teal/80" />
      </div>
      <div className="mt-4 space-y-2">
        {[82, 58, 72].map((width, index) => (
          <motion.div
            key={width}
            animate={{ width: active ? `${width}%` : "22%", opacity: active ? 1 : 0.35 }}
            transition={{ duration: 0.65, delay: index * 0.08 }}
            className={cn("h-1.5 rounded-full", index === 1 ? "bg-teal/60" : "bg-white/20")}
          />
        ))}
      </div>
      <div className="absolute bottom-3 right-3 rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-right backdrop-blur-sm">
        <p className="text-[9px] uppercase tracking-[0.15em] text-white/45">Assessment</p>
        <motion.p animate={{ opacity: active ? 1 : 0.35 }} className="mt-0.5 text-xl font-semibold text-teal-300">92%</motion.p>
      </div>
    </div>
  );
}

function SkillsPreview({ active }: { active: boolean }) {
  const nodes = [
    { label: "L1", x: "8%", y: "56%" },
    { label: "L2", x: "40%", y: "22%" },
    { label: "M", x: "72%", y: "56%" },
  ];
  return (
    <div className="relative h-full overflow-hidden rounded-[20px] border border-navy/8 bg-white/80 p-4 shadow-sm">
      <svg aria-hidden viewBox="0 0 100 60" className="absolute inset-x-4 top-8 h-24 w-[calc(100%_-_2rem)]">
        <motion.path
          d="M14 42 L47 15 L80 42"
          fill="none"
          stroke="#14B8A6"
          strokeWidth="1.4"
          initial={false}
          animate={{ pathLength: active ? 1 : 0.12, opacity: active ? 0.8 : 0.2 }}
          transition={{ duration: 0.9 }}
        />
      </svg>
      {nodes.map((node, index) => (
        <motion.div
          key={node.label}
          animate={{ scale: active ? 1 : 0.78, opacity: active ? 1 : 0.42 }}
          transition={{ delay: index * 0.1 }}
          className="absolute flex h-11 w-11 items-center justify-center rounded-full border border-teal/25 bg-white text-xs font-semibold text-teal shadow-[0_8px_24px_rgba(20,184,166,0.16)]"
          style={{ left: node.x, top: node.y }}
        >
          {node.label}
        </motion.div>
      ))}
      <p className="absolute bottom-3 left-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-navy/35">Skill progression</p>
    </div>
  );
}

function ProjectPreview({ active }: { active: boolean }) {
  return (
    <div className="relative h-full overflow-hidden rounded-[20px] border border-navy/8 bg-white/85 p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal/10 text-teal">
          <BriefcaseBusiness className="h-4 w-4" />
        </span>
        <span className="rounded-full bg-teal/10 px-2 py-1 text-[9px] font-semibold uppercase tracking-wide text-teal">In progress</span>
      </div>
      <p className="mt-4 text-xs font-semibold text-navy">Customer Support Dashboard</p>
      <p className="mt-1 text-[10px] text-navy/40">Real delivery · 14 days</p>
      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-navy/8">
        <motion.div
          animate={{ width: active ? "76%" : "18%" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full bg-teal"
        />
      </div>
      <div className="mt-3 flex items-center gap-2 text-[10px] font-medium text-navy/45">
        <Check className="h-3 w-3 text-teal" /> Requirements verified
      </div>
    </div>
  );
}

function VerifiedPreview({ active }: { active: boolean }) {
  return (
    <div className="relative flex h-full flex-col items-center justify-center overflow-hidden rounded-[20px] border border-teal/15 bg-gradient-to-br from-white to-teal/[0.07] p-4 shadow-sm">
      <motion.div
        animate={{ scale: active ? [0.92, 1.06, 1] : 0.82, rotate: active ? [0, -4, 0] : 0 }}
        transition={{ duration: 0.8 }}
        className="relative flex h-16 w-16 items-center justify-center rounded-full bg-teal text-white shadow-[0_14px_34px_rgba(20,184,166,0.28)]"
      >
        <ShieldCheck className="h-7 w-7" />
        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-navy">
          <Check className="h-2.5 w-2.5" />
        </span>
      </motion.div>
      <p className="mt-3 text-sm font-semibold text-navy">WeConnect Verified</p>
      <div className="mt-3 flex items-center gap-2 rounded-full border border-navy/8 bg-white/75 px-3 py-1.5 text-[10px] font-medium text-navy/55">
        <BadgeCheck className="h-3.5 w-3.5 text-primary" /> Recommended to companies
      </div>
    </div>
  );
}

function BriefPreview({ active }: { active: boolean }) {
  return (
    <div className="relative h-full overflow-hidden rounded-[20px] border border-navy/8 bg-white/85 p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal/10 text-teal">
          <FileSearch className="h-4 w-4" />
        </span>
        <span className="rounded-full bg-navy/[0.045] px-2 py-1 text-[9px] font-semibold uppercase tracking-wide text-navy/45">Draft brief</span>
      </div>
      <div className="mt-4 space-y-2">
        {[78, 55, 68].map((width, index) => (
          <motion.div
            key={width}
            animate={{ width: active ? `${width}%` : "22%", opacity: active ? 1 : 0.35 }}
            transition={{ duration: 0.65, delay: index * 0.08 }}
            className={cn("h-1.5 rounded-full", index === 0 ? "bg-navy/55" : "bg-navy/10")}
          />
        ))}
      </div>
      <div className="mt-4 flex gap-2">
        {["React", "API", "14 days"].map((tag) => (
          <span key={tag} className="rounded-md bg-teal/[0.08] px-2 py-1 text-[9px] font-semibold text-teal">{tag}</span>
        ))}
      </div>
    </div>
  );
}

function TalentPreview({ active }: { active: boolean }) {
  const people = [
    { initials: "AA", role: "Full-Stack", score: "96%" },
    { initials: "LN", role: "Frontend", score: "93%" },
    { initials: "MK", role: "Backend", score: "91%" },
  ];
  return (
    <div className="relative h-full overflow-hidden rounded-[20px] border border-navy/8 bg-white/85 p-3 shadow-sm">
      {people.map((person, index) => (
        <motion.div
          key={person.initials}
          animate={{ x: active ? 0 : 12, opacity: active ? 1 : 0.35 }}
          transition={{ delay: index * 0.08, duration: 0.55 }}
          className="mb-2 flex items-center gap-2 rounded-xl border border-navy/[0.055] bg-white/90 p-2 last:mb-0"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-[10px] font-semibold text-primary">{person.initials}</span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[10px] font-semibold text-navy">{person.role}</p>
            <p className="text-[9px] text-navy/35">Verified profile</p>
          </div>
          <span className="text-[10px] font-semibold text-teal">{person.score}</span>
        </motion.div>
      ))}
    </div>
  );
}

function EvaluationPreview({ active }: { active: boolean }) {
  const metrics = [
    { label: "Quality", value: 92 },
    { label: "On-time", value: 96 },
    { label: "Communication", value: 88 },
  ];
  return (
    <div className="relative h-full overflow-hidden rounded-[20px] border border-navy/8 bg-[#0D1B3D] p-4 shadow-lg shadow-navy/10">
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/45">Project evaluation</p>
        <Layers className="h-4 w-4 text-teal-300" />
      </div>
      <div className="mt-4 space-y-3">
        {metrics.map((metric, index) => (
          <div key={metric.label}>
            <div className="mb-1 flex justify-between text-[9px] text-white/55">
              <span>{metric.label}</span><span>{metric.value}%</span>
            </div>
            <div className="h-1 overflow-hidden rounded-full bg-white/10">
              <motion.div
                animate={{ width: active ? `${metric.value}%` : "14%" }}
                transition={{ duration: 0.75, delay: index * 0.09 }}
                className="h-full rounded-full bg-teal"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ComparePreview({ active }: { active: boolean }) {
  const candidates = [
    { name: "A", value: 96 },
    { name: "B", value: 91 },
    { name: "C", value: 86 },
  ];
  return (
    <div className="relative h-full overflow-hidden rounded-[20px] border border-navy/8 bg-white/85 p-4 shadow-sm">
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-navy/35">Candidate comparison</p>
      <div className="mt-4 space-y-3">
        {candidates.map((candidate, index) => (
          <div key={candidate.name} className="grid grid-cols-[22px_1fr_28px] items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-md bg-navy/[0.045] text-[9px] font-semibold text-navy/55">{candidate.name}</span>
            <div className="h-2 overflow-hidden rounded-full bg-navy/[0.06]">
              <motion.div
                animate={{ width: active ? `${candidate.value}%` : "18%" }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={cn("h-full rounded-full", index === 0 ? "bg-teal" : "bg-primary/45")}
              />
            </div>
            <span className="text-[9px] font-semibold text-navy/55">{candidate.value}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-2 text-[9px] font-medium text-teal">
        <Check className="h-3 w-3" /> Objective comparison ready
      </div>
    </div>
  );
}

function HirePreview({ active }: { active: boolean }) {
  return (
    <div className="relative flex h-full items-center justify-center overflow-hidden rounded-[20px] border border-teal/15 bg-gradient-to-br from-white to-teal/[0.07] p-4 shadow-sm">
      <motion.div
        animate={{ width: active ? 72 : 18, opacity: active ? 0.8 : 0.2 }}
        transition={{ duration: 0.8 }}
        className="absolute left-1/2 top-1/2 h-px -translate-x-1/2 bg-gradient-to-r from-primary to-teal"
      />
      <motion.span animate={{ x: active ? -50 : -18 }} className="relative z-10 flex h-12 w-12 items-center justify-center rounded-2xl bg-navy text-white shadow-lg shadow-navy/20">
        <Building2 className="h-5 w-5" />
      </motion.span>
      <motion.span animate={{ x: active ? 50 : 18 }} className="relative z-10 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-sm">
        <UserCheck className="h-5 w-5" />
      </motion.span>
      <motion.div
        animate={{ opacity: active ? 1 : 0, y: active ? 0 : 8, scale: active ? 1 : 0.86 }}
        className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-teal px-3 py-1.5 text-[9px] font-semibold text-white shadow-lg shadow-teal/20"
      >
        <Handshake className="h-3 w-3" /> Offer connected
      </motion.div>
    </div>
  );
}

function DeveloperJourneyVisual({ index, active }: { index: number; active: boolean }) {
  const previews = [ProfilePreview, AssessmentPreview, SkillsPreview, ProjectPreview, VerifiedPreview];
  const Preview = previews[index];
  return (
    <div className="h-[154px] w-full md:w-[230px]">
      <Preview active={active} />
    </div>
  );
}

function CompanyJourneyVisual({ index, active }: { index: number; active: boolean }) {
  const previews = [BriefPreview, TalentPreview, EvaluationPreview, ComparePreview, HirePreview];
  const Preview = previews[index];
  return (
    <div className="h-[154px] w-full md:w-[230px]">
      <Preview active={active} />
    </div>
  );
}

function JourneyTimeline({
  steps,
  renderVisual,
}: {
  steps: JourneyStep[];
  renderVisual: (index: number, active: boolean) => ReactNode;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 62%", "end 46%"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const nextIndex = Math.min(steps.length - 1, Math.max(0, Math.round(latest * (steps.length - 1))));
    setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
  });

  return (
    <div ref={sectionRef} className="relative mt-14 pb-4">
      <div className="absolute bottom-12 left-[15px] top-3 w-px bg-navy/[0.09] sm:left-[23px] lg:left-[31px]">
        <motion.div
          aria-hidden
          className="h-full w-full origin-top bg-gradient-to-b from-teal via-teal to-primary/55"
          style={{ scaleY: reduceMotion ? 1 : scrollYProgress }}
        />
      </div>

      <ol className="relative space-y-20 lg:space-y-24">
        {steps.map((step, index) => {
          const active = activeIndex === index;
          const completed = index < activeIndex;
          const number = String(index + 1).padStart(2, "0");

          return (
            <li key={step.title} className="relative">
              <motion.div
                aria-hidden
                animate={reduceMotion ? undefined : { scale: active ? 1.18 : 1 }}
                className={cn(
                  "absolute left-[9px] top-10 z-20 h-[13px] w-[13px] rounded-full border-2 border-[#F7F9FC] transition-all duration-500 sm:left-[17px] lg:left-[25px]",
                  completed || active ? "bg-teal" : "bg-[#CBD5E1]",
                  active && "shadow-[0_0_0_7px_rgba(20,184,166,0.13),0_0_28px_rgba(20,184,166,0.45)]"
                )}
              />

              <motion.article
                aria-current={active ? "step" : undefined}
                initial={false}
                animate={
                  reduceMotion
                    ? { opacity: 1, y: 0, scale: 1 }
                    : {
                        opacity: active ? 1 : completed ? 0.78 : 0.55,
                        y: active ? -8 : 0,
                        scale: active ? 1 : 0.97,
                      }
                }
                transition={{ duration: 0.68, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  "relative ml-12 w-[calc(100%-3rem)] overflow-hidden rounded-[26px] border border-white/80 bg-white/78 p-6 shadow-[0_22px_60px_-42px_rgba(13,27,61,0.55)] backdrop-blur-xl sm:ml-16 sm:w-[calc(100%-4rem)] sm:p-7 lg:w-[78%] lg:p-8",
                  index % 2 === 0 ? "lg:ml-20" : "lg:ml-[15%]",
                  active && "border-teal/20 shadow-[0_28px_80px_-40px_rgba(13,27,61,0.42)]"
                )}
              >
                <span aria-hidden className="pointer-events-none absolute -right-1 -top-8 text-[108px] font-semibold leading-none tracking-[-0.08em] text-navy/[0.035] sm:text-[132px]">
                  {number}
                </span>

                <div className="relative z-10 grid items-center gap-7 md:grid-cols-[minmax(0,1fr)_230px]">
                  <div className="min-w-0">
                    <div className="flex items-center gap-3">
                      <span className={cn("flex h-10 w-10 items-center justify-center rounded-xl border", active || completed ? "border-teal/20 bg-teal/10 text-teal" : "border-navy/8 bg-navy/[0.035] text-navy/38")}>
                        <step.icon className="h-[18px] w-[18px]" />
                      </span>
                      <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-teal">Step {number}</span>
                    </div>
                    <h3 className="mt-5 text-[28px] font-semibold leading-tight tracking-[-0.035em] text-[#0D1B3D] sm:text-[30px]">
                      {step.title}
                    </h3>
                    <p className="mt-3 max-w-xl text-sm leading-6 text-navy/52 sm:text-[15px]">
                      {step.description}
                    </p>
                  </div>

                  {renderVisual(index, active || completed)}
                </div>
              </motion.article>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export function DeveloperJourney() {
  return (
    <JourneyTimeline
      steps={journeySteps}
      renderVisual={(index, active) => <DeveloperJourneyVisual index={index} active={active} />}
    />
  );
}

export function CompanyJourney() {
  return (
    <JourneyTimeline
      steps={companyJourneySteps}
      renderVisual={(index, active) => <CompanyJourneyVisual index={index} active={active} />}
    />
  );
}
