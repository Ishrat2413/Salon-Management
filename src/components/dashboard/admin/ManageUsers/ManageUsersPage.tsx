"use client";

import { useState } from "react";
import { UsersTable } from "./UsersTable";
import FilterBar from "./FilterBar";
import { useUsersQuery } from "@/actions/admin/useUsers";

const ManageUsersPage = () => {
  const [search, setSearch] = useState("");
  const { data, isLoading } = useUsersQuery({
    page: 1,
    limit: 10,
    searchTerm: search,
  });

  const roles = [
    { value: "", label: "All Roles" },
    { value: "admin", label: "Admin" },
    { value: "manager", label: "Manager" },
    { value: "employee", label: "Employee" },
  ];

  const salons = [
    { value: "", label: "All Salons" },
    { value: "glam studio", label: "Glam Studio" },
    { value: "style lounge", label: "Style Lounge" },
    { value: "beauty bar", label: "Beauty Bar" },
  ];

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className='flex flex-col gap-6 p-6'>
      <FilterBar
        onSearchChange={setSearch}
        onRoleChange={() => {}}
        onSalonChange={() => {}}
        roles={roles}
        salons={salons}
      />
      <UsersTable data={data?.data || []} />
    </div>
  );
};

export default ManageUsersPage;
