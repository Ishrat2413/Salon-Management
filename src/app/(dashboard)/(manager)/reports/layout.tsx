"use client";
import type { ReactNode } from "react";

import ReportCard from "@/components/dashboard/admin/report/ReportCard";
import ManagerReportPage from "@/components/dashboard/manager/manager-reports/manager-report-page";
import RoleGuard from "@/components/layout/role-guard";
import { useAuth } from "@/components/providers/auth-provider";

export default function ReportsLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const { user } = useAuth();
  if (!user) {
    return null;
  }
  return (
    <RoleGuard allowed={["manager", "admin"]}>
      <div className="flex flex-col space-y-6 w-full">
        {user.role === "admin" ? (
          <ReportCard
            totalRevenue={4250.0}
            totalServices={165}
            activeEmployees={12}
            revenueGrowth={15.2}
            servicesGrowth={6.3}
            employeesGrowth={8.3}
          />
        ) : null}
        <ManagerReportPage>{children}</ManagerReportPage>
      </div>
    </RoleGuard>
  );
}
