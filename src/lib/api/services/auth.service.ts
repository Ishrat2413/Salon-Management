import { apiClient } from "../client";

export const authService = {
  login: async (payload: any) => {
    const response = await apiClient.post("/auth/login", payload);
    return response.data;
  },

  register: async (payload: any) => {
    const response = await apiClient.post("/auth/register", payload);
    return response.data;
  },

  forgotPassword: async (payload: { email: string }) => {
    const response = await apiClient.post(
      "/auth/forgot-password",
      payload,
    );
    return response.data;
  },

  verifyResetCode: async (payload: { email: string; code: string }) => {
    const response = await apiClient.post(
      "/auth/verify-reset-code",
      payload,
    );
    return response.data;
  },

  resetPassword: async (payload: { token: string; newPassword: string }) => {
    const response = await apiClient.post(
      "/auth/reset-password",
      payload,
    );
    return response.data;
  },

  changePassword: async (payload: any) => {
    const response = await apiClient.post(
      "/auth/change-password",
      payload,
    );
    return response.data;
  },
};
