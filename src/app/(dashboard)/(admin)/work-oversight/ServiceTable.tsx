"use client";
import { ColumnDef } from "@/components/univarsalTable/UnivarsalTable.type";
import UniversalTable from "@/components/univarsalTable/Universaltable";

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
