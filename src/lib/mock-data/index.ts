import type {
  Assessment,
  AssessmentQuestion,
  Challenge,
  Company,
  Developer,
  DeveloperEvaluation,
  HiringCandidate,
  InternalProject,
  Notification,
  PlatformSkill,
  Project,
  ProjectAssignment,
  ProjectSubmission,
  VerificationDocument,
} from "@/types";
import { DEFAULT_COMPANY_EVALUATION_RUBRIC, DEFAULT_PLATFORM_SETTINGS } from "@/lib/platform-config";

export const techFlowCompany: Company = {
  id: "company-1",
  name: "TechFlow Solutions",
  industry: "Software & Technology",
  location: "Amman, Jordan",
  website: "https://techflow.example.com",
  verified: true,
  verificationStatus: "Verified",
  size: "50-200",
  officialEmail: "hello@techflow.example.com",
  registrationNumber: "JO-452198",
  registrationCountry: "Jordan",
  foundedYear: "2016",
  about:
    "TechFlow Solutions builds enterprise software for customer support and operations teams across the MENA region.",
  contactPerson: {
    name: "Sarah Johnson",
    title: "Engineering Lead",
    email: "sarah.johnson@techflow.example.com",
    phone: "+962 7 9000 1200",
  },
  submittedAt: "2026-03-12",
};

const ahmadDocs: VerificationDocument[] = [
  { id: "doc-a1", name: "National ID", type: "Government ID", uploadedAt: "2026-03-02", status: "Accepted", fileName: "Ahmad_Ali_ID.pdf" },
  { id: "doc-a2", name: "Curriculum Vitae", type: "CV", uploadedAt: "2026-03-02", status: "Accepted", fileName: "Ahmad_Ali_CV.pdf" },
  { id: "doc-a3", name: "AWS Cloud Practitioner", type: "Certificate", uploadedAt: "2026-03-02", status: "Accepted", fileName: "AWS_Cloud_Practitioner.pdf" },
];

export const ahmadAli: Developer = {
  id: "dev-ahmad",
  firstName: "Ahmad",
  lastName: "Ali",
  name: "Ahmad Ali",
  email: "ahmad.ali@example.com",
  role: "Full-Stack Developer",
  careerPath: "Full-Stack Developer",
  preferredRole: "Full-Stack Developer",
  location: "Amman, Jordan",
  phone: "+962 7 9012 4450",
  overallLevel: 3,
  levelLabel: "Proficient",
  accountVerified: true,
  accountVerificationStatus: "Verified",
  accountVerifiedAt: "2026-03-08",
  weconnectVerified: true,
  weconnectVerifiedStatus: "Earned",
  weconnectVerifiedAt: "2026-07-20",
  skills: [
    { name: "React", level: "Master", verified: true, challengesCompleted: 12 },
    { name: "JavaScript", level: "Master", verified: true, challengesCompleted: 10 },
    { name: "Node.js", level: "Level 2", verified: true, challengesCompleted: 6 },
    { name: "PostgreSQL", level: "Level 2", verified: true, challengesCompleted: 4 },
    { name: "TypeScript", level: "Level 2", verified: true },
    { name: "REST APIs", level: "Level 2", verified: true },
  ],
  bio: "Full-stack developer focused on building reliable, user-centered web applications. Passionate about clean architecture and measurable delivery.",
  github: "https://github.com/ahmadali",
  linkedin: "https://linkedin.com/in/ahmadali",
  portfolio: "https://ahmadali.dev",
  cvUrl: "Ahmad_Ali_CV.pdf",
  education: [
    { id: "ed-a1", institution: "University of Jordan", degree: "B.Sc.", field: "Computer Science", startYear: "2018", endYear: "2022" },
  ],
  experience: [
    { id: "ex-a1", company: "Local SaaS Studio", title: "Full-Stack Developer", startDate: "2022-09", endDate: "Present", summary: "Built dashboard products with React, Node.js and PostgreSQL." },
  ],
  certificates: [
    { id: "cert-a1", name: "AWS Cloud Practitioner", issuer: "Amazon", issuedDate: "2025-11" },
  ],
  verificationDocuments: ahmadDocs,
  availability: "Available — 25 hrs/week",
  reliability: 96,
  averageScore: 91,
  requirementsAccuracy: 94,
  onTimeCompletion: 100,
  realProjectsCompleted: 4,
  internalProjectsCompleted: 5,
  challengesPassed: 12,
  companyEvaluations: 3,
  assessmentCompleted: true,
  matchScore: 94,
};

export const saraHassan: Developer = {
  id: "dev-sara",
  firstName: "Sara",
  lastName: "Hassan",
  name: "Sara Hassan",
  email: "sara.hassan@example.com",
  role: "Frontend Developer",
  careerPath: "Frontend Developer",
  preferredRole: "Frontend Developer",
  location: "Riyadh, Saudi Arabia",
  overallLevel: 3,
  levelLabel: "Proficient",
  accountVerified: true,
  accountVerificationStatus: "Verified",
  weconnectVerified: true,
  weconnectVerifiedStatus: "Earned",
  skills: [
    { name: "React", level: "Master", verified: true },
    { name: "TypeScript", level: "Level 2", verified: true },
    { name: "CSS", level: "Master", verified: true },
  ],
  github: "https://github.com/sarahassan",
  linkedin: "https://linkedin.com/in/sarahassan",
  portfolio: "https://sarahassan.dev",
  availability: "Available — 30 hrs/week",
  reliability: 94,
  averageScore: 89,
  requirementsAccuracy: 92,
  onTimeCompletion: 98,
  realProjectsCompleted: 3,
  internalProjectsCompleted: 4,
  challengesPassed: 10,
  companyEvaluations: 2,
  assessmentCompleted: true,
  matchScore: 91,
};

export const omarKhalid: Developer = {
  id: "dev-omar",
  firstName: "Omar",
  lastName: "Khalid",
  name: "Omar Khalid",
  email: "omar.khalid@example.com",
  role: "Full-Stack Developer",
  careerPath: "Full-Stack Developer",
  preferredRole: "Full-Stack Developer",
  location: "Dubai, UAE",
  overallLevel: 2,
  levelLabel: "Developing",
  accountVerified: true,
  accountVerificationStatus: "Verified",
  weconnectVerified: false,
  weconnectVerifiedStatus: "In Progress",
  skills: [
    { name: "React", level: "Level 2", verified: true },
    { name: "Node.js", level: "Level 2", verified: true },
    { name: "PostgreSQL", level: "Level 2", verified: true },
  ],
  github: "https://github.com/omarkhalid",
  availability: "Available — 20 hrs/week",
  reliability: 91,
  averageScore: 86,
  requirementsAccuracy: 88,
  onTimeCompletion: 95,
  realProjectsCompleted: 2,
  internalProjectsCompleted: 3,
  challengesPassed: 8,
  companyEvaluations: 1,
  assessmentCompleted: true,
  matchScore: 88,
};

export const linaFaraj: Developer = {
  id: "dev-lina",
  firstName: "Lina",
  lastName: "Faraj",
  name: "Lina Faraj",
  email: "lina.faraj@example.com",
  role: "Backend Developer",
  careerPath: "Backend Developer",
  preferredRole: "Backend Developer",
  location: "Cairo, Egypt",
  overallLevel: 3,
  levelLabel: "Proficient",
  accountVerified: true,
  accountVerificationStatus: "Verified",
  weconnectVerified: true,
  weconnectVerifiedStatus: "Earned",
  skills: [
    { name: "Node.js", level: "Master", verified: true },
    { name: "PostgreSQL", level: "Level 2", verified: true },
    { name: "REST APIs", level: "Master", verified: true },
  ],
  github: "https://github.com/linafaraj",
  availability: "Available — 28 hrs/week",
  reliability: 93,
  averageScore: 88,
  requirementsAccuracy: 90,
  onTimeCompletion: 97,
  realProjectsCompleted: 3,
  internalProjectsCompleted: 4,
  challengesPassed: 9,
  companyEvaluations: 2,
  assessmentCompleted: true,
  matchScore: 85,
};

