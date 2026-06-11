"use client";

import React, { useState } from "react";
import ServicePage from "@/components/dashboard/admin/services/ServicePage";
import SizePage from "@/components/dashboard/admin/services/SizePage";
import LengthPage from "@/components/dashboard/admin/services/LengthPage";

const AddServiceRootPage = () => {
  const [activeTab, setActiveTab] = useState("service");

  const tabClasses = (tabName: string) => `
    flex-1 py-4 text-center text-sm sm:text-base font-semibold transition-all duration-300
    border-b-2 outline-none relative
    ${activeTab === tabName 
      ? "border-[#D13C92] text-[#D13C92] bg-pink-50/40" 
      : "border-transparent text-gray-500 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-200"}
  `;

  return (
    <div className="bg-[#FDF9F9] min-h-[calc(100vh-4rem)]">
      {/* Tabs Header */}
      <div className="bg-white border-b max-w-7xl mx-auto border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto w-full">
          <nav className="flex w-full" aria-label="Tabs">
            <button
              onClick={() => setActiveTab("service")}
              className={tabClasses("service")}
            >
              Services
            </button>
            <button
              onClick={() => setActiveTab("size")}
              className={tabClasses("size")}
            >
              Sizes
            </button>
            <button
              onClick={() => setActiveTab("length")}
              className={tabClasses("length")}
            >
              Lengths
            </button>
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto">
        {activeTab === "service" && <ServicePage />}
        {activeTab === "size" && <SizePage />}
        {activeTab === "length" && <LengthPage />}
      </div>
    </div>
  );
};

export default AddServiceRootPage;
