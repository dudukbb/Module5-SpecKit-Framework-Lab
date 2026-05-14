import cors from "cors";
import express from "express";
import { getEnv } from "./config/env";
import { errorHandler } from "./middleware/error-handler";
import { apiRouter } from "./routes";

const env = getEnv();

/**
 * Creates configured Express application.
 */
export function createApp() {
  const app = express();

  app.use(
    cors({
      origin: env.clientOrigin,
      credentials: true,
    }),
  );

  app.use(express.json());

  app.get("/health", (_req, res) => {
    res.json({ data: { status: "ok" } });
  });

  app.use("/api/v1", apiRouter);
  app.use(errorHandler);

  return app;
}
