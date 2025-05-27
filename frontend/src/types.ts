export type TaskStatus = "pending" | "completed"; // or your actual status values

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: string;
  updatedAt?: string;
}