"use client";
import React from "react";
import { ActionDef, ColumnDef } from "../univarsalTable/UnivarsalTable.type";
import UniversalTable from "../univarsalTable/Universaltable";

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
    icon: <span>✏️</span>,
    className: "ut-edit-btn",
    onClick: (row) => alert(`Edit: ${row.name}`),
  },
  {
    label: "Delete",
    icon: <span style={{ color: "#e05252" }}>🗑</span>,
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

// ─────────────────────────────────────────────────────────────────
// 2. SERVICE ENTRIES TABLE (Image 2)
// ─────────────────────────────────────────────────────────────────

type ServiceEntry = {
  id: number;
  name: string;
  service: string;
  salon: string;
  price: number;
  tip: number;
  dateTime: string;
  status: "Approved" | "Pending Review";
};

const serviceData: ServiceEntry[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    service: "Cornrows",
    salon: "Glam Studio",
    price: 120,
    tip: 120,
    dateTime: "May 7, 2026 2:30 PM",
    status: "Pending Review",
  },
  {
    id: 2,
    name: "Mike Chen",
    service: "Box Braids",
    salon: "Style Lounge",
    price: 120,
    tip: 120,
    dateTime: "May 7, 2026 2:30 PM",
    status: "Approved",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    service: "Weave Install",
    salon: "Beauty Bar",
    price: 120,
    tip: 120,
    dateTime: "May 7, 2026 2:30 PM",
    status: "Approved",
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    service: "Locs Maintenance",
    salon: "Glam Studio",
    price: 120,
    tip: 120,
    dateTime: "May 7, 2026 2:30 PM",
    status: "Pending Review",
  },
];

const serviceColumns: ColumnDef<ServiceEntry>[] = [
  { key: "name", header: "Name", sortable: true },
  { key: "service", header: "Service", sortable: true },
  { key: "salon", header: "Salon" },
  {
    key: "price",
    header: "Price",
    align: "right",
    render: (v) => <span>${v as number}</span>,
  },
  {
    key: "tip",
    header: "Tip",
    align: "right",
    render: (v) => (
      <span style={{ color: "#2da86a", fontWeight: 500 }}>${v as number}</span>
    ),
  },
  { key: "dateTime", header: "Date/Time", sortable: true },
  {
    key: "status",
    header: "Status",
    statusMap: {
      Approved: { bg: "#e8f8f0", color: "#1a7a4a", label: "Approved" },
      "Pending Review": {
        bg: "#fff8e6",
        color: "#b07d00",
        label: "Pending Review",
      },
    },
  },
];

export function ServiceEntriesTable() {
  return (
    <UniversalTable<ServiceEntry>
      title='Service Entries'
      data={serviceData}
      columns={serviceColumns}
      pageSize={10}
    />
  );
}

// ─────────────────────────────────────────────────────────────────
// 3. PAYROLL TABLE (Image 3)
// ─────────────────────────────────────────────────────────────────

type PayrollEntry = {
  id: number;
  name: string;
  service: string;
  salon: string;
  serviceEarning: number;
  tip: number;
  dateTime: string;
  commission: number;
  totalPayout: number;
};

const payrollData: PayrollEntry[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    service: "Cornrows",
    salon: "Glam Studio",
    serviceEarning: 120,
    tip: 120,
    dateTime: "May 7, 2026",
    commission: 65,
    totalPayout: 1641.5,
  },
  {
    id: 2,
    name: "Mike Chen",
    service: "Box Braids",
    salon: "Style Lounge",
    serviceEarning: 120,
    tip: 120,
    dateTime: "May 7, 2026",
    commission: 65,
    totalPayout: 1641.5,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    service: "Weave Install",
    salon: "Beauty Bar",
    serviceEarning: 120,
    tip: 120,
    dateTime: "May 7, 2026",
    commission: 65,
    totalPayout: 1641.5,
  },
];

