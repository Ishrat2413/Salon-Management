"use client";

import React, { useState, useMemo } from "react";
import { SalonTable, Salon } from "./SalonTable";
import SalonSearchFilter from "./SalonSearch";

// ─── Seed Data (Moved from Table for shared access if needed) ───────────────

const initialSalonData: Salon[] = [
  {
    id: 1,
    salonName: "Glam Studio",
    managerName: "Emily Rodriguez",
    employees: [
      { avatar: "https://i.pravatar.cc/40?img=1", name: "Alice" },
      { avatar: "https://i.pravatar.cc/40?img=2", name: "Bob" },
      { avatar: "https://i.pravatar.cc/40?img=3", name: "Carol" },
    ],
    totalEmployees: 24,
    address: "2715 Ash Dr. San Jose, South Dakota 83475",
  },
  {
    id: 2,
    salonName: "Style Lounge",
    managerName: "Sarah Chen",
    employees: [
      { avatar: "https://i.pravatar.cc/40?img=4", name: "Dan" },
      { avatar: "https://i.pravatar.cc/40?img=5", name: "Eve" },
      { avatar: "https://i.pravatar.cc/40?img=6", name: "Frank" },
    ],
    totalEmployees: 24,
    address: "3517 W. Gray St. Utica, Pennsylvania 57867",
  },
  {
    id: 3,
    salonName: "Beauty Bar",
    managerName: "Michael Mike",
    employees: [
      { avatar: "https://i.pravatar.cc/40?img=7", name: "Grace" },
      { avatar: "https://i.pravatar.cc/40?img=8", name: "Hank" },
      { avatar: "https://i.pravatar.cc/40?img=9", name: "Ivy" },
    ],
    totalEmployees: 24,
    address: "2972 Westheimer Rd. Santa Ana, Illinois 85486",
  },
];

const SalonManagementPage = () => {
  const [search, setSearch] = useState("");
  const [managerFilter, setManagerFilter] = useState("");
  const [addressFilter, setAddressFilter] = useState("");

  const filteredData = useMemo(() => {
    return initialSalonData.filter((salon) => {
      const matchesSearch = salon.salonName
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesManager = managerFilter
        ? salon.managerName === managerFilter
        : true;
      const matchesAddress = addressFilter
        ? salon.address.includes(addressFilter)
        : true;

      return matchesSearch && matchesManager && matchesAddress;
    });
  }, [search, managerFilter, addressFilter]);

  const managers = [
    { value: "Emily Rodriguez", label: "Emily Rodriguez" },
    { value: "Sarah Chen", label: "Sarah Chen" },
    { value: "Michael Mike", label: "Michael Mike" },
  ];

  const addresses = [
    { value: "South Dakota", label: "South Dakota" },
    { value: "Pennsylvania", label: "Pennsylvania" },
    { value: "Illinois", label: "Illinois" },
  ];

  return (
    <div className='p-8 min-h-screen bg-[#FDF9F9]'>
      <SalonSearchFilter
        onSearchChange={setSearch}
        onManagerChange={setManagerFilter}
        onAddressChange={setAddressFilter}
        managers={managers}
        addresses={addresses}
      />
      <SalonTable data={filteredData} />
    </div>
  );
};

export default SalonManagementPage;
