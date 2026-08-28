"use client";

import { PageHeader } from "@/components/ui/common";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const adminNotifications = [
  { id: "an1", title: "Verification queue spike", message: "47 developer verifications pending review.", time: "1 hour ago", read: false },
  { id: "an2", title: "Dispute opened", message: "Payment dispute DP-1 requires admin attention.", time: "3 hours ago", read: false },
  { id: "an3", title: "Revenue milestone", message: "Platform crossed $500k cumulative project revenue.", time: "Yesterday", read: true },
  { id: "an4", title: "System update", message: "Assessment engine v2.1 deployed successfully.", time: "2 days ago", read: true },
];

export default function AdminNotificationsPage() {
  return (
    <>
      <PageHeader title="Notifications" description="Platform alerts and admin updates." />
      <div className="space-y-3 max-w-2xl">
        {adminNotifications.map((n) => (
          <Card key={n.id} className={!n.read ? "border-l-4 border-l-navy" : undefined}>
            <CardContent className="py-4">
              <div className="flex items-center gap-2">
                <p className="text-label text-foreground">{n.title}</p>
                {!n.read && <Badge variant="navy" size="sm">New</Badge>}
              </div>
              <p className="text-body-sm text-muted mt-1">{n.message}</p>
              <p className="text-caption mt-2">{n.time}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