export const youssefHaddad: Developer = {
  id: "dev-new-1",
  firstName: "Youssef",
  lastName: "Haddad",
  name: "Youssef Haddad",
  email: "youssef.haddad@example.com",
  role: "Frontend Developer",
  careerPath: null,
  preferredRole: "Frontend Developer",
  location: "Beirut, Lebanon",
  phone: "+961 3 445 120",
  overallLevel: 1,
  levelLabel: "Foundation",
  accountVerified: false,
  accountVerificationStatus: "Pending Verification",
  weconnectVerified: false,
  weconnectVerifiedStatus: "Not Started",
  skills: [
    { name: "React", level: "Locked", verified: false },
    { name: "CSS", level: "Locked", verified: false },
  ],
  bio: "Frontend-focused developer applying for account verification before choosing a career path and taking the initial assessment.",
  github: "https://github.com/yhaddad",
  linkedin: "https://linkedin.com/in/youssefhaddad",
  portfolio: "https://youssefhaddad.dev",
  cvUrl: "Youssef_Haddad_CV.pdf",
  education: [
    { id: "ed-y1", institution: "American University of Beirut", degree: "B.Sc.", field: "Computer Science", startYear: "2019", endYear: "2023" },
  ],
  experience: [
    { id: "ex-y1", company: "Studio North", title: "Junior Frontend Developer", startDate: "2023-07", endDate: "Present", summary: "Implemented marketing sites and internal dashboards in React." },
  ],
  certificates: [
    { id: "cert-y1", name: "Meta Front-End Developer", issuer: "Coursera", issuedDate: "2025-06" },
  ],
  verificationDocuments: [
    { id: "doc-y1", name: "Lebanese ID", type: "Government ID", uploadedAt: "2026-08-18", status: "Pending Review", fileName: "Youssef_Haddad_ID.pdf" },
    { id: "doc-y2", name: "Curriculum Vitae", type: "CV", uploadedAt: "2026-08-18", status: "Pending Review", fileName: "Youssef_Haddad_CV.pdf" },
    { id: "doc-y3", name: "Meta Certificate", type: "Certificate", uploadedAt: "2026-08-18", status: "Pending Review", fileName: "Meta_Frontend.pdf" },
  ],
  availability: "Available — 20 hrs/week",
  reliability: 0,
  averageScore: 0,
  requirementsAccuracy: 0,
  onTimeCompletion: 0,
  realProjectsCompleted: 0,
  internalProjectsCompleted: 0,
  challengesPassed: 0,
  companyEvaluations: 0,
  assessmentCompleted: false,
};

export const nadiaSaleh: Developer = {
  id: "dev-new-2",
  firstName: "Nadia",
  lastName: "Saleh",
  name: "Nadia Saleh",
  email: "nadia.saleh@example.com",
  role: "Backend Developer",
  careerPath: null,
  preferredRole: "Backend Developer",
  location: "Amman, Jordan",
  overallLevel: 1,
  levelLabel: "Foundation",
  accountVerified: false,
  accountVerificationStatus: "More Information Required",
  adminNotes: "Please upload a clearer government ID and an updated CV covering 2025–2026.",
  weconnectVerified: false,
  weconnectVerifiedStatus: "Not Started",
  skills: [{ name: "Node.js", level: "Locked", verified: false }],
  github: "https://github.com/nadiasaleh",
  linkedin: "https://linkedin.com/in/nadiasaleh",
  cvUrl: "Nadia_Saleh_CV.pdf",
  education: [
    { id: "ed-n1", institution: "Princess Sumaya University", degree: "B.Sc.", field: "Software Engineering", startYear: "2017", endYear: "2021" },
  ],
  experience: [
    { id: "ex-n1", company: "PayGrid", title: "Backend Engineer", startDate: "2021-10", endDate: "Present", summary: "API and data pipeline work in Node.js and PostgreSQL." },
  ],
  verificationDocuments: [
    { id: "doc-n1", name: "National ID (blurred)", type: "Government ID", uploadedAt: "2026-08-15", status: "Rejected", fileName: "Nadia_ID.jpg" },
    { id: "doc-n2", name: "Curriculum Vitae", type: "CV", uploadedAt: "2026-08-15", status: "Pending Review", fileName: "Nadia_Saleh_CV.pdf" },
  ],
  availability: "Available",
  reliability: 0,
  averageScore: 0,
  requirementsAccuracy: 0,
  onTimeCompletion: 0,
  realProjectsCompleted: 0,
  internalProjectsCompleted: 0,
  challengesPassed: 0,
  companyEvaluations: 0,
  assessmentCompleted: false,
};

export const karimNasser: Developer = {
  id: "dev-new-3",
  firstName: "Karim",
  lastName: "Nasser",
  name: "Karim Nasser",
  email: "karim.nasser@example.com",
  role: "Full-Stack Developer",
  careerPath: null,
  preferredRole: "Full-Stack Developer",
  location: "Cairo, Egypt",
  overallLevel: 1,
  levelLabel: "Foundation",
  accountVerified: false,
  accountVerificationStatus: "Pending Verification",
  weconnectVerified: false,
  weconnectVerifiedStatus: "Not Started",
  skills: [],
  github: "https://github.com/karimnasser",
  linkedin: "https://linkedin.com/in/karimnasser",
  portfolio: "https://karimnasser.dev",
  cvUrl: "Karim_Nasser_CV.pdf",
  education: [
    { id: "ed-k1", institution: "Cairo University", degree: "B.Sc.", field: "Information Systems", startYear: "2018", endYear: "2022" },
  ],
  experience: [
    { id: "ex-k1", company: "Nile Apps", title: "Full-Stack Intern", startDate: "2022-06", endDate: "2023-01", summary: "Supported React and Express feature work on internal tools." },
  ],
  certificates: [
    { id: "cert-k1", name: "JavaScript Algorithms", issuer: "freeCodeCamp", issuedDate: "2024-02" },
  ],
  verificationDocuments: [
    { id: "doc-k1", name: "National ID", type: "Government ID", uploadedAt: "2026-08-19", status: "Pending Review", fileName: "Karim_Nasser_ID.pdf" },
    { id: "doc-k2", name: "Curriculum Vitae", type: "CV", uploadedAt: "2026-08-19", status: "Pending Review", fileName: "Karim_Nasser_CV.pdf" },
    { id: "doc-k3", name: "freeCodeCamp Certificate", type: "Certificate", uploadedAt: "2026-08-19", status: "Pending Review", fileName: "FCC_JS.pdf" },
    { id: "doc-k4", name: "Portfolio screenshots", type: "Portfolio Evidence", uploadedAt: "2026-08-19", status: "Pending Review", fileName: "Portfolio_Evidence.zip" },
  ],
  availability: "Available — 25 hrs/week",
  reliability: 0,
  averageScore: 0,
  requirementsAccuracy: 0,
  onTimeCompletion: 0,
  realProjectsCompleted: 0,
  internalProjectsCompleted: 0,
  challengesPassed: 0,
  companyEvaluations: 0,
  assessmentCompleted: false,
};

export const topMatches = [ahmadAli, saraHassan, omarKhalid, linaFaraj];

function makeAssignment(
  projectId: string,
  developer: Developer,
  rest: Partial<ProjectAssignment> & Pick<ProjectAssignment, "invitationStatus">
): ProjectAssignment {
  return {
    id: `${projectId}-${developer.id}`,
    projectId,
    developerId: developer.id,
    developer,
    matchScore: developer.matchScore ?? 0,
    invitedAt: "2026-08-12",
    progress: 0,
    submissionStatus: "Not Submitted",
    evaluationStatus: "Not Started",
    completionStatus: "Pending",
    ...rest,
  };
}

const csmAssignments: ProjectAssignment[] = [
  makeAssignment("proj-csm-dashboard", ahmadAli, {
    invitationStatus: "Accepted",
    respondedAt: "2026-08-13",
    workStatus: "In Progress",
    progress: 78,
    lastUpdate: "2 hours ago",
    submissionStatus: "Not Submitted",
  }),
  makeAssignment("proj-csm-dashboard", saraHassan, {
    invitationStatus: "Accepted",
    respondedAt: "2026-08-13",
    workStatus: "Submitted",
    progress: 100,
    lastUpdate: "5 hours ago",
    submissionStatus: "Submitted",
    submittedAt: "2026-08-19",
    evaluationStatus: "Under Review",
  }),
  makeAssignment("proj-csm-dashboard", omarKhalid, {
    invitationStatus: "Declined",
    respondedAt: "2026-08-13",
    progress: 0,
    lastUpdate: "Aug 13",
  }),
  makeAssignment("proj-csm-dashboard", linaFaraj, {
    invitationStatus: "Accepted",
    respondedAt: "2026-08-14",
    workStatus: "In Progress",
    progress: 71,
    lastUpdate: "3 hours ago",
    submissionStatus: "Not Submitted",
  }),
];

