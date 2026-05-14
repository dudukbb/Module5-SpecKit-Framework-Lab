import { z } from "zod";

/**
 * Registration request schema.
 */
export const registerSchema = z.object({
  email: z.string().email(),
  displayName: z.string().trim().min(1).max(80),
  password: z.string().min(8).max(128),
});

/**
 * Login request schema.
 */
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(128),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
