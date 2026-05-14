"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserTask = createUserTask;
exports.updateUserTask = updateUserTask;
exports.deleteUserTask = deleteUserTask;
exports.listUserTasks = listUserTasks;
const task_repository_1 = require("../repositories/task-repository");
const error_handler_1 = require("../middleware/error-handler");
/**
 * Creates a task and emits due-date warning when applicable.
 */
async function createUserTask(userId, input) {
    const dueDateWarning = input.dueDate && new Date(input.dueDate).getTime() < Date.now()
        ? "Due date is in the past."
        : undefined;
    const task = await (0, task_repository_1.createTask)({
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
async function updateUserTask(userId, taskId, input) {
    const dueDateWarning = input.dueDate && new Date(input.dueDate).getTime() < Date.now()
        ? "Due date is in the past."
        : undefined;
    const task = await (0, task_repository_1.updateTask)(taskId, userId, {
        title: input.title,
        description: input.description,
        status: input.status,
        category: input.category,
        priority: input.priority,
        dueDate: input.dueDate,
    });
    if (!task) {
        throw new error_handler_1.HttpError(404, "Task not found.");
    }
    if (dueDateWarning) {
        return { task, warning: dueDateWarning };
    }
    return { task };
}
/**
 * Deletes a task by id and owner.
 */
async function deleteUserTask(userId, taskId) {
    const deleted = await (0, task_repository_1.deleteTask)(taskId, userId);
    if (!deleted) {
        throw new error_handler_1.HttpError(404, "Task not found.");
    }
}
/**
 * Lists tasks using AND-based filter semantics.
 */
async function listUserTasks(userId, filters) {
    return (0, task_repository_1.listTasks)(userId, filters);
}
//# sourceMappingURL=task-service.js.map