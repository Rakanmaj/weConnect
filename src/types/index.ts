export type OverallLevel = 1 | 2 | 3 | 4;

export type LevelLabel =
  | "Foundation"
  | "Developing"
  | "Proficient"
  | "Advanced";

export type SkillLevel =
  | "Level 1"
  | "Level 2"
  | "Master"
  | "Locked";

/**
 * Administrative account verification. This is the EARLY gate an admin reviews
 * after a developer builds a profile and uploads evidence.
 *
 * This is NOT the same thing as WeConnect Verified — see `WeConnectVerifiedStatus`.
 */
export type VerificationStatus =
  | "Pending Verification"
  | "Verified"
  | "More Information Required"
  | "Rejected"
  | "Suspended";

/** Alias used where the distinction from WeConnect Verified needs to be explicit. */
export type AccountVerificationStatus = VerificationStatus;

/**
 * Earned performance status, awarded long after account verification based on
 * internal project delivery, reliability, scores and verified skills.
 */
export type WeConnectVerifiedStatus = "Not Started" | "In Progress" | "Earned" | "Revoked";

export type ProjectType = "Training Project" | "Paid Project" | "Hiring Challenge";

/**
 * Overall project lifecycle owned by the company/platform.
 *
 * Individual developer work status lives on `ProjectAssignment` — never assume
 * one of these values describes what a specific developer is doing.
 */
export type ProjectState =
  | "Draft"
  | "Submitted"
  | "AI Analysis"
  | "Matching"
  | "Invitations Sent"
  | "In Progress"
  | "Under Review"
  | "Completed"
  | "Purchased"
  | "Cancelled";

/** Where a single developer stands on the invitation they received. */
export type InvitationStatus =
  | "Matched"
  | "Invited"
  | "Pending Response"
  | "Accepted"
  | "Declined"
  | "Expired";

/**
 * Per-developer work progression:
 * Accepted → In Progress → Submitted → Under Review → Completed / Not Completed
 */
export type WorkStatus =
  | "Accepted"
  | "In Progress"
  | "Submitted"
  | "Under Review"
  | "Completed"
  | "Not Completed";

export type SubmissionStatus = "Not Submitted" | "Submitted" | "Under Review" | "Evaluated";

export type EvaluationStatus = "Not Started" | "Pending" | "Under Review" | "Completed";

export type CompletionStatus = "Pending" | "Completed" | "Not Completed";

export type PaymentStatus = "Not Applicable" | "Pending" | "Processing" | "Paid" | "Refunded";

export type CareerTrack =
  | "Frontend Developer"
  | "Backend Developer"
  | "Full-Stack Developer";

export interface Skill {
  name: string;
  level: SkillLevel;
  verified: boolean;
  challengesCompleted?: number;
}

export interface EducationEntry {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startYear: string;
  endYear: string;
}

export interface ExperienceEntry {
  id: string;
  company: string;
  title: string;
  startDate: string;
  endDate: string;
  summary: string;
}

export interface CertificateEntry {
  id: string;
  name: string;
  issuer: string;
  issuedDate: string;
  credentialUrl?: string;
}

export interface VerificationDocument {
  id: string;
  name: string;
  type: "Government ID" | "Certificate" | "CV" | "Portfolio Evidence" | "Reference" | "Other";
  uploadedAt: string;
  status: "Pending Review" | "Accepted" | "Rejected";
  fileName: string;
}

export interface Developer {
  id: string;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  /** Display track. Equals `careerPath` once one has been chosen. */
  role: CareerTrack;
  /**
   * Finalized career path used for the initial assessment. Only set AFTER the
   * account has been verified — null while verification is still pending.
   */
  careerPath: CareerTrack | null;
  /** Self-declared job position given at registration, before verification. */
  preferredRole?: string;
  avatar?: string;
  location: string;
  phone?: string;
  overallLevel: OverallLevel;
  levelLabel: LevelLabel;

  /** Administrative account verification — the early admin gate. */
  accountVerified: boolean;
  accountVerificationStatus: AccountVerificationStatus;
  accountVerifiedAt?: string;
  adminNotes?: string;

