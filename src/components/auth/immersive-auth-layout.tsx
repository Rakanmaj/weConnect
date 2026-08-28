"use client";

import Link from "next/link";
import { useEffect, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { CircularLogo } from "@/components/brand/logo";
import { cn } from "@/lib/utils";

type AuthTheme = "blue" | "teal" | "mixed";

const nodes = [
  [7, 14], [18, 28], [31, 12], [44, 25], [58, 11], [73, 24], [90, 13],
  [10, 53], [26, 48], [39, 61], [54, 45], [68, 58], [84, 45], [95, 67],
  [16, 84], [34, 78], [51, 88], [66, 77], [82, 89],
] as const;

const edges = [
  [0, 1], [0, 2], [1, 7], [1, 8], [2, 3], [2, 8], [3, 4], [3, 9],
  [4, 5], [4, 10], [5, 6], [5, 11], [6, 12], [7, 8], [7, 14], [8, 9],
  [8, 15], [9, 10], [9, 15], [9, 16], [10, 11], [10, 16], [10, 17],
  [11, 12], [11, 17], [12, 13], [12, 18], [13, 18], [14, 15], [15, 16],
  [16, 17], [17, 18],
] as const;

export function AuthNetwork({ theme = "mixed", converging = false }: { theme?: AuthTheme; converging?: boolean }) {
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const driftX = useSpring(pointerX, { stiffness: 45, damping: 24 });
  const driftY = useSpring(pointerY, { stiffness: 45, damping: 24 });

  useEffect(() => {
    if (reduceMotion) return;
    const handlePointerMove = (event: PointerEvent) => {
      pointerX.set((event.clientX / window.innerWidth - 0.5) * 18);
      pointerY.set((event.clientY / window.innerHeight - 0.5) * 14);
    };
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [pointerX, pointerY, reduceMotion]);

  const primary = theme === "teal" ? "#2DD4BF" : "#60A5FA";
  const secondary = theme === "blue" ? "#93C5FD" : "#5EEAD4";

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(37,99,235,0.24),transparent_30%),radial-gradient(circle_at_84%_68%,rgba(20,184,166,0.18),transparent_34%)]" />
      <motion.svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute -inset-[3%] h-[106%] w-[106%]"
        initial={false}
        animate={converging && !reduceMotion ? { scale: 0.76, opacity: 0.92 } : { scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: "50% 50%" }}
      >
        <defs>
          <linearGradient id={`auth-network-${theme}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={primary} />
            <stop offset="1" stopColor={secondary} />
          </linearGradient>
        </defs>
        <motion.g style={reduceMotion ? undefined : { x: driftX, y: driftY }}>
          {edges.map(([from, to], index) => (
            <motion.line
              key={`${from}-${to}`}
              x1={nodes[from][0]}
              y1={nodes[from][1]}
              x2={nodes[to][0]}
              y2={nodes[to][1]}
              stroke={`url(#auth-network-${theme})`}
              strokeWidth="0.13"
              vectorEffect="non-scaling-stroke"
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: [0.12, 0.42, 0.16] }}
              transition={{ duration: 4.5 + (index % 4), delay: index * 0.04, repeat: Infinity }}
            />
          ))}
          {nodes.map(([cx, cy], index) => (
            <motion.circle
              key={`${cx}-${cy}`}
              cx={cx}
              cy={cy}
              r={index % 5 === 0 ? 0.5 : 0.32}
              fill={index % 3 === 0 ? secondary : primary}
              animate={reduceMotion ? undefined : { opacity: [0.35, 0.95, 0.35], r: [0.3, 0.48, 0.3] }}
              transition={{ duration: 3.2 + (index % 5) * 0.35, delay: index * 0.12, repeat: Infinity }}
            />
          ))}
        </motion.g>
      </motion.svg>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,12,30,0.14),rgba(6,12,30,0.64))]" />
    </div>
  );
}

interface ImmersiveAuthLayoutProps {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  visual: ReactNode;
  footer?: ReactNode;
  theme?: AuthTheme;
  formSide?: "left" | "right";
  converging?: boolean;
  compact?: boolean;
}

export function ImmersiveAuthLayout({
  eyebrow,
  title,
  description,
  children,
  visual,
  footer,
  theme = "mixed",
  formSide = "right",
  converging = false,
  compact = false,
}: ImmersiveAuthLayoutProps) {
  const reduceMotion = useReducedMotion();

  return (
    <main className="auth-stage relative min-h-screen overflow-x-hidden bg-[#071126] text-white">
      <AuthNetwork theme={theme} converging={converging} />
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-y-0 z-[1] hidden w-[52%] lg:block",
          formSide === "right"
            ? "right-0 bg-gradient-to-r from-transparent via-[#071126]/55 to-[#071126]/92"
            : "left-0 bg-gradient-to-l from-transparent via-[#071126]/52 to-[#071126]/88"
        )}
      />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1480px] flex-col px-4 py-5 sm:px-6 lg:px-10 lg:py-7">
        <div className="flex items-center">
          <Link href="/" aria-label="WeConnect home" className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal">
            <CircularLogo size={58} priority className="shadow-[0_12px_30px_rgba(0,0,0,0.28)]" />
          </Link>
        </div>

        <div className={cn("grid flex-1 items-center gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(420px,0.88fr)] lg:gap-14 xl:gap-20", compact ? "py-7 lg:py-8" : "py-10")}>
          <motion.section
            className={cn(
              "auth-glass relative w-full justify-self-center text-navy",
              compact ? "max-w-[590px] rounded-[26px] p-6 sm:p-7" : "max-w-xl rounded-[28px] p-6 sm:p-8",
              formSide === "left" ? "lg:order-1" : "lg:order-2"
            )}
            initial={reduceMotion ? false : { opacity: 0, x: formSide === "left" ? -22 : 22, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={compact ? "mb-5" : "mb-7"}>
              <p className={cn("text-xs font-semibold uppercase tracking-[0.18em]", theme === "teal" ? "text-teal" : "text-primary")}>
                {eyebrow}
              </p>
              <h1 className={cn("mt-2 font-semibold tracking-[-0.035em] text-navy", compact ? "text-[30px] sm:text-[34px]" : "text-3xl sm:text-4xl")}>
                {title}
              </h1>
              <p className={cn("max-w-md text-sm leading-6 text-muted", compact ? "mt-2" : "mt-3")}>{description}</p>
            </div>

            {children}

            {footer && <div className={cn("text-center text-sm text-muted", compact ? "mt-5" : "mt-6")}>{footer}</div>}
          </motion.section>

          <motion.aside
            className={cn(
              "relative mx-auto w-full max-w-2xl",
              formSide === "left" ? "lg:order-2" : "lg:order-1"
            )}
            initial={reduceMotion ? false : { opacity: 0, x: formSide === "left" ? 22 : -22, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.68, delay: reduceMotion ? 0 : 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            {visual}
          </motion.aside>
        </div>
      </div>
    </main>
  );
}
