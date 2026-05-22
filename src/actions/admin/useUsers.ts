import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { userService } from "@/lib/api/services/user.service";
import { toast } from "sonner";

export const useUsersQuery = (params: {
  page: number;
  limit: number;
  searchTerm: string;
  salonId?: string;
  role?: string;
  enabled?: boolean;
}) => {
  return useQuery({
    queryKey: [
      "users",
      params.page,
      params.limit,
      params.searchTerm,
      params.salonId,
      params.role,
    ],
    queryFn: () =>
      userService.getUsers({
        page: params.page,
        limit: params.limit,
        searchTerm: params.searchTerm,
        salonId: params.salonId,
        role: params.role as any,
      }),
    enabled: params.enabled !== undefined ? params.enabled : true,
  });
};

export const useManagersQuery = () => {
  return useQuery({
    queryKey: ["users", "managers"],
    queryFn: () =>
      userService.getUsers({ page: 1, limit: 100, role: "MANAGER" }),
  });
};

export const useCurrentUserQuery = (enabled = true) => {
  return useQuery({
    queryKey: ["users", "me"],
    queryFn: () => userService.getMe(),
    enabled,
  });
};

export const useUpdateUserStatusMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      userId,
      status,
      commissionRate,
    }: {
      userId: string;
      status: string;
      commissionRate?: number;
    }) => userService.updateStatus(userId, status, commissionRate),
    onMutate: async ({ userId, status, commissionRate }) => {
      await queryClient.cancelQueries({ queryKey: ["users"] });

      const previousQueries = queryClient.getQueriesData({
        queryKey: ["users"],
      });

      queryClient.setQueriesData({ queryKey: ["users"] }, (oldData: any) => {
        if (!oldData?.data) {
          return oldData;
        }

        const currentUser = oldData.data.find(
          (user: any) => String(user.id) === userId,
        );
        if (!currentUser) {
          return oldData;
        }

        const shouldRemove =
          currentUser.status === "PENDING" && status === "REJECTED";

        return {
          ...oldData,
          data: shouldRemove
            ? oldData.data.filter((user: any) => String(user.id) !== userId)
            : oldData.data.map((user: any) =>
                String(user.id) === userId
                  ? {
                      ...user,
                      status,
                      commissionRate:
                        commissionRate !== undefined
                          ? commissionRate
                          : user.commissionRate,
                    }
                  : user,
              ),
        };
      });

      return { previousQueries };
    },
    onError: (_error, _variables, context) => {
      context?.previousQueries?.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });

      toast.error("Failed to update status.");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User status updated successfully.");
    },
  });
};

export const useUpdateCommissionRateMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      userId,
      commissionRate,
    }: {
      userId: string;
      commissionRate: number;
    }) => userService.updateCommissionRate(userId, commissionRate),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Commission rate updated successfully.");
    },
    onError: () => {
      toast.error("Failed to update commission rate.");
    },
  });
};

export const useUpdateProfileMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      fullName?: string;
      phoneNumber?: string;
      address?: string;
    }) => userService.updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users", "me"] });
      toast.success("Profile updated successfully.");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update profile.");
    },
  });
};

export const useUpdateUserRoleMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, role }: { userId: string; role: string }) =>
      userService.updateRole(userId, role),
    onMutate: async ({ userId, role }) => {
      await queryClient.cancelQueries({ queryKey: ["users"] });

      const previousQueries = queryClient.getQueriesData({
        queryKey: ["users"],
      });

      queryClient.setQueriesData({ queryKey: ["users"] }, (oldData: any) => {
        if (!oldData?.data) {
          return oldData;
        }

        return {
          ...oldData,
          data: oldData.data.map((user: any) =>
            String(user.id) === userId ? { ...user, role } : user,
          ),
        };
      });

      return { previousQueries };
    },
    onError: (_error, _variables, context) => {
      context?.previousQueries?.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });

      toast.error("Failed to update role.");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User role updated successfully.");
    },
  });
};

export const useDeleteUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => userService.deleteUser(userId),
    onMutate: async (userId) => {
      await queryClient.cancelQueries({ queryKey: ["users"] });

      const previousQueries = queryClient.getQueriesData({
        queryKey: ["users"],
      });

      queryClient.setQueriesData({ queryKey: ["users"] }, (oldData: any) => {
        if (!oldData?.data) {
          return oldData;
        }

        return {
          ...oldData,
          data: oldData.data.filter((user: any) => String(user.id) !== userId),
        };
      });

      return { previousQueries };
    },
    onError: (error: any, _variables, context) => {
      context?.previousQueries?.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });

      // Display backend error if present (e.g., associated entries error)
      const message = error.response?.data?.message || "Failed to delete user.";
      toast.error(message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User deleted successfully.");
    },
  });
};
