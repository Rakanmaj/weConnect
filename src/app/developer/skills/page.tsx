import Link from "next/link";
import { PageHeader, SectionHeader } from "@/components/ui/common";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/developer/card";
import { SkillBadge } from "@/components/ui/status-badges";
import { VerifiedBadge } from "@/components/ui/verified-badge";
import { ahmadAli, selfDeclaredSkills } from "@/lib/mock-data";

export default function SkillsPage() {
  const verified = ahmadAli.skills.filter((s) => s.verified);
  const selfDeclared = selfDeclaredSkills;

  return (
    <div className="min-w-0 space-y-8">
      <PageHeader
        title="Skills"
        description="Verified skills come from assessments and challenges. Self-declared skills are visible but not verified."
        action={
          <Button variant="secondary" size="sm" asChild>
            <Link href="/developer/challenges">Take Challenges</Link>
          </Button>
        }
      />

      <section>
        <SectionHeader
          title="Verified Skills"
          description="Earned through platform assessments and skill challenges."
          action={<VerifiedBadge type="weconnect" />}
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {verified.map((s) => (
            <Card key={s.name}>
              <SkillBadge name={s.name} level={s.level} verified className="text-sm px-0 py-0 border-0 bg-transparent" />
              {s.challengesCompleted && (
                <p className="text-caption mt-3">{s.challengesCompleted} challenges completed</p>
              )}
              <Button variant="link" size="sm" className="p-0 h-auto mt-2" asChild>
                <Link href={`/developer/challenges/${s.name.toLowerCase().replace(/\s+/g, "-")}`}>
                  View path
                </Link>
              </Button>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <SectionHeader
          title="Self-Declared Skills"
          description="Add skills to your profile. Verify them through challenges to improve matching."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {selfDeclared.map((s) => (
            <Card key={s.name} className="border-dashed">
              <SkillBadge name={s.name} level={s.level} className="text-sm px-0 py-0 border-0 bg-transparent" />
              <p className="text-caption mt-3 text-amber-600">Not verified — take a challenge to verify</p>
              <Button variant="secondary" size="sm" className="mt-3">Start Verification</Button>
            </Card>
          ))}
        </div>
        <Button variant="secondary" className="mt-4">Add Skill</Button>
      </section>
    </div>
  );
}
