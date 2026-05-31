"use client";

import React, { useState } from "react";
import type { PayrollRow } from "@/actions/payroll/payroll.types";
import { ExpandedEmployeeHistory } from "./ExpandedEmployeeHistory";
import { ChevronDown, ChevronRight } from "lucide-react";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);
}

interface PayrollAccordionTableProps {
  data: PayrollRow[];
  isLoading?: boolean;
  emptyMessage?: string;
  startDate?: string;
  endDate?: string;
}

export function PayrollAccordionTable({
  data,
  isLoading = false,
  emptyMessage = "No payroll records found for these filters.",
  startDate,
  endDate,
}: PayrollAccordionTableProps) {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const toggleRow = (employeeId: string) => {
    setExpandedRow((prev) => (prev === employeeId ? null : employeeId));
  };

  return (
    <div className='bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden'>
      <div className="p-4 md:p-6 pb-2 border-b border-gray-100 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Payroll</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100 text-gray-600">
              <th className="py-3 px-4 font-medium w-10"></th>
              <th className="py-3 px-4 font-medium">Employee</th>
              <th className="py-3 px-4 font-medium">Total Service</th>
              <th className="py-3 px-4 font-medium">Commission Rate</th>
              <th className="py-3 px-4 font-medium">Service Charge</th>
              <th className="py-3 px-4 font-medium">Commission Earnings</th>
              <th className="py-3 px-4 font-medium">Total Tips</th>
              <th className="py-3 px-4 font-medium text-right">Earnings</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {isLoading ? (
              <tr>
                <td colSpan={8} className="py-8 text-center text-gray-500">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-pink-600 border-t-transparent rounded-full animate-spin"></div>
                    Loading payroll data...
                  </div>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-8 text-center text-gray-500">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row) => {
                const isExpanded = expandedRow === row.employeeId;
                
                return (
                  <React.Fragment key={row.employeeId}>
                    <tr 
                      onClick={() => toggleRow(row.employeeId)}
                      className={`hover:bg-gray-50/50 cursor-pointer transition-colors ${isExpanded ? 'bg-gray-50/30' : ''}`}
                    >
                      <td className="py-4 px-4 text-gray-400">
                        {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                      </td>
                      <td className="py-4 px-4 font-medium text-gray-900">{row.employeeName}</td>
                      <td className="py-4 px-4 text-gray-600">{row.totalOccurrences}</td>
                      <td className="py-4 px-4 font-medium text-gray-900">{row.commissionRate}%</td>
                      <td className="py-4 px-4 font-medium text-slate-700">{formatCurrency(row.serviceCharge)}</td>
                      <td className="py-4 px-4 font-medium text-sky-600">{formatCurrency(row.commissionEarnings)}</td>
                      <td className="py-4 px-4 font-medium text-green-600">{formatCurrency(row.totalTips)}</td>
                      <td className="py-4 px-4 font-bold text-pink-600 text-right text-[15px]">{formatCurrency(row.earnings)}</td>
                    </tr>
                    {isExpanded && (
                      <tr className="bg-gray-50/30">
                        <td colSpan={8} className="p-0 border-t border-gray-100">
                          <div className="p-4 md:p-6 pb-8 border-l-2 border-pink-400">
                            <h3 className="text-sm font-semibold text-gray-900 mb-4 px-2">
                              Service History Breakdown for {row.employeeName}
                            </h3>
                            <ExpandedEmployeeHistory
                              employeeId={row.employeeId}
                              startDate={startDate}
                              endDate={endDate}
                            />
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
