import type { NextFunction, Request, Response } from "express";
import { verifyAuthToken } from "../utils/jwt";
import { HttpError } from "./error-handler";

/**
 * Validates JWT bearer token and attaches user context.
 */
export function requireAuth(req: Request, _res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    throw new HttpError(401, "Missing or invalid Authorization header.");
  }

  const token = authHeader.slice("Bearer ".length);
  const payload = verifyAuthToken(token);

  req.user = {
    userId: payload.userId,
    email: payload.email,
    displayName: payload.displayName,
  };

  next();
}
