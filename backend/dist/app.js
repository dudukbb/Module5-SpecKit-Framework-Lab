"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = createApp;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const env_1 = require("./config/env");
const error_handler_1 = require("./middleware/error-handler");
const routes_1 = require("./routes");
const env = (0, env_1.getEnv)();
/**
 * Creates configured Express application.
 */
function createApp() {
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)({
        origin: env.clientOrigin,
        credentials: true,
    }));
    app.use(express_1.default.json());
    app.get("/health", (_req, res) => {
        res.json({ data: { status: "ok" } });
    });
    app.use("/api/v1", routes_1.apiRouter);
    app.use(error_handler_1.errorHandler);
    return app;
}
//# sourceMappingURL=app.js.map