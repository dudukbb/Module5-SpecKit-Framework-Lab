import { z } from "zod";
import { TASK_CATEGORIES, TASK_PRIORITIES, TASK_STATUSES } from "../types/task-types";

const statusSchema = z.enum(TASK_STATUSES);
const categorySchema = z.enum(TASK_CATEGORIES);
const prioritySchema = z.enum(TASK_PRIORITIES);

/**
 * Task create schema.
 */
export const createTaskSchema = z.object({
  title: z.string().trim().min(1).max(120),
  description: z.string().max(1000).optional(),
  status: statusSchema.optional(),
  category: categorySchema.optional(),
  priority: prioritySchema.optional(),
  dueDate: z.string().date().optional(),
});

/**
 * Task patch schema.
 */
export const patchTaskSchema = createTaskSchema.partial();

/**
 * Task query schema with AND logic.
 */
export const taskQuerySchema = z.object({
  status: z.union([statusSchema, z.array(statusSchema)]).optional(),
  category: z.union([categorySchema, z.array(categorySchema)]).optional(),
  priority: z.union([prioritySchema, z.array(prioritySchema)]).optional(),
  dueFrom: z.string().date().optional(),
  dueTo: z.string().date().optional(),
  q: z.string().max(120).optional(),
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type PatchTaskInput = z.infer<typeof patchTaskSchema>;
export type TaskQueryInput = z.infer<typeof taskQuerySchema>;
