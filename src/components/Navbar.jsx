import React from "react";
import {
  CheckCircle2,
  Search,
  Volume2,
  VolumeX,
  Sun,
  Moon,
  RotateCcw,
  Printer,
  Sparkles,
  Flame,
  Layers
} from "lucide-react";

export default function Navbar({
  searchTerm,
  setSearchTerm,
  soundEnabled,
  setSoundEnabled,
  theme,
  setTheme,
  onResetDefaults,
  onOpenExport,
  activeCount,
  completedCount,
  streakDays
}) {
  return (
    <header className="header-glass">
      <div className="header-container">
        {/* Brand identity */}
        <div className="brand-group">
          <div className="brand-logo-wrapper">
            <div className="logo-glow"></div>
            <div className="logo-badge">
              <CheckCircle2 className="logo-icon" size={22} />
            </div>
          </div>
          <div>
            <div className="brand-title-row">
              <span className="brand-title">Aura<span className="brand-gradient">Task</span></span>
              <span className="version-pill">v2.0 • Program 9</span>
            </div>
            <p className="brand-subtitle">Smart Circadian Rhythm & Checklist Suite</p>
          </div>
        </div>

        {/* Live Search bar with keyboard shortcut */}
        <div className="search-wrapper">
          <Search className="search-icon" size={16} />
          <input
            type="text"
            className="search-input"
            placeholder="Search tasks, categories, tags... (Press / to focus)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            id="global-search-input"
          />
          {searchTerm && (
            <button
              className="search-clear-btn"
              onClick={() => setSearchTerm("")}
              title="Clear search"
            >
              ✕
            </button>
          )}
          <span className="search-kbd">/</span>
        </div>

        {/* Quick controls & actions */}
        <div className="header-actions">
          {/* Streak badge */}
          <div className="streak-pill" title={`${streakDays}-Day Consistent Daily Flow Streak`}>
            <Flame className="streak-icon" size={16} />
            <span>{streakDays}d Streak</span>
          </div>

          {/* Sound toggle */}
          <button
            className={`action-icon-btn ${soundEnabled ? "active" : ""}`}
            onClick={() => setSoundEnabled(!soundEnabled)}
            title={soundEnabled ? "Audio FX: ON (Click to mute)" : "Audio FX: MUTED (Click to unmute)"}
            aria-label="Toggle Sound"
          >
            {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>

          {/* Theme switcher */}
          <button
            className="action-icon-btn"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Cyber Mode"}
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Print & Export */}
          <button
            className="action-pill-btn"
            onClick={onOpenExport}
            title="Export or Print Checklist"
          >
            <Printer size={16} />
            <span className="btn-text-responsive">Export / Print</span>
          </button>

          {/* Reset to Default ("running, sleep, eat") */}
          <button
            className="action-ghost-btn"
            onClick={onResetDefaults}
            title="Reset to default items: 1) running, 2) sleep, 3) eat"
          >
            <RotateCcw size={15} />
            <span className="btn-text-responsive">Reset Defaults</span>
          </button>
        </div>
      </div>
    </header>
  );
}
