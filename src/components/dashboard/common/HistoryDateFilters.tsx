"use client";

import React from "react";
import { format, startOfWeek, endOfWeek, subWeeks, startOfMonth, endOfMonth } from "date-fns";

interface HistoryDateFiltersProps {
  filters: {
    startDate?: string;
    endDate?: string;
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
  
  const presets = [
    {
      label: "This Week",
      getRange: () => ({
        startDate: format(startOfWeek(new Date(), { weekStartsOn: 1 }), "yyyy-MM-dd"),
        endDate: format(endOfWeek(new Date(), { weekStartsOn: 1 }), "yyyy-MM-dd"),
      }),
    },
    {
      label: "Last Week",
      getRange: () => {
        const lastWeek = subWeeks(new Date(), 1);
        return {
          startDate: format(startOfWeek(lastWeek, { weekStartsOn: 1 }), "yyyy-MM-dd"),
          endDate: format(endOfWeek(lastWeek, { weekStartsOn: 1 }), "yyyy-MM-dd"),
        };
      },
    },
    {
      label: "This Month",
      getRange: () => ({
        startDate: format(startOfMonth(new Date()), "yyyy-MM-dd"),
        endDate: format(endOfMonth(new Date()), "yyyy-MM-dd"),
      }),
    },
  ];

  const handlePresetClick = (getRange: () => { startDate: string; endDate: string }) => {
    const range = getRange();
    setFilters((prev: any) => ({ ...prev, ...range }));
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev: any) => ({ ...prev, startDate: e.target.value }));
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev: any) => ({ ...prev, endDate: e.target.value }));
  };

  const clearFilters = () => {
    setFilters((prev: any) => ({ ...prev, startDate: "", endDate: "" }));
  };

  const isActive = (getRange: () => { startDate: string; endDate: string }) => {
    const range = getRange();
    return filters.startDate === range.startDate && filters.endDate === range.endDate;
  };

  return (
    <section className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
          Filter by Date Range
        </h3>
        <div className="flex flex-wrap gap-2">
          {presets.map((preset) => {
            const active = isActive(preset.getRange);
            return (
              <button
                key={preset.label}
                type="button"
                onClick={() => handlePresetClick(preset.getRange)}
                className={`px-4 py-2 text-xs font-medium rounded-full transition-all border ${
                  active
                    ? "bg-[#D13C92] text-white border-[#D13C92] shadow-md scale-105"
                    : "bg-pink-50 text-pink-600 border-pink-100 hover:bg-pink-100"
                }`}
              >
                {preset.label}
              </button>
            );
          })}
          {(filters.startDate || filters.endDate) && (
            <button
              type="button"
              onClick={clearFilters}
              className="px-4 py-2 text-xs font-medium rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors border border-gray-200"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      <div className={`grid grid-cols-1 md:grid-cols-2 ${children ? 'lg:grid-cols-4' : ''} gap-4`}>
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
