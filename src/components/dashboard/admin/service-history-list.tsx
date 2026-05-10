import React from "react";
import Link from "next/link";

export function ServiceHistoryList() {
  return (
    <section className="space-y-4" data-purpose="service-history-list">
      {/* Service Card 1 */}
      <article className="bg-white rounded-md p-6 shadow-sm border border-gray-100 flex flex-wrap items-center justify-between gap-4">
        <div className="flex-1 min-w-37.5">
          <h3 className="text-lg font-bold text-gray-800 mb-2">Box Braids</h3>
          <p className="text-xs text-gray-500 mb-1">Employee name</p>
          <p className="text-sm font-medium">Sarah Johnson</p>
        </div>
        <div className="flex-1 min-w-30">
          <p className="text-xs text-gray-500 mb-1">Salon</p>
          <p className="text-sm font-medium">Glam Studio</p>
        </div>
        <div className="flex-1 min-w-30">
          <p className="text-xs text-gray-500 mb-1">Date &amp; Time</p>
          <p className="text-sm font-medium">May 7, 2026</p>
          <p className="text-xs text-gray-500">2:30 PM</p>
        </div>
        <div className="flex-1 min-w-25">
          <p className="text-xs text-gray-500 mb-1">Service Price</p>
          <p className="text-sm font-medium">$120</p>
        </div>
        <div className="flex-1 min-w-20">
          <p className="text-xs text-gray-500 mb-1">Tip</p>
          <p className="text-sm font-medium text-green-500">$15</p>
        </div>
        <div className="w-full sm:w-auto text-right mt-4 sm:mt-0">
          <Link href="#" className="inline-flex items-center text-sm font-medium text-[#D13C92] hover:underline">
            View Details
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
          </Link>
        </div>
      </article>

      {/* Service Card 2 */}
      <article className="bg-white rounded-md p-6 shadow-sm border border-gray-100 flex flex-wrap items-center justify-between gap-4">
        <div className="flex-1 min-w-37.5">
          <h3 className="text-lg font-bold text-gray-800 mb-2">Cornrows</h3>
          <p className="text-xs text-gray-500 mb-1">Employee name</p>
          <p className="text-sm font-medium">Sarah Johnson</p>
        </div>
        <div className="flex-1 min-w-30">
          <p className="text-xs text-gray-500 mb-1">Salon</p>
          <p className="text-sm font-medium">Glam Studio</p>
        </div>
        <div className="flex-1 min-w-30">
          <p className="text-xs text-gray-500 mb-1">Date &amp; Time</p>
          <p className="text-sm font-medium">May 7, 2026</p>
          <p className="text-xs text-gray-500">2:30 PM</p>
        </div>
        <div className="flex-1 min-w-25">
          <p className="text-xs text-gray-500 mb-1">Service Price</p>
          <p className="text-sm font-medium">$120</p>
        </div>
        <div className="flex-1 min-w-20">
          <p className="text-xs text-gray-500 mb-1">Tip</p>
          <p className="text-sm font-medium text-green-500">$15</p>
        </div>
        <div className="w-full sm:w-auto text-right mt-4 sm:mt-0">
          <Link href="#" className="inline-flex items-center text-sm font-medium text-[#D13C92] hover:underline">
            View Details
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
          </Link>
        </div>
      </article>

      {/* Service Card 3 (with Braiders list) */}
      <article className="bg-white rounded-md p-6 shadow-sm border border-gray-100 flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-4 w-full">
          <div className="flex-1 min-w-37.5">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Cornrows</h3>
            <p className="text-xs text-gray-500 mb-1">Employee name</p>
            <p className="text-sm font-medium">Sarah Johnson</p>
          </div>
          <div className="flex-1 min-w-30">
            <p className="text-xs text-gray-500 mb-1">Salon</p>
            <p className="text-sm font-medium">Glam Studio</p>
          </div>
          <div className="flex-1 min-w-30">
            <p className="text-xs text-gray-500 mb-1">Date &amp; Time</p>
            <p className="text-sm font-medium">May 7, 2026</p>
            <p className="text-xs text-gray-500">2:30 PM</p>
          </div>
          <div className="flex-1 min-w-25">
            <p className="text-xs text-gray-500 mb-1">Service Price</p>
            <p className="text-sm font-medium">$120</p>
          </div>
          <div className="flex-1 min-w-20">
            <p className="text-xs text-gray-500 mb-1">Tip</p>
            <p className="text-sm font-medium text-green-500">$15</p>
          </div>
          <div className="w-full sm:w-auto text-right mt-4 sm:mt-0">
            <Link href="#" className="inline-flex items-center text-sm font-medium text-[#D13C92] hover:underline">
              View Details
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
            </Link>
          </div>
        </div>
      </article>

      {/* Service Card 4 */}
      <article className="bg-white rounded-md p-6 shadow-sm border border-gray-100 flex flex-wrap items-center justify-between gap-4">
        <div className="flex-1 min-w-37.5">
          <h3 className="text-lg font-bold text-gray-800 mb-2">Box Braids</h3>
          <p className="text-xs text-gray-500 mb-1">Employee name</p>
          <p className="text-sm font-medium">Beauty Bar</p>
        </div>
        <div className="flex-1 min-w-30">
          <p className="text-xs text-gray-500 mb-1">Salon</p>
          <p className="text-sm font-medium">Glam Studio</p>
        </div>
        <div className="flex-1 min-w-30">
          <p className="text-xs text-gray-500 mb-1">Date &amp; Time</p>
          <p className="text-sm font-medium">May 7, 2026</p>
          <p className="text-xs text-gray-500">2:30 PM</p>
        </div>
        <div className="flex-1 min-w-25">
          <p className="text-xs text-gray-500 mb-1">Service Price</p>
          <p className="text-sm font-medium">$120</p>
        </div>
        <div className="flex-1 min-w-20">
          <p className="text-xs text-gray-500 mb-1">Tip</p>
          <p className="text-sm font-medium text-green-500">$15</p>
        </div>
        <div className="w-full sm:w-auto text-right mt-4 sm:mt-0">
          <Link href="#" className="inline-flex items-center text-sm font-medium text-[#D13C92] hover:underline">
            View Details
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
          </Link>
        </div>
      </article>

      {/* Service Card 5 */}
      <article className="bg-white rounded-md p-6 shadow-sm border border-gray-100 flex flex-wrap items-center justify-between gap-4">
        <div className="flex-1 min-w-37.5">
          <h3 className="text-lg font-bold text-gray-800 mb-2">Box Braids</h3>
          <p className="text-xs text-gray-500 mb-1">Employee name</p>
          <p className="text-sm font-medium">Beauty Bar</p>
        </div>
        <div className="flex-1 min-w-30">
          <p className="text-xs text-gray-500 mb-1">Salon</p>
          <p className="text-sm font-medium">Glam Studio</p>
        </div>
        <div className="flex-1 min-w-30">
          <p className="text-xs text-gray-500 mb-1">Date &amp; Time</p>
          <p className="text-sm font-medium">May 7, 2026</p>
          <p className="text-xs text-gray-500">2:30 PM</p>
        </div>
        <div className="flex-1 min-w-25">
          <p className="text-xs text-gray-500 mb-1">Service Price</p>
          <p className="text-sm font-medium">$120</p>
        </div>
        <div className="flex-1 min-w-20">
          <p className="text-xs text-gray-500 mb-1">Tip</p>
          <p className="text-sm font-medium text-green-500">$15</p>
        </div>
        <div className="w-full sm:w-auto text-right mt-4 sm:mt-0">
          <Link href="#" className="inline-flex items-center text-sm font-medium text-[#D13C92] hover:underline">
            View Details
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
          </Link>
        </div>
      </article>
    </section>
  );
}
