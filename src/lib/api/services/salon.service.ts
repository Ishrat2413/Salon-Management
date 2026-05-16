import { apiClient } from "../client";

export interface SalonItem {
  id: string;
  name: string;
  address: string;
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
    const response = await apiClient.get("/api/v1/salons", { params });
    return response.data;
  },

  getSingleSalon: async (salonId: string): Promise<SalonSingleResponse> => {
    const response = await apiClient.get(`/api/v1/salons/${salonId}`);
    return response.data;
  },

  createSalon: async (payload: {
    name: string;
    address: string;
  }): Promise<SalonSingleResponse> => {
    const response = await apiClient.post("/api/v1/salons", payload);
    return response.data;
  },

  updateSalon: async (
    salonId: string,
    payload: { name?: string; address?: string },
  ): Promise<SalonSingleResponse> => {
    const response = await apiClient.patch(`/api/v1/salons/${salonId}`, payload);
    return response.data;
  },

  deleteSalon: async (salonId: string): Promise<SalonSingleResponse> => {
    const response = await apiClient.delete(`/api/v1/salons/${salonId}`);
    return response.data;
  },
};
