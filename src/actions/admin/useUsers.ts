import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { userService } from "@/lib/api/services/user.service";
import { toast } from "sonner";

export const useUsersQuery = (params: {
  page: number;
  limit: number;
  searchTerm: string;
}) => {
  return useQuery({
    queryKey: ["users", params],
    queryFn: () => userService.getUsers(params),
  });
};

export const useManagersQuery = () => {
  return useQuery({
    queryKey: ["users", "managers"],
    queryFn: () => userService.getUsers({ page: 1, limit: 100, role: "MANAGER" }),
  });
};

export const useUpdateUserStatusMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, status }: { userId: string; status: string }) =>
      userService.updateStatus(userId, status),
    onMutate: async ({ userId, status }) => {
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
                String(user.id) === userId ? { ...user, status } : user,
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
