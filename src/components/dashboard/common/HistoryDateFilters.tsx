"use client";

import React from "react";
import { subWeeks, startOfWeek, endOfWeek } from "date-fns";
import { toZonedTime, format } from "date-fns-tz";

interface HistoryDateFiltersProps {
  filters: {
    startDate?: string;
    endDate?: string;
    status?: string;
  };
  setFilters: React.Dispatch<
    React.SetStateAction<any>
  >;
  children?: React.ReactNode;
}

export function HistoryDateFilters({
  filters,
  setFilters,
  children,
}: HistoryDateFiltersProps) {
  
  const nowInTexas = toZonedTime(new Date(), "America/Chicago");
  
  const recentWeeks = Array.from({ length: 15 }).map((_, i) => {
    const targetDate = subWeeks(nowInTexas, i);
    const start = startOfWeek(targetDate, { weekStartsOn: 1 });
    const end = endOfWeek(targetDate, { weekStartsOn: 1 });

    // The Date object is already shifted to match Texas local time, so we just format it directly.
    const startDate = format(start, "yyyy-MM-dd");
    const endDate = format(end, "yyyy-MM-dd");
    
    let baseLabel = "";
    if (i === 0) baseLabel = "This Week";
    else if (i === 1) baseLabel = "Last Week";
    else baseLabel = `${i} Weeks Ago`;
    
    const startLabel = format(start, "MMM d");
    const endLabel = format(end, "MMM d");
    const label = `${baseLabel} (${startLabel} - ${endLabel})`;

    return { label, value: `${startDate}_${endDate}`, startDate, endDate };
  });

  const handleWeekChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (!val) {
      setFilters((prev: any) => ({ ...prev, startDate: "", endDate: "" }));
      return;
    }
    const [start, end] = val.split("_");
    setFilters((prev: any) => ({ ...prev, startDate: start, endDate: end }));
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev: any) => ({ ...prev, startDate: e.target.value }));
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev: any) => ({ ...prev, endDate: e.target.value }));
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters((prev: any) => ({ ...prev, status: e.target.value }));
  };

  const selectedWeekValue = `${filters.startDate}_${filters.endDate}`;
  const isPresetMatch = recentWeeks.some(w => w.value === selectedWeekValue);

  return (
    <section className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
          Filter by Date & Status
        </h3>
        <div className="flex flex-wrap gap-2 relative">
          <select
            value={isPresetMatch ? selectedWeekValue : ""}
            onChange={handleWeekChange}
            className="bg-gray-50 border border-gray-100 rounded-lg py-2 px-4 pr-8 text-sm text-gray-800 focus:ring-2 focus:ring-[#D13C92] focus:outline-none transition-all appearance-none cursor-pointer"
          >
            <option value="" disabled>
              {filters.startDate || filters.endDate ? "Custom Date Range" : "Select a Week..."}
            </option>
            {recentWeeks.map((week) => (
              <option key={week.value} value={week.value}>
                {week.label}
              </option>
            ))}
          </select>
          <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
            <svg
              className='h-4 w-4 text-[#a0aec0]'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              viewBox='0 0 24 24'>
              <path d='M19 9l-7 7-7-7' strokeLinecap='round' strokeLinejoin='round' />
            </svg>
          </div>
        </div>
      </div>

      <div className={`grid grid-cols-1 md:grid-cols-3 ${children ? 'lg:grid-cols-5' : ''} gap-4`}>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-gray-500 ml-1">Status</label>
          <select
            value={filters.status || "APPROVED,PENDING"}
            onChange={handleStatusChange}
            className="w-full bg-gray-50 border border-gray-100 rounded-lg py-2.5 px-4 text-sm text-gray-800 appearance-none focus:ring-2 focus:ring-[#D13C92] focus:outline-none transition-all"
          >
            <option value="APPROVED,PENDING">All Status</option>
            <option value="APPROVED">Approved</option>
            <option value="PENDING">Pending</option>
          </select>
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-gray-500 ml-1">Start Date</label>
          <input
            type="date"
            value={filters.startDate || ""}
            onChange={handleStartDateChange}
            className="w-full bg-gray-50 border border-gray-100 rounded-lg py-2.5 px-4 text-sm text-gray-800 focus:ring-2 focus:ring-[#D13C92] focus:outline-none transition-all"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-gray-500 ml-1">End Date</label>
          <input
            type="date"
            value={filters.endDate || ""}
            onChange={handleEndDateChange}
            className="w-full bg-gray-50 border border-gray-100 rounded-lg py-2.5 px-4 text-sm text-gray-800 focus:ring-2 focus:ring-[#D13C92] focus:outline-none transition-all"
          />
        </div>
        {children}
      </div>
    </section>
  );
}
