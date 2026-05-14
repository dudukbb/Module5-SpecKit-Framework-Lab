/**
 * Hashes a plaintext password using bcrypt.
 */
export declare function hashPassword(rawPassword: string, saltRounds: number): Promise<string>;
/**
 * Compares a plaintext password to an existing hash.
 */
export declare function verifyPassword(rawPassword: string, passwordHash: string): Promise<boolean>;
//# sourceMappingURL=password.d.ts.map