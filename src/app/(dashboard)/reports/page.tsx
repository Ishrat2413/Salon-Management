"use client";

import RoleGuard from "@/components/layout/role-guard";
import { DashboardPage } from "@/components/layout/dashboard-page";

export default function ReportsPage() {
  return (
    <RoleGuard allowed={["manager", "admin"]}>
      <DashboardPage
        title='Reports'
        description='Inspect performance summaries and business insights.'
      />
    </RoleGuard>
  );
}
