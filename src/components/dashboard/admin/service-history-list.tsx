"use client";

import React, { useMemo, useState } from "react";
import { format } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import UniversalTable from "@/components/univarsalTable/Universaltable";
import { ColumnDef } from "@/components/univarsalTable/UnivarsalTable.type";
import type { SalonEntry } from "@/actions/salon-entry/salon-entry.types";
import { EntryDetailsModal } from "./entry-details-modal";

interface ServiceHistoryListProps {
  entries: SalonEntry[];
  role: "admin" | "employee" | "manager";
  isLoading?: boolean;
}

export function ServiceHistoryList({
  entries,
  role,
  isLoading,
}: ServiceHistoryListProps) {
  const [selectedEntry, setSelectedEntry] = useState<SalonEntry | null>(null);

  const columns = useMemo<ColumnDef<SalonEntry>[]>(() => {
    return [
      {
        key: "salonName",
        header: "Salon Name",
        sortable: true,
      },
      {
        key: "serviceName",
        header: "Service Name",
        sortable: true,
      },
      {
        key: "clientName",
        header: "Client Name",
        sortable: true,
      },
      {
        key: "actualPrice",
        header: "Service Price",
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
        key: "createdAt",
        header: "Created Date",
        sortable: true,
        render: (val) =>
          formatInTimeZone(
            new Date(val as string),
            "America/Chicago",
            "MMM d, yyyy h:mm a",
          ),
      },
      // {
      //   key: "approvedByName",
      //   header: "Approved By",
      //   sortable: true,
      //   render: (val) => (val ? String(val) : "System"),
      // },
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
        },
      },
      {
        key: "id",
        header: "Actions",
        sortable: false,
        render: (_, row) => (
          <button
            onClick={() => setSelectedEntry(row as SalonEntry)}
            className='text-sm font-medium text-[#D13C92] hover:underline whitespace-nowrap inline-flex items-center gap-1'>
            View Details
          </button>
        ),
      },
    ];
  }, []);

  return (
    <>
      <div className='bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden'>
        <UniversalTable<SalonEntry>
          title='Work History'
          data={entries}
          columns={columns}
          loading={isLoading}
          pageSize={10}
          emptyMessage='No approved history records found.'
        />
      </div>

      <EntryDetailsModal
        isOpen={!!selectedEntry}
        onClose={() => setSelectedEntry(null)}
        entry={selectedEntry}
      />
    </>
  );
}
