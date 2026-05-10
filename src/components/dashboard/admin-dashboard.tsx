import React from 'react';
import { SummaryCards } from './admin/summary-cards';
import { RecentEntries } from './admin/recent-entries';
import { Rankings } from './admin/rankings';

export function AdminDashboard() {
  return (
    <div className=" min-h-screen text-brand-textPrimary">
      <div className="mx-auto  space-y-6">
        
        <div className="flex justify-end">
          <div className="relative">
            <button className="bg-white border border-gray-200 rounded-md py-2 px-4 flex items-center space-x-2 text-sm text-gray-600 shadow-sm hover:bg-gray-50">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
              <span>This week</span>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
            </button>
          </div>
        </div>

        <SummaryCards />
        <RecentEntries />
        <Rankings />

      </div>
    </div>
  );
}
