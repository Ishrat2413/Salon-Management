"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import type { PayrollSalonOption } from "@/actions/payroll/payroll.types";

interface PayrollFilterBarProps {
  searchTerm: string;
  startDate: string;
  endDate: string;
  salonId: string;
  salons: PayrollSalonOption[];
  isSalonLoading?: boolean;
  onSearchTermChange: (value: string) => void;
  onStartDateChange: (value: string) => void;
  onEndDateChange: (value: string) => void;
  onSalonChange: (value: string | null) => void;
  onReset: () => void;
}

const ALL_SALONS_VALUE = "__all_salons__";

export default function PayrollFilterBar({
  searchTerm,
  startDate,
  endDate,
  salonId,
  salons,
  isSalonLoading,
  onSearchTermChange,
  onStartDateChange,
  onEndDateChange,
  onSalonChange,
  onReset,
}: PayrollFilterBarProps) {
  const selectedSalonLabel = isSalonLoading
    ? "Loading salons..."
    : salonId
      ? (salons.find((salon) => salon.value === salonId)?.label ??
        "Selected salon")
      : "All salons";

  return (
    <div className='w-full mx-auto pb-6'>
      <div className='bg-[#FFFFFF] rounded-xl p-5 filter-container-shadow'>
        <div className='flex flex-col md:flex-row gap-4'>
          <div className='flex-1 flex flex-col gap-1.5'>
            <label
              className='font-semibold text-xs text-[#334155] pl-1'
              htmlFor='payroll-search'>
              Search service
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
              <Input
                id='payroll-search'
                value={searchTerm}
                onChange={(event) => onSearchTermChange(event.target.value)}
                placeholder='Search by service name'
                className='block w-full pl-9 pr-3 py-3 bg-[#F3F3F5] border-transparent rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-[#364153] placeholder-[#334155] sm:text-sm'
              />
            </div>
          </div>

          <div className='flex-1 flex flex-col gap-1.5'>
            <label
              className='font-semibold text-xs text-[#334155] pl-1'
              htmlFor='payroll-start-date'>
              Start date
            </label>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
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
              <Input
                id='payroll-start-date'
                type='date'
                value={startDate}
                onChange={(event) => onStartDateChange(event.target.value)}
                className='block w-full pl-9 pr-3 py-3 bg-[#F3F3F5] border-transparent rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-[#334155] sm:text-sm'
              />
            </div>
          </div>

          <div className='flex-1 flex flex-col gap-1.5'>
            <label
              className='font-semibold text-xs text-[#334155] pl-1'
              htmlFor='payroll-end-date'>
              End date
            </label>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
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
              <Input
                id='payroll-end-date'
                type='date'
                value={endDate}
                onChange={(event) => onEndDateChange(event.target.value)}
                className='block w-full pl-9 pr-3 py-3 bg-[#F3F3F5] border-transparent rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-[#334155] sm:text-sm'
              />
            </div>
          </div>

          <div className='flex-1 flex flex-col gap-1.5'>
            <label
              className='font-semibold text-xs text-[#334155] pl-1'
              htmlFor='payroll-salon-filter'>
              Salon
            </label>
            <div className='relative'>
              <Select
                value={salonId || ALL_SALONS_VALUE}
                disabled={isSalonLoading}
                onValueChange={(value) =>
                  onSalonChange(value === ALL_SALONS_VALUE ? "" : value)
                }>
                <SelectTrigger
                  id='payroll-salon-filter'
                  className='w-full h-11 bg-[#F3F3F5] border-transparent rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-[#334155] sm:text-sm'>
                  <span className='flex-1 text-left text-sm text-[#364153]'>
                    {selectedSalonLabel}
                  </span>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ALL_SALONS_VALUE}>All salons</SelectItem>
                  {salons.map((salon) => (
                    <SelectItem key={salon.value} value={salon.value}>
                      {salon.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
}
