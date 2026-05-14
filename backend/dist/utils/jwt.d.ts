import type { AuthTokenPayload } from "../types/auth";
/**
 * Signs an auth token for a user payload.
 */
export declare function signAuthToken(payload: AuthTokenPayload): string;
/**
 * Verifies and decodes an auth token.
 */
export declare function verifyAuthToken(token: string): AuthTokenPayload;
//# sourceMappingURL=jwt.d.ts.map