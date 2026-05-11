"use client";

import RoleGuard from "@/components/layout/role-guard";
import { DashboardPage } from "@/components/layout/dashboard-page";
import ManagerProfilePage from "@/components/dashboard/manager/manager-profile/manager-profile-page";
import { useAuth } from "@/components/providers/auth-provider";

export default function ProfilePage() {
  const { user } = useAuth();

  if (!user) return null;
  return (
    <RoleGuard allowed={["employee", "manager", "admin"]}>
      <div>
        {/* {user.role === "admin" ? <AdminDashboard /> : null} */}
        {user.role === "manager" ? <ManagerProfilePage /> : null}
        {/* {user.role === "employee" ? <EmployeeDashboard /> : null} */}
      </div>
    </RoleGuard>
  );
}
