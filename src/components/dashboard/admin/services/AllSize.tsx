"use client";

import React, { useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { AddSizeModal } from "./AddSizeModal";
import { SizeItem } from "@/lib/api/services/size.service";

interface AllSizesProps {
  sizes: SizeItem[];
  total: number;
  page: number;
  limit: number;
  isLoading: boolean;
  isMutating: boolean;
  onCreate: (payload: { name: string }) => Promise<void>;
  onUpdate: (sizeId: string, payload: { name: string }) => Promise<void>;
  onDelete: (sizeId: string) => Promise<void>;
  onPageChange: (nextPage: number) => void;
}

export function AllSizes({
  sizes,
  total,
  page,
  limit,
  isLoading,
  isMutating,
  onCreate,
  onUpdate,
  onDelete,
  onPageChange,
}: AllSizesProps) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingSize, setEditingSize] = useState<SizeItem | null>(
    null,
  );

  const totalPages = Math.max(1, Math.ceil(total / limit));

  const handleDelete = async (item: SizeItem) => {
    const confirmed = window.confirm(`Delete size \"${item.name}\"?`);
    if (!confirmed) return;

    await onDelete(item.id);
  };

  return (
    <div
      className='w-full bg-white rounded-[24px] border border-white shadow-sm p-4 md:px-8 md:py-10'
      style={{ background: "#fff" }}>
      <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8'>
        <h1 className='text-[22px] font-semibold text-[#334c6e] leading-none'>
          All Sizes ({total})
        </h1>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className='flex items-center justify-center gap-2 h-10 px-5 bg-[#D83B8F] text-white text-[13px] font-medium rounded-[8px] hover:bg-[#C23580] transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D83B8F]/20'>
          <Plus className='w-4 h-4' />
          Add Size
        </button>
      </div>

      <div className='border border-[#f0f2f5] rounded-[12px] overflow-hidden bg-white'>
        <div className='px-6 py-4.5 border-b border-[#f0f2f5] bg-white grid grid-cols-[1fr_auto] gap-3'>
          <span className='text-[13px] font-semibold text-[#1f2937] tracking-wide'>
            Size Name
          </span>
          <span className='text-[13px] font-semibold text-[#1f2937] tracking-wide text-right'>
            Actions
          </span>
        </div>

        <div className='flex flex-col'>
          {isLoading ? (
            <div className='px-6 py-10 text-center text-[#9CA3AF] text-sm'>
              Loading sizes...
            </div>
          ) : sizes.length === 0 ? (
            <div className='px-6 py-10 text-center text-[#9CA3AF] text-sm'>
              No sizes found.
            </div>
          ) : (
            sizes.map((item, index) => {
              const isLast = index === sizes.length - 1;
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
                      onClick={() => setEditingSize(item)}
                      className='h-8 w-8 rounded-md border border-[#E5E7EB] text-[#4B5563] hover:bg-[#F9FAFB] flex items-center justify-center'
                      aria-label='Edit size'>
                      <Pencil className='h-4 w-4' />
                    </button>
                    <button
                      type='button'
                      onClick={() => handleDelete(item)}
                      disabled={isMutating}
                      className='h-8 w-8 rounded-md border border-[#F3D6E6] text-[#D83B8F] hover:bg-[#FFF3FA] flex items-center justify-center disabled:opacity-60'
                      aria-label='Delete size'>
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

      <AddSizeModal
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

      <AddSizeModal
        key={`edit-${editingSize?.id ?? "none"}-${String(Boolean(editingSize))}`}
        isOpen={Boolean(editingSize)}
        onClose={() => setEditingSize(null)}
        onSubmit={async (payload) => {
          if (!editingSize) return;
          await onUpdate(editingSize.id, payload);
          setEditingSize(null);
        }}
        mode='edit'
        initialName={editingSize?.name ?? ""}
        isSubmitting={isMutating}
      />
    </div>
  );
}

export default AllSizes;
