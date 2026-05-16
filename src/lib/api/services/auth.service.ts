import { apiClient } from "../client";

export const authService = {
  login: async (payload: any) => {
    const response = await apiClient.post("/api/v1/auth/login", payload);
    return response.data;
  },

  register: async (payload: any) => {
    const response = await apiClient.post("/api/v1/auth/register", payload);
    return response.data;
  },

  forgotPassword: async (payload: { email: string }) => {
    const response = await apiClient.post(
      "/api/v1/auth/forgot-password",
      payload,
    );
    return response.data;
  },

  verifyResetCode: async (payload: { email: string; code: string }) => {
    const response = await apiClient.post(
      "/api/v1/auth/verify-reset-code",
      payload,
    );
    return response.data;
  },

  resetPassword: async (payload: { token: string; newPassword: string }) => {
    const response = await apiClient.post(
      "/api/v1/auth/reset-password",
      payload,
    );
    return response.data;
  },
};
