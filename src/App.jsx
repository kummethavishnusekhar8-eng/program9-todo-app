import React, { useState, useEffect } from "react";

const INITIAL = [
  { id: 1, text: "running", completed: false },
  { id: 2, text: "sleep", completed: false },
  { id: 3, text: "eat", completed: true },
];

export default function App() {
  const [todos, setTodos] = useState(() => JSON.parse(localStorage.getItem("simple_todos_v1") || "0") || INITIAL);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => localStorage.setItem("simple_todos_v1", JSON.stringify(todos)), [todos]);

  const add = (txt) => {
    const val = (txt || input).trim();
    if (val) { setTodos([...todos, { id: Date.now(), text: val, completed: false }]); setInput(""); }
  };
  const toggle = (id) => setTodos(todos.map((t) => t.id === id ? { ...t, completed: !t.completed } : t));
  const del = (id) => setTodos(todos.filter((t) => t.id !== id));
  const clearDone = () => setTodos(todos.filter((t) => !t.completed));

  const active = todos.filter((t) => !t.completed).length, done = todos.length - active;
  const pct = todos.length ? Math.round((done / todos.length) * 100) : 0;
  const list = todos.filter((t) => filter === "all" ? true : filter === "active" ? !t.completed : t.completed);

  return (
    <div className="app-wrapper">
      <div className="todo-container">
        <header className="todo-header">
          <div className="title-row"><h1>Todo Application</h1></div>
          <p className="subtitle">Daily Routine Checklist & Task Manager</p>
          <div className="progress-section">
            <div className="progress-label-row">
              <span>Progress: {done} of {todos.length} completed</span>
              <span className="progress-pct">{pct}%</span>
            </div>
            <div className="progress-bar-bg"><div className="progress-bar-fill" style={{ width: `${pct}%` }}></div></div>
          </div>
        </header>

        <form className="todo-input-form" onSubmit={(e) => { e.preventDefault(); add(); }}>
          <input className="todo-input-field" placeholder="Add new task (e.g. running, sleep, eat)..." value={input} onChange={(e) => setInput(e.target.value)} />
          <button type="submit" className="btn-add" disabled={!input.trim()}>+ Add Task</button>
        </form>

        <div className="presets-row">
          <span className="presets-label">Quick Add:</span>
          {["running", "sleep", "eat"].map((p) => (
            <button key={p} type="button" className="preset-btn" onClick={() => add(p)}>+ {p}</button>
          ))}
        </div>

        <div className="filter-bar">
          <div className="filter-tabs">
            {["all", "active", "completed"].map((f) => (
              <button key={f} type="button" className={`filter-tab ${f !== "all" ? "tab-" + f : ""} ${filter === f ? "active" : ""}`} onClick={() => setFilter(f)}>
                {f.charAt(0).toUpperCase() + f.slice(1)} ({f === "all" ? todos.length : f === "active" ? active : done})
              </button>
            ))}
          </div>
          {done > 0 && <button type="button" className="btn-clear" onClick={clearDone}>Clear Completed</button>}
        </div>

        <div className="todo-list">
          {list.length === 0 ? (
            <div className="empty-message">
              <p>No {filter !== "all" ? filter : ""} tasks found.</p>
              <button type="button" className="btn-reset-link" onClick={() => setTodos(INITIAL)}>Restore default tasks (running, sleep, eat)</button>
            </div>
          ) : (
            list.map((todo, idx) => (
              <div key={todo.id} className={`todo-card ${todo.completed ? "is-done" : "is-active"}`}>
                <span className="todo-number">{idx + 1})</span>
                <input type="checkbox" className="todo-checkbox" checked={todo.completed} onChange={() => toggle(todo.id)} id={`todo-${todo.id}`} />
                <label htmlFor={`todo-${todo.id}`} className={`todo-text ${todo.completed ? "struck" : ""}`}>{todo.text}</label>
                <span className={`status-badge ${todo.completed ? "badge-completed" : "badge-active"}`}>{todo.completed ? "Completed" : "Active"}</span>
                <button type="button" className="btn-delete" onClick={() => del(todo.id)} title="Delete task">✕</button>
              </div>
            ))
          )}
        </div>

        <footer className="todo-footer">
          <button type="button" className="btn-reset" onClick={() => setTodos(INITIAL)}>↺ Reset Defaults (1. running, 2. sleep, 3. eat)</button>
        </footer>
      </div>
    </div>
  );
}
