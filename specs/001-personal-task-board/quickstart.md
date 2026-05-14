# Quickstart: Personal Task Board

## Prerequisites

- Node.js 20+
- npm 10+
- PostgreSQL 14+

## 1. Environment Setup

Create environment files:

Backend (`backend/.env`):
- PORT=4000
- DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/personal_task_board
- JWT_SECRET=replace_with_secure_value
- SESSION_SECRET=replace_with_secure_value
- BCRYPT_SALT_ROUNDS=10

Frontend (`frontend/.env`):
- VITE_API_BASE_URL=http://localhost:4000

## 2. Install Dependencies

Backend:
- npm install

Frontend:
- npm install

## 3. Database

- Create PostgreSQL database: `personal_task_board`
- Run migrations/seeds (to be added in implementation tasks)

## 4. Run Development Servers

Backend:
- npm run dev

Frontend:
- npm run dev

## 5. Quality Gates

Backend and frontend must both pass:
- npm run lint
- npm run typecheck
- npm run test

Coverage policy:
- Business logic coverage must remain >=80%

## 6. Manual Smoke Flow

1. Register a user account
2. Log in and obtain authenticated session/token
3. Create tasks with status/category/priority/due date
4. Edit and delete tasks
5. Apply combined filters and verify AND behavior
6. Reload app and verify persisted data
