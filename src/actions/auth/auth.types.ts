export type UserRole = "EMPLOYEE" | "MANAGER" | "ADMIN";

export interface User {
  id?: string;
  fullName: string;
  email: string;
  role: UserRole;
  salonId?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
    user: User;
  };
}
