import {
  createTask,
  deleteTask,
  listTasks,
  updateTask,
} from "../repositories/task-repository";
import { HttpError } from "../middleware/error-handler";
import type { TaskFilters } from "../types/task-types";
import type { CreateTaskInput, PatchTaskInput } from "../validators/task-validator";

/**
 * Creates a task and emits due-date warning when applicable.
 */
export async function createUserTask(userId: string, input: CreateTaskInput): Promise<{
  task: Awaited<ReturnType<typeof createTask>>;
  warning?: string;
}> {
  const dueDateWarning =
    input.dueDate && new Date(input.dueDate).getTime() < Date.now()
      ? "Due date is in the past."
      : undefined;

  const task = await createTask({
    userId,
    title: input.title,
    description: input.description,
    status: input.status ?? "to-do",
    category: input.category ?? "other",
    priority: input.priority ?? "medium",
    dueDate: input.dueDate,
  });

  if (dueDateWarning) {
    return { task, warning: dueDateWarning };
  }

  return { task };
}

/**
 * Updates a user task and emits due-date warning when applicable.
 */
export async function updateUserTask(
  userId: string,
  taskId: string,
  input: PatchTaskInput,
): Promise<{ task: NonNullable<Awaited<ReturnType<typeof updateTask>>>; warning?: string }> {
  const dueDateWarning =
    input.dueDate && new Date(input.dueDate).getTime() < Date.now()
      ? "Due date is in the past."
      : undefined;

  const task = await updateTask(taskId, userId, {
    title: input.title,
    description: input.description,
    status: input.status,
    category: input.category,
    priority: input.priority,
    dueDate: input.dueDate,
  });

  if (!task) {
    throw new HttpError(404, "Task not found.");
  }

  if (dueDateWarning) {
    return { task, warning: dueDateWarning };
  }

  return { task };
}

/**
 * Deletes a task by id and owner.
 */
export async function deleteUserTask(userId: string, taskId: string): Promise<void> {
  const deleted = await deleteTask(taskId, userId);

  if (!deleted) {
    throw new HttpError(404, "Task not found.");
  }
}

/**
 * Lists tasks using AND-based filter semantics.
 */
export async function listUserTasks(userId: string, filters: TaskFilters) {
  return listTasks(userId, filters);
}
