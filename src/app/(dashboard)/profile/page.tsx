"use client";

import UserProfile from "@/components/dashboard/common/UserProfile";
import RoleGuard from "@/components/layout/role-guard";
import { useAuth } from "@/components/providers/auth-provider";

export default function ProfilePage() {
  const { user } = useAuth();

  if (!user) return null;
  return (
    <RoleGuard allowed={["employee", "manager", "admin"]}>
      <div>
        {/* {user.role === "admin" ? <UserProfile /> : null}
        {user.role === "manager" ? <ManagerProfilePage /> : null} */}
        {/* {user.role === "employee" ? <EmployeeDashboard /> : null} */}

        <UserProfile />
      </div>
    </RoleGuard>
  );
}
