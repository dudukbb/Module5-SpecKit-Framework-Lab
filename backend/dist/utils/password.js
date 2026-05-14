"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = hashPassword;
exports.verifyPassword = verifyPassword;
const bcrypt_1 = __importDefault(require("bcrypt"));
/**
 * Hashes a plaintext password using bcrypt.
 */
async function hashPassword(rawPassword, saltRounds) {
    return bcrypt_1.default.hash(rawPassword, saltRounds);
}
/**
 * Compares a plaintext password to an existing hash.
 */
async function verifyPassword(rawPassword, passwordHash) {
    return bcrypt_1.default.compare(rawPassword, passwordHash);
}
//# sourceMappingURL=password.js.map