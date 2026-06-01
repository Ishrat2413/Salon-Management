"use client";

import React, { useState, useEffect } from "react";
import { startOfWeek, endOfWeek } from "date-fns";
import { toZonedTime, format } from "date-fns-tz";
import { HistoryFilters } from "./history-filters";
import { ServiceHistoryList } from "./service-history-list";
import { useAuth } from "@/components/providers/auth-provider";
import { useSalonEntriesQuery } from "@/actions/salon-entry/useSalonEntry";
import { HistoryDateFilters } from "../common/HistoryDateFilters";
import { Loader2 } from "lucide-react";

export function AdminHistory() {
  const { user } = useAuth();

  // Default to current week: Monday to Sunday in Texas (America/Chicago)
  const nowInTexas = toZonedTime(new Date(), "America/Chicago");
  const defaultStartDate = format(startOfWeek(nowInTexas, { weekStartsOn: 1 }), "yyyy-MM-dd", { timeZone: "America/Chicago" });
  const defaultEndDate = format(endOfWeek(nowInTexas, { weekStartsOn: 1 }), "yyyy-MM-dd", { timeZone: "America/Chicago" });

  const [filters, setFilters] = useState<{
    startDate?: string;
    endDate?: string;
    employeeId?: string;
    salonId?: string;
    status?: string;
  }>({ 
    status: "APPROVED",
    startDate: defaultStartDate,
    endDate: defaultEndDate,
  });

  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setSearchTerm(searchInput.trim());
    }, 300);

    return () => window.clearTimeout(timeoutId);
  }, [searchInput]);
  
  const limit = 1000;

  const { data, isLoading, isFetching } = useSalonEntriesQuery({
    page: 1,
    limit,
    searchTerm,
    ...filters,
  });

  const role = user?.role || "admin";

  const summaryData = {
    totalRevenue: data?.meta?.totalPrices || 0,
    totalCommissionPaid: data?.meta?.totalCommissionEarnings || 0,
    totalTips: data?.meta?.totalTips || 0,
  };

  return (
    <div className="bg-[#fef8f8] min-h-[calc(100vh-4rem)] p-4 sm:p-8 text-gray-800 -mx-4 -my-6 sm:-mx-6 sm:-my-6 lg:-mx-8 lg:-my-8 relative">
      {/* Absolute positioned spinner to prevent layout shift */}
      <div className={`fixed top-20 right-8 z-60 transition-opacity duration-300 ${isFetching ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="bg-white/80 backdrop-blur-sm shadow-lg rounded-full p-2 border border-pink-100">
           <Loader2 className="h-5 w-5 animate-spin text-[#D13C92]" />
        </div>
      </div>

      <div className="mx-auto space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-start space-x-4">
            <div className="w-12 h-12 rounded-full bg-pink-50 flex items-center justify-center text-[#D13C92] shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="1" x2="12" y2="23"></line>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Gross Service Revenue</h3>
              <p className="text-2xl font-bold text-gray-800 mt-1 transition-all">
                {isLoading && !data ? "..." : `$${summaryData.totalRevenue.toLocaleString()}`}
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-start space-x-4">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="6" width="20" height="12" rx="2"></rect>
                <circle cx="12" cy="12" r="2"></circle>
                <path d="M6 12h.01M18 12h.01"></path>
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Commission Paid Out</h3>
              <p className="text-2xl font-bold text-gray-800 mt-1 transition-all">
                {isLoading && !data ? "..." : `$${summaryData.totalCommissionPaid.toLocaleString()}`}
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-start space-x-4">
            <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-500 shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Total Tips Handled</h3>
              <p className="text-2xl font-bold text-gray-800 mt-1 transition-all">
                {isLoading && !data ? "..." : `$${summaryData.totalTips.toLocaleString()}`}
              </p>
            </div>
          </div>
        </div>

        <HistoryDateFilters filters={filters} setFilters={setFilters}>
          <HistoryFilters role={role} filters={filters} setFilters={setFilters} />
        </HistoryDateFilters>

        <div className={`transition-opacity duration-300 ${isFetching ? 'opacity-60' : 'opacity-100'}`}>
          <ServiceHistoryList
            entries={data?.data || []}
            role={role}
            isLoading={isLoading && !data}
          />
        </div>
      </div>
    </div>
  );
}
