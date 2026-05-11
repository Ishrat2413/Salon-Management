import React from "react";

export default function EmployeeDashboard() {
  return (
    <section className='min-h-screen text-brand-textPrimary'>
      <div className='mx-auto max-w-5xl space-y-6 p-8'>
        <div className='rounded-2xl border border-gray-200 bg-white p-6 shadow-sm'>
          <p className='text-sm font-medium text-gray-500'>
            Employee Dashboard
          </p>
          <h1 className='mt-2 text-2xl font-semibold text-gray-900'>
            Your daily schedule and entry status
          </h1>
          <p className='mt-3 text-sm text-gray-600'>
            Use this space for employee-specific actions like adding entries,
            checking history, and reviewing today&apos;s work.
          </p>
        </div>
      </div>
    </section>
  );
}
