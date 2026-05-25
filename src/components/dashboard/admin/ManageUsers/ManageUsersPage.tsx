"use client";

import { useState, useEffect } from "react";
import { UsersTable } from "./UsersTable";
import FilterBar from "./FilterBar";
import { useUsersQuery } from "@/actions/admin/useUsers";
import { useSalonsQuery } from "@/actions/admin/useSalons";
import { Loader2 } from "lucide-react";

const ManageUsersPage = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [role, setRole] = useState("");
  const [salonId, setSalonId] = useState("");

  // Debounce search input
  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setSearchTerm(searchInput.trim());
    }, 300);

    return () => window.clearTimeout(timeoutId);
  }, [searchInput]);

  const { data, isLoading, isFetching } = useUsersQuery({
    page: 1,
    limit: 100, // Fetch more for management
    searchTerm: searchTerm,
    role: role || undefined,
    salonId: salonId || undefined,
  });

  const { data: salonsData } = useSalonsQuery({
    page: 1,
    limit: 100,
    searchTerm: "",
  });

  const roles = [
    { value: "", label: "All Roles" },
    { value: "ADMIN", label: "Admin" },
    { value: "MANAGER", label: "Manager" },
    { value: "EMPLOYEE", label: "Employee" },
  ];

  const salons = [
    { value: "", label: "All Salons" },
    ...(salonsData?.data?.map((salon: any) => ({
      value: salon.id,
      label: salon.name,
    })) || []),
  ];

  return (
    <div className='flex flex-col gap-6 p-6 relative'>
      {/* Absolute positioned spinner to prevent layout shift */}
      <div className={`fixed top-20 right-8 z-60 transition-opacity duration-300 ${isFetching ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="bg-white/80 backdrop-blur-sm shadow-lg rounded-full p-2 border border-pink-100">
           <Loader2 className="h-5 w-5 animate-spin text-[#D13C92]" />
        </div>
      </div>

      <FilterBar
        searchValue={searchInput}
        roleValue={role}
        salonValue={salonId}
        onSearchChange={setSearchInput}
        onRoleChange={setRole}
        onSalonChange={setSalonId}
        roles={roles}
        salons={salons}
      />
      <div className={`transition-opacity duration-300 ${isFetching && !isLoading ? 'opacity-60' : 'opacity-100'}`}>
        <UsersTable data={data?.data || []} />
      </div>
    </div>
  );
};

export default ManageUsersPage;
