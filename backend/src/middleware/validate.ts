import type { NextFunction, Request, Response } from "express";
import type { ZodTypeAny } from "zod";
import { HttpError } from "./error-handler";

/**
 * Validates request body and stores parsed value back on req.body.
 */
export function validateBody(schema: ZodTypeAny) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      throw new HttpError(400, result.error.issues.map((issue) => issue.message).join(", "));
    }

    req.body = result.data;
    next();
  };
}

/**
 * Validates request query and stores parsed value back on req.query.
 */
export function validateQuery(schema: ZodTypeAny) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.query);

    if (!result.success) {
      throw new HttpError(400, result.error.issues.map((issue) => issue.message).join(", "));
    }

    next();
  };
}
