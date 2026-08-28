import type { CareerTrack, CompanyEvaluationCriterion } from "@/types";

/**
 * Single source of truth for platform-wide configurable values.
 *
 * Financial calculations and WeConnect Verified thresholds must always be
 * derived from here so Admin, Company and Developer views cannot drift apart.
 */
export interface PlatformSettings {
  /** Commission WeConnect takes when a company purchases a completed paid project. */
  projectCommissionPercentage: number;
  /** Minimum reliability score required for WeConnect Verified status. */
  weconnectVerifiedMinReliability: number;
  /** Successful internal projects required for WeConnect Verified status. */
  weconnectVerifiedMinInternalProjects: number;
  /** Company evaluations required for WeConnect Verified status. */
  weconnectVerifiedMinCompanyEvaluations: number;
  /** Minimum average project performance score for WeConnect Verified status. */
  weconnectVerifiedMinAverageScore: number;
  /** Challenges required before a skill reaches Master level. */
  masterLevelMinChallenges: number;
  platformName: string;
  supportEmail: string;
  /** Company project evaluation rubric — not the AI initial-assessment scoring system. */
  companyEvaluationRubric: CompanyEvaluationCriterion[];
}

export const DEFAULT_COMPANY_EVALUATION_RUBRIC: CompanyEvaluationCriterion[] = [
  {
    key: "codeQuality",
    label: "Code Quality",
    description: "Structure, readability, testing and maintainability of the submitted work.",
    weight: 20,
    enabled: true,
  },
  {
    key: "requirementsUnderstanding",
    label: "Requirements Understanding",
    description: "How accurately the submission reflects the stated functional and technical requirements.",
    weight: 20,
    enabled: true,
  },
  {
    key: "communication",
    label: "Communication",
    description: "Clarity of updates, responsiveness and quality of technical explanations.",
    weight: 15,
    enabled: true,
  },
  {
    key: "deadlineAdherence",
    label: "Deadline Adherence",
    description: "Whether milestones and the final submission were delivered on the agreed timeline.",
    weight: 15,
    enabled: true,
  },
  {
    key: "problemSolving",
    label: "Problem Solving",
    description: "Ability to work through blockers and make sound implementation decisions.",
    weight: 15,
    enabled: true,
  },
  {
    key: "independence",
    label: "Independence",
    description: "How little supervision the developer needed to produce a complete submission.",
    weight: 15,
    enabled: true,
  },
];

export const DEFAULT_PLATFORM_SETTINGS: PlatformSettings = {
  projectCommissionPercentage: 25,
  weconnectVerifiedMinReliability: 90,
  weconnectVerifiedMinInternalProjects: 5,
  weconnectVerifiedMinCompanyEvaluations: 2,
  weconnectVerifiedMinAverageScore: 80,
  masterLevelMinChallenges: 10,
  platformName: "WeConnect",
  supportEmail: "support@weconnect.io",
  companyEvaluationRubric: DEFAULT_COMPANY_EVALUATION_RUBRIC,
};

export const CAREER_PATHS: CareerTrack[] = [
  "Frontend Developer",
  "Backend Developer",
  "Full-Stack Developer",
];

/**
 * Project types that carry a monetary model. Training projects and hiring
 * challenges never show a paid-project payout breakdown.
 */
export function isPaidProjectType(type: string): boolean {
  return type === "Paid Project";
}

export interface ProjectFinancials {
  /** Total budget the company commits to. Commission is taken out of this, never added on top. */
  budget: number;
  commissionPercentage: number;
  commissionAmount: number;
  developerPayout: number;
}

/**
 * Splits a project budget into WeConnect commission and developer payout.
 *
 * The budget is the gross total: commission is deducted from it rather than
 * charged in addition to it.
 */
export function calculateProjectFinancials(
  budget: number,
  commissionPercentage: number = DEFAULT_PLATFORM_SETTINGS.projectCommissionPercentage
): ProjectFinancials {
  const commissionAmount = Math.round((budget * commissionPercentage) / 100);
  return {
    budget,
    commissionPercentage,
    commissionAmount,
    developerPayout: budget - commissionAmount,
  };
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}
