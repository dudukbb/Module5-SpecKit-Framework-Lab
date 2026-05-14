"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const validate_1 = require("../../middleware/validate");
const auth_service_1 = require("../../services/auth-service");
const auth_validator_1 = require("../../validators/auth-validator");
/**
 * Auth module routes.
 */
exports.authRouter = (0, express_1.Router)();
exports.authRouter.post("/register", (0, validate_1.validateBody)(auth_validator_1.registerSchema), async (req, res) => {
    const result = await (0, auth_service_1.registerUser)(req.body);
    res.status(201).json({
        data: {
            userId: result.user.userId,
            email: result.user.email,
            displayName: result.user.displayName,
            createdAt: result.user.createdAt,
        },
        meta: {
            tokenType: result.tokenType,
            expiresIn: result.expiresIn,
            accessToken: result.accessToken,
        },
    });
});
exports.authRouter.post("/login", (0, validate_1.validateBody)(auth_validator_1.loginSchema), async (req, res) => {
    const result = await (0, auth_service_1.loginUser)(req.body);
    res.json({
        data: {
            accessToken: result.accessToken,
            tokenType: result.tokenType,
            expiresIn: result.expiresIn,
            user: result.user,
        },
    });
});
exports.authRouter.post("/logout", (_req, res) => {
    res.status(204).send();
});
//# sourceMappingURL=routes.js.map