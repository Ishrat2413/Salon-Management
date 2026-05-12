export function SummaryCards() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-6 relative'>
      <div className='bg-brand-card rounded-md p-6 shadow-sm border border-brand-border flex items-start space-x-4'>
        <div className='w-15 h-15 rounded-full bg-brand-pinkSoft flex items-center justify-center text-brand-pinkIcon shrink-0'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='32'
            height='32'
            viewBox='0 0 40 40'
            fill='none'>
            <path
              d='M20 3.33325V36.6666M28.3333 8.33325H15.8333C14.2862 8.33325 12.8025 8.94783 11.7085 10.0418C10.6146 11.1358 10 12.6195 10 14.1666C10 15.7137 10.6146 17.1974 11.7085 18.2914C12.8025 19.3853 14.2862 19.9999 15.8333 19.9999H24.1667C25.7138 19.9999 27.1975 20.6145 28.2915 21.7085C29.3854 22.8024 30 24.2862 30 25.8333C30 27.3803 29.3854 28.8641 28.2915 29.958C27.1975 31.052 25.7138 31.6666 24.1667 31.6666H10'
              stroke='#D13C92'
              strokeWidth='2'
              stroke-linecap='round'
              stroke-linejoin='round'
            />
          </svg>
        </div>
        <div>
          <h3 className='text-sm font-medium text-blue-300'>
            Today&apos;s Earnings
          </h3>
          <p className='text-2xl font-bold text-brand-pinkIcon mt-1'>$490</p>
          <div className='flex items-center mt-2'>
            <span className='inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-brand-greenSoft text-brand-greenText'>
              <svg
                className='w-3 h-3 mr-1'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'>
                <path
                  d='M5 10l7-7m0 0l7 7m-7-7v18'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'></path>
              </svg>
              +12% from yesterday
            </span>
          </div>
        </div>
      </div>

      {/* Card 2 */}
      <div className='bg-brand-card rounded-md p-6 shadow-sm border border-brand-border flex items-start space-x-4'>
        <div className='w-15 h-15 rounded-full bg-brand-pinkSoft flex items-center justify-center text-brand-pinkIcon shrink-0'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='32'
            height='32'
            viewBox='0 0 40 40'
            fill='none'>
            <path
              d='M26.6654 33.3333V6.66659C26.6654 5.78253 26.3142 4.93468 25.6891 4.30956C25.0639 3.68444 24.2161 3.33325 23.332 3.33325H16.6654C15.7813 3.33325 14.9335 3.68444 14.3083 4.30956C13.6832 4.93468 13.332 5.78253 13.332 6.66659V33.3333'
              stroke='#F6339A'
              strokeWidth='2'
              stroke-linecap='round'
              stroke-linejoin='round'
            />
            <path
              d='M33.332 10H6.66536C4.82442 10 3.33203 11.4924 3.33203 13.3333V30C3.33203 31.841 4.82442 33.3333 6.66536 33.3333H33.332C35.173 33.3333 36.6654 31.841 36.6654 30V13.3333C36.6654 11.4924 35.173 10 33.332 10Z'
              stroke='#F6339A'
              strokeWidth='2'
              stroke-linecap='round'
              stroke-linejoin='round'
            />
          </svg>
        </div>
        <div>
          <h3 className='text-sm font-medium text-blue-300'>
            Today&apos;s Earnings
          </h3>
          <p className='text-2xl font-bold text-yellow-700 mt-1'>4</p>
          <div className='flex items-center mt-2 text-xs text-gray-400'>
            <svg
              className='w-4 h-4 mr-1'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'>
              <path
                d='M13 17h8m0 0V9m0 8l-8-8-4 4-6-6'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'></path>
            </svg>
            ~2 more pending
          </div>
        </div>
      </div>

      {/* Card 3 */}
      <div className='bg-brand-card rounded-md p-6 shadow-sm border border-brand-border flex items-start space-x-4'>
        <div className='w-15 h-15 rounded-full bg-brand-pinkSoft flex items-center justify-center text-brand-pinkIcon shrink-0'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='32'
            height='32'
            viewBox='0 0 40 40'
            fill='none'>
            <path
              d='M36.6654 11.6667L22.4987 25.8334L14.1654 17.5001L3.33203 28.3334'
              stroke='#F6339A'
              strokeWidth='2'
              stroke-linecap='round'
              stroke-linejoin='round'
            />
            <path
              d='M26.668 11.6667H36.668V21.6667'
              stroke='#F6339A'
              strokeWidth='1.66667'
              stroke-linecap='round'
              stroke-linejoin='round'
            />
          </svg>
        </div>
        <div>
          <h3 className='text-sm font-medium text-blue-300'>
            Active Employees
          </h3>
          <p className='text-2xl font-bold text-yellow-700 mt-1'>$122.50</p>
          <div className='flex items-center mt-2 text-xs text-brand-greenText font-medium'>
            Above average
          </div>
        </div>
      </div>
    </div>
  );
}
