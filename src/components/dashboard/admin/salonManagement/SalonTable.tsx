"use client";

import React, { useState } from "react";
import { ActionDef, ColumnDef } from "@/components/univarsalTable/UnivarsalTable.type";
import UniversalTable from "@/components/univarsalTable/Universaltable";
import { EditSalonModal } from "./EditSalonModal";
import { AddSalonModal } from "./AddSalonModal";
import { Plus } from "lucide-react";
import { SalonItem } from "@/lib/api/services/salon.service";

function EditIcon() {
  return (
    <svg className='h-[15px] w-[15px]' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={1.8} strokeLinecap='round' strokeLinejoin='round'>
      <path d='M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7' />
      <path d='M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z' />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg className='h-[15px] w-[15px]' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={1.8} strokeLinecap='round' strokeLinejoin='round'>
      <polyline points='3 6 5 6 21 6' />
      <path d='M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6' />
      <path d='M10 11v6M14 11v6' />
      <path d='M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2' />
    </svg>
  );
}

const salonColumns: ColumnDef<SalonItem>[] = [
  {
    key: "name",
    header: "Salon Name",
    sortable: true,
    width: "220px",
    render: (value) => <span className='text-[13px] text-[#4B5563] font-normal'>{value as string}</span>,
  },
  {
    key: "address",
    header: "Address",
    render: (value) => <span className='text-[12px] text-[#9CA3AF] leading-[1.5]'>{value as string}</span>,
  },
  {
    key: "usersCount",
    header: "Employees/Managers",
    width: "170px",
    render: (_value, row) => (
      <span className='text-[13px] text-[#4B5563] font-medium'>{row._count?.users ?? 0}</span>
    ),
  },
];

interface SalonTableProps {
  data: SalonItem[];
  total: number;
  page: number;
  limit: number;
  isLoading: boolean;
  isMutating: boolean;
  onCreate: (payload: { name: string; address: string }) => Promise<void>;
  onUpdate: (salonId: string, payload: { name: string; address: string }) => Promise<void>;
  onDelete: (salonId: string) => Promise<void>;
  onPageChange: (nextPage: number) => void;
}

export function SalonTable({
  data,
  total,
  page,
  limit,
  isLoading,
  isMutating,
  onCreate,
  onUpdate,
  onDelete,
  onPageChange,
}: SalonTableProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedSalon, setSelectedSalon] = useState<SalonItem | null>(null);

  const totalPages = Math.max(1, Math.ceil(total / limit));

  const handleDelete = async (salon: SalonItem) => {
    const confirmed = window.confirm(`Delete salon \"${salon.name}\"?`);
    if (!confirmed) return;

    await onDelete(salon.id);
  };

  const salonActions: ActionDef<SalonItem>[] = [
    {
      label: "Edit",
      icon: (
        <span className='text-[#3B82F6] hover:text-[#2563EB]'>
          <EditIcon />
        </span>
      ),
      className: "ut-edit-btn",
      onClick: (row) => setSelectedSalon(row),
    },
    {
      label: "Delete",
      icon: (
        <span className='text-[#EF4444] hover:text-[#DC2626]'>
          <TrashIcon />
        </span>
      ),
      onClick: (row) => {
        void handleDelete(row);
      },
    },
  ];

  return (
    <div className='flex items-start justify-center'>
      <div className='w-full bg-white rounded-xl shadow border border-gray-100' style={{ minHeight: 300 }}>
        <div className='px-8 pt-8 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
          <h1 className='text-[22px] font-semibold text-[#1E3A5F]'>Salon Management ({total})</h1>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className='flex items-center justify-center gap-2 h-[40px] px-5 bg-[#D83B8F] text-white text-[13px] font-medium rounded-[8px] hover:bg-[#C23580] transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D83B8F]/20'>
            <Plus className='w-4 h-4' />
            Add Salon
          </button>
        </div>

        {isLoading ? (
          <div className='px-8 pb-8 text-sm text-[#9CA3AF]'>Loading salons...</div>
        ) : (
          <UniversalTable<SalonItem>
            data={data.map((item) => ({ ...item, usersCount: item._count?.users ?? 0 })) as any}
            columns={salonColumns as any}
            actions={salonActions as any}
            pageSize={limit}
            showPagination={false}
            emptyMessage='No salons found.'
          />
        )}

        <div className='px-8 py-5 flex items-center justify-between border-t border-[#F3F4F6]'>
          <p className='text-sm text-[#6B7280]'>
            Page {page} of {totalPages}
          </p>
          <div className='flex items-center gap-2'>
            <button
              type='button'
              onClick={() => onPageChange(page - 1)}
              disabled={page <= 1 || isLoading}
              className='h-9 px-4 rounded-md border border-[#E5E7EB] text-sm text-[#374151] disabled:opacity-50'>
              Previous
            </button>
            <button
              type='button'
              onClick={() => onPageChange(page + 1)}
              disabled={page >= totalPages || isLoading}
              className='h-9 px-4 rounded-md border border-[#E5E7EB] text-sm text-[#374151] disabled:opacity-50'>
              Next
            </button>
          </div>
        </div>
      </div>

      <AddSalonModal
        key={`create-${String(isAddModalOpen)}`}
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={async (payload) => {
          await onCreate(payload);
          setIsAddModalOpen(false);
        }}
        mode='create'
        isSubmitting={isMutating}
      />

      <EditSalonModal
        key={`edit-${selectedSalon?.id ?? "none"}-${String(Boolean(selectedSalon))}`}
        isOpen={Boolean(selectedSalon)}
        onClose={() => setSelectedSalon(null)}
        initialData={{
          name: selectedSalon?.name ?? "",
          address: selectedSalon?.address ?? "",
        }}
        onSave={async (payload) => {
          if (!selectedSalon) return;
          await onUpdate(selectedSalon.id, payload);
          setSelectedSalon(null);
        }}
        isSubmitting={isMutating}
      />
    </div>
  );
}

export default SalonTable;
