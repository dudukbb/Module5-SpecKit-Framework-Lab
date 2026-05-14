"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
/**
 * Registration request schema.
 */
exports.registerSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    displayName: zod_1.z.string().trim().min(1).max(80),
    password: zod_1.z.string().min(8).max(128),
});
/**
 * Login request schema.
 */
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8).max(128),
});
//# sourceMappingURL=auth-validator.js.map