const fleetAssignments: ProjectAssignment[] = [
  makeAssignment("proj-inv-1", ahmadAli, {
    invitationStatus: "Invited",
    matchScore: 94,
    progress: 0,
  }),
  makeAssignment("proj-inv-1", saraHassan, {
    invitationStatus: "Accepted",
    matchScore: 91,
    respondedAt: "2026-08-22",
    workStatus: "Submitted",
    progress: 100,
    lastUpdate: "45 minutes ago",
    submissionStatus: "Submitted",
    submittedAt: "2026-09-05",
    evaluationStatus: "Under Review",
  }),
  makeAssignment("proj-inv-1", omarKhalid, {
    invitationStatus: "Accepted",
    matchScore: 88,
    respondedAt: "2026-08-22",
    workStatus: "In Progress",
    progress: 68,
    lastUpdate: "2 hours ago",
    submissionStatus: "Not Submitted",
  }),
  makeAssignment("proj-inv-1", linaFaraj, {
    invitationStatus: "Accepted",
    matchScore: 85,
    respondedAt: "2026-08-23",
    workStatus: "Under Review",
    progress: 100,
    lastUpdate: "Yesterday",
    submissionStatus: "Under Review",
    submittedAt: "2026-09-04",
    evaluationStatus: "Pending",
  }),
];

export const customerSupportProject: Project = {
  id: "proj-csm-dashboard",
  title: "Customer Support Management Dashboard",
  type: "Paid Project",
  company: techFlowCompany,
  role: "Full-Stack Developer",
  technologies: ["React", "Node.js", "PostgreSQL", "REST APIs", "Authentication", "Responsive Dashboard"],
  skills: ["React", "Node.js", "PostgreSQL", "REST APIs"],
  duration: "3 Weeks",
  deadline: "2026-09-15",
  state: "In Progress",
  matchScore: 94,
  description:
    "Build a customer support management dashboard that enables support teams to track tickets, assign agents, monitor SLA performance, and generate operational reports.",
  requirements: [
    "Authentication & role-based access",
    "Support ticket dashboard",
    "REST API with PostgreSQL",
    "Database integration",
    "Responsive design",
    "Agent assignment workflow",
    "Reporting module",
  ],
  functionalRequirements: [
    "Support agents can create, assign and resolve tickets",
    "Managers can monitor SLA performance",
    "Role-based views for agent, lead and admin",
    "Operational reporting for volume and response time",
  ],
  technicalRequirements: [
    "React dashboard with authenticated sessions",
    "Node.js REST API backed by PostgreSQL",
    "Responsive layout for desktop and tablet",
  ],
  deliverables: ["Deployed preview", "Technical summary", "Demo recording", "Source repository after purchase"],
  difficulty: "Intermediate",
  workload: "20–25 hours per week",
  budget: 5800,
  paymentStatus: "Pending",
  createdAt: "2026-08-10",
  lastActivity: "2 hours ago",
  assignments: csmAssignments,
  evaluator: {
    name: "Sarah Johnson",
    title: "Engineering Lead",
    email: "sarah.johnson@techflow.example.com",
  },
  reviewStages: [
    { id: "rs-1", label: "Kickoff", status: "Completed", date: "2026-08-14" },
    { id: "rs-2", label: "Week 1 Review", status: "Completed", date: "2026-08-21" },
    { id: "rs-3", label: "Week 2 Review", status: "Upcoming", date: "2026-08-28" },
    { id: "rs-4", label: "Final Evaluation", status: "Pending" },
  ],
};

export const fleetMaintenanceProject: Project = {
  id: "proj-inv-1",
  title: "Fleet Maintenance Dashboard",
  type: "Paid Project",
  company: techFlowCompany,
  role: "Full-Stack Developer",
  technologies: ["React", "Node.js", "PostgreSQL"],
  skills: ["React", "Node.js", "PostgreSQL"],
  duration: "3 Weeks",
  deadline: "2026-09-22",
  state: "Under Review",
  matchScore: 94,
  description: "A maintenance operations dashboard for vehicle fleets, covering work orders, technician assignment and service history.",
  requirements: ["Work order board", "Technician assignment", "Service history", "Authentication"],
  functionalRequirements: ["Dispatchers can create and assign work orders", "Technicians update job status in the field"],
  technicalRequirements: ["React client", "Node.js API", "PostgreSQL persistence"],
  deliverables: ["Preview deployment", "Technical summary"],
  difficulty: "Intermediate",
  workload: "20–25 hours per week",
  budget: 5800,
  paymentStatus: "Pending",
  createdAt: "2026-08-20",
  lastActivity: "4 hours ago",
  assignments: fleetAssignments,
  evaluator: {
    name: "Khalid Nasser",
    title: "Operations Evaluator",
    email: "khalid@techflow.example.com",
  },
  reviewStages: [
    { id: "rs-f1", label: "Kickoff", status: "Completed", date: "2026-08-24" },
    { id: "rs-f2", label: "Week 1 Review", status: "Completed", date: "2026-08-31" },
    { id: "rs-f3", label: "Week 2 Review", status: "Upcoming", date: "2026-09-08" },
    { id: "rs-f4", label: "Final Evaluation", status: "Pending" },
  ],
};

export const inventoryProject: Project = {
  id: "proj-active-1",
  title: "Inventory Tracking Portal",
  type: "Training Project",
  company: techFlowCompany,
  role: "Full-Stack Developer",
  technologies: ["React", "Node.js", "MongoDB"],
  duration: "2 Weeks",
  deadline: "2026-08-28",
  state: "In Progress",
  description: "Internal inventory tracking portal for warehouse operations.",
  requirements: ["CRUD operations", "Search & filters", "Export reports"],
  workload: "15 hrs/week",
  createdAt: "2026-08-08",
  lastActivity: "Yesterday",
  assignments: [
    makeAssignment("proj-active-1", ahmadAli, {
      invitationStatus: "Accepted",
      workStatus: "In Progress",
      progress: 55,
      lastUpdate: "Yesterday",
    }),
  ],
  evaluator: { name: "Sarah Johnson", title: "Engineering Lead", email: "sarah.johnson@techflow.example.com" },
  reviewStages: [
    { id: "inv-k", label: "Kickoff", status: "Completed", date: "2026-08-09" },
    { id: "inv-w1", label: "Week 1 Review", status: "Upcoming" },
    { id: "inv-fe", label: "Final Evaluation", status: "Pending" },
  ],
};

export const onboardingProject: Project = {
  id: "proj-submitted-1",
  title: "Employee Onboarding App",
  type: "Hiring Challenge",
  company: techFlowCompany,
  role: "Frontend Developer",
  technologies: ["React", "TypeScript", "CSS"],
  duration: "2 Weeks",
  deadline: "2026-08-01",
  state: "Under Review",
  description: "Multi-step onboarding experience for new hires.",
  requirements: ["Multi-step form", "Document upload", "Progress tracking"],
  workload: "18 hrs/week",
  createdAt: "2026-07-18",
  lastActivity: "3 days ago",
  assignments: [
    makeAssignment("proj-submitted-1", ahmadAli, {
      invitationStatus: "Accepted",
      workStatus: "Submitted",
      progress: 100,
      submittedAt: "2026-08-01",
      submissionStatus: "Submitted",
      evaluationStatus: "Under Review",
    }),
  ],
};

export const completedPaidProject: Project = {
  id: "proj-completed-1",
  title: "Customer Management Dashboard",
  type: "Paid Project",
  company: techFlowCompany,
  role: "Full-Stack Developer",
  technologies: ["React", "Node.js", "PostgreSQL"],
  duration: "3 weeks",
  deadline: "2026-06-15",
  state: "Purchased",
  description: "Customer relationship management dashboard with analytics.",
  requirements: ["Authentication", "Dashboard", "REST API", "Database Integration", "Responsive Design"],
  workload: "22 hrs/week",
  budget: 4200,
  paymentStatus: "Paid",
  createdAt: "2026-05-20",
  lastActivity: "Aug 1",
  purchasedAssignmentId: "proj-completed-1-dev-ahmad",
  assignments: [
    makeAssignment("proj-completed-1", ahmadAli, {
      invitationStatus: "Accepted",
      workStatus: "Completed",
      progress: 100,
      submittedAt: "2026-06-12",
      submissionStatus: "Evaluated",
      evaluationStatus: "Completed",
      completionStatus: "Completed",
      purchased: true,
    }),
  ],
};

export const hrAnalyticsProject: Project = {
  id: "proj-2",
  title: "HR Analytics Dashboard",
  type: "Training Project",
  company: techFlowCompany,
  role: "Frontend Developer",
  technologies: ["React", "TypeScript", "Recharts"],
  duration: "2 Weeks",
  deadline: "2026-09-01",
  state: "Matching",
  description: "Analytics dashboard for HR metrics.",
  requirements: ["Charts", "Filters", "Export"],
  workload: "15 hrs/week",
  createdAt: "2026-08-16",
  lastActivity: "1 day ago",
  assignments: [
    makeAssignment("proj-2", saraHassan, { invitationStatus: "Matched", matchScore: 96, invitedAt: undefined }),
    makeAssignment("proj-2", ahmadAli, { invitationStatus: "Matched", matchScore: 91, invitedAt: undefined }),
    makeAssignment("proj-2", linaFaraj, { invitationStatus: "Matched", matchScore: 88, invitedAt: undefined }),
    makeAssignment("proj-2", omarKhalid, { invitationStatus: "Matched", matchScore: 85, invitedAt: undefined }),
  ],
};

