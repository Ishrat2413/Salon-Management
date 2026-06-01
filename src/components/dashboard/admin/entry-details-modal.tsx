"use client";

import React from "react";
import { format } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import { BaseModal } from "@/components/ui/BaseModal";
import type { SalonEntry } from "@/actions/salon-entry/salon-entry.types";

interface EntryDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  entry: SalonEntry | null;
}

export function EntryDetailsModal({ isOpen, onClose, entry }: EntryDetailsModalProps) {
  if (!entry) return null;

  const statusColors: Record<string, string> = {
    APPROVED: "bg-[#e8f8f0] text-[#1a7a4a]",
    PENDING: "bg-[#fff8e6] text-[#b07d00]",
    REJECTED: "bg-[#fef0f0] text-[#c0392b]",
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Salon Entry Details">
      <div className="space-y-6">
        
        {/* Header section with Status and Dates */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
          <div>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Status</p>
            <span className={`px-3 py-1 text-xs font-semibold rounded-full inline-block ${statusColors[entry.status] || "bg-gray-100 text-gray-600"}`}>
              {entry.status}
            </span>
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Created At (CT)</p>
            <p className="text-sm font-medium text-gray-900">{formatInTimeZone(new Date(entry.createdAt), "America/Chicago", "MMM d, yyyy 'at' h:mm a")}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Approved By</p>
            <p className="text-sm font-medium text-gray-900">{entry.approvedByName || "N/A"}</p>
          </div>
          {entry.editedByName && (
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Last Edited By</p>
              <p className="text-sm font-medium text-gray-900">{entry.editedByName}</p>
            </div>
          )}
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Main Info */}
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm space-y-4">
            <h4 className="text-base font-semibold text-gray-800 border-b border-gray-50 pb-2">General Information</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Salon</p>
                <p className="text-sm font-medium text-gray-900">{entry.salonName}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Service</p>
                <p className="text-sm font-medium text-gray-900">{entry.serviceName}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Main Employee</p>
                <p className="text-sm font-medium text-gray-900">{entry.employeeName}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Client Name</p>
                <p className="text-sm font-medium text-gray-900">{entry.clientName || "Walk-in"}</p>
              </div>
            </div>
          </div>

          {/* Financial Info */}
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm space-y-4">
            <h4 className="text-base font-semibold text-gray-800 border-b border-gray-50 pb-2">Financial Breakdown</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Total Price</p>
                <p className="text-sm font-medium text-gray-900">${(entry.totalPrice || 0).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Hair Add-on</p>
                <p className="text-sm font-medium text-red-500">-${(entry.addHair || 0).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Actual Service Price</p>
                <p className="text-sm font-medium text-gray-900">${(entry.actualPrice || 0).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Tips</p>
                <p className="text-sm font-medium text-green-600">+${(entry.tips || 0).toLocaleString()}</p>
              </div>
            </div>
          </div>

        </div>

        {/* Split Entries Section */}
        {entry.isSplit && entry.splits && entry.splits.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/50">
              <h4 className="text-base font-semibold text-gray-800">Split Entries Breakdown</h4>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-500 bg-gray-50 border-b border-gray-100 uppercase">
                  <tr>
                    <th className="px-5 py-3 font-medium">Employee</th>
                    <th className="px-5 py-3 font-medium">Service Price Share</th>
                    <th className="px-5 py-3 font-medium">Tip Share</th>
                    <th className="px-5 py-3 font-medium">Commission Rate</th>
                    <th className="px-5 py-3 font-medium">Earnings</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {entry.splits.map((split: any, index: number) => (
                    <tr key={index} className="hover:bg-gray-50/50">
                      <td className="px-5 py-3 font-medium text-gray-900">{split.employeeName}</td>
                      <td className="px-5 py-3 text-gray-600">${(split.totalPrice || 0).toLocaleString()}</td>
                      <td className="px-5 py-3 text-green-600">+${(split.tips || 0).toLocaleString()}</td>
                      <td className="px-5 py-3 text-gray-600">{split.commissionRate !== undefined ? `${split.commissionRate}%` : "N/A"}</td>
                      <td className="px-5 py-3 font-semibold text-[#D13C92]">${(split.commissionEarnings || 0).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Notes & Comments */}
        {(entry.notes || entry.statusComment) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {entry.notes && (
              <div className="bg-orange-50/50 p-5 rounded-xl border border-orange-100">
                <h4 className="text-sm font-semibold text-orange-800 mb-2">Service Notes</h4>
                <p className="text-sm text-orange-900 whitespace-pre-wrap">{entry.notes}</p>
              </div>
            )}
            {entry.statusComment && (
              <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100">
                <h4 className="text-sm font-semibold text-blue-800 mb-2">Status Comment</h4>
                <p className="text-sm text-blue-900 whitespace-pre-wrap">{entry.statusComment}</p>
              </div>
            )}
          </div>
        )}

      </div>
    </BaseModal>
  );
}