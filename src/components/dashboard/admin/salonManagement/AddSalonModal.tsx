"use client";

import React, { useState } from "react";
import { Salon } from "./SalonTable";

// ─── Types ───────────────────────────────────────────────────────────────────

interface AddSalonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (newSalon: Omit<Salon, "id" | "employees">) => void;
}

// ─── Reusable Field Components ────────────────────────────────────────────────

interface FieldProps {
  label: string;
  children: React.ReactNode;
}

function Field({ label, children }: FieldProps) {
  return (
    <div className='flex flex-col gap-[6px]'>
      <label className='text-[13px] font-medium leading-[20px] text-[#374151]'>
        {label}
      </label>
      {children}
    </div>
  );
}

const inputBase =
  "w-full h-[38px] rounded-[6px] border border-[#E5E7EB] bg-white px-3 text-[13px] text-[#1F2937] shadow-sm outline-none transition-all focus:border-[#D83B8F] focus:ring-2 focus:ring-[#D83B8F]/20 placeholder:text-[#9CA3AF]";

// ─── Main Component ───────────────────────────────────────────────────────────

export function AddSalonModal({
  isOpen,
  onClose,
  onAdd,
}: AddSalonModalProps) {
  const [form, setForm] = useState({
    salonName: "",
    managerName: "",
    address: "",
    totalEmployees: 0,
  });
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const set = (field: keyof typeof form) => (value: any) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleAdd = async () => {
    // Simple validation
    if (!form.salonName || !form.managerName) {
      alert("Please fill in the required fields.");
      return;
    }

    setLoading(true);
    // Simulate API delay
    await new Promise((r) => setTimeout(r, 600));
    onAdd(form);
    setLoading(false);
    // Reset form and close
    setForm({
      salonName: "",
      managerName: "",
      address: "",
      totalEmployees: 0,
    });
    onClose();
  };

  return (
    <>
      {/* ── Backdrop ── */}
      <div
        className='fixed inset-0 z-40 bg-[#6B7280]/75 backdrop-blur-[2px]'
        onClick={onClose}
      />

      {/* ── Modal ── */}
      <div className='fixed inset-0 z-50 flex items-center justify-center px-4'>
        <div
          className='w-full max-w-[840px] rounded-[12px] bg-white shadow-[0_20px_25px_-5px_rgba(0,0,0,0.10),0_10px_10px_-5px_rgba(0,0,0,0.04)] overflow-hidden'
          onClick={(e) => e.stopPropagation()}>
          {/* Header */}
          <div className='relative px-8 pt-8 pb-5'>
            <h2 className='text-[18px] font-semibold leading-[28px] text-[#111827]'>
              Add New Salon
            </h2>
            <button
              onClick={onClose}
              aria-label='Close'
              className='absolute top-[22px] right-6 flex items-center justify-center text-[#9CA3AF] hover:text-[#6B7280] transition-colors focus:outline-none'>
              <svg
                className='h-5 w-5'
                fill='none'
                stroke='currentColor'
                strokeWidth={2}
                strokeLinecap='round'
                strokeLinejoin='round'
                viewBox='0 0 24 24'>
                <path d='M6 18L18 6M6 6l12 12' />
              </svg>
            </button>
          </div>

          {/* Divider */}
          <div className='px-8'>
            <hr className='border-t border-[#E5E7EB]' />
          </div>

          {/* Form Body */}
          <div className='px-8 py-7'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6'>
              {/* Salon Name */}
              <Field label='Salon Name'>
                <input
                  type='text'
                  id='salonName'
                  placeholder='Enter salon name'
                  value={form.salonName}
                  onChange={(e) => set("salonName")(e.target.value)}
                  className={inputBase}
                />
              </Field>

              {/* Manager Name */}
              <Field label='Manager Name'>
                <input
                  type='text'
                  id='managerName'
                  placeholder='Enter manager name'
                  value={form.managerName}
                  onChange={(e) => set("managerName")(e.target.value)}
                  className={inputBase}
                />
              </Field>

              {/* Address */}
              <Field label='Address'>
                <input
                  type='text'
                  id='address'
                  placeholder='Enter salon address'
                  value={form.address}
                  onChange={(e) => set("address")(e.target.value)}
                  className={inputBase}
                />
              </Field>

              {/* Total Employees */}
              <Field label='Total Employees'>
                <input
                  type='number'
                  id='totalEmployees'
                  value={form.totalEmployees}
                  onChange={(e) => set("totalEmployees")(parseInt(e.target.value) || 0)}
                  className={inputBase}
                />
              </Field>
            </div>
          </div>

          {/* Footer */}
          <div className='px-8 pb-8 flex justify-end gap-3'>
            <button
              type='button'
              onClick={onClose}
              disabled={loading}
              className='h-[38px] rounded-[6px] border border-[#D1D5DB] bg-white px-6 text-[13px] font-medium text-[#374151] shadow-sm hover:bg-[#F9FAFB] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D83B8F] disabled:opacity-60'>
              Cancel
            </button>
            <button
              type='button'
              onClick={handleAdd}
              disabled={loading}
              className='h-[38px] rounded-[6px] bg-[#D83B8F] px-6 text-[13px] font-medium text-white shadow-sm hover:bg-[#C23580] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D83B8F] disabled:opacity-70 flex items-center gap-2'>
              {loading ? (
                <>
                  <svg
                    className='h-4 w-4 animate-spin'
                    viewBox='0 0 24 24'
                    fill='none'>
                    <circle
                      className='opacity-25'
                      cx='12'
                      cy='12'
                      r='10'
                      stroke='currentColor'
                      strokeWidth='4'
                    />
                    <path
                      className='opacity-75'
                      fill='currentColor'
                      d='M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z'
                    />
                  </svg>
                  Adding...
                </>
              ) : (
                "Add Salon"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
