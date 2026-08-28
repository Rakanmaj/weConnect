import Link from "next/link";
import { Bell } from "lucide-react";
import { PageHeader } from "@/components/ui/common";
import { Card } from "@/components/developer/card";
import { EmptyState } from "@/components/ui/common";
import { developerNotifications } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default function NotificationsPage() {
  const unread = developerNotifications.filter((n) => !n.read);

  return (
    <div className="min-w-0 max-w-2xl">
      <PageHeader
        title="Notifications"
        description={unread.length > 0 ? `${unread.length} unread notifications` : "You're all caught up."}
      />

      {developerNotifications.length === 0 ? (
        <EmptyState icon={Bell} title="No notifications" description="Notifications about projects, challenges, and career updates will appear here." />
      ) : (
        <div className="space-y-2">
          {developerNotifications.map((n) => {
            const content = (
              <Card
                padding={false}
                className={cn(
                  "p-4 transition-colors",
                  !n.read && "border-primary/30 bg-blue-50/30",
                  n.href && "hover:border-primary/50 cursor-pointer"
                )}
              >
                <div className="flex items-start gap-3 min-w-0">
                  {!n.read && <span className="h-2 w-2 rounded-full bg-primary shrink-0 mt-2" />}
                  <div className={cn("flex-1 min-w-0", n.read && "ml-5")}>
                    <p className="font-medium text-foreground truncate">{n.title}</p>
                    <p className="text-body-sm text-muted mt-0.5 line-clamp-2">{n.message}</p>
                    <p className="text-caption mt-2">{n.time}</p>
                  </div>
                </div>
              </Card>
            );

            return n.href ? (
              <Link key={n.id} href={n.href}>{content}</Link>
            ) : (
              <div key={n.id}>{content}</div>
            );
          })}
        </div>
      )}
    </div>
  );
}
