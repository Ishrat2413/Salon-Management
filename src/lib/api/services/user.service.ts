import { apiClient } from "../client";

export const userService = {
  getUsers: async (params?: { page?: number; limit?: number; searchTerm?: string; salonId?: string }) => {
    const response = await apiClient.get("/api/v1/users", { params });
    return response.data;
  },

  updateStatus: async (userId: string, status: string) => {
    const response = await apiClient.patch(`/api/v1/users/${userId}/status`, { status });
    return response.data;
  },
};
