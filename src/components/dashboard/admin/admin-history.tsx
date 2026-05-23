"use client";

import React, { useState } from "react";
import { HistoryFilters } from "./history-filters";
import { ServiceHistoryList } from "./service-history-list";
import { useAuth } from "@/components/providers/auth-provider";
import { useSalonEntriesQuery } from "@/actions/salon-entry/useSalonEntry";
import { HistoryDateFilters } from "../common/HistoryDateFilters";
import { Loader2 } from "lucide-react";

export function AdminHistory() {
  const { user } = useAuth();
  const [filters, setFilters] = useState<{
    startDate?: string;
    endDate?: string;
    employeeId?: string;
    salonId?: string;
    status?: string;
  }>({ status: "APPROVED" });
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading, isFetching } = useSalonEntriesQuery({
    page,
    limit,
    ...filters,
  });

  const role = user?.role || "employee";

  const summaryData = {
    totalPrice:
      (role === "employee" || filters.employeeId) 
        ? data?.meta?.loggedInUserPrices 
        : data?.meta?.totalPrices,
    totalTips:
      (role === "employee" || filters.employeeId) 
        ? data?.meta?.loggedInUserTips 
        : data?.meta?.totalTips,
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const totalPages = data?.meta?.total ? Math.ceil(data.meta.total / limit) : 0;

  return (
    <div className="bg-[#fef8f8] min-h-[calc(100vh-4rem)] p-4 sm:p-8 text-gray-800 -mx-4 -my-6 sm:-mx-6 sm:-my-6 lg:-mx-8 lg:-my-8 relative">
      {/* Absolute positioned spinner to prevent layout shift */}
      <div className={`fixed top-20 right-8 z-[60] transition-opacity duration-300 ${isFetching ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="bg-white/80 backdrop-blur-sm shadow-lg rounded-full p-2 border border-pink-100">
           <Loader2 className="h-5 w-5 animate-spin text-[#D13C92]" />
        </div>
      </div>

      <div className="mx-auto space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              <h3 className="text-sm font-medium text-gray-500">Total Price</h3>
              <p className="text-2xl font-bold text-gray-800 mt-1 transition-all">
                {isLoading && !data ? "..." : `$${(summaryData.totalPrice || 0).toLocaleString()}`}
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
              <h3 className="text-sm font-medium text-gray-500">Total Tips</h3>
              <p className="text-2xl font-bold text-gray-800 mt-1 transition-all">
                {isLoading && !data ? "..." : `$${(summaryData.totalTips || 0).toLocaleString()}`}
              </p>
            </div>
          </div>
        </div>

        <HistoryDateFilters filters={filters} setFilters={setFilters} />
        <HistoryFilters role={role} filters={filters} setFilters={setFilters} />

        <div className={`transition-opacity duration-300 ${isFetching ? 'opacity-60' : 'opacity-100'}`}>
          <ServiceHistoryList
            entries={data?.data || []}
            role={role}
            isLoading={isLoading && !data}
          />
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
            <span className="text-sm text-gray-500">
              Showing {(page - 1) * limit + 1} to{" "}
              {Math.min(page * limit, data?.meta?.total || 0)} of{" "}
              {data?.meta?.total} records
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handlePageChange(Math.max(1, page - 1))}
                disabled={page === 1}
                className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => handlePageChange(p)}
                    className={`px-3 py-1 text-sm font-medium rounded-md ${
                      page === p
                        ? "bg-[#D13C92] text-white"
                        : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
