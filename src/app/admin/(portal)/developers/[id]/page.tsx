"use client";

import { notFound } from "next/navigation";
import { use } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PageHeader } from "@/components/ui/common";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { StatusBadge, LevelBadge, SkillBadge } from "@/components/ui/status-badges";
import { VerifiedBadge } from "@/components/ui/verified-badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PerformanceMetric } from "@/components/ui/progress";
import { ActivityFeed } from "@/components/shared/timeline";
import {
  adminDevelopersList,
  adminProjectsList,
  adminReliabilityHistory,
  assessmentResults,
  developerEvaluations,
  hiringPipeline,
  skillChallenges,
} from "@/lib/mock-data";
import { getAssignmentForDeveloper } from "@/lib/assignments";

export default function AdminDeveloperDetailPage({ params }: PageProps<"/admin/developers/[id]">) {
  const { id } = use(params);
  const developer = adminDevelopersList.find((d) => d.id === id);
  if (!developer) notFound();

  const projects = adminProjectsList.filter((p) => getAssignmentForDeveloper(p, developer.id));
  const reliability = adminReliabilityHistory.filter((r) => r.developer.id === developer.id);
  const hiring = hiringPipeline.filter((h) => h.developer.id === developer.id);
  const evals = developerEvaluations.filter((e) => e.developerId === developer.id);

  return (
    <>
      <Link href="/admin/developers" className="inline-flex items-center gap-1 text-body-sm text-muted mb-4">
        <ArrowLeft className="h-4 w-4" /> Back to developers
      </Link>
      <PageHeader
        title={developer.name}
        description={developer.email}
        action={<StatusBadge status={developer.accountVerificationStatus} />}
      />

      <Tabs defaultValue="profile">
        <TabsList className="flex-wrap">
          {["profile", "verification", "assessments", "challenges", "projects", "evaluations", "reliability", "hiring", "activity"].map((t) => (
            <TabsTrigger key={t} value={t} className="capitalize">{t === "hiring" ? "Hiring History" : t}</TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="profile">
          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardContent className="pt-6">
                {developer.accountVerified && <LevelBadge level={developer.overallLevel} className="mb-4" />}
                <div className="flex flex-wrap gap-2 mb-4">
                  {developer.accountVerified && <VerifiedBadge type="account" />}
                  {developer.weconnectVerified && <VerifiedBadge type="weconnect" />}
                </div>
                <p className="text-caption mb-2">Account Verified and WeConnect Verified are separate statuses.</p>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {developer.skills.map((s) => (
                    <SkillBadge key={s.name} name={s.name} level={s.level} verified={s.verified} />
                  ))}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                  <PerformanceMetric label="Reliability" value={`${developer.reliability}%`} />
                  <PerformanceMetric label="Projects" value={developer.realProjectsCompleted} />
                  <PerformanceMetric label="Challenges" value={developer.challengesPassed} />
                  <PerformanceMetric label="Evaluations" value={developer.companyEvaluations} />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <Avatar name={developer.name} size="xl" className="mx-auto" />
                <p className="text-label mt-4">{developer.preferredRole ?? developer.role}</p>
                <p className="text-caption">Career path: {developer.careerPath ?? "Not chosen yet"}</p>
                <p className="text-caption">{developer.location}</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="verification">
          <Card>
            <CardContent className="pt-6 space-y-3">
              <p>Account verification: <StatusBadge status={developer.accountVerificationStatus} /></p>
              <p>WeConnect Verified: {developer.weconnectVerified ? "Earned" : developer.weconnectVerifiedStatus}</p>
              <ul className="space-y-2 text-body-sm">
                {(developer.verificationDocuments ?? []).map((d) => (
                  <li key={d.id} className="flex justify-between"><span>{d.name}</span><StatusBadge status={d.status} /></li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assessments">
          <Card>
            <CardContent className="pt-6">
              {developer.assessmentCompleted ? (
                <>
                  <p className="text-label">Initial assessment completed</p>
                  <p className="text-body-sm">Score {assessmentResults.score}% · Level {assessmentResults.overallLevel}</p>
                </>
              ) : (
                <p className="text-body-sm text-muted">Assessment is available only after account verification and career path selection.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="challenges">
          <Card>
            <CardContent className="pt-6 space-y-3">
              {skillChallenges.map((s) => (
                <div key={s.name} className="flex justify-between text-body-sm">
                  <span>{s.name} · {s.level}</span>
                  <span>{s.completed}/{s.total}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects">
          <div className="space-y-3">
            {projects.map((p) => {
              const a = getAssignmentForDeveloper(p, developer.id);
              return (
                <Card key={p.id}>
                  <CardContent className="pt-6 flex justify-between">
                    <div>
                      <p className="text-label">{p.title}</p>
                      <p className="text-caption">{p.company.name} · {p.type}</p>
                    </div>
                    {a && <StatusBadge status={a.workStatus ?? a.invitationStatus} />}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="evaluations">
          {evals.length === 0 ? <p className="text-body-sm text-muted">No company project evaluations yet.</p> : evals.map((e) => (
            <Card key={e.id} className="mb-3"><CardContent className="pt-6"><p className="text-label">{e.projectId}</p><p className="text-caption">{e.completionDecision} · {e.status}</p></CardContent></Card>
          ))}
        </TabsContent>

        <TabsContent value="reliability">
          {reliability.map((r) => (
            <Card key={r.id} className="mb-3"><CardContent className="pt-6 flex justify-between"><span>{r.event}</span><span>{r.impact} · {r.date}</span></CardContent></Card>
          ))}
        </TabsContent>

        <TabsContent value="hiring">
          {hiring.map((h) => (
            <Card key={h.id} className="mb-3"><CardContent className="pt-6"><p className="text-label">{h.role} at {h.company}</p><p className="text-caption">{h.stage} · {h.lastActivity}</p></CardContent></Card>
          ))}
        </TabsContent>

        <TabsContent value="activity">
          <ActivityFeed items={[
            { id: "1", title: "Profile submitted", description: "Account verification documents uploaded", time: "—" },
            { id: "2", title: "Account verification", description: developer.accountVerificationStatus, time: developer.accountVerifiedAt ?? "—" },
          ]} />
        </TabsContent>
      </Tabs>
    </>
  );
}
