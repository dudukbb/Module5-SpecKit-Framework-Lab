import { Router } from "express";
import { requireAuth } from "../../middleware/auth";
import { validateBody, validateQuery } from "../../middleware/validate";
import { createUserTask, deleteUserTask, listUserTasks, updateUserTask } from "../../services/task-service";
import { createTaskSchema, patchTaskSchema, taskQuerySchema, type TaskQueryInput } from "../../validators/task-validator";

/**
 * Normalizes query value into a string array.
 */
function normalizeArray(value: unknown): string[] | undefined {
  if (!value) {
    return undefined;
  }

  if (Array.isArray(value)) {
    return value as string[];
  }

  return [String(value)];
}

/**
 * Task module routes.
 */
export const taskRouter = Router();

taskRouter.use(requireAuth);

taskRouter.get("/", validateQuery(taskQuerySchema), async (req, res) => {
  const parsedQuery = taskQuerySchema.parse(req.query) as TaskQueryInput;

  const tasks = await listUserTasks(req.user!.userId, {
    status: normalizeArray(parsedQuery.status) as never,
    category: normalizeArray(parsedQuery.category) as never,
    priority: normalizeArray(parsedQuery.priority) as never,
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

taskRouter.post("/", validateBody(createTaskSchema), async (req, res) => {
  const result = await createUserTask(req.user!.userId, req.body);

  res.status(201).json({
    data: result.task,
    warning: result.warning,
  });
});

taskRouter.patch("/:taskId", validateBody(patchTaskSchema), async (req, res) => {
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

  const result = await updateUserTask(req.user!.userId, taskId, req.body);

  res.json({
    data: result.task,
    warning: result.warning,
  });
});

taskRouter.delete("/:taskId", async (req, res) => {
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

  await deleteUserTask(req.user!.userId, taskId);
  res.status(204).send();
});
