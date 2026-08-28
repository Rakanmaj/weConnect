"use client";

import { useEffect, useState, type PointerEvent, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import { ArrowUp } from "lucide-react";

export function PublicExperience({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 28,
    mass: 0.25,
  });
  const pointerX = useMotionValue(-500);
  const pointerY = useMotionValue(-500);
  const smoothX = useSpring(pointerX, { stiffness: 90, damping: 24 });
  const smoothY = useSpring(pointerY, { stiffness: 90, damping: 24 });
  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${smoothX}px ${smoothY}px, rgba(37, 99, 235, 0.065), transparent 68%)`;
  const [showBackToTop, setShowBackToTop] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setShowBackToTop(latest > 520);
  });

  useEffect(() => {
    const root = document.querySelector<HTMLElement>("[data-public-content]");
    if (!root || reduceMotion || pathname === "/") return;

    const sections = Array.from(root.children).filter(
      (element): element is HTMLElement => element instanceof HTMLElement && element.tagName === "SECTION"
    );

    sections.forEach((section, index) => {
      section.classList.add("public-reveal");
      section.style.setProperty("--reveal-delay", `${Math.min(index, 3) * 55}ms`);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -70px" }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
      sections.forEach((section) => {
        section.classList.remove("public-reveal", "is-revealed");
        section.style.removeProperty("--reveal-delay");
      });
    };
  }, [pathname, reduceMotion]);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || event.pointerType === "touch") return;
    pointerX.set(event.clientX);
    pointerY.set(event.clientY);
  };

  return (
    <div className="public-shell relative isolate flex min-h-screen flex-col" onPointerMove={handlePointerMove}>
      {!reduceMotion && (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-0 hidden lg:block"
          style={{ background: spotlight }}
        />
      )}
      <motion.div
        aria-hidden
        className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-primary via-teal to-primary"
        style={{ scaleX: progress }}
      />

      {children}

      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            type="button"
            aria-label="Back to top"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            onClick={() => window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" })}
            className="fixed bottom-5 right-5 z-50 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-navy text-white shadow-lg shadow-navy/20 transition-colors hover:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <ArrowUp className="h-4 w-4" strokeWidth={2.25} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

export function PublicPageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.main
        key={pathname}
        data-public-content
        className="relative z-10 flex-1"
        initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -6 }}
        transition={{ duration: reduceMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
}
