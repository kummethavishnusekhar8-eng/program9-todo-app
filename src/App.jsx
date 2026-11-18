import React, { useState, useEffect, useMemo } from "react";
import { Navbar, StatsOverview, TodoInput, TodoFilter, TodoList, RhythmTimeline, FocusModal, ExportModal } from "./components";
import { loadTodos, saveTodos, resetToDefaults, loadTheme, saveTheme, loadSoundSetting, saveSoundSetting } from "./utils/storage";
import { sound } from "./utils/sound";
import { triggerConfetti } from "./utils/confetti";

export default function App() {
  const [todos, setTodos] = useState(loadTodos);
  const [filter, setFilter] = useState("all"), [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("manual"), [viewMode, setViewMode] = useState("checklist");
  const [searchTerm, setSearchTerm] = useState(""), [theme, setTheme] = useState(loadTheme);
  const [soundEnabled, setSoundEnabled] = useState(loadSoundSetting);
  const [focusTodo, setFocusTodo] = useState(null), [showExportModal, setShowExportModal] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    saveTheme(theme);
    sound.enabled = soundEnabled;
    saveSoundSetting(soundEnabled);
    saveTodos(todos);
  }, [theme, soundEnabled, todos]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "/" && !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) {
        e.preventDefault();
        document.getElementById("global-search-input")?.focus();
      } else if (e.key === "Escape") { setFocusTodo(null); setShowExportModal(false); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const activeCount = todos.filter((t) => !t.completed).length;
  const completedCount = todos.length - activeCount;

  const displayedTodos = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return todos
      .filter((t) => (filter === "all" || (filter === "active" ? !t.completed : t.completed)) &&
        (categoryFilter === "all" || t.category === categoryFilter) &&
        (!q || [t.title, t.description, t.category].some((s) => (s || "").toLowerCase().includes(q))))
      .sort((a, b) => sortBy === "priority" ? ({ high: 3, medium: 2, low: 1 }[b.priority] || 0) - ({ high: 3, medium: 2, low: 1 }[a.priority] || 0) :
        sortBy === "title" ? a.title.localeCompare(b.title) :
        sortBy === "time" ? ({ Morning: 1, Afternoon: 2, Evening: 3, Night: 4 }[a.timeBlock] || 5) - ({ Morning: 1, Afternoon: 2, Evening: 3, Night: 4 }[b.timeBlock] || 5) : 0);
  }, [todos, filter, categoryFilter, searchTerm, sortBy]);

  const handleToggle = (id, cur) => {
    setTodos((p) => p.map((t) => (t.id === id ? { ...t, completed: !cur } : t)));
    if (!cur) { sound.playComplete(); triggerConfetti(0.5, 0.4); } else sound.playUncheck();
  };

  const handleReorder = (i, d) => setTodos((p) => {
    const next = [...p], t = i + d;
    if (t >= 0 && t < next.length) [next[i], next[t]] = [next[t], next[i]];
    return next;
  });

  const handleToggleAll = () => {
    const done = todos.some((t) => !t.completed);
    setTodos((p) => p.map((t) => ({ ...t, completed: done })));
    if (done) { sound.playFanfare(); triggerConfetti(0.5, 0.5); } else sound.playUncheck();
  };

  return (
    <div className="app-layout">
      <div className="ambient-mesh-glow"><div className="mesh-orb orb-1"></div><div className="mesh-orb orb-2"></div><div className="mesh-orb orb-3"></div></div>
      <Navbar
        searchTerm={searchTerm} setSearchTerm={setSearchTerm}
        soundEnabled={soundEnabled} setSoundEnabled={setSoundEnabled}
        theme={theme} setTheme={setTheme} streakDays={5}
        onResetDefaults={() => { setTodos(resetToDefaults()); sound.playAdd(); }}
        onOpenExport={() => setShowExportModal(true)}
        activeCount={activeCount} completedCount={completedCount}
      />
      <main className="main-content-wrapper">
        <div className="app-container">
          <StatsOverview todos={todos} activeCount={activeCount} completedCount={completedCount} />
          <TodoInput onAddTodo={(item) => setTodos((p) => [{ id: "todo-" + Date.now(), completed: false, createdAt: Date.now(), ...item }, ...p])} />
          <TodoFilter
            filter={filter} setFilter={setFilter} categoryFilter={categoryFilter} setCategoryFilter={setCategoryFilter}
            sortBy={sortBy} setSortBy={setSortBy} viewMode={viewMode} setViewMode={setViewMode}
            activeCount={activeCount} completedCount={completedCount} totalCount={todos.length}
            onClearCompleted={() => { sound.playDelete(); setTodos((p) => p.filter((t) => !t.completed)); }}
            onToggleAll={handleToggleAll}
          />
          {viewMode === "checklist" ? (
            <TodoList
              todos={displayedTodos} searchTerm={searchTerm} filter={filter}
              onToggle={handleToggle} onDelete={(id) => { sound.playDelete(); setTodos((p) => p.filter((t) => t.id !== id)); }}
              onUpdate={(id, upd) => setTodos((p) => p.map((t) => (t.id === id ? { ...t, ...upd } : t)))}
              onMoveUp={(i) => handleReorder(i, -1)} onMoveDown={(i) => handleReorder(i, 1)}
              onResetDefaults={() => { setTodos(resetToDefaults()); sound.playAdd(); }}
              onStartFocus={setFocusTodo}
            />
          ) : (
            <RhythmTimeline todos={todos} onToggle={handleToggle} />
          )}
        </div>
      </main>
      {focusTodo && (
        <FocusModal
          todo={focusTodo} onClose={() => setFocusTodo(null)}
          onCompleteTask={(id) => setTodos((p) => p.map((t) => (t.id === id ? { ...t, completed: true } : t)))}
        />
      )}
      {showExportModal && <ExportModal todos={todos} onClose={() => setShowExportModal(false)} />}
      <footer className="footer-bar">
        <div className="footer-content">
          <p>© 2026 AuraTask • Program 9 Full-Stack Lab Record Suite</p>
          <div className="footer-tags">
            <span className="footer-pill">Checklist 1) Running</span><span className="footer-pill">Sleep</span><span className="footer-pill">Eat</span><span className="footer-pill">Active & Completed</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
