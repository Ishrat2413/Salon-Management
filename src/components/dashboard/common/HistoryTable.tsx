"use client";

import React, { useMemo } from "react";
import { format } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
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
          render: (val, row) => `$${(isEmployee ? Number(row.loggedInUserTotalPrice || 0) : Number(val || 0)).toLocaleString()}`,
        },
        {
          key: "tips",
          header: "Tip",
          sortable: true,
          render: (val, row) => `$${(isEmployee ? Number(row.loggedInUserTips || 0) : Number(val || 0)).toLocaleString()}`,
        },
        {
          key: "commissionRate",
          header: "Commission Rate",
          sortable: true,
          render: (val, row) => {
            const rate = isEmployee ? row.loggedInUserCommissionRate : val;
            return rate !== undefined && rate !== null ? `${rate}%` : "N/A";
          },
        },
        {
          key: "commissionEarnings",
          header: "Calculated Earnings",
          sortable: true,
          render: (val, row) => {
            const earning = isEmployee ? Number(row.commissionEarnings || 0) : Number(val || 0);
            const tip = isEmployee ? Number(row.loggedInUserTips || 0) : Number(row.tips || 0);
            return `$${(earning + tip).toLocaleString()}`;
          },
        },
        {
          key: "status",
          header: "Status",
          sortable: true,
          statusMap: {
            APPROVED: {
              label: "Approved",
              bg: "#e8f8f0",
              color: "#1a7a4a",
              className: "font-medium",
            },
            PENDING: {
              label: "Pending",
              bg: "#fff8e6",
              color: "#b07d00",
              className: "font-medium",
            },
            REJECTED: {
              label: "Rejected",
              bg: "#fef0f0",
              color: "#c0392b",
              className: "font-medium",
            },
          },
        },
        {
          key: "createdAt",
          header: "Created Date",
          sortable: true,
          render: (val) => formatInTimeZone(new Date(val as string), "America/Chicago", "MMM d, yyyy h:mm a"),
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
        title='Work History'
        data={data}
        columns={columns}
        loading={isLoading}
        pageSize={10}
        emptyMessage='No history records found.'
      />
    </div>
  );
}