export const notCompletedProject: Project = {
  id: "proj-not-completed-1",
  title: "Legacy API Migration",
  type: "Training Project",
  company: techFlowCompany,
  role: "Backend Developer",
  technologies: ["Node.js", "PostgreSQL"],
  duration: "2 Weeks",
  deadline: "2026-07-15",
  state: "Completed",
  description: "Migrate legacy REST endpoints to a new service architecture.",
  requirements: ["Endpoint mapping", "Data validation", "Integration tests"],
  workload: "15 hrs/week",
  createdAt: "2026-07-01",
  lastActivity: "Jul 16",
  assignments: [
    makeAssignment("proj-not-completed-1", ahmadAli, {
      invitationStatus: "Accepted",
      workStatus: "Not Completed",
      progress: 40,
      completionStatus: "Not Completed",
      evaluationStatus: "Completed",
    }),
  ],
};

export const developerProjects: Project[] = [fleetMaintenanceProject, inventoryProject, onboardingProject, completedPaidProject];

export const companyProjects: Project[] = [customerSupportProject, hrAnalyticsProject, fleetMaintenanceProject];

export const allDeveloperProjects: Project[] = [
  fleetMaintenanceProject,
  inventoryProject,
  onboardingProject,
  completedPaidProject,
  customerSupportProject,
  notCompletedProject,
];

export const adminProjectsList: Project[] = [
  customerSupportProject,
  fleetMaintenanceProject,
  hrAnalyticsProject,
  inventoryProject,
  onboardingProject,
  completedPaidProject,
  notCompletedProject,
];

export const developerNotifications: Notification[] = [
  {
    id: "n1",
    title: "New project invitation",
    message: "TechFlow Solutions invited you to Fleet Maintenance Dashboard — 94% match.",
    time: "2 hours ago",
    read: false,
    type: "project",
    href: "/developer/projects/invitations/proj-inv-1",
  },
  {
    id: "n2",
    title: "Challenge passed",
    message: "You passed React Challenge Level 2 with a score of 88%.",
    time: "Yesterday",
    read: false,
    type: "challenge",
    href: "/developer/challenges/react",
  },
  {
    id: "n3",
    title: "Company feedback received",
    message: "TechFlow Solutions submitted evaluation for Customer Management Dashboard.",
    time: "3 days ago",
    read: true,
    type: "evaluation",
  },
  {
    id: "n4",
    title: "Interview request",
    message: "TechFlow Solutions requested an interview for Full-Stack Developer role.",
    time: "5 days ago",
    read: true,
    type: "interview",
    href: "/developer/career",
  },
];

export const hiringPipeline: HiringCandidate[] = [
  {
    id: "h1",
    developer: ahmadAli,
    stage: "Interview Scheduled",
    role: "Full-Stack Developer",
    company: "TechFlow Solutions",
    lastActivity: "Interview scheduled for Aug 25",
    sourceProject: "Customer Support Management Dashboard",
    hiringFee: 3500,
    timeline: [
      { id: "he1", stage: "Recommended", date: "2026-08-10", detail: "Recommended after project match", actor: "WeConnect" },
      { id: "he2", stage: "Interview Requested", date: "2026-08-16", detail: "Company requested a technical interview", actor: "Sarah Johnson" },
      { id: "he3", stage: "Interview Scheduled", date: "2026-08-18", detail: "Interview booked for Aug 25, 14:00 GST", actor: "Ahmad Ali" },
    ],
  },
  {
    id: "h2",
    developer: saraHassan,
    stage: "Offer",
    role: "Frontend Developer",
    company: "TechFlow Solutions",
    lastActivity: "Offer sent Aug 18",
    sourceProject: "HR Analytics Dashboard",
    hiringFee: 2800,
    timeline: [
      { id: "hs1", stage: "Recommended", date: "2026-08-02", detail: "Recommended from hiring challenge", actor: "WeConnect" },
      { id: "hs2", stage: "Interview Requested", date: "2026-08-05", detail: "Interview requested", actor: "Maya Khoury" },
      { id: "hs3", stage: "Interview Scheduled", date: "2026-08-08", detail: "Interview completed", actor: "Maya Khoury" },
      { id: "hs4", stage: "Offer", date: "2026-08-18", detail: "Offer sent — $72,000/yr", actor: "Maya Khoury" },
    ],
  },
  {
    id: "h3",
    developer: omarKhalid,
    stage: "Interview Requested",
    role: "Full-Stack Developer",
    company: "TechFlow Solutions",
    lastActivity: "Request sent Aug 20",
    hiringFee: 3500,
    timeline: [
      { id: "ho1", stage: "Recommended", date: "2026-08-18", detail: "Added from talent search", actor: "WeConnect" },
      { id: "ho2", stage: "Interview Requested", date: "2026-08-20", detail: "Pending developer response", actor: "Sarah Johnson" },
    ],
  },
  {
    id: "h4",
    developer: linaFaraj,
    stage: "Recommended",
    role: "Backend Developer",
    company: "TechFlow Solutions",
    lastActivity: "Added from project comparison",
    hiringFee: 3000,
    timeline: [
      { id: "hl1", stage: "Recommended", date: "2026-08-21", detail: "Recommended from CSM dashboard matches", actor: "WeConnect" },
    ],
  },
];

export const internalProjects: InternalProject[] = [
  {
    id: "int-1",
    title: "WeConnect Skill Assessment Engine",
    description: "Internal scoring service used to grade mixed-format assessments.",
    careerPath: "Full-Stack Developer",
    skills: ["React", "Node.js", "PostgreSQL"],
    functionalRequirements: ["Score mixed question types", "Persist attempt history"],
    technicalRequirements: ["Node.js service", "PostgreSQL", "React admin review"],
    deliverables: ["Scoring API", "Review UI"],
    difficulty: "Advanced",
    duration: "3 weeks",
    estimatedWorkload: "20 hrs/week",
    status: "Open",
    participants: 12,
  },
  {
    id: "int-2",
    title: "Developer Portfolio Generator",
    description: "Generates a verified public portfolio from completed WeConnect work.",
    careerPath: "Frontend Developer",
    skills: ["Next.js", "TypeScript"],
    functionalRequirements: ["Select completed projects", "Publish a public profile page"],
    technicalRequirements: ["Next.js app", "Typed data models"],
    deliverables: ["Generator UI", "Published profile template"],
    difficulty: "Intermediate",
    duration: "2 weeks",
    estimatedWorkload: "15 hrs/week",
    status: "Open",
    participants: 8,
  },
  {
    id: "int-3",
    title: "Challenge Grading Service",
    description: "Runs challenge test cases and records pass/fail results.",
    careerPath: "Backend Developer",
    skills: ["Node.js", "Docker"],
    functionalRequirements: ["Queue challenge runs", "Return structured test results"],
    technicalRequirements: ["Node.js worker", "Isolated runner"],
    deliverables: ["Grading worker", "Result payload"],
    difficulty: "Advanced",
    duration: "4 weeks",
    estimatedWorkload: "22 hrs/week",
    status: "In Progress",
    participants: 4,
  },
];

export const skillChallenges = [
  { name: "React", level: "Master", completed: 12, total: 12, next: "Architecture Challenge" },
  { name: "JavaScript", level: "Master", completed: 10, total: 10, next: "Complete" },
  { name: "Node.js", level: "Level 2", completed: 6, total: 8, next: "API Design Challenge" },
  { name: "PostgreSQL", level: "Level 2", completed: 4, total: 8, next: "Query Optimization" },
  { name: "CSS", level: "Level 2", completed: 5, total: 8, next: "Layout Systems" },
  { name: "Git", level: "Level 2", completed: 3, total: 6, next: "Branching Workflows" },
];

export const adminMetrics = {
  totalDevelopers: 2847,
  accountVerifiedDevelopers: 1923,
  weconnectVerifiedDevelopers: 412,
  totalCompanies: 186,
  pendingCompanyVerification: 14,
  pendingDeveloperVerification: 47,
  activeProjects: 128,
  projectsAwaitingEvaluation: 23,
  completedProjects: 891,
  successfulHires: 156,
  /** Total value of purchased Paid Projects — not WeConnect income. */
  grossProjectVolume: 284500,
  /** Actual commission earned by WeConnect on purchased paid projects. */
  projectCommissionRevenue: 71125,
  hiringFeeRevenue: 98400,
  subscriptionRevenue: 142800,
  completionRate: 87,
  hiringConversion: 34,
};

