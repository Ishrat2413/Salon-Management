"use client";

import React, { useState } from "react";

interface AddLengthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (payload: { name: string }) => Promise<void> | void;
  mode: "create" | "edit";
  initialName?: string;
  isSubmitting?: boolean;
}

interface FieldProps {
  label: string;
  children: React.ReactNode;
}

function Field({ label, children }: FieldProps) {
  return (
    <div className='flex flex-col gap-1.5'>
      <label className='text-[13px] font-medium leading-5 text-[#374151]'>{label}</label>
      {children}
    </div>
  );
}

const inputBase =
  "w-full h-[38px] rounded-[6px] border border-[#E5E7EB] bg-white px-3 text-[13px] text-[#1F2937] shadow-sm outline-none transition-all focus:border-[#D83B8F] focus:ring-2 focus:ring-[#D83B8F]/20 placeholder:text-[#9CA3AF]";

export function AddLengthModal({
  isOpen,
  onClose,
  onSubmit,
  mode,
  initialName = "",
  isSubmitting = false,
}: AddLengthModalProps) {
  const [name, setName] = useState(initialName);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    const trimmedName = name.trim();

    if (!trimmedName) {
      return;
    }

    await onSubmit({ name: trimmedName });
  };

  const title = mode === "create" ? "Add New Length" : "Update Length";
  const actionLabel = mode === "create" ? "Add Length" : "Update Length";

  return (
    <>
      <div className='fixed inset-0 z-40 bg-[#6B7280]/75 backdrop-blur-[2px]' onClick={onClose} />

      <div className='fixed inset-0 z-50 flex items-center justify-center px-4'>
        <div
          className='w-full max-w-135 rounded-[12px] bg-white shadow-[0_20px_25px_-5px_rgba(0,0,0,0.10),0_10px_10px_-5px_rgba(0,0,0,0.04)] overflow-hidden'
          onClick={(e) => e.stopPropagation()}>
          <div className='relative px-8 pt-8 pb-5'>
            <h2 className='text-[18px] font-semibold leading-7 text-[#111827]'>{title}</h2>
            <button
              onClick={onClose}
              aria-label='Close'
              className='absolute top-5.5 right-6 flex items-center justify-center text-[#9CA3AF] hover:text-[#6B7280] transition-colors focus:outline-none'>
              <svg className='h-5 w-5' fill='none' stroke='currentColor' strokeWidth={2} strokeLinecap='round' strokeLinejoin='round' viewBox='0 0 24 24'>
                <path d='M6 18L18 6M6 6l12 12' />
              </svg>
            </button>
          </div>

          <div className='px-8'>
            <hr className='border-t border-[#E5E7EB]' />
          </div>

          <div className='px-8 py-7'>
            <Field label='Length Name'>
              <input
                type='text'
                id='name'
                placeholder='Enter length name (e.g. Haircut)'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputBase}
              />
            </Field>
          </div>

          <div className='px-8 pb-8 flex justify-end gap-3'>
            <button
              type='button'
              onClick={onClose}
              disabled={isSubmitting}
              className='h-9.5 rounded-[6px] border border-[#D1D5DB] bg-white px-6 text-[13px] font-medium text-[#374151] shadow-sm hover:bg-[#F9FAFB] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D83B8F] disabled:opacity-60'>
              Cancel
            </button>
            <button
              type='button'
              onClick={handleSubmit}
              disabled={isSubmitting || name.trim().length < 2}
              className='h-9.5 rounded-[6px] bg-[#D83B8F] px-6 text-[13px] font-medium text-white shadow-sm hover:bg-[#C23580] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D83B8F] disabled:opacity-70 flex items-center gap-2'>
              {isSubmitting ? "Saving..." : actionLabel}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
