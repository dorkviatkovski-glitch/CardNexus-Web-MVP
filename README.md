# CardNexus Web + API Foundation (Sprint 1)

CardNexus now includes a working end-to-end foundation for authentication, collection management, valuation, marketplace listings, shared collections, and profile views.

## Implemented Product Flow

1. **Signup / Login** (`/signup`, `/login`)
2. **Redirect into Collection Dashboard** (`/collection`)
3. **Add Card** (`/collection/add-card`)
4. **View Collection Value** (`/collection`, powered by PricingService)
5. **Navigate Core Tabs** (`Collection`, `Marketplace`, `Shared`, `Profile`)

## Repository Structure

- `src/app/*`: Active Next.js web routes and API endpoints.
- `src/components/*`: Auth guard and bottom navigation shell.
- `apps/api/src/modules/*`: Modular backend domain layers (`controller`, `service`, `dto`, `types`).
- `apps/api/prisma/*`: Prisma schema and seed blueprint.
- `packages/types/src/index.ts`: Shared cross-layer types.
- `docs/implementation_notes.md`: Sprint-level architecture + assumptions + gaps.

## API Endpoints (Sprint 1)

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/collection`
- `POST /api/collection/cards`
- `GET /api/collection/value`
- `GET /api/marketplace/listings`
- `POST /api/marketplace/listings`
- `GET /api/shared/collections`
- `POST /api/shared/collections`
- `POST /api/shared/collections/:id/members`
- `GET /api/profile`

## Local Development

```bash
npm install
npm run dev
```

Then open `http://localhost:3000/login`.

## Notes

- Sprint 1 uses mock token/session handling in the browser (`localStorage`) and in-memory backend state.
- The backend modular layout is designed so production auth, Prisma persistence, and external pricing providers can be swapped in without route redesign.
