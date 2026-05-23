import React from "react";

interface PayrollSummary {
  totalGroups: number;
  totalOccurrences: number;
  totalEarnings: number;
  totalTips: number;
}

interface PayrollCardProps {
  summary: PayrollSummary;
  isLoading?: boolean;
}

export default function PayrollCard({
  summary,
  isLoading = false,
}: PayrollCardProps) {
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    }).format(value || 0);

  return (
    <section className='grid grid-cols-1 md:grid-cols-3 gap-4'>
      <div className='rounded-xl border border-gray-100 bg-white p-4 shadow-sm'>
        <p className='text-sm text-gray-500'>Total Earnings</p>
        <p className='mt-2 text-2xl font-semibold text-pink-600'>
          {isLoading ? "—" : formatCurrency(summary?.totalEarnings ?? 0)}
        </p>
      </div>

      <div className='rounded-xl border border-gray-100 bg-white p-4 shadow-sm'>
        <p className='text-sm text-gray-500'>Total Tips</p>
        <p className='mt-2 text-2xl font-semibold text-green-600'>
          {isLoading ? "—" : formatCurrency(summary?.totalTips ?? 0)}
        </p>
      </div>

      <div className='rounded-xl border border-gray-100 bg-white p-4 shadow-sm'>
        <p className='text-sm text-gray-500'>Total Occurrences</p>
        <p className='mt-2 text-2xl font-semibold text-gray-800'>
          {isLoading ? "—" : String(summary?.totalOccurrences ?? 0)}
        </p>
      </div>
    </section>
  );
}
