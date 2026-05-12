"use client";
import React from "react";

interface WorkOversightFilterBarProps {
  onSearchChange?: (value: string) => void;
  onDateChange?: (value: string) => void;
  onEmployeeChange?: (value: string) => void;
  onSalonChange?: (value: string) => void;
  searchPlaceholder?: string;
  datePlaceholder?: string;
  employeePlaceholder?: string;
  salonPlaceholder?: string;
  employees?: Array<{ value: string; label: string }>;
  salons?: Array<{ value: string; label: string }>;
}

const WorkOversightFilterBar: React.FC<WorkOversightFilterBarProps> = ({
  onSearchChange,
  onDateChange,
  onEmployeeChange,
  onSalonChange,
  searchPlaceholder = "Search by name or email...",
  datePlaceholder = "mm/dd/yy",
  employeePlaceholder = "Filter by Employee",
  salonPlaceholder = "Filter by Salon",
  employees = [
    { value: "employee1", label: "Employee 1" },
    { value: "employee2", label: "Employee 2" },
    { value: "employee3", label: "Employee 3" },
  ],
  salons = [
    { value: "salon1", label: "Salon 1" },
    { value: "salon2", label: "Salon 2" },
    { value: "salon3", label: "Salon 3" },
  ],
}) => {
  return (
    <div className='w-full mx-auto pb-6'>
      <div className='bg-[#FFFFFF] rounded-xl p-5 filter-container-shadow'>
        <div className='flex flex-col md:flex-row gap-4'>
          {/* Search Section */}
          <div className='flex-1 flex flex-col gap-1.5'>
            <label
              className='font-semibold text-xs text-[#334155] pl-1'
              htmlFor='search-input'>
              Name or email
            </label>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                {/* Magnifying Glass Icon */}
                <svg
                  className='h-4 w-4 text-[#334155]'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  viewBox='0 0 24 24'>
                  <path
                    d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </div>
              <input
                className='block w-full pl-9 pr-3 py-3 bg-[#F3F3F5] border-transparent rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-[#364153] placeholder-[#334155] sm:text-sm'
                id='search-input'
                placeholder={searchPlaceholder}
                type='text'
                onChange={(e) => onSearchChange?.(e.target.value)}
              />
            </div>
          </div>

          {/* Date Filter Section */}
          <div className='flex-1 flex flex-col gap-1.5'>
            <label
              className='font-semibold text-xs text-[#334155] pl-1'
              htmlFor='date-input'>
              Sort By date
            </label>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                {/* Calendar Icon */}
                <svg
                  className='h-4 w-4 text-[#a0aec0]'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  viewBox='0 0 24 24'>
                  <rect x='3' y='4' width='18' height='18' rx='2' ry='2' />
                  <line x1='16' y1='2' x2='16' y2='6' />
                  <line x1='8' y1='2' x2='8' y2='6' />
                  <line x1='3' y1='10' x2='21' y2='10' />
                </svg>
              </div>
              <input
                className='block w-full pl-9 pr-3 py-3 bg-[#F3F3F5] border-transparent rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-[#334155] sm:text-sm'
                id='date-input'
                placeholder={datePlaceholder}
                type='text'
                onChange={(e) => onDateChange?.(e.target.value)}
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => {
                  if (!e.target.value) {
                    e.target.type = "text";
                  }
                }}
              />
            </div>
          </div>

          {/* Employee Filter Section */}
          <div className='flex-1 flex flex-col gap-1.5'>
            <label
              className='font-semibold text-xs text-[#334155] pl-1'
              htmlFor='employee-select'>
              Employee
            </label>
            <div className='relative'>
              <select
                className='block w-full pl-4 pr-10 py-3 bg-[#F3F3F5] border-transparent rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-[#334155] sm:text-sm appearance-none'
                id='employee-select'
                defaultValue=''
                onChange={(e) => onEmployeeChange?.(e.target.value)}>
                <option disabled value=''>
                  {employeePlaceholder}
                </option>
                {employees.map((employee) => (
                  <option key={employee.value} value={employee.value}>
                    {employee.label}
                  </option>
                ))}
              </select>
              <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
                {/* Chevron Down Icon */}
                <svg
                  className='h-4 w-4 text-[#a0aec0]'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  viewBox='0 0 24 24'>
                  <path
                    d='M19 9l-7 7-7-7'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Salon Filter Section */}
          <div className='flex-1 flex flex-col gap-1.5'>
            <label
              className='font-semibold text-xs text-[#334155] pl-1'
              htmlFor='salon-select'>
              Salon
            </label>
            <div className='relative'>
              <select
                className='block w-full pl-4 pr-10 py-3 bg-[#F3F3F5] border-transparent rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-[#334155] sm:text-sm appearance-none'
                id='salon-select'
                defaultValue=''
                onChange={(e) => onSalonChange?.(e.target.value)}>
                <option disabled value=''>
                  {salonPlaceholder}
                </option>
                {salons.map((salon) => (
                  <option key={salon.value} value={salon.value}>
                    {salon.label}
                  </option>
                ))}
              </select>
              <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
                {/* Chevron Down Icon */}
                <svg
                  className='h-4 w-4 text-[#a0aec0]'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  viewBox='0 0 24 24'>
                  <path
                    d='M19 9l-7 7-7-7'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .filter-container-shadow {
          box-shadow:
            0 1px 3px rgba(0, 0, 0, 0.05),
            0 1px 2px rgba(0, 0, 0, 0.03);
        }
      `}</style>
    </div>
  );
};

export default WorkOversightFilterBar;
