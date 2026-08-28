"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const tabs = [
  { label: "Overview", href: (id: string) => `/company/projects/${id}` },
  { label: "Matches", href: (id: string) => `/company/projects/${id}/matches` },
  { label: "Analysis", href: (id: string) => `/company/projects/${id}/analysis` },
  { label: "Progress", href: (id: string) => `/company/projects/${id}/progress` },
  { label: "Submissions", href: (id: string) => `/company/projects/${id}/submissions` },
  { label: "Compare", href: (id: string) => `/company/projects/${id}/compare` },
  { label: "Evaluation", href: (id: string) => `/company/projects/${id}/evaluation` },
  { label: "Decision", href: (id: string) => `/company/projects/${id}/decision` },
];

export function ProjectTabs({ projectId, projectTitle }: { projectId: string; projectTitle: string }) {
  const pathname = usePathname();

  return (
    <div className="mb-6 min-w-0">
      <p className="text-caption mb-1">Project</p>
      <h1 className="text-h2 text-foreground truncate mb-4">{projectTitle}</h1>
      <nav className="flex gap-1 border-b border-border overflow-x-auto">
        {tabs.map((tab) => {
          const href = tab.href(projectId);
          const isActive = pathname === href;
          return (
            <Link
              key={tab.label}
              href={href}
              className={cn(
                "whitespace-nowrap px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors",
                isActive
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted hover:text-foreground"
              )}
            >
              {tab.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
