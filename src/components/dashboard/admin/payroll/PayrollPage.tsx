"use client";
import { useMemo, useState } from "react";
import PayrollFilterBar from "./PayrollFilterBar";
import { PayrollTable, payrollData } from "./PayrollTable";

const PayrollPage = () => {
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const [employee, setEmployee] = useState("");
  const [salon, setSalon] = useState("");

  const filteredData = useMemo(() => {
    return payrollData.filter((entry) => {
      const matchesSearch =
        entry.name.toLowerCase().includes(search.toLowerCase()) ||
        entry.service.toLowerCase().includes(search.toLowerCase());

      const matchesDate = date ? entry.dateTime.includes(date) : true;
      const matchesEmployee = employee ? entry.name === employee : true;
      const matchesSalon = salon ? entry.salon === salon : true;

      return matchesSearch && matchesDate && matchesEmployee && matchesSalon;
    });
  }, [search, date, employee, salon]);

  return (
    <div className='w-full space-y-6'>
      <PayrollFilterBar
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
      <PayrollTable data={filteredData} />
    </div>
  );
};

export default PayrollPage;
