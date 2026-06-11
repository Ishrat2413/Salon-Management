"use client";

import React from "react";
import { formatInTimeZone } from "date-fns-tz";
import { BaseModal } from "@/components/ui/BaseModal";
import { Button } from "@/components/ui/button";
import type { Task } from "@/actions/task/task.types";
import { useAuth } from "@/components/providers/auth-provider";
import {
  useRequestTaskCompletionMutation,
  useApproveTaskCompletionMutation,
  useMarkTaskAsCompletedMutation,
} from "@/actions/task/useTask";

interface TaskDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
}

export function TaskDetails({ isOpen, onClose, task }: TaskDetailsProps) {
  const { user } = useAuth();
  const requestCompletionMutation = useRequestTaskCompletionMutation();
  const approveCompletionMutation = useApproveTaskCompletionMutation();
  const markAsCompletedMutation = useMarkTaskAsCompletedMutation();

  if (!task) return null;

  const isAdminOrManager = user?.role === "admin" || user?.role === "manager";
  const isAssignedEmployee = user?.id === task.assignedToId;

  const statusColors: Record<string, string> = {
    COMPLETED: "bg-[#e8f8f0] text-[#1a7a4a]",
    COMPLETION_REQUESTED: "bg-[#e0f2fe] text-[#0369a1]",
    PENDING: "bg-[#fff8e6] text-[#b07d00]",
  };

  const handleRequestCompletion = () => {
    requestCompletionMutation.mutate(task.id, { onSuccess: onClose });
  };

  const handleApproveCompletion = () => {
    approveCompletionMutation.mutate(task.id, { onSuccess: onClose });
  };

  const handleMarkAsCompleted = () => {
    markAsCompletedMutation.mutate(task.id, { onSuccess: onClose });
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title='Task Details'>
      <div className='space-y-6'>
        {/* Header section with Status and Dates */}
        <div className='flex flex-wrap items-center justify-between gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100'>
          <div>
            <p className='text-xs text-gray-500 font-medium uppercase tracking-wider mb-1'>
              Status
            </p>
            <span
              className={`px-3 py-1 text-xs font-semibold rounded-full inline-block ${statusColors[task.status] || "bg-gray-100 text-gray-600"}`}>
              {task.status.replace("_", " ")}
            </span>
          </div>
          <div>
            <p className='text-xs text-gray-500 font-medium uppercase tracking-wider mb-1'>
              Created Date
            </p>
            <p className='text-sm font-medium text-gray-900'>
              {formatInTimeZone(
                new Date(task.createdAt),
                "America/Chicago",
                "MMM d, yyyy h:mm a"
              )}
            </p>
          </div>
          {task.status === "COMPLETED" && task.completedBy && (
            <div>
              <p className='text-xs text-gray-500 font-medium uppercase tracking-wider mb-1'>
                Approved By
              </p>
              <p className='text-sm font-medium text-gray-900'>
                {task.completedBy.fullName}
              </p>
            </div>
          )}
        </div>

        {/* Task Info Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {/* Main Info */}
          <div className='bg-white p-5 rounded-xl border border-gray-100 shadow-sm space-y-4'>
            <h4 className='text-base font-semibold text-gray-800 border-b border-gray-50 pb-2'>
              General Information
            </h4>
            <div className='space-y-3'>
              <div>
                <p className='text-xs text-gray-500 mb-0.5 uppercase tracking-wide'>
                  Task Title
                </p>
                <p className='text-sm font-semibold text-gray-900'>
                  {task.title}
                </p>
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <p className='text-xs text-gray-500 mb-0.5 uppercase tracking-wide'>
                    Assigned To
                  </p>
                  <p className='text-sm font-medium text-gray-900'>
                    {task.assignedTo.fullName}
                  </p>
                </div>
                <div>
                  <p className='text-xs text-gray-500 mb-0.5 uppercase tracking-wide'>
                    Created By
                  </p>
                  <p className='text-sm font-medium text-gray-900'>
                    {task.createdBy.fullName}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline Info */}
          <div className='bg-white p-5 rounded-xl border border-gray-100 shadow-sm space-y-4'>
            <h4 className='text-base font-semibold text-gray-800 border-b border-gray-50 pb-2'>
              Timeline
            </h4>
            <div className='space-y-3'>
              <div>
                <p className='text-xs text-gray-500 mb-0.5 uppercase tracking-wide'>
                  Requested Completion
                </p>
                <p className='text-sm font-medium text-gray-900'>
                  {task.completionRequestedAt
                    ? formatInTimeZone(
                        new Date(task.completionRequestedAt),
                        "America/Chicago",
                        "MMM d, yyyy h:mm a"
                      )
                    : "Not requested yet"}
                </p>
              </div>
              <div>
                <p className='text-xs text-gray-500 mb-0.5 uppercase tracking-wide'>
                  Completed At
                </p>
                <p className='text-sm font-medium text-gray-900'>
                  {task.completedAt
                    ? formatInTimeZone(
                        new Date(task.completedAt),
                        "America/Chicago",
                        "MMM d, yyyy h:mm a"
                      )
                    : "In progress"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Description Box */}
        <div className='bg-pink-50/50 p-5 rounded-xl border border-pink-100'>
          <h4 className='text-sm font-semibold text-[#D13C92] mb-2 uppercase tracking-wide'>
            Task Description
          </h4>
          <p className='text-sm text-gray-800 whitespace-pre-wrap leading-relaxed'>
            {task.description}
          </p>
        </div>

        <div className='flex justify-end gap-3 pt-4 border-t'>
          <Button
            variant='outline'
            onClick={onClose}
            className='rounded-full px-6'>
            Close
          </Button>

          {isAssignedEmployee && task.status === "PENDING" && (
            <Button
              onClick={handleRequestCompletion}
              disabled={requestCompletionMutation.isPending}
              className='rounded-full bg-pink-600 hover:bg-pink-700 text-white px-8'>
              {requestCompletionMutation.isPending
                ? "Requesting..."
                : "Request Completion"}
            </Button>
          )}

          {isAdminOrManager && task.status === "COMPLETION_REQUESTED" && (
            <Button
              onClick={handleApproveCompletion}
              disabled={approveCompletionMutation.isPending}
              className='rounded-full bg-green-600 hover:bg-green-700 text-white px-8'>
              {approveCompletionMutation.isPending
                ? "Approving..."
                : "Approve Completion"}
            </Button>
          )}

          {isAdminOrManager && task.status !== "COMPLETED" && (
            <Button
              onClick={handleMarkAsCompleted}
              disabled={markAsCompletedMutation.isPending}
              variant='secondary'
              className='rounded-full px-8'>
              {markAsCompletedMutation.isPending
                ? "Marking..."
                : "Mark as Completed"}
            </Button>
          )}
        </div>
      </div>
    </BaseModal>
  );
}
