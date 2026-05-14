# Research Notes: Personal Task Board Application

## Selected Stack Decisions

1. React + Vite + TypeScript strict mode for frontend
- Rationale: Fast iteration, clear typing, strong ecosystem support.

2. Express.js + TypeScript for backend
- Rationale: Lightweight API layer, broad middleware support, straightforward testing with Jest/supertest.

3. PostgreSQL for persistence
- Rationale: Reliable relational model for users/tasks and robust filtering queries.

4. bcrypt for password hashing
- Rationale: Industry-standard adaptive hashing for credential protection.

5. JWT/session-based authentication
- Rationale: Hybrid support enables stateless API auth (JWT) while allowing session-based workflows when needed.

6. Jest testing strategy
- Rationale: Mature tooling for both unit and integration tests in TypeScript projects.

## Architecture Notes

- Keep business rules in service/domain layer, not controllers.
- Repositories handle DB access; controllers remain thin.
- Validation should occur at API boundaries via schema validators.
- Frontend should use typed API client contracts.

## Testing Pyramid Plan

- Unit tests: domain services, filter logic, validation, auth helpers (majority).
- Integration tests: API routes with DB test setup and auth middleware.
- E2E tests: critical flow only (register/login/create task/filter task).

## Risks and Mitigations

- Risk: Auth complexity with JWT + sessions.
  - Mitigation: Define one primary flow first (JWT bearer), keep session support modular.

- Risk: Coverage target met globally but not on business logic.
  - Mitigation: Configure coverage collection by domain/service paths and enforce threshold there.

- Risk: Strict mode friction during rapid setup.
  - Mitigation: Add shared TS utility types and explicit null handling patterns early.
