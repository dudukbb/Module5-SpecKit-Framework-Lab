"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserByEmail = findUserByEmail;
exports.createUser = createUser;
const crypto_1 = require("crypto");
const connection_1 = require("../db/connection");
/**
 * Looks up a user by email.
 */
async function findUserByEmail(email) {
    const result = await connection_1.pool.query(`SELECT user_id AS "userId", email, display_name AS "displayName", password_hash AS "passwordHash", created_at AS "createdAt"
     FROM users
     WHERE email = $1`, [email]);
    return result.rows[0] ?? null;
}
/**
 * Creates a user account row.
 */
async function createUser(input) {
    const userId = (0, crypto_1.randomUUID)();
    const result = await connection_1.pool.query(`INSERT INTO users(user_id, email, display_name, password_hash)
     VALUES ($1, $2, $3, $4)
     RETURNING user_id AS "userId", email, display_name AS "displayName", password_hash AS "passwordHash", created_at AS "createdAt"`, [userId, input.email, input.displayName, input.passwordHash]);
    const createdUser = result.rows[0];
    if (!createdUser) {
        throw new Error("User insert failed.");
    }
    return createdUser;
}
//# sourceMappingURL=user-repository.js.map