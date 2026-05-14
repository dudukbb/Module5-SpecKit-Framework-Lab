# Module5-MCP-Workflows Constitution

## Core Principles

### I. Clean Code First
All production code MUST prioritize readability, maintainability, and low complexity.
- Functions and methods SHOULD be small, single-purpose, and clearly named.
- Duplication MUST be reduced through sensible abstractions.
- Dead code, commented-out blocks, and unclear temporary workarounds are not allowed in merged branches.
- Refactoring is required when complexity obscures intent.

### II. TypeScript Strict Mode (Non-Negotiable)
All TypeScript projects MUST compile with strict type safety enabled.
- `strict: true` is mandatory in `tsconfig.json`.
- `any` is prohibited unless explicitly justified and documented.
- Null/undefined handling MUST be explicit.
- Public APIs MUST use precise types and avoid implicit behavior.

### III. Testing Pyramid Enforcement
Testing strategy MUST follow the Testing Pyramid.
- Unit tests form the base and cover business rules and domain logic.
- Integration tests validate component boundaries, contracts, and data flow.
- End-to-end tests remain focused on critical user journeys only.
- Test distribution SHOULD avoid over-reliance on slow E2E suites.

### IV. Business Logic Coverage Minimum
Business logic MUST maintain at least 80% automated test coverage.
- The 80% threshold applies specifically to domain and service logic, not only global project averages.
- Coverage reports MUST be generated and reviewed in CI or pre-merge checks.
- Pull requests that reduce business-logic coverage below 80% cannot be approved.

### V. JSDoc Documentation Requirement
All code MUST include JSDoc comments sufficient for maintainability and onboarding.
- Exported functions, classes, interfaces, and types require JSDoc.
- Complex internal logic blocks require concise JSDoc or explanatory comments.
- JSDoc MUST describe purpose, parameters, return values, and notable side effects.
- Documentation MUST be updated with behavior changes in the same pull request.

## Engineering Standards
- Use ESLint and formatting rules to enforce consistency.
- Keep module boundaries explicit and avoid circular dependencies.
- Prefer deterministic, testable code over implicit runtime behavior.
- Favor simplicity and incremental delivery over speculative architecture.

## Delivery and Quality Gates
- Every pull request MUST pass lint, type-check, and test pipelines.
- Reviewers MUST validate compliance with all constitution principles.
- Features lacking tests, strict typing compliance, or required JSDoc are incomplete.
- Any exception requires documented rationale and explicit reviewer approval.

## Governance
This constitution is the highest-priority engineering standard for this repository.
- In case of conflict, this constitution overrides local coding preferences.
- Amendments require a documented proposal and team approval.
- Version updates MUST include rationale and migration notes for affected teams.

**Version**: 1.0.0 | **Ratified**: 2026-05-14 | **Last Amended**: 2026-05-14
