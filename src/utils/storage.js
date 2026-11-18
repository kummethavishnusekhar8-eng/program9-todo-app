// LocalStorage management and initial seeding

export const INITIAL_TODOS = [
  {
    id: "todo-1",
    title: "running",
    description: "Morning 5 km endurance session & outdoor cardio sprint",
    completed: false,
    priority: "high", // high, medium, low
    category: "Fitness", // Fitness, Nutrition, Wellness, Focus, Personal
    dueTime: "07:00 AM",
    timeBlock: "Morning",
    createdAt: Date.now() - 1000 * 60 * 60 * 4,
    notes: "Stretch for 5 mins before start. Target pace 5:15 min/km."
  },
  {
    id: "todo-2",
    title: "eat",
    description: "Balanced whole-food lunch with high protein and hydration",
    completed: false,
    priority: "medium",
    category: "Nutrition",
    dueTime: "01:00 PM",
    timeBlock: "Afternoon",
    createdAt: Date.now() - 1000 * 60 * 60 * 2,
    notes: "Grilled chicken or tofu bowl with leafy greens & avocado."
  },
  {
    id: "todo-3",
    title: "sleep",
    description: "8 hours of restorative deep sleep (screens off at 10 PM)",
    completed: true,
    priority: "high",
    category: "Wellness",
    dueTime: "10:30 PM",
    timeBlock: "Night",
    createdAt: Date.now() - 1000 * 60 * 60 * 8,
    notes: "Keep bedroom cool, read 15 minutes before lights out."
  }
];

const STORAGE_KEY = "auratask_todos_v1";
const THEME_KEY = "auratask_theme_v1";
const SOUND_KEY = "auratask_sound_v1";

export function loadTodos() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_TODOS;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return INITIAL_TODOS;
  } catch (err) {
    console.error("Failed to load todos from localStorage:", err);
    return INITIAL_TODOS;
  }
}

export function saveTodos(todos) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch (err) {
    console.error("Failed to save todos to localStorage:", err);
  }
}

export function resetToDefaults() {
  saveTodos(INITIAL_TODOS);
  return INITIAL_TODOS;
}

export function loadTheme() {
  try {
    return localStorage.getItem(THEME_KEY) || "dark";
  } catch {
    return "dark";
  }
}

export function saveTheme(theme) {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {}
}

export function loadSoundSetting() {
  try {
    const s = localStorage.getItem(SOUND_KEY);
    return s === null ? true : s === "true";
  } catch {
    return true;
  }
}

export function saveSoundSetting(val) {
  try {
    localStorage.setItem(SOUND_KEY, String(val));
  } catch {}
}
