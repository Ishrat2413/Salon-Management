import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { sizeService } from "@/lib/api/services/size.service";

const sizeKeys = {
  all: ["sizes"] as const,
  list: (params: { page: number; limit: number; searchTerm: string }) =>
    ["sizes", params] as const,
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

export const useSizesQuery = (params: {
  page: number;
  limit: number;
  searchTerm: string;
}) => {
  return useQuery({
    queryKey: sizeKeys.list(params),
    queryFn: () => sizeService.getSizes(params),
    placeholderData: (previousData) => previousData,
  });
};

export const useCreateSizeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sizeService.createSize,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: sizeKeys.all });
      toast.success(data?.message || "Size created successfully.");
    },
    onError: (error: any) => {
      toast.error(getApiErrorMessage(error, "Failed to create size."));
    },
  });
};

export const useUpdateSizeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      sizeId,
      payload,
    }: {
      sizeId: string;
      payload: { name?: string };
    }) => sizeService.updateSize(sizeId, payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: sizeKeys.all });
      toast.success(data?.message || "Size updated successfully.");
    },
    onError: (error: any) => {
      toast.error(getApiErrorMessage(error, "Failed to update size."));
    },
  });
};

export const useDeleteSizeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (sizeId: string) => sizeService.deleteSize(sizeId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: sizeKeys.all });
      toast.success(data?.message || "Size deleted successfully.");
    },
    onError: (error: any) => {
      toast.error(getApiErrorMessage(error, "Failed to delete size."));
    },
  });
};
