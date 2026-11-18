# Case Study 9: Full-Stack React TODO Application

> **Course / Practical 9**: Create a TODO application in React with necessary components and deploy it live on GitHub Pages for easy sharing.

---

## 🎯 Case Study Requirements & Implementation Checklist

| Requirement | Implementation Detail | Status |
| :--- | :--- | :---: |
| **Add new tasks** | Input field with keyboard Enter submission, priority level, categories, due time, and quick preset chips (`running`, `eat`, `sleep`) | ✅ Complete |
| **Mark tasks as completed / uncompleted** | Custom animated checkbox, strikethrough animation, Web Audio harmonic chime, confetti burst, and active/completed status tags | ✅ Complete |
| **Delete tasks** | Individual delete action with soft acoustic feedback + bulk "Clear Completed" action | ✅ Complete |
| **View all tasks in a clean interface** | Responsive Bento Grid layout, All/Active/Completed filter tabs, search bar, and Circadian Rhythm view | ✅ Complete |
| **Deploy live on GitHub Pages** | Configured `base: "./"` in `vite.config.js` + automated GitHub Actions CI/CD workflow | ✅ Complete |
| **Unique Innovations** | Circadian daily matrix, Zen Pomodoro timer, procedural Web Audio synthesizer, gamified XP, dark neo-glassmorphism | ✅ Complete |

---

## 🌟 Unique Architectural Highlights

1. **Pre-Seeded Core Checklist**:
   - `1) running` — Morning 5km trail sprint & endurance pacing (Fitness • 07:00 AM)
   - `2) eat` — Balanced whole-food lunch & hydration (Nutrition • 01:00 PM)
   - `3) sleep` — 8 hours of restorative deep sleep (Wellness • 10:30 PM)
   - Dedicated **"Reset Defaults"** button in navbar to restore these 3 goals anytime.

2. **Circadian Rhythm Matrix**:
   - Dual-view switcher between **Checklist View** and **Rhythm Timeline** grouping tasks by time of day:
     - 🌅 Morning (06:00 - 12:00)
     - ☀️ Afternoon (12:00 - 17:00)
     - 🌆 Evening (17:00 - 21:00)
     - 🌙 Night (21:00 - 05:00)

3. **Audio & Visual Sensory Feedback**:
   - **Zero-Dependency Web Audio API**: Procedural harmonic notes (E5/B5) synthesized mathematically in the browser — no audio file downloads or bandwidth required.
   - **HTML5 Canvas Particle Confetti**: Lightweight celebration burst upon conquering goals.

4. **Zen Focus / Pomodoro Mode**:
   - Launch an immersive focus countdown timer (5m, 15m, 25m, 45m) on any active goal to boost productivity.

---

## 🌐 How to Deploy to GitHub Pages

### Method 1: Automated Deployment via GitHub Actions (Recommended)

1. **Initialize Git & Push to GitHub**:
   ```powershell
   # If deploying just the program9 directory as its own repository:
   cd program9
   git init
   git add .
   git commit -m "feat: complete Case Study 9 Todo application"
   git branch -M main
   git remote add origin https://github.com/<YOUR-GITHUB-USERNAME>/<YOUR-REPO-NAME>.git
   git push -u origin main
   ```

2. **Enable GitHub Pages on your GitHub repository**:
   - Open your repository on GitHub.
   - Navigate to **Settings** ➔ **Pages**.
   - Under **Build and deployment** ➔ **Source**, select **GitHub Actions**.
   - The included workflow file ([.github/workflows/deploy.yml](file:///d:/C_fullstack/program9/.github/workflows/deploy.yml)) will automatically trigger, build the project, and publish your site at:
     ```
     https://<YOUR-GITHUB-USERNAME>.github.io/<YOUR-REPO-NAME>/
     ```

### Method 2: Manual Upload of Built Assets (`dist/`)
Because `vite.config.js` is built with `base: "./"`, the files inside [dist](file:///d:/C_fullstack/program9/dist) are 100% self-contained and can be uploaded directly to GitHub Pages or any static host (e.g. Vercel, Netlify) with zero configuration.

---

## 💻 Local Development

```powershell
# Navigate into the folder
cd program9

# Start local dev server
npm run dev
```

Visit: `http://localhost:3001`
