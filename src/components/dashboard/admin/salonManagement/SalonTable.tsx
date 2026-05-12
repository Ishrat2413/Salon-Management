"use client";

import React, { useState } from "react";
import {
  ActionDef,
  ColumnDef,
} from "@/components/univarsalTable/UnivarsalTable.type";
import UniversalTable from "@/components/univarsalTable/Universaltable";
import { EditSalonModal } from "./EditSalonModal";
import { AddSalonModal } from "./AddSalonModal";
import { AddManagerModal } from "./AddManagerModal";
import { Plus, UserPlus } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type Employee = {
  avatar: string;
  name: string;
};

export type Salon = {
  id: number;
  salonName: string;
  managerName: string;
  employees: Employee[];
  totalEmployees: number;
  address: string;
};

// ─── Avatar Stack Component ───────────────────────────────────────────────────

function AvatarStack({
  employees,
  total,
}: {
  employees: Employee[];
  total: number;
}) {
  const extra = total - employees.length;

  return (
    <div className='flex items-center gap-2'>
      {/* Overlapping avatars */}
      <div className='flex -space-x-2'>
        {employees.map((emp, i) => (
          <img
            key={i}
            src={emp.avatar}
            alt={emp.name}
            title={emp.name}
            className='inline-block h-7 w-7 rounded-full ring-2 ring-white object-cover'
          />
        ))}
        {extra > 0 && (
          <div className='inline-flex items-center justify-center h-7 w-7 rounded-full ring-2 ring-white bg-[#F3F4F6] text-[10px] font-semibold text-[#6B7280]'>
            +{extra > 9 ? 9 : extra}
          </div>
        )}
      </div>
      {/* Total count */}
      <span className='text-xs text-[#9CA3AF]'>{total}+</span>
    </div>
  );
}

// ─── Edit & Delete Icons ──────────────────────────────────────────────────────

function EditIcon() {
  return (
    <svg
      className='h-[15px] w-[15px]'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth={1.8}
      strokeLinecap='round'
      strokeLinejoin='round'>
      <path d='M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7' />
      <path d='M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z' />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg
      className='h-[15px] w-[15px]'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth={1.8}
      strokeLinecap='round'
      strokeLinejoin='round'>
      <polyline points='3 6 5 6 21 6' />
      <path d='M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6' />
      <path d='M10 11v6M14 11v6' />
      <path d='M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2' />
    </svg>
  );
}

// ─── Column Definitions ───────────────────────────────────────────────────────

const salonColumns: ColumnDef<Salon>[] = [
  {
    key: "salonName",
    header: "Salon Name",
    sortable: true,
    width: "180px",
    render: (value) => (
      <span className='text-[13px] text-[#4B5563] font-normal'>
        {value as string}
      </span>
    ),
  },
  {
    key: "managerName",
    header: "Manager Name",
    width: "180px",
    render: (value) => (
      <span className='text-[13px] text-[#4B5563]'>{value as string}</span>
    ),
  },
  {
    key: "employees",
    header: "Employee",
    width: "200px",
    render: (value, row) => (
      <AvatarStack
        employees={row.employees as Employee[]}
        total={row.totalEmployees as number}
      />
    ),
  },
  {
    key: "address",
    header: "Address",
    render: (value) => (
      <span className='text-[12px] text-[#9CA3AF] leading-[1.5]'>
        {value as string}
      </span>
    ),
  },
];

// ─── Main Export ──────────────────────────────────────────────────────────────

interface SalonTableProps {
  data: Salon[];
}

export function SalonTable({ data }: SalonTableProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAddManagerModalOpen, setIsAddManagerModalOpen] = useState(false);
  const [selectedSalon, setSelectedSalon] = useState<Salon | null>(null);

  // Extract unique salon names for manager assignment
  const salonNames = Array.from(new Set(data.map((s) => s.salonName)));

  const handleEdit = (salon: Salon) => {
    setSelectedSalon(salon);
    setIsEditModalOpen(true);
  };

  const handleSave = (updatedSalon: Salon) => {
    // Logic for saving (usually parent state update or API call)
    console.log("Saving salon:", updatedSalon);
  };

  const handleAdd = (newSalon: Omit<Salon, "id" | "employees">) => {
    // Logic for adding (usually parent state update or API call)
    console.log("Adding new salon:", newSalon);
  };

  const handleAddManager = (newManager: any) => {
    // Logic for adding manager (usually parent state update or API call)
    console.log("Adding new manager:", newManager);
  };

  const salonActions: ActionDef<Salon>[] = [
    {
      label: "Edit",
      icon: (
        <span className='text-[#3B82F6] hover:text-[#2563EB]'>
          <EditIcon />
        </span>
      ),
      className: "ut-edit-btn",
      onClick: (row) => handleEdit(row),
    },
    {
      label: "Delete",
      icon: (
        <span className='text-[#EF4444] hover:text-[#DC2626]'>
          <TrashIcon />
        </span>
      ),
      onClick: (row) => alert(`Delete: ${row.salonName}`),
    },
  ];

  return (
    <div className='flex items-start justify-center'>
      <div
        className='w-full bg-white rounded-xl shadow border border-gray-100'
        style={{ minHeight: 300 }}>
        {/* Page Header */}
        <div className='px-8 pt-8 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
          <h1 className='text-[22px] font-semibold text-[#1E3A5F]'>
            Salon Management
          </h1>
          <div className='flex items-center gap-3'>
            <button
              onClick={() => setIsAddManagerModalOpen(true)}
              className='flex items-center justify-center gap-2 h-[40px] px-5 bg-white border border-[#D1D5DB] text-[#374151] text-[13px] font-medium rounded-[8px] hover:bg-[#F9FAFB] transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D83B8F]/20'>
              <UserPlus className='w-4 h-4 text-[#6B7280]' />
              Add Manager
            </button>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className='flex items-center justify-center gap-2 h-[40px] px-5 bg-[#D83B8F] text-white text-[13px] font-medium rounded-[8px] hover:bg-[#C23580] transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D83B8F]/20'>
              <Plus className='w-4 h-4' />
              Add Salon
            </button>
          </div>
        </div>

        {/* Universal Table */}
        <UniversalTable<Salon>
          data={data}
          columns={salonColumns}
          actions={salonActions}
          pageSize={10}
          showPagination={true}
          emptyMessage='No salons found.'
        />
      </div>

      <EditSalonModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        salon={selectedSalon}
        onSave={handleSave}
      />

      <AddSalonModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAdd}
      />

      <AddManagerModal
        isOpen={isAddManagerModalOpen}
        onClose={() => setIsAddManagerModalOpen(false)}
        onAdd={handleAddManager}
        salons={salonNames}
      />
    </div>
  );
}

export default SalonTable;
