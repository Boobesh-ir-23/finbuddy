# 💰 FinBuddy

A fast, installable expense tracker PWA for daily personal use. Mobile-first, dark, and
zero-friction — log an expense in under 5 seconds, right from your phone's home screen.

**No backend. No accounts. No tracking.** All data lives on your device (`localStorage` + an
IndexedDB mirror for background features).

> Built as a single `index.html` (inline CSS + vanilla JS), Chart.js for analytics.
> PWA via `manifest.json` + `sw.js`. Hosted on **Netlify** via GitHub.

---

## ✨ Features

### 🏠 Home
- Browse any month with the **‹ Month Year ›** switcher — totals, lists and charts all follow it.
- Big "this month" total, plus live **Today's Spend / Transactions** for the current month.
- Expense list **grouped by day** (Today, Yesterday, etc.) with inline **edit / delete**, search,
  and a "no matches" state.
- **Undo delete** — 5-second undo toast after removing an expense.
- **Wall of Shame** banner: hardcore, graduated nudges from 50% → 80% → 100% of budget.
- **Tap your name** to change it (inline modal).
- **App badge** shows today's transaction count on the icon (where supported).
- One-time onboarding tips on first launch.

### ➕ Add Expense
- Big number pad, category picker, optional note, and backdating — saved in under 3 taps.
- **Recent categories** row (top 3 from the last 30 days) above the full picker.
- **Long-press the + button** to instantly repeat your most recent expense.

### 🎯 Budget
- Per-category monthly limits with colour-coded progress bars (orange ≥ 80%, red ≥ 100%).
- **Projected month-end spend** per budgeted category.
- **Active only** toggle — hide categories with no limit and no spend.
- Add and remove your own custom categories.
- **Hardcore roast notifications** fire on every save when you're at or over budget thresholds.

### 📊 Stats
- Category **doughnut** chart with ranked breakdown, % of month, and **month-over-month delta**.
- Insights row: **Total**, **Avg / day**, **Projected month-end**, and **Top category**.
- **Budget Pace** view with a "today" marker.
- Daily-spend line chart highlighting your highest-spend day.

### ⚙️ More
- Download the selected month — or all data — as **CSV**.
- Full **JSON backup / restore** (expenses, budgets, categories, name, and monthly income).
- Gentle backup reminder when it's been a while.
- Set **monthly income** via inline modal — used for "hours of work" roasts and shame banners.

### 📲 PWA extras
- **Home screen shortcuts** (long-press icon): Add expense · Today's spend.
- **Deep links**: `?tab=add`, `?tab=home`, etc.
- **Weekly digest** notification on Sundays (background sync + fallback on app open).
- Fully **offline** after first load — no external styling dependencies.

---

## 🗂️ Categories

Food/Snacks · Groceries · Transport · Bills · Fees · Entertainment · Gym · Shopping · Recharge · Other
*(plus any custom categories you add). Retired categories are kept read-only so old expenses
still display correctly.*

---

## 🚀 Running locally

It's a static site — no build step.

```bash
# any static server works, e.g.:
python -m http.server 4173
# then open http://localhost:4173
```

Open in Chrome on Android and **"Add to Home screen"** to install it as an app.

---

## 🛠️ Tech

| | |
|---|---|
| **Markup / logic** | Single `index.html`, vanilla JS (no framework) |
| **Styling** | Inline CSS (custom design system) |
| **Charts** | Chart.js (CDN, cached offline) |
| **Storage** | `localStorage` + IndexedDB mirror (`vt_expenses`, `vt_budgets`, `finbuddy_categories`) |
| **PWA** | `manifest.json` + `sw.js` v4 (offline-capable, periodic sync for digest) |
| **Hosting** | Netlify (auto-deploys from `main` on GitHub) |

---

## 🚢 Deployment

Pushing to `main` triggers an automatic Netlify deploy.

```bash
git push origin main
```

After deploy, reopen the installed PWA so the service worker updates to v4.

---

## 🔒 Privacy

FinBuddy never sends your data anywhere — there is no server. Everything stays on your device.
Use **More → Export Backup** regularly so you don't lose your history if you clear browser data.