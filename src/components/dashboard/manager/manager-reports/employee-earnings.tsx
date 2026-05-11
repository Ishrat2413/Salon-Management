"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ArrowUp } from "lucide-react";

const data = [
  { day: "Mon", earnings: 58 },
  { day: "Tue", earnings: 51 },
  { day: "Wed", earnings: 65 },
  { day: "Thu", earnings: 62 },
  { day: "Fri", earnings: 25 },
  { day: "Sat", earnings: 47 },
  { day: "Sun", earnings: 61 },
];

export default function EmployeeEarningsPage() {
  return (
    <div className='mx-auto w-full max-w-480 overflow-hidden rounded-[12px] border border-[#F1EAE3] bg-[#F9F9FB] p-4 sm:p-6 lg:p-8'>
      <div className='mb-6 sm:mb-8'>
        <h2 className='text-xl font-semibold sm:text-2xl'>
          Weekly Earnings Overview
        </h2>
        <p className='text-sm text-gray-600 sm:text-base'>
          Total earnings across all employees this week
        </p>
      </div>

      <div className='h-72 sm:h-80 lg:h-96'>
        <ResponsiveContainer width='100%' height='100%'>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray='3 3' stroke='#f0f0f0' />
            <XAxis dataKey='day' />
            <YAxis />
            <Tooltip />
            <Bar dataKey='earnings' fill='#D13C92' radius={3} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className='mt-5 flex items-center gap-2 text-sm text-green-600 sm:mt-6'>
        <ArrowUp className='w-4 h-4' />
        <span>12% higher than last week</span>
      </div>
    </div>
  );
}
