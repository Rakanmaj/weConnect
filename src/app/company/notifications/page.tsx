import { PageHeader } from "@/components/ui/common";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { companyNotifications } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default function CompanyNotificationsPage() {
  return (
    <>
      <PageHeader title="Notifications" description="Stay updated on projects, hiring, and payments." />
      <div className="space-y-3 max-w-2xl">
        {companyNotifications.map((n) => (
          <Card key={n.id} className={cn(!n.read && "border-l-4 border-l-primary")}>
            <CardContent className="py-4 flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-label text-foreground">{n.title}</p>
                  {!n.read && <Badge variant="primary" size="sm">New</Badge>}
                </div>
                <p className="text-body-sm text-muted mt-1">{n.message}</p>
                <p className="text-caption mt-2">{n.time}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
