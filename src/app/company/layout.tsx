import { AppShell } from "@/components/layout/app-shell";
import { COMPANY_NAV } from "@/lib/constants";
import { techFlowCompany } from "@/lib/mock-data";

export const dynamic = "force-dynamic";

export default function CompanyLayout({ children }: LayoutProps<"/company">) {
  return (
    <AppShell
      navItems={COMPANY_NAV}
      user={{ name: "Sarah Al-Masri", role: techFlowCompany.name }}
      portal="company"
    >
      {children}
    </AppShell>
  );
}
