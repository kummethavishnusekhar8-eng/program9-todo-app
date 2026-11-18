import React, { useState } from "react";
import { Plus, Flame, Clock, Tag, Sparkles } from "lucide-react";
import { sound } from "../utils/sound";

const PRESETS = [
  { title: "running", category: "Fitness", priority: "high", time: "07:00 AM", block: "Morning", desc: "Outdoor sprint or trail cardio" },
  { title: "eat", category: "Nutrition", priority: "medium", time: "01:00 PM", block: "Afternoon", desc: "Nutrient-rich balanced meal & hydration" },
  { title: "sleep", category: "Wellness", priority: "high", time: "10:30 PM", block: "Night", desc: "8 hours deep cellular restorative rest" },
  { title: "meditate", category: "Wellness", priority: "medium", time: "06:30 AM", block: "Morning", desc: "10-min breathwork & mindfulness" },
  { title: "deep work", category: "Focus", priority: "high", time: "09:30 AM", block: "Morning", desc: "Uninterrupted 90-min engineering session" },
  { title: "hydrate", category: "Nutrition", priority: "low", time: "Every 2h", block: "All Day", desc: "Drink 500ml water with electrolytes" }
];

export default function TodoInput({ onAddTodo }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [category, setCategory] = useState("Fitness");
  const [timeBlock, setTimeBlock] = useState("Morning");
  const [dueTime, setDueTime] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanTitle = title.trim();
    if (!cleanTitle) return;

    onAddTodo({
      title: cleanTitle,
      description: description.trim() || getDefaultDesc(cleanTitle, category),
      priority,
      category,
      timeBlock,
      dueTime: dueTime.trim() || getDefaultTime(timeBlock)
    });

    sound.playAdd();
    setTitle("");
    setDescription("");
    setDueTime("");
    setShowAdvanced(false);
  };

  const handleApplyPreset = (preset) => {
    setTitle(preset.title);
    setDescription(preset.desc);
    setCategory(preset.category);
    setPriority(preset.priority);
    setDueTime(preset.time);
    setTimeBlock(preset.block);
  };

  function getDefaultDesc(t, cat) {
    if (t.toLowerCase() === "running") return "Morning cardio endurance and pacing drill";
    if (t.toLowerCase() === "sleep") return "8 hours deep restorative sleep & recovery";
    if (t.toLowerCase() === "eat") return "Nutrient-dense whole foods and hydration";
    return `${cat} priority activity`;
  }

  function getDefaultTime(block) {
    switch (block) {
      case "Morning": return "07:00 AM";
      case "Afternoon": return "01:00 PM";
      case "Evening": return "06:30 PM";
      case "Night": return "10:30 PM";
      default: return "Flexible";
    }
  }

  return (
    <section className="todo-input-card">
      <form onSubmit={handleSubmit} className="todo-form">
        <div className="input-row-main">
          <div className="input-field-glow-wrap">
            <input
              type="text"
              className="task-main-input"
              placeholder="What goal are you conquering today? (e.g. running, sleep, eat...)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoComplete="off"
            />
          </div>

          <button
            type="submit"
            className="btn-add-primary"
            disabled={!title.trim()}
          >
            <Plus size={18} />
            <span>Add Checklist Item</span>
          </button>
        </div>

        {/* Quick Suggestion Presets */}
        <div className="preset-chips-row">
          <span className="preset-lbl">
            <Sparkles size={12} /> Quick Presets:
          </span>
          {PRESETS.map((p) => (
            <button
              type="button"
              key={p.title}
              className={`preset-chip ${title.toLowerCase() === p.title ? "active" : ""}`}
              onClick={() => handleApplyPreset(p)}
            >
              {p.title === "running" && "🏃 "}
              {p.title === "eat" && "🥗 "}
              {p.title === "sleep" && "🌙 "}
              {p.title === "meditate" && "🧘 "}
              {p.title === "deep work" && "⚡ "}
              {p.title === "hydrate" && "💧 "}
              {p.title}
            </button>
          ))}
          <button
            type="button"
            className="toggle-advanced-btn"
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            {showAdvanced ? "▲ Hide Options" : "▼ More Details (Priority, Time, Notes)"}
          </button>
        </div>

        {/* Expandable Advanced options */}
        {showAdvanced && (
          <div className="advanced-options-grid">
            <div className="option-col">
              <label className="option-label">
                <Tag size={13} /> Category
              </label>
              <select
                className="option-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Fitness">Fitness 🏃</option>
                <option value="Nutrition">Nutrition 🥑</option>
                <option value="Wellness">Wellness 💤</option>
                <option value="Focus">Focus & Work 💻</option>
                <option value="Personal">Personal 🎯</option>
              </select>
            </div>

            <div className="option-col">
              <label className="option-label">
                <Flame size={13} /> Priority Level
              </label>
              <select
                className="option-select"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="high">High Priority 🔥</option>
                <option value="medium">Medium Priority ⚡</option>
                <option value="low">Low Priority 💧</option>
              </select>
            </div>

            <div className="option-col">
              <label className="option-label">
                <Clock size={13} /> Daily Time Block
              </label>
              <select
                className="option-select"
                value={timeBlock}
                onChange={(e) => setTimeBlock(e.target.value)}
              >
                <option value="Morning">Morning (06:00 - 12:00)</option>
                <option value="Afternoon">Afternoon (12:00 - 17:00)</option>
                <option value="Evening">Evening (17:00 - 21:00)</option>
                <option value="Night">Night (21:00 - 05:00)</option>
              </select>
            </div>

            <div className="option-col">
              <label className="option-label">Target Due Time</label>
              <input
                type="text"
                className="option-input"
                placeholder="e.g. 07:00 AM or 10:30 PM"
                value={dueTime}
                onChange={(e) => setDueTime(e.target.value)}
              />
            </div>

            <div className="option-col full-width">
              <label className="option-label">Notes / Instructions</label>
              <input
                type="text"
                className="option-input"
                placeholder="Optional notes or sub-steps..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
        )}
      </form>
    </section>
  );
}
