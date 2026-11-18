import { useState, useEffect } from "react";

export default function App() {
  const [todos, setTodos] = useState(() => JSON.parse(localStorage.getItem("todos_v3") || "[]"));
  const [input, setInput] = useState(""), [filter, setFilter] = useState("all");

  useEffect(() => localStorage.setItem("todos_v3", JSON.stringify(todos)), [todos]);

  const add = (t) => {
    const val = (t || input).trim();
    if (val) { setTodos((prev) => [...prev, { id: Date.now() + Math.random(), text: val, completed: false }]); setInput(""); }
  };
  const toggle = (id) => setTodos(todos.map((t) => t.id === id ? { ...t, completed: !t.completed } : t));
  const del = (id) => setTodos(todos.filter((t) => t.id !== id));
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
            <div className="progress-label-row"><span>Progress: {done} of {todos.length} completed</span><span className="progress-pct">{pct}%</span></div>
            <div className="progress-bar-bg"><div className="progress-bar-fill" style={{ width: `${pct}%` }} /></div>
          </div>
        </header>

        <form className="todo-input-form" onSubmit={(e) => { e.preventDefault(); add(); }}>
          <input className="todo-input-field" placeholder="Add new task (e.g. running, sleep, eat)..." value={input} onChange={(e) => setInput(e.target.value)} />
          <button type="submit" className="btn-add" disabled={!input.trim()}>+ Add Task</button>
        </form>

        <div className="presets-row">
          <span className="presets-label">Quick Add:</span>
          {["running", "sleep", "eat"].map((p) => <button key={p} type="button" className="preset-btn" onClick={() => add(p)}>+ {p}</button>)}
        </div>

        <div className="filter-bar">
          <div className="filter-tabs">
            {["all", "active", "completed"].map((f) => (
              <button key={f} type="button" className={`filter-tab ${f !== "all" ? "tab-" + f : ""} ${filter === f ? "active" : ""}`} onClick={() => setFilter(f)}>
                {f.charAt(0).toUpperCase() + f.slice(1)} ({f === "all" ? todos.length : f === "active" ? active : done})
              </button>
            ))}
          </div>
          {done > 0 && <button type="button" className="btn-clear" onClick={() => setTodos(todos.filter((t) => !t.completed))}>Clear Completed</button>}
        </div>

        <div className="todo-list">
          {list.length === 0 ? (
            <div className="empty-message">
              <p>No {filter !== "all" ? filter : ""} tasks found.</p>
              <p style={{ marginTop: 6, fontSize: 12, color: "#64748b" }}>Add a task above or click Quick Add (+ running, + sleep, + eat).</p>
            </div>
          ) : (
            list.map((t, i) => (
              <div key={t.id} className={`todo-card ${t.completed ? "is-done" : "is-active"}`}>
                <span className="todo-number">{i + 1})</span>
                <input type="checkbox" className="todo-checkbox" checked={t.completed} onChange={() => toggle(t.id)} id={`t-${t.id}`} />
                <label htmlFor={`t-${t.id}`} className={`todo-text ${t.completed ? "struck" : ""}`}>{t.text}</label>
                <span className={`status-badge ${t.completed ? "badge-completed" : "badge-active"}`}>{t.completed ? "Completed" : "Active"}</span>
                <button type="button" className="btn-delete" onClick={() => del(t.id)}>✕</button>
              </div>
            ))
          )}
        </div>

        {todos.length > 0 && (
          <footer className="todo-footer">
            <button type="button" className="btn-reset" onClick={() => setTodos([])}>Clear All Tasks</button>
          </footer>
        )}
      </div>
    </div>
  );
}
