import { apiClient } from "../client";
import type { UserRole } from "@/actions/auth/auth.types";

export const userService = {
  getMe: async () => {
    const response = await apiClient.get("/users/me");
    return response.data;
  },

  getUsers: async (params?: {
    page?: number;
    limit?: number;
    searchTerm?: string;
    salonId?: string;
    role?: UserRole;
    status?: string;
  }) => {
    const response = await apiClient.get("/users", { params });
    return response.data;
  },

  updateStatus: async (
    userId: string,
    status: string,
    commissionRate?: number,
  ) => {
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

  updateProfile: async (data: {
    fullName?: string;
    phoneNumber?: string;
    address?: string;
  }) => {
    const response = await apiClient.patch(`/users/me/profile`, data);
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
