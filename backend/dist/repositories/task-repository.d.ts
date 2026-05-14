import type { Task, TaskFilters } from "../types/task-types";
/**
 * Creates a task for the given user.
 */
export declare function createTask(input: {
    userId: string;
    title: string;
    description?: string;
    status: string;
    category: string;
    priority: string;
    dueDate?: string;
}): Promise<Task>;
/**
 * Updates task fields if it belongs to the user.
 */
export declare function updateTask(taskId: string, userId: string, fields: Partial<{
    title: string;
    description: string;
    status: string;
    category: string;
    priority: string;
    dueDate: string | null;
}>): Promise<Task | null>;
/**
 * Deletes a task if it belongs to the user.
 */
export declare function deleteTask(taskId: string, userId: string): Promise<boolean>;
/**
 * Returns a user-scoped task list using AND-based filters.
 */
export declare function listTasks(userId: string, filters: TaskFilters): Promise<Task[]>;
/**
 * Finds a task by id and owner.
 */
export declare function findTaskById(taskId: string, userId: string): Promise<Task | null>;
//# sourceMappingURL=task-repository.d.ts.map