"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { salonEntryService } from "@/lib/api/services/salon-entry.service";
import { apiClient } from "@/lib/api/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import type { SalonEntriesResponse, SalonEntry } from "./salon-entry.types";

function replaceEntryInCache(
  current: SalonEntriesResponse | undefined,
  updatedEntry: SalonEntry,
): SalonEntriesResponse | undefined {
  if (!current) return current;

  return {
    ...current,
    data: current.data.map((entry) =>
      entry.id === updatedEntry.id ? { ...entry, ...updatedEntry } : entry,
    ),
  };
}

export const useSalonEntriesQuery = (params: {
  page: number;
  limit: number;
}) => {
  return useQuery({
    queryKey: ["salon-entries", params],
    queryFn: () =>
      apiClient
        .get<SalonEntriesResponse>("/api/v1/salon-entries", { params })
        .then((res) => res.data),
  });
};

export const useSalonEntryQuery = (id: string) => {
  return useQuery({
    queryKey: ["salon-entry", id],
    queryFn: () =>
      apiClient
        .get<{ data: SalonEntry }>(`/api/v1/salon-entries/${id}`)
        .then((res) => res.data.data),
    enabled: !!id,
  });
};

export const useUpdateSalonEntryMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      apiClient
        .patch<{ data: SalonEntry }>(`/api/v1/salon-entries/${id}`, data)
        .then((res) => res.data.data),
    onSuccess: (updatedEntry, variables) => {
      queryClient.setQueriesData<SalonEntriesResponse>(
        { queryKey: ["salon-entries"] },
        (current) => replaceEntryInCache(current, updatedEntry),
      );
      queryClient.setQueryData(["salon-entry", variables.id], updatedEntry);
      queryClient.invalidateQueries({ queryKey: ["salon-entries"] });
      queryClient.invalidateQueries({
        queryKey: ["salon-entry", variables.id],
      });
      toast.success("Entry updated successfully.");
      router.push("/manager-review-entries");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update entry.");
    },
  });
};

export const useUpdateSalonEntryStatusMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      status,
      statusComment,
    }: {
      id: string;
      status: string;
      statusComment?: string;
    }) =>
      apiClient
        .patch<{
          data: SalonEntry;
        }>(`/api/v1/salon-entries/${id}/status`, { status, statusComment })
        .then((res) => res.data.data),
    onSuccess: (updatedEntry) => {
      queryClient.setQueriesData<SalonEntriesResponse>(
        { queryKey: ["salon-entries"] },
        (current) => replaceEntryInCache(current, updatedEntry),
      );
      queryClient.setQueryData(["salon-entry", updatedEntry.id], updatedEntry);
      queryClient.invalidateQueries({ queryKey: ["salon-entries"] });
      queryClient.invalidateQueries({
        queryKey: ["salon-entry", updatedEntry.id],
      });
      toast.success("Entry status updated successfully.");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Failed to update entry status.",
      );
    },
  });
};

export const useCreateSalonEntryMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: any) =>
      apiClient.post(`/api/v1/salon-entries`, data).then((res) => res.data),
    onSuccess: (created) => {
      queryClient.invalidateQueries({ queryKey: ["salon-entries"] });
      toast.success("Entry created successfully.");
      router.push("/manager-review-entries");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to create entry.");
    },
  });
};
