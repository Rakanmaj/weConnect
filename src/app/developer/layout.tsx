import { AppShell } from "@/components/layout/app-shell";
import { DEVELOPER_NAV } from "@/lib/constants";
import { ahmadAli } from "@/lib/mock-data";

export const dynamic = "force-dynamic";

export default function DeveloperLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell
      navItems={DEVELOPER_NAV}
      user={{ name: ahmadAli.name, role: ahmadAli.role }}
      portal="developer"
    >
      <div className="pb-20 lg:pb-0">{children}</div>
    </AppShell>
  );
}
