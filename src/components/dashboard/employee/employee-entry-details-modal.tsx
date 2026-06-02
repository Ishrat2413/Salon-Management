"use client";

import React from "react";
import { formatInTimeZone } from "date-fns-tz";
import { BaseModal } from "@/components/ui/BaseModal";
import type { SalonEntry } from "@/actions/salon-entry/salon-entry.types";

interface EmployeeEntryDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  entry: SalonEntry | null;
}

export function EmployeeEntryDetailsModal({ isOpen, onClose, entry }: EmployeeEntryDetailsModalProps) {
  if (!entry) return null;

  const statusColors: Record<string, string> = {
    APPROVED: "bg-[#e8f8f0] text-[#1a7a4a]",
    PENDING: "bg-[#fff8e6] text-[#b07d00]",
    REJECTED: "bg-[#fef0f0] text-[#c0392b]",
  };

  const earning = Number(entry.commissionEarnings || 0);
  const tip = Number(entry.loggedInUserTips || 0);
  const totalEarnings = earning + tip;

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Service Details">
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
          {entry.status === 'APPROVED' && (
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Approved By</p>
              <p className="text-sm font-medium text-gray-900">{entry.approvedByName || "System"}</p>
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
              <div className="col-span-2">
                <p className="text-xs text-gray-500 mb-1">Client Name</p>
                <p className="text-sm font-medium text-gray-900">{entry.clientName || "Walk-in"}</p>
              </div>
            </div>
          </div>

          {/* Financial Info */}
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm space-y-4">
            <h4 className="text-base font-semibold text-gray-800 border-b border-gray-50 pb-2">Your Earnings</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Service Price Share</p>
                <p className="text-sm font-medium text-gray-900">${Number(entry.loggedInUserTotalPrice || 0).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Commission Rate</p>
                <p className="text-sm font-medium text-gray-900">{entry.loggedInUserCommissionRate !== undefined && entry.loggedInUserCommissionRate !== null ? `${entry.loggedInUserCommissionRate}%` : "N/A"}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Calculated Commission</p>
                <p className="text-sm font-medium text-[#D13C92]">${earning.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Tip Share</p>
                <p className="text-sm font-medium text-green-600">+${tip.toLocaleString()}</p>
              </div>
              <div className="col-span-2 border-t border-gray-50 pt-2">
                <p className="text-xs text-gray-500 mb-1">Total Take-home</p>
                <p className="text-base font-bold text-gray-900">${totalEarnings.toLocaleString()}</p>
              </div>
            </div>
          </div>

        </div>

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
                <h4 className="text-sm font-semibold text-blue-800 mb-2">Manager Comment</h4>
                <p className="text-sm text-blue-900 whitespace-pre-wrap">{entry.statusComment}</p>
              </div>
            )}
          </div>
        )}

      </div>
    </BaseModal>
  );
}
