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
};
