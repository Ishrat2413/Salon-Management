"use client";

import React, { useState, useMemo } from "react";
import AllServices, { defaultServices } from "./AllService";
import ServiceFilter from "./ServiceFilter";

const ServicePage = () => {
  const [search, setSearch] = useState("");
  const [salonFilter, setSalonFilter] = useState("");

  const filteredServices = useMemo(() => {
    return defaultServices.filter((service) => {
      const matchesSearch = service.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesSalon = salonFilter
        ? service.salon === salonFilter
        : true;
      return matchesSearch && matchesSalon;
    });
  }, [search, salonFilter]);

  const salons = [
    { value: "Glam Studio", label: "Glam Studio" },
    { value: "Style Lounge", label: "Style Lounge" },
    { value: "Beauty Bar", label: "Beauty Bar" },
  ];

  return (
    <div className='p-8 min-h-screen bg-[#FDF9F9]'>
      <ServiceFilter
        onSearchChange={setSearch}
        onSalonChange={setSalonFilter}
        salons={salons}
      />
      <AllServices 
        services={filteredServices} 
        salons={salons.map(s => s.label)}
      />
    </div>
  );
};

export default ServicePage;
