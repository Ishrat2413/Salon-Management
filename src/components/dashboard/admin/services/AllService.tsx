"use client";

import React, { useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { AddServiceModal } from "./AddServiceModal";
import { ServiceItem } from "@/lib/api/services/service.service";

interface AllServicesProps {
  services: ServiceItem[];
  total: number;
  page: number;
  limit: number;
  isLoading: boolean;
  isMutating: boolean;
  onCreate: (payload: { name: string }) => Promise<void>;
  onUpdate: (serviceId: string, payload: { name: string }) => Promise<void>;
  onDelete: (serviceId: string) => Promise<void>;
  onPageChange: (nextPage: number) => void;
}

export function AllServices({
  services,
  total,
  page,
  limit,
  isLoading,
  isMutating,
  onCreate,
  onUpdate,
  onDelete,
  onPageChange,
}: AllServicesProps) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceItem | null>(
    null,
  );

  const totalPages = Math.max(1, Math.ceil(total / limit));

  const handleDelete = async (item: ServiceItem) => {
    const confirmed = window.confirm(`Delete service \"${item.name}\"?`);
    if (!confirmed) return;

    await onDelete(item.id);
  };

  return (
    <div
      className='w-full bg-white rounded-[24px] border border-white shadow-sm p-4 md:px-8 md:py-10'
      style={{ background: "#fff" }}>
      <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8'>
        <h1 className='text-[22px] font-semibold text-[#334c6e] leading-none'>
          All Services ({total})
        </h1>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className='flex items-center justify-center gap-2 h-10 px-5 bg-[#D83B8F] text-white text-[13px] font-medium rounded-[8px] hover:bg-[#C23580] transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D83B8F]/20'>
          <Plus className='w-4 h-4' />
          Add Service
        </button>
      </div>

      <div className='border border-[#f0f2f5] rounded-[12px] overflow-hidden bg-white'>
        <div className='px-6 py-4.5 border-b border-[#f0f2f5] bg-white grid grid-cols-[1fr_auto] gap-3'>
          <span className='text-[13px] font-semibold text-[#1f2937] tracking-wide'>
            Service Name
          </span>
          <span className='text-[13px] font-semibold text-[#1f2937] tracking-wide text-right'>
            Actions
          </span>
        </div>

        <div className='flex flex-col'>
          {isLoading ? (
            <div className='px-6 py-10 text-center text-[#9CA3AF] text-sm'>
              Loading services...
            </div>
          ) : services.length === 0 ? (
            <div className='px-6 py-10 text-center text-[#9CA3AF] text-sm'>
              No services found.
            </div>
          ) : (
            services.map((item, index) => {
              const isLast = index === services.length - 1;
              return (
                <div
                  key={item.id}
                  className={`px-6 py-3.5 bg-white grid grid-cols-[1fr_auto] gap-3 items-center ${!isLast ? "border-b border-[#f0f2f5]" : ""}`}>
                  <p className='text-[13px] font-medium text-[#5a6872] leading-none'>
                    {item.name}
                  </p>

                  <div className='flex items-center justify-end gap-2'>
                    <button
                      type='button'
                      onClick={() => setEditingService(item)}
                      className='h-8 w-8 rounded-md border border-[#E5E7EB] text-[#4B5563] hover:bg-[#F9FAFB] flex items-center justify-center'
                      aria-label='Edit service'>
                      <Pencil className='h-4 w-4' />
                    </button>
                    <button
                      type='button'
                      onClick={() => handleDelete(item)}
                      disabled={isMutating}
                      className='h-8 w-8 rounded-md border border-[#F3D6E6] text-[#D83B8F] hover:bg-[#FFF3FA] flex items-center justify-center disabled:opacity-60'
                      aria-label='Delete service'>
                      <Trash2 className='h-4 w-4' />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      <div className='mt-6 flex items-center justify-between'>
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

      <AddServiceModal
        key={`create-${String(isCreateModalOpen)}`}
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={async (payload) => {
          await onCreate(payload);
          setIsCreateModalOpen(false);
        }}
        mode='create'
        isSubmitting={isMutating}
      />

      <AddServiceModal
        key={`edit-${editingService?.id ?? "none"}-${String(Boolean(editingService))}`}
        isOpen={Boolean(editingService)}
        onClose={() => setEditingService(null)}
        onSubmit={async (payload) => {
          if (!editingService) return;
          await onUpdate(editingService.id, payload);
          setEditingService(null);
        }}
        mode='edit'
        initialName={editingService?.name ?? ""}
        isSubmitting={isMutating}
      />
    </div>
  );
}

export default AllServices;
