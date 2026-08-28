import { PageHeader, FormField } from "@/components/ui/common";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badges";
import { techFlowCompany } from "@/lib/mock-data";

export default function CompanyProfilePage() {
  return (
    <>
      <PageHeader
        title="Company Profile"
        description="Manage your company information visible to developers."
        action={<StatusBadge status={techFlowCompany.verificationStatus} />}
      />

      <Card className="max-w-2xl">
        <CardContent className="pt-6">
          <FormField label="Company name" required>
            <Input defaultValue={techFlowCompany.name} />
          </FormField>
          <FormField label="Industry">
            <Input defaultValue={techFlowCompany.industry} />
          </FormField>
          <FormField label="Location">
            <Input defaultValue={techFlowCompany.location} />
          </FormField>
          <FormField label="Website">
            <Input defaultValue={techFlowCompany.website} />
          </FormField>
          <FormField label="Company size">
            <Input defaultValue={techFlowCompany.size} />
          </FormField>
          <FormField label="About">
            <Textarea rows={4} defaultValue={techFlowCompany.about} />
          </FormField>
          <Button>Save changes</Button>
        </CardContent>
      </Card>
    </>
  );
}
