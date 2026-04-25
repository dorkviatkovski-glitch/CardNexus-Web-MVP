# CardNexus

> Professional portfolio management platform for trading card collectors. Think "Robinhood for Pokémon cards."

[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8)](https://tailwindcss.com)
[![Supabase](https://img.shields.io/badge/Supabase-Auth_&_DB-3ecf8e)](https://supabase.com)

---

## What is CardNexus?

CardNexus is a **financial portfolio manager for collectible cards** — Pokémon, sports cards, Magic: The Gathering, and more.

Instead of treating your collection like a photo gallery, CardNexus treats it like an **investment portfolio**:
- Real-time valuation and market trends
- Price comparison before selling
- Shared collections for families and groups
- Admin analytics and user management

---

## Live Demo

🔗 **https://cardnexus-web-mvp.vercel.app**

---

## Features

### 🔐 Authentication
- Email/password authentication via Supabase Auth
- Google OAuth sign-in/sign-up
- Protected routes with middleware
- Row-Level Security (RLS) on all tables

### 📊 Collection Dashboard
- Portfolio value overview (total value, card count, growth)
- Asset cards with condition badges and purchase price tracking
- Add cards with detailed metadata (set, number, rarity, condition)

### 💰 Price Comparison + Marketplace
- **Mock price engine** — deterministic market pricing per card
- Sell cards directly from collection with price comparison modal
- View market avg / min / max / trend before listing
- Recommended listing price (market avg + premium)
- Active marketplace with real listings
- My Listings management in Profile (withdraw active listings)

### 👑 Admin Panel (`/admin`)
- Dashboard with system metrics (users, collections, cards, shared access)
- User management table with roles
- Shared collections overview
- Content editor and system configuration

### 🔒 Security
- `is_admin` role-based access control
- Admin routes protected at middleware level
- All database operations use RLS policies

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 16 (App Router, Server Components) |
| **Language** | TypeScript (strict mode) |
| **Styling** | Tailwind CSS v4 |
| **Database** | PostgreSQL via Supabase |
| **ORM** | Prisma |
| **Auth** | Supabase Auth (Email + Google OAuth) |
| **Deployment** | Vercel |
| **State** | Server Actions + Server Components (zero client state libraries) |

---

## Project Structure

```
cardnexus-web-mvp/
├── prisma/
│   └── schema.prisma           # Database schema
├── src/
│   ├── app/
│   │   ├── (routes)/           # App Router pages
│   │   │   ├── collection/     # Portfolio dashboard
│   │   │   ├── marketplace/    # Active listings
│   │   │   ├── profile/        # Account + My Listings
│   │   │   ├── login/          # Auth pages
│   │   │   ├── signup/
│   │   │   └── admin/          # Admin panel
│   │   ├── api/
│   │   │   └── auth/callback/  # OAuth callback handler
│   │   └── layout.tsx          # Root layout
│   ├── components/
│   │   ├── AssetCard.tsx       # Collection card component
│   │   ├── BottomNav.tsx       # Mobile navigation
│   │   ├── DashboardStats.tsx  # Portfolio stats widget
│   │   └── PriceComparisonModal.tsx  # Sell modal
│   ├── lib/
│   │   ├── actions/            # Server Actions (auth, collections, marketplace)
│   │   ├── pricing/            # Mock price comparison service
│   │   ├── supabase.ts         # Server-side Supabase client
│   │   └── supabaseClient.ts   # Browser Supabase client
│   └── middleware.ts           # Auth + Admin protection
├── supabase-schema.sql         # Initial DB schema
├── supabase-schema-marketplace.sql  # Marketplace schema
└── .env.local                  # Environment variables
```

---

## Getting Started

### Prerequisites
- Node.js 20+
- npm or pnpm
- Supabase project (free tier works)

### 1. Clone & Install

```bash
git clone https://github.com/dorkviatkovski-glitch/CardNexus-Web-MVP.git
cd CardNexus-Web-MVP
npm install
```

### 2. Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Database Setup

Run the SQL files in Supabase SQL Editor (in order):

1. `supabase-schema.sql` — Core tables (Profile, Collection, CollectionItem, etc.)
2. `supabase-schema-admin.sql` — Admin flag and policies
3. `supabase-schema-marketplace.sql` — Listing table and price comparison fields

### 4. Set Admin User

After signing up, run this SQL to make yourself admin:

```sql
UPDATE "Profile" SET is_admin = TRUE WHERE user_id = 'YOUR_USER_ID';
```

### 5. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npx prisma generate` | Regenerate Prisma client |

---

## Architecture Decisions

### Why Server Components by Default?
- Zero client-side JavaScript for read-heavy pages
- Direct database access without API layer
- Automatic caching and revalidation

### Why Server Actions?
- No need for API routes for mutations
- Type-safe form submissions
- Progressive enhancement (forms work without JS)

### Why Mock Pricing?
- Real pricing APIs (eBay, TCGPlayer) require approval and quotas
- Mock service provides deterministic, instant feedback for demos
- Easy to swap with real API later (same interface)

---

## Roadmap

| Feature | Status |
|---------|--------|
| ✅ Auth (Email + Google) | Done |
| ✅ Collection Dashboard | Done |
| ✅ Add Cards | Done |
| ✅ Admin Panel | Done |
| ✅ Marketplace + Price Comparison | Done |
| 🔄 Real Pricing API (eBay/TCGPlayer) | Next |
| 🔄 AI Card Recognition (Gemini Vision) | Planned |
| 🔄 Notifications | Planned |
| 🔄 Batch Import | Planned |
| 🔄 Public Profile Pages | Planned |

---

## License

MIT

---

> **Built with the Ralph Loop** — autonomous AI-driven development workflow.
