import { Router } from "express";
import { authRouter } from "../modules/auth/routes";
import { taskRouter } from "../modules/tasks/routes";

/**
 * Root API router for v1 endpoints.
 */
export const apiRouter = Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/tasks", taskRouter);
