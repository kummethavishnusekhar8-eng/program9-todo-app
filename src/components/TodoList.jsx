import React from "react";
import TodoItem from "./TodoItem";
import { Sparkles, CheckCircle2, RotateCcw, Plus, Inbox } from "lucide-react";

export default function TodoList({
  todos,
  searchTerm,
  filter,
  onToggle,
  onDelete,
  onUpdate,
  onMoveUp,
  onMoveDown,
  onResetDefaults,
  onStartFocus
}) {
  if (todos.length === 0) {
    return (
      <div className="empty-state-card">
        <div className="empty-icon-wrap">
          <Inbox size={42} className="empty-icon" />
        </div>
        <h3 className="empty-title">
          {searchTerm
            ? `No tasks matching "${searchTerm}"`
            : filter === "active"
            ? "No active tasks! You've cleared the deck."
            : filter === "completed"
            ? "No completed tasks yet. Time to conquer the first goal!"
            : "Your checklist is clear."}
        </h3>
        <p className="empty-subtitle">
          {filter === "completed"
            ? "Check off tasks from your Active list to see them completed here."
            : "Add a new task above or reset to the default full-stack checklist (running, sleep, eat)."}
        </p>

        <div className="empty-actions">
          <button
            type="button"
            className="btn-empty-reset"
            onClick={onResetDefaults}
          >
            <RotateCcw size={15} />
            <span>Restore Default Checklist (running, sleep, eat)</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="todo-list-container">
      <div className="list-meta-header">
        <span className="list-count-indicator">
          Showing <strong>{todos.length}</strong> {filter} task{todos.length === 1 ? "" : "s"}
        </span>
        <span className="list-tip">
          💡 Double-click any item or click ✏️ to edit inline • Press Space on checkbox
        </span>
      </div>

      <div className="todo-cards-stack">
        {todos.map((todo, index) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            index={index}
            searchTerm={searchTerm}
            onToggle={onToggle}
            onDelete={onDelete}
            onUpdate={onUpdate}
            onMoveUp={onMoveUp}
            onMoveDown={onMoveDown}
            isFirst={index === 0}
            isLast={index === todos.length - 1}
            onStartFocus={onStartFocus}
          />
        ))}
      </div>
    </section>
  );
}
