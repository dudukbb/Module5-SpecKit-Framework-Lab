"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskQuerySchema = exports.patchTaskSchema = exports.createTaskSchema = void 0;
const zod_1 = require("zod");
const task_types_1 = require("../types/task-types");
const statusSchema = zod_1.z.enum(task_types_1.TASK_STATUSES);
const categorySchema = zod_1.z.enum(task_types_1.TASK_CATEGORIES);
const prioritySchema = zod_1.z.enum(task_types_1.TASK_PRIORITIES);
/**
 * Task create schema.
 */
exports.createTaskSchema = zod_1.z.object({
    title: zod_1.z.string().trim().min(1).max(120),
    description: zod_1.z.string().max(1000).optional(),
    status: statusSchema.optional(),
    category: categorySchema.optional(),
    priority: prioritySchema.optional(),
    dueDate: zod_1.z.string().date().optional(),
});
/**
 * Task patch schema.
 */
exports.patchTaskSchema = exports.createTaskSchema.partial();
/**
 * Task query schema with AND logic.
 */
exports.taskQuerySchema = zod_1.z.object({
    status: zod_1.z.union([statusSchema, zod_1.z.array(statusSchema)]).optional(),
    category: zod_1.z.union([categorySchema, zod_1.z.array(categorySchema)]).optional(),
    priority: zod_1.z.union([prioritySchema, zod_1.z.array(prioritySchema)]).optional(),
    dueFrom: zod_1.z.string().date().optional(),
    dueTo: zod_1.z.string().date().optional(),
    q: zod_1.z.string().max(120).optional(),
});
//# sourceMappingURL=task-validator.js.map