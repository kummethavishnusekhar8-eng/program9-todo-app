import React, { useState, useEffect } from "react";

const INITIAL_TODOS = [
  { id: 1, text: "running", completed: false },
  { id: 2, text: "sleep", completed: false },
  { id: 3, text: "eat", completed: true },
];

export default function App() {
  const [todos, setTodos] = useState(() => {
    try {
      const saved = localStorage.getItem("simple_todos_v1");
      return saved ? JSON.parse(saved) : INITIAL_TODOS;
    } catch {
      return INITIAL_TODOS;
    }
  });

  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all"); // 'all' | 'active' | 'completed'

  useEffect(() => {
    localStorage.setItem("simple_todos_v1", JSON.stringify(todos));
  }, [todos]);

  // Handlers
  const addTodo = (text) => {
    const clean = (text || input).trim();
    if (!clean) return;
    setTodos((prev) => [...prev, { id: Date.now(), text: clean, completed: false }]);
    setInput("");
  };

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((t) => !t.completed));
  };

  const resetDefaults = () => {
    setTodos(INITIAL_TODOS);
  };

  // Metrics
  const totalCount = todos.length;
  const activeCount = todos.filter((t) => !t.completed).length;
  const completedCount = totalCount - activeCount;
  const percentDone = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  // Filtered list
  const filteredTodos = todos.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  return (
    <div className="app-wrapper">
      <div className="todo-container">
        {/* Header */}
        <header className="todo-header">
          <div className="title-row">
            <h1>Todo Application</h1>
            <span className="badge-cs">Case Study 9</span>
          </div>
          <p className="subtitle">Daily Routine Checklist & Task Manager</p>

          {/* Progress Bar */}
          <div className="progress-section">
            <div className="progress-label-row">
              <span>Progress: {completedCount} of {totalCount} completed</span>
              <span className="progress-pct">{percentDone}%</span>
            </div>
            <div className="progress-bar-bg">
              <div className="progress-bar-fill" style={{ width: `${percentDone}%` }}></div>
            </div>
          </div>
        </header>

        {/* Input Form */}
        <form
          className="todo-input-form"
          onSubmit={(e) => {
            e.preventDefault();
            addTodo();
          }}
        >
          <input
            type="text"
            className="todo-input-field"
            placeholder="Add new task (e.g. running, sleep, eat)..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" className="btn-add" disabled={!input.trim()}>
            + Add Task
          </button>
        </form>

        {/* Quick Suggestion Chips */}
        <div className="presets-row">
          <span className="presets-label">Quick Add:</span>
          {["running", "sleep", "eat"].map((preset) => (
            <button
              key={preset}
              type="button"
              className="preset-btn"
              onClick={() => addTodo(preset)}
            >
              + {preset}
            </button>
          ))}
        </div>

        {/* Filter Controls: All, Active, Completed */}
        <div className="filter-bar">
          <div className="filter-tabs">
            <button
              type="button"
              className={`filter-tab ${filter === "all" ? "active" : ""}`}
              onClick={() => setFilter("all")}
            >
              All ({totalCount})
            </button>
            <button
              type="button"
              className={`filter-tab tab-active ${filter === "active" ? "active" : ""}`}
              onClick={() => setFilter("active")}
            >
              Active ({activeCount})
            </button>
            <button
              type="button"
              className={`filter-tab tab-completed ${filter === "completed" ? "active" : ""}`}
              onClick={() => setFilter("completed")}
            >
              Completed ({completedCount})
            </button>
          </div>

          {completedCount > 0 && (
            <button type="button" className="btn-clear" onClick={clearCompleted}>
              Clear Completed
            </button>
          )}
        </div>

        {/* Todo Checklist */}
        <div className="todo-list">
          {filteredTodos.length === 0 ? (
            <div className="empty-message">
              <p>No {filter !== "all" ? filter : ""} tasks found.</p>
              <button type="button" className="btn-reset-link" onClick={resetDefaults}>
                Restore default tasks (running, sleep, eat)
              </button>
            </div>
          ) : (
            filteredTodos.map((todo, index) => (
              <div
                key={todo.id}
                className={`todo-card ${todo.completed ? "is-done" : "is-active"}`}
              >
                {/* Numbering: 1), 2), 3)... */}
                <span className="todo-number">{index + 1})</span>

                {/* Checkbox */}
                <input
                  type="checkbox"
                  className="todo-checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  id={`todo-${todo.id}`}
                />

                {/* Task Text */}
                <label
                  htmlFor={`todo-${todo.id}`}
                  className={`todo-text ${todo.completed ? "struck" : ""}`}
                >
                  {todo.text}
                </label>

                {/* Status Badge */}
                <span className={`status-badge ${todo.completed ? "badge-completed" : "badge-active"}`}>
                  {todo.completed ? "Completed" : "Active"}
                </span>

                {/* Delete Button */}
                <button
                  type="button"
                  className="btn-delete"
                  onClick={() => deleteTodo(todo.id)}
                  title="Delete task"
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer info */}
        <footer className="todo-footer">
          <button type="button" className="btn-reset" onClick={resetDefaults}>
            ↺ Reset Defaults (1. running, 2. sleep, 3. eat)
          </button>
          <span className="footer-meta">Full-Stack Lab Case Study 9</span>
        </footer>
      </div>
    </div>
  );
}
