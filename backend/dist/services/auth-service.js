"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = registerUser;
exports.loginUser = loginUser;
const env_1 = require("../config/env");
const user_repository_1 = require("../repositories/user-repository");
const error_handler_1 = require("../middleware/error-handler");
const password_1 = require("../utils/password");
const jwt_1 = require("../utils/jwt");
const env = (0, env_1.getEnv)();
/**
 * Registers a user and returns auth token with profile payload.
 */
async function registerUser(input) {
    const existing = await (0, user_repository_1.findUserByEmail)(input.email);
    if (existing) {
        throw new error_handler_1.HttpError(409, "Email is already registered.");
    }
    const passwordHash = await (0, password_1.hashPassword)(input.password, env.bcryptSaltRounds);
    const user = await (0, user_repository_1.createUser)({
        email: input.email,
        displayName: input.displayName,
        passwordHash,
    });
    const accessToken = (0, jwt_1.signAuthToken)({
        userId: user.userId,
        email: user.email,
        displayName: user.displayName,
    });
    return {
        accessToken,
        tokenType: "Bearer",
        expiresIn: env.jwtExpiresIn,
        user: {
            userId: user.userId,
            email: user.email,
            displayName: user.displayName,
            createdAt: user.createdAt,
        },
    };
}
/**
 * Authenticates a user and returns a new token payload.
 */
async function loginUser(input) {
    const user = await (0, user_repository_1.findUserByEmail)(input.email);
    if (!user) {
        throw new error_handler_1.HttpError(401, "Invalid email or password.");
    }
    const isValidPassword = await (0, password_1.verifyPassword)(input.password, user.passwordHash);
    if (!isValidPassword) {
        throw new error_handler_1.HttpError(401, "Invalid email or password.");
    }
    const accessToken = (0, jwt_1.signAuthToken)({
        userId: user.userId,
        email: user.email,
        displayName: user.displayName,
    });
    return {
        accessToken,
        tokenType: "Bearer",
        expiresIn: env.jwtExpiresIn,
        user: {
            userId: user.userId,
            email: user.email,
            displayName: user.displayName,
        },
    };
}
//# sourceMappingURL=auth-service.js.map