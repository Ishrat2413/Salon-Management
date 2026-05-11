"use client";

import { useAuth } from "@/components/providers/auth-provider";
import RoleGuard from "@/components/layout/role-guard";
import { DashboardPage } from "@/components/layout/dashboard-page";
import { AdminHistory } from "@/components/dashboard/admin/admin-history";

export default function HistoryPage() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <RoleGuard allowed={["employee", "admin"]}>
      {user.role === "admin" ? (
        <AdminHistory />
      ) : (
        <DashboardPage
          title='History'
          description='Review recent activity and past dashboard actions.'
        />
      )}
    </RoleGuard>
  );
}
