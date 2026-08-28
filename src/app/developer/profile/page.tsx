import Link from "next/link";
import { Code, Link2, Globe, MapPin, Mail } from "lucide-react";
import { PageHeader } from "@/components/ui/common";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/developer/card";
import { Avatar } from "@/components/ui/avatar";
import { LevelBadge, SkillBadge, StatusBadge } from "@/components/ui/status-badges";
import { VerifiedBadge } from "@/components/ui/verified-badge";
import { FormField } from "@/components/ui/common";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ahmadAli } from "@/lib/mock-data";

export default function ProfilePage() {
  return (
    <div className="max-w-3xl mx-auto min-w-0 space-y-6">
      <PageHeader
        title="Profile"
        description="Manage your public developer profile."
        action={
          <Button variant="secondary" size="sm" asChild>
            <Link href="/developer/portfolio">View Public Portfolio</Link>
          </Button>
        }
      />

      <Card>
        <div className="flex flex-col sm:flex-row items-start gap-6 mb-8">
          <Avatar name={ahmadAli.name} size="lg" />
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <h2 className="text-h3 text-navy">{ahmadAli.name}</h2>
              <VerifiedBadge type="account" />
              <VerifiedBadge type="weconnect" />
            </div>
            <LevelBadge level={ahmadAli.overallLevel} />
            <StatusBadge status={ahmadAli.accountVerificationStatus} className="mt-2" />
          </div>
          <Button variant="secondary" size="sm" className="shrink-0">Change Photo</Button>
        </div>

        <div className="grid sm:grid-cols-2 gap-x-4">
          <FormField label="First Name">
            <Input defaultValue={ahmadAli.firstName} />
          </FormField>
          <FormField label="Last Name">
            <Input defaultValue={ahmadAli.lastName} />
          </FormField>
        </div>
        <FormField label="Email">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
            <Input defaultValue={ahmadAli.email} className="pl-9" />
          </div>
        </FormField>
        <FormField label="Location">
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
            <Input defaultValue={ahmadAli.location} className="pl-9" />
          </div>
        </FormField>
        <FormField label="Career Track">
          <Input defaultValue={ahmadAli.role} />
        </FormField>
        <FormField label="Bio">
          <Textarea defaultValue={ahmadAli.bio} rows={4} />
        </FormField>
      </Card>

      <Card>
        <h3 className="text-h4 text-navy mb-4">Links</h3>
        <FormField label="GitHub">
          <div className="relative">
            <Code className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
            <Input defaultValue={ahmadAli.github} className="pl-9" />
          </div>
        </FormField>
        <FormField label="LinkedIn">
          <div className="relative">
            <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
            <Input defaultValue={ahmadAli.linkedin} className="pl-9" />
          </div>
        </FormField>
        <FormField label="Portfolio">
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
            <Input defaultValue={ahmadAli.portfolio} className="pl-9" />
          </div>
        </FormField>
      </Card>

      <Card>
        <h3 className="text-h4 text-navy mb-4">Skills on Profile</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {ahmadAli.skills.map((s) => (
            <SkillBadge key={s.name} name={s.name} level={s.level} verified={s.verified} />
          ))}
        </div>
        <Button variant="secondary" size="sm" asChild>
          <Link href="/developer/skills">Manage Skills</Link>
        </Button>
      </Card>

      <div className="flex justify-end gap-3">
        <Button variant="secondary">Cancel</Button>
        <Button>Save Changes</Button>
      </div>
    </div>
  );
}
