import type { LevelLabel, OverallLevel } from "@/types";

export const LEVELS: Record<
  OverallLevel,
  { label: LevelLabel; description: string }
> = {
  1: {
    label: "Foundation",
    description: "Building core platform experience and fundamentals.",
  },
  2: {
    label: "Developing",
    description: "Growing demonstrated skills through verified activity.",
  },
  3: {
    label: "Proficient",
    description: "Consistent performance across assessments and projects.",
  },
  4: {
    label: "Advanced",
    description: "Strong track record of verified platform performance.",
  },
};

export const BRAND = {
  name: "WeConnect",
  /** Product message used in-app */
  tagline: "Don't interview potential. See it working.",
  /** Official brand tagline from identity guide */
  brandTagline: "AI-Powered Hiring. Verified Talent. Real Growth.",
  colors: {
    primary: "#0D1B3D",
    secondary: "#2563EB",
    accent: "#14B8A6",
    success: "#22C55E",
    neutralDark: "#1F2937",
    neutralLight: "#F5F7FA",
  },
  /** @deprecated use BRAND.colors */
  primaryNavy: "#0D1B3D",
  primaryBlue: "#2563EB",
  teal: "#14B8A6",
  success: "#22C55E",
  surface: "#F5F7FA",
};

export const DEVELOPER_NAV = [
  { label: "Dashboard", href: "/developer/dashboard", icon: "LayoutDashboard" },
  { label: "Projects", href: "/developer/projects", icon: "FolderKanban" },
  { label: "Challenges", href: "/developer/challenges", icon: "BrainCircuit" },
  { label: "Skills", href: "/developer/skills", icon: "BadgeCheck" },
  { label: "Assessments", href: "/developer/assessment", icon: "FileCode2" },
  { label: "Portfolio", href: "/developer/portfolio", icon: "PanelsTopLeft" },
  { label: "Career", href: "/developer/career", icon: "Route" },
  { label: "Notifications", href: "/developer/notifications", icon: "BellRing" },
  { label: "Profile", href: "/developer/profile", icon: "UserRound" },
  { label: "Settings", href: "/developer/settings", icon: "SlidersHorizontal" },
];

export const COMPANY_NAV = [
  { label: "Dashboard", href: "/company/dashboard", icon: "LayoutDashboard" },
  { label: "Projects", href: "/company/projects", icon: "FolderKanban" },
  { label: "Talent", href: "/company/talent", icon: "UserSearch" },
  { label: "Hiring", href: "/company/hiring", icon: "Handshake" },
  { label: "Evaluations", href: "/company/evaluations", icon: "ClipboardCheck" },
  { label: "Payments", href: "/company/payments", icon: "WalletCards" },
  { label: "Notifications", href: "/company/notifications", icon: "BellRing" },
  { label: "Company Profile", href: "/company/profile", icon: "Building2" },
  { label: "Team", href: "/company/team", icon: "UsersRound" },
  { label: "Settings", href: "/company/settings", icon: "SlidersHorizontal" },
];

export const ADMIN_NAV = [
  { label: "Dashboard", href: "/admin/dashboard", icon: "LayoutDashboard" },
  { label: "Developer Verification", href: "/admin/developer-verification", icon: "ShieldCheck" },
  { label: "Company Verification", href: "/admin/company-verification", icon: "Building2" },
  { label: "Developers", href: "/admin/developers", icon: "UserRound" },
  { label: "Companies", href: "/admin/companies", icon: "Building" },
  { label: "Projects", href: "/admin/projects", icon: "FolderKanban" },
  { label: "Internal Projects", href: "/admin/internal-projects", icon: "FolderKanban" },
  { label: "Assessments", href: "/admin/assessments", icon: "FileCode2" },
  { label: "Challenges", href: "/admin/challenges", icon: "BrainCircuit" },
  { label: "Skills", href: "/admin/skills", icon: "BadgeCheck" },
  { label: "Evaluations", href: "/admin/evaluations", icon: "ClipboardCheck" },
  { label: "Reliability", href: "/admin/reliability", icon: "ChartNoAxesCombined" },
  { label: "Hiring", href: "/admin/hiring", icon: "Handshake" },
  { label: "Payments", href: "/admin/payments", icon: "CircleDollarSign" },
  { label: "Subscriptions", href: "/admin/subscriptions", icon: "Repeat2" },
  { label: "Disputes", href: "/admin/disputes", icon: "Scale" },
  { label: "Reports", href: "/admin/reports", icon: "ChartNoAxesCombined" },
  { label: "Notifications", href: "/admin/notifications", icon: "BellRing" },
  { label: "Settings", href: "/admin/settings", icon: "SlidersHorizontal" },
];

export const PUBLIC_NAV = [
  { label: "How It Works", href: "/how-it-works" },
  { label: "Developers", href: "/developers" },
  { label: "Companies", href: "/companies" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
];
