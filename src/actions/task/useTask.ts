"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api/client";
import { toast } from "sonner";
import type { Task, TasksResponse } from "./task.types";

export const useTasksQuery = (params: {
  page: number;
  limit: number;
  status?: string;
  assignedToId?: string;
  searchTerm?: string;
}) => {
  return useQuery({
    queryKey: ["tasks", params],
    queryFn: () =>
      apiClient
        .get<TasksResponse>("/tasks", { params })
        .then((res) => res.data),
  });
};

export const useTaskQuery = (id: string) => {
  return useQuery({
    queryKey: ["task", id],
    queryFn: () =>
      apiClient
        .get<{ data: Task }>(`/tasks/${id}`)
        .then((res) => res.data.data),
    enabled: !!id,
  });
};

export const useCreateTaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { title: string; description: string; assignedToId: string }) =>
      apiClient.post(`/tasks`, data).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Task created successfully.");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to create task.");
    },
  });
};

export const useRequestTaskCompletionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      apiClient
        .patch<{ data: Task }>(`/tasks/${id}/request-completion`, {})
        .then((res) => res.data.data),
    onSuccess: (updatedTask) => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["task", updatedTask.id] });
      toast.success("Completion requested successfully.");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to request completion.");
    },
  });
};

export const useApproveTaskCompletionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      apiClient
        .patch<{ data: Task }>(`/tasks/${id}/approve-completion`, {})
        .then((res) => res.data.data),
    onSuccess: (updatedTask) => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["task", updatedTask.id] });
      toast.success("Task completion approved.");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to approve completion.");
    },
  });
};

export const useMarkTaskAsCompletedMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      apiClient
        .patch<{ data: Task }>(`/tasks/${id}/complete`, {})
        .then((res) => res.data.data),
    onSuccess: (updatedTask) => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["task", updatedTask.id] });
      toast.success("Task marked as completed.");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to mark as completed.");
    },
  });
};

export const useUpdateTaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Task> }) =>
      apiClient
        .patch<{ data: Task }>(`/tasks/${id}`, data)
        .then((res) => res.data.data),
    onSuccess: (updatedTask) => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["task", updatedTask.id] });
      toast.success("Task updated successfully.");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update task.");
    },
  });
};

export const useDeleteTaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      apiClient.delete(`/tasks/${id}`).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Task deleted successfully.");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to delete task.");
    },
  });
};
