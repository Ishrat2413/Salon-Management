"use client";

import { useState, useMemo } from "react";
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

export default function EmployeeHistory() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const isManager = user?.role === "manager";
  const [page] = useState(1);
  const limit = 100; // Fetch more for table view or handle pagination

  const { data, isLoading, isError } = useSalonEntriesQuery({
    page,
    limit,
    employeeId: isAdmin || isManager ? undefined : user?.id,
    status: "APPROVED",
  });

  const summaryCards = useMemo(() => {
    if (!data?.meta) {
      return [
        { title: "Total Earned", value: "$0", icon: DollarSign },
        { title: "Total Bookings", value: "0", icon: ShoppingBag },
        { title: "Total Tips", value: "$0", icon: Tags },
      ];
    }

    const {
      total,
      totalPrices,
      totalTips,
      loggedInUserCommissionEarnings,
      loggedInUserTips,
    } = data.meta as any;

    const displayEarned = isAdmin || isManager 
        ? totalPrices 
        : (loggedInUserCommissionEarnings ?? 0);
    
    const displayTips = isAdmin || isManager
        ? totalTips
        : (loggedInUserTips ?? 0);

    return [
      {
        title: "Total Earned",
        value: `$${displayEarned.toLocaleString()}`,
        icon: DollarSign,
      },
      {
        title: "Total Bookings",
        value: total.toString(),
        icon: ShoppingBag,
      },
      {
        title: "Total Tips",
        value: `$${displayTips.toLocaleString()}`,
        icon: Tags,
      },
    ];
  }, [data, isAdmin, isManager]);

  if (isLoading) {
    return (
      <div className='flex min-h-100 items-center justify-center'>
        <Loader2 className='h-8 w-8 animate-spin text-pink-500' />
      </div>
    );
  }

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
    <div className='min-h-screen p-4 md:p-8'>
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

                    <h3 className='mt-1 text-3xl font-bold text-gray-800'>
                      {card.value}
                    </h3>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* History Table */}
        <HistoryTable data={data?.data || []} isLoading={isLoading} />
      </div>
    </div>
  );
}
