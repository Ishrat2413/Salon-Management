import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { salonService } from "@/lib/api/services/salon.service";

const salonKeys = {
  all: ["salons"] as const,
  list: (params: { page: number; limit: number; searchTerm: string }) =>
    ["salons", params] as const,
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

export const useSalonsQuery = (params: {
  page: number;
  limit: number;
  searchTerm: string;
}) => {
  return useQuery({
    queryKey: salonKeys.list(params),
    queryFn: () => salonService.getSalons(params),
    placeholderData: (previousData) => previousData,
  });
};

export const useCreateSalonMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: salonService.createSalon,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: salonKeys.all });
      toast.success(data?.message || "Salon created successfully.");
    },
    onError: (error: any) => {
      toast.error(getApiErrorMessage(error, "Failed to create salon."));
    },
  });
};

export const useUpdateSalonMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      salonId,
      payload,
    }: {
      salonId: string;
      payload: { name?: string; address?: string };
    }) => salonService.updateSalon(salonId, payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: salonKeys.all });
      toast.success(data?.message || "Salon updated successfully.");
    },
    onError: (error: any) => {
      toast.error(getApiErrorMessage(error, "Failed to update salon."));
    },
  });
};

export const useDeleteSalonMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (salonId: string) => salonService.deleteSalon(salonId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: salonKeys.all });
      toast.success(data?.message || "Salon deleted successfully.");
    },
    onError: (error: any) => {
      toast.error(getApiErrorMessage(error, "Failed to delete salon."));
    },
  });
};
