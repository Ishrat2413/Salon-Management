import { apiClient } from "../client";
import type {
  PayrollQueryParams,
  PayrollResponse,
} from "@/actions/payroll/payroll.types";

export const payrollService = {
  getPayroll: async (params?: PayrollQueryParams): Promise<PayrollResponse> => {
    const response = await apiClient.get("/api/v1/payroll", { params });
    return response.data;
  },
};
