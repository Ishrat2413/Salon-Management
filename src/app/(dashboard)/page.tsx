"use client";

import { useAuth } from "@/components/providers/auth-provider";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { AdminDashboard } from "@/components/dashboard/admin-dashboard";

export default function HomePage() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <DashboardLayout>
      {user.role === "admin" ? (
        <AdminDashboard />
      ) : (
        <div className="p-8">
          <h1>Welcome, {user.name} ({user.role})</h1>
          <p>This is the standard dashboard view.</p>
        </div>
      )}
    </DashboardLayout>
  );
}

