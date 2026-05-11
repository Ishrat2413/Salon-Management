import type { ReactNode } from "react";

import RoleGuard from "@/components/layout/role-guard";
import ManagerReportPage from "@/components/dashboard/manager/manager-reports/manager-report-page";

export default function ReportsLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <RoleGuard allowed={["manager"]}>
      <ManagerReportPage>{children}</ManagerReportPage>
    </RoleGuard>
  );
}
