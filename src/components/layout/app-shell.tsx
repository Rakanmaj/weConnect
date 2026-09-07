"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
  LayoutDashboard,
  Briefcase,
  Code,
  Award,
  ClipboardCheck,
  User,
  TrendingUp,
  Bell,
  CircleUser,
  Settings,
  Users,
  UserCheck,
  Star,
  CreditCard,
  Building2,
  UsersRound,
  ShieldCheck,
  Building,
  FolderKanban,
  Activity,
  Repeat,
  AlertTriangle,
  BarChart3,
  Menu,
  X,
  ChevronLeft,
  LogOut,
  Search,
  BadgeCheck,
  BellRing,
  BrainCircuit,
  ChartNoAxesCombined,
  CircleDollarSign,
  FileCode2,
  Handshake,
  PanelsTopLeft,
  Repeat2,
  Route,
  Scale,
  SlidersHorizontal,
  UserRound,
  UserSearch,
  WalletCards,
  ArrowRight,
  RotateCcw,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { Logo, LogoMark } from "@/components/brand/logo";
import { useState } from "react";

const iconMap: Record<string, LucideIcon> = {
  LayoutDashboard,
  Briefcase,
  Code,
  Award,
  ClipboardCheck,
  User,
  TrendingUp,
  Bell,
  CircleUser,
  Settings,
  Users,
  UserCheck,
  Star,
  CreditCard,
  Building2,
  UsersRound,
  ShieldCheck,
  Building,
  FolderKanban,
  Activity,
  Repeat,
  AlertTriangle,
  BarChart3,
  BadgeCheck,
  BellRing,
  BrainCircuit,
  ChartNoAxesCombined,
  CircleDollarSign,
  FileCode2,
  Handshake,
  PanelsTopLeft,
  Repeat2,
  Route,
  Scale,
  SlidersHorizontal,
  UserRound,
  UserSearch,
  WalletCards,
};

export interface NavItem {
  label: string;
  href: string;
  icon: string;
}

interface AppShellProps {
  children: React.ReactNode;
  navItems: NavItem[];
  user: { name: string; role: string };
  portal: "developer" | "company" | "admin";
}

type DemoStep = { label: string; href: string };

const DEMO_STARTS: Record<AppShellProps["portal"], string> = {
  developer: "/developer/onboarding?step=1",
  company: "/company/verification?status=pending",
  admin: "/admin/dashboard",
};

