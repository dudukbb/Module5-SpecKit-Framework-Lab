import type { User } from "../types/task-types";
/**
 * Looks up a user by email.
 */
export declare function findUserByEmail(email: string): Promise<User | null>;
/**
 * Creates a user account row.
 */
export declare function createUser(input: {
    email: string;
    displayName: string;
    passwordHash: string;
}): Promise<User>;
//# sourceMappingURL=user-repository.d.ts.map