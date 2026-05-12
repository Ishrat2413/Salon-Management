"use client";

import React, { useEffect, useState } from "react";
import { ServiceEntry } from "./ServiceTable";

// ─── Types ────────────────────────────────────────────────────────────────────

interface EditServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  entry?: ServiceEntry | null;
  onSave: (updated: ServiceEntry) => void;
}

// ─── Shared Primitives ────────────────────────────────────────────────────────

const inputCls =
  "w-full h-[38px] rounded-[6px] border border-[#E5E7EB] bg-white px-3 text-[13px] text-[#1F2937] shadow-sm outline-none transition-all focus:border-[#D83B8F] focus:ring-2 focus:ring-[#D83B8F]/20 placeholder:text-[#9CA3AF]";

const selectCls =
  "w-full h-[38px] rounded-[6px] border border-[#E5E7EB] bg-white pl-3 pr-9 text-[13px] text-[#1F2937] shadow-sm outline-none appearance-none transition-all focus:border-[#D83B8F] focus:ring-2 focus:ring-[#D83B8F]/20 cursor-pointer";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className='flex flex-col gap-[6px]'>
      <label className='text-[13px] font-medium leading-[20px] text-[#374151]'>
        {label}
      </label>
      {children}
    </div>
  );
}

function ChevronDown() {
  return (
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
  );
}

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
        className={selectCls}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#9CA3AF]'>
        <ChevronDown />
      </div>
    </div>
  );
}

// ─── Default Seed Data ────────────────────────────────────────────────────────

const defaultEntry: ServiceEntry = {
  id: 0,
  name: "Sarah Johnson",
  service: "Box Braids",
  salon: "Glam Studio",
  status: "Approved",
  price: 12.0,
  tip: 2.0,
  dateTime: "2024-06-15 10:30 AM",
};

// ─── Main Modal ───────────────────────────────────────────────────────────────

export function EditServiceModal({
  isOpen,
  onClose,
  entry,
  onSave,
}: EditServiceModalProps) {
  const [form, setForm] = useState<ServiceEntry>(entry ?? defaultEntry);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (entry) setForm({ ...entry });
  }, [entry, isOpen]);

  if (!isOpen) return null;

  const set =
    <K extends keyof ServiceEntry>(field: K) =>
    (value: ServiceEntry[K]) =>
      setForm((prev) => ({ ...prev, [field]: value }));

  const handleSave = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    onSave(form);
    setLoading(false);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className='fixed inset-0 z-40 bg-[#6B7280]/75 backdrop-blur-[2px]'
        onClick={onClose}
      />

      {/* Modal */}
      <div className='fixed inset-0 z-50 flex items-center justify-center px-4'>
        <div
          className='w-full max-w-[840px] rounded-[12px] bg-white shadow-[0_20px_25px_-5px_rgba(0,0,0,0.10),0_10px_10px_-5px_rgba(0,0,0,0.04)] overflow-hidden'
          onClick={(e) => e.stopPropagation()}>
          {/* ── Header ── */}
          <div className='relative px-8 pt-8 pb-5'>
            <h2 className='text-[18px] font-semibold leading-[28px] text-[#111827]'>
              Edit Entry
            </h2>
            <button
              onClick={onClose}
              aria-label='Close'
              className='absolute top-[22px] right-6 text-[#9CA3AF] hover:text-[#6B7280] transition-colors focus:outline-none'>
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

          {/* ── Body ── */}
          <div className='px-8 py-7'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6'>
              {/* Employee Name */}
              <Field label='Employee Name'>
                <input
                  id='name'
                  type='text'
                  value={form.name}
                  onChange={(e) => set("name")(e.target.value)}
                  className={inputCls}
                />
              </Field>

              {/* Service Type */}
              <Field label='Service Type'>
                <input
                  id='service'
                  type='text'
                  value={form.service}
                  onChange={(e) => set("service")(e.target.value)}
                  className={inputCls}
                />
              </Field>

              {/* Salon */}
              <Field label='Salon'>
                <SelectField
                  id='salon'
                  value={form.salon}
                  onChange={set("salon")}
                  options={[
                    { label: "Glam Studio", value: "Glam Studio" },
                    { label: "Style Lounge", value: "Style Lounge" },
                    { label: "Beauty Bar", value: "Beauty Bar" },
                  ]}
                />
              </Field>

              {/* Status */}
              <Field label='Status'>
                <SelectField
                  id='status'
                  value={form.status}
                  onChange={set("status") as (v: string) => void}
                  options={[
                    { label: "Approved", value: "Approved" },
                    { label: "Pending Review", value: "Pending Review" },
                    { label: "Corrections Made", value: "Corrections Made" },
                  ]}
                />
              </Field>

              {/* Price */}
              <Field label='Price ($)'>
                <input
                  id='price'
                  type='number'
                  min={0}
                  step={0.01}
                  value={form.price}
                  onChange={(e) =>
                    set("price")(parseFloat(e.target.value) || 0)
                  }
                  className={inputCls}
                />
              </Field>

              {/* Tip */}
              <Field label='Tip ($)'>
                <input
                  id='tip'
                  type='number'
                  min={0}
                  step={0.01}
                  value={form.tip}
                  onChange={(e) => set("tip")(parseFloat(e.target.value) || 0)}
                  className={inputCls}
                />
              </Field>

              {/* Date & Time — full width */}
              <div className='md:col-span-2'>
                <Field label='Date & Time'>
                  <input
                    id='dateTime'
                    type='text'
                    value={form.dateTime}
                    onChange={(e) => set("dateTime")(e.target.value)}
                    placeholder='YYYY-MM-DD HH:MM AM/PM'
                    className={inputCls}
                  />
                </Field>
              </div>
            </div>
          </div>

          {/* ── Footer ── */}
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
                  Updating...
                </>
              ) : (
                "Update Entry"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Demo Wrapper (remove in production) ─────────────────────────────────────

export default function EditServiceModalDemo() {
  const [open, setOpen] = useState(true);

  return (
    <div className='min-h-screen bg-[#6B7280] flex items-center justify-center'>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className='px-4 py-2 bg-white rounded text-sm font-medium'>
          Open Modal
        </button>
      )}
      <EditServiceModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onSave={(data) => {
          console.log("Saved:", data);
          setOpen(false);
        }}
      />
    </div>
  );
}
