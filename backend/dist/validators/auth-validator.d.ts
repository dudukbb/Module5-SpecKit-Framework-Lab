import { z } from "zod";
/**
 * Registration request schema.
 */
export declare const registerSchema: z.ZodObject<{
    email: z.ZodString;
    displayName: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
/**
 * Login request schema.
 */
export declare const loginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
//# sourceMappingURL=auth-validator.d.ts.map