"use client";

import {
  ActionDef,
  ColumnDef,
} from "@/components/univarsalTable/UnivarsalTable.type";
import UniversalTable from "@/components/univarsalTable/Universaltable";
import { SquarePen, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { EditServiceModal } from "./EditServiceModal";

export type ServiceEntry = {
  id: number;
  name: string;
  service: string;
  salon: string;
  price: number;
  tip: number;
  dateTime: string;
  status: "Approved" | "Pending Review" | "Corrections Made";
};

export const serviceData: ServiceEntry[] = [
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
      "Corrections Made": {
        bg: "#fef0f0",
        color: "#c0392b",
        label: "Corrections Made",
      },
    },
  },
];

export function ServiceEntriesTable({ data = serviceData }: { data?: ServiceEntry[] }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<ServiceEntry | null>(null);

  const handleEdit = (entry: ServiceEntry) => {
    setSelectedEntry(entry);
    setIsEditModalOpen(true);
  };

  const handleSave = (updatedEntry: ServiceEntry) => {
    // In a real application, you would perform an API call here
    // or update the parent state. For now, we simulate the save.
    console.log("Saving service entry:", updatedEntry);
  };

  const serviceAction: ActionDef<ServiceEntry>[] = [
    {
      label: "Edit",
      icon: (
        <span className="text-[#155DFC]">
          <SquarePen className="w-5 h-5" />
        </span>
      ),
      className: "ut-edit-btn",
      onClick: (row) => handleEdit(row),
    },
    {
      label: "Delete",
      icon: (
        <span style={{ color: "#e05252" }} className="text-[#155DFC]">
          <Trash2 className="w-5 h-5" />
        </span>
      ),
      onClick: (row) => alert(`Delete: ${row.name}`),
    },
  ];

  return (
    <>
      <UniversalTable<ServiceEntry>
        title='Service Entries'
        data={data}
        columns={serviceColumns}
        pageSize={10}
        actions={serviceAction}
      />

      <EditServiceModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        entry={selectedEntry}
        onSave={handleSave}
      />
    </>
  );
}
