import React from "react";
import { CheckCircle2, Clock, Zap, Target, Sparkles, TrendingUp } from "lucide-react";

export default function StatsOverview({ todos, activeCount, completedCount }) {
  const totalCount = todos.length;
  const completionPercentage = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);
  const karmaPoints = completedCount * 120 + 50;

  // Determine motivational status based on completion %
  let statusBadge = "Ready to Begin";
  let statusColor = "var(--text-muted)";
  if (completionPercentage === 100 && totalCount > 0) {
    statusBadge = "All Done! Mastery Achieved 🏆";
    statusColor = "var(--emerald-400)";
  } else if (completionPercentage >= 66) {
    statusBadge = "Unstoppable Momentum 🔥";
    statusColor = "var(--cyan-400)";
  } else if (completionPercentage > 0) {
    statusBadge = "In The Flow ⚡";
    statusColor = "var(--amber-400)";
  }

  // SVG circular progress parameters
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (completionPercentage / 100) * circumference;

  return (
    <section className="stats-bento-grid">
      {/* Circular Progress Hero Card */}
      <div className="bento-card progress-hero-card">
        <div className="progress-ring-wrapper">
          <svg className="progress-ring-svg" width="96" height="96" viewBox="0 0 96 96">
            <circle
              className="progress-ring-bg"
              cx="48"
              cy="48"
              r={radius}
              strokeWidth="8"
            />
            <circle
              className="progress-ring-fill"
              cx="48"
              cy="48"
              r={radius}
              strokeWidth="8"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          </svg>
          <div className="progress-center-text">
            <span className="progress-pct-val">{completionPercentage}%</span>
            <span className="progress-pct-lbl">DONE</span>
          </div>
        </div>

        <div className="progress-info">
          <div className="status-pill" style={{ borderColor: statusColor, color: statusColor }}>
            <Sparkles size={13} />
            <span>{statusBadge}</span>
          </div>
          <h3 className="progress-heading">
            {completedCount} of {totalCount} Goals Conquered
          </h3>
          <p className="progress-sub">
            {activeCount === 0 && totalCount > 0
              ? "All checklist items completed! Outstanding discipline."
              : `${activeCount} task${activeCount === 1 ? "" : "s"} remaining in today's rhythm cycle.`}
          </p>
        </div>
      </div>

      {/* KPI Card 1: Total Tasks */}
      <div className="bento-card kpi-card">
        <div className="kpi-header">
          <span className="kpi-label">TOTAL CHECKLIST</span>
          <div className="kpi-icon-pill icon-indigo">
            <Target size={16} />
          </div>
        </div>
        <div className="kpi-value-row">
          <span className="kpi-number">{totalCount}</span>
          <span className="kpi-tag">Items</span>
        </div>
        <span className="kpi-footnote">Catalogued today</span>
      </div>

      {/* KPI Card 2: Active Tasks */}
      <div className="bento-card kpi-card">
        <div className="kpi-header">
          <span className="kpi-label">ACTIVE (PENDING)</span>
          <div className="kpi-icon-pill icon-cyan">
            <Clock size={16} />
          </div>
        </div>
        <div className="kpi-value-row">
          <span className="kpi-number text-cyan">{activeCount}</span>
          <span className="kpi-tag tag-cyan">Action Required</span>
        </div>
        <span className="kpi-footnote">Awaiting completion</span>
      </div>

      {/* KPI Card 3: Completed Tasks */}
      <div className="bento-card kpi-card">
        <div className="kpi-header">
          <span className="kpi-label">COMPLETED</span>
          <div className="kpi-icon-pill icon-emerald">
            <CheckCircle2 size={16} />
          </div>
        </div>
        <div className="kpi-value-row">
          <span className="kpi-number text-emerald">{completedCount}</span>
          <span className="kpi-tag tag-emerald">Checked Off</span>
        </div>
        <span className="kpi-footnote">Conquered tasks</span>
      </div>

      {/* KPI Card 4: Energy & XP */}
      <div className="bento-card kpi-card">
        <div className="kpi-header">
          <span className="kpi-label">DAILY KARMA / XP</span>
          <div className="kpi-icon-pill icon-amber">
            <Zap size={16} />
          </div>
        </div>
        <div className="kpi-value-row">
          <span className="kpi-number text-amber">{karmaPoints}</span>
          <span className="kpi-tag tag-amber">Level {Math.max(1, Math.floor(karmaPoints / 200))}</span>
        </div>
        <span className="kpi-footnote">+120 XP per completed task</span>
      </div>
    </section>
  );
}
