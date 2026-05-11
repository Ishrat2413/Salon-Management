import React from 'react';

interface FilterBarProps {
  onSearchChange?: (value: string) => void;
  onRoleChange?: (value: string) => void;
  onSalonChange?: (value: string) => void;
  searchPlaceholder?: string;
  rolePlaceholder?: string;
  salonPlaceholder?: string;
  roles?: Array<{ value: string; label: string }>;
  salons?: Array<{ value: string; label: string }>;
}

const FilterBar: React.FC<FilterBarProps> = ({
  onSearchChange,
  onRoleChange,
  onSalonChange,
  searchPlaceholder = 'Search by name or email...',
  rolePlaceholder = 'Filter by Role',
  salonPlaceholder = 'Filter by Salon',
  roles = [
    { value: 'admin', label: 'Admin' },
    { value: 'user', label: 'User' },
  ],
  salons = [
    { value: 'salon1', label: 'Salon 1' },
    { value: 'salon2', label: 'Salon 2' },
  ],
}) => {
  return (
    <div className='w-full mx-auto pb-6'>
      <div className='bg-[#FFFFFF] rounded-xl p-5  filter-container-shadow'>
        <div className='flex flex-col md:flex-row gap-4'>
          {/* Search Section */}
          <div className='flex-1 flex flex-col gap-1.5'>
            <label className='font-semibold text-xs text-[#334155] pl-1' htmlFor='search-input'>
              Search
            </label>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                {/* Magnifying Glass Icon */}
                <svg
                  className='h-4 w-4 text-[#334155]'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  viewBox='0 0 24 24'
                >
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

          {/* Role Filter Section */}
          <div className='flex-1 flex flex-col gap-1.5'>
            <label className='font-semibold text-xs text-[#364153] pl-1' htmlFor='role-select'>
              Role
            </label>
            <div className='relative'>
              <select
                className='block w-full pl-4 pr-10 py-3 bg-[#F3F3F5] border-transparent rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-[#334155] sm:text-sm appearance-none'
                id='role-select'
                defaultValue=''
                onChange={(e) => onRoleChange?.(e.target.value)}
              >
                <option disabled value=''>
                  {rolePlaceholder}
                </option>
                {roles.map((role) => (
                  <option key={role.value} value={role.value}>
                    {role.label}
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
                  viewBox='0 0 24 24'
                >
                  <path d='M19 9l-7 7-7-7' strokeLinecap='round' strokeLinejoin='round' />
                </svg>
              </div>
            </div>
          </div>

          {/* Salon Filter Section */}
          <div className='flex-1 flex flex-col gap-1.5'>
            <label className='font-semibold text-xs text-gray-600 pl-1' htmlFor='salon-select'>
              Salon
            </label>
            <div className='relative'>
              <select
                className='block w-full pl-4 pr-10 py-3 bg-[#F3F3F5] border-transparent rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-[#334155] sm:text-sm appearance-none'
                id='salon-select'
                defaultValue=''
                onChange={(e) => onSalonChange?.(e.target.value)}
              >
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
                  viewBox='0 0 24 24'
                >
                  <path d='M19 9l-7 7-7-7' strokeLinecap='round' strokeLinejoin='round' />
                </svg>
              </div>
            </div>
            <p>hello</p>
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

export default FilterBar;
