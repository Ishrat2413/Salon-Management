"use client";
import type { ReactNode } from "react";

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
        <ManagerReportPage>{children}</ManagerReportPage>
      </div>
    </RoleGuard>
  );
}
