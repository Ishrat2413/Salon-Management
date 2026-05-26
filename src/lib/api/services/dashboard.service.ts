import { apiClient } from "../client";
import type {
  DashboardOverviewResponse,
  DashboardPeriod,
} from "@/actions/dashboard/dashboard.types";

export const dashboardService = {
  getOverview: async (params?: { period?: DashboardPeriod }) => {
    const response = await apiClient.get<{ data: DashboardOverviewResponse }>(
      "/dashboard/overview",
      { params },
    );

    return response.data;
  },
};
