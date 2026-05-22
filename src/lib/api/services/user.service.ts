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

  updateStatus: async (userId: string, status: string, commissionRate?: number) => {
    const response = await apiClient.patch(`/users/${userId}/status`, {
      status,
      commissionRate,
    });
    return response.data;
  },

  updateCommissionRate: async (userId: string, commissionRate: number) => {
    const response = await apiClient.patch(`/users/${userId}/commission-rate`, {
      commissionRate,
    });
    return response.data;
  },

  updateRole: async (userId: string, role: string) => {
    const response = await apiClient.patch(`/users/${userId}/role`, {
      role,
    });
    return response.data;
  },

  deleteUser: async (userId: string) => {
    const response = await apiClient.delete(`/users/${userId}`);
    return response.data;
  },
};
