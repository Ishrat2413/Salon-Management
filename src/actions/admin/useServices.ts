import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { serviceService } from "@/lib/api/services/service.service";

const serviceKeys = {
  all: ["services"] as const,
  list: (params: { page: number; limit: number; searchTerm: string }) =>
    ["services", params] as const,
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

export const useServicesQuery = (params: {
  page: number;
  limit: number;
  searchTerm: string;
}) => {
  return useQuery({
    queryKey: serviceKeys.list(params),
    queryFn: () => serviceService.getServices(params),
    placeholderData: (previousData) => previousData,
  });
};

export const useCreateServiceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: serviceService.createService,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: serviceKeys.all });
      toast.success(data?.message || "Service created successfully.");
    },
    onError: (error: any) => {
      toast.error(getApiErrorMessage(error, "Failed to create service."));
    },
  });
};

export const useUpdateServiceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      serviceId,
      payload,
    }: {
      serviceId: string;
      payload: { name?: string };
    }) => serviceService.updateService(serviceId, payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: serviceKeys.all });
      toast.success(data?.message || "Service updated successfully.");
    },
    onError: (error: any) => {
      toast.error(getApiErrorMessage(error, "Failed to update service."));
    },
  });
};

export const useDeleteServiceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (serviceId: string) => serviceService.deleteService(serviceId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: serviceKeys.all });
      toast.success(data?.message || "Service deleted successfully.");
    },
    onError: (error: any) => {
      toast.error(getApiErrorMessage(error, "Failed to delete service."));
    },
  });
};
