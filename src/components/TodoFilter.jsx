import React from "react";
import {
  ListChecks,
  CheckCircle2,
  Clock,
  Trash2,
  Calendar,
  Layers,
  ArrowUpDown,
  Sparkles,
  Zap
} from "lucide-react";

export default function TodoFilter({
  filter,
  setFilter,
  categoryFilter,
  setCategoryFilter,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
  activeCount,
  completedCount,
  totalCount,
  onClearCompleted,
  onToggleAll
}) {
  return (
    <div className="filter-panel-card">
      <div className="filter-top-row">
        {/* Main Status Filter Tabs: All, Active, Completed */}
        <div className="status-tabs-pillbox" role="tablist">
          <button
            role="tab"
            aria-selected={filter === "all"}
            className={`status-tab ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            <ListChecks size={15} />
            <span>All Tasks</span>
            <span className="tab-count-badge">{totalCount}</span>
          </button>

          <button
            role="tab"
            aria-selected={filter === "active"}
            className={`status-tab tab-active-filter ${filter === "active" ? "active" : ""}`}
            onClick={() => setFilter("active")}
          >
            <Clock size={15} />
            <span>Active</span>
            <span className="tab-count-badge badge-active">{activeCount}</span>
          </button>

          <button
            role="tab"
            aria-selected={filter === "completed"}
            className={`status-tab tab-completed-filter ${filter === "completed" ? "active" : ""}`}
            onClick={() => setFilter("completed")}
          >
            <CheckCircle2 size={15} />
            <span>Completed</span>
            <span className="tab-count-badge badge-completed">{completedCount}</span>
          </button>
        </div>

        {/* View Switcher: Checklist vs Rhythm Timeline */}
        <div className="view-mode-pillbox">
          <button
            className={`view-mode-btn ${viewMode === "checklist" ? "active" : ""}`}
            onClick={() => setViewMode("checklist")}
            title="Standard Checkbox List View"
          >
            <Layers size={14} />
            <span>Checklist</span>
          </button>

          <button
            className={`view-mode-btn ${viewMode === "timeline" ? "active" : ""}`}
            onClick={() => setViewMode("timeline")}
            title="Circadian Daily Rhythm Timeline (Morning, Afternoon, Night)"
          >
            <Calendar size={14} />
            <span>Rhythm Timeline</span>
          </button>
        </div>
      </div>

      {/* Secondary filter & sorting controls bar */}
      <div className="filter-secondary-row">
        <div className="filter-group-left">
          {/* Category Filter */}
          <div className="control-inline">
            <span className="control-label">Category:</span>
            <select
              className="inline-select"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="Fitness">Fitness 🏃</option>
              <option value="Nutrition">Nutrition 🥑</option>
              <option value="Wellness">Wellness 💤</option>
              <option value="Focus">Focus 💻</option>
              <option value="Personal">Personal 🎯</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="control-inline">
            <span className="control-label">Sort:</span>
            <select
              className="inline-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="manual">Custom / Default</option>
              <option value="priority">Priority (High → Low)</option>
              <option value="time">Circadian Time (Morning → Night)</option>
              <option value="title">Title (A → Z)</option>
            </select>
          </div>
        </div>

        <div className="filter-group-right">
          {/* Toggle All Active/Completed */}
          <button
            type="button"
            className="btn-filter-action"
            onClick={onToggleAll}
            title={activeCount > 0 ? "Mark all as completed" : "Mark all as active"}
          >
            <Sparkles size={14} />
            <span>{activeCount > 0 ? "Check All" : "Uncheck All"}</span>
          </button>

          {/* Clear Completed */}
          {completedCount > 0 && (
            <button
              type="button"
              className="btn-filter-action btn-danger-subtle"
              onClick={onClearCompleted}
              title={`Remove ${completedCount} completed task${completedCount === 1 ? "" : "s"}`}
            >
              <Trash2 size={14} />
              <span>Clear Completed ({completedCount})</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
