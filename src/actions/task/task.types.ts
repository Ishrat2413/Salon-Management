export type TaskStatus = "PENDING" | "COMPLETION_REQUESTED" | "COMPLETED";

export interface UserSummary {
  id: string;
  fullName: string;
  email: string;
  role: string;
}

export interface Task extends Record<string, unknown> {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  assignedToId: string;
  assignedTo: UserSummary;
  createdById: string;
  createdBy: UserSummary;
  completedById?: string;
  completedBy?: UserSummary;
  completionRequestedAt?: string;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TasksResponse {
  success: boolean;
  message: string;
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: Task[];
}
