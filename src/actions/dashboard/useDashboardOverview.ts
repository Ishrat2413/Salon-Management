"use client";

import { useQuery } from "@tanstack/react-query";

import { dashboardService } from "@/lib/api/services/dashboard.service";
import type { DashboardPeriod } from "./dashboard.types";

export const useDashboardOverviewQuery = (params: {
  period: DashboardPeriod;
  enabled?: boolean;
}) => {
  return useQuery({
    queryKey: ["dashboard-overview", params.period],
    queryFn: () =>
      dashboardService
        .getOverview({ period: params.period })
        .then((res) => res.data),
    enabled: params.enabled !== undefined ? params.enabled : true,
  });
};
