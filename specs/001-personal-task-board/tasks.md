# Tasks: Personal Task Board Application

**Input**: Design documents from `/specs/001-personal-task-board/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/api-contract.md

**Tests**: Required by spec and constitution (Testing Pyramid + >=80% business-logic coverage).

**Organization**: Tasks are grouped by user story to support independent implementation, testing, and incremental delivery.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: User story mapping (US1, US2, US3, US4, US5)

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Initialize full-stack project structure and baseline tooling.

- [ ] T001 Create `frontend/` Vite React TypeScript app structure per plan
- [ ] T002 Create `backend/` Express TypeScript app structure per plan
- [ ] T003 [P] Configure strict TypeScript in `frontend/tsconfig.json` and `backend/tsconfig.json`
- [ ] T004 [P] Configure ESLint + Prettier for frontend and backend
- [ ] T005 [P] Add environment configuration templates in `frontend/.env.example` and `backend/.env.example`
- [ ] T006 [P] Configure backend Jest + ts-jest in `backend/jest.config.ts`
- [ ] T007 [P] Configure frontend test runner setup (Jest/RTL) in `frontend/tests/`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure required before user story implementation.

**⚠️ CRITICAL**: No user story implementation starts before this phase completes.

- [ ] T008 Create PostgreSQL connection and pool setup in `backend/src/db/connection.ts`
- [ ] T009 Create migration scaffolding for users/tasks tables in `backend/src/db/migrations/`
- [ ] T010 [P] Implement shared error handling middleware in `backend/src/middleware/error-handler.ts`
- [ ] T011 [P] Implement request validation middleware with zod in `backend/src/middleware/validate.ts`
- [ ] T012 [P] Implement auth middleware skeleton (JWT bearer primary; optional session extraction) in `backend/src/middleware/auth.ts`
- [ ] T013 Define shared backend types and enums in `backend/src/types/`
- [ ] T014 Define shared frontend API types in `frontend/src/types/api.ts`
- [ ] T015 Setup API router composition in `backend/src/routes/index.ts`

**Checkpoint**: Foundation complete, user stories can proceed.

---

## Phase 3: User Story 1 - Secure Account Access (Priority: P1) 🎯 MVP

**Goal**: Enable registration, login, logout, and authenticated user context.

**Independent Test**: Register user -> login -> access protected endpoint -> logout -> protected endpoint denied.

### Tests for User Story 1

- [ ] T016 [P] [US1] Add unit tests for password hashing helpers in `backend/tests/unit/auth/hash.test.ts`
- [ ] T017 [P] [US1] Add integration tests for register/login/logout in `backend/tests/integration/auth/auth-flow.test.ts`
- [ ] T018 [P] [US1] Add contract tests for `/auth/register`, `/auth/login`, `/auth/logout` in `backend/tests/contract/auth.contract.test.ts`

### Implementation for User Story 1

- [ ] T019 [P] [US1] Implement `User` repository in `backend/src/repositories/user-repository.ts`
- [ ] T020 [US1] Implement auth service (bcrypt + token/session logic) in `backend/src/services/auth-service.ts`
- [ ] T021 [US1] Implement auth validators in `backend/src/validators/auth-validator.ts`
- [ ] T022 [US1] Implement auth routes/controllers in `backend/src/modules/auth/`
- [ ] T023 [US1] Wire auth routes into `backend/src/routes/index.ts`
- [ ] T024 [US1] Implement frontend auth service client in `frontend/src/services/auth-api.ts`
- [ ] T025 [US1] Implement registration/login pages in `frontend/src/pages/`
- [ ] T026 [US1] Add frontend auth state/session handling in `frontend/src/features/auth/`

**Checkpoint**: US1 is independently functional.

---

## Phase 4: User Story 2 - Task Lifecycle Management (Priority: P1)

**Goal**: Support create, edit, delete, and status tracking for user-owned tasks.

**Independent Test**: Authenticated user creates, updates, changes status, and deletes own tasks.

### Tests for User Story 2

- [ ] T027 [P] [US2] Add unit tests for task service CRUD rules in `backend/tests/unit/tasks/task-service.test.ts`
- [ ] T028 [P] [US2] Add integration tests for task CRUD endpoints in `backend/tests/integration/tasks/task-crud.test.ts`
- [ ] T029 [P] [US2] Add contract tests for `/tasks` POST/PATCH/DELETE in `backend/tests/contract/tasks.contract.test.ts`
- [ ] T029a [P] [US2] Add contract test for `GET /tasks` response envelope and auth requirements in `backend/tests/contract/tasks-get.contract.test.ts`

### Implementation for User Story 2

- [ ] T030 [P] [US2] Implement `Task` repository in `backend/src/repositories/task-repository.ts`
- [ ] T031 [US2] Implement task service with ownership checks and defaults in `backend/src/services/task-service.ts`
- [ ] T032 [US2] Implement task validators (title/description/status) in `backend/src/validators/task-validator.ts`
- [ ] T033 [US2] Implement task routes/controllers for POST/PATCH/DELETE in `backend/src/modules/tasks/`
- [ ] T034 [US2] Add frontend task API client in `frontend/src/services/task-api.ts`
- [ ] T035 [US2] Build task create/edit form components in `frontend/src/features/tasks/components/`
- [ ] T036 [US2] Build task list/card interactions in `frontend/src/features/tasks/`

**Checkpoint**: US1 + US2 independently functional.

---

## Phase 5: User Story 3 - Organize by Category and Priority (Priority: P2)

**Goal**: Apply fixed category and priority enums to tasks.

**Independent Test**: User can set/update category and priority and sees persisted values.

### Tests for User Story 3

- [ ] T037 [P] [US3] Add unit tests for enum validation in `backend/tests/unit/tasks/task-enums.test.ts`
- [ ] T038 [P] [US3] Add integration tests for category/priority persistence in `backend/tests/integration/tasks/task-metadata.test.ts`

### Implementation for User Story 3

- [ ] T039 [P] [US3] Add fixed enums to backend domain types in `backend/src/types/task-types.ts`
- [ ] T040 [US3] Enforce enum constraints in task validators/service in `backend/src/validators/task-validator.ts`
- [ ] T041 [US3] Add frontend enum option constants in `frontend/src/features/tasks/constants.ts`
- [ ] T042 [US3] Update task form UI to use fixed enum selectors in `frontend/src/features/tasks/components/task-form.tsx`
- [ ] T043 [US3] Display category and priority badges in task cards in `frontend/src/features/tasks/components/task-card.tsx`

**Checkpoint**: US3 independently functional.

---

## Phase 6: User Story 4 - Due Dates and Filtering (Priority: P2)

**Goal**: Support due dates and AND-based filtering by status/category/priority/date/query.

**Independent Test**: User applies combined filters and gets only matching tasks; past due date allows save with warning.

### Tests for User Story 4

- [ ] T044 [P] [US4] Add unit tests for AND filter logic in `backend/tests/unit/tasks/task-filtering.test.ts`
- [ ] T045 [P] [US4] Add integration tests for `GET /tasks` query behavior in `backend/tests/integration/tasks/task-filter-query.test.ts`
- [ ] T046 [P] [US4] Add frontend unit tests for filter state reducer in `frontend/tests/unit/filter-state.test.ts`

### Implementation for User Story 4

- [ ] T047 [US4] Implement filtered task listing query in `backend/src/repositories/task-repository.ts`
- [ ] T048 [US4] Implement GET `/tasks` endpoint query parsing with slug enums in `backend/src/modules/tasks/`
- [ ] T049 [US4] Add due-date warning behavior in task service/validators in `backend/src/services/task-service.ts`
- [ ] T050 [US4] Build filter controls UI in `frontend/src/features/filters/components/`
- [ ] T051 [US4] Implement filter state + slug query serialization in `frontend/src/features/filters/`
- [ ] T052 [US4] Integrate filtered fetch + empty state handling in `frontend/src/features/tasks/`

**Checkpoint**: US4 independently functional.

---

## Phase 7: User Story 5 - Responsive Dashboard and Persistence (Priority: P3)

**Goal**: Deliver responsive dashboard across mobile/tablet/desktop and validate persistence.

**Independent Test**: UI is usable at target breakpoints and task data persists after refresh/reopen.

### Tests for User Story 5

- [ ] T053 [P] [US5] Add responsive component tests for key layout states in `frontend/tests/integration/dashboard-responsive.test.tsx`
- [ ] T054 [P] [US5] Add backend integration test for persistence/reload behavior in `backend/tests/integration/tasks/task-persistence.test.ts`

### Implementation for User Story 5

- [ ] T055 [US5] Implement responsive dashboard page layout in `frontend/src/pages/dashboard-page.tsx`
- [ ] T056 [US5] Add mobile/tablet/desktop styles in `frontend/src/app/styles/`
- [ ] T057 [US5] Add persisted auth/task bootstrapping flow in `frontend/src/app/`
- [ ] T058 [US5] Add UX states (loading/error/empty) for dashboard and task lists in `frontend/src/features/tasks/`

**Checkpoint**: US5 independently functional.

---

## Phase 8: Polish & Cross-Cutting Quality Gates

**Purpose**: Final compliance with constitution and release readiness.

- [ ] T059 [P] Add JSDoc to all exported backend APIs/services/repositories in `backend/src/`
- [ ] T060 [P] Add JSDoc to exported frontend services/hooks/components in `frontend/src/`
- [ ] T061 Enforce Jest coverage thresholds (>=80% business logic) in `backend/jest.config.ts`
- [ ] T062 [P] Add CI scripts for lint/typecheck/test in root and package scripts
- [ ] T063 Run full quickstart validation from `specs/001-personal-task-board/quickstart.md`
- [ ] T064 Security pass: verify secrets only from env and cookie/JWT settings hardened
- [ ] T065 Final refactor for clean-code compliance and remove dead code

---

## Dependencies & Execution Order

### Phase Dependencies

- Phase 1 (Setup): no dependencies.
- Phase 2 (Foundational): depends on Phase 1; blocks all stories.
- Phases 3-7 (User Stories): depend on Phase 2 completion.
- Phase 8 (Polish): depends on completion of selected stories.

### User Story Dependencies

- **US1 (P1)**: starts immediately after Phase 2.
- **US2 (P1)**: depends on US1 auth context.
- **US3 (P2)**: depends on US2 task domain.
- **US4 (P2)**: depends on US2 task domain and US3 enums.
- **US5 (P3)**: depends on US1-US4 APIs and frontend flows.

### Within Each User Story

- Tests MUST be written first and fail before implementation.
- Repositories/types before services.
- Services/validators before routes/controllers.
- Backend API contracts before frontend integration.

## Parallel Opportunities

- Phase 1 tasks marked [P] can run in parallel.
- In each user story, test tasks marked [P] can run in parallel.
- Backend and frontend tasks for the same story can run in parallel after API contract and service signatures are stable.

## Implementation Strategy

### MVP First (US1 + US2)

1. Complete Setup and Foundational phases.
2. Deliver US1 authentication flow.
3. Deliver US2 task CRUD + status tracking.
4. Validate with integration and contract tests.

### Incremental Delivery

1. Add US3 category/priority support.
2. Add US4 due-date filtering.
3. Add US5 responsive dashboard and persistence UX.
4. Apply polish and quality gates.

## Notes

- Follow constitution requirements at every phase: strict TypeScript, clean code, >=80% business-logic coverage, mandatory JSDoc.
- Keep tasks independently executable and traceable by user story.
