/**
 * JWT payload shape used by the API.
 */
export interface AuthTokenPayload {
    userId: string;
    email: string;
    displayName: string;
}
/**
 * Augmented request user context.
 */
export interface AuthenticatedUser {
    userId: string;
    email: string;
    displayName: string;
}
//# sourceMappingURL=auth.d.ts.map