import { randomUUID } from "crypto";
import { pool } from "../db/connection";
import type { User } from "../types/task-types";

/**
 * Looks up a user by email.
 */
export async function findUserByEmail(email: string): Promise<User | null> {
  const result = await pool.query<User>(
    `SELECT user_id AS "userId", email, display_name AS "displayName", password_hash AS "passwordHash", created_at AS "createdAt"
     FROM users
     WHERE email = $1`,
    [email],
  );

  return result.rows[0] ?? null;
}

/**
 * Creates a user account row.
 */
export async function createUser(input: {
  email: string;
  displayName: string;
  passwordHash: string;
}): Promise<User> {
  const userId = randomUUID();
  const result = await pool.query<User>(
    `INSERT INTO users(user_id, email, display_name, password_hash)
     VALUES ($1, $2, $3, $4)
     RETURNING user_id AS "userId", email, display_name AS "displayName", password_hash AS "passwordHash", created_at AS "createdAt"`,
    [userId, input.email, input.displayName, input.passwordHash],
  );

  const createdUser = result.rows[0];

  if (!createdUser) {
    throw new Error("User insert failed.");
  }

  return createdUser;
}
