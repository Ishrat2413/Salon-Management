import { apiClient } from "../client";

export interface LengthItem {
  id: string;
  name: string;
}

export interface LengthListMeta {
  page: number;
  limit: number;
  total: number;
}

export interface LengthListResponse {
  success: boolean;
  message: string;
  meta: LengthListMeta;
  data: LengthItem[];
}

export interface LengthSingleResponse {
  success: boolean;
  message: string;
  data: LengthItem;
}

export const lengthService = {
  getLengths: async (params?: {
    page?: number;
    limit?: number;
    searchTerm?: string;
  }): Promise<LengthListResponse> => {
    const response = await apiClient.get("/lengths", { params });
    return response.data;
  },

  createLength: async (payload: { name: string }): Promise<LengthSingleResponse> => {
    const response = await apiClient.post("/lengths", payload);
    return response.data;
  },

  updateLength: async (
    lengthId: string,
    payload: { name?: string },
  ): Promise<LengthSingleResponse> => {
    const response = await apiClient.patch(`/lengths/${lengthId}`, payload);
    return response.data;
  },

  deleteLength: async (lengthId: string): Promise<LengthSingleResponse> => {
    const response = await apiClient.delete(`/lengths/${lengthId}`);
    return response.data;
  },
};
