import { apiClient } from "../client";

export const salonService = {
  getAllSalons: async (params?: { limit?: number; searchTerm?: string }) => {
    const response = await apiClient.get("/api/v1/salons", { params });
    // Based on the curl output, the response structure is { data: Salon[] } 
    // inside the success object, or just response.data directly.
    return response.data;
  },
};
