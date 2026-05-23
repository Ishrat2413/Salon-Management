"use client";

import { useAuth } from "@/components/providers/auth-provider";
import RoleGuard from "@/components/layout/role-guard";
import { AdminHistory } from "@/components/dashboard/admin/admin-history";
import EmployeeHistory from "@/components/dashboard/employee/employee-history";

export default function HistoryPage() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <RoleGuard allowed={["employee", "admin", "manager"]}>
      {user.role === "admin" || user.role === "manager" ? (
        <AdminHistory />
      ) : (
        <EmployeeHistory/>
      )}
    </RoleGuard>
  );
}
