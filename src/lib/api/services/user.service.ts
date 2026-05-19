import { apiClient } from "../client";
import type { UserRole } from "@/actions/auth/auth.types";

export const userService = {
  getUsers: async (params?: {
    page?: number;
    limit?: number;
    searchTerm?: string;
    salonId?: string;
    role?: UserRole;
  }) => {
    const response = await apiClient.get("/users", { params });
    return response.data;
  },

  updateStatus: async (userId: string, status: string) => {
    const response = await apiClient.patch(`/users/${userId}/status`, {
      status,
    });
    return response.data;
  },
};
