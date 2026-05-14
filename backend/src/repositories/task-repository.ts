import { randomUUID } from "crypto";
import { pool } from "../db/connection";
import type { Task, TaskFilters } from "../types/task-types";

/**
 * Creates a task for the given user.
 */
export async function createTask(input: {
  userId: string;
  title: string;
  description?: string;
  status: string;
  category: string;
  priority: string;
  dueDate?: string;
}): Promise<Task> {
  const taskId = randomUUID();
  const result = await pool.query<Task>(
    `INSERT INTO tasks(task_id, user_id, title, description, status, category, priority, due_date)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
     RETURNING task_id AS "taskId", user_id AS "userId", title, description, status, category, priority,
       due_date::text AS "dueDate", created_at::text AS "createdAt", updated_at::text AS "updatedAt"`,
    [taskId, input.userId, input.title, input.description ?? null, input.status, input.category, input.priority, input.dueDate ?? null],
  );

  const createdTask = result.rows[0];

  if (!createdTask) {
    throw new Error("Task insert failed.");
  }

  return createdTask;
}

/**
 * Updates task fields if it belongs to the user.
 */
export async function updateTask(taskId: string, userId: string, fields: Partial<{
  title: string;
  description: string;
  status: string;
  category: string;
  priority: string;
  dueDate: string | null;
}>): Promise<Task | null> {
  const updates: string[] = [];
  const values: unknown[] = [];

  Object.entries(fields).forEach(([key, value]) => {
    const dbKey = key === "dueDate" ? "due_date" : key;
    updates.push(`${dbKey} = $${updates.length + 1}`);
    values.push(value ?? null);
  });

  if (updates.length === 0) {
    return findTaskById(taskId, userId);
  }

  updates.push(`updated_at = NOW()`);

  const result = await pool.query<Task>(
    `UPDATE tasks
     SET ${updates.join(", ")}
     WHERE task_id = $${values.length + 1} AND user_id = $${values.length + 2}
     RETURNING task_id AS "taskId", user_id AS "userId", title, description, status, category, priority,
       due_date::text AS "dueDate", created_at::text AS "createdAt", updated_at::text AS "updatedAt"`,
    [...values, taskId, userId],
  );

  return result.rows[0] ?? null;
}

/**
 * Deletes a task if it belongs to the user.
 */
export async function deleteTask(taskId: string, userId: string): Promise<boolean> {
  const result = await pool.query("DELETE FROM tasks WHERE task_id = $1 AND user_id = $2", [taskId, userId]);
  return (result.rowCount ?? 0) > 0;
}

/**
 * Returns a user-scoped task list using AND-based filters.
 */
export async function listTasks(userId: string, filters: TaskFilters): Promise<Task[]> {
  const conditions: string[] = ["user_id = $1"];
  const values: unknown[] = [userId];

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

  const result = await pool.query<Task>(
    `SELECT task_id AS "taskId", user_id AS "userId", title, description, status, category, priority,
      due_date::text AS "dueDate", created_at::text AS "createdAt", updated_at::text AS "updatedAt"
     FROM tasks
     WHERE ${conditions.join(" AND ")}
     ORDER BY created_at DESC`,
    values,
  );

  return result.rows;
}

/**
 * Finds a task by id and owner.
 */
export async function findTaskById(taskId: string, userId: string): Promise<Task | null> {
  const result = await pool.query<Task>(
    `SELECT task_id AS "taskId", user_id AS "userId", title, description, status, category, priority,
      due_date::text AS "dueDate", created_at::text AS "createdAt", updated_at::text AS "updatedAt"
     FROM tasks
     WHERE task_id = $1 AND user_id = $2`,
    [taskId, userId],
  );

  return result.rows[0] ?? null;
}
