"use client";

import React, { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/auth-provider";
import { DashboardLayout } from "@/components/layout/dashboard-layout";

export default function EmployeeLayout({ children }: { children: ReactNode }) {
  const { user, isHydrated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isHydrated) return;
    if (!user) {
      router.replace("/login");
      return;
    }
    if (user.role !== "employee") {
      router.replace("/");
    }
  }, [user, isHydrated, router]);

  if (!isHydrated) return null;
  if (!user) return null;
  if (user.role !== "employee") return null;

  return <DashboardLayout>{children}</DashboardLayout>;
}
