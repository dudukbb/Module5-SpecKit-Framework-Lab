import type { NextFunction, Request, Response } from "express";
/**
 * Domain-friendly error with status code.
 */
export declare class HttpError extends Error {
    readonly statusCode: number;
    constructor(statusCode: number, message: string);
}
/**
 * Centralized Express error serializer.
 */
export declare function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction): void;
//# sourceMappingURL=error-handler.d.ts.map