# 💰 FinBuddy

A fast, installable expense tracker PWA for daily personal use. Mobile-first, dark, and
zero-friction — log an expense in under 5 seconds, right from your phone's home screen.

**No backend. No accounts. No tracking.** All data lives in your browser's `localStorage`.

> Built as a single `index.html` (inline CSS + vanilla JS), Tailwind via CDN, Chart.js for
> analytics. Hosted on **Netlify** via GitHub.

---

## ✨ Features

### 🏠 Home
- Browse any month with the **‹ Month Year ›** switcher — totals, lists and charts all follow it.
- Big "this month" total, plus live **Today's Spend / Transactions** for the current month.
- Full expense list for the selected month with inline **edit / delete** and search.
- **Wall of Shame** banner: a graduated, psychology-driven nudge that escalates as you approach
  a budget limit and turns into a public shaming once you blow past it.

### ➕ Add Expense
- Big number pad, category picker, optional note, and backdating — saved in under 3 taps.
- **Long-press the + button** to instantly repeat your most recent expense.

### 🎯 Budget
- Per-category monthly limits with colour-coded progress bars (orange ≥ 80%, red ≥ 100%).
- **Projected month-end spend** per budgeted category — see whether your current pace will blow
  the limit, before it actually does.
- Add and remove your own custom categories.

### 📊 Stats
- Category **doughnut** chart with a ranked breakdown: amount, % of month, and a
  **month-over-month delta** (▲ / ▼) per category.
- Insights row: **Total**, **Avg / day**, **Projected month-end**, and **Top category**.
- **Budget Pace** view with a "today" marker so you can see if you're ahead of pace.
- Daily-spend line chart highlighting your highest-spend day.

### 📤 Export
- Download the selected month — or all data — as **CSV**.
- Full **JSON backup / restore** (expenses + budgets + categories), with a gentle reminder when
  it's been a while since your last backup.
- Set your **monthly income** so budget alerts can translate spending into "hours of work."

---

## 🗂️ Categories

Food · Groceries · Transport · Bills · Fees · Entertainment · Shopping · Recharge · Other
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
| **Styling** | Inline CSS + Tailwind (CDN) |
| **Charts** | Chart.js (CDN) |
| **Storage** | `localStorage` (`vt_expenses`, `vt_budgets`, `finbuddy_categories`) |
| **PWA** | `manifest.json` + `sw.js` (offline-capable service worker) |
| **Hosting** | Netlify (auto-deploys from `main` on GitHub) |

---

## 🚢 Deployment

Pushing to `main` triggers an automatic Netlify deploy.

```bash
git push origin main
```

---

## 🔒 Privacy

FinBuddy never sends your data anywhere — there is no server. Everything stays on your device.
Use **Export → Backup** regularly so you don't lose your history if you clear browser data.
