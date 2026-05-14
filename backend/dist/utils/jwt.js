"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signAuthToken = signAuthToken;
exports.verifyAuthToken = verifyAuthToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
const env = (0, env_1.getEnv)();
/**
 * Signs an auth token for a user payload.
 */
function signAuthToken(payload) {
    const options = {
        expiresIn: env.jwtExpiresIn,
    };
    return jsonwebtoken_1.default.sign(payload, env.jwtSecret, options);
}
/**
 * Verifies and decodes an auth token.
 */
function verifyAuthToken(token) {
    return jsonwebtoken_1.default.verify(token, env.jwtSecret);
}
//# sourceMappingURL=jwt.js.map