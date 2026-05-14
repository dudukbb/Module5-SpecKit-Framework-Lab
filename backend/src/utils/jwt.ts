import jwt from "jsonwebtoken";
import { getEnv } from "../config/env";
import type { AuthTokenPayload } from "../types/auth";

const env = getEnv();

/**
 * Signs an auth token for a user payload.
 */
export function signAuthToken(payload: AuthTokenPayload): string {
  const options: jwt.SignOptions = {
    expiresIn: env.jwtExpiresIn as jwt.SignOptions["expiresIn"],
  };

  return jwt.sign(payload, env.jwtSecret, options);
}

/**
 * Verifies and decodes an auth token.
 */
export function verifyAuthToken(token: string): AuthTokenPayload {
  return jwt.verify(token, env.jwtSecret) as AuthTokenPayload;
}
