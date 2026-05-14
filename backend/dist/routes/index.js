"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = void 0;
const express_1 = require("express");
const routes_1 = require("../modules/auth/routes");
const routes_2 = require("../modules/tasks/routes");
/**
 * Root API router for v1 endpoints.
 */
exports.apiRouter = (0, express_1.Router)();
exports.apiRouter.use("/auth", routes_1.authRouter);
exports.apiRouter.use("/tasks", routes_2.taskRouter);
//# sourceMappingURL=index.js.map