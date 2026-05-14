import type { LoginInput, RegisterInput } from "../validators/auth-validator";
/**
 * Registers a user and returns auth token with profile payload.
 */
export declare function registerUser(input: RegisterInput): Promise<{
    accessToken: string;
    tokenType: "Bearer";
    expiresIn: string;
    user: {
        userId: string;
        email: string;
        displayName: string;
        createdAt: string;
    };
}>;
/**
 * Authenticates a user and returns a new token payload.
 */
export declare function loginUser(input: LoginInput): Promise<{
    accessToken: string;
    tokenType: "Bearer";
    expiresIn: string;
    user: {
        userId: string;
        email: string;
        displayName: string;
    };
}>;
//# sourceMappingURL=auth-service.d.ts.map