export const matchReasons: Record<string, string[]> = {
  "dev-ahmad": [
    "React — Master",
    "3 similar projects completed",
    "96% reliability score",
    "Strong API assessment scores",
    "Available during requested timeline",
  ],
  "dev-sara": [
    "React — Master",
    "2 similar dashboard projects",
    "94% reliability score",
    "Strong frontend assessment scores",
  ],
  "dev-omar": [
    "Full-stack experience match",
    "PostgreSQL — Level 2",
    "91% reliability score",
    "Available 20 hrs/week",
  ],
  "dev-lina": [
    "Node.js — Master",
    "Strong backend project history",
    "93% reliability score",
    "REST APIs — Master",
  ],
};

export const assessmentQuestions = [
  { id: 1, type: "coding", title: "Implement useFetch Hook", answered: true, flagged: false },
  { id: 2, type: "multiple-choice", title: "React Reconciliation", answered: true, flagged: false },
  { id: 3, type: "debugging", title: "Fix Memory Leak", answered: true, flagged: true },
  { id: 4, type: "coding", title: "REST API Endpoint", answered: false, flagged: false },
  { id: 5, type: "architecture", title: "Dashboard Data Flow", answered: false, flagged: false },
  { id: 6, type: "explanation", title: "State Management Trade-offs", answered: false, flagged: false },
];

export const assessmentFollowUps = [
  {
    id: "fu-1",
    sourceQuestionId: 4,
    sourceQuestionTitle: "REST API Endpoint",
    prompt: "You filtered tickets in the request handler rather than in the query. Explain why you made that choice and how it behaves with large result sets.",
    rationale: "The submitted implementation returns all rows then filters in memory. The follow-up checks whether the developer understands the performance trade-off.",
    answered: false,
  },
  {
    id: "fu-2",
    sourceQuestionId: 1,
    sourceQuestionTitle: "Implement useFetch Hook",
    prompt: "Explain why the effect depends on `url` and what would happen if `options` were added to the dependency array without memoization.",
    rationale: "The hook recreates the effect when identity of options changes. This tests understanding of effect dependencies.",
    answered: false,
  },
];

export const companyTeamMembers = [
  { id: "tm-1", name: "Sarah Johnson", email: "sarah.johnson@techflow.example.com", role: "Evaluator", lastActive: "2 hours ago" },
  { id: "tm-2", name: "Sarah Al-Masri", email: "sarah@techflow.example.com", role: "Admin", lastActive: "2 hours ago" },
  { id: "tm-3", name: "Khalid Nasser", email: "khalid@techflow.example.com", role: "Evaluator", lastActive: "Yesterday" },
  { id: "tm-4", name: "Maya Khoury", email: "maya@techflow.example.com", role: "Recruiter", lastActive: "3 days ago" },
];

export const companyNotifications = [
  { id: "cn1", title: "Submission received", message: "Sara Hassan submitted Customer Support Dashboard.", time: "1 hour ago", read: false, type: "submission" },
  { id: "cn2", title: "Interview confirmed", message: "Ahmad Ali confirmed interview for Aug 25.", time: "5 hours ago", read: false, type: "interview" },
  { id: "cn3", title: "Evaluation pending", message: "Sara Hassan is awaiting evaluation on Customer Support project.", time: "Yesterday", read: true, type: "evaluation" },
  { id: "cn4", title: "Payment processed", message: "Invoice #INV-2847 paid successfully.", time: "2 days ago", read: true, type: "payment" },
];

export const companyPayments = [
  { id: "pay-1", invoice: "INV-2847", project: "Customer Management Dashboard", amount: 4200, status: "Paid", date: "2026-08-01", type: "Project Purchase" },
  { id: "pay-2", invoice: "INV-2901", project: "Customer Support Management Dashboard", amount: 5800, status: "Pending", date: "2026-09-15", type: "Project Purchase" },
  { id: "pay-3", invoice: "INV-2756", project: "Inventory Tracking Portal", amount: 0, status: "Not Applicable", date: "2026-07-12", type: "Training Project" },
];

export const companyInterviews = [
  { id: "int-1", developer: ahmadAli, role: "Full-Stack Developer", date: "2026-08-25", time: "2:00 PM GST", status: "Scheduled", type: "Video" },
  { id: "int-2", developer: omarKhalid, role: "Full-Stack Developer", date: "2026-08-28", time: "11:00 AM GST", status: "Requested", type: "Video" },
];

export const companyOffers = [
  { id: "off-1", developer: saraHassan, role: "Frontend Developer", salary: "$72,000/yr", status: "Sent", sentDate: "2026-08-18", expires: "2026-08-25" },
  { id: "off-2", developer: ahmadAli, role: "Full-Stack Developer", salary: "$85,000/yr", status: "Draft", sentDate: "—", expires: "—" },
];

export const companyEvaluations = [
  { id: "ev-1", developer: saraHassan, project: "Customer Support Management Dashboard", status: "Pending" as const, dueDate: "2026-09-01" },
  { id: "ev-3", developer: saraHassan, project: "Fleet Maintenance Dashboard", status: "Pending" as const, dueDate: "2026-09-09" },
  { id: "ev-2", developer: ahmadAli, project: "Customer Management Dashboard", status: "Completed" as const, score: 92, dueDate: "2026-06-20" },
];

export const projectSubmissions: ProjectSubmission[] = [
  {
    id: "sub-sara-csm",
    assignmentId: "proj-csm-dashboard-dev-sara",
    developerId: "dev-sara",
    submittedAt: "2026-08-19",
    summary: "Complete ticket dashboard with agent assignment, SLA widgets and a reporting page.",
    demoUrl: "https://demo.weconnect.example/sara-csm",
    previewUrl: "https://preview.weconnect.example/sara-csm",
    screenshots: ["Ticket board", "SLA overview", "Agent assignment"],
    technicalSummary: "React + TypeScript UI with a mock REST layer. Focused on dashboard density and keyboard-accessible ticket actions.",
    requirementsMet: 6,
    requirementsTotal: 7,
    repositoryUrl: "github.com/sarahassan/support-ui",
    repositoryUnlocked: false,
  },
  {
    id: "sub-sara-fleet",
    assignmentId: "proj-inv-1-dev-sara",
    developerId: "dev-sara",
    submittedAt: "2026-09-05",
    summary: "Complete fleet operations dashboard with vehicle health indicators, prioritized work orders, technician assignment, and searchable maintenance history.",
    demoUrl: "https://demo.weconnect.example/sara-fleet",
    previewUrl: "https://preview.weconnect.example/sara-fleet",
    screenshots: ["Fleet overview", "Work order board", "Service history"],
    technicalSummary: "React and TypeScript interface backed by a simulated Node.js API and PostgreSQL data model. Includes responsive dispatcher and technician views.",
    requirementsMet: 4,
    requirementsTotal: 4,
    repositoryUrl: "github.com/sarahassan/fleet-maintenance-dashboard",
    repositoryUnlocked: false,
  },
  {
    id: "sub-lina-fleet",
    assignmentId: "proj-inv-1-dev-lina",
    developerId: "dev-lina",
    submittedAt: "2026-09-04",
    summary: "Fleet maintenance workspace focused on mobile technician updates, service scheduling, and vehicle-level maintenance timelines.",
    demoUrl: "https://demo.weconnect.example/lina-fleet",
    previewUrl: "https://preview.weconnect.example/lina-fleet",
    screenshots: ["Technician queue", "Vehicle timeline", "Service calendar"],
    technicalSummary: "Responsive React dashboard with role-based prototype states, REST endpoint contracts, and a normalized PostgreSQL service-history schema.",
    requirementsMet: 3,
    requirementsTotal: 4,
    repositoryUrl: "github.com/linafaraj/fleet-operations-ui",
    repositoryUnlocked: false,
  },
];

export const developerProgress = csmAssignments
  .filter((a) => a.invitationStatus === "Accepted")
  .map((a) => ({
    developer: a.developer,
    assignment: a,
    progress: a.progress,
    milestone:
      a.developerId === "dev-ahmad"
        ? "Reporting module in progress"
        : a.developerId === "dev-sara"
          ? "Dashboard submitted — awaiting evaluation"
          : "Database schema finalized",
    lastUpdate: a.lastUpdate ?? "—",
  }));

