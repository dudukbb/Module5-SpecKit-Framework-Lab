"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnv = getEnv;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
/**
 * Returns validated environment variables for the API.
 */
function getEnv() {
    const databaseUrl = process.env.DATABASE_URL;
    const jwtSecret = process.env.JWT_SECRET;
    if (!databaseUrl) {
        throw new Error("DATABASE_URL is required.");
    }
    if (!jwtSecret) {
        throw new Error("JWT_SECRET is required.");
    }
    return {
        port: Number(process.env.PORT ?? 4000),
        databaseUrl,
        jwtSecret,
        jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? "1d",
        bcryptSaltRounds: Number(process.env.BCRYPT_SALT_ROUNDS ?? 10),
        clientOrigin: process.env.CLIENT_ORIGIN ?? "http://localhost:5173",
    };
}
//# sourceMappingURL=env.js.map