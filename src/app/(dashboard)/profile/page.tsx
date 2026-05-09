"use client";

import RoleGuard from "@/components/layout/role-guard";
import { DashboardPage } from "@/components/layout/dashboard-page";

export default function ProfilePage() {
  return (
    <RoleGuard allowed={["employee", "manager", "admin"]}>
      <DashboardPage
        title='Profile'
        description='Manage account details and role-specific preferences.'
      />
    </RoleGuard>
  );
}