export const projectAnalysis = {
  complexity: "Moderate",
  estimatedHours: "60–75",
  skillMatch: 91,
  riskLevel: "Low",
  recommendations: [
    "Split authentication and dashboard into parallel workstreams",
    "Prioritize SLA reporting — highest business impact requirement",
    "Schedule mid-project checkpoint at week 2",
  ],
  requirementBreakdown: [
    { requirement: "Authentication & role-based access", difficulty: "Medium", hours: 12 },
    { requirement: "Support ticket dashboard", difficulty: "Medium", hours: 16 },
    { requirement: "REST API with PostgreSQL", difficulty: "High", hours: 20 },
    { requirement: "Agent assignment workflow", difficulty: "Medium", hours: 10 },
    { requirement: "Reporting module", difficulty: "High", hours: 14 },
  ],
};

/** @deprecated old weighted UI/UX rubric — use DEFAULT_COMPANY_EVALUATION_RUBRIC */
export const evaluationRubric = DEFAULT_COMPANY_EVALUATION_RUBRIC.map((c) => ({
  criterion: c.label,
  weight: c.weight,
  description: c.description,
}));

export const developerEvaluations: DeveloperEvaluation[] = [
  {
    id: "deval-sara-csm",
    assignmentId: "proj-csm-dashboard-dev-sara",
    developerId: "dev-sara",
    projectId: "proj-csm-dashboard",
    scores: [],
    completionDecision: "Pending",
    status: "Under Review",
  },
  {
    id: "deval-ahmad-cmd",
    assignmentId: "proj-completed-1-dev-ahmad",
    developerId: "dev-ahmad",
    projectId: "proj-completed-1",
    scores: DEFAULT_COMPANY_EVALUATION_RUBRIC.map((c) => ({ key: c.key, score: 4, comment: "" })),
    overallFeedback: "Strong delivery. Requirements were met and communication stayed consistent.",
    completionDecision: "Completed",
    status: "Completed",
    evaluatedBy: "Sarah Johnson",
    evaluatedAt: "2026-06-18",
  },
];

export const projectActivityTimeline = [
  { id: "pa1", title: "Project Created", detail: "TechFlow submitted Customer Support Management Dashboard.", time: "Aug 10", date: "2026-08-10" },
  { id: "pa2", title: "AI Analysis Completed", detail: "Structured requirements and complexity estimate generated.", time: "Aug 10", date: "2026-08-10" },
  { id: "pa3", title: "Top 4 Matches Generated", detail: "Ahmad, Sara, Omar and Lina selected.", time: "Aug 11", date: "2026-08-11" },
  { id: "pa4", title: "Invitations Sent", detail: "Company invited matched developers to the project.", time: "Aug 12", date: "2026-08-12" },
  { id: "pa5", title: "Ahmad Accepted", detail: "Ahmad Ali accepted and started work.", time: "Aug 13", date: "2026-08-13" },
  { id: "pa6", title: "Omar Declined", detail: "Omar Khalid declined. No reliability penalty applied.", time: "Aug 13", date: "2026-08-13" },
  { id: "pa7", title: "Sara Accepted", detail: "Sara Hassan accepted the invitation.", time: "Aug 13", date: "2026-08-13" },
  { id: "pa8", title: "Lina Accepted", detail: "Lina Faraj accepted the invitation.", time: "Aug 14", date: "2026-08-14" },
  { id: "pa9", title: "Kickoff Completed", detail: "Sarah Johnson completed kickoff with accepted developers.", time: "Aug 14", date: "2026-08-14" },
  { id: "pa10", title: "Sara Submitted", detail: "Sara Hassan submitted a completed preview and technical summary.", time: "Aug 19", date: "2026-08-19" },
  { id: "pa11", title: "Company Reviewed Submission", detail: "Sara's preview is under review. Repository remains locked until purchase.", time: "2 hours ago", date: "2026-08-27" },
];

export const adminDeveloperQueue = [
  { id: "vq-1", developer: karimNasser, submitted: "2026-08-19", documents: 4, adminNotes: "" },
  { id: "vq-2", developer: youssefHaddad, submitted: "2026-08-18", documents: 3, adminNotes: "" },
  { id: "vq-3", developer: nadiaSaleh, submitted: "2026-08-15", documents: 2, adminNotes: nadiaSaleh.adminNotes ?? "" },
];

export const adminCompanyQueue = [
  {
    id: "cvq-1",
    company: {
      id: "comp-new-1",
      name: "NovaTech Labs",
      industry: "FinTech",
      location: "Dubai, UAE",
      website: "https://novatech.example.com",
      verified: false,
      verificationStatus: "Pending Verification" as const,
      size: "10-50",
      officialEmail: "hr@novatech.example.com",
      registrationNumber: "AE-99821",
      registrationCountry: "United Arab Emirates",
      foundedYear: "2021",
      about: "Payments infrastructure for regional fintechs.",
      contactPerson: { name: "Hana Al Farsi", title: "People Operations Lead", email: "hana@novatech.example.com", phone: "+971 4 555 0190" },
      verificationDocuments: [
        { id: "cd1", name: "Trade license", type: "Other" as const, uploadedAt: "2026-08-20", status: "Pending Review" as const, fileName: "NovaTech_License.pdf" },
        { id: "cd2", name: "Company profile", type: "Other" as const, uploadedAt: "2026-08-20", status: "Pending Review" as const, fileName: "NovaTech_Profile.pdf" },
      ],
      submittedAt: "2026-08-20",
    } satisfies Company,
    submitted: "2026-08-20",
    contact: "hr@novatech.example.com",
  },
  {
    id: "cvq-2",
    company: {
      id: "comp-new-2",
      name: "GreenPath Health",
      industry: "Healthcare",
      location: "Riyadh, Saudi Arabia",
      website: "https://greenpath.example.com",
      verified: false,
      verificationStatus: "Pending Verification" as const,
      size: "50-200",
      officialEmail: "ops@greenpath.example.com",
      registrationNumber: "SA-44120",
      registrationCountry: "Saudi Arabia",
      foundedYear: "2018",
      about: "Digital health operations platform.",
      contactPerson: { name: "Faisal Rahman", title: "CTO Office", email: "faisal@greenpath.example.com" },
      verificationDocuments: [
        { id: "cd3", name: "Commercial registration", type: "Other" as const, uploadedAt: "2026-08-17", status: "Pending Review" as const, fileName: "GreenPath_CR.pdf" },
      ],
      submittedAt: "2026-08-17",
    } satisfies Company,
    submitted: "2026-08-17",
    contact: "ops@greenpath.example.com",
  },
];

export const adminDevelopersList = [ahmadAli, saraHassan, omarKhalid, linaFaraj, youssefHaddad, nadiaSaleh, karimNasser];

export const adminCompaniesList: Company[] = [
  techFlowCompany,
  adminCompanyQueue[0].company,
  adminCompanyQueue[1].company,
  {
    id: "comp-3",
    name: "DataStream Inc",
    industry: "Analytics",
    location: "Cairo, Egypt",
    website: "https://datastream.example.com",
    verified: true,
    verificationStatus: "Verified",
    size: "200-500",
    officialEmail: "partnerships@datastream.example.com",
    contactPerson: { name: "Nour Adel", title: "Talent Lead", email: "nour@datastream.example.com" },
  },
];

export const adminAssessments: Assessment[] = [
  {
    id: "as-1",
    name: "Frontend Developer Assessment",
    careerPath: "Frontend Developer",
    description: "Initial assessment covering React, JavaScript, CSS and UI architecture.",
    duration: 90,
    status: "Active",
    questionCount: 24,
    passScore: 70,
    aiFollowUpEnabled: true,
    passRate: 72,
    updatedAt: "2026-08-12",
  },
  {
    id: "as-2",
    name: "Backend Developer Assessment",
    careerPath: "Backend Developer",
    description: "Initial assessment covering APIs, databases, debugging and service design.",
    duration: 90,
    status: "Active",
    questionCount: 18,
    passScore: 70,
    aiFollowUpEnabled: true,
    passRate: 65,
    updatedAt: "2026-08-10",
  },
  {
    id: "as-3",
    name: "Full-Stack Developer Assessment",
    careerPath: "Full-Stack Developer",
    description: "Initial assessment covering React, Node.js, REST APIs, PostgreSQL and architecture.",
    duration: 90,
    status: "Active",
    questionCount: 22,
    passScore: 70,
    aiFollowUpEnabled: true,
    passRate: 68,
    updatedAt: "2026-08-08",
  },
];