const payrollColumns: ColumnDef<PayrollEntry>[] = [
  { key: "name", header: "Name", sortable: true },
  { key: "service", header: "Service" },
  { key: "salon", header: "Salon" },
  {
    key: "serviceEarning",
    header: "Service Earning",
    align: "right",
    render: (v) => `$${v}`,
  },
  {
    key: "tip",
    header: "Tip",
    align: "right",
    render: (v) => (
      <span style={{ color: "#2da86a", fontWeight: 500 }}>${v as number}</span>
    ),
  },
  { key: "dateTime", header: "Date/Time", sortable: true },
  {
    key: "commission",
    header: "Commission",
    align: "center",
    render: (v) => (
      <span
        style={{
          background: "#e8e5f8",
          color: "#5a4fcf",
          borderRadius: 6,
          padding: "2px 10px",
          fontSize: 13,
          fontWeight: 500,
        }}>
        {v as number}%
      </span>
    ),
  },
  {
    key: "totalPayout",
    header: "Total Payout",
    align: "right",
    sortable: true,
    render: (v) => (
      <span style={{ color: "#d0166e", fontWeight: 700, fontSize: 15 }}>
        ${(v as number).toFixed(2)}
      </span>
    ),
  },
];

export function PayrollTable() {
  return (
    <UniversalTable<PayrollEntry>
      title='Payroll'
      data={payrollData}
      columns={payrollColumns}
      pageSize={10}
    />
  );
}

// ─────────────────────────────────────────────────────────────────
// 4. REVIEW ENTRIES TABLE (Image 5 & 6)
// ─────────────────────────────────────────────────────────────────

type ReviewEntry = {
  id: number;
  employee: string;
  service: string;
  amount: number;
  tip: number;
  date: string;
  time: string;
  status: "Approved" | "Pending";
};

const reviewData: ReviewEntry[] = [
  {
    id: 1,
    employee: "Sarah Johnson",
    service: "Hair Coloring",
    amount: 150,
    tip: 50,
    date: "15/2/2026",
    time: "09:30 AM",
    status: "Approved",
  },
  {
    id: 2,
    employee: "Mike Chen",
    service: "Hair Coloring",
    amount: 150,
    tip: 50,
    date: "15/2/2026",
    time: "09:30 AM",
    status: "Pending",
  },
  {
    id: 3,
    employee: "Emily Rodriguez",
    service: "Hair Coloring",
    amount: 150,
    tip: 50,
    date: "15/2/2026",
    time: "09:30 AM",
    status: "Approved",
  },
  {
    id: 4,
    employee: "Emily Rodriguez",
    service: "Hair Coloring",
    amount: 150,
    tip: 50,
    date: "15/2/2026",
    time: "09:30 AM",
    status: "Pending",
  },
];

const reviewColumns: ColumnDef<ReviewEntry>[] = [
  { key: "employee", header: "Employee", sortable: true },
  { key: "service", header: "Service" },
  {
    key: "amount",
    header: "Amount",
    align: "right",
    render: (v) => `$${(v as number).toFixed(2)}`,
  },
  {
    key: "tip",
    header: "Tip",
    align: "right",
    render: (v) => `$${(v as number).toFixed(2)}`,
  },
  { key: "date", header: "Date", sortable: true },
  { key: "time", header: "Time" },
  {
    key: "status",
    header: "Status",
    statusMap: {
      Approved: { bg: "#e8f8f0", color: "#1a7a4a", label: "Approved" },
      Pending: { bg: "#fff4e5", color: "#b07d00", label: "Pending" },
    },
  },
];

const reviewActions: ActionDef<ReviewEntry>[] = [
  {
    label: "Approve",
    icon: <span style={{ color: "#2da86a" }}>✔</span>,
    onClick: (row) => alert(`Approved: ${row.employee}`),
    show: (row) => row.status === "Pending",
  },
  {
    label: "Reject",
    icon: <span style={{ color: "#e05252" }}>✘</span>,
    onClick: (row) => alert(`Rejected: ${row.employee}`),
    show: (row) => row.status === "Pending",
  },
  {
    label: "More",
    icon: <span>⋯</span>,
    onClick: (row) => alert(`More options: ${row.employee}`),
  },
];

export function ReviewEntriesTable() {
  return (
    <UniversalTable<ReviewEntry>
      title='Review Entries'
      data={reviewData}
      columns={reviewColumns}
      actions={reviewActions}
      pageSize={10}
    />
  );
}
