## Live Demo

Frontend deployment is available on Vercel:

🔗 https://module5-spec-kit-framework-lab-jk5e.vercel.app/login


# Module5-SpecKit-Framework-Lab

A complete demonstration of specification-driven development using the SpecKit framework. This project implements a **Personal Task Board** application through a structured AI-assisted workflow during the EPAM AI Tech Bootcamp Module 5 / Module 6 SpecKit Framework Lab.

## Project Overview

This project showcases how to apply the SpecKit methodology to build a full-stack task management application. Using GitHub Copilot and the SpecKit framework, the Personal Task Board demonstrates specification-driven development—where clear requirements, detailed planning, and artifact generation precede implementation. The result is a well-architected React and Express.js application with PostgreSQL backend, comprehensive documentation, and clean separation of concerns.

## Lab Context

**EPAM AI Tech Bootcamp** | **Module 5 / Module 6: SpecKit Framework Lab**

This project is part of the AI-assisted specification-driven development curriculum, where developers learn to structure projects from requirements through delivery using AI-powered tools and the SpecKit workflow.

## Completed SpecKit Workflow

```
constitution → specify → clarify → checklist → plan → tasks → analyze → implement
```

**Phase Breakdown:**
- **constitution**: Define project values, principles, and team agreements
- **specify**: Create detailed product specification with user stories and requirements
- **clarify**: Refine ambiguities and validate acceptance criteria
- **checklist**: Build implementation checklist tracking all requirements
- **plan**: Develop high-level delivery roadmap and milestones
- **tasks**: Break down work into granular, actionable implementation tasks
- **analyze**: Research technical decisions, data model, and architecture
- **implement**: Build the application with clear, artifact-guided direction

## Project Features

- **User Authentication**: Secure login and registration with JWT bearer tokens
- **Task Board UI**: Responsive Kanban-style board with task cards organized by status columns
- **Status Management**: Five task states—Backlog, To-Do, In-Progress, Done, Blocked
- **Advanced Filtering**: Filter tasks by status, category, priority, and search text
- **Task Metadata**: Assign categories, priority levels, due dates, and descriptions
- **Responsive Design**: Mobile-friendly layout that adapts to all screen sizes
- **JWT Authentication**: Secure, stateless token-based authentication
- **PostgreSQL Backend**: Scalable database schema with proper indexing and migrations

## Repository Structure

```
Module5-SpecKit-Framework-Lab/
├── .github/
│   └── workflows/                    # CI/CD pipelines
├── .specify/
│   ├── memory/
│   │   └── constitution.md           # Project constitution and agreements
│   ├── scripts/
│   └── templates/                    # SpecKit templates
├── specs/
│   └── 001-personal-task-board/
│       ├── spec.md                   # Full product specification
│       ├── checklist.md              # Implementation checklist
│       ├── plan.md                   # Delivery plan and roadmap
│       ├── tasks.md                  # Granular implementation tasks
│       ├── research.md               # Technical research and decisions
│       ├── data-model.md             # Database schema and entity design
│       ├── quickstart.md             # Quick start guide for developers
│       └── api-contract.md           # API endpoints and request/response schemas
├── frontend/
│   ├── src/
│   │   ├── App.tsx                   # Main React application with routing
│   │   ├── main.tsx                  # Application entry point
│   │   └── index.css                 # Global responsive styles
│   ├── public/
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
├── backend/
│   ├── src/
│   │   ├── app.ts                    # Express application setup
│   │   ├── server.ts                 # Server bootstrap
│   │   ├── db/                       # Database connection and initialization
│   │   ├── services/                 # Business logic services
│   │   ├── middleware/               # Express middleware (auth, validation, error handling)
│   │   ├── modules/                  # Feature modules (auth, tasks)
│   │   ├── validators/               # Input validation schemas
│   │   └── utils/                    # JWT, password hashing utilities
│   ├── package.json
│   ├── tsconfig.json
│   └── jest.config.ts
├── README.md
├── package.json                      # Root workspace configuration
└── .env.example                      # Environment variable template
```

## Generated SpecKit Artifacts

Each artifact serves a critical role in the specification-driven workflow:

