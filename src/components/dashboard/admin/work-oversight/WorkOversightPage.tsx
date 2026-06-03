"use client";
import {
  ServiceEntriesTable,
  serviceData,
} from "@/app/(dashboard)/(admin)/work-oversight/ServiceTable";
import { useMemo, useState } from "react";
import WorkOversightFilterBar from "./WorkOversightFilterBar";
import WorkOversightOverview from "./WorkOversightOverview";

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

  // Calculate overview stats from filtered data
  const overviewStats = useMemo(() => {
    const pendingReview = filteredData.filter(
      (entry) => entry.status === "Pending Review",
    ).length;

    const approvedToday = filteredData.filter(
      (entry) =>
        entry.status === "Approved" &&
        entry.dateTime.includes(new Date().toISOString().split("T")[0]),
    ).length;

    const correctionsMade = filteredData.filter(
      (entry) => entry.status === "Corrections Made",
    ).length;

    return { pendingReview, approvedToday, correctionsMade };
  }, [filteredData]);

  const handleCardClick = (
    cardType: "pending" | "approved" | "corrections",
  ) => {
    // Handle card click - could filter table or navigate

    // Example: You could set filters based on card click
    // setStatusFilter(cardType);
  };

  return (
    <div className='w-full space-y-6'>
      {/* Filter Bar Section */}
      <WorkOversightFilterBar
        onSearchChange={setSearch}
        onDateChange={setDate}
        onEmployeeChange={setEmployee}
        onSalonChange={setSalon}
        searchPlaceholder='Search by name or email...'
        datePlaceholder='mm/dd/yy'
        employeePlaceholder='Filter by Employee'
        salonPlaceholder='Filter by Salon'
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

      {/* Service Table Section */}
      <ServiceEntriesTable data={filteredData} />

      {/* Overview Cards Section */}
      <WorkOversightOverview
        pendingReviewCount={overviewStats.pendingReview}
        approvedTodayCount={overviewStats.approvedToday}
        correctionsMadeCount={overviewStats.correctionsMade}
        onCardClick={handleCardClick}
      />
    </div>
  );
};

export default WorkOversightPage;
