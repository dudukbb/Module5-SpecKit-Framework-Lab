import { getEnv } from "../config/env";
import { createUser, findUserByEmail } from "../repositories/user-repository";
import type { LoginInput, RegisterInput } from "../validators/auth-validator";
import { HttpError } from "../middleware/error-handler";
import { hashPassword, verifyPassword } from "../utils/password";
import { signAuthToken } from "../utils/jwt";

const env = getEnv();

/**
 * Registers a user and returns auth token with profile payload.
 */
export async function registerUser(input: RegisterInput): Promise<{
  accessToken: string;
  tokenType: "Bearer";
  expiresIn: string;
  user: { userId: string; email: string; displayName: string; createdAt: string };
}> {
  const existing = await findUserByEmail(input.email);

  if (existing) {
    throw new HttpError(409, "Email is already registered.");
  }

  const passwordHash = await hashPassword(input.password, env.bcryptSaltRounds);
  const user = await createUser({
    email: input.email,
    displayName: input.displayName,
    passwordHash,
  });

  const accessToken = signAuthToken({
    userId: user.userId,
    email: user.email,
    displayName: user.displayName,
  });

  return {
    accessToken,
    tokenType: "Bearer",
    expiresIn: env.jwtExpiresIn,
    user: {
      userId: user.userId,
      email: user.email,
      displayName: user.displayName,
      createdAt: user.createdAt,
    },
  };
}

/**
 * Authenticates a user and returns a new token payload.
 */
export async function loginUser(input: LoginInput): Promise<{
  accessToken: string;
  tokenType: "Bearer";
  expiresIn: string;
  user: { userId: string; email: string; displayName: string };
}> {
  const user = await findUserByEmail(input.email);

  if (!user) {
    throw new HttpError(401, "Invalid email or password.");
  }

  const isValidPassword = await verifyPassword(input.password, user.passwordHash);

  if (!isValidPassword) {
    throw new HttpError(401, "Invalid email or password.");
  }

  const accessToken = signAuthToken({
    userId: user.userId,
    email: user.email,
    displayName: user.displayName,
  });

  return {
    accessToken,
    tokenType: "Bearer",
    expiresIn: env.jwtExpiresIn,
    user: {
      userId: user.userId,
      email: user.email,
      displayName: user.displayName,
    },
  };
}
