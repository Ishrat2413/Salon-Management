"use client";

import React, { useState } from "react";

interface AddSalonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (payload: { name: string; address: string }) => Promise<void> | void;
  mode: "create" | "edit";
  initialData?: { name: string; address: string };
  isSubmitting?: boolean;
}

interface FieldProps {
  label: string;
  children: React.ReactNode;
}

function Field({ label, children }: FieldProps) {
  return (
    <div className='flex flex-col gap-[6px]'>
      <label className='text-[13px] font-medium leading-[20px] text-[#374151]'>{label}</label>
      {children}
    </div>
  );
}

const inputBase =
  "w-full h-[38px] rounded-[6px] border border-[#E5E7EB] bg-white px-3 text-[13px] text-[#1F2937] shadow-sm outline-none transition-all focus:border-[#D83B8F] focus:ring-2 focus:ring-[#D83B8F]/20 placeholder:text-[#9CA3AF]";

export function AddSalonModal({
  isOpen,
  onClose,
  onSubmit,
  mode,
  initialData,
  isSubmitting = false,
}: AddSalonModalProps) {
  const [name, setName] = useState(initialData?.name ?? "");
  const [address, setAddress] = useState(initialData?.address ?? "");

  if (!isOpen) return null;

  const handleSubmit = async () => {
    const trimmedName = name.trim();
    const trimmedAddress = address.trim();

    if (trimmedName.length < 2 || trimmedAddress.length < 5) {
      return;
    }

    await onSubmit({ name: trimmedName, address: trimmedAddress });
  };

  const title = mode === "create" ? "Add New Salon" : "Update Salon";
  const actionLabel = mode === "create" ? "Add Salon" : "Update Salon";

  return (
    <>
      <div className='fixed inset-0 z-40 bg-[#6B7280]/75 backdrop-blur-[2px]' onClick={onClose} />

      <div className='fixed inset-0 z-50 flex items-center justify-center px-4'>
        <div
          className='w-full max-w-[840px] rounded-[12px] bg-white shadow-[0_20px_25px_-5px_rgba(0,0,0,0.10),0_10px_10px_-5px_rgba(0,0,0,0.04)] overflow-hidden'
          onClick={(e) => e.stopPropagation()}>
          <div className='relative px-8 pt-8 pb-5'>
            <h2 className='text-[18px] font-semibold leading-[28px] text-[#111827]'>{title}</h2>
            <button
              onClick={onClose}
              aria-label='Close'
              className='absolute top-[22px] right-6 flex items-center justify-center text-[#9CA3AF] hover:text-[#6B7280] transition-colors focus:outline-none'>
              <svg className='h-5 w-5' fill='none' stroke='currentColor' strokeWidth={2} strokeLinecap='round' strokeLinejoin='round' viewBox='0 0 24 24'>
                <path d='M6 18L18 6M6 6l12 12' />
              </svg>
            </button>
          </div>

          <div className='px-8'>
            <hr className='border-t border-[#E5E7EB]' />
          </div>

          <div className='px-8 py-7'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6'>
              <Field label='Salon Name'>
                <input
                  type='text'
                  id='salonName'
                  placeholder='Enter salon name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputBase}
                />
              </Field>

              <Field label='Address'>
                <input
                  type='text'
                  id='address'
                  placeholder='Enter salon address'
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className={inputBase}
                />
              </Field>
            </div>
          </div>

          <div className='px-8 pb-8 flex justify-end gap-3'>
            <button
              type='button'
              onClick={onClose}
              disabled={isSubmitting}
              className='h-[38px] rounded-[6px] border border-[#D1D5DB] bg-white px-6 text-[13px] font-medium text-[#374151] shadow-sm hover:bg-[#F9FAFB] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D83B8F] disabled:opacity-60'>
              Cancel
            </button>
            <button
              type='button'
              onClick={handleSubmit}
              disabled={isSubmitting || name.trim().length < 2 || address.trim().length < 5}
              className='h-[38px] rounded-[6px] bg-[#D83B8F] px-6 text-[13px] font-medium text-white shadow-sm hover:bg-[#C23580] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D83B8F] disabled:opacity-70 flex items-center gap-2'>
              {isSubmitting ? "Saving..." : actionLabel}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
