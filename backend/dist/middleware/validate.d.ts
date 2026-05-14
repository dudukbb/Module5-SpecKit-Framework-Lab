import type { NextFunction, Request, Response } from "express";
import type { ZodTypeAny } from "zod";
/**
 * Validates request body and stores parsed value back on req.body.
 */
export declare function validateBody(schema: ZodTypeAny): (req: Request, _res: Response, next: NextFunction) => void;
/**
 * Validates request query and stores parsed value back on req.query.
 */
export declare function validateQuery(schema: ZodTypeAny): (req: Request, _res: Response, next: NextFunction) => void;
//# sourceMappingURL=validate.d.ts.map