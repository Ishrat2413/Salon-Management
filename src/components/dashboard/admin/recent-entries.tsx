import React from 'react';

export function RecentEntries() {
  return (
    <div className="bg-brand-card rounded-xl shadow-sm border border-brand-border overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800">Recent Entries</h2>
      </div>
      <div className="divide-y divide-gray-100">
        {/* Entry 1 */}
        <div className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
          <div className="flex items-center space-x-4">
            <div>
              <p className="text-sm font-semibold text-gray-800">Harvest Monitoring</p>
              <div className="flex items-center text-xs text-gray-500 mt-1 space-x-2">
                <span>Main Street Salon</span>
                <span>10:00 AM</span>
                <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-800">+$1,253</p>
            <p className="text-xs text-brand-greenText mt-1">+$20 tip</p>
          </div>
        </div>

        {/* Entry 2 */}
        <div className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors bg-gray-50/50">
          <div className="flex items-center space-x-4">
            <div>
              <p className="text-sm font-semibold text-gray-800">Cornrows</p>
              <div className="flex items-center text-xs text-gray-500 mt-1 space-x-2">
                <span>Main Street Salon</span>
                <span>10:00 AM</span>
                <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-800">+$1,253</p>
            <p className="text-xs text-brand-greenText mt-1">+$20 tip</p>
          </div>
        </div>

        {/* Entry 3 */}
        <div className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
          <div className="flex items-center space-x-4">
            <div>
              <p className="text-sm font-semibold text-gray-800">Knotless Braids</p>
              <div className="flex items-center text-xs text-gray-500 mt-1 space-x-2">
                <span>10:00 AM</span>
                <span>Downtown Salon</span>
                <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-800">+$1,253</p>
            <p className="text-xs text-brand-greenText mt-1">+$20 tip</p>
          </div>
        </div>

        {/* Entry 4 */}
        <div className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors bg-gray-50/50">
          <div className="flex items-center space-x-4">
            <div>
              <p className="text-sm font-semibold text-gray-800">Knotless Braids</p>
              <div className="flex items-center text-xs text-gray-500 mt-1 space-x-2">
                <span>Downtown Salon</span>
                <span>10:00 AM</span>
                <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-800">+$1,253</p>
            <p className="text-xs text-brand-greenText mt-1">+$20 tip</p>
          </div>
        </div>
      </div>
    </div>
  );
}
