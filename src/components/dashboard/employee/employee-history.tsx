"use client";

import { useState, useMemo } from "react";
import {
  CalendarDays,
  Clock3,
  DollarSign,
  Filter,
  ShoppingBag,
  Tags,
  Loader2,
} from "lucide-react";
import { format, isToday, isYesterday, parseISO } from "date-fns";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSalonEntriesQuery } from "@/actions/salon-entry/useSalonEntry";
import { useAuth } from "@/components/providers/auth-provider";
import type { SalonEntry } from "@/actions/salon-entry/salon-entry.types";

type HistoryItem = {
  id: string;
  service: string;
  salon: string;
  time: string;
  amount: string;
  tip: string;
};

function HistorySection({
  title,
  items,
}: {
  title: string;
  items: HistoryItem[];
}) {
  return (
    <section className="space-y-4">
      {/* Section Header */}
      <div className="flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-pink-100 text-pink-600">
          <CalendarDays className="h-4 w-4" />
        </div>

        <h2 className="text-lg font-semibold text-gray-800">
          {title}
        </h2>
      </div>

      {/* Items */}
      <div className="space-y-4">
        {items.map((item) => (
          <Card
            key={item.id}
            className="border border-gray-100 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            <CardContent className="flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between">
              {/* Left */}
              <div className="space-y-2">
                <h3 className="text-base font-semibold text-gray-800">
                  {item.service}
                </h3>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                  <span>{item.salon}</span>

                  <div className="flex items-center gap-1">
                    <Clock3 className="h-4 w-4" />

                    <span>{item.time}</span>
                  </div>
                </div>
              </div>

              {/* Right */}
              <div className="text-left md:text-right">
                <p className="text-xl font-bold text-gray-800">
                  {item.amount}
                </p>

                <p className="text-sm font-medium text-green-500">
                  {item.tip}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default function EmployeeHistory() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading, isError } = useSalonEntriesQuery({
    page,
    limit,
    employeeId: user?.id,
  });

  const groupedHistory = useMemo(() => {
    if (!data?.data) return {};

    const groups: Record<string, HistoryItem[]> = {};

    data.data.forEach((entry: SalonEntry) => {
      const date = parseISO(entry.createdAt);
      let groupTitle = format(date, "MMMM d, yyyy");

      if (isToday(date)) {
        groupTitle = "Today";
      } else if (isYesterday(date)) {
        groupTitle = "Yesterday";
      }

      if (!groups[groupTitle]) {
        groups[groupTitle] = [];
      }

      const amount = isAdmin ? entry.totalPrice : entry.loggedInUserTotalPrice;
      const tip = isAdmin ? entry.tips : entry.loggedInUserTips;

      groups[groupTitle].push({
        id: entry.id,
        service: entry.serviceName,
        salon: entry.salonName,
        time: format(date, "h:mm aa"),
        amount: `+$${amount.toLocaleString()}`,
        tip: `+$${tip.toLocaleString()} tip`,
      });
    });

    return groups;
  }, [data, isAdmin]);

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
      loggedInUserPrices,
      loggedInUserTips,
    } = data.meta;

    return [
      {
        title: "Total Earned",
        value: `$${(isAdmin ? totalPrices : loggedInUserPrices).toLocaleString()}`,
        icon: DollarSign,
      },
      {
        title: "Total Bookings",
        value: total.toString(),
        icon: ShoppingBag,
      },
      {
        title: "Total Tips",
        value: `$${(isAdmin ? totalTips : loggedInUserTips).toLocaleString()}`,
        icon: Tags,
      },
    ];
  }, [data, isAdmin]);

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-pink-500" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
        <p className="text-lg font-medium text-red-500">Failed to load history.</p>
        <button 
          onClick={() => window.location.reload()}
          className="rounded-md bg-pink-500 px-4 py-2 text-white hover:bg-pink-600"
        >
          Retry
        </button>
      </div>
    );
  }

  const groupTitles = Object.keys(groupedHistory);

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="space-y-10">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-800">
              Work History
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Track your bookings, earnings, and tips.
            </p>
          </div>

          {/* Filter */}
          <div className="">
            <Select defaultValue="week">
              <SelectTrigger className="h-11 bg-white">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-gray-400" />

                  <SelectValue placeholder="This week" />
                </div>
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="today">
                  Today
                </SelectItem>

                <SelectItem value="week">
                  This week
                </SelectItem>

                <SelectItem value="month">
                  This month
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-3">
          {summaryCards.map((card, index) => {
            const Icon = card.icon;

            return (
              <Card
                key={index}
                className="border border-gray-100 shadow-sm"
              >
                <CardContent className="flex items-center gap-5 p-6">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-pink-100 text-pink-600">
                    <Icon className="h-8 w-8" />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      {card.title}
                    </p>

                    <h3 className="mt-1 text-3xl font-bold text-gray-800">
                      {card.value}
                    </h3>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* History Sections */}
        <div className="space-y-10">
          {groupTitles.length > 0 ? (
            groupTitles.map((title) => (
              <HistorySection
                key={title}
                title={title}
                items={groupedHistory[title]}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-gray-500">
              <CalendarDays className="mb-4 h-12 w-12 opacity-20" />
              <p>No history found.</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {data?.meta && data.meta.total > limit && (
          <div className="flex items-center justify-center gap-4 pt-4">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="rounded-md border border-gray-200 px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-50 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-sm text-gray-500">
              Page {page} of {Math.ceil(data.meta.total / limit)}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(Math.ceil(data.meta.total / limit), p + 1))}
              disabled={page >= Math.ceil(data.meta.total / limit)}
              className="rounded-md border border-gray-200 px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-50 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
