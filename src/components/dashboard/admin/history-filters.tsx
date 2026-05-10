import React from "react";

export function HistoryFilters() {
  return (
    <section className="bg-white rounded-md p-6 shadow-sm border border-gray-100 flex flex-wrap gap-6 items-end" data-purpose="filters-container">
      {/* Date Filter */}
      <div className="flex-1 min-w-62.5">
        <label className="block text-sm font-medium text-gray-500 mb-2" htmlFor="date-sort">Sort By date</label>
        <div className="relative">
          <input className="w-full bg-gray-100 border-none rounded-md py-3 px-4 text-sm text-gray-800 focus:ring-2 focus:ring-[#D13C92] focus:outline-none placeholder-gray-400" id="date-sort" placeholder="mm/dd/yy" type="text" />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
          </div>
        </div>
      </div>
      
      {/* Employee Filter */}
      <div className="flex-1 min-w-62.5">
        <label className="block text-sm font-medium text-gray-500 mb-2" htmlFor="employee-filter">Employee</label>
        <div className="relative">
          <select className="w-full bg-gray-100 border-none rounded-md py-3 px-4 text-sm text-gray-400 appearance-none focus:ring-2 focus:ring-[#D13C92] focus:outline-none" id="employee-filter" defaultValue="">
            <option disabled value="">Filter by Employee</option>
            <option value="sarah">Sarah Johnson</option>
            <option value="beauty">Beauty Bar</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
          </div>
        </div>
      </div>
      
      {/* Salon Filter */}
      <div className="flex-1 min-w-62.5">
        <label className="block text-sm font-medium text-gray-500 mb-2" htmlFor="salon-filter">Salon</label>
        <div className="relative">
          <select className="w-full bg-gray-100 border-none rounded-md py-3 px-4 text-sm text-gray-400 appearance-none focus:ring-2 focus:ring-[#D13C92] focus:outline-none" id="salon-filter" defaultValue="">
            <option disabled value="">Filter by Salon</option>
            <option value="glam">Glam Studio</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
          </div>
        </div>
      </div>
    </section>
  );
}
