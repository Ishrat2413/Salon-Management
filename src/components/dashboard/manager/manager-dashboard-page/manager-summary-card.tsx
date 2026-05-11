"use client";

import { useEffect, useRef, useState } from "react";
import {
  Activity,
  BriefcaseBusiness,
  ChevronDown,
  DollarSign,
  Funnel,
  TrendingUp,
  TriangleAlert,
  Users,
} from "lucide-react";

const periodOptions = ["This week", "This month", "This year"] as const;

export function ManagerSummaryCard() {
  const [selectedPeriod, setSelectedPeriod] =
    useState<(typeof periodOptions)[number]>("This week");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  const summaryCardData = [
    {
      icon: DollarSign,
      title: "Today's Earnings",
      subtitle: "$4,250.00",
      bottom: (
        <div className='inline-flex items-center gap-2 rounded-md bg-emerald-100 px-3 py-1.5 text-sm font-semibold text-emerald-700'>
          <TrendingUp className='h-4 w-4' />
          <span>12.5%</span>
        </div>
      ),
      iconTone: "pink",
    },
    {
      icon: BriefcaseBusiness,
      title: "Today's Bookings",
      subtitle: "48",
      bottom: (
        <div className='flex items-center gap-2 text-sm text-[#b79f8f]'>
          <Activity className='h-4 w-4' />
          <span>8 more than yesterday</span>
        </div>
      ),
      iconTone: "peach",
    },
    {
      icon: Users,
      title: "Active Employees",
      subtitle: "12",
      bottom: (
        <div className='flex items-center gap-3'>
          <div className='flex -space-x-2'>
            {[
              { initials: "AR", tone: "bg-rose-400" },
              { initials: "MJ", tone: "bg-amber-500" },
              { initials: "KL", tone: "bg-sky-500" },
            ].map((employee) => (
              <div
                key={employee.initials}
                className={`flex h-7 w-7 items-center justify-center rounded-full border-2 border-white text-[10px] font-semibold text-white ${employee.tone}`}>
                {employee.initials}
              </div>
            ))}
          </div>
          <span className='rounded-full bg-[#f3efe9] px-2 py-1 text-xs font-semibold text-[#a88f7a]'>
            +9
          </span>
        </div>
      ),
      iconTone: "pink",
    },
  ];

  const menuButtonLabel = selectedPeriod;

  return (
    <section className='space-y-6'>
      {/* This week Dropdown */}
      <div className='flex justify-end' ref={menuRef}>
        <div className='relative'>
          <button
            type='button'
            onClick={() => setIsMenuOpen((current) => !current)}
            className='flex items-center gap-2 rounded-md border border-gray-200 bg-white px-4 py-2 text-sm text-gray-600 shadow-sm transition-colors hover:bg-gray-50'>
            <Funnel />
            <span>{menuButtonLabel}</span>
            <ChevronDown className='h-4 w-4 text-gray-400' />
          </button>

          {isMenuOpen ? (
            <div className='absolute right-0 z-20 mt-2 w-44 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg'>
              {periodOptions.map((option) => (
                <button
                  key={option}
                  type='button'
                  onClick={() => {
                    setSelectedPeriod(option);
                    setIsMenuOpen(false);
                  }}
                  className={`block w-full px-4 py-3 text-left text-sm transition-colors hover:bg-[#fbf4f7] ${
                    selectedPeriod === option
                      ? "bg-[#fbf4f7] font-semibold text-[#b41f78]"
                      : "text-gray-600"
                  }`}>
                  {option}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      {/* Summary Cards */}
      <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
        {summaryCardData.map((card, index) => (
          <div
            key={index}
            className='flex items-start gap-4 rounded-[8px] border border-[#efe1d8] bg-white px-5 py-7 '>
            <div
              className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-full ${
                card.iconTone === "peach"
                  ? "bg-[#fde6d3] text-[#b06b25]"
                  : "bg-[#fde1ef] text-[#d61f8d]"
              }`}>
              <card.icon size={32} strokeWidth={1.8} />
            </div>
            <div className='min-w-0 flex-1 pt-1'>
              <h3 className='text-[1.05rem] font-medium tracking-tight text-[#9fb0cf]'>
                {card.title}
              </h3>
              <p className='mt-1 text-4xl font-semibold tracking-tight text-[#b01e76]'>
                {card.subtitle}
              </p>
              <div className='mt-4'>{card.bottom}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Pending Management Actions */}
      <div className='bg-[#FEF3E2] p-6 rounded-[12px]'>
        <div className='flex items-start gap-3 my-8'>
          <div className='mt-0.5'>
            <div className='w-6 h-6 flex items-center justify-center text-white'>
              <TriangleAlert className='h-12 w-12' color='#E8881A' />
            </div>
          </div>

          <div>
            <h2 className='text-xl font-semibold text-gray-900'>
              Pending Management Actions
            </h2>
            <p className='text-sm text-gray-600 mt-0.5'>
              2 items need your review
            </p>
          </div>
        </div>

        {/* Items */}
        <div className='space-y-3'>
          {/* Item 1 */}
          <div className='bg-white border border-[#F5E8C7] hover:border-[#E5D4A8] rounded-xl px-5 py-4 text-gray-800 transition-colors cursor-pointer'>
            3 employee have not submitted entries for today
          </div>

          {/* Item 2 */}
          <div className='bg-white border border-[#F5E8C7] hover:border-[#E5D4A8] rounded-xl px-5 py-4 text-gray-800 transition-colors cursor-pointer'>
            3 employee have not submitted entries for today
          </div>
        </div>
      </div>
    </section>
  );
}
