"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import { AddServiceModal } from "./AddServiceModal";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ServiceItem {
  id: number;
  name: string;
  salon: string;
}

interface AllServicesProps {
  services?: ServiceItem[];
  onItemClick?: (item: ServiceItem) => void;
  salons?: string[];
}

// ─── Default Data ─────────────────────────────────────────────────────────────

export const defaultServices: ServiceItem[] = [
  { id: 1, name: "Box Braids", salon: "Glam Studio" },
  { id: 2, name: "Cornrows", salon: "Style Lounge" },
  { id: 3, name: "Weave Install", salon: "Beauty Bar" },
  { id: 4, name: "Locs Maintenance", salon: "Glam Studio" },
  { id: 5, name: "Twist Out", salon: "Style Lounge" },
  { id: 6, name: "Crochet Braids", salon: "Beauty Bar" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export function AllServices({
  services = defaultServices,
  onItemClick,
  salons = ["Glam Studio", "Style Lounge", "Beauty Bar"],
}: AllServicesProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddService = (newService: Omit<ServiceItem, "id">) => {
    console.log("Adding service:", newService);
    // Logic to update state or call API would go here
  };

  return (
    <div
      className='w-full bg-white rounded-[24px] border border-white shadow-sm px-8 py-10'
      style={{ background: "#fff" }}>
      {/* Page Header */}
      <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8'>
        <h1 className='text-[22px] font-semibold text-[#334c6e] leading-none'>
          All Services ({services.length})
        </h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className='flex items-center justify-center gap-2 h-[40px] px-5 bg-[#D83B8F] text-white text-[13px] font-medium rounded-[8px] hover:bg-[#C23580] transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D83B8F]/20'>
          <Plus className='w-4 h-4' />
          Add Service
        </button>
      </div>

      {/* List Card */}
      <div className='border border-[#f0f2f5] rounded-[12px] overflow-hidden bg-white '>
        {/* List Header */}
        <div className='px-6 py-[18px] border-b border-[#f0f2f5] bg-white grid grid-cols-2'>
          <span className='text-[13px] font-semibold text-[#1f2937] tracking-wide'>
            Service Name
          </span>
          <span className='text-[13px] font-semibold text-[#1f2937] tracking-wide'>
            Salon
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
                  px-6 py-[14px] bg-white grid grid-cols-2
                  hover:bg-gray-50 transition-colors duration-150 ease-in-out
                  ${!isLast ? "border-b border-[#f0f2f5]" : "min-h-[56px] flex items-center"}
                  ${onItemClick ? "cursor-pointer" : ""}
                `}>
                <p className='text-[13px] font-medium text-[#5a6872] leading-none'>
                  {item.name}
                </p>
                <p className='text-[13px] font-medium text-[#9CA3AF] leading-none'>
                  {item.salon}
                </p>
              </div>
            );
          })}
          {services.length === 0 && (
            <div className='px-6 py-10 text-center text-[#9CA3AF] text-sm'>
              No services found matching your filters.
            </div>
          )}
        </div>
      </div>

      <AddServiceModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddService}
        salons={salons}
      />
    </div>
  );
}

export default AllServices;
