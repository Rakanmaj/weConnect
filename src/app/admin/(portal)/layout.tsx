import { AppShell } from "@/components/layout/app-shell";
import { ADMIN_NAV } from "@/lib/constants";

export const dynamic = "force-dynamic";

export default function AdminPortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-portal">
      <AppShell
        navItems={ADMIN_NAV}
        user={{ name: "Admin User", role: "Platform Admin" }}
        portal="admin"
      >
        {children}
      </AppShell>
    </div>
  );
}
