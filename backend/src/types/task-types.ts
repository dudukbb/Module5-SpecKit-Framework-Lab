/**
 * Canonical status values stored in persistence.
 */
export const TASK_STATUSES = ["backlog", "to-do", "in-progress", "done", "blocked"] as const;

/**
 * Canonical category values stored in persistence.
 */
export const TASK_CATEGORIES = ["work", "personal", "study", "health", "finance", "other"] as const;

/**
 * Canonical priority values stored in persistence.
 */
export const TASK_PRIORITIES = ["low", "medium", "high", "critical"] as const;

/**
 * Supported status slug.
 */
export type TaskStatus = (typeof TASK_STATUSES)[number];

/**
 * Supported category slug.
 */
export type TaskCategory = (typeof TASK_CATEGORIES)[number];

/**
 * Supported priority slug.
 */
export type TaskPriority = (typeof TASK_PRIORITIES)[number];

/**
 * Persistent task entity.
 */
export interface Task {
  taskId: string;
  userId: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  category: TaskCategory;
  priority: TaskPriority;
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
}

/**
 * Persistent user entity.
 */
export interface User {
  userId: string;
  email: string;
  displayName: string;
  passwordHash: string;
  createdAt: string;
}

/**
 * Filter options for listing tasks.
 */
export interface TaskFilters {
  status?: TaskStatus[];
  category?: TaskCategory[];
  priority?: TaskPriority[];
  dueFrom?: string;
  dueTo?: string;
  q?: string;
}
