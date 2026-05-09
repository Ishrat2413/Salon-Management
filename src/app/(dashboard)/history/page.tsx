"use client";

import RoleGuard from "@/components/layout/role-guard";
import { DashboardPage } from "@/components/layout/dashboard-page";

export default function HistoryPage() {
  return (
    <RoleGuard allowed={["employee", "admin"]}>
      <DashboardPage
        title='History'
        description='Review recent activity and past dashboard actions.'
      />
    </RoleGuard>
  );
}
