# Data Model: Personal Task Board

## Entity: User

Purpose: Account owner for personal task board data.

Fields:
- userId: UUID (PK)
- email: string (required, unique, valid format)
- displayName: string (required, 1-80 chars)
- passwordHash: string (required, bcrypt hash)
- createdAt: timestamp (required)
- updatedAt: timestamp (required)

Indexes and Constraints:
- Unique index on email
- Non-null constraints on required fields

## Entity: Task

Purpose: User-owned actionable item on the board.

Fields:
- taskId: UUID (PK)
- userId: UUID (FK -> User.userId, required)
- title: string (required, trimmed, 1-120 chars)
- description: string (optional, 0-1000 chars)
- status: enum (Backlog | To Do | In Progress | Done | Blocked)
- category: enum (Work | Personal | Study | Health | Finance | Other)
- priority: enum (Low | Medium | High | Critical)
- dueDate: date (optional; past allowed with warning)
- createdAt: timestamp (required)
- updatedAt: timestamp (required)

Indexes and Constraints:
- Index on userId
- Composite index on (userId, status)
- Composite index on (userId, category, priority)
- Constraint to enum values for status/category/priority

Default Values:
- status default: To Do
- priority default: Medium
- category default: Other

## Entity: FilterState (Application-Level)

Purpose: Runtime representation of active filter criteria.

Fields:
- status: optional enum[]
- category: optional enum[]
- priority: optional enum[]
- dueDateRange: optional object (from, to)
- query: optional string
- operator: fixed value AND

Notes:
- FilterState is not persisted as a core table in v1.
- API query parameters will map to this model for task list requests.
