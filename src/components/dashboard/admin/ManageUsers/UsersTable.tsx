"use client";
import {
  ActionDef,
  ColumnDef,
} from "@/components/univarsalTable/UnivarsalTable.type";
import UniversalTable from "@/components/univarsalTable/Universaltable";
import { SquarePen, Trash2 } from "lucide-react";
import React from "react";

type User = {
  id: number;
  name: string;
  role: "Admin" | "Manager" | "Employee";
  salon: string;
  email: string;
  status: "Active" | "Inactive";
};

const usersData: User[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Admin",
    salon: "Glam Studio",
    email: "sarah@example.com",
    status: "Active",
  },
  {
    id: 2,
    name: "Mike Chen",
    role: "Manager",
    salon: "Style Lounge",
    email: "mike@example.com",
    status: "Active",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Employee",
    salon: "Beauty Bar",
    email: "emily@example.com",
    status: "Active",
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    role: "Employee",
    salon: "Glam Studio",
    email: "emily2@example.com",
    status: "Inactive",
  },
];

// Role badge color custom define
const roleBadgeStyle: Record<string, React.CSSProperties> = {
  Admin: {
    background: "#ffe8f5",
    color: "#c0186b",
    borderRadius: 6,
    padding: "2px 10px",
    fontSize: 12,
    fontWeight: 600,
  },
  Manager: {
    background: "#e8f0ff",
    color: "#2655c0",
    borderRadius: 6,
    padding: "2px 10px",
    fontSize: 12,
    fontWeight: 600,
  },
  Employee: {
    background: "#f2f2f2",
    color: "#555",
    borderRadius: 6,
    padding: "2px 10px",
    fontSize: 12,
    fontWeight: 500,
  },
};

const userColumns: ColumnDef<User>[] = [
  {
    key: "name",
    header: "Name",
    sortable: true,
    width: "200px",
  },
  {
    key: "role",
    header: "Role",
    width: "130px",
    render: (value) => (
      <span style={roleBadgeStyle[value as string] ?? {}}>
        {value as string}
      </span>
    ),
  },
  { key: "salon", header: "Salon", sortable: true },
  { key: "email", header: "Email" },
  {
    key: "status",
    header: "Status",
    // statusMap
    statusMap: {
      Active: { bg: "#e8f8f0", color: "#1a7a4a", label: "Active" },
      Inactive: { bg: "#f5f5f5", color: "#999", label: "Inactive" },
      Inactivesss: { bg: "#f5f5f5", color: "#999", label: "Inactive" },
    },
  },
];

const userActions: ActionDef<User>[] = [
  {
    label: "Edit",
    icon: (
      <span className='text-[#155DFC]'>
        <SquarePen className='w-5  h-5' />
      </span>
    ),
    className: "ut-edit-btn",
    onClick: (row) => alert(`Edit: ${row.name}`),
  },
  {
    label: "Delete",
    icon: (
      <span style={{ color: "#e05252" }} className='text-[#155DFC] '>
        <Trash2 className='w-5  h-5' />
      </span>
    ),
    onClick: (row) => alert(`Delete: ${row.name}`),
  },
];

export function UsersTable() {
  return (
    <UniversalTable<User>
      title='All Users (5)'
      data={usersData}
      columns={userColumns}
      actions={userActions}
      pageSize={10}
    />
  );
}
