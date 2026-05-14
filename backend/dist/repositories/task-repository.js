"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTask = createTask;
exports.updateTask = updateTask;
exports.deleteTask = deleteTask;
exports.listTasks = listTasks;
exports.findTaskById = findTaskById;
const crypto_1 = require("crypto");
const connection_1 = require("../db/connection");
/**
 * Creates a task for the given user.
 */
async function createTask(input) {
    const taskId = (0, crypto_1.randomUUID)();
    const result = await connection_1.pool.query(`INSERT INTO tasks(task_id, user_id, title, description, status, category, priority, due_date)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
     RETURNING task_id AS "taskId", user_id AS "userId", title, description, status, category, priority,
       due_date::text AS "dueDate", created_at::text AS "createdAt", updated_at::text AS "updatedAt"`, [taskId, input.userId, input.title, input.description ?? null, input.status, input.category, input.priority, input.dueDate ?? null]);
    const createdTask = result.rows[0];
    if (!createdTask) {
        throw new Error("Task insert failed.");
    }
    return createdTask;
}
/**
 * Updates task fields if it belongs to the user.
 */
async function updateTask(taskId, userId, fields) {
    const updates = [];
    const values = [];
    Object.entries(fields).forEach(([key, value]) => {
        const dbKey = key === "dueDate" ? "due_date" : key;
        updates.push(`${dbKey} = $${updates.length + 1}`);
        values.push(value ?? null);
    });
    if (updates.length === 0) {
        return findTaskById(taskId, userId);
    }
    updates.push(`updated_at = NOW()`);
    const result = await connection_1.pool.query(`UPDATE tasks
     SET ${updates.join(", ")}
     WHERE task_id = $${values.length + 1} AND user_id = $${values.length + 2}
     RETURNING task_id AS "taskId", user_id AS "userId", title, description, status, category, priority,
       due_date::text AS "dueDate", created_at::text AS "createdAt", updated_at::text AS "updatedAt"`, [...values, taskId, userId]);
    return result.rows[0] ?? null;
}
/**
 * Deletes a task if it belongs to the user.
 */
async function deleteTask(taskId, userId) {
    const result = await connection_1.pool.query("DELETE FROM tasks WHERE task_id = $1 AND user_id = $2", [taskId, userId]);
    return (result.rowCount ?? 0) > 0;
}
/**
 * Returns a user-scoped task list using AND-based filters.
 */
async function listTasks(userId, filters) {
    const conditions = ["user_id = $1"];
    const values = [userId];
    if (filters.status?.length) {
        values.push(filters.status);
        conditions.push(`status = ANY($${values.length})`);
    }
    if (filters.category?.length) {
        values.push(filters.category);
        conditions.push(`category = ANY($${values.length})`);
    }
    if (filters.priority?.length) {
        values.push(filters.priority);
        conditions.push(`priority = ANY($${values.length})`);
    }
    if (filters.dueFrom) {
        values.push(filters.dueFrom);
        conditions.push(`due_date >= $${values.length}`);
    }
    if (filters.dueTo) {
        values.push(filters.dueTo);
        conditions.push(`due_date <= $${values.length}`);
    }
    if (filters.q) {
        values.push(`%${filters.q}%`);
        conditions.push(`(title ILIKE $${values.length} OR COALESCE(description, '') ILIKE $${values.length})`);
    }
    const result = await connection_1.pool.query(`SELECT task_id AS "taskId", user_id AS "userId", title, description, status, category, priority,
      due_date::text AS "dueDate", created_at::text AS "createdAt", updated_at::text AS "updatedAt"
     FROM tasks
     WHERE ${conditions.join(" AND ")}
     ORDER BY created_at DESC`, values);
    return result.rows;
}
/**
 * Finds a task by id and owner.
 */
async function findTaskById(taskId, userId) {
    const result = await connection_1.pool.query(`SELECT task_id AS "taskId", user_id AS "userId", title, description, status, category, priority,
      due_date::text AS "dueDate", created_at::text AS "createdAt", updated_at::text AS "updatedAt"
     FROM tasks
     WHERE task_id = $1 AND user_id = $2`, [taskId, userId]);
    return result.rows[0] ?? null;
}
//# sourceMappingURL=task-repository.js.map