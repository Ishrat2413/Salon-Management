export interface Split {
  employeeId: string;
  employeeName: string;
  totalPrice: number;
  tips: number;
  splitPercentage: number;
}

export interface SalonEntry extends Record<string, unknown> {
  id: string;
  clientName: string | null;
  serviceId: string;
  serviceName: string;
  salonId: string;
  salonName: string;
  employeeId: string;
  employeeName: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  statusComment: string | null;
  approvedByName: string | null;
  editedByName?: string | null;
  createdAt: string;
  totalPrice: number;
  actualPrice: number;
  tips: number;
  addHair: number;
  notes: string;
  loggedInUserTotalPrice: number;
  loggedInUserTips: number;
  loggedInUserCommissionRate: number;
  commissionRate: number;
  commissionEarnings: number;
  splitPercentage: number;
  isSplit: boolean;
  splits: Split[];
}

export interface SalonEntriesResponse {
  success: boolean;
  message: string;
  meta: {
    page: number;
    limit: number;
    total: number;
    approvedCount: number;
    totalPrices: number;
    totalTips: number;
    totalCommissionEarnings: number;
    loggedInUserPrices: number;
    loggedInUserTips: number;
    loggedInUserCommissionEarnings: number;
  };
  data: SalonEntry[];
}
