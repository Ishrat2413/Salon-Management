"use client";

import { useState } from "react";
import type { ReviewEntry } from "./review-entries";

type ManagerEditModalProps = {
  open: boolean;
  onClose: () => void;
  row: ReviewEntry;
};

export function ManagerEditModal({
  open,
  onClose,
  row,
}: ManagerEditModalProps) {
  if (!open) return null;

  return <EditEntryForm row={row} onClose={onClose} />;
}

function EditEntryForm({
  row,
  onClose,
}: {
  row: ReviewEntry;
  onClose: () => void;
}) {
  const [employee, setEmployee] = useState(row.employee);
  const [service, setService] = useState(row.service);
  const [percentage, setPercentage] = useState(row.percentage || "");
  const [amount, setAmount] = useState(String(row.amount));
  const [tip, setTip] = useState(String(row.tip));

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-50'>
      <div className='max-h-112 w-full max-w-4xl overflow-y-auto rounded-lg bg-white p-6 shadow-lg mx-3'>
        <div className='mb-6 flex items-center justify-between'>
          <h3 className='text-lg font-semibold text-gray-900'>Edit Entry</h3>
          <button
            type='button'
            onClick={onClose}
            className='text-gray-400 hover:text-gray-600'>
            ✕
          </button>
        </div>
        <div className='mb-6 grid grid-cols-2 gap-6 text-start'>
          <div>
            <label className='mb-2 block text-sm font-medium text-gray-700'>
              Braider name
            </label>
            <input
              type='text'
              value={employee}
              onChange={(e) => setEmployee(e.target.value)}
              className='w-full rounded-lg border border-gray-300 p-2 focus:border-pink-500 focus:outline-none'
            />
          </div>
          <div>
            <label className='mb-2 block text-sm font-medium text-gray-700'>
              Service name
            </label>
            <input
              type='text'
              value={service}
              onChange={(e) => setEmployee(e.target.value)}
              className='w-full rounded-lg border border-gray-300 p-2 focus:border-pink-500 focus:outline-none'
            />
          </div>
          <div>
            <label className='mb-2 block text-sm font-medium text-gray-700'>
              Add split Percentage
            </label>
            <input
              type='text'
              value={percentage}
              onChange={(e) => setPercentage(e.target.value)}
              className='w-full rounded-lg border border-gray-300 p-2 focus:border-pink-500 focus:outline-none'
            />
          </div>
          <div>
            <label className='mb-2 block text-sm font-medium text-gray-700'>
              Total Service price
            </label>
            <input
              type='number'
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className='w-full rounded-lg border border-gray-300 p-2 focus:border-pink-500 focus:outline-none'
            />
          </div>
          <div>
            <label className='mb-2 block text-sm font-medium text-gray-700'>
              Tip (Optional)
            </label>
            <input
              type='number'
              value={tip}
              onChange={(e) => setTip(e.target.value)}
              className='w-full rounded-lg border border-gray-300 p-2 focus:border-pink-500 focus:outline-none'
            />
          </div>
        </div>
        <div className='flex justify-end gap-3'>
          <button
            type='button'
            onClick={onClose}
            className='rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100'>
            Cancel
          </button>
          <button
            type='button'
            onClick={() => {
              console.log("Entry saved:", {
                id: row.id,
                employee,
                percentage,
                amount,
                tip,
              });
              onClose();
            }}
            className='rounded-lg bg-pink-600 px-4 py-2 text-white hover:bg-pink-700'>
            Save Entry
          </button>
        </div>
      </div>
    </div>
  );
}
