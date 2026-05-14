"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const pg_1 = require("pg");
const env_1 = require("../config/env");
const env = (0, env_1.getEnv)();
/**
 * Shared PostgreSQL connection pool.
 */
exports.pool = new pg_1.Pool({
    connectionString: env.databaseUrl,
});
//# sourceMappingURL=connection.js.map