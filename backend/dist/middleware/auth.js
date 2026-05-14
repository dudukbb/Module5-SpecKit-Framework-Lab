"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = requireAuth;
const jwt_1 = require("../utils/jwt");
const error_handler_1 = require("./error-handler");
/**
 * Validates JWT bearer token and attaches user context.
 */
function requireAuth(req, _res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
        throw new error_handler_1.HttpError(401, "Missing or invalid Authorization header.");
    }
    const token = authHeader.slice("Bearer ".length);
    const payload = (0, jwt_1.verifyAuthToken)(token);
    req.user = {
        userId: payload.userId,
        email: payload.email,
        displayName: payload.displayName,
    };
    next();
}
//# sourceMappingURL=auth.js.map