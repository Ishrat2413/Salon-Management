import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authService } from "@/lib/api/services/auth.service";
import { useAuth } from "@/components/providers/auth-provider";

function normalizeRole(role: string) {
  const normalizedRole = role.toLowerCase();

  if (
    normalizedRole === "employee" ||
    normalizedRole === "manager" ||
    normalizedRole === "admin"
  ) {
    return normalizedRole;
  }

  return "employee";
}

export const useLoginMutation = () => {
  const { login } = useAuth();
  const router = useRouter();

  return useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      const { user } = data.data;
      localStorage.setItem("accessToken", data.data.accessToken);
      login({
        email: user.email,
        role: normalizeRole(user.role),
        name: user.fullName,
      });
      toast.success("Successfully logged in");
      router.push("/");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Invalid credentials.");
    },
  });
};

export const useRegisterMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: authService.register,
    onSuccess: () => {
      toast.success("Account created successfully!");
      router.push("/login");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Registration failed.");
    },
  });
};
