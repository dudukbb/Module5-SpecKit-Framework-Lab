import { createTask, updateTask } from "../repositories/task-repository";
import type { TaskFilters } from "../types/task-types";
import type { CreateTaskInput, PatchTaskInput } from "../validators/task-validator";
/**
 * Creates a task and emits due-date warning when applicable.
 */
export declare function createUserTask(userId: string, input: CreateTaskInput): Promise<{
    task: Awaited<ReturnType<typeof createTask>>;
    warning?: string;
}>;
/**
 * Updates a user task and emits due-date warning when applicable.
 */
export declare function updateUserTask(userId: string, taskId: string, input: PatchTaskInput): Promise<{
    task: NonNullable<Awaited<ReturnType<typeof updateTask>>>;
    warning?: string;
}>;
/**
 * Deletes a task by id and owner.
 */
export declare function deleteUserTask(userId: string, taskId: string): Promise<void>;
/**
 * Lists tasks using AND-based filter semantics.
 */
export declare function listUserTasks(userId: string, filters: TaskFilters): Promise<import("../types/task-types").Task[]>;
//# sourceMappingURL=task-service.d.ts.map