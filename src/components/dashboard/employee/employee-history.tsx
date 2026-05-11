"use client";

import {
  CalendarDays,
  Clock3,
  DollarSign,
  Filter,
  ShoppingBag,
  Tags,
} from "lucide-react";

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

const summaryCards = [
  {
    title: "Total Earned",
    value: "$4,456.7",
    icon: DollarSign,
  },
  {
    title: "Total Bookings",
    value: "15",
    icon: ShoppingBag,
  },
  {
    title: "Total Tips",
    value: "$138",
    icon: Tags,
  },
];

const todayHistory = [
  {
    service: "Box Braids",
    salon: "Main Street Salon",
    time: "10:00 AM",
    amount: "+$1,253",
    tip: "+$20 tip",
  },
  {
    service: "Cornrows",
    salon: "Main Street Salon",
    time: "11:30 AM",
    amount: "+$980",
    tip: "+$15 tip",
  },
  {
    service: "Knotless Braids",
    salon: "Downtown Salon",
    time: "2:00 PM",
    amount: "+$1,420",
    tip: "+$30 tip",
  },
];

const yesterdayHistory = [
  {
    service: "Box Braids",
    salon: "Main Street Salon",
    time: "9:00 AM",
    amount: "+$1,253",
    tip: "+$20 tip",
  },
  {
    service: "Cornrows",
    salon: "Main Street Salon",
    time: "12:00 PM",
    amount: "+$870",
    tip: "+$10 tip",
  },
  {
    service: "Knotless Braids",
    salon: "Downtown Salon",
    time: "4:00 PM",
    amount: "+$1,100",
    tip: "+$18 tip",
  },
];

type HistoryItem = {
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
        {items.map((item, index) => (
          <Card
            key={index}
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
            <Select>
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
          <HistorySection
            title="Today"
            items={todayHistory}
          />

          <HistorySection
            title="Yesterday"
            items={yesterdayHistory}
          />
        </div>
      </div>
    </div>
  );
}