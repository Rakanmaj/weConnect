# WeConnect — Frontend Prototype

High-fidelity, presentation-quality frontend prototype for **WeConnect**, an AI-powered developer talent development and hiring platform.

> **Don't interview potential. See it working.**

## Quick Start

```bash
cd weconnect
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Prototype Access

| Portal | URL | Notes |
|--------|-----|-------|
| **Public site** | `/` | Landing, About, Pricing, FAQ, etc. |
| **Login** | `/login` | Quick links to all portals |
| **Developer** | `/developer/dashboard` | Ahmad Ali mock user |
| **Company** | `/company/dashboard` | TechFlow Solutions |
| **Admin** | `/admin/login` → `/admin/dashboard` | Platform admin |

## Key Routes for Figma Capture

### Public
- `/` — Landing page
- `/how-it-works`, `/developers`, `/companies`, `/pricing`
- `/login`, `/register`, `/register/developer`, `/register/company`

### Developer Journey
- `/developer/onboarding?step=1` through `?step=9`
- `/developer/verification?status=pending|verified|more-info|rejected`
- `/developer/assessment?view=intro|exam`
- `/developer/assessment/processing`, `/developer/assessment/results`
- `/developer/dashboard`, `/developer/projects`, `/developer/portfolio`
- `/developer/challenges/react?view=path|challenge|result`
- `/developer/verified`, `/developer/career`

### Company Journey
- `/company/verification?status=pending|verified`
- `/company/projects/new?step=1` through `?step=10`
- `/company/projects/proj-csm-dashboard/matches` — AI Top 4 Matches
- `/company/projects/proj-csm-dashboard/compare` — Submission comparison
- `/company/projects/proj-csm-dashboard/evaluation` — Final evaluation
- `/company/hiring`, `/company/talent`

### Admin
- `/admin/developer-verification`, `/admin/company-verification`
- `/admin/reports`, `/admin/dashboard`

## Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **Framer Motion**, **Recharts**, **Lucide Icons**
- **Radix UI** primitives

## Design System

- **Primary Navy:** `#0D1B3D`
- **Primary Blue:** `#2563EB`
- **Teal:** `#14B8A6`
- **Surface:** `#F5F7FA`
- **Font:** Geist Sans

## Mock Data

Consistent mock users and projects throughout:
- **Ahmad Ali** — Full-Stack Developer, Level 3 Proficient, WeConnect Verified
- **Customer Support Management Dashboard** — Example paid project
- **Top matches:** Ahmad 94%, Sara 91%, Omar 88%, Lina 85%

## Build

```bash
npm run build
npm start
```
