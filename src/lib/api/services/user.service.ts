import { apiClient } from "../client";
import type { UserRole } from "@/actions/auth/auth.types";

export const userService = {
  getUsers: async (params?: { page?: number; limit?: number; searchTerm?: string; role?: string }) => {
    const response = await apiClient.get("/api/v1/users", { params });
    return response.data;
  },

  updateStatus: async (userId: string, status: string) => {
    const response = await apiClient.patch(`/api/v1/users/${userId}/status`, {
      status,
    });
    return response.data;
  },
};
