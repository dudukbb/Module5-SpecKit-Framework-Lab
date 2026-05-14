import type { NextFunction, Request, Response } from "express";

/**
 * Domain-friendly error with status code.
 */
export class HttpError extends Error {
  public readonly statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

/**
 * Centralized Express error serializer.
 */
export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction): void {
  const statusCode = err instanceof HttpError ? err.statusCode : 500;
  const message = statusCode >= 500 ? "Internal server error" : err.message;

  res.status(statusCode).json({
    error: {
      code: `HTTP_${statusCode}`,
      message,
    },
  });
}
