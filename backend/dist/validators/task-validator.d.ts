import { z } from "zod";
/**
 * Task create schema.
 */
export declare const createTaskSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<{
        backlog: "backlog";
        "to-do": "to-do";
        "in-progress": "in-progress";
        done: "done";
        blocked: "blocked";
    }>>;
    category: z.ZodOptional<z.ZodEnum<{
        work: "work";
        personal: "personal";
        study: "study";
        health: "health";
        finance: "finance";
        other: "other";
    }>>;
    priority: z.ZodOptional<z.ZodEnum<{
        low: "low";
        medium: "medium";
        high: "high";
        critical: "critical";
    }>>;
    dueDate: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
/**
 * Task patch schema.
 */
export declare const patchTaskSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    status: z.ZodOptional<z.ZodOptional<z.ZodEnum<{
        backlog: "backlog";
        "to-do": "to-do";
        "in-progress": "in-progress";
        done: "done";
        blocked: "blocked";
    }>>>;
    category: z.ZodOptional<z.ZodOptional<z.ZodEnum<{
        work: "work";
        personal: "personal";
        study: "study";
        health: "health";
        finance: "finance";
        other: "other";
    }>>>;
    priority: z.ZodOptional<z.ZodOptional<z.ZodEnum<{
        low: "low";
        medium: "medium";
        high: "high";
        critical: "critical";
    }>>>;
    dueDate: z.ZodOptional<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>;
/**
 * Task query schema with AND logic.
 */
export declare const taskQuerySchema: z.ZodObject<{
    status: z.ZodOptional<z.ZodUnion<readonly [z.ZodEnum<{
        backlog: "backlog";
        "to-do": "to-do";
        "in-progress": "in-progress";
        done: "done";
        blocked: "blocked";
    }>, z.ZodArray<z.ZodEnum<{
        backlog: "backlog";
        "to-do": "to-do";
        "in-progress": "in-progress";
        done: "done";
        blocked: "blocked";
    }>>]>>;
    category: z.ZodOptional<z.ZodUnion<readonly [z.ZodEnum<{
        work: "work";
        personal: "personal";
        study: "study";
        health: "health";
        finance: "finance";
        other: "other";
    }>, z.ZodArray<z.ZodEnum<{
        work: "work";
        personal: "personal";
        study: "study";
        health: "health";
        finance: "finance";
        other: "other";
    }>>]>>;
    priority: z.ZodOptional<z.ZodUnion<readonly [z.ZodEnum<{
        low: "low";
        medium: "medium";
        high: "high";
        critical: "critical";
    }>, z.ZodArray<z.ZodEnum<{
        low: "low";
        medium: "medium";
        high: "high";
        critical: "critical";
    }>>]>>;
    dueFrom: z.ZodOptional<z.ZodString>;
    dueTo: z.ZodOptional<z.ZodString>;
    q: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type PatchTaskInput = z.infer<typeof patchTaskSchema>;
export type TaskQueryInput = z.infer<typeof taskQuerySchema>;
//# sourceMappingURL=task-validator.d.ts.map