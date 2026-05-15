"use client";

import Image from "next/image";

import {
  ArrowRight,
  ArrowUp,
  Download,
  DollarSign,
  Briefcase,
  User2,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { Card, CardContent } from "@/components/ui/card";

const summaryCards = [
  {
    title: "Today's Earnings",
    value: "$4,567",
    badge: "12%",
    icon: DollarSign,
  },
  {
    title: "Job Done",
    value: "4",
    badge: "Services Today",
    icon: Briefcase,
  },
  {
    title: "Avg per Job",
    value: "$138",
    badge: "Including Tips",
    icon: User2,
  },
];

const recentEntries = [
  {
    title: "Harvest Monitoring",
    salon: "Main Street Salon",
    time: "10:00 AM",
    amount: "+$1,253",
    tip: "+$20 tip",
  },
  {
    title: "Cornrows",
    salon: "Main Street Salon",
    time: "11:00 AM",
    amount: "+$980",
    tip: "+$15 tip",
  },
  {
    title: "Knotless Braids",
    salon: "Downtown Salon",
    time: "2:00 PM",
    amount: "+$1,430",
    tip: "+$30 tip",
  },
  {
    title: "Silk Press",
    salon: "West End Plaza",
    time: "5:00 PM",
    amount: "+$870",
    tip: "+$12 tip",
  },
];

const rankings = [
  {
    rank: "🏆",
    name: "Elena Rodriguez",
    salon: "Uptown Hub",
    sales: "$4,850.00",
    bonus: "+$450",
    image: "https://i.pravatar.cc/100?img=1",
  },
  {
    rank: "2",
    name: "Sarah Jenkins",
    salon: "Downtown Salon",
    sales: "$4,220.00",
    bonus: "+$320",
    image: "https://i.pravatar.cc/100?img=2",
    you: true,
  },
  {
    rank: "3",
    name: "Marcus Chen",
    salon: "Eastside Boutique",
    sales: "$3,940.00",
    bonus: "+$250",
    image: "https://i.pravatar.cc/100?img=3",
  },
  {
    rank: "4",
    name: "Jessica Miller",
    salon: "Downtown Salon",
    sales: "$3,150.00",
    bonus: "+$0",
    image: "https://i.pravatar.cc/100?img=4",
  },
  {
    rank: "5",
    name: "David Thorne",
    salon: "West End Plaza",
    sales: "$2,890.00",
    bonus: "+$0",
    image: "https://i.pravatar.cc/100?img=5",
  },
];

export default function EmployeeDashboard() {
  return (
    <div className='min-h-screen p-4 md:p-8'>
      <div className='space-y-6'>
        {/* Summary Cards */}
        <section className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
          {summaryCards.map((card, index) => {
            const Icon = card.icon;

            return (
              <Card key={index} className='border-pink-100 shadow-sm'>
                <CardContent className='flex items-center justify-between p-6'>
                  <div className='flex items-center gap-4'>
                    <div className='flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-100 text-pink-600'>
                      <Icon className='h-7 w-7' />
                    </div>

                    <div>
                      <p className='text-sm font-medium text-gray-500'>
                        {card.title}
                      </p>

                      <h3 className='mt-1 text-3xl font-bold text-gray-800'>
                        {card.value}
                      </h3>
                    </div>
                  </div>

                  <div className='flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600'>
                    <ArrowUp className='h-3 w-3' />

                    {card.badge}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </section>

        {/* Main Grid */}
        <div className='grid grid-cols-1 gap-6 lg:grid-cols-12'>
          {/* Recent Entries */}
          <Card className='border-pink-100 shadow-sm lg:col-span-5'>
            <CardContent className='p-6'>
              <div className='mb-6 flex items-center justify-between'>
                <h2 className='text-xl font-bold text-gray-800'>
                  Recent Entries
                </h2>

                <Button variant='link' className='h-auto p-0 text-pink-600'>
                  View All
                </Button>
              </div>

              <div className='space-y-4'>
                {recentEntries.map((entry, index) => (
                  <div
                    key={index}
                    className='rounded-xl border border-gray-100 bg-gray-50 p-4 transition-all hover:shadow-sm'>
                    <div className='flex items-start justify-between gap-4'>
                      <div>
                        <h4 className='font-semibold text-gray-800'>
                          {entry.title}
                        </h4>

                        <p className='mt-1 text-xs text-gray-400'>
                          {entry.salon} • {entry.time}
                        </p>
                      </div>

                      <div className='text-right'>
                        <p className='font-bold text-gray-800'>
                          {entry.amount}
                        </p>

                        <p className='text-xs font-medium text-emerald-500'>
                          {entry.tip}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Rankings Table */}
          <Card className='border-pink-100 shadow-sm lg:col-span-7'>
            <CardContent className='p-6 md:p-8'>
              {/* Header */}
              <div className='mb-8 flex flex-col gap-4 md:flex-row md:items-start md:justify-between'>
                <div>
                  <h2 className='text-2xl font-bold text-gray-800'>
                    Weekly Performance Rankings
                  </h2>

                  <p className='mt-1 text-sm text-gray-400'>
                    Top stylists across all salon branches
                  </p>

                  <div className='mt-4'>
                    <span className='rounded-full bg-gray-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-500'>
                      Current Week
                    </span>
                  </div>
                </div>

                <Button
                  variant='outline'
                  className='border-pink-200 text-pink-600 hover:bg-pink-50 hover:text-pink-700'>
                  Export
                  <Download className='ml-2 h-4 w-4' />
                </Button>
              </div>

              {/* Table */}
              <div className='overflow-x-auto'>
                <table className='w-full min-w-188 border-separate border-spacing-y-3'>
                  <thead>
                    <tr className='text-left text-[11px] uppercase tracking-widest text-gray-400'>
                      <th className='whitespace-nowrap px-4 py-2'>Rank</th>

                      <th className='whitespace-nowrap px-4 py-2'>Employee</th>

                      <th className='whitespace-nowrap px-4 py-2'>Salon</th>

                      <th className='whitespace-nowrap px-4 py-2'>
                        Total Sales
                      </th>

                      <th className='whitespace-nowrap px-4 py-2 text-right'>
                        Bonus/Inc.
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {rankings.map((person, index) => (
                      <tr
                        key={index}
                        className='rounded-2xl bg-gray-50 transition-all hover:bg-white hover:shadow-sm'>
                        {/* Rank */}
                        <td className='rounded-l-2xl px-4 py-4'>
                          <div
                            className={`flex h-10 w-10 items-center justify-center rounded-full font-bold ${
                              index === 0
                                ? "bg-yellow-100 text-yellow-600"
                                : index === 1
                                  ? "bg-gray-200 text-gray-600"
                                  : index === 2
                                    ? "bg-orange-100 text-orange-600"
                                    : "bg-gray-100 text-gray-500"
                            }`}>
                            {person.rank}
                          </div>
                        </td>

                        {/* Employee */}
                        <td className='px-4 py-4'>
                          <div className='flex items-center gap-3'>
                            <Image
                              src={person.image}
                              alt={person.name}
                              width={42}
                              height={42}
                              className='rounded-full object-cover'
                            />

                            <div className='flex items-center gap-2'>
                              <span className='font-semibold text-gray-800'>
                                {person.name}
                              </span>

                              {person.you && (
                                <span className='rounded bg-pink-100 px-2 py-0.5 text-[10px] font-bold uppercase text-pink-600'>
                                  You
                                </span>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Salon */}
                        <td className='px-4 py-4 text-gray-500'>
                          {person.salon}
                        </td>

                        {/* Sales */}
                        <td className='px-4 py-4 font-bold text-gray-800'>
                          {person.sales}
                        </td>

                        {/* Bonus */}
                        <td className='rounded-r-2xl px-4 py-4 text-right'>
                          <span
                            className={`rounded-lg px-3 py-1 text-xs font-bold ${
                              person.bonus !== "+$0"
                                ? "bg-emerald-50 text-emerald-600"
                                : "bg-gray-100 text-gray-400"
                            }`}>
                            {person.bonus}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Footer */}
              <div className='mt-8 flex justify-center'>
                <Button variant='link' className='text-pink-600'>
                  View Full Report
                  <ArrowRight className='ml-2 h-4 w-4' />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