function getNextDemoStep(
  portal: AppShellProps["portal"],
  pathname: string,
  searchParams: { get(name: string): string | null }
): DemoStep {
  if (portal === "developer") {
    if (pathname === "/developer/onboarding") {
      const step = Math.min(9, Math.max(1, Number(searchParams.get("step") || 1)));
      return step < 9
        ? { label: `Profile step ${step + 1}`, href: `/developer/onboarding?step=${step + 1}` }
        : { label: "Verification", href: "/developer/verification?status=pending" };
    }
    if (pathname === "/developer/verification") {
      return searchParams.get("status") === "verified"
        ? { label: "Career path", href: "/developer/career-path" }
        : { label: "Approved state", href: "/developer/verification?status=verified" };
    }
    if (pathname === "/developer/career-path") return { label: "Assessment", href: "/developer/assessment?view=intro" };
    if (pathname === "/developer/assessment") {
      return searchParams.get("view") === "exam"
        ? { label: "Process results", href: "/developer/assessment/processing" }
        : { label: "Start assessment", href: "/developer/assessment?view=exam" };
    }
    if (pathname === "/developer/assessment/processing") return { label: "Follow-up", href: "/developer/assessment/follow-up" };
    if (pathname === "/developer/assessment/follow-up") return { label: "Results", href: "/developer/assessment/results" };
    if (pathname === "/developer/assessment/results") return { label: "Challenges", href: "/developer/challenges" };
    if (pathname === "/developer/challenges") return { label: "React path", href: "/developer/challenges/react?view=path" };
    if (pathname === "/developer/challenges/react") {
      const view = searchParams.get("view") || "path";
      if (view === "path") return { label: "Current challenge", href: "/developer/challenges/react?view=challenge" };
      if (view === "challenge") return { label: "Challenge result", href: "/developer/challenges/react?view=result" };
      return { label: "Skills", href: "/developer/skills" };
    }
    if (pathname === "/developer/skills") return { label: "Internal projects", href: "/developer/internal-projects" };
    if (pathname === "/developer/internal-projects") return { label: "Project invitation", href: "/developer/projects/invitations/proj-inv-1" };
    if (pathname.startsWith("/developer/projects/invitations/")) return { label: "Project workspace", href: "/developer/projects/proj-inv-1" };
    if (pathname === "/developer/projects") return { label: "Project invitation", href: "/developer/projects/invitations/proj-inv-1" };
    if (/^\/developer\/projects\/[^/]+$/.test(pathname)) return { label: "Portfolio", href: "/developer/portfolio" };
    if (pathname === "/developer/portfolio") return { label: "Career", href: "/developer/career" };
    if (pathname === "/developer/career") return { label: "Interview", href: "/developer/interviews/int-1" };
    if (pathname.startsWith("/developer/interviews/")) return { label: "Offer", href: "/developer/offers/offer-1" };
    if (pathname.startsWith("/developer/offers/")) return { label: "Verified profile", href: "/developer/verified" };
    if (pathname === "/developer/level") return { label: "Verified profile", href: "/developer/verified" };
    if (pathname === "/developer/verified") return { label: "Dashboard", href: "/developer/dashboard" };
    return { label: "Assessment", href: "/developer/assessment?view=intro" };
  }

  if (portal === "company") {
    if (pathname === "/company/verification") {
      return searchParams.get("status") === "verified"
        ? { label: "Dashboard", href: "/company/dashboard" }
        : { label: "Approved state", href: "/company/verification?status=verified" };
    }
    if (pathname === "/company/projects/new") {
      const step = Math.min(10, Math.max(1, Number(searchParams.get("step") || 1)));
      return step < 10
        ? { label: `Project step ${step + 1}`, href: `/company/projects/new?step=${step + 1}` }
        : { label: "Project analysis", href: "/company/projects/proj-csm-dashboard/analysis" };
    }
    if (pathname.endsWith("/analysis")) return { label: "Top matches", href: pathname.replace("/analysis", "/matches") };
    if (pathname.endsWith("/matches")) return { label: "Project progress", href: pathname.replace("/matches", "/progress") };
    if (pathname.endsWith("/progress")) return { label: "Submissions", href: pathname.replace("/progress", "/submissions") };
    if (pathname.endsWith("/submissions")) return { label: "Compare", href: pathname.replace("/submissions", "/compare") };
    if (pathname.endsWith("/compare")) return { label: "Evaluation", href: pathname.replace("/compare", "/evaluation") };
    if (pathname.endsWith("/evaluation")) return { label: "Decision", href: pathname.replace("/evaluation", "/decision") };
    if (pathname.endsWith("/decision")) return { label: "Hiring pipeline", href: "/company/hiring" };
    if (pathname === "/company/projects") return { label: "Create project", href: "/company/projects/new?step=1" };
    if (/^\/company\/projects\/[^/]+$/.test(pathname)) return { label: "Top matches", href: `${pathname}/matches` };
    if (pathname === "/company/talent") return { label: "Top profile", href: "/company/talent/dev-ahmad" };
    if (pathname.startsWith("/company/talent/")) return { label: "Hiring pipeline", href: "/company/hiring" };
    if (pathname === "/company/hiring") return { label: "Interviews", href: "/company/interviews" };
    if (pathname === "/company/interviews") return { label: "Offers", href: "/company/offers" };
    if (pathname === "/company/offers") return { label: "Payments", href: "/company/payments" };
    if (pathname === "/company/payments") return { label: "Dashboard", href: "/company/dashboard" };
    return { label: "Create project", href: "/company/projects/new?step=1" };
  }

  if (pathname === "/admin/dashboard") return { label: "Developer verification", href: "/admin/developer-verification" };
  if (pathname === "/admin/developer-verification") return { label: "Review developer", href: "/admin/developer-verification/vq-1" };
  if (pathname.startsWith("/admin/developer-verification/")) return { label: "Company verification", href: "/admin/company-verification" };
  if (pathname === "/admin/company-verification") return { label: "Review company", href: "/admin/company-verification/cvq-1" };
  if (pathname.startsWith("/admin/company-verification/")) return { label: "Projects", href: "/admin/projects" };
  if (pathname === "/admin/projects") return { label: "Project detail", href: "/admin/projects/proj-csm-dashboard" };
  if (pathname.startsWith("/admin/projects/")) return { label: "Assessments", href: "/admin/assessments" };
  if (pathname === "/admin/assessments") return { label: "Assessment detail", href: "/admin/assessments/as-1" };
  if (pathname.startsWith("/admin/assessments/")) return { label: "Challenges", href: "/admin/challenges" };
  if (pathname === "/admin/challenges") return { label: "Skills", href: "/admin/skills" };
  if (pathname === "/admin/skills") return { label: "Hiring", href: "/admin/hiring" };
  if (pathname === "/admin/hiring") return { label: "Hiring detail", href: "/admin/hiring/h1" };
  if (pathname.startsWith("/admin/hiring/")) return { label: "Payments", href: "/admin/payments" };
  if (pathname === "/admin/payments") return { label: "Reports", href: "/admin/reports" };
  return { label: "Dashboard", href: "/admin/dashboard" };
}

