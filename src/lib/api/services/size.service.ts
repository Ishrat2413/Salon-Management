import { apiClient } from "../client";

export interface SizeItem {
  id: string;
  name: string;
}

export interface SizeListMeta {
  page: number;
  limit: number;
  total: number;
}

export interface SizeListResponse {
  success: boolean;
  message: string;
  meta: SizeListMeta;
  data: SizeItem[];
}

export interface SizeSingleResponse {
  success: boolean;
  message: string;
  data: SizeItem;
}

export const sizeService = {
  getSizes: async (params?: {
    page?: number;
    limit?: number;
    searchTerm?: string;
  }): Promise<SizeListResponse> => {
    const response = await apiClient.get("/sizes", { params });
    return response.data;
  },

  createSize: async (payload: { name: string }): Promise<SizeSingleResponse> => {
    const response = await apiClient.post("/sizes", payload);
    return response.data;
  },

  updateSize: async (
    sizeId: string,
    payload: { name?: string },
  ): Promise<SizeSingleResponse> => {
    const response = await apiClient.patch(`/sizes/${sizeId}`, payload);
    return response.data;
  },

  deleteSize: async (sizeId: string): Promise<SizeSingleResponse> => {
    const response = await apiClient.delete(`/sizes/${sizeId}`);
    return response.data;
  },
};
