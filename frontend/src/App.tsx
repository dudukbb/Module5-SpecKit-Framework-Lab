import { useEffect, useMemo, useState } from "react";
import type { Dispatch, FormEvent, SetStateAction } from "react";
import { BrowserRouter, Link, Navigate, Route, Routes, useNavigate } from "react-router-dom";

type TaskStatus = "backlog" | "to-do" | "in-progress" | "done" | "blocked";
type TaskCategory = "work" | "personal" | "study" | "health" | "finance" | "other";
type TaskPriority = "low" | "medium" | "high" | "critical";

interface ApiTask {
  taskId: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  category: TaskCategory;
  priority: TaskPriority;
  dueDate: string | null;
}

interface AuthPayload {
  accessToken: string;
  user: {
    userId: string;
    email: string;
    displayName: string;
  };
}

interface LoginInput {
  email: string;
  password: string;
}

interface RegisterInput {
  email: string;
  displayName: string;
  password: string;
}

interface TaskFormState {
  title: string;
  description: string;
  status: TaskStatus;
  category: TaskCategory;
  priority: TaskPriority;
  dueDate: string;
}

interface FilterState {
  status: TaskStatus | "";
  category: TaskCategory | "";
  priority: TaskPriority | "";
  q: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:4000";
const AUTH_STORAGE_KEY = "ptb_auth";

const STATUS_OPTIONS: TaskStatus[] = ["backlog", "to-do", "in-progress", "done", "blocked"];
const CATEGORY_OPTIONS: TaskCategory[] = ["work", "personal", "study", "health", "finance", "other"];
const PRIORITY_OPTIONS: TaskPriority[] = ["low", "medium", "high", "critical"];

const EMPTY_TASK_FORM: TaskFormState = {
  title: "",
  description: "",
  status: "to-do",
  category: "other",
  priority: "medium",
  dueDate: "",
};

const EMPTY_FILTERS: FilterState = {
  status: "",
  category: "",
  priority: "",
  q: "",
};

function toLabel(value: string): string {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function formatDueDate(value: string | null): string {
  if (!value) {
    return "No due date";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString();
}

function buildTaskQuery(filters: FilterState): string {
  const params = new URLSearchParams();

  if (filters.status) {
    params.append("status", filters.status);
  }
  if (filters.category) {
    params.append("category", filters.category);
  }
  if (filters.priority) {
    params.append("priority", filters.priority);
  }
  if (filters.q.trim()) {
    params.append("q", filters.q.trim());
  }

  return params.toString();
}

interface LoginPageProps {
  errorMessage: string;
  infoMessage: string;
  onLogin: (input: LoginInput) => Promise<void>;
}

function LoginPage({ errorMessage, infoMessage, onLogin }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    await onLogin({ email, password });
    setPassword("");
  }

  return (
    <section className="auth-page">
      <div className="auth-card card">
        <h1>Personal Task Board</h1>
        <p className="muted">Sign in to manage your tasks.</p>

        {errorMessage ? <p className="message error">{errorMessage}</p> : null}
        {infoMessage ? <p className="message info">{infoMessage}</p> : null}

        <form className="grid-form" onSubmit={handleSubmit}>
          <label>
            Email
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={8}
              required
            />
          </label>

          <button type="submit">Login</button>
        </form>

        <p className="auth-footer">
          New here? <Link to="/register">Create account</Link>
        </p>
      </div>
    </section>
  );
}

interface RegisterPageProps {
  errorMessage: string;
  infoMessage: string;
  onRegister: (input: RegisterInput) => Promise<void>;
}

function RegisterPage({ errorMessage, infoMessage, onRegister }: RegisterPageProps) {
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    await onRegister({ email, displayName, password });
    setPassword("");
  }

  return (
    <section className="auth-page">
      <div className="auth-card card">
        <h1>Create Account</h1>
        <p className="muted">Register to start organizing tasks.</p>

        {errorMessage ? <p className="message error">{errorMessage}</p> : null}
        {infoMessage ? <p className="message info">{infoMessage}</p> : null}

        <form className="grid-form" onSubmit={handleSubmit}>
          <label>
            Display Name
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              required
            />
          </label>

          <label>
            Email
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={8}
              required
            />
          </label>

          <button type="submit">Register</button>
        </form>

        <p className="auth-footer">
          Already registered? <Link to="/login">Back to login</Link>
        </p>
      </div>
    </section>
  );
}

interface BoardPageProps {
  auth: AuthPayload;
  tasks: ApiTask[];
  filters: FilterState;
  taskForm: TaskFormState;
  editingTaskId: string | null;
  loading: boolean;
  errorMessage: string;
  infoMessage: string;
  setFilters: Dispatch<SetStateAction<FilterState>>;
  setTaskForm: Dispatch<SetStateAction<TaskFormState>>;
  setEditingTaskId: Dispatch<SetStateAction<string | null>>;
  onApplyFilters: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  onClearFilters: () => Promise<void>;
  onSaveTask: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  onDeleteTask: (taskId: string) => Promise<void>;
  onStartEdit: (task: ApiTask) => void;
  onLogout: () => void;
}

function BoardPage({
  auth,
  tasks,
  filters,
  taskForm,
  editingTaskId,
  loading,
  errorMessage,
  infoMessage,
  setFilters,
  setTaskForm,
  setEditingTaskId,
  onApplyFilters,
  onClearFilters,
  onSaveTask,
  onDeleteTask,
  onStartEdit,
  onLogout,
}: BoardPageProps) {
  const tasksByStatus = useMemo(() => {
    return STATUS_OPTIONS.reduce<Record<TaskStatus, ApiTask[]>>((acc, status) => {
      acc[status] = tasks.filter((task) => task.status === status);
      return acc;
    }, {
      backlog: [],
      "to-do": [],
      "in-progress": [],
      done: [],
      blocked: [],
    });
  }, [tasks]);

  return (
    <div className="board-layout">
      <header className="board-header card">
        <div>
          <h1>Personal Task Board</h1>
          <p className="muted">Welcome, {auth.user.displayName}</p>
        </div>
        <button type="button" className="ghost" onClick={onLogout}>
          Logout
        </button>
      </header>

      {errorMessage ? <p className="message error">{errorMessage}</p> : null}
      {infoMessage ? <p className="message info">{infoMessage}</p> : null}

      <div className="board-content">
        <aside className="board-sidebar">
          <section className="card">
            <h2>{editingTaskId ? "Edit Task" : "Create Task"}</h2>
            <form className="grid-form" onSubmit={onSaveTask}>
              <label>
                Title
                <input
                  type="text"
                  maxLength={120}
                  value={taskForm.title}
                  onChange={(e) => setTaskForm((prev) => ({ ...prev, title: e.target.value }))}
                  required
                />
              </label>

              <label>
                Description
                <textarea
                  maxLength={1000}
                  value={taskForm.description}
                  onChange={(e) => setTaskForm((prev) => ({ ...prev, description: e.target.value }))}
                />
              </label>

              <div className="three-col">
                <label>
                  Status
                  <select
                    value={taskForm.status}
                    onChange={(e) => setTaskForm((prev) => ({ ...prev, status: e.target.value as TaskStatus }))}
                  >
                    {STATUS_OPTIONS.map((status) => (
                      <option key={status} value={status}>
                        {toLabel(status)}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  Category
                  <select
                    value={taskForm.category}
                    onChange={(e) => setTaskForm((prev) => ({ ...prev, category: e.target.value as TaskCategory }))}
                  >
                    {CATEGORY_OPTIONS.map((category) => (
                      <option key={category} value={category}>
                        {toLabel(category)}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  Priority
                  <select
                    value={taskForm.priority}
                    onChange={(e) => setTaskForm((prev) => ({ ...prev, priority: e.target.value as TaskPriority }))}
                  >
                    {PRIORITY_OPTIONS.map((priority) => (
                      <option key={priority} value={priority}>
                        {toLabel(priority)}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label>
                Due Date
                <input
                  type="date"
                  value={taskForm.dueDate}
                  onChange={(e) => setTaskForm((prev) => ({ ...prev, dueDate: e.target.value }))}
                />
              </label>

              <div className="actions">
                <button type="submit">{editingTaskId ? "Update Task" : "Create Task"}</button>
                {editingTaskId ? (
                  <button
                    type="button"
                    className="ghost"
                    onClick={() => {
                      setEditingTaskId(null);
                      setTaskForm(EMPTY_TASK_FORM);
                    }}
                  >
                    Cancel
                  </button>
                ) : null}
              </div>
            </form>
          </section>

          <section className="card">
            <h2>Filters</h2>
            <form className="grid-form" onSubmit={onApplyFilters}>
              <label>
                Search
                <input
                  type="text"
                  value={filters.q}
                  onChange={(e) => setFilters((prev) => ({ ...prev, q: e.target.value }))}
                  placeholder="title or description"
                />
              </label>

              <div className="three-col">
                <label>
                  Status
                  <select
                    value={filters.status}
                    onChange={(e) => setFilters((prev) => ({ ...prev, status: e.target.value as TaskStatus | "" }))}
                  >
                    <option value="">All</option>
                    {STATUS_OPTIONS.map((status) => (
                      <option key={status} value={status}>
                        {toLabel(status)}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  Category
                  <select
                    value={filters.category}
                    onChange={(e) => setFilters((prev) => ({ ...prev, category: e.target.value as TaskCategory | "" }))}
                  >
                    <option value="">All</option>
                    {CATEGORY_OPTIONS.map((category) => (
                      <option key={category} value={category}>
                        {toLabel(category)}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  Priority
                  <select
                    value={filters.priority}
                    onChange={(e) => setFilters((prev) => ({ ...prev, priority: e.target.value as TaskPriority | "" }))}
                  >
                    <option value="">All</option>
                    {PRIORITY_OPTIONS.map((priority) => (
                      <option key={priority} value={priority}>
                        {toLabel(priority)}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="actions">
                <button type="submit">Apply</button>
                <button type="button" className="ghost" onClick={() => void onClearFilters()}>
                  Clear
                </button>
              </div>
            </form>
          </section>
        </aside>

        <section className="card board-main">
          <div className="board-title">
            <h2>Task Board</h2>
            <p className="muted">{loading ? "Loading..." : `${tasks.length} task(s)`}</p>
          </div>

          <div className="status-grid">
            {STATUS_OPTIONS.map((status) => (
              <article key={status} className="status-column">
                <h3>
                  {toLabel(status)} <span>{tasksByStatus[status].length}</span>
                </h3>

                <div className="column-cards">
                  {tasksByStatus[status].length === 0 ? (
                    <p className="muted small">No tasks</p>
                  ) : (
                    tasksByStatus[status].map((task) => (
                      <div key={task.taskId} className="task-card">
                        <h4>{task.title}</h4>
                        <p>{task.description || "No description"}</p>
                        <div className="badge-row">
                          <span className="pill category">{toLabel(task.category)}</span>
                          <span className="pill priority">{toLabel(task.priority)}</span>
                        </div>
                        <p className="due-date">Due: {formatDueDate(task.dueDate)}</p>
                        <div className="actions">
                          <button type="button" onClick={() => onStartEdit(task)}>
                            Edit
                          </button>
                          <button type="button" className="danger" onClick={() => void onDeleteTask(task.taskId)}>
                            Delete
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function AppShell() {
  const navigate = useNavigate();
  const [auth, setAuth] = useState<AuthPayload | null>(() => {
    const saved = localStorage.getItem(AUTH_STORAGE_KEY);
    return saved ? (JSON.parse(saved) as AuthPayload) : null;
  });
  const [tasks, setTasks] = useState<ApiTask[]>([]);
  const [taskForm, setTaskForm] = useState<TaskFormState>(EMPTY_TASK_FORM);
  const [filters, setFilters] = useState<FilterState>(EMPTY_FILTERS);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [infoMessage, setInfoMessage] = useState("");

  useEffect(() => {
    if (!auth) {
      setTasks([]);
      return;
    }
    void fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  async function requestAuth(endpoint: string, payload: LoginInput | RegisterInput, successMessage: string): Promise<void> {
    setErrorMessage("");
    setInfoMessage("");

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Authentication failed.");
      }

      const data = (await response.json()) as {
        data?: {
          accessToken?: string;
          user?: { userId?: string; email?: string; displayName?: string };
          userId?: string;
          email?: string;
          displayName?: string;
        };
        meta?: { accessToken?: string };
      };

      const accessToken = data.data?.accessToken ?? data.meta?.accessToken ?? "";
      const user = data.data?.user
        ? {
            userId: data.data.user.userId ?? "",
            email: data.data.user.email ?? "",
            displayName: data.data.user.displayName ?? "",
          }
        : {
            userId: data.data?.userId ?? "",
            email: data.data?.email ?? ("email" in payload ? payload.email : ""),
            displayName:
              data.data?.displayName ??
              ("displayName" in payload ? payload.displayName : ("email" in payload ? payload.email : "")),
          };

      if (!accessToken) {
        throw new Error("Authentication token missing from response.");
      }

      const authPayload: AuthPayload = { accessToken, user };
      setAuth(authPayload);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authPayload));
      setInfoMessage(successMessage);
      navigate("/board");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unexpected auth error.");
    }
  }

  async function fetchTasks(activeFilters: FilterState = filters): Promise<void> {
    if (!auth) {
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const query = buildTaskQuery(activeFilters);
      const response = await fetch(`${API_BASE_URL}/api/v1/tasks${query ? `?${query}` : ""}`, {
        headers: { Authorization: `Bearer ${auth.accessToken}` },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch tasks.");
      }

      const payload = (await response.json()) as { data: ApiTask[] };
      setTasks(payload.data ?? []);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unknown task fetch error.");
    } finally {
      setLoading(false);
    }
  }

  async function saveTask(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    if (!auth) {
      return;
    }

    setErrorMessage("");
    setInfoMessage("");

    const endpoint = editingTaskId ? `/api/v1/tasks/${editingTaskId}` : "/api/v1/tasks";
    const method = editingTaskId ? "PATCH" : "POST";

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.accessToken}`,
        },
        body: JSON.stringify({
          title: taskForm.title,
          description: taskForm.description || undefined,
          status: taskForm.status,
          category: taskForm.category,
          priority: taskForm.priority,
          dueDate: taskForm.dueDate || undefined,
        }),
      });

      if (!response.ok) {
        throw new Error("Task save failed.");
      }

      setTaskForm(EMPTY_TASK_FORM);
      setEditingTaskId(null);
      setInfoMessage(editingTaskId ? "Task updated." : "Task created.");
      await fetchTasks();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Task save error.");
    }
  }

  async function removeTask(taskId: string): Promise<void> {
    if (!auth) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/tasks/${taskId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${auth.accessToken}` },
      });

      if (!response.ok) {
        throw new Error("Task delete failed.");
      }

      await fetchTasks();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Task delete error.");
    }
  }

  function startEdit(task: ApiTask): void {
    setEditingTaskId(task.taskId);
    setTaskForm({
      title: task.title,
      description: task.description ?? "",
      status: task.status,
      category: task.category,
      priority: task.priority,
      dueDate: task.dueDate ?? "",
    });
  }

  async function applyFilters(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    await fetchTasks(filters);
  }

  async function clearFilters(): Promise<void> {
    setFilters(EMPTY_FILTERS);
    await fetchTasks(EMPTY_FILTERS);
  }

  function logout(): void {
    setAuth(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setTaskForm(EMPTY_TASK_FORM);
    setFilters(EMPTY_FILTERS);
    setEditingTaskId(null);
    setErrorMessage("");
    setInfoMessage("");
    navigate("/login");
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={
          auth ? (
            <Navigate to="/board" replace />
          ) : (
            <LoginPage
              errorMessage={errorMessage}
              infoMessage={infoMessage}
              onLogin={(input) => requestAuth("/api/v1/auth/login", input, "Login successful.")}
            />
          )
        }
      />
      <Route
        path="/register"
        element={
          auth ? (
            <Navigate to="/board" replace />
          ) : (
            <RegisterPage
              errorMessage={errorMessage}
              infoMessage={infoMessage}
              onRegister={(input) => requestAuth("/api/v1/auth/register", input, "Registration successful.")}
            />
          )
        }
      />
      <Route
        path="/board"
        element={
          auth ? (
            <BoardPage
              auth={auth}
              tasks={tasks}
              filters={filters}
              taskForm={taskForm}
              editingTaskId={editingTaskId}
              loading={loading}
              errorMessage={errorMessage}
              infoMessage={infoMessage}
              setFilters={setFilters}
              setTaskForm={setTaskForm}
              setEditingTaskId={setEditingTaskId}
              onApplyFilters={applyFilters}
              onClearFilters={clearFilters}
              onSaveTask={saveTask}
              onDeleteTask={removeTask}
              onStartEdit={startEdit}
              onLogout={logout}
            />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route path="*" element={<Navigate to={auth ? "/board" : "/login"} replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
