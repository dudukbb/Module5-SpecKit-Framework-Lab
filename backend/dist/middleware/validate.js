"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBody = validateBody;
exports.validateQuery = validateQuery;
const error_handler_1 = require("./error-handler");
/**
 * Validates request body and stores parsed value back on req.body.
 */
function validateBody(schema) {
    return (req, _res, next) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            throw new error_handler_1.HttpError(400, result.error.issues.map((issue) => issue.message).join(", "));
        }
        req.body = result.data;
        next();
    };
}
/**
 * Validates request query and stores parsed value back on req.query.
 */
function validateQuery(schema) {
    return (req, _res, next) => {
        const result = schema.safeParse(req.query);
        if (!result.success) {
            throw new error_handler_1.HttpError(400, result.error.issues.map((issue) => issue.message).join(", "));
        }
        next();
    };
}
//# sourceMappingURL=validate.js.map