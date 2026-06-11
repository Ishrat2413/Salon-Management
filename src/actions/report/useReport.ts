"use client";

import { useQuery } from "@tanstack/react-query";
import { reportService } from "@/lib/api/services/report.service";

export const useWeeklyEmployeeEarningsQuery = (filters: { startDate?: string; endDate?: string }) => {
  return useQuery({
    queryKey: ["report", "weekly-employee-earnings", filters],
    queryFn: () => reportService.getWeeklyEmployeeEarnings(filters),
  });
};

export const useSalonRevenueQuery = (filters: { startDate?: string; endDate?: string }) => {
  return useQuery({
    queryKey: ["report", "salon-revenue", filters],
    queryFn: () => reportService.getSalonRevenue(filters),
  });
};
