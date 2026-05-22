import { apiClient } from "../client";

export interface SalonItem {
  id: string;
  name: string;
  address: string;
  managerId?: string | null;
  manager?: {
    id: string;
    fullName: string;
    email: string;
  } | null;
  users?: Array<{
    id: string;
    fullName: string;
    email: string;
  }>;
  _count?: {
    users: number;
  };
}

export interface SalonListMeta {
  page: number;
  limit: number;
  total: number;
}

export interface SalonListResponse {
  success: boolean;
  message: string;
  meta: SalonListMeta;
  data: SalonItem[];
}

export interface SalonSingleResponse {
  success: boolean;
  message: string;
  data: SalonItem;
}

export const salonService = {
  getSalons: async (params?: {
    page?: number;
    limit?: number;
    searchTerm?: string;
  }): Promise<SalonListResponse> => {
    const response = await apiClient.get("/salons", { params });
    return response.data;
  },

  getSingleSalon: async (salonId: string): Promise<SalonSingleResponse> => {
    const response = await apiClient.get(`/salons/${salonId}`);
    return response.data;
  },

  createSalon: async (payload: {
    name: string;
    address: string;
    managerId?: string;
  }): Promise<SalonSingleResponse> => {
    const response = await apiClient.post("/salons", payload);
    return response.data;
  },

  updateSalon: async (
    salonId: string,
    payload: { name?: string; address?: string; managerId?: string },
  ): Promise<SalonSingleResponse> => {
    const response = await apiClient.patch(`/salons/${salonId}`, payload);
    return response.data;
  },

  deleteSalon: async (salonId: string): Promise<SalonSingleResponse> => {
    const response = await apiClient.delete(`/salons/${salonId}`);
    return response.data;
  },
};
