"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Upload, ChevronLeft, ChevronRight, Check } from "lucide-react";
import { PageHeader, FormField } from "@/components/ui/common";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ProgressBar } from "@/components/ui/progress";
import { Card } from "@/components/developer/card";
import { ahmadAli } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const STEPS = [
  "Personal Info",
  "Education",
  "Preferred Position",
  "Skills",
  "Certificates",
  "Links",
  "CV",
  "Availability",
  "Review",
];

export default function OnboardingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const step = Math.min(9, Math.max(1, parseInt(searchParams.get("step") || "1", 10)));

  const goToStep = (s: number) => router.push(`/developer/onboarding?step=${s}`);

  return (
    <div className="max-w-3xl mx-auto min-w-0">
      <PageHeader
        title="Developer Onboarding"
        description="Complete your profile to unlock assessments, projects, and career opportunities."
      />

      <ProgressBar value={step} max={9} showLabel className="mb-6" />

      <div className="flex gap-1 overflow-x-auto pb-2 mb-6 scrollbar-thin">
        {STEPS.map((label, i) => {
          const n = i + 1;
          const done = n < step;
          const active = n === step;
          return (
            <button
              key={label}
              onClick={() => goToStep(n)}
              className={cn(
                "flex items-center gap-1.5 shrink-0 rounded-[6px] px-2.5 py-1.5 text-xs font-medium transition-colors",
                active && "bg-primary text-white",
                done && !active && "bg-teal/10 text-teal",
                !active && !done && "bg-surface text-muted"
              )}
            >
              {done ? <Check className="h-3 w-3" /> : <span>{n}</span>}
              <span className="hidden sm:inline truncate max-w-[100px]">{label}</span>
            </button>
          );
        })}
      </div>

      <Card>
        {step === 1 && (
          <div className="space-y-1">
            <h2 className="text-h3 text-foreground mb-4">Personal Info</h2>
            <div className="grid sm:grid-cols-2 gap-x-4">
              <FormField label="First Name" required>
                <Input defaultValue={ahmadAli.firstName} />
              </FormField>
              <FormField label="Last Name" required>
                <Input defaultValue={ahmadAli.lastName} />
              </FormField>
            </div>
            <FormField label="Email" required>
              <Input type="email" defaultValue={ahmadAli.email} />
            </FormField>
            <FormField label="Location" required>
              <Input defaultValue={ahmadAli.location} />
            </FormField>
            <FormField label="Bio">
              <Textarea defaultValue={ahmadAli.bio} rows={4} />
            </FormField>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-h3 text-foreground mb-4">Education</h2>
            <FormField label="Degree" required>
              <Input defaultValue="B.Sc. Computer Science" />
            </FormField>
            <FormField label="University" required>
              <Input defaultValue="University of Jordan" />
            </FormField>
            <FormField label="Graduation Year">
              <Input defaultValue="2022" />
            </FormField>
            <FormField label="Relevant Coursework">
              <Textarea defaultValue="Data Structures, Web Development, Database Systems, Software Engineering" rows={3} />
            </FormField>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-h3 text-foreground mb-4">Preferred Job Position</h2>
            <p className="text-body-sm text-muted mb-4">
              Tell us the role you are aiming for. The career path used for the initial assessment is chosen after your account is verified.
            </p>
            <FormField label="Preferred job position">
              <select className="flex h-11 w-full rounded-[6px] border border-border bg-card px-3 text-sm">
                <option>Full-Stack Developer</option>
                <option>Frontend Developer</option>
                <option>Backend Developer</option>
              </select>
            </FormField>
            <FormField label="Years of Experience">
              <Input defaultValue="3" />
            </FormField>
            <FormField label="Career Goals">
              <Textarea defaultValue="Build production-grade web applications and grow toward senior full-stack roles through verified platform performance." rows={3} />
            </FormField>
          </div>
        )}

        {step === 4 && (
          <div>
            <h2 className="text-h3 text-foreground mb-4">Skills</h2>
            <p className="text-body-sm text-muted mb-4">Select your primary skills. Verified levels come from assessments and challenges.</p>
            <div className="flex flex-wrap gap-2">
              {["React", "JavaScript", "TypeScript", "Node.js", "PostgreSQL", "REST APIs", "CSS", "Git"].map((s) => (
                <label key={s} className="inline-flex items-center gap-2 rounded-[6px] border border-border px-3 py-2 text-sm cursor-pointer hover:bg-surface">
                  <input type="checkbox" defaultChecked={ahmadAli.skills.some((sk) => sk.name === s)} className="rounded" />
                  {s}
                </label>
              ))}
            </div>
          </div>
        )}

        {step === 5 && (
          <div>
            <h2 className="text-h3 text-foreground mb-4">Certificates</h2>
            <div className="border-2 border-dashed border-border rounded-[10px] p-8 text-center">
              <Upload className="h-8 w-8 text-muted mx-auto mb-3" />
              <p className="text-body-sm text-foreground font-medium">Upload certificates</p>
              <p className="text-caption mt-1">PDF, PNG, or JPG up to 10MB</p>
              <Button variant="secondary" size="sm" className="mt-4">Choose Files</Button>
            </div>
            <div className="mt-4 p-3 rounded-[6px] bg-surface text-sm flex justify-between items-center gap-2 min-w-0">
              <span className="truncate">AWS Cloud Practitioner.pdf</span>
              <span className="text-caption shrink-0">2.1 MB</span>
            </div>
          </div>
        )}

        {step === 6 && (
          <div>
            <h2 className="text-h3 text-foreground mb-4">Links</h2>
            <FormField label="GitHub">
              <Input defaultValue={ahmadAli.github} />
            </FormField>
            <FormField label="LinkedIn">
              <Input defaultValue={ahmadAli.linkedin} />
            </FormField>
            <FormField label="Portfolio">
              <Input defaultValue={ahmadAli.portfolio} />
            </FormField>
          </div>
        )}

        {step === 7 && (
          <div>
            <h2 className="text-h3 text-foreground mb-4">CV</h2>
            <div className="border-2 border-dashed border-border rounded-[10px] p-8 text-center">
              <Upload className="h-8 w-8 text-muted mx-auto mb-3" />
              <p className="text-body-sm text-foreground font-medium">Upload your CV</p>
              <p className="text-caption mt-1">PDF only, max 5MB</p>
              <Button variant="secondary" size="sm" className="mt-4">Choose File</Button>
            </div>
            <div className="mt-4 p-3 rounded-[6px] bg-teal/10 text-sm flex justify-between items-center gap-2 min-w-0">
              <span className="truncate">Ahmad_Ali_CV.pdf</span>
              <span className="text-teal text-caption shrink-0">Uploaded</span>
            </div>
          </div>
        )}

        {step === 8 && (
          <div>
            <h2 className="text-h3 text-foreground mb-4">Availability</h2>
            <FormField label="Weekly Hours" required>
              <select className="flex h-11 w-full rounded-[6px] border border-border bg-card px-3 text-sm">
                <option>25 hrs/week</option>
                <option>20 hrs/week</option>
                <option>30 hrs/week</option>
                <option>40 hrs/week</option>
              </select>
            </FormField>
            <FormField label="Preferred Project Types">
              <div className="space-y-2">
                {["Paid Project", "Training Project", "Hiring Challenge"].map((t) => (
                  <label key={t} className="flex items-center gap-2 text-sm">
                    <input type="checkbox" defaultChecked className="rounded" />
                    {t}
                  </label>
                ))}
              </div>
            </FormField>
            <FormField label="Start Availability">
              <Input type="date" defaultValue="2026-08-20" />
            </FormField>
          </div>
        )}

        {step === 9 && (
          <div>
            <h2 className="text-h3 text-foreground mb-4">Review</h2>
            <div className="space-y-4 text-sm">
              {[
                ["Name", ahmadAli.name],
                ["Email", ahmadAli.email],
                ["Preferred role", "Full-Stack Developer"],
                ["Location", ahmadAli.location],
                ["Skills", ahmadAli.skills.map((s) => s.name).join(", ")],
                ["Availability", "25 hrs/week"],
              ].map(([k, v]) => (
                <div key={k} className="flex flex-col sm:flex-row sm:justify-between gap-1 py-2 border-b border-border last:border-0 min-w-0">
                  <span className="text-muted shrink-0">{k}</span>
                  <span className="text-foreground sm:text-right truncate">{v}</span>
                </div>
              ))}
            </div>
            <p className="text-caption mt-4">By submitting, you agree to WeConnect verification and platform terms.</p>
          </div>
        )}

        <div className="flex flex-col-reverse sm:flex-row justify-between gap-3 mt-8 pt-6 border-t border-border">
          <Button
            variant="secondary"
            onClick={() => goToStep(Math.max(1, step - 1))}
            disabled={step === 1}
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </Button>
          {step < 9 ? (
            <Button onClick={() => goToStep(step + 1)}>
              Continue
              <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button asChild>
              <Link href="/developer/verification?status=pending">Submit Profile</Link>
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}
