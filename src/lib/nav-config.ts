import {
  BarChart3,
  Briefcase,
  History,
  LayoutDashboard,
  FileText,
  PlusCircle,
  User,
  Users,
  Wallet,
} from "lucide-react";
import type { UserRole } from "./auth";
import type { ElementType } from "react";

export interface SidebarNavItem {
  title: string;
  href: string;
  icon: ElementType;
}

export const NAV_CONFIG: Record<UserRole, SidebarNavItem[]> = {
  employee: [
    { title: "Dashboard", href: "/", icon: LayoutDashboard },
    { title: "Add Entry", href: "/add-entry", icon: PlusCircle },
    { title: "History", href: "/history", icon: History },
    { title: "Profile", href: "/profile", icon: User },
  ],
  manager: [
    { title: "Dashboard", href: "/", icon: LayoutDashboard },
    { title: "Add Entry", href: "/add-entry", icon: PlusCircle },
    { title: "Review Entries", href: "/review-entries", icon: FileText },
    { title: "Reports", href: "/reports", icon: BarChart3 },
    { title: "Profile", href: "/profile", icon: User },
  ],
  admin: [
    { title: "Dashboard", href: "/", icon: LayoutDashboard },
    { title: "History", href: "/history", icon: History },
    { title: "Manage Users", href: "/manage-users", icon: Users },
    { title: "Work Oversight", href: "/work-oversight", icon: Briefcase },
    { title: "Payroll", href: "/payroll", icon: Wallet },
    { title: "Reports", href: "/reports", icon: BarChart3 },
    { title: "Profile", href: "/profile", icon: User },
  ],
};
