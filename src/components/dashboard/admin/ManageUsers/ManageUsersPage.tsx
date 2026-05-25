"use client";

import { useState } from "react";
import { UsersTable } from "./UsersTable";
import FilterBar from "./FilterBar";
import { useUsersQuery } from "@/actions/admin/useUsers";
import { useSalonsQuery } from "@/actions/admin/useSalons";

const ManageUsersPage = () => {
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [salonId, setSalonId] = useState("");

  const { data, isLoading } = useUsersQuery({
    page: 1,
    limit: 100, // Fetch more for management
    searchTerm: search,
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

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className='flex flex-col gap-6 p-6'>
      <FilterBar
        searchValue={search}
        roleValue={role}
        salonValue={salonId}
        onSearchChange={setSearch}
        onRoleChange={setRole}
        onSalonChange={setSalonId}
        roles={roles}
        salons={salons}
      />
      <UsersTable data={data?.data || []} />
    </div>
  );
};

export default ManageUsersPage;
