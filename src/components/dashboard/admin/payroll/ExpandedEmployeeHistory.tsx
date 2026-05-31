"use client";

import React from "react";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";
import { useEmployeePayrollEntriesQuery } from "@/actions/payroll/usePayroll";
import type { SalonEntry } from "@/actions/salon-entry/salon-entry.types";

interface ExpandedEmployeeHistoryProps {
  employeeId: string;
  startDate?: string;
  endDate?: string;
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);
}

export function ExpandedEmployeeHistory({
  employeeId,
  startDate,
  endDate,
}: ExpandedEmployeeHistoryProps) {
  const { data, isLoading, isError } = useEmployeePayrollEntriesQuery(employeeId, {
    startDate,
    endDate,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8 bg-gray-50/50">
        <Loader2 className="h-6 w-6 animate-spin text-[#D13C92]" />
        <span className="ml-3 text-sm text-gray-500">Loading history...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8 text-center text-sm text-red-500 bg-red-50/50">
        Failed to load history for this employee.
      </div>
    );
  }

  const entries: SalonEntry[] = data?.data || [];

  if (entries.length === 0) {
    return (
      <div className="p-8 text-center text-sm text-gray-500 bg-gray-50/50">
        No approved services found for this period.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100 text-gray-600">
              <th className="py-3 px-4 font-medium">Date</th>
              <th className="py-3 px-4 font-medium">Salon</th>
              <th className="py-3 px-4 font-medium">Service Name</th>
              <th className="py-3 px-4 font-medium">Commission Rate</th>
              <th className="py-3 px-4 font-medium">Service Fee</th>
              <th className="py-3 px-4 font-medium text-right">Commission Earnings</th>
              <th className="py-3 px-4 font-medium">Tip</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {entries.map((entry) => {
              return (
                <tr key={entry.id} className="hover:bg-gray-50/30 transition-colors">
                  <td className="py-3 px-4 text-gray-600">
                    <div className="font-medium text-gray-900">
                      {format(new Date(entry.createdAt), "MMM d, yyyy")}
                    </div>
                    <div className="text-xs">
                      {format(new Date(entry.createdAt), "h:mm a")}
                    </div>
                  </td>
                  <td className="py-3 px-4 font-medium text-gray-700">{entry.salonName}</td>
                  <td className="py-3 px-4 font-medium text-gray-900">
                    {entry.serviceName}
                  </td>
                  <td className="py-3 px-4 text-gray-900 font-medium">
                    {entry.commissionRate !== null ? `${entry.commissionRate}%` : "N/A"}
                  </td>
                  <td className="py-3 px-4 font-medium text-slate-700">
                    {formatCurrency(Number(entry.actualPrice || 0))}
                  </td>
                  <td className="py-3 px-4 font-bold text-pink-600 text-right">
                    {formatCurrency(Number(entry.commissionEarnings || 0))}
                  </td>
                  <td className="py-3 px-4 font-medium text-green-600">
                    {formatCurrency(Number(entry.tips || 0))}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
