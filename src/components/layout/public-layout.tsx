"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BadgeDollarSign,
  Building2,
  Code2,
  Compass,
  Info,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PUBLIC_NAV, BRAND } from "@/lib/constants";
import { Logo, BrandTagline } from "@/components/brand/logo";
import { PublicExperience, PublicPageTransition } from "@/components/public/public-motion";

const publicNavIcons = {
  "/how-it-works": Compass,
  "/developers": Code2,
  "/companies": Building2,
  "/pricing": BadgeDollarSign,
  "/about": Info,
};

export function PublicNavbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5 shrink-0 min-w-0">
          <Logo iconSize={34} />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {PUBLIC_NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group relative inline-flex items-center gap-1.5 text-sm font-medium transition-colors",
                  active ? "text-primary" : "text-neutral-dark hover:text-navy"
                )}
              >
                {item.label}
                <span className={cn("absolute -bottom-2 left-0 h-0.5 rounded-full bg-primary transition-all", active ? "w-full" : "w-0 group-hover:w-full")} />
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="inline-flex h-9 items-center justify-center px-3 text-sm font-medium text-navy hover:bg-surface rounded-[6px] transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="inline-flex h-9 items-center justify-center px-3 text-sm font-medium text-white bg-primary hover:bg-primary-hover rounded-[6px] transition-colors"
          >
            Get Started
          </Link>
        </div>

        <button
          className="md:hidden p-2 rounded-[6px] hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="md:hidden overflow-hidden border-t border-border bg-white"
          >
            <div className="px-4 py-4 space-y-2">
              {PUBLIC_NAV.map((item, index) => {
                const Icon = publicNavIcons[item.href as keyof typeof publicNavIcons] ?? Compass;
                return (
                  <motion.div key={item.href} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.035 }}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium",
                        pathname === item.href ? "bg-primary/5 text-primary" : "text-neutral-dark hover:bg-surface"
                      )}
                      onClick={() => setMobileOpen(false)}
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface text-primary">
                        <Icon className="h-4 w-4" />
                      </span>
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}
              <div className="flex flex-col gap-2 pt-3 border-t border-border">
                <Link
                  href="/login"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-[6px] border border-border bg-white text-sm font-medium text-navy hover:bg-surface"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-[6px] bg-primary text-sm font-medium text-white hover:bg-primary-hover"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export function PublicFooter() {
  return (
    <footer className="border-t border-border bg-white mt-auto">
      <div className="mx-auto max-w-7xl px-4 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 mb-3">
              <Logo iconSize={30} />
            </Link>
            <BrandTagline className="mb-3" />
            <p className="text-body-sm text-muted max-w-xs">
              {BRAND.tagline}
            </p>
          </div>
          <div>
            <h4 className="text-label text-navy mb-3">Product</h4>
            <ul className="space-y-2">
              {["How It Works", "For Developers", "For Companies", "Pricing"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase().replace(/ /g, "-").replace("for-", "")}`}
                    className="text-body-sm text-muted hover:text-navy"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-label text-navy mb-3">Company</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-body-sm text-muted hover:text-navy">About</Link></li>
              <li><Link href="/contact" className="text-body-sm text-muted hover:text-navy">Contact</Link></li>
              <li><Link href="/faq" className="text-body-sm text-muted hover:text-navy">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-label text-navy mb-3">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="text-body-sm text-muted hover:text-navy">Privacy</Link></li>
              <li><Link href="/terms" className="text-body-sm text-muted hover:text-navy">Terms</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row justify-between gap-4">
          <p className="text-caption">© 2026 WeConnect. All rights reserved.</p>
          <p className="text-caption">Developers prove ability. Companies see performance.</p>
        </div>
      </div>
    </footer>
  );
}

export function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <PublicExperience>
      <PublicNavbar />
      <PublicPageTransition>{children}</PublicPageTransition>
      <PublicFooter />
    </PublicExperience>
  );
}
