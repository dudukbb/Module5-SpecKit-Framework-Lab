import { Pool } from "pg";
import { getEnv } from "../config/env";

const env = getEnv();

/**
 * Shared PostgreSQL connection pool.
 */
export const pool = new Pool({
  connectionString: env.databaseUrl,
});
