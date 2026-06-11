"use client";

import React from "react";
import { getRecentWeeks } from "./week-utils";
interface HistoryWeekSelectorProps {
  startDate?: string;
  endDate?: string;
  onWeekChange: (start: string, end: string) => void;
  className?: string;
  showOverall?: boolean;
}

export function HistoryWeekSelector({
  startDate,
  endDate,
  onWeekChange,
  className = "",
  showOverall = true,
}: HistoryWeekSelectorProps) {
  const recentWeeks = getRecentWeeks();
  const selectedWeekValue = `${startDate}_${endDate}`;
  const isPresetMatch = recentWeeks.some((w) => w.value === selectedWeekValue);

  const handleWeekChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (!val || val === "ALL") {
      onWeekChange("", "");
      return;
    }
    const [start, end] = val.split("_");
    onWeekChange(start, end);
  };

  return (
    <div className={`relative ${className}`}>
      <select
        value={!startDate && !endDate ? "ALL" : (isPresetMatch ? selectedWeekValue : "")}
        onChange={handleWeekChange}
        className="w-full bg-[#F3F3F5] border-transparent rounded-lg py-2 pl-4 pr-10 text-sm text-[#364153] appearance-none focus:ring-2 focus:ring-pink-500 focus:outline-none transition-all cursor-pointer"
      >
        <option value="" disabled>
          {startDate || endDate ? "Custom Date Range" : "Select a Week..."}
        </option>
        {showOverall && <option value="ALL">Overall</option>}
        {recentWeeks.map((week) => (
          <option key={week.value} value={week.value}>
            {week.label}
          </option>
        ))}
      </select>
...

      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <svg
          className="h-4 w-4 text-[#a0aec0]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}