  /** Earned performance status — kept strictly separate from account verification. */
  weconnectVerified: boolean;
  weconnectVerifiedStatus: WeConnectVerifiedStatus;
  weconnectVerifiedAt?: string;

  skills: Skill[];
  bio?: string;
  github?: string;
  linkedin?: string;
  portfolio?: string;
  cvUrl?: string;
  education?: EducationEntry[];
  experience?: ExperienceEntry[];
  certificates?: CertificateEntry[];
  verificationDocuments?: VerificationDocument[];

  availability: string;
  reliability: number;
  averageScore: number;
  requirementsAccuracy: number;
  onTimeCompletion: number;
  realProjectsCompleted: number;
  internalProjectsCompleted: number;
  challengesPassed: number;
  companyEvaluations: number;
  /** True once the initial assessment has been taken (post account verification). */
  assessmentCompleted?: boolean;
  matchScore?: number;
}

export interface CompanyContact {
  name: string;
  title: string;
  email: string;
  phone?: string;
}

export interface Company {
  id: string;
  name: string;
  industry: string;
  location: string;
  website: string;
  verified: boolean;
  verificationStatus: VerificationStatus;
  logo?: string;
  about?: string;
  size: string;
  officialEmail?: string;
  registrationNumber?: string;
  registrationCountry?: string;
  foundedYear?: string;
  contactPerson?: CompanyContact;
  verificationDocuments?: VerificationDocument[];
  submittedAt?: string;
  adminNotes?: string;
}

/**
 * One developer's independent participation in a project.
 *
 * Up to four developers work the same project in parallel, each with their own
 * invitation response, work status, submission and evaluation outcome.
 */
export interface ProjectAssignment {
  id: string;
  projectId: string;
  developerId: string;
  developer: Developer;
  matchScore: number;
  invitationStatus: InvitationStatus;
  /** Set when the company sends the project invitation. */
  invitedAt?: string;
  respondedAt?: string;
  /** Undefined while the invitation is unanswered or was declined. */
  workStatus?: WorkStatus;
  progress: number;
  lastUpdate?: string;
  submissionStatus: SubmissionStatus;
  submittedAt?: string;
  evaluationStatus: EvaluationStatus;
  completionStatus: CompletionStatus;
  /** Set only once the company purchases this specific submission. */
  purchased?: boolean;
}

export interface ProjectSubmission {
  id: string;
  assignmentId: string;
  developerId: string;
  submittedAt: string;
  summary: string;
  demoUrl: string;
  previewUrl: string;
  screenshots: string[];
  technicalSummary: string;
  requirementsMet: number;
  requirementsTotal: number;
  /** Only accessible to the company after purchase. */
  repositoryUrl?: string;
  repositoryUnlocked: boolean;
}

export interface ProjectEvaluator {
  name: string;
  title: string;
  email: string;
}

export type ReviewStageStatus = "Completed" | "Upcoming" | "Pending" | "Scheduled";

export interface ReviewStage {
  id: string;
  label: string;
  status: ReviewStageStatus;
  date?: string;
}

export interface Project {
  id: string;
  title: string;
  type: ProjectType;
  company: Company;
  role: CareerTrack;
  technologies: string[];
  skills?: string[];
  duration: string;
  deadline: string;
  /** Overall project lifecycle. Per-developer status lives on assignments. */
  state: ProjectState;
  matchScore?: number;
  description: string;
  /** Legacy flat requirement list, kept for summary displays. */
  requirements: string[];
  functionalRequirements?: string[];
  technicalRequirements?: string[];
  deliverables?: string[];
  difficulty?: "Beginner" | "Intermediate" | "Advanced";
  workload: string;
  /** Gross budget. Commission is deducted from this, never added on top. */
  budget?: number;
  paymentStatus?: PaymentStatus;
  createdAt?: string;
  lastActivity?: string;
  assignments?: ProjectAssignment[];
  evaluator?: ProjectEvaluator;
  reviewStages?: ReviewStage[];
  /** Assignment id of the submission the company purchased, if any. */
  purchasedAssignmentId?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: string;
  href?: string;
}

/**
 * Company project evaluation rubric.
 *
 * Deliberately separate from the AI initial-assessment scoring system — the two
 * must never share criteria or weights.
 */