export const adminQuestions: AssessmentQuestion[] = [
  {
    id: "q-1",
    assessmentId: "as-3",
    order: 1,
    type: "Coding",
    prompt: "Implement a useFetch hook that loads JSON from a URL and exposes data, error and loading states.",
    starterCode: "export function useFetch(url) {\n  // TODO\n}",
    language: "JavaScript",
    expectedOutcome: "Hook returns { data, error, loading } and refetches when url changes.",
    testCases: ["Loads data on mount", "Sets error on failure", "Refetches when url changes"],
    points: 15,
    status: "Active",
    aiFollowUpEnabled: true,
  },
  {
    id: "q-2",
    assessmentId: "as-3",
    order: 2,
    type: "Multiple Choice",
    prompt: "What does React reconciliation compare when deciding whether to update a host component?",
    options: ["Component class identity only", "Element type and key", "Function source text", "Fiber index only"],
    correctOptionIndex: 1,
    points: 5,
    status: "Active",
    aiFollowUpEnabled: false,
  },
  {
    id: "q-3",
    assessmentId: "as-3",
    order: 3,
    type: "Debugging",
    prompt: "This effect subscribes to a socket but never cleans up. Fix the memory leak.",
    starterCode: "useEffect(() => {\n  socket.on('ticket', handler);\n}, []);",
    language: "JavaScript",
    expectedOutcome: "Effect returns an unsubscribe/cleanup function.",
    testCases: ["Unsubscribes on unmount", "Does not register duplicate listeners"],
    points: 10,
    status: "Active",
    aiFollowUpEnabled: true,
  },
  {
    id: "q-4",
    assessmentId: "as-3",
    order: 4,
    type: "Coding",
    prompt: "Implement GET /api/tickets with status filter and pagination.",
    starterCode: "export async function getTickets(req, res) {\n  // TODO\n}",
    language: "JavaScript",
    expectedOutcome: "Returns { data, total, page, limit } from PostgreSQL.",
    testCases: ["Filters by status", "Paginates results", "Handles invalid page"],
    points: 20,
    status: "Active",
    aiFollowUpEnabled: true,
  },
  {
    id: "q-5",
    assessmentId: "as-3",
    order: 5,
    type: "Architecture / Scenario",
    prompt: "A support dashboard must stay usable while ticket volume spikes. Outline the data flow from API to UI.",
    points: 15,
    status: "Active",
    aiFollowUpEnabled: false,
  },
  {
    id: "q-6",
    assessmentId: "as-3",
    order: 6,
    type: "Explanation / Reasoning",
    prompt: "When would you keep ticket filters in the database query instead of filtering in the client?",
    points: 10,
    status: "Active",
    aiFollowUpEnabled: false,
  },
];

export const adminChallenges: Challenge[] = [
  { id: "ch-r1", name: "JSX & Components", skill: "React", level: "Level 1", order: 1, description: "Build components from a design spec.", difficulty: "Beginner", instructions: "Create presentational components without extra state.", status: "Active", starterCode: "export function Card() {\n  return null;\n}", language: "JavaScript", testCases: ["Renders title", "Accepts children"] },
  { id: "ch-r2", name: "State & Effects", skill: "React", level: "Level 1", order: 2, description: "Manage local state and a data-loading effect.", difficulty: "Beginner", instructions: "Fetch a list and render loading/empty/error states.", status: "Active" },
  { id: "ch-r3", name: "Lists & Keys", skill: "React", level: "Level 1", order: 3, description: "Render dynamic ticket rows with stable keys.", difficulty: "Beginner", instructions: "Avoid index keys when items can be reordered.", status: "Active" },
  { id: "ch-r4", name: "Hooks Deep Dive", skill: "React", level: "Level 2", order: 4, description: "Extract a reusable data hook.", difficulty: "Intermediate", instructions: "Share fetching logic without duplicating effects.", status: "Active" },
  { id: "ch-r5", name: "Performance Patterns", skill: "React", level: "Level 2", order: 5, description: "Memoize expensive dashboard widgets.", difficulty: "Intermediate", instructions: "Use memoization only where profiling justifies it.", status: "Active" },
  { id: "ch-r6", name: "Form State", skill: "React", level: "Level 2", order: 6, description: "Build a validated ticket form.", difficulty: "Intermediate", instructions: "Handle field-level and submit-level errors.", status: "Active" },
  { id: "ch-r7", name: "Advanced React Challenge", skill: "React", level: "Master", order: 7, description: "Compose a multi-view dashboard with shared state.", difficulty: "Advanced", instructions: "Keep state predictable as views switch.", status: "Active" },
  { id: "ch-r8", name: "Architecture Challenge", skill: "React", level: "Master", order: 8, description: "Propose and implement a folder/module structure.", difficulty: "Advanced", instructions: "Separate UI, data and domain logic.", status: "Active" },
  { id: "ch-n1", name: "HTTP Basics", skill: "Node.js", level: "Level 1", order: 1, description: "Create a JSON GET endpoint.", difficulty: "Beginner", instructions: "Return 200 with a typed payload.", status: "Active" },
  { id: "ch-n2", name: "Routing", skill: "Node.js", level: "Level 1", order: 2, description: "Add parameterized ticket routes.", difficulty: "Beginner", instructions: "Handle missing resources with 404.", status: "Active" },
  { id: "ch-n3", name: "API Design Challenge", skill: "Node.js", level: "Level 2", order: 3, description: "Design pagination and filtering for tickets.", difficulty: "Intermediate", instructions: "Keep query params consistent.", status: "Active" },
];

export const adminChallengePaths = [
  { id: "ch-1", skill: "React", levels: ["Level 1", "Level 2", "Master"], enrolled: 842, completion: 68 },
  { id: "ch-2", skill: "JavaScript", levels: ["Level 1", "Level 2", "Master"], enrolled: 1204, completion: 74 },
  { id: "ch-3", skill: "Node.js", levels: ["Level 1", "Level 2"], enrolled: 567, completion: 61 },
];

export const adminSkills: PlatformSkill[] = [
  { id: "sk-1", name: "React", category: "Frontend", careerPaths: ["Frontend Developer", "Full-Stack Developer"], status: "Active", assessmentIds: ["as-1", "as-3"], challengeIds: ["ch-r1", "ch-r2", "ch-r3", "ch-r4", "ch-r5", "ch-r6", "ch-r7", "ch-r8"], developerCount: 1240, description: "Component-driven UI for web applications." },
  { id: "sk-2", name: "Node.js", category: "Backend", careerPaths: ["Backend Developer", "Full-Stack Developer"], status: "Active", assessmentIds: ["as-2", "as-3"], challengeIds: ["ch-n1", "ch-n2", "ch-n3"], developerCount: 890, description: "Server-side JavaScript for APIs and workers." },
  { id: "sk-3", name: "PostgreSQL", category: "Database", careerPaths: ["Backend Developer", "Full-Stack Developer"], status: "Active", assessmentIds: ["as-2", "as-3"], challengeIds: [], developerCount: 654, description: "Relational data modeling and querying." },
  { id: "sk-4", name: "TypeScript", category: "Language", careerPaths: ["Frontend Developer", "Backend Developer", "Full-Stack Developer"], status: "Active", assessmentIds: ["as-1"], challengeIds: [], developerCount: 1102, description: "Typed JavaScript used across client and server." },
];

export const adminReliabilityHistory = [
  { id: "rh-1", developer: ahmadAli, event: "Project completed on time", impact: "+2", date: "2026-08-01", score: 96 },
  { id: "rh-2", developer: omarKhalid, event: "Late submission — 2 days", impact: "-3", date: "2026-07-15", score: 91 },
  { id: "rh-3", developer: saraHassan, event: "Perfect requirements match", impact: "+1", date: "2026-07-28", score: 94 },
  { id: "rh-4", developer: omarKhalid, event: "Declined Fleet Maintenance invitation", impact: "0", date: "2026-08-13", score: 91 },
];

export const adminDisputes = [
  { id: "dp-1", type: "Payment", parties: "TechFlow vs Ahmad Ali", status: "Open", opened: "2026-08-10", priority: "High", companyId: "company-1", project: "Customer Management Dashboard" },
  { id: "dp-2", type: "Evaluation", parties: "NovaTech vs Platform", status: "Under Review", opened: "2026-08-05", priority: "Medium", companyId: "comp-new-1", project: "—" },
];

export const adminSubscriptions = [
  { id: "sub-plan-1", company: "TechFlow Solutions", plan: "Enterprise", mrr: 2400, status: "Active", renews: "2026-09-01" },
  { id: "sub-plan-2", company: "DataStream Inc", plan: "Growth", mrr: 890, status: "Active", renews: "2026-08-28" },
  { id: "sub-plan-3", company: "NovaTech Labs", plan: "Starter", mrr: 299, status: "Trial", renews: "2026-08-25" },
];

