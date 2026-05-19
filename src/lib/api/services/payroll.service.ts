import { apiClient } from "../client";
import type {
  PayrollQueryParams,
  PayrollResponse,
} from "@/actions/payroll/payroll.types";

export const payrollService = {
  getPayroll: async (params?: PayrollQueryParams): Promise<PayrollResponse> => {
    const response = await apiClient.get("/payroll", { params });
    return response.data;
  },
};
