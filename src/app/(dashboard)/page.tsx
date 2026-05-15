"use client";

import { useAuth } from "@/components/providers/auth-provider";
import { AdminDashboard } from "@/components/dashboard/admin/admin-dashboard";
import ManagerDashboard from "@/components/dashboard/manager/manager-dashboard-page/manager-dashboard";
import EmployeeDashboard from "@/components/dashboard/employee/employee-dashboard";

export default function HomePage() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div>
      {user.role.toLowerCase() === "admin" ? <AdminDashboard /> : null}
      {user.role.toLowerCase() === "manager" ? <ManagerDashboard /> : null}
      {user.role.toLowerCase() === "employee" ? <EmployeeDashboard /> : null}
    </div>
  );
}
