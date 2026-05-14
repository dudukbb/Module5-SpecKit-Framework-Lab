"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpError = void 0;
exports.errorHandler = errorHandler;
/**
 * Domain-friendly error with status code.
 */
class HttpError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
    }
}
exports.HttpError = HttpError;
/**
 * Centralized Express error serializer.
 */
function errorHandler(err, _req, res, _next) {
    const statusCode = err instanceof HttpError ? err.statusCode : 500;
    const message = statusCode >= 500 ? "Internal server error" : err.message;
    res.status(statusCode).json({
        error: {
            code: `HTTP_${statusCode}`,
            message,
        },
    });
}
//# sourceMappingURL=error-handler.js.map