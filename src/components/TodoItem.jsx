import React, { useState } from "react";
import {
  Check,
  CheckCircle2,
  Trash2,
  Edit3,
  Clock,
  Flame,
  Tag,
  ChevronUp,
  ChevronDown,
  Target,
  Zap,
  Save,
  X
} from "lucide-react";

export default function TodoItem({
  todo,
  index,
  searchTerm,
  onToggle,
  onDelete,
  onUpdate,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
  onStartFocus
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDesc, setEditDesc] = useState(todo.description || "");
  const [editPriority, setEditPriority] = useState(todo.priority);
  const [editCategory, setEditCategory] = useState(todo.category);
  const [editTime, setEditTime] = useState(todo.dueTime || "");

  const handleSave = () => {
    if (!editTitle.trim()) return;
    onUpdate(todo.id, {
      title: editTitle.trim(),
      description: editDesc.trim(),
      priority: editPriority,
      category: editCategory,
      dueTime: editTime.trim()
    });
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSave();
    } else if (e.key === "Escape") {
      setIsEditing(false);
      setEditTitle(todo.title);
      setEditDesc(todo.description || "");
    }
  };

  // Highlight search term in title
  const renderHighlightedTitle = (text) => {
    if (!searchTerm) return text;
    const parts = text.split(new RegExp(`(${searchTerm})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === searchTerm.toLowerCase() ? (
        <mark key={i} className="highlight-text">{part}</mark>
      ) : (
        part
      )
    );
  };

  const getCategoryIcon = (cat) => {
    switch (cat) {
      case "Fitness": return "🏃";
      case "Nutrition": return "🥑";
      case "Wellness": return "💤";
      case "Focus": return "⚡";
      default: return "🎯";
    }
  };

  return (
    <article
      className={`todo-item-card ${todo.completed ? "is-completed" : "is-active"} priority-${todo.priority}`}
      data-id={todo.id}
    >
      {/* Reorder Up/Down arrows */}
      <div className="reorder-controls">
        <button
          className="reorder-btn"
          disabled={isFirst}
          onClick={() => onMoveUp(index)}
          title="Move up"
          aria-label="Move item up"
        >
          <ChevronUp size={14} />
        </button>
        <button
          className="reorder-btn"
          disabled={isLast}
          onClick={() => onMoveDown(index)}
          title="Move down"
          aria-label="Move item down"
        >
          <ChevronDown size={14} />
        </button>
      </div>

      {/* Checklist Numbering Pill e.g. 1), 2), 3) */}
      <div className="checklist-num-pill" title={`Checklist Item #${index + 1}`}>
        {index + 1})
      </div>

      {/* Interactive Checkbox */}
      <button
        type="button"
        className={`custom-checkbox-btn ${todo.completed ? "checked" : ""}`}
        onClick={() => onToggle(todo.id, todo.completed)}
        aria-label={todo.completed ? "Mark as active" : "Mark as completed"}
      >
        <div className="checkbox-inner">
          {todo.completed && <Check size={14} className="checkbox-check-icon" />}
        </div>
      </button>

      {/* Content Area (Normal or Inline Edit) */}
      <div className="todo-content-col">
        {isEditing ? (
          <div className="inline-edit-wrapper" onKeyDown={handleKeyDown}>
            <input
              type="text"
              className="inline-edit-input"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              autoFocus
              placeholder="Task title..."
            />
            <input
              type="text"
              className="inline-edit-desc"
              value={editDesc}
              onChange={(e) => setEditDesc(e.target.value)}
              placeholder="Add extra notes / description..."
            />
            <div className="inline-edit-meta-row">
              <select
                className="inline-edit-select"
                value={editPriority}
                onChange={(e) => setEditPriority(e.target.value)}
              >
                <option value="high">High Priority 🔥</option>
                <option value="medium">Medium Priority ⚡</option>
                <option value="low">Low Priority 💧</option>
              </select>

              <select
                className="inline-edit-select"
                value={editCategory}
                onChange={(e) => setEditCategory(e.target.value)}
              >
                <option value="Fitness">Fitness 🏃</option>
                <option value="Nutrition">Nutrition 🥑</option>
                <option value="Wellness">Wellness 💤</option>
                <option value="Focus">Focus ⚡</option>
                <option value="Personal">Personal 🎯</option>
              </select>

              <input
                type="text"
                className="inline-edit-time"
                value={editTime}
                onChange={(e) => setEditTime(e.target.value)}
                placeholder="Time (e.g. 07:00 AM)"
              />

              <div className="inline-edit-actions">
                <button
                  type="button"
                  className="btn-save-edit"
                  onClick={handleSave}
                  title="Save changes (Enter)"
                >
                  <Save size={13} /> Save
                </button>
                <button
                  type="button"
                  className="btn-cancel-edit"
                  onClick={() => setIsEditing(false)}
                  title="Cancel (Esc)"
                >
                  <X size={13} />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="todo-main-info" onDoubleClick={() => setIsEditing(true)}>
            <div className="todo-title-row">
              <h4 className={`todo-title ${todo.completed ? "completed-strike" : ""}`}>
                {renderHighlightedTitle(todo.title)}
              </h4>

              {/* Status Badge: Active vs Completed */}
              <span className={`status-tag ${todo.completed ? "status-completed" : "status-active"}`}>
                {todo.completed ? "✓ Completed" : "● Active"}
              </span>
            </div>

            {todo.description && (
              <p className={`todo-desc ${todo.completed ? "completed-strike" : ""}`}>
                {todo.description}
              </p>
            )}

            {/* Metadata Pills: Category, Priority, Due Time, Rhythm Block */}
            <div className="todo-meta-strip">
              <span className={`category-pill category-${todo.category?.toLowerCase()}`}>
                <span className="cat-emoji">{getCategoryIcon(todo.category)}</span>
                <span>{todo.category}</span>
              </span>

              <span className={`priority-pill priority-${todo.priority}`}>
                {todo.priority === "high" && <Flame size={11} />}
                {todo.priority === "medium" && <Zap size={11} />}
                {todo.priority === "low" && <Clock size={11} />}
                <span>{todo.priority}</span>
              </span>

              {todo.dueTime && (
                <span className="time-pill">
                  <Clock size={11} />
                  <span>{todo.dueTime}</span>
                  {todo.timeBlock && <span className="time-block-tag">({todo.timeBlock})</span>}
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Row Action Buttons: Focus Timer, Edit, Delete */}
      <div className="todo-actions-col">
        {!todo.completed && (
          <button
            type="button"
            className="action-btn-item btn-focus"
            onClick={() => onStartFocus(todo)}
            title="Launch Zen Focus & Pomodoro for this goal"
            aria-label="Zen Focus"
          >
            <Target size={15} />
          </button>
        )}

        <button
          type="button"
          className="action-btn-item btn-edit"
          onClick={() => setIsEditing(!isEditing)}
          title="Edit item (or double-click text)"
          aria-label="Edit item"
        >
          <Edit3 size={15} />
        </button>

        <button
          type="button"
          className="action-btn-item btn-delete"
          onClick={() => onDelete(todo.id)}
          title="Delete item"
          aria-label="Delete item"
        >
          <Trash2 size={15} />
        </button>
      </div>
    </article>
  );
}
