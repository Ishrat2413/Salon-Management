"use client";

import React from "react";

interface SalonSearchFilterProps {
  onSearchChange?: (value: string) => void;
  onManagerChange?: (value: string) => void;
  onAddressChange?: (value: string) => void;
  searchPlaceholder?: string;
  managerPlaceholder?: string;
  addressPlaceholder?: string;
  managers?: Array<{ value: string; label: string }>;
  addresses?: Array<{ value: string; label: string }>;
}

const SalonSearchFilter: React.FC<SalonSearchFilterProps> = ({
  onSearchChange,
  onManagerChange,
  onAddressChange,
  searchPlaceholder = "Search by salon name...",
  managerPlaceholder = "Filter by Manager",
  addressPlaceholder = "Filter by Address",
  managers = [],
  addresses = [],
}) => {
  return (
    <div className='w-full mx-auto pb-10'>
      <div className='bg-[#FFFFFF] rounded-xl p-5 border border-[#F3E8EE] filter-container-shadow'>
        <div className='flex flex-col md:flex-row gap-4'>
          {/* Search Section */}
          <div className='flex-1 flex flex-col gap-1.5'>
            <label
              className='font-semibold text-xs text-[#334155] pl-1'
              htmlFor='search-input'>
              Salon Name
            </label>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
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
                className='block w-full pl-9 pr-3 py-3 bg-[#F3F3F5] border-transparent rounded-lg focus:ring-2 focus:ring-[#D83B8F]/20 focus:bg-white text-[#364153] placeholder-[#9CA3AF] sm:text-sm transition-all outline-none'
                id='search-input'
                placeholder={searchPlaceholder}
                type='text'
                onChange={(e) => onSearchChange?.(e.target.value)}
              />
            </div>
          </div>

          {/* Manager Filter Section */}
          <div className='flex-1 flex flex-col gap-1.5'>
            <label
              className='font-semibold text-xs text-[#364153] pl-1'
              htmlFor='manager-select'>
              Manager
            </label>
            <div className='relative'>
              <select
                className='block w-full pl-4 pr-10 py-3 bg-[#F3F3F5] border-transparent rounded-lg focus:ring-2 focus:ring-[#D83B8F]/20 focus:bg-white text-[#334155] sm:text-sm appearance-none cursor-pointer transition-all outline-none'
                id='manager-select'
                defaultValue=''
                onChange={(e) => onManagerChange?.(e.target.value)}>
                <option value=''>
                  {managerPlaceholder}
                </option>
                {managers.map((manager) => (
                  <option key={manager.value} value={manager.value}>
                    {manager.label}
                  </option>
                ))}
              </select>
              <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
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

          {/* Address Filter Section (Optional/Additional) */}
          <div className='flex-1 flex flex-col gap-1.5'>
            <label
              className='font-semibold text-xs text-gray-600 pl-1'
              htmlFor='address-select'>
              Location
            </label>
            <div className='relative'>
              <select
                className='block w-full pl-4 pr-10 py-3 bg-[#F3F3F5] border-transparent rounded-lg focus:ring-2 focus:ring-[#D83B8F]/20 focus:bg-white text-[#334155] sm:text-sm appearance-none cursor-pointer transition-all outline-none'
                id='address-select'
                defaultValue=''
                onChange={(e) => onAddressChange?.(e.target.value)}>
                <option value=''>
                  {addressPlaceholder}
                </option>
                {addresses.map((address) => (
                  <option key={address.value} value={address.value}>
                    {address.label}
                  </option>
                ))}
              </select>
              <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
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
          box-shadow: 0 1px 4px 0 rgba(211, 60, 146, 0.04);
        }
      `}</style>
    </div>
  );
};

export default SalonSearchFilter;
