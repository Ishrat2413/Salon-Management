"use client";

import React from "react";
import Link from "next/link";
import { SalonEntry } from "@/actions/salon-entry/salon-entry.types";
import { format } from "date-fns";

interface ServiceHistoryListProps {
  entries: SalonEntry[];
  role: "admin" | "employee" | "manager";
  isLoading?: boolean;
}

export function ServiceHistoryList({
  entries,
  role,
  isLoading,
}: ServiceHistoryListProps) {
  if (isLoading) {
    return (
      <section className="space-y-4" data-purpose="service-history-list">
        {[...Array(3)].map((_, i) => (
          <article
            key={i}
            className="bg-white rounded-md p-6 shadow-sm border border-gray-100 animate-pulse flex flex-wrap items-center justify-between gap-4"
          >
            <div className="flex-1 min-w-37.5 h-16 bg-gray-100 rounded"></div>
            <div className="flex-1 min-w-30 h-16 bg-gray-100 rounded"></div>
            <div className="flex-1 min-w-30 h-16 bg-gray-100 rounded"></div>
            <div className="flex-1 min-w-25 h-16 bg-gray-100 rounded"></div>
            <div className="flex-1 min-w-20 h-16 bg-gray-100 rounded"></div>
          </article>
        ))}
      </section>
    );
  }

  if (entries.length === 0) {
    return (
      <section
        className="bg-white rounded-md p-12 shadow-sm border border-gray-100 text-center"
        data-purpose="service-history-list"
      >
        <p className="text-gray-500">No history found.</p>
      </section>
    );
  }

  return (
    <section className="space-y-4" data-purpose="service-history-list">
      {entries.map((entry) => {
        const displayPrice =
          role === "employee" ? entry.loggedInUserTotalPrice : entry.totalPrice;
        const displayTips =
          role === "employee" ? entry.loggedInUserTips : entry.tips;

        return (
          <article
            key={entry.id}
            className="bg-white rounded-md p-6 shadow-sm border border-gray-100 flex flex-wrap items-center justify-between gap-4"
          >
            <div className="flex-1 min-w-37.5">
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                {entry.serviceName}
              </h3>
              <p className="text-xs text-gray-500 mb-1">Employee name</p>
              <p className="text-sm font-medium">{entry.employeeName}</p>
            </div>
            <div className="flex-1 min-w-30">
              <p className="text-xs text-gray-500 mb-1">Salon</p>
              <p className="text-sm font-medium">{entry.salonName}</p>
            </div>
            <div className="flex-1 min-w-30">
              <p className="text-xs text-gray-500 mb-1">Date &amp; Time</p>
              <p className="text-sm font-medium">
                {format(new Date(entry.createdAt), "MMM d, yyyy")}
              </p>
              <p className="text-xs text-gray-500">
                {format(new Date(entry.createdAt), "h:mm a")}
              </p>
            </div>
            <div className="flex-1 min-w-25">
              <p className="text-xs text-gray-500 mb-1">
                {role === "employee" ? "Earnings" : "Service Price"}
              </p>
              <p className="text-sm font-medium">${role === "employee" ? entry.commissionEarnings : entry.totalPrice}</p>
              {entry.isSplit && (
                <span className="text-[10px] bg-blue-50 text-blue-500 px-1.5 py-0.5 rounded ml-1">
                  Split
                </span>
              )}
            </div>
            <div className="flex-1 min-w-20">
              <p className="text-xs text-gray-500 mb-1">Tip</p>
              <p className="text-sm font-medium text-green-500">
                ${displayTips}
              </p>
            </div>
            <div className="w-full sm:w-auto text-right mt-4 sm:mt-0">
              <Link
                href={`/dashboard/admin/history/${entry.id}`}
                className="inline-flex items-center text-sm font-medium text-[#D13C92] hover:underline"
              >
                View Details
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  ></path>
                </svg>
              </Link>
            </div>
          </article>
        );
      })}
    </section>
  );
}
