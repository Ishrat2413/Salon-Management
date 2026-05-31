import { useQuery } from "@tanstack/react-query";
import { payrollService } from "@/lib/api/services/payroll.service";
import type { PayrollQueryParams } from "./payroll.types";

export const payrollKeys = {
  all: ["payroll"] as const,
  list: (params: PayrollQueryParams) => ["payroll", params] as const,
  employeeEntries: (employeeId: string, params: { startDate?: string; endDate?: string }) => 
    ["payroll", "employee", employeeId, params] as const,
};

export const usePayrollQuery = (params: PayrollQueryParams) => {
  return useQuery({
    queryKey: payrollKeys.list(params),
    queryFn: () => payrollService.getPayroll(params),
    placeholderData: (previousData) => previousData,
  });
};

export const useEmployeePayrollEntriesQuery = (employeeId: string, params: { startDate?: string; endDate?: string }) => {
  return useQuery({
    queryKey: payrollKeys.employeeEntries(employeeId, params),
    queryFn: () => payrollService.getEmployeeEntries(employeeId, params),
    enabled: !!employeeId,
  });
};
