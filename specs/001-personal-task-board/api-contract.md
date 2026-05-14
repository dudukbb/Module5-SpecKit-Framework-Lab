# API Contract: Personal Task Board v1

Base URL: `/api/v1`

Authentication:
- Register/Login endpoints are public.
- Task endpoints require authenticated user context.
- Primary v1 auth mode is JWT bearer (`Authorization: Bearer <token>`).
- Session cookie auth may be supported as an optional extension.

## Transport Conventions

- Query enum values MUST use slug format.
- Status slugs: `backlog`, `to-do`, `in-progress`, `done`, `blocked`
- Category slugs: `work`, `personal`, `study`, `health`, `finance`, `other`
- Priority slugs: `low`, `medium`, `high`, `critical`
- API responses use a stable JSON envelope: `{ "data": ..., "meta"?: ..., "warning"?: ..., "error"?: ... }`

## Auth Endpoints

### POST `/auth/register`
Request body:
- email: string
- displayName: string
- password: string

Responses:
- 201: user created
	- data: { userId, email, displayName, createdAt }
- 400: validation failure
- 409: email already exists

### POST `/auth/login`
Request body:
- email: string
- password: string

Responses:
- 200: authentication success
	- data: { accessToken, tokenType: "Bearer", expiresIn, user: { userId, email, displayName } }
- 401: invalid credentials

### POST `/auth/logout`
Responses:
- 204: logged out

## Task Endpoints

### GET `/tasks`
Query params (all optional, combined via AND):
- status: one or many of `backlog`,`to-do`,`in-progress`,`done`,`blocked`
- category: one or many of `work`,`personal`,`study`,`health`,`finance`,`other`
- priority: one or many of `low`,`medium`,`high`,`critical`
- dueFrom: ISO date
- dueTo: ISO date
- q: search string

Responses:
- 200: task list for authenticated user
	- data: [{ taskId, title, description, status, category, priority, dueDate, createdAt, updatedAt }]
	- meta: { total, filtersApplied }

### POST `/tasks`
Request body:
- title: string (required)
- description: string (optional)
- status: slug enum (optional, default `to-do`)
- category: slug enum (optional, default `other`)
- priority: slug enum (optional, default `medium`)
- dueDate: ISO date (optional, may be in past; warning may be included)

Responses:
- 201: task created
	- data: { taskId, title, description, status, category, priority, dueDate, createdAt, updatedAt }
	- warning: optional string (for past due-date warning)
- 400: validation failure

### PATCH `/tasks/:taskId`
Request body (partial update):
- title, description, status, category, priority, dueDate

Responses:
- 200: task updated
	- data: { taskId, title, description, status, category, priority, dueDate, createdAt, updatedAt }
	- warning: optional string (for past due-date warning)
- 400: validation failure
- 404: task not found for user

### DELETE `/tasks/:taskId`
Responses:
- 204: task deleted
- 404: task not found for user

## Error Shape (Standard)

- code: string
- message: string
- details: optional object/array

## Notes

- Task ownership is enforced by `userId` from auth context, never from client input.
- API responses should use stable JSON envelopes for easier frontend typing.
- Frontend display labels may include spaces/capitalization; transport always uses slug values.