export const adminPaymentsList = [
  {
    id: "ap-1",
    project: "Customer Management Dashboard",
    company: "TechFlow Solutions",
    developer: "Ahmad Ali",
    type: "Project Commission",
    grossAmount: 4200,
    commissionPercentage: DEFAULT_PLATFORM_SETTINGS.projectCommissionPercentage,
    weconnectRevenue: 1050,
    developerPayout: 3150,
    amount: 1050,
    status: "Paid",
    date: "2026-08-01",
  },
  {
    id: "ap-2",
    project: "—",
    company: "DataStream Inc",
    developer: "—",
    type: "Subscription",
    grossAmount: 890,
    commissionPercentage: 0,
    weconnectRevenue: 890,
    developerPayout: 0,
    amount: 890,
    status: "Paid",
    date: "2026-08-01",
  },
  {
    id: "ap-3",
    project: "Full-Stack Developer search",
    company: "GreenPath Health",
    developer: "—",
    type: "Hiring Fee",
    grossAmount: 3500,
    commissionPercentage: 0,
    weconnectRevenue: 3500,
    developerPayout: 0,
    amount: 3500,
    status: "Pending",
    date: "2026-08-15",
  },
  {
    id: "ap-4",
    project: "Customer Support Management Dashboard",
    company: "TechFlow Solutions",
    developer: "Pending selection",
    type: "Project Commission",
    grossAmount: 5800,
    commissionPercentage: DEFAULT_PLATFORM_SETTINGS.projectCommissionPercentage,
    weconnectRevenue: 1450,
    developerPayout: 4350,
    amount: 1450,
    status: "Pending",
    date: "2026-09-15",
  },
];

export const reportChartData = {
  developerGrowth: [
    { month: "Mar", developers: 1820, verified: 298 },
    { month: "Apr", developers: 2010, verified: 324 },
    { month: "May", developers: 2240, verified: 356 },
    { month: "Jun", developers: 2480, verified: 378 },
    { month: "Jul", developers: 2670, verified: 395 },
    { month: "Aug", developers: 2847, verified: 412 },
  ],
  projectVolume: [
    { month: "Mar", active: 72, completed: 98 },
    { month: "Apr", active: 85, completed: 112 },
    { month: "May", active: 96, completed: 128 },
    { month: "Jun", active: 108, completed: 145 },
    { month: "Jul", active: 118, completed: 162 },
    { month: "Aug", active: 128, completed: 178 },
  ],
  revenue: [
    { month: "Mar", commission: 10500, recruitment: 12000, subscriptions: 98000 },
    { month: "Apr", commission: 12000, recruitment: 14500, subscriptions: 105000 },
    { month: "May", commission: 13000, recruitment: 16200, subscriptions: 112000 },
    { month: "Jun", commission: 14500, recruitment: 17800, subscriptions: 118000 },
    { month: "Jul", commission: 16000, recruitment: 19200, subscriptions: 128000 },
    { month: "Aug", commission: 18000, recruitment: 21000, subscriptions: 142800 },
  ],
};

export const companyDashboardChart = {
  hiringFunnel: [
    { stage: "Recommended", count: 12 },
    { stage: "Interview", count: 8 },
    { stage: "Offer", count: 4 },
    { stage: "Hired", count: 2 },
  ],
  spendByMonth: [
    { month: "May", amount: 4200 },
    { month: "Jun", amount: 5800 },
    { month: "Jul", amount: 2400 },
    { month: "Aug", amount: 5800 },
  ],
};

export const allDevelopers = [ahmadAli, saraHassan, omarKhalid, linaFaraj];

export const selfDeclaredSkills = [
  { name: "Docker", level: "Level 1" as const, verified: false },
  { name: "AWS", level: "Level 1" as const, verified: false },
  { name: "GraphQL", level: "Level 2" as const, verified: false },
];

export const assessmentResults = {
  overallLevel: 2 as const,
  levelLabel: "Developing" as const,
  score: 78,
  passedAt: "2026-08-10",
  skillBreakdown: [
    { skill: "React", score: 85, level: "Level 2" },
    { skill: "JavaScript", score: 82, level: "Level 2" },
    { skill: "Node.js", score: 71, level: "Level 2" },
    { skill: "REST APIs", score: 74, level: "Level 2" },
    { skill: "PostgreSQL", score: 68, level: "Level 1" },
    { skill: "Architecture", score: 72, level: "Level 2" },
  ],
};

export const developerInterview = {
  id: "int-1",
  company: techFlowCompany,
  role: "Full-Stack Developer",
  type: "Technical Interview",
  date: "2026-08-25",
  time: "14:00",
  timezone: "Asia/Amman",
  duration: "45 minutes",
  format: "Video call",
  interviewer: "Sarah Johnson, Engineering Lead",
  status: "Scheduled",
  notes: "Prepare to discuss your Customer Management Dashboard project and approach to REST API design.",
  meetingLink: "https://meet.example.com/techflow-ahmad",
};

export const developerOffer = {
  id: "offer-1",
  company: techFlowCompany,
  role: "Full-Stack Developer",
  type: "Full-time",
  salary: "JOD 1,800 / month",
  startDate: "2026-10-01",
  location: "Amman, Jordan (Hybrid)",
  benefits: ["Health insurance", "Learning budget", "Flexible hours"],
  expiresAt: "2026-09-05",
  status: "Pending",
  message:
    "We were impressed by your verified project performance and assessment scores. We'd like to extend an offer to join our product engineering team.",
};

export const projectMilestones = [
  { id: "m1", title: "Authentication & RBAC", dueDate: "2026-08-25", status: "Completed", progress: 100 },
  { id: "m2", title: "Ticket Dashboard UI", dueDate: "2026-09-01", status: "In Progress", progress: 65 },
  { id: "m3", title: "REST API & PostgreSQL", dueDate: "2026-09-08", status: "Pending", progress: 0 },
  { id: "m4", title: "Reporting Module", dueDate: "2026-09-15", status: "Pending", progress: 0 },
];

export const developerProjectSubmissions = [
  { id: "s1", title: "Milestone 1 — Auth Module", date: "2026-08-22", status: "Approved", score: 92 },
  { id: "s2", title: "Ticket Dashboard — Draft", date: "2026-08-24", status: "Under Review", score: null },
];

export const projectFeedback = [
  { id: "f1", from: "Sarah Johnson", date: "2026-08-23", message: "Auth implementation is solid. Consider adding session timeout handling in the next iteration.", rating: 4 },
];

export const projectActivity = [
  { id: "a1", action: "Submission uploaded", detail: "Ticket Dashboard — Draft", time: "2 hours ago" },
  { id: "a2", action: "Milestone completed", detail: "Authentication & RBAC", time: "3 days ago" },
  { id: "a3", action: "Feedback received", detail: "From Sarah Johnson", time: "4 days ago" },
  { id: "a4", action: "Project started", detail: "Customer Support Management Dashboard", time: "1 week ago" },
];

export function getVerifiedCriteria(developer: Developer) {
  const s = DEFAULT_PLATFORM_SETTINGS;
  return [
    { label: "Account verified", met: developer.accountVerified },
    { label: "Initial assessment completed", met: Boolean(developer.assessmentCompleted) },
    {
      label: `${s.weconnectVerifiedMinInternalProjects} successful internal projects`,
      met: developer.internalProjectsCompleted >= s.weconnectVerifiedMinInternalProjects,
      current: developer.internalProjectsCompleted,
      required: s.weconnectVerifiedMinInternalProjects,
    },
    {
      label: `${s.weconnectVerifiedMinReliability}%+ reliability`,
      met: developer.reliability >= s.weconnectVerifiedMinReliability,
    },
    {
      label: `Average project performance ${s.weconnectVerifiedMinAverageScore}%+`,
      met: developer.averageScore >= s.weconnectVerifiedMinAverageScore,
    },
    { label: "Verified skills on the chosen career path", met: developer.skills.some((sk) => sk.verified) },
    {
      label: `${s.weconnectVerifiedMinCompanyEvaluations}+ company evaluations`,
      met: developer.companyEvaluations >= s.weconnectVerifiedMinCompanyEvaluations,
    },
    { label: "Platform integrity in good standing", met: developer.accountVerificationStatus !== "Suspended" },
  ];
}

export const verifiedCriteria = getVerifiedCriteria(ahmadAli);

export const reactChallengePath = [
  { id: 1, title: "JSX & Components", level: "Level 1", completed: true },
  { id: 2, title: "State & Effects", level: "Level 1", completed: true },
  { id: 3, title: "Hooks Deep Dive", level: "Level 2", completed: true },
  { id: 4, title: "Performance Patterns", level: "Level 2", completed: true },
  { id: 5, title: "Architecture Challenge", level: "Master", completed: false, current: true },
];

export const companyDisputes = [
  { id: "cdp-1", project: "Customer Management Dashboard", type: "Payment", status: "Open", opened: "2026-08-10" },
];
