# Aura Gym — Premium Performance & Recovery Platform

A high-performance, motion-led fitness sanctuary website and booking platform built with **Next.js (App Router)**, an **Express.js API**, and **Supabase (PostgreSQL)**.

---

## 🏛️ Project Architecture

```
AuraGym/
├── aura-gym-web/             # Next.js 14 App Router Frontend (TypeScript + Tailwind)
│   ├── app/
│   │   ├── layout.tsx        # Root layout (Lenis smooth scroll, Navbar, Footer, AuthProvider)
│   │   ├── page.tsx          # Home page (3D hero, pinned manifesto, programs, stats, trainers, pricing, CTA)
│   │   ├── about/            # Brand story, core values, facility zones
│   │   ├── programs/         # Filterable disciplines grid, duration/capacity tags, detail modal
│   │   ├── trainers/         # Elite coaches, hover effects, specialty tags, slide-over bio drawer
│   │   ├── membership/       # 3 plan tiers, monthly/annual toggle, comparison matrix, FAQ accordion
│   │   ├── contact/          # 1-day pass lead capture form, SweetAlert confirmation, map & hours
│   │   ├── signin/           # Split layout with ambient visual, JWT login
│   │   ├── signup/           # Split layout, tier pre-selection, bcrypt account creation
│   │   └── dashboard/        # Protected member dashboard, active plan, live class booking & cancellation
│   ├── components/
│   │   ├── layout/           # Navbar, Footer, SmoothScroll (Lenis)
│   │   ├── motion/           # Reveal, Counter, Stagger
│   │   ├── sections/         # Hero, Manifesto, Programs, Stats, Trainers, Pricing, CTA
│   │   ├── three/            # HeroScene (React Three Fiber kinetic dumbbell & reactive mouse core)
│   │   └── ui/               # Button, Card, Modal, Accordion, Input
│   ├── lib/                  # api client, auth provider & context, SweetAlert themes
│   └── middleware.ts         # Edge route protection for /dashboard
│
├── aura-gym-api/             # Express.js Backend API (TypeScript / NodeNext)
│   ├── src/
│   │   ├── server.ts         # Express server with Helmet, CORS, Cookie-Parser, Rate Limiting
│   │   ├── controllers/      # auth, plans, classes, bookings, leads
│   │   ├── middleware/       # JWT auth verification, Zod schema validation, error handler
│   │   ├── routes/           # /api/auth, /api/plans, /api/classes, /api/bookings, /api/leads
│   │   └── lib/              # Supabase client + in-memory store fallback, JWT sign/verify
│   ├── .env.example
│   └── tsconfig.json
│
└── supabase/
    ├── schema.sql            # PostgreSQL table schema with RLS and indexing
    └── seed.sql              # Initial 3 plans (Essential, Black Tier, Private Athlete) and sample classes
```

---

## 🎨 Design System Tokens

| Token | Hex | Role |
| :--- | :--- | :--- |
| `aura-black` | `#0B0B0D` | Canvas & page background |
| `aura-graphite`| `#17171B` | Cards, navigation, and section backgrounds |
| `aura-bone` | `#F4F1EA` | Primary typography & highlights |
| `aura-mist` | `#9A9AA3` | Secondary text, borders, and metadata |
| `aura-ember` | `#FF5A1F` | Accent buttons, active highlights, glow effects (<= 10%) |
| `aura-glow` | `#FFB38A` | Atmospheric lighting & soft gradients |

* **Typography**: Space Grotesk (Headings), Inter (Body & Data).
* **Motion**: Easing `cubic-bezier(0.22, 1, 0.36, 1)`, Lenis smooth scrolling, Three.js / R3F mouse-reactive 3D kinetic object with reduced-motion fallback.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```
## Live Link : [https://aura-gym-teal.vercel.app/]
### 2. Configure Environment Variables (Optional)
The backend includes a zero-config fallback store for instant local development. To connect your live Supabase instance:
Copy `aura-gym-api/.env.example` to `aura-gym-api/.env` and supply:
```env
PORT=5000
NODE_ENV=development
CLIENT_URL=(https://aura-gym-teal.vercel.app/)
JWT_SECRET=your_jwt_secret_here
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your_supabase_service_role_key
```

Run `supabase/schema.sql` and `supabase/seed.sql` in the Supabase SQL Editor.

### 3. Run Development Servers
Start both the Next.js frontend (`:3000`) and Express API (`:5000`) concurrently:
```bash
npm run dev
```

Or start them individually:
```bash
npm run dev:web   # Starts Next.js frontend at http://localhost:3000
npm run dev:api   # Starts Express API at http://localhost:5000
```

### 4. Build for Production
```bash
npm run build
```
