import React, { useState, useEffect } from "react";
import { X, Play, Pause, RotateCcw, CheckCircle2, Flame, Sparkles } from "lucide-react";
import { sound } from "../utils/sound";
import { triggerConfetti } from "../utils/confetti";

export default function FocusModal({ todo, onClose, onCompleteTask }) {
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [initialMinutes, setInitialMinutes] = useState(25);

  useEffect(() => {
    let timer = null;
    if (isRunning && secondsLeft > 0) {
      timer = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0 && isRunning) {
      setIsRunning(false);
      sound.playFanfare();
      triggerConfetti(0.5, 0.5);
    }
    return () => clearInterval(timer);
  }, [isRunning, secondsLeft]);

  const handleSelectMinutes = (mins) => {
    setInitialMinutes(mins);
    setSecondsLeft(mins * 60);
    setIsRunning(false);
  };

  const handleToggleTimer = () => {
    sound.init();
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setSecondsLeft(initialMinutes * 60);
  };

  const handleFinishGoal = () => {
    setIsRunning(false);
    onCompleteTask(todo.id);
    triggerConfetti(0.5, 0.5);
    sound.playComplete();
    setTimeout(() => {
      onClose();
    }, 400);
  };

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  const totalSeconds = initialMinutes * 60;
  const progressRatio = (totalSeconds - secondsLeft) / totalSeconds;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="focus-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close Focus Mode">
          <X size={18} />
        </button>

        <div className="focus-header">
          <span className="zen-badge">
            <Sparkles size={13} /> ZEN FOCUS SPRINT
          </span>
          <h2 className="focus-task-title">{todo.title}</h2>
          {todo.description && <p className="focus-task-desc">{todo.description}</p>}
        </div>

        {/* Circular Timer Visual */}
        <div className="timer-hero-wrap">
          <div className="timer-display-box">
            <span className="timer-digits">{formattedTime}</span>
            <span className="timer-status-lbl">
              {isRunning ? "Sprinting in the Zone" : secondsLeft === 0 ? "Session Conquered!" : "Ready to Start"}
            </span>
          </div>
        </div>

        {/* Minute Presets */}
        <div className="preset-minutes-strip">
          {[5, 15, 25, 45].map((m) => (
            <button
              key={m}
              className={`preset-min-btn ${initialMinutes === m ? "active" : ""}`}
              onClick={() => handleSelectMinutes(m)}
            >
              {m} Min
            </button>
          ))}
        </div>

        {/* Controls */}
        <div className="timer-actions-strip">
          <button
            className={`btn-timer-primary ${isRunning ? "btn-pause" : "btn-play"}`}
            onClick={handleToggleTimer}
          >
            {isRunning ? <Pause size={18} /> : <Play size={18} />}
            <span>{isRunning ? "Pause Sprint" : "Begin Focus"}</span>
          </button>

          <button
            className="btn-timer-secondary"
            onClick={handleReset}
            title="Reset Countdown"
          >
            <RotateCcw size={16} />
          </button>
        </div>

        {/* Instant Goal Conquered Button */}
        <div className="focus-footer-actions">
          <button
            className="btn-finish-goal"
            onClick={handleFinishGoal}
          >
            <CheckCircle2 size={16} />
            <span>Mark Goal Conquered & Claim XP</span>
          </button>
        </div>
      </div>
    </div>
  );
}
