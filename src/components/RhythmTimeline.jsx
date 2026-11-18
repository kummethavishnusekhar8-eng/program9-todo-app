import React from "react";
import { Sunrise, Sun, Sunset, Moon, CheckCircle2, Clock, Check } from "lucide-react";

export default function RhythmTimeline({ todos, onToggle }) {
  const blocks = [
    {
      id: "Morning",
      label: "Morning Cycle",
      sub: "06:00 AM - 12:00 PM • Peak Physical Energy & Cardio",
      icon: <Sunrise size={20} className="text-amber-400" />,
      colorClass: "block-morning",
      primaryFocus: "running & sunrise conditioning"
    },
    {
      id: "Afternoon",
      label: "Afternoon Fuel",
      sub: "12:00 PM - 05:00 PM • Nutrition & Metabolic Replenishment",
      icon: <Sun size={20} className="text-orange-400" />,
      colorClass: "block-afternoon",
      primaryFocus: "eat whole foods & hydrate"
    },
    {
      id: "Evening",
      label: "Evening Wind Down",
      sub: "05:00 PM - 09:00 PM • Low Light & Mental Transition",
      icon: <Sunset size={20} className="text-pink-400" />,
      colorClass: "block-evening",
      primaryFocus: "stretching & evening decompression"
    },
    {
      id: "Night",
      label: "Night Cellular Recovery",
      sub: "09:00 PM - 06:00 AM • Deep Sleep, Melatonin & Rest",
      icon: <Moon size={20} className="text-indigo-400" />,
      colorClass: "block-night",
      primaryFocus: "sleep 8 hours deep rest"
    }
  ];

  return (
    <div className="rhythm-timeline-container">
      <div className="timeline-header-dossier">
        <h3 className="timeline-heading">Circadian Rhythm & Habit Matrix</h3>
        <p className="timeline-subheading">
          Visualizing your daily lifestyle flow: <strong>running</strong> at dawn, <strong>eat</strong> for sustenance at noon, and restorative <strong>sleep</strong> at night.
        </p>
      </div>

      <div className="timeline-track-grid">
        {blocks.map((b) => {
          const blockTodos = todos.filter((t) => (t.timeBlock || "Morning") === b.id);
          const completedInBlock = blockTodos.filter((t) => t.completed).length;

          return (
            <div key={b.id} className={`timeline-block-card ${b.colorClass}`}>
              <div className="block-card-header">
                <div className="block-icon-badge">{b.icon}</div>
                <div className="block-title-group">
                  <h4 className="block-name">{b.label}</h4>
                  <span className="block-hours">{b.sub}</span>
                </div>
                <div className="block-count-badge">
                  {completedInBlock}/{blockTodos.length} Done
                </div>
              </div>

              <div className="block-focus-callout">
                <span className="focus-lbl">Rhythm Theme:</span> {b.primaryFocus}
              </div>

              <div className="block-items-list">
                {blockTodos.length === 0 ? (
                  <div className="block-empty-hint">No scheduled tasks for this block.</div>
                ) : (
                  blockTodos.map((todo) => (
                    <div
                      key={todo.id}
                      className={`timeline-item-row ${todo.completed ? "done" : "pending"}`}
                    >
                      <button
                        type="button"
                        className={`timeline-checkbox-btn ${todo.completed ? "checked" : ""}`}
                        onClick={() => onToggle(todo.id, todo.completed)}
                        title={todo.completed ? "Mark active" : "Mark completed"}
                      >
                        {todo.completed && <Check size={12} />}
                      </button>

                      <div className="timeline-item-details">
                        <span className={`timeline-item-title ${todo.completed ? "struck" : ""}`}>
                          {todo.title}
                        </span>
                        {todo.dueTime && (
                          <span className="timeline-item-time">{todo.dueTime}</span>
                        )}
                      </div>

                      <span className={`timeline-status-badge ${todo.completed ? "badge-done" : "badge-wait"}`}>
                        {todo.completed ? "Completed" : "Active"}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