export type CompanyEvaluationCriterionKey =
  | "codeQuality"
  | "requirementsUnderstanding"
  | "communication"
  | "deadlineAdherence"
  | "problemSolving"
  | "independence";

export interface CompanyEvaluationCriterion {
  key: CompanyEvaluationCriterionKey;
  label: string;
  description: string;
  /** Optional relative weight, configurable by admin. */
  weight: number;
  enabled: boolean;
}

export interface CriterionScore {
  key: CompanyEvaluationCriterionKey;
  score: number;
  comment?: string;
}

export interface DeveloperEvaluation {
  id: string;
  assignmentId: string;
  developerId: string;
  projectId: string;
  scores: CriterionScore[];
  overallFeedback?: string;
  completionDecision: CompletionStatus;
  status: EvaluationStatus;
  evaluatedBy?: string;
  evaluatedAt?: string;
}

export type HiringStage =
  | "Recommended"
  | "Interview Requested"
  | "Interview Scheduled"
  | "Offer"
  | "Hired"
  | "Rejected";

export interface HiringEvent {
  id: string;
  stage: HiringStage;
  date: string;
  detail: string;
  actor: string;
}

export interface HiringCandidate {
  id: string;
  developer: Developer;
  stage: HiringStage;
  role: string;
  company: string;
  lastActivity: string;
  sourceProject?: string;
  hiringFee?: number;
  timeline?: HiringEvent[];
}

/* ---------------------------------------------------------------------------
 * Admin-managed platform content
 * ------------------------------------------------------------------------- */

export type QuestionType =
  | "Multiple Choice"
  | "Coding"
  | "Debugging"
  | "Architecture / Scenario"
  | "Explanation / Reasoning";

export type ContentStatus = "Active" | "Draft" | "Disabled" | "Archived";

export interface AssessmentQuestion {
  id: string;
  assessmentId: string;
  order: number;
  type: QuestionType;
  prompt: string;
  /** Multiple choice only. */
  options?: string[];
  correctOptionIndex?: number;
  /** Coding / debugging only. */
  starterCode?: string;
  language?: string;
  expectedOutcome?: string;
  testCases?: string[];
  points: number;
  status: ContentStatus;
  /** Whether a submission to this question can trigger AI follow-up questions. */
  aiFollowUpEnabled: boolean;
}

export interface Assessment {
  id: string;
  name: string;
  careerPath: CareerTrack;
  description: string;
  /** Minutes. */
  duration: number;
  status: ContentStatus;
  questionCount: number;
  passScore: number;
  aiFollowUpEnabled: boolean;
  attempts?: number;
  passRate?: number;
  updatedAt?: string;
}

export type ChallengeLevel = "Level 1" | "Level 2" | "Master";

export interface Challenge {
  id: string;
  name: string;
  skill: string;
  level: ChallengeLevel;
  order: number;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  instructions: string;
  starterCode?: string;
  language?: string;
  testCases?: string[];
  status: ContentStatus;
  attempts?: number;
  passRate?: number;
}

export interface PlatformSkill {
  id: string;
  name: string;
  category: string;
  careerPaths: CareerTrack[];
  status: ContentStatus;
  assessmentIds: string[];
  challengeIds: string[];
  developerCount: number;
  description?: string;
}

export interface InternalProject {
  id: string;
  title: string;
  description: string;
  careerPath: CareerTrack;
  skills: string[];
  functionalRequirements: string[];
  technicalRequirements: string[];
  deliverables: string[];
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  estimatedWorkload: string;
  status: ContentStatus | "Open" | "In Progress";
  participants?: number;
}

export interface ActivityEvent {
  id: string;
  title: string;
  detail: string;
  time: string;
  date?: string;
  actor?: string;
}

/* ---------------------------------------------------------------------------
 * Assessment runtime (developer-facing)
 * ------------------------------------------------------------------------- */

export interface AIFollowUpQuestion {
  id: string;
  /** Question whose answer triggered this follow-up. */
  sourceQuestionId: number | string;
  sourceQuestionTitle: string;
  prompt: string;
  rationale: string;
  answered: boolean;
  answer?: string;
}
