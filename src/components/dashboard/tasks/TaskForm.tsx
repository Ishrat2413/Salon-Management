"use client";

import React, { useState, useMemo } from "react";
import { BaseModal } from "@/components/ui/BaseModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUsersQuery } from "@/actions/admin/useUsers";
import { useCreateTaskMutation } from "@/actions/task/useTask";

interface TaskFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TaskForm({ isOpen, onClose }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedToId, setAssignedToId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { data: usersData, isLoading: isLoadingUsers } = useUsersQuery({
    page: 1,
    limit: 500,
    role: "EMPLOYEE",
    searchTerm: "",
  });

  const employees = usersData?.data || [];

  const filteredEmployees = useMemo(() => {
    if (!searchTerm) return employees;
    return employees.filter((e: any) =>
      e.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [employees, searchTerm]);

  const createTaskMutation = useCreateTaskMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!title.trim()) newErrors.title = "Title is required";
    if (!description.trim()) newErrors.description = "Description is required";
    if (!assignedToId) newErrors.assignedToId = "Employee assignment is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    createTaskMutation.mutate(
      { title, description, assignedToId },
      {
        onSuccess: () => {
          setTitle("");
          setDescription("");
          setAssignedToId("");
          onClose();
        },
      }
    );
  };

  const inputClasses = "h-11 rounded-lg border-gray-200 focus:ring-pink-500 focus:border-pink-500 px-3";
  const labelClasses = "text-sm font-semibold text-gray-700 mb-1 block";
  const errorClasses = "text-xs text-red-500 mt-1";

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title='Create New Task'>
      <form onSubmit={handleSubmit} className='space-y-6'>
        <div className='space-y-1'>
          <label className={labelClasses}>Task Title <span className="text-red-500">*</span></label>
          <Input
            placeholder='Enter task title'
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setErrors(prev => ({ ...prev, title: "" }));
            }}
            className={inputClasses}
          />
          {errors.title && (
            <p className={errorClasses}>{errors.title}</p>
          )}
        </div>

        <div className='space-y-1'>
          <label className={labelClasses}>
            Description <span className="text-red-500">*</span>
          </label>
          <Textarea
            placeholder='Detailed task description'
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              setErrors(prev => ({ ...prev, description: "" }));
            }}
            className="min-h-[120px] rounded-lg border-gray-200 focus:ring-pink-500 focus:border-pink-500 p-3"
          />
          {errors.description && (
            <p className={errorClasses}>{errors.description}</p>
          )}
        </div>

        <div className='space-y-1'>
          <label className={labelClasses}>
            Assign to Employee <span className="text-red-500">*</span>
          </label>
          <Select value={assignedToId} onValueChange={(val) => {
            setAssignedToId(val || "");
            setErrors(prev => ({ ...prev, assignedToId: "" }));
          }}>
            <SelectTrigger className={inputClasses + " w-full"}>
              <SelectValue placeholder={isLoadingUsers ? "Loading employees..." : "Select employee"}>
                {assignedToId ? employees.find((e: any) => e.id === assignedToId)?.fullName : undefined}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <div className="px-2 py-2 sticky top-0 bg-white border-b z-10">
                <Input
                  placeholder="Search employees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="h-8 text-xs"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
              <div className="max-h-[200px] overflow-y-auto">
                {filteredEmployees.length === 0 ? (
                  <div className='p-2 text-sm text-center text-gray-500'>
                    No employees found
                  </div>
                ) : (
                  filteredEmployees.map((user: any) => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.fullName} ({user.email})
                    </SelectItem>
                  ))
                )}
              </div>
            </SelectContent>
          </Select>
          {errors.assignedToId && (
            <p className={errorClasses}>{errors.assignedToId}</p>
          )}
        </div>

        <div className='flex justify-end gap-3 pt-4 border-t'>
          <Button type='button' variant='outline' onClick={onClose} className="rounded-full">
            Cancel
          </Button>
          <Button 
            type='submit' 
            disabled={createTaskMutation.isPending}
            className="rounded-full bg-pink-600 hover:bg-pink-700 text-white px-8"
          >
            {createTaskMutation.isPending ? "Creating..." : "Create Task"}
          </Button>
        </div>
      </form>
    </BaseModal>
  );
}
