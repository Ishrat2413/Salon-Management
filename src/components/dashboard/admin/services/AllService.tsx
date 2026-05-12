"use client";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ServiceItem {
  id: number;
  name: string;
}

interface AllServicesProps {
  services?: ServiceItem[];
  onItemClick?: (item: ServiceItem) => void;
}

// ─── Default Data ─────────────────────────────────────────────────────────────

const defaultServices: ServiceItem[] = [
  { id: 1, name: "Sarah Johnson" },
  { id: 2, name: "Mike Chen" },
  { id: 3, name: "Emily Rodriguez" },
  { id: 4, name: "Emily Rodriguez" },
  { id: 5, name: "Emily Rodriguez" },
  { id: 6, name: "Emily Rodriguez" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export function AllServices({
  services = defaultServices,
  onItemClick,
}: AllServicesProps) {
  return (
    <div
      className='w-full  bg-white rounded-[24px] border border-white shadow-sm px-8 py-10'
      style={{ background: "#fff" }}>
      {/* Page Header */}
      <h1 className='text-[22px] font-semibold text-[#334c6e] mb-8 leading-none'>
        All Services ({services.length})
      </h1>

      {/* List Card */}
      <div className='border border-[#f0f2f5] rounded-[12px] overflow-hidden bg-white '>
        {/* List Header */}
        <div className='px-6 py-[18px] border-b border-[#f0f2f5] bg-white'>
          <span className='text-[13px] font-semibold text-[#1f2937] tracking-wide'>
            Service Name
          </span>
        </div>

        {/* List Items */}
        <div className='flex flex-col'>
          {services.map((item, index) => {
            const isLast = index === services.length - 1;
            return (
              <div
                key={item.id}
                onClick={() => onItemClick?.(item)}
                className={`
                  px-6 py-[14px] bg-white
                  hover:bg-gray-50 transition-colors duration-150 ease-in-out
                  ${!isLast ? "border-b border-[#f0f2f5]" : "min-h-[56px] flex items-center"}
                  ${onItemClick ? "cursor-pointer" : ""}
                `}>
                <p className='text-[13px] font-medium text-[#5a6872] leading-none'>
                  {item.name}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default AllServices;
