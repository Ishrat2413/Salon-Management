"use client";

import { useState, useMemo } from "react";
import { startOfWeek, endOfWeek } from "date-fns";
import { toZonedTime, format } from "date-fns-tz";
import {
  DollarSign,
  ShoppingBag,
  Tags,
  Loader2,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { useSalonEntriesQuery } from "@/actions/salon-entry/useSalonEntry";
import { useAuth } from "@/components/providers/auth-provider";
import { HistoryTable } from "../common/HistoryTable";
import { HistoryDateFilters } from "../common/HistoryDateFilters";

export default function EmployeeHistory() {
  const { user } = useAuth();
  
  // Default to current week: Monday to Sunday in Texas (America/Chicago)
  const nowInTexas = toZonedTime(new Date(), "America/Chicago");
  const defaultStartDate = format(startOfWeek(nowInTexas, { weekStartsOn: 1 }), "yyyy-MM-dd", { timeZone: "America/Chicago" });
  const defaultEndDate = format(endOfWeek(nowInTexas, { weekStartsOn: 1 }), "yyyy-MM-dd", { timeZone: "America/Chicago" });

  const [filters, setFilters] = useState<{
    startDate?: string;
    endDate?: string;
  }>({
    startDate: defaultStartDate,
    endDate: defaultEndDate,
  });
  
  const [page] = useState(1);
  const limit = 100; // Fetch more for table view or handle pagination

  const { data, isLoading, isError, isFetching } = useSalonEntriesQuery({
    page,
    limit,
    employeeId: user?.id,
    status: "APPROVED",
    ...filters,
  });

  const summaryCards = useMemo(() => {
    if (!data?.meta) {
      return [
        { title: "Total Earnings", value: "$0", icon: DollarSign },
        { title: "Total Services", value: "0", icon: ShoppingBag },
        { title: "Total Tips", value: "$0", icon: Tags },
      ];
    }

    const {
      total,
      loggedInUserCommissionEarnings,
      loggedInUserTips,
    } = data.meta as any;

    const displayCommission = loggedInUserCommissionEarnings ?? 0;
    const displayTips = loggedInUserTips ?? 0;
    const displayEarned = displayCommission + displayTips;

    return [
      {
        title: "Total Earnings",
        value: `$${displayEarned.toLocaleString()}`,
        icon: DollarSign,
      },
      {
        title: "Total Services",
        value: total.toString(),
        icon: ShoppingBag,
      },
      {
        title: "Total Tips",
        value: `$${displayTips.toLocaleString()}`,
        icon: Tags,
      },
    ];
  }, [data]);

  if (isError) {
    return (
      <div className='flex min-h-100 flex-col items-center justify-center gap-4'>
        <p className='text-lg font-medium text-red-500'>
          Failed to load history.
        </p>
        <button
          onClick={() => window.location.reload()}
          className='rounded-md bg-pink-500 px-4 py-2 text-white hover:bg-pink-600'>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className='min-h-screen p-4 md:p-8 relative'>
      {/* Subtle fetching indicator */}
      <div className={`fixed top-20 right-8 z-60 transition-opacity duration-300 ${isFetching ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="bg-white/80 backdrop-blur-sm shadow-lg rounded-full p-2 border border-pink-100">
           <Loader2 className="h-5 w-5 animate-spin text-[#D13C92]" />
        </div>
      </div>
      
      <div className='space-y-10'>
        {/* Header */}
        <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
          <div>
            <h1 className='text-3xl font-bold tracking-tight text-gray-800'>
              Work History
            </h1>

            <p className='mt-1 text-sm text-gray-500'>
              Track your approved bookings, earnings, and tips.
            </p>
          </div>
        </div>

        {/* Filters */}
        <HistoryDateFilters filters={filters} setFilters={setFilters} />

        {/* Summary Cards */}
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-3'>
          {summaryCards.map((card, index) => {
            const Icon = card.icon;

            return (
              <Card key={index} className='border border-gray-100 shadow-sm'>
                <CardContent className='flex items-center gap-5 p-6'>
                  <div className='flex h-16 w-16 items-center justify-center rounded-2xl bg-pink-100 text-pink-600'>
                    <Icon className='h-8 w-8' />
                  </div>

                  <div>
                    <p className='text-sm font-medium text-gray-500'>
                      {card.title}
                    </p>

                    <h3 className='mt-1 text-3xl font-bold text-gray-800 transition-all'>
                      {isLoading && !data ? "..." : card.value}
                    </h3>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* History Table */}
        <div className={`transition-opacity duration-300 ${isFetching ? 'opacity-60' : 'opacity-100'}`}>
          <HistoryTable data={data?.data || []} isLoading={isLoading && !data} />
        </div>
      </div>
    </div>
  );
}
