"use client";
import { ColumnDef } from "@/components/univarsalTable/UnivarsalTable.type";
import UniversalTable from "@/components/univarsalTable/Universaltable";

export type PayrollEntry = {
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

export const payrollData: PayrollEntry[] = [
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

export function PayrollTable({ data = payrollData }: { data?: PayrollEntry[] }) {
  return (
    <UniversalTable<PayrollEntry>
      title='Payroll'
      data={data}
      columns={payrollColumns}
      pageSize={10}
    />
  );
}
