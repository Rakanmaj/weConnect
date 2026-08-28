"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { PageHeader, FormField } from "@/components/ui/common";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/developer/card";
import { ahmadAli } from "@/lib/mock-data";

const TABS = ["account", "security", "notifications", "privacy", "availability"];

export default function SettingsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tab = searchParams.get("tab") || "account";

  return (
    <div className="max-w-2xl mx-auto min-w-0">
      <PageHeader title="Settings" description="Manage your account preferences and security." />

      <Tabs value={tab} onValueChange={(v) => router.push(`/developer/settings?tab=${v}`)}>
        <TabsList className="flex-wrap">
          {TABS.map((t) => (
            <TabsTrigger key={t} value={t} className="capitalize">{t}</TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="account">
          <Card>
            <FormField label="Display Name">
              <Input defaultValue={ahmadAli.name} />
            </FormField>
            <FormField label="Email">
              <Input type="email" defaultValue={ahmadAli.email} />
            </FormField>
            <FormField label="Language">
              <select className="flex h-11 w-full rounded-[6px] border border-border bg-white px-3 text-sm">
                <option>English</option>
                <option>Arabic</option>
              </select>
            </FormField>
            <FormField label="Timezone">
              <select className="flex h-11 w-full rounded-[6px] border border-border bg-white px-3 text-sm">
                <option>Asia/Amman (UTC+3)</option>
                <option>Asia/Riyadh (UTC+3)</option>
              </select>
            </FormField>
            <Button>Save Account Settings</Button>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <FormField label="Current Password">
              <Input type="password" placeholder="••••••••" />
            </FormField>
            <FormField label="New Password">
              <Input type="password" placeholder="••••••••" />
            </FormField>
            <FormField label="Confirm New Password">
              <Input type="password" placeholder="••••••••" />
            </FormField>
            <div className="p-4 rounded-[6px] bg-surface mb-5">
              <p className="text-sm font-medium text-navy mb-1">Two-Factor Authentication</p>
              <p className="text-caption mb-3">Add an extra layer of security to your account.</p>
              <Button variant="secondary" size="sm">Enable 2FA</Button>
            </div>
            <Button>Update Password</Button>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <p className="text-body-sm text-muted mb-4">Choose what notifications you receive.</p>
            {[
              { label: "Project invitations", desc: "When a company invites you to a project", on: true },
              { label: "Challenge results", desc: "When you pass or fail a skill challenge", on: true },
              { label: "Company feedback", desc: "When a company submits an evaluation", on: true },
              { label: "Interview requests", desc: "When a company requests an interview", on: true },
              { label: "Career offers", desc: "When you receive a job offer", on: true },
              { label: "Platform updates", desc: "News and feature announcements", on: false },
            ].map((n) => (
              <label key={n.label} className="flex items-start gap-3 py-3 border-b border-border last:border-0 cursor-pointer">
                <input type="checkbox" defaultChecked={n.on} className="mt-1 rounded" />
                <div className="min-w-0">
                  <p className="text-sm font-medium">{n.label}</p>
                  <p className="text-caption">{n.desc}</p>
                </div>
              </label>
            ))}
            <Button className="mt-4">Save Preferences</Button>
          </Card>
        </TabsContent>

        <TabsContent value="privacy">
          <Card>
            <FormField label="Profile Visibility">
              <select className="flex h-11 w-full rounded-[6px] border border-border bg-white px-3 text-sm">
                <option>Public — visible to companies</option>
                <option>Private — hidden from search</option>
              </select>
            </FormField>
            <FormField label="Show Performance Metrics">
              <select className="flex h-11 w-full rounded-[6px] border border-border bg-white px-3 text-sm">
                <option>Visible on portfolio</option>
                <option>Hidden</option>
              </select>
            </FormField>
            <FormField label="Show Availability">
              <select className="flex h-11 w-full rounded-[6px] border border-border bg-white px-3 text-sm">
                <option>Visible to matched companies</option>
                <option>Hidden</option>
              </select>
            </FormField>
            <div className="p-4 rounded-[6px] border border-red-100 bg-red-50 mt-4">
              <p className="text-sm font-medium text-red-800 mb-2">Danger Zone</p>
              <p className="text-caption text-red-700 mb-3">Permanently delete your account and all data.</p>
              <Button variant="destructive" size="sm">Delete Account</Button>
            </div>
            <Button className="mt-4">Save Privacy Settings</Button>
          </Card>
        </TabsContent>

        <TabsContent value="availability">
          <Card>
            <FormField label="Weekly Hours">
              <select className="flex h-11 w-full rounded-[6px] border border-border bg-white px-3 text-sm">
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
            <FormField label="Available From">
              <Input type="date" defaultValue="2026-08-20" />
            </FormField>
            <FormField label="Status Message">
              <Input defaultValue={ahmadAli.availability} />
            </FormField>
            <Button>Update Availability</Button>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
