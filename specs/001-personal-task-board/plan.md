# Implementation Plan: Personal Task Board Application

**Branch**: `001-personal-task-board` | **Date**: 2026-05-14 | **Spec**: `specs/001-personal-task-board/spec.md`

**Input**: Feature specification from `/specs/001-personal-task-board/spec.md`

## Summary

Build a full-stack Personal Task Board with secure user authentication, task lifecycle management, filtering, and responsive UX. The frontend will use React + Vite + TypeScript strict mode. The backend will use Express.js + TypeScript with PostgreSQL persistence, bcrypt password hashing, and JWT/session-based authentication. JWT bearer authentication is the primary v1 mode; session support is an optional extension. Testing will follow the Testing Pyramid with Jest and an enforced minimum of 80% business-logic coverage.

## Technical Context

**Language/Version**:
- Frontend: TypeScript 5.x (`strict: true`)
- Backend: TypeScript 5.x (Node.js 20 LTS)

**Primary Dependencies**:
- Frontend: React 18, Vite, React Router, Axios (or Fetch wrapper)
- Backend: Express.js, bcrypt, jsonwebtoken, express-session (optional extension), zod (validation), pg (PostgreSQL driver)
- Shared: dotenv, ESLint, Prettier

**Storage**: PostgreSQL (users, tasks)

**Testing**:
- Unit/Integration: Jest (+ ts-jest), supertest for API integration
- Frontend tests (optional in phase 1): React Testing Library + Jest
- E2E (critical flows only): Playwright (optional post-MVP)

**Target Platform**:
- Web app for modern browsers
- Backend API service on Node.js runtime

**Project Type**: Web application (frontend + backend)

**Performance Goals**:
- API p95 read/write response under 300ms in local dev baseline
- Dashboard initial load under 2s in local dev baseline

**Constraints**:
- TypeScript strict mode must pass in frontend and backend
- No hardcoded secrets; env-based configuration only
- Minimum 80% business-logic coverage
- Mandatory JSDoc for exported APIs and complex logic

**Scale/Scope**:
- Single-user personal board behavior per account
- No shared boards or collaboration in v1
- Expected small-to-medium personal task volumes per user

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Clean Code First: PASS (modular service boundaries, small focused units planned)
- TypeScript Strict Mode: PASS (`strict: true` required in both app tiers)
- Testing Pyramid: PASS (unit-heavy strategy with targeted integration/e2e)
- Business Logic Coverage >=80%: PASS (enforced via Jest coverage thresholds)
- JSDoc Requirement: PASS (document exported APIs, services, and complex logic)

## Project Structure

### Documentation (this feature)

```text
specs/001-personal-task-board/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── api-contract.md
└── tasks.md
```

### Source Code (repository root)

```text
frontend/
├── src/
│   ├── app/
│   ├── components/
│   ├── features/
│   │   ├── auth/
│   │   ├── tasks/
│   │   └── filters/
│   ├── pages/
│   ├── services/
│   ├── types/
│   └── utils/
├── public/
├── tests/
│   ├── unit/
│   └── integration/
├── vite.config.ts
└── tsconfig.json

backend/
├── src/
│   ├── app.ts
│   ├── server.ts
│   ├── config/
│   ├── db/
│   ├── middleware/
│   ├── modules/
│   │   ├── auth/
│   │   ├── tasks/
│   │   └── users/
│   ├── routes/
│   ├── services/
│   ├── repositories/
│   ├── validators/
│   └── types/
├── tests/
│   ├── unit/
│   ├── integration/
│   └── contract/
├── jest.config.ts
└── tsconfig.json
```

**Structure Decision**: Use the web application split (`frontend/` + `backend/`) to isolate UI concerns from API/domain logic, improve testability, and enforce clear architecture boundaries under strict TypeScript.

## Implementation Phases

### Phase 0: Foundation
- Scaffold frontend (Vite React TS) and backend (Express TS)
- Configure strict TypeScript, ESLint, Prettier, and environment variables
- Set up PostgreSQL connection and migration strategy

### Phase 1: Authentication and Security
- Implement registration/login/logout endpoints
- Hash passwords with bcrypt
- Implement JWT issuance and bearer token auth middleware as primary v1 flow
- Add optional session support behind feature-flag/config toggle
- Add auth guards for task endpoints

### Phase 2: Task Domain and Filtering
- Implement task CRUD with ownership checks
- Add fixed enums for statuses, categories, priorities
- Implement due-date handling with past-date warning behavior
- Implement AND-based filtering logic

### Phase 3: Frontend Dashboard
- Build responsive auth and dashboard pages
- Implement task board views and form dialogs
- Add filter controls and status/category/priority chips
- Integrate API with frontend state management

### Phase 4: Quality Gates
- Add Jest unit/integration coverage for business logic and APIs
- Enforce >=80% business-logic coverage in CI
- Add JSDoc to exported APIs and complex logic
- Run lint, type-check, and tests as pre-merge gates

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |
