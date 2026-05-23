"use client";
import type { PayrollRow } from "@/actions/payroll/payroll.types";
import { ColumnDef } from "@/components/univarsalTable/UnivarsalTable.type";
import UniversalTable from "@/components/univarsalTable/Universaltable";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);
}

const payrollColumns: ColumnDef<PayrollRow>[] = [
  { key: "employeeName", header: "Employee", sortable: true },
  {
    key: "totalOccurrences",
    header: "Total Service",
    sortable: true,
  },
  {
    key: "commissionRate",
    header: "Commission Rate",
    sortable: true,
    render: (value) => (
      <span style={{ fontWeight: 500 }}>
        {Number(value)}%
      </span>
    ),
  },
  {
    key: "serviceCharge",
    header: "Service Charge",
    sortable: true,
    render: (value) => (
      <span style={{ color: "#334155", fontWeight: 500 }}>
        {formatCurrency(Number(value))}
      </span>
    ),
  },
  {
    key: "commissionEarnings",
    header: "Commission Earnings",
    sortable: true,
    render: (value) => (
      <span style={{ color: "#0ea5e9", fontWeight: 500 }}>
        {formatCurrency(Number(value))}
      </span>
    ),
  },
  {
    key: "totalTips",
    header: "Total Tips",
    sortable: true,
    render: (value) => (
      <span style={{ color: "#2da86a", fontWeight: 500 }}>
        {formatCurrency(Number(value))}
      </span>
    ),
  },
  {
    key: "earnings",
    header: "Earnings",
    sortable: true,
    render: (value) => (
      <span style={{ color: "#d0166e", fontWeight: 700, fontSize: 15 }}>
        {formatCurrency(Number(value))}
      </span>
    ),
  },
];

interface PayrollTableProps {
  data: PayrollRow[];
  isLoading?: boolean;
  emptyMessage?: string;
}

export function PayrollTable({
  data,
  isLoading = false,
  emptyMessage = "No payroll records found for these filters.",
}: PayrollTableProps) {
  return (
    <div className='bg-white rounded-xl shadow-sm border border-gray-100'>
      <UniversalTable<PayrollRow>
        title='Payroll'
        data={data}
        columns={payrollColumns}
        pageSize={10}
        loading={isLoading}
        emptyMessage={emptyMessage}
      />
    </div>
  );
}
