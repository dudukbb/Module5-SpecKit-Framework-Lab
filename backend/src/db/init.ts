import { pool } from "./connection";

/**
 * Creates required application tables when missing.
 */
export async function initDatabase(): Promise<void> {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      user_id UUID PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      display_name TEXT NOT NULL,
      password_hash TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS tasks (
      task_id UUID PRIMARY KEY,
      user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
      title TEXT NOT NULL,
      description TEXT,
      status TEXT NOT NULL DEFAULT 'to-do',
      category TEXT NOT NULL DEFAULT 'other',
      priority TEXT NOT NULL DEFAULT 'medium',
      due_date DATE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  await pool.query("CREATE INDEX IF NOT EXISTS idx_tasks_user_id ON tasks(user_id);");
}