export function AppShell({ children, navItems, user, portal }: AppShellProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const nextDemoStep = getNextDemoStep(portal, pathname, searchParams);

  const portalColors = {
    developer: "border-l-primary",
    company: "border-l-teal",
    admin: "border-l-navy",
  };

  return (
    <div className="flex min-h-screen bg-surface">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col border-r transition-all duration-200",
          portal === "admin" ? "bg-[#0A1628] border-[#1E293B]" : "bg-white border-border",
          collapsed ? "w-[68px]" : "w-64",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className={cn(
          "flex h-16 items-center border-b px-4",
          portal === "admin" ? "admin-sidebar-border border-[#1E293B]" : "border-border",
          collapsed && "justify-center"
        )}>
          {!collapsed && (
            <Link href="/" className="flex items-center min-w-0">
              <Logo iconSize={28} inverted={portal === "admin"} />
            </Link>
          )}
          {collapsed && <LogoMark size={36} />}
          <button
            className={cn(
              "ml-auto lg:hidden p-1.5 rounded-[6px]",
              portal === "admin" ? "hover:bg-white/10 text-white" : "hover:bg-surface"
            )}
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">
          {navItems.map((item) => {
            const Icon = iconMap[item.icon] || LayoutDashboard;
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "group flex items-center gap-3 rounded-[8px] px-2 py-1.5 text-sm font-medium transition-colors min-w-0",
                  portal === "admin"
                    ? cn("admin-nav-link", isActive && "admin-nav-active")
                    : isActive
                      ? "bg-blue-50 text-primary"
                      : "text-neutral-dark hover:bg-surface hover:text-navy",
                  collapsed && "justify-center px-2"
                )}
                title={collapsed ? item.label : undefined}
              >
                <span
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all",
                    portal === "admin"
                      ? isActive ? "bg-white/15 text-white" : "bg-white/[0.06] text-slate-300 group-hover:bg-white/10"
                      : isActive ? "bg-primary text-white shadow-sm shadow-primary/20" : "bg-surface text-muted"
                  )}
                >
                  <Icon className="h-[17px] w-[17px]" strokeWidth={2.1} />
                </span>
                {!collapsed && <span className="truncate">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className={cn(
          "border-t p-3",
          portal === "admin" ? "admin-sidebar-border border-[#1E293B]" : "border-border"
        )}>
          <div className={cn("flex items-center gap-3", collapsed && "justify-center")}>
            <Avatar name={user.name} size="sm" />
            {!collapsed && (
              <div className="min-w-0 flex-1">
                <p className={cn(
                  "text-sm font-medium truncate",
                  portal === "admin" ? "admin-user-name text-white" : "text-navy"
                )}>
                  {user.name}
                </p>
                <p className={cn(
                  "text-caption truncate capitalize",
                  portal === "admin" && "admin-user-role"
                )}>
                  {portal}
                </p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main */}
      <div
        className={cn(
          "flex-1 flex flex-col min-w-0 transition-all duration-200",
          collapsed ? "lg:ml-[68px]" : "lg:ml-64"
        )}
      >
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-white px-4 lg:px-8">
          <button
            className="lg:hidden p-2 rounded-[6px] hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open navigation"
          >
            <Menu className="h-5 w-5" />
          </button>
          <button
            className="hidden lg:flex p-2 rounded-[6px] hover:bg-surface text-muted"
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? "Expand navigation" : "Collapse navigation"}
          >
            <ChevronLeft className={cn("h-4 w-4 transition-transform", collapsed && "rotate-180")} />
          </button>

          <div className="flex-1 max-w-md hidden sm:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
              <input
                type="search"
                placeholder="Search..."
                className="w-full h-10 pl-9 pr-4 rounded-[6px] border border-border bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <Link
              href={DEMO_STARTS[portal]}
              className="hidden h-9 items-center justify-center gap-1.5 rounded-lg border border-border bg-white px-2.5 text-xs font-medium text-muted transition-colors hover:bg-surface hover:text-navy md:flex"
              title="Restart this role's presentation journey"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span className="hidden xl:inline">Restart journey</span>
            </Link>
            <Link
              href={nextDemoStep.href}
              className="flex h-9 items-center justify-center gap-1.5 rounded-lg bg-navy px-3 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-navy/90"
              title={`Next demo step: ${nextDemoStep.label}`}
            >
              <span className="hidden sm:inline">Next: {nextDemoStep.label}</span>
              <span className="sm:hidden">Next</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href={`/${portal}/notifications`}
              className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-transparent text-muted transition-all hover:border-border hover:bg-surface hover:text-navy"
              aria-label="Notifications"
            >
              <BellRing className="h-[18px] w-[18px]" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary" />
            </Link>
            <Link
              href={`/${portal}/settings`}
              className="hidden h-9 w-9 items-center justify-center rounded-lg border border-transparent text-muted transition-all hover:border-border hover:bg-surface hover:text-navy sm:flex"
              aria-label="Settings"
            >
              <SlidersHorizontal className="h-[18px] w-[18px]" />
            </Link>
            <Link href={portal === "admin" ? "/admin/login" : "/login"} className="flex h-9 w-9 items-center justify-center rounded-lg border border-transparent text-muted transition-all hover:border-red-100 hover:bg-red-50 hover:text-red-600" aria-label="Sign out">
              <LogOut className="h-[18px] w-[18px]" />
            </Link>
          </div>
        </header>

        {/* Content */}
        <main className={cn("flex-1 p-4 lg:p-8 max-w-[1280px] w-full mx-auto", portalColors[portal])}>
          {children}
        </main>
      </div>

      {/* Mobile bottom nav for developer */}
      {portal === "developer" && (
        <nav className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around border-t border-border bg-white px-2 py-2 lg:hidden">
          {navItems.slice(0, 5).map((item) => {
            const Icon = iconMap[item.icon] || LayoutDashboard;
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-0.5 px-2 py-1 min-w-0",
                  isActive ? "text-primary" : "text-muted"
                )}
              >
                <span className={cn("flex h-8 w-8 items-center justify-center rounded-lg", isActive ? "bg-primary text-white" : "bg-surface")}>
                  <Icon className="h-[17px] w-[17px] shrink-0" strokeWidth={2.1} />
                </span>
                <span className="text-[10px] truncate max-w-[56px]">{item.label.split(" ")[0]}</span>
              </Link>
            );
          })}
        </nav>
      )}
    </div>
  );
}
