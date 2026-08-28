"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ahmadAli, customerSupportProject } from "@/lib/mock-data";

export function HeroProductPreview() {
  return (
    <div className="relative mx-auto max-w-4xl">
      <div className="absolute -inset-4 bg-gradient-to-b from-primary/5 to-teal/5 rounded-2xl blur-2xl" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="public-showcase-card relative"
      >
        <div className="flex items-center gap-2 border-b border-border bg-surface/80 px-4 py-2.5">
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
            <div className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
            <div className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
          </div>
          <div className="flex-1 mx-4">
            <div className="h-6 rounded-md bg-card border border-border flex items-center px-3">
              <span className="text-caption truncate">app.weconnect.io/talent/match</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 min-h-[320px]">
          <div className="lg:col-span-2 border-b lg:border-b-0 lg:border-r border-border bg-surface/40 p-4 space-y-3">
            <p className="text-table-header">Active Project</p>
            <div className="rounded-lg border border-border bg-card p-3">
              <Badge variant="primary" size="sm">
                {customerSupportProject.matchScore}% Match
              </Badge>
              <p className="text-label text-foreground mt-2 line-clamp-2">
                {customerSupportProject.title}
              </p>
              <p className="text-caption mt-1 truncate">
                {customerSupportProject.company.name}
              </p>
              <div className="mt-3 flex flex-wrap gap-1">
                {customerSupportProject.technologies.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] px-1.5 py-0.5 rounded bg-surface text-muted"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-table-header">Pipeline</p>
              {["Assessment", "Challenge", "Project", "Evaluation"].map((step, i) => (
                <div key={step} className="flex items-center gap-2">
                  <div
                    className={`h-5 w-5 rounded-full flex items-center justify-center text-[10px] font-semibold shrink-0 ${
                      i < 3 ? "bg-teal text-white" : "bg-border text-muted"
                    }`}
                  >
                    {i + 1}
                  </div>
                  <span
                    className={`text-body-sm truncate ${i < 3 ? "text-foreground font-medium" : "text-muted"}`}
                  >
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3 p-4">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="min-w-0">
                <p className="text-table-header">Top Match</p>
                <p className="text-h4 text-foreground truncate">{ahmadAli.name}</p>
                <p className="text-caption truncate">{ahmadAli.role}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-h3 text-teal">{ahmadAli.reliability}%</p>
                <p className="text-caption">Reliability</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-4">
              {[
                { label: "Score", value: `${ahmadAli.averageScore}%` },
                { label: "On-time", value: `${ahmadAli.onTimeCompletion}%` },
                { label: "Projects", value: ahmadAli.realProjectsCompleted },
              ].map((m) => (
                <div key={m.label} className="rounded-md bg-surface px-2 py-2 text-center min-w-0">
                  <p className="text-caption truncate">{m.label}</p>
                  <p className="text-sm font-semibold text-foreground truncate">{m.value}</p>
                </div>
              ))}
            </div>

            <div className="rounded-lg border border-border overflow-hidden">
              <div className="bg-navy px-3 py-2 flex items-center justify-between">
                <span className="text-caption text-white/70">Performance Timeline</span>
                <span className="text-[10px] text-teal font-medium">Verified</span>
              </div>
              <div className="p-3 space-y-2">
                {[
                  { event: "React Challenge — Master", score: 94 },
                  { event: "Customer Dashboard Project", score: 91 },
                  { event: "Company Evaluation", score: 96 },
                ].map((item) => (
                  <div key={item.event} className="flex items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-neutral-dark truncate">{item.event}</p>
                      <div className="mt-1 h-1.5 rounded-full bg-surface overflow-hidden">
                        <div
                          className="metric-progress-fill h-full rounded-full bg-primary"
                          style={{ width: `${item.score}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-xs font-medium text-foreground shrink-0">{item.score}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
