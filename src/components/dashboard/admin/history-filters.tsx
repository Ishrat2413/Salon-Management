"use client";

import React from "react";
import { useSalonsQuery } from "@/actions/admin/useSalons";
import { useUsersQuery } from "@/actions/admin/useUsers";

interface HistoryFiltersProps {
  role: "admin" | "employee" | "manager";
  filters: {
    startDate?: string;
    endDate?: string;
    employeeId?: string;
    salonId?: string;
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      startDate?: string;
      endDate?: string;
      employeeId?: string;
      salonId?: string;
    }>
  >;
}

export function HistoryFilters({
  role,
  filters,
  setFilters,
}: HistoryFiltersProps) {
  const { data: salonsData } = useSalonsQuery({
    page: 1,
    limit: 100,
    searchTerm: "",
  });

  const { data: usersData } = useUsersQuery({
    page: 1,
    limit: 100,
    searchTerm: "",
    salonId: filters.salonId,
    enabled: role === "admin" || role === "manager",
  });

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, startDate: e.target.value }));
  };

  const handleEmployeeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters((prev) => ({ ...prev, employeeId: e.target.value }));
  };

  const handleSalonChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters((prev) => ({ ...prev, salonId: e.target.value, employeeId: "" }));
  };

  return (
    <section
      className="bg-white rounded-md p-6 shadow-sm border border-gray-100 flex flex-wrap gap-6 items-end"
      data-purpose="filters-container"
    >
      {/* Date Filter */}
      <div className="flex-1 min-w-[250px]">
        <label
          className="block text-sm font-medium text-gray-500 mb-2"
          htmlFor="date-sort"
        >
          Sort By date
        </label>
        <div className="relative">
          <input
            className="w-full bg-gray-100 border-none rounded-md py-3 px-4 text-sm text-gray-800 focus:ring-2 focus:ring-[#D13C92] focus:outline-none placeholder-gray-400"
            id="date-sort"
            type="date"
            value={filters.startDate || ""}
            onChange={handleDateChange}
          />
        </div>
      </div>

      {/* Employee Filter - Only for Admin/Manager */}
      {(role === "admin" || role === "manager") && (
        <div className="flex-1 min-w-[250px]">
          <label
            className="block text-sm font-medium text-gray-500 mb-2"
            htmlFor="employee-filter"
          >
            Employee
          </label>
          <div className="relative">
            <select
              className="w-full bg-gray-100 border-none rounded-md py-3 px-4 text-sm text-gray-800 appearance-none focus:ring-2 focus:ring-[#D13C92] focus:outline-none"
              id="employee-filter"
              value={filters.employeeId || ""}
              onChange={handleEmployeeChange}
            >
              <option value="">Filter by Employee</option>
              {usersData?.data?.map((user: any) => (
                <option key={user.id} value={user.id}>
                  {user.fullName}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 9l-7 7-7-7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* Salon Filter - Only for Admin */}
      {role === "admin" && (
        <div className="flex-1 min-w-[250px]">
          <label
            className="block text-sm font-medium text-gray-500 mb-2"
            htmlFor="salon-filter"
          >
            Salon
          </label>
          <div className="relative">
            <select
              className="w-full bg-gray-100 border-none rounded-md py-3 px-4 text-sm text-gray-800 appearance-none focus:ring-2 focus:ring-[#D13C92] focus:outline-none"
              id="salon-filter"
              value={filters.salonId || ""}
              onChange={handleSalonChange}
            >
              <option value="">Filter by Salon</option>
              {salonsData?.data?.map((salon: any) => (
                <option key={salon.id} value={salon.id}>
                  {salon.name}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 9l-7 7-7-7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
