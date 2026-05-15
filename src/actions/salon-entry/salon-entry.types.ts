export interface Split {
  employeeId: string;
  employeeName: string;
  totalPrice: number;
  tips: number;
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
  createdAt: string;
  totalPrice: number;
  tips: number;
  addHair: number;
  notes: string;
  loggedInUserTotalPrice: number;
  loggedInUserTips: number;
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
    totalPrices: number;
    totalTips: number;
    loggedInUserPrices: number;
    loggedInUserTips: number;
  };
  data: SalonEntry[];
}
