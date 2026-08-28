"use client";

import { useState } from "react";
import { PageHeader, FormField } from "@/components/ui/common";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { usePlatformSettings } from "@/lib/platform-settings";

export default function AdminSettingsPage() {
  const { settings, updateSettings } = usePlatformSettings();
  const [saved, setSaved] = useState<string | null>(null);

  const save = (label: string) => {
    setSaved(label);
    setTimeout(() => setSaved(null), 2000);
  };

  return (
    <>
      <PageHeader title="Settings" description="Platform configuration. Financial calculations and WeConnect Verified thresholds read from this page." />

      <div className="grid gap-6 max-w-2xl">
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-h3 text-foreground mb-4">Platform settings</h2>
            <FormField label="Platform name">
              <Input value={settings.platformName} onChange={(e) => updateSettings({ platformName: e.target.value })} />
            </FormField>
            <FormField label="Support email">
              <Input value={settings.supportEmail} onChange={(e) => updateSettings({ supportEmail: e.target.value })} />
            </FormField>
            <Button onClick={() => save("platform")}>Save platform settings</Button>
            {saved === "platform" && <p className="text-caption text-teal mt-2">Saved.</p>}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-h3 text-foreground mb-4">Financial Settings</h2>
            <FormField
              label="Paid Project Commission (%)"
              helper="Applied when a company purchases a completed paid project. Commission is taken from the project budget, not added on top. Training projects, hiring challenges, hiring fees and subscriptions are not charged this rate."
            >
              <Input
                type="number"
                min={0}
                max={100}
                value={settings.projectCommissionPercentage}
                onChange={(e) => updateSettings({ projectCommissionPercentage: Number(e.target.value) })}
              />
            </FormField>
            <Button onClick={() => save("finance")}>Save financial settings</Button>
            {saved === "finance" && <p className="text-caption text-teal mt-2">Saved. All financial summaries now use {settings.projectCommissionPercentage}%.</p>}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-h3 text-foreground mb-4">WeConnect Verified thresholds</h2>
            <p className="text-caption mb-4">These values are shared with the developer Verified page. Account Verified is a separate, earlier status.</p>
            <FormField label="Minimum reliability (%)">
              <Input
                type="number"
                value={settings.weconnectVerifiedMinReliability}
                onChange={(e) => updateSettings({ weconnectVerifiedMinReliability: Number(e.target.value) })}
              />
            </FormField>
            <FormField label="Successful internal projects required">
              <Input
                type="number"
                value={settings.weconnectVerifiedMinInternalProjects}
                onChange={(e) => updateSettings({ weconnectVerifiedMinInternalProjects: Number(e.target.value) })}
              />
            </FormField>
            <FormField label="Minimum average project score (%)">
              <Input
                type="number"
                value={settings.weconnectVerifiedMinAverageScore}
                onChange={(e) => updateSettings({ weconnectVerifiedMinAverageScore: Number(e.target.value) })}
              />
            </FormField>
            <FormField label="Company evaluations required">
              <Input
                type="number"
                value={settings.weconnectVerifiedMinCompanyEvaluations}
                onChange={(e) => updateSettings({ weconnectVerifiedMinCompanyEvaluations: Number(e.target.value) })}
              />
            </FormField>
            <FormField label="Minimum challenges for Master level">
              <Input
                type="number"
                value={settings.masterLevelMinChallenges}
                onChange={(e) => updateSettings({ masterLevelMinChallenges: Number(e.target.value) })}
              />
            </FormField>
            <Button variant="secondary" onClick={() => save("verified")}>Update thresholds</Button>
            {saved === "verified" && <p className="text-caption text-teal mt-2">Saved.</p>}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
