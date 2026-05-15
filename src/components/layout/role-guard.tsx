"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/auth-provider";
import type { UserRole } from "@/lib/auth";

export function RoleGuard({
  allowed,
  children,
}: {
  allowed: UserRole[];
  children: ReactNode;
}) {
  const { user, isHydrated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isHydrated) return;
    if (!user) {
      router.replace("/login");
      return;
    }

    if (!allowed.some(a => a.toLowerCase() === user.role.toLowerCase())) {
      router.replace("/");
    }
  }, [user, isHydrated, allowed, router]);

  if (!isHydrated) return null;
  if (!user) return null;
  if (!allowed.some(a => a.toLowerCase() === user.role.toLowerCase())) return null;

  return <>{children}</>;
}

export default RoleGuard;
