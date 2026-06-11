import { apiClient } from "../client";

export type WeeklyEarningsData = {
  day: string;
  earnings: number;
};

export type WeeklyEarningsResponse = {
  data: WeeklyEarningsData[];
  totalEarnings: number;
  comparisonPercentage: number;
};

export type SalonRevenueData = {
  day: string;
  revenue: number;
  expenses: number;
};

export const reportService = {
  getWeeklyEmployeeEarnings: async (filters: { startDate?: string; endDate?: string }) => {
    const response = await apiClient.get<{ data: WeeklyEarningsResponse }>("/report/employee-earnings", { params: filters });
    return response.data.data;
  },
  getSalonRevenue: async (filters: { startDate?: string; endDate?: string }) => {
    const response = await apiClient.get<{ data: SalonRevenueData[] }>("/report/salon-revenue", { params: filters });
    return response.data.data;
  },
};

