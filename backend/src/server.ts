import { createApp } from "./app";
import { getEnv } from "./config/env";
import { initDatabase } from "./db/init";

const env = getEnv();

/**
 * Bootstraps DB and starts the HTTP server.
 */
async function startServer() {
  await initDatabase();
  const app = createApp();

  app.listen(env.port, () => {
    // eslint-disable-next-line no-console
    console.log(`Backend listening on port ${env.port}`);
  });
}

startServer().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});
