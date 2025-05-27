import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
});

export const updateTaskStatusSchema = z.object({
  status: z.enum(["pending", "done"]),
});
