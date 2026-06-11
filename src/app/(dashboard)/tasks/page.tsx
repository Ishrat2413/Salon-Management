"use client";

import React, { useState } from "react";
import { Plus, CheckSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/providers/auth-provider";
import { useTasksQuery } from "@/actions/task/useTask";
import { TaskTable } from "@/components/dashboard/tasks/TaskTable";
import { TaskForm } from "@/components/dashboard/tasks/TaskForm";

export default function TasksPage() {
  const { user } = useAuth();
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  
  const { data, isLoading } = useTasksQuery({
    page: 1,
    limit: 100,
  });

  const isAdminOrManager = user?.role === "admin" || user?.role === "manager";

  return (
    <div className='min-h-screen p-4 md:p-8'>
      <div className='mx-auto space-y-6'>
        {/* Header section matching Dashboard style */}
        <div className='flex flex-col gap-4 rounded-[16px] border border-gray-100 bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between'>
          <div>
            <p className='text-xs font-semibold uppercase tracking-[0.24em] text-pink-500'>
              Task Management
            </p>
            <h1 className='mt-1 text-3xl font-bold tracking-tight text-gray-800'>
              {isAdminOrManager 
                ? "Assign and track employee tasks" 
                : "Your assigned tasks and goals"}
            </h1>
            <p className='mt-1 text-sm text-gray-500'>
              {isAdminOrManager 
                ? "Manage workspace productivity" 
                : "Request completion once done"}
            </p>
          </div>

          {isAdminOrManager && (
            <Button 
              onClick={() => setIsTaskFormOpen(true)} 
              className='gap-2 rounded-full bg-pink-600 hover:bg-pink-700 text-white px-6'
            >
              <Plus className='h-4 w-4' />
              Create New Task
            </Button>
          )}
        </div>

        <div className='bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden'>
          <TaskTable data={data?.data || []} isLoading={isLoading} />
        </div>
      </div>

      <TaskForm 
        isOpen={isTaskFormOpen} 
        onClose={() => setIsTaskFormOpen(false)} 
      />
    </div>
  );
}
