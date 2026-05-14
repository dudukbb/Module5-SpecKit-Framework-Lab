import bcrypt from "bcrypt";

/**
 * Hashes a plaintext password using bcrypt.
 */
export async function hashPassword(rawPassword: string, saltRounds: number): Promise<string> {
  return bcrypt.hash(rawPassword, saltRounds);
}

/**
 * Compares a plaintext password to an existing hash.
 */
export async function verifyPassword(rawPassword: string, passwordHash: string): Promise<boolean> {
  return bcrypt.compare(rawPassword, passwordHash);
}
