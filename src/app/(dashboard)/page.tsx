"use client";

import DashboardOverview from "@/components/dashboard/common/dashboard-overview";

export default function HomePage() {
  return (
    <div>
      {/* Legacy dashboard render preserved for future reference
      {user.role.toLowerCase() === "admin" ? <AdminDashboard /> : null}
      {user.role.toLowerCase() === "manager" ? <ManagerDashboard /> : null}
      {user.role.toLowerCase() === "employee" ? <EmployeeDashboard /> : null}
      */}
      <DashboardOverview />
    </div>
  );
}
