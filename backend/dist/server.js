"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const env_1 = require("./config/env");
const init_1 = require("./db/init");
const env = (0, env_1.getEnv)();
/**
 * Bootstraps DB and starts the HTTP server.
 */
async function startServer() {
    await (0, init_1.initDatabase)();
    const app = (0, app_1.createApp)();
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
//# sourceMappingURL=server.js.map