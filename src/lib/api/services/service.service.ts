import { apiClient } from "../client";

export interface ServiceItem {
  id: string;
  name: string;
}

export interface ServiceListMeta {
  page: number;
  limit: number;
  total: number;
}

export interface ServiceListResponse {
  success: boolean;
  message: string;
  meta: ServiceListMeta;
  data: ServiceItem[];
}

export interface ServiceSingleResponse {
  success: boolean;
  message: string;
  data: ServiceItem;
}

export const serviceService = {
  getServices: async (params?: {
    page?: number;
    limit?: number;
    searchTerm?: string;
  }): Promise<ServiceListResponse> => {
    const response = await apiClient.get("/services", { params });
    return response.data;
  },

  createService: async (payload: { name: string }): Promise<ServiceSingleResponse> => {
    const response = await apiClient.post("/services", payload);
    return response.data;
  },

  updateService: async (
    serviceId: string,
    payload: { name?: string },
  ): Promise<ServiceSingleResponse> => {
    const response = await apiClient.patch(`/services/${serviceId}`, payload);
    return response.data;
  },

  deleteService: async (serviceId: string): Promise<ServiceSingleResponse> => {
    const response = await apiClient.delete(`/services/${serviceId}`);
    return response.data;
  },
};
