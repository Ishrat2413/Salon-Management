import React from 'react';

export function SummaryCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
      {/* Cat Illustration Decoration */}
      <div className="absolute -bottom-8 left-[30%] z-10 hidden md:block">
        <svg fill="none" height="40" stroke="#333" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="40">
          <path d="M12 20h4.5a3.5 3.5 0 0 0 3.5-3.5v-1a3.5 3.5 0 0 0-3.5-3.5h-9a3.5 3.5 0 0 0-3.5 3.5v1A3.5 3.5 0 0 0 7.5 20H12z"></path>
          <path d="M9 12V8a3 3 0 0 1 6 0v4"></path>
          <path d="M12 20v-4"></path>
          <text fill="#333" fontSize="6" stroke="none" x="14" y="8">Z</text>
          <text fill="#333" fontSize="4" stroke="none" x="18" y="5">z</text>
        </svg>
      </div>

      {/* Card 1 */}
      <div className="bg-brand-card rounded-xl p-6 shadow-sm border border-brand-border flex items-start space-x-4">
        <div className="w-12 h-12 rounded-full bg-brand-pinkSoft flex items-center justify-center text-brand-pinkIcon shrink-0">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
        </div>
        <div>
          <h3 className="text-sm font-medium text-blue-300">Today&apos;s Earnings</h3>
          <p className="text-2xl font-bold text-brand-pinkIcon mt-1">$490</p>
          <div className="flex items-center mt-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-brand-greenSoft text-brand-greenText">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 10l7-7m0 0l7 7m-7-7v18" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
              +12% from yesterday
            </span>
          </div>
        </div>
      </div>

      {/* Card 2 */}
      <div className="bg-brand-card rounded-xl p-6 shadow-sm border border-brand-border flex items-start space-x-4">
        <div className="w-12 h-12 rounded-full bg-brand-pinkSoft flex items-center justify-center text-brand-pinkIcon shrink-0">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
        </div>
        <div>
          <h3 className="text-sm font-medium text-blue-300">Today&apos;s Earnings</h3>
          <p className="text-2xl font-bold text-yellow-700 mt-1">4</p>
          <div className="flex items-center mt-2 text-xs text-gray-400">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
            ~2 more pending
          </div>
        </div>
      </div>

      {/* Card 3 */}
      <div className="bg-brand-card rounded-xl p-6 shadow-sm border border-brand-border flex items-start space-x-4">
        <div className="w-12 h-12 rounded-full bg-brand-pinkSoft flex items-center justify-center text-brand-pinkIcon shrink-0">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
        </div>
        <div>
          <h3 className="text-sm font-medium text-blue-300">Active Employees</h3>
          <p className="text-2xl font-bold text-yellow-700 mt-1">$122.50</p>
          <div className="flex items-center mt-2 text-xs text-brand-greenText font-medium">
            Above average
          </div>
        </div>
      </div>
    </div>
  );
}
