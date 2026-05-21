import { apiClient } from "../client";
import { SalonEntriesResponse } from "@/actions/salon-entry/salon-entry.types";

export const salonEntryService = {
  getAllEntries: async (params?: { page?: number; limit?: number }) => {
    const response = await apiClient.get<SalonEntriesResponse>(
      "/salon-entries",
      { params },
    );
    return response.data;
  },

  getEntryById: async (id: string) => {
    const response = await apiClient.get<SalonEntriesResponse["data"][number]>(
      `/salon-entries/${id}`,
    );
    return response.data;
  },

  updateStatus: async (id: string, status: string, statusComment?: string) => {
    const response = await apiClient.patch<
      SalonEntriesResponse["data"][number]
    >(`/salon-entries/${id}/status`, { status, statusComment });
    return response.data;
  },

  updateEntry: async (id: string, data: Record<string, unknown>) => {
    const response = await apiClient.patch<
      SalonEntriesResponse["data"][number]
    >(`/salon-entries/${id}`, data);
    return response.data;
  },
  createEntry: async (data: Record<string, unknown>) => {
    const response = await apiClient.post<SalonEntriesResponse["data"][number]>(
      `/salon-entries`,
      data,
    );
    return response.data;
  },
  deleteEntry: async (id: string) => {
    const response = await apiClient.delete(`/salon-entries/${id}`);
    return response.data;
  },
};
