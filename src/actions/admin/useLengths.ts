import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { lengthService } from "@/lib/api/services/length.service";

const lengthKeys = {
  all: ["lengths"] as const,
  list: (params: { page: number; limit: number; searchTerm: string }) =>
    ["lengths", params] as const,
};

function getApiErrorMessage(error: any, fallback: string) {
  const responseData = error?.response?.data;

  if (typeof responseData?.message === "string" && responseData.message.trim()) {
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

export const useLengthsQuery = (params: {
  page: number;
  limit: number;
  searchTerm: string;
}) => {
  return useQuery({
    queryKey: lengthKeys.list(params),
    queryFn: () => lengthService.getLengths(params),
    placeholderData: (previousData) => previousData,
  });
};

export const useCreateLengthMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: lengthService.createLength,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: lengthKeys.all });
      toast.success(data?.message || "Length created successfully.");
    },
    onError: (error: any) => {
      toast.error(getApiErrorMessage(error, "Failed to create length."));
    },
  });
};

export const useUpdateLengthMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      lengthId,
      payload,
    }: {
      lengthId: string;
      payload: { name?: string };
    }) => lengthService.updateLength(lengthId, payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: lengthKeys.all });
      toast.success(data?.message || "Length updated successfully.");
    },
    onError: (error: any) => {
      toast.error(getApiErrorMessage(error, "Failed to update length."));
    },
  });
};

export const useDeleteLengthMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (lengthId: string) => lengthService.deleteLength(lengthId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: lengthKeys.all });
      toast.success(data?.message || "Length deleted successfully.");
    },
    onError: (error: any) => {
      toast.error(getApiErrorMessage(error, "Failed to delete length."));
    },
  });
};
