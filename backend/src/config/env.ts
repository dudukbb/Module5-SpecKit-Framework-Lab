import dotenv from "dotenv";

dotenv.config();

/**
 * Strongly typed runtime environment configuration.
 */
export interface AppEnv {
  port: number;
  databaseUrl: string;
  jwtSecret: string;
  jwtExpiresIn: string;
  bcryptSaltRounds: number;
  clientOrigin: string;
}

/**
 * Returns validated environment variables for the API.
 */
export function getEnv(): AppEnv {
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