| Artifact | Purpose |
|----------|---------|
| **constitution.md** | Project values, team agreements, and development principles established at project kickoff. |
| **spec.md** | Comprehensive product specification including user personas, stories, acceptance criteria, and edge cases. |
| **checklist.md** | Implementation checklist tracking all requirements, features, and deliverables for accountability. |
| **plan.md** | High-level delivery plan with phases, milestones, and timeline for project execution. |
| **tasks.md** | Granular breakdown of implementation tasks with dependencies and effort estimates. |
| **research.md** | Technical research findings, architectural decisions, and technology justifications. |
| **data-model.md** | Complete database schema, entity relationships, indexes, and migration strategy. |
| **quickstart.md** | Developer-focused quick start guide for setting up and running the application locally. |
| **api-contract.md** | Detailed API documentation including endpoints, request/response schemas, and authentication flow. |

## Tech Stack

### Frontend
- **React** – Modern UI library with hooks and JSX
- **Vite** – Fast build tool with Hot Module Replacement (HMR)
- **TypeScript** – Full type safety with strict mode
- **React Router** – Client-side routing and navigation
- **Axios** – Promise-based HTTP client

### Backend
- **Express.js** – Minimal, flexible Node.js web framework
- **TypeScript** – Type-safe backend development
- **PostgreSQL** – Relational database with indexing and schema management
- **JWT** – Secure stateless authentication
- **bcrypt** – Password hashing and security
- **Zod** – Runtime schema validation

### Quality & Testing
- **Jest** – Unit and integration testing framework
- **ESLint** – Code linting and style enforcement
- **TypeScript strict mode** – Maximum type safety at compile time
- **JSDoc** – Code documentation standards
- **Test coverage targets** – Code quality baseline for acceptance

## Frontend UI

The implementation phase produced a fully functional responsive user interface:

- **Login Page** – User authentication with email and password validation
- **Registration Page** – New user account creation with display name setup
- **Task Board Dashboard** – Kanban board featuring five status columns with task cards
- **Task Creation Form** – Create new tasks with title, description, category, priority, and due date
- **Task Management** – Edit and delete existing tasks with immediate board updates
- **Filtering System** – Advanced filters by status, category, priority, and full-text search
- **Responsive Layout** – Sidebar for forms and filters; main area for the task board
- **Category & Priority Badges** – Visual indicators for task attributes and urgency
- **Due Date Display** – Human-readable date formatting for task deadlines

## Screenshots

### Login Page

![Login Page](./screenshots/login.png)

### Registration Page

![Registration Page](./screenshots/create-account.png)

## Local Development

### Prerequisites
- Node.js 18+
- npm 9+
- PostgreSQL 13+ (for backend database)

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend development server will start at `http://localhost:5173`.

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

The backend API server will start at `http://localhost:4000`.

### Environment Configuration

Create a `.env` file in the backend directory:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/task_board

# Authentication
JWT_SECRET=your-secret-key-change-this-in-production
JWT_EXPIRES_IN=24h
BCRYPT_SALT_ROUNDS=10

# Server
PORT=4000
CLIENT_ORIGIN=http://localhost:5173
```

Create a `.env` file in the frontend directory (if using environment variables):

```env
VITE_API_BASE_URL=http://localhost:4000
```

### Running Tests

Backend:
```bash
cd backend
npm run test
```

Frontend:
```bash
cd frontend
npm run test
```

## Development Standards

- **Code Style**: ESLint configuration enforced; Prettier for formatting
- **Type Safety**: TypeScript strict mode required on all files
- **Documentation**: JSDoc comments for all public functions and exports
- **Naming Conventions**: PascalCase for components and types; camelCase for functions and variables
- **Architecture**: Feature-based folder structure with clear separation of concerns
- **Testing**: Unit tests for business logic; integration tests for API endpoints

## Submission Status

This project is submitted for **EPAM AI Tech Bootcamp Module 5 / Module 6** evaluation as a complete demonstration of:
- Specification-driven development with SpecKit
- Full-stack application architecture and implementation
- AI-assisted development workflow using GitHub Copilot
- Professional code organization, documentation, and quality standards

---
