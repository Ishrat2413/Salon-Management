"use client";

import React, { useMemo } from "react";
import { format } from "date-fns";
import UniversalTable from "@/components/univarsalTable/Universaltable";
import { ColumnDef } from "@/components/univarsalTable/UnivarsalTable.type";
import type { SalonEntry } from "@/actions/salon-entry/salon-entry.types";
import { useAuth } from "@/components/providers/auth-provider";

interface HistoryTableProps {
  data: SalonEntry[];
  isLoading?: boolean;
}

export function HistoryTable({ data, isLoading }: HistoryTableProps) {
  const { user } = useAuth();
  const isAdminOrManager = user?.role === "admin" || user?.role === "manager";
  const isEmployee = user?.role === "employee";

  const columns = useMemo<ColumnDef<SalonEntry>[]>(
    () => {
      const baseColumns: ColumnDef<SalonEntry>[] = [
        {
          key: "salonName",
          header: "Salon Name",
          sortable: true,
        },
      ];

      if (!isEmployee) {
        baseColumns.push({
          key: "employeeName",
          header: "Employee Name",
          sortable: true,
        });
      }

      baseColumns.push(
        {
          key: "serviceName",
          header: "Service Name",
          sortable: true,
        },
        {
          key: "clientName",
          header: "Client Name",
          sortable: true,
        }
      );

      if (isAdminOrManager) {
        baseColumns.push(
          {
            key: "totalPrice",
            header: "Total Price",
            sortable: true,
            render: (val) => `$${Number(val).toLocaleString()}`,
          },
          {
            key: "addHair",
            header: "Hair Price",
            sortable: true,
            render: (val) => `$${(Number(val) || 0).toLocaleString()}`,
          }
        );
      }

      baseColumns.push(
        {
          key: "actualPrice",
          header: "Actual Service Price",
          sortable: true,
          render: (val) => `$${(Number(val) || 0).toLocaleString()}`,
        },
        {
          key: "tips",
          header: "Tip",
          sortable: true,
          render: (val) => `$${(Number(val) || 0).toLocaleString()}`,
        },
        {
          key: "commissionRate",
          header: "Commission Rate",
          sortable: true,
          render: (val) => (val !== undefined && val !== null ? `${val}%` : "N/A"),
        },
        {
          key: "commissionEarnings",
          header: "Calculated Earnings",
          sortable: true,
          render: (val, row) => {
            const earning = Number(val) || 0;
            const tip = Number(row.tips) || 0;
            return `$${(earning + tip).toLocaleString()}`;
          },
        },
        {
          key: "status",
          header: "Status",
          sortable: true,
        },
        {
          key: "createdAt",
          header: "Created Date",
          sortable: true,
          render: (val) => format(new Date(val as string), "MMM d, yyyy"),
        },
        {
          key: "approvedByName",
          header: "Approved By",
          sortable: true,
          render: (val) => (val ? String(val) : "System"),
        }
      );

      return baseColumns;
    },
    [isAdminOrManager, isEmployee],
  );

  return (
    <div className='bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden'>
      <UniversalTable<SalonEntry>
        title='Work History (Approved)'
        data={data}
        columns={columns}
        loading={isLoading}
        pageSize={10}
        emptyMessage='No approved history records found.'
      />
    </div>
  );
}
