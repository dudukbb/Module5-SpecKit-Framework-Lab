"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskRouter = void 0;
const express_1 = require("express");
const auth_1 = require("../../middleware/auth");
const validate_1 = require("../../middleware/validate");
const task_service_1 = require("../../services/task-service");
const task_validator_1 = require("../../validators/task-validator");
/**
 * Normalizes query value into a string array.
 */
function normalizeArray(value) {
    if (!value) {
        return undefined;
    }
    if (Array.isArray(value)) {
        return value;
    }
    return [String(value)];
}
/**
 * Task module routes.
 */
exports.taskRouter = (0, express_1.Router)();
exports.taskRouter.use(auth_1.requireAuth);
exports.taskRouter.get("/", (0, validate_1.validateQuery)(task_validator_1.taskQuerySchema), async (req, res) => {
    const parsedQuery = task_validator_1.taskQuerySchema.parse(req.query);
    const tasks = await (0, task_service_1.listUserTasks)(req.user.userId, {
        status: normalizeArray(parsedQuery.status),
        category: normalizeArray(parsedQuery.category),
        priority: normalizeArray(parsedQuery.priority),
        dueFrom: parsedQuery.dueFrom,
        dueTo: parsedQuery.dueTo,
        q: parsedQuery.q,
    });
    res.json({
        data: tasks,
        meta: {
            total: tasks.length,
            filtersApplied: req.query,
        },
    });
});
exports.taskRouter.post("/", (0, validate_1.validateBody)(task_validator_1.createTaskSchema), async (req, res) => {
    const result = await (0, task_service_1.createUserTask)(req.user.userId, req.body);
    res.status(201).json({
        data: result.task,
        warning: result.warning,
    });
});
exports.taskRouter.patch("/:taskId", (0, validate_1.validateBody)(task_validator_1.patchTaskSchema), async (req, res) => {
    const taskIdRaw = req.params.taskId;
    const taskId = Array.isArray(taskIdRaw) ? taskIdRaw[0] : taskIdRaw;
    if (!taskId) {
        res.status(400).json({
            error: {
                code: "HTTP_400",
                message: "Missing task id.",
            },
        });
        return;
    }
    const result = await (0, task_service_1.updateUserTask)(req.user.userId, taskId, req.body);
    res.json({
        data: result.task,
        warning: result.warning,
    });
});
exports.taskRouter.delete("/:taskId", async (req, res) => {
    const taskIdRaw = req.params.taskId;
    const taskId = Array.isArray(taskIdRaw) ? taskIdRaw[0] : taskIdRaw;
    if (!taskId) {
        res.status(400).json({
            error: {
                code: "HTTP_400",
                message: "Missing task id.",
            },
        });
        return;
    }
    await (0, task_service_1.deleteUserTask)(req.user.userId, taskId);
    res.status(204).send();
});
//# sourceMappingURL=routes.js.map