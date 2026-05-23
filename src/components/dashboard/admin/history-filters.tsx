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
    status?: string;
  };
  setFilters: React.Dispatch<
    React.SetStateAction<any>
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

  const handleEmployeeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters((prev: any) => ({ ...prev, employeeId: e.target.value }));
  };

  const handleSalonChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters((prev: any) => ({ ...prev, salonId: e.target.value, employeeId: "" }));
  };

  if (role === "employee") return null;

  return (
    <>
      {/* Employee Filter - Only for Admin/Manager */}
      {(role === "admin" || role === "manager") && (
        <div className="space-y-1.5">
          <label
            className="text-xs font-medium text-gray-500 ml-1"
            htmlFor="employee-filter"
          >
            Employee
          </label>
          <div className="relative">
            <select
              className="w-full bg-gray-50 border border-gray-100 rounded-lg py-2.5 px-4 text-sm text-gray-800 appearance-none focus:ring-2 focus:ring-[#D13C92] focus:outline-none transition-all"
              id="employee-filter"
              value={filters.employeeId || ""}
              onChange={handleEmployeeChange}
            >
              <option value="">All Employees</option>
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
        <div className="space-y-1.5">
          <label
            className="text-xs font-medium text-gray-500 ml-1"
            htmlFor="salon-filter"
          >
            Salon
          </label>
          <div className="relative">
            <select
              className="w-full bg-gray-50 border border-gray-100 rounded-lg py-2.5 px-4 text-sm text-gray-800 appearance-none focus:ring-2 focus:ring-[#D13C92] focus:outline-none transition-all"
              id="salon-filter"
              value={filters.salonId || ""}
              onChange={handleSalonChange}
            >
              <option value="">All Salons</option>
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
    </>
  );
}
