# CLAUDE.md — Expense Tracker PWA

## Project Summary
A single-file PWA expense tracker for personal daily use.
Mobile-first. Installable on Android via Chrome.
No backend. No auth. localStorage only.

## Output Format
- Single `index.html` — all CSS and JS inline, no external files
  except CDN links
- Tailwind CSS via CDN: `<script src="https://cdn.tailwindcss.com"></script>`
- PWA requires: <link rel="manifest"> pointing to inline
  manifest JSON blob, and an inline service worker registered
  via blob URL — keep everything in one file

## Reference UI
- Dark background: #0D0D0D
- Card surfaces: #1A1A1A
- Primary accent: #00E5A0 (mint green)
- All cards: border-radius 20px+, subtle border #2A2A2A
- Large bold typography for amounts (₹ currency)
- Bottom navigation bar (4 tabs: Home, Add, Budget, Export)

## Features — v1 Scope
1. Home: today's total, this month's total, recent expense list
2. Add Expense: large number input + category picker + optional
   note → save in under 5 seconds
3. Budget: per-category monthly limit with progress bar
   (orange ≥80%, red >100%)
4. Export: download all data as CSV

## Categories
Food, Transport, College, Entertainment, Health, Other

## Data
- All data in localStorage key: `vt_expenses`
- Budget limits in localStorage key: `vt_budgets`
- JSON format, no external DB

## Anti-Generic Guardrails
- Never use default Tailwind palette (indigo, blue, etc.)
  — use #00E5A0 as primary and derive from it
- Never use flat shadows — use color-tinted with low opacity
- Never use the same font for amounts and labels
- Every clickable element: hover, focus-visible, active states
- Animate only transform and opacity — never transition-all
- Surfaces must have depth: base → card → floating layers

## Constraints — Hard Rules
- Do NOT add features beyond v1 scope without asking
- Do NOT split into multiple files
- Do NOT introduce a backend or external storage
- Do NOT use any JS framework (no React, no Vue)
- Vanilla JS only
- Keep the add-expense flow under 3 taps from home screen