import type { ReactNode } from "react";

import { DashboardLayout } from "@/components/layout/dashboard-layout";

export default function DashboardGroupLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
