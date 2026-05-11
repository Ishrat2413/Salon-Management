"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { day: "Mon", revenue: 48, expenses: 19 },
  { day: "Tue", revenue: 39, expenses: 48 },
  { day: "Wed", revenue: 53, expenses: 70 },
  { day: "Thu", revenue: 64, expenses: 71 },
  { day: "Fri", revenue: 62, expenses: 70 },
  { day: "Sat", revenue: 56, expenses: 63 },
  { day: "Sun", revenue: 55, expenses: 17 },
];

export default function SalonRevenuePage() {
  return (
    <div className='mx-auto w-full max-w-480 overflow-hidden rounded-[12px] border border-[#F1EAE3] bg-[#F9F9FB] p-4 sm:p-6 lg:p-8'>
      <div className='mb-6 sm:mb-8'>
        <h2 className='text-xl font-semibold sm:text-2xl'>
          Revenue vs Expenses
        </h2>
        <p className='text-sm text-gray-600 sm:text-base'>
          Track salon performance over the past week
        </p>
      </div>

      <div className='h-72 sm:h-80 lg:h-96'>
        <ResponsiveContainer width='100%' height='100%'>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray='3 3' stroke='#f0f0f0' />
            <XAxis dataKey='day' />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type='natural'
              dataKey='revenue'
              stroke='#4ECDC4'
              strokeWidth={3}
              dot={{ fill: "#4ECDC4", r: 5 }}
              name='Revenue'
            />
            <Line
              type='natural'
              dataKey='expenses'
              stroke='#FFB74D'
              strokeWidth={3}
              dot={{ fill: "#FFB74D", r: 5 }}
              name='Expenses'
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
