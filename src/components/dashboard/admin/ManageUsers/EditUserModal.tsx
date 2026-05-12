"use client";

import React, { useEffect, useState } from "react";
import { User } from "./UsersTable";

// ─── Types ───────────────────────────────────────────────────────────────────

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  onSave: (updated: User) => void;
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

const selectBase =
  "w-full h-[38px] rounded-[6px] border border-[#E5E7EB] bg-white pl-3 pr-9 text-[13px] text-[#1F2937] shadow-sm outline-none appearance-none transition-all focus:border-[#D83B8F] focus:ring-2 focus:ring-[#D83B8F]/20 cursor-pointer";

function SelectField({
  id,
  value,
  onChange,
  options,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  options: { label: string; value: string }[];
}) {
  return (
    <div className='relative'>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={selectBase}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      {/* Custom chevron */}
      <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#9CA3AF]'>
        <svg
          className='h-4 w-4'
          fill='none'
          stroke='currentColor'
          strokeWidth={2}
          strokeLinecap='round'
          strokeLinejoin='round'
          viewBox='0 0 24 24'>
          <path d='M19 9l-7 7-7-7' />
        </svg>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function EditUserModal({
  isOpen,
  onClose,
  user,
  onSave,
}: EditUserModalProps) {
  const [form, setForm] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setForm({ ...user });
    } else {
      setForm(null);
    }
  }, [user, isOpen]);

  if (!isOpen || !form) return null;

  const set = (field: keyof User) => (value: any) =>
    setForm((prev) => (prev ? { ...prev, [field]: value } : null));

  const handleSave = async () => {
    if (!form) return;
    setLoading(true);
    // Simulate API delay
    await new Promise((r) => setTimeout(r, 600));
    onSave(form);
    setLoading(false);
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
              Edit User
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
              {/* Name */}
              <Field label='User Name'>
                <input
                  type='text'
                  id='name'
                  value={form.name}
                  onChange={(e) => set("name")(e.target.value)}
                  className={inputBase}
                />
              </Field>

              {/* Email */}
              <Field label='Email'>
                <input
                  type='email'
                  id='email'
                  value={form.email}
                  onChange={(e) => set("email")(e.target.value)}
                  className={inputBase}
                />
              </Field>

              {/* Role */}
              <Field label='Role'>
                <SelectField
                  id='role'
                  value={form.role}
                  onChange={set("role")}
                  options={[
                    { label: "Admin", value: "Admin" },
                    { label: "Manager", value: "Manager" },
                    { label: "Employee", value: "Employee" },
                  ]}
                />
              </Field>

              {/* Salon */}
              <Field label='Salon'>
                <input
                  type='text'
                  id='salon'
                  value={form.salon}
                  onChange={(e) => set("salon")(e.target.value)}
                  className={inputBase}
                />
              </Field>

              {/* Status */}
              <Field label='Status'>
                <SelectField
                  id='status'
                  value={form.status}
                  onChange={set("status")}
                  options={[
                    { label: "Active", value: "Active" },
                    { label: "Inactive", value: "Inactive" },
                  ]}
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
              onClick={handleSave}
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
                  Saving...
                </>
              ) : (
                "Save User"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
