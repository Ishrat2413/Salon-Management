import React from "react";
import { Wallet, Briefcase, Users } from "lucide-react";

interface ReportCardProps {
  totalRevenue?: number;
  totalServices?: number;
  activeEmployees?: number;
  revenueGrowth?: number;
  servicesGrowth?: number;
  employeesGrowth?: number;
  revenuePeriod?: string;
  servicesPeriod?: string;
  employeesPeriod?: string;
  className?: string;
}

const ReportCard: React.FC<ReportCardProps> = ({
  totalRevenue = 4250.0,
  totalServices = 165,
  activeEmployees = 12,
  revenueGrowth = 15.2,
  servicesGrowth = 6.3,
  employeesGrowth = 8.3,
  revenuePeriod = "last period",
  servicesPeriod = "last period",
  employeesPeriod = "last period",
  className = "",
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatGrowth = (growth: number) => {
    const sign = growth >= 0 ? "+" : "";
    return `${sign}${growth}%`;
  };

  return (
    <div className={`w-full ${className}`}>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {/* Card - Total Revenue */}
        <article className='bg-white rounded-xl border border-[#F5EBEB] shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] p-6 flex items-start gap-5'>
          {/* Icon Container */}
          <div className='flex-shrink-0 w-[4.5rem] h-[4.5rem] rounded-full bg-[#FDF0F5] flex items-center justify-center text-[#D54D88]'>
            <Wallet size={32} strokeWidth={1.5} />
          </div>
          {/* Details Container */}
          <div className='flex flex-col pt-1'>
            <h2 className='text-[15px] font-medium text-[#8BA2C1] mb-1 leading-none'>
              Total Revenue
            </h2>
            <p className='text-[28px] font-bold text-[#A81A58] mb-2.5 leading-none tracking-tight'>
              {formatCurrency(totalRevenue)}
            </p>
            {/* Status Badge */}
            <span className='inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-[#E6F8ED] text-[#238953] w-fit tracking-wide'>
              {formatGrowth(revenueGrowth)} from {revenuePeriod}
            </span>
          </div>
        </article>

        {/* Card - Total Services */}
        <article className='bg-white rounded-xl border border-[#F5EBEB] shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] p-6 flex items-start gap-5'>
          {/* Icon Container */}
          <div className='flex-shrink-0 w-[4.5rem] h-[4.5rem] rounded-full bg-[#FDF0F5] flex items-center justify-center text-[#D54D88]'>
            <Briefcase size={32} strokeWidth={1.5} />
          </div>
          {/* Details Container */}
          <div className='flex flex-col pt-1'>
            <h2 className='text-[15px] font-medium text-[#8BA2C1] mb-1 leading-none'>
              Total Services
            </h2>
            <p className='text-[28px] font-bold text-[#6D4C41] mb-3 leading-none tracking-tight'>
              {totalServices}
            </p>
            {/* Subtext */}
            <p className='text-[10px] font-medium text-[#A8A2A2] tracking-wide'>
              {formatGrowth(servicesGrowth)} from {servicesPeriod}
            </p>
          </div>
        </article>

        {/* Card - Active Employees */}
        <article className='bg-white rounded-xl border border-[#F5EBEB] shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] p-6 flex items-start gap-5'>
          {/* Icon Container */}
          <div className='flex-shrink-0 w-[4.5rem] h-[4.5rem] rounded-full bg-[#FDF0F5] flex items-center justify-center text-[#D54D88]'>
            <Users size={32} strokeWidth={1.5} />
          </div>
          {/* Details Container */}
          <div className='flex flex-col pt-1'>
            <h2 className='text-[15px] font-medium text-[#8BA2C1] mb-1 leading-none'>
              Active Employees
            </h2>
            <p className='text-[28px] font-bold text-[#6D4C41] mb-3 leading-none tracking-tight'>
              {activeEmployees}
            </p>
            {/* Employee Avatars */}
            <div className='flex items-center gap-0'>
              <div className='flex -space-x-1.5 items-center'>
                <img
                  alt='Employee Avatar 1'
                  className='w-[22px] h-[22px] rounded-full ring-[1.5px] ring-white object-cover'
                  src='https://lh3.googleusercontent.com/aida-public/AB6AXuDd4PhWyVTg4bA5nDsyuvHQ_8x4QNoqRSvn481HbMz0TXr9YoGduzE9H0KlZ-3_iEICNlOF1Xn0L5znwzzL6JiJ0PH8A7nq31b2cRHN-wivhGZCsWFgQwjuy0MdW9w1TmsWPYFRgWV3MjlFLjBcTnDcW-BHlLy93IoejVupJ13fl0UA8oCBwsYtKvcKec5lCX2rn8t-SB6eVNvmHOwSvrJHMyge2g3wPCux6IGsfAXesqo-P9Sr7nNdniIyQ0oUMiJuuC7U2eFyEbcs'
                />
                <img
                  alt='Employee Avatar 2'
                  className='w-[22px] h-[22px] rounded-full ring-[1.5px] ring-white object-cover'
                  src='https://lh3.googleusercontent.com/aida-public/AB6AXuBFErzX08ZYQXZf2NDNjXy8SwqCP0ydFxBMJqkdPRF-ouDk-Cr79rvSWLEMOUBrs9F9IL21pdrwKE_K7VuyJnPyQhhpUH7ZHlSymxvVIkoxhvq-ouJuOyH88pHMUG169ATPXuGQR0oL64acPkH-6vE7Cq4RV-3K44Jcvql0Nq2gBTR-u2rfiSKLMJB7p4JiCTUL-ixmLu_dBe2ZO5VuOX6zHf09UvJOLTa5BuoBQMUctWD1xj1UDlt9BraI2rLlIXr7uKPYcKPozHaa'
                />
                <img
                  alt='Employee Avatar 3'
                  className='w-[22px] h-[22px] rounded-full ring-[1.5px] ring-white object-cover'
                  src='https://lh3.googleusercontent.com/aida-public/AB6AXuAdXszNbChilFlcjTNex7S2f2huVyhlXLLvjD6QjSwYAy1PrZfpAhmgmslJo7KfhFkQh-nluh63vRk6Ug70x5T-nmMzeukIk9oRnjeAC7S4w2TrjgWt1-zLwuQ6LPjLNM68oSu77MXypDuDU6nhwzfwvlDC8YhaLcJPMUCadMZkVZ-BoNENVB2VxcxflO4rPTa5RtXL6oqMoXtr-TZUqbWr3xKV6Za4LJNhq_fS4biqD2Of315VV1TpNWhqOJoRetwl3n-tMpb93TeY'
                />
                {/* Overlap Indicator */}
                <div className='w-[22px] h-[22px] rounded-full ring-[1.5px] ring-white bg-gray-100 flex items-center justify-center z-10'>
                  <span className='text-[8px] font-medium text-gray-500'>
                    +{Math.max(0, activeEmployees - 3)}
                  </span>
                </div>
              </div>
              <p className='text-[10px] font-medium text-[#A8A2A2] tracking-wide ml-2'>
                {formatGrowth(employeesGrowth)} from {employeesPeriod}
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default ReportCard;
