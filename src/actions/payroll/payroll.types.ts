export interface PayrollQueryParams {
  searchTerm?: string;
  startDate?: string;
  endDate?: string;
  salonId?: string;
}

export interface PayrollRow extends Record<string, unknown> {
  serviceId: string;
  serviceName: string;
  salonId: string;
  salonName: string;
  totalOccurrences: number;
  totalIncome: number;
  totalTips: number;
}

export interface PayrollResponse {
  success: boolean;
  message: string;
  data: PayrollRow[];
}

export interface PayrollSalonOption {
  value: string;
  label: string;
}
