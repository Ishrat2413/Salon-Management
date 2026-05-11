"use client";
import React, { useState, useMemo } from "react";
import { UsersTable, User } from "./UsersTable";
import FilterBar from "./FilterBar";

const usersData: User[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Admin",
    salon: "Glam Studio",
    email: "sarah@example.com",
    status: "Active",
  },
  {
    id: 2,
    name: "Mike Chen",
    role: "Manager",
    salon: "Style Lounge",
    email: "mike@example.com",
    status: "Active",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Employee",
    salon: "Beauty Bar",
    email: "emily@example.com",
    status: "Active",
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    role: "Employee",
    salon: "Glam Studio",
    email: "emily2@example.com",
    status: "Inactive",
  },
];

const ManageUsersPage = () => {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [salonFilter, setSalonFilter] = useState("");

  const filteredData = useMemo(() => {
    return usersData.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase());
      
      const matchesRole = roleFilter ? user.role.toLowerCase() === roleFilter.toLowerCase() : true;
      const matchesSalon = salonFilter ? user.salon.toLowerCase() === salonFilter.toLowerCase() : true;

      return matchesSearch && matchesRole && matchesSalon;
    });
  }, [search, roleFilter, salonFilter]);

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

  return (
    <div className="flex flex-col gap-6 p-6">
      <FilterBar 
        onSearchChange={setSearch}
        onRoleChange={setRoleFilter}
        onSalonChange={setSalonFilter}
        roles={roles}
        salons={salons}
      />
      <UsersTable data={filteredData} />
    </div>
  );
};

export default ManageUsersPage;
