import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authService } from "@/lib/api/services/auth.service";
import { useAuth } from "@/components/providers/auth-provider";

function getApiErrorMessage(error: any, fallback: string) {
  const responseData = error?.response?.data;

  if (
    typeof responseData?.message === "string" &&
    responseData.message.trim()
  ) {
    return responseData.message;
  }

  if (Array.isArray(responseData?.message) && responseData.message.length > 0) {
    return responseData.message.join(", ");
  }

  if (Array.isArray(responseData?.errors) && responseData.errors.length > 0) {
    const firstError = responseData.errors[0];
    if (typeof firstError?.message === "string" && firstError.message.trim()) {
      return firstError.message;
    }
  }

  return fallback;
}

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
        id: user.id,
        email: user.email,
        role: normalizeRole(user.role),
        fullName: user.fullName,
        salonId: user.salonId,
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

export const useForgotPasswordMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: authService.forgotPassword,
    onSuccess: (data, variables) => {
      if (typeof window !== "undefined") {
        sessionStorage.setItem(
          "resetEmail",
          variables.email.trim().toLowerCase(),
        );
      }
      toast.success(data?.message || "Password reset code sent successfully.");
      router.push("/verify-identity");
    },
    onError: (error: any) => {
      toast.error(getApiErrorMessage(error, "Failed to send reset code."));
    },
  });
};

export const useVerifyResetCodeMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: authService.verifyResetCode,
    onSuccess: (data) => {
      toast.success(data?.message || "Code verified successfully.");
      if (data?.data?.resetToken) {
        sessionStorage.setItem("resetToken", data.data.resetToken);
      }
      router.push("/reset-password");
    },
    onError: (error: any) => {
      toast.error(
        getApiErrorMessage(error, "Invalid or expired verification code."),
      );
    },
  });
};

export const useResetPasswordMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: authService.resetPassword,
    onSuccess: (data) => {
      toast.success(data?.message || "Password has been successfully reset.");
      sessionStorage.removeItem("resetToken");
      sessionStorage.removeItem("resetEmail");
      router.push("/success-reset");
    },
    onError: (error: any) => {
      toast.error(getApiErrorMessage(error, "Failed to reset password."));
    },
  });
};
