"use client";
import { useState, useMemo } from "react";
import { ServiceEntriesTable, serviceData } from "@/app/(dashboard)/(admin)/work-oversight/ServiceTable";
import WorkOversightFilterBar from "./WorkOversightFilterBar";

const WorkOversightPage = () => {
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const [employee, setEmployee] = useState("");
  const [salon, setSalon] = useState("");

  const filteredData = useMemo(() => {
    return serviceData.filter((entry) => {
      const matchesSearch = 
        entry.name.toLowerCase().includes(search.toLowerCase()) || 
        entry.service.toLowerCase().includes(search.toLowerCase());
      
      // Basic date filtering - in a real app you'd parse dates
      const matchesDate = date ? entry.dateTime.includes(date) : true;
      
      const matchesEmployee = employee ? entry.name === employee : true;
      const matchesSalon = salon ? entry.salon === salon : true;
      
      return matchesSearch && matchesDate && matchesEmployee && matchesSalon;
    });
  }, [search, date, employee, salon]);

  return (
    <div className='w-full'>
      <WorkOversightFilterBar 
        onSearchChange={setSearch}
        onDateChange={setDate}
        onEmployeeChange={setEmployee}
        onSalonChange={setSalon}
        employees={[
          { value: "Sarah Johnson", label: "Sarah Johnson" },
          { value: "Mike Chen", label: "Mike Chen" },
          { value: "Emily Rodriguez", label: "Emily Rodriguez" },
        ]}
        salons={[
          { value: "Glam Studio", label: "Glam Studio" },
          { value: "Style Lounge", label: "Style Lounge" },
          { value: "Beauty Bar", label: "Beauty Bar" },
        ]}
      />
      <ServiceEntriesTable data={filteredData} />
    </div>
  );
};

export default WorkOversightPage;
