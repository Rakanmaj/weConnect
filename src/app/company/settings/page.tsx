"use client";

import { PageHeader, FormField } from "@/components/ui/common";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function CompanySettingsPage() {
  return (
    <>
      <PageHeader title="Settings" description="Account preferences and notification controls." />

      <div className="grid gap-6 max-w-2xl">
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-h3 text-foreground mb-4">Notifications</h2>
            {[
              "New project submissions",
              "Interview responses",
              "Evaluation reminders",
              "Payment confirmations",
            ].map((item) => (
              <label key={item} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                <span className="text-body-sm text-foreground">{item}</span>
                <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-border" />
              </label>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-h3 text-foreground mb-4">Security</h2>
            <FormField label="Current password">
              <Input type="password" />
            </FormField>
            <FormField label="New password">
              <Input type="password" />
            </FormField>
            <Button>Update password</Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-h3 text-foreground mb-4">Billing contact</h2>
            <FormField label="Email">
              <Input defaultValue="billing@techflow.example.com" />
            </FormField>
            <Button variant="secondary">Save</Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
