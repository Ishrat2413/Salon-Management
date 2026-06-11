"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Download } from "lucide-react";

const tabs = [
  {
    label: "Employee Earnings",
    href: "/reports/employee-earnings",
    key: "earnings",
  },
  { label: "Salon Revenue", href: "/reports/salon-revenue", key: "revenue" },
  {
    label: "Service Analysis",
    href: "/reports/service-analysis",
    key: "services",
  },
];

export default function ManagerReportPage({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const handleExport = () => {
    window.dispatchEvent(new Event('trigger-export'));
  };

  return (
    <div className='min-h-screen px-4 py-4 sm:px-6 lg:px-8 lg:py-6'>
      <div className='mx-auto w-full max-w-480'>
        <div className='mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between'>
          <div className='border-b border-gray-200'>
            <nav
              className='flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium sm:gap-x-8'
              aria-label='Reports tabs'>
              {tabs.map((tab) => (
                <Link
                  key={tab.key}
                  href={tab.href}
                  className={`pb-4 border-b-2 transition-colors ${
                    tab.key !== "services"
                      ? "md:border-r md:border-r-gray-300 md:pr-8"
                      : ""
                  } ${
                    pathname === tab.href
                      ? "border-pink-600 text-pink-600"
                      : "border-transparent text-gray-500 hover:text-pink-600"
                  }`}>
                  {tab.label}
                </Link>
              ))}
            </nav>
          </div>
          <button 
            onClick={handleExport}
            className='flex w-full items-center justify-center gap-2 rounded-lg border border-(--primary-color) bg-white px-6 py-2 transition hover:bg-gray-50 lg:w-auto'>
            <Download className='w-5 h-5' color='#D13C92' />
            <span className='text-(--primary-color)'>Export</span>
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}
