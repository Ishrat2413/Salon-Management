"use client";

import React, { useMemo, useState } from "react";
import { formatInTimeZone } from "date-fns-tz";
import UniversalTable from "@/components/univarsalTable/Universaltable";
import { ColumnDef } from "@/components/univarsalTable/UnivarsalTable.type";
import { useAuth } from "@/components/providers/auth-provider";
import type { Task } from "@/actions/task/task.types";
import { TaskDetails } from "./TaskDetails";

interface TaskTableProps {
  data: Task[];
  isLoading?: boolean;
}

export function TaskTable({ data, isLoading }: TaskTableProps) {
  const { user } = useAuth();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const columns = useMemo<ColumnDef<Task>[]>(
    () => [
      {
        key: "createdAt",
        header: "Created Date",
        sortable: true,
        render: (val) =>
          formatInTimeZone(
            new Date(val as string),
            "America/Chicago",
            "MMM d, yyyy h:mm a"
          ),
      },
      {
        key: "title",
        header: "Task Title",
        sortable: true,
        className: "font-semibold text-gray-800",
      },
      {
        key: "assignedTo",
        header: "Assigned To",
        render: (_, row) => row.assignedTo.fullName,
      },
      {
        key: "status",
        header: "Status",
        sortable: true,
        statusMap: {
          COMPLETED: {
            label: "Completed",
            bg: "#e8f8f0",
            color: "#1a7a4a",
            className: "font-medium",
          },
          COMPLETION_REQUESTED: {
            label: "Requested",
            bg: "#e0f2fe",
            color: "#0369a1",
            className: "font-medium",
          },
          PENDING: {
            label: "Assigned",
            bg: "#fff8e6",
            color: "#b07d00",
            className: "font-medium",
          },
        },
      },
      {
        key: "id",
        header: "Actions",
        render: (_, row) => (
          <button
            onClick={() => setSelectedTask(row)}
            className='text-sm font-medium text-[#D13C92] hover:underline whitespace-nowrap inline-flex items-center gap-1'>
            View Details
          </button>
        ),
      },
    ],
    [],
  );

  return (
    <>
      <UniversalTable<Task>
        title='Workspace Tasks'
        data={data}
        columns={columns}
        loading={isLoading}
        pageSize={10}
        emptyMessage='No tasks have been created yet.'
      />

      <TaskDetails
        isOpen={!!selectedTask}
        onClose={() => setSelectedTask(null)}
        task={selectedTask}
      />
    </>
  );
}
