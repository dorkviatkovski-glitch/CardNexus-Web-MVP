# Sprint 1 Implementation Notes

## What was implemented

- End-to-end authenticated product flow from login/signup to collection dashboard.
- Card add workflow connected to backend `POST /collection/cards`.
- Collection value summary powered by dedicated pricing abstraction (`PricingProvider`, `MockPricingProvider`, `PricingService`).
- Marketplace listings, shared collections, and profile screens with corresponding API routes.
- Backend module separation in `apps/api/src/modules/*` with `controller`, `service`, `dto`, and `types` files.
- Prisma schema covering required entities and relationships.
- Seed blueprint documenting baseline records for development/testing.
- Shared domain types moved into `packages/types` and reused in API and frontend.

## Architecture decisions

1. **Backend modularization with Next route adapters**
   - Domain services/controllers live under `apps/api/src/modules`.
   - HTTP routes are exposed via Next App Router API endpoints under `src/app/api`.
   - Keeps module boundaries clean while allowing one runtime for Sprint 1.

2. **Pricing abstraction extracted from collection domain**
   - Collection module never hardcodes pricing values.
   - Collection valuation delegates to pricing module for card-level and collection-level calculations.

3. **Auth as replaceable mock**
   - Browser stores token in localStorage (`cardnexus_token`) for routing behavior.
   - Service returns a simple base64 payload token shape, enabling later JWT migration.

4. **Shared type package for cross-layer consistency**
   - `@cardnexus/types` is used by backend and frontend interfaces where practical.

## Assumptions

- Sprint 1 prioritizes workflow completeness and architecture shape over hardened security.
- In-memory DB (`mockDb`) is acceptable for this sprint to unblock product integration.
- Next.js API routes are sufficient as delivery surface while preserving backend module boundaries for future extraction.

## Remaining gaps

- Real JWT auth + password hashing + refresh token flows.
- Persistent database integration using Prisma Client and migrations.
- Authorization middleware and role checks for shared collection membership APIs.
- Input validation (zod/class-validator) and centralized error handling.
- Unit/integration/e2e tests.
- Observability (request tracing, structured logs, metrics).

## Next sprint recommendations

1. Wire Prisma client into module services and replace in-memory collections.
2. Add auth middleware with bearer token parsing and route protection on API layer.
3. Introduce optimistic UI + loading/error states for all frontend data fetches.
4. Add listing creation UX and shared member management UX.
5. Add automated tests for pricing math, card ingestion, and auth/session flow.

## Changed files

- `README.md`
- `docs/implementation_notes.md`
- `tsconfig.json`
- `packages/types/src/index.ts`
- `apps/api/prisma/schema.prisma`
- `apps/api/prisma/seed.ts`
- `apps/api/src/data/mockDb.ts`
- `apps/api/src/modules/auth/{controller.ts,service.ts,dto.ts,types.ts}`
- `apps/api/src/modules/users/{controller.ts,service.ts,dto.ts,types.ts}`
- `apps/api/src/modules/collection/{controller.ts,service.ts,dto.ts,types.ts}`
- `apps/api/src/modules/marketplace/{controller.ts,service.ts,dto.ts,types.ts}`
- `apps/api/src/modules/shared/{controller.ts,service.ts,dto.ts,types.ts}`
- `apps/api/src/modules/pricing/{controller.ts,service.ts,dto.ts,types.ts}`
- `apps/api/src/modules/profile/{controller.ts,service.ts,dto.ts,types.ts}`
- `apps/web/src/app/README.md`
- `apps/web/src/app/login/page.tsx`
- `apps/web/src/app/signup/page.tsx`
- `apps/web/src/app/collection/page.tsx`
- `apps/web/src/app/collection/add-card/page.tsx`
- `apps/web/src/app/marketplace/page.tsx`
- `apps/web/src/app/shared/page.tsx`
- `apps/web/src/app/profile/page.tsx`
- `src/components/{AuthGuard.tsx,BottomNav.tsx}`
- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/app/globals.css`
- `src/app/login/page.tsx`
- `src/app/signup/page.tsx`
- `src/app/collection/page.tsx`
- `src/app/collection/add-card/page.tsx`
- `src/app/marketplace/page.tsx`
- `src/app/shared/page.tsx`
- `src/app/profile/page.tsx`
- `src/app/api/auth/signup/route.ts`
- `src/app/api/auth/login/route.ts`
- `src/app/api/collection/route.ts`
- `src/app/api/collection/cards/route.ts`
- `src/app/api/collection/value/route.ts`
- `src/app/api/marketplace/listings/route.ts`
- `src/app/api/shared/collections/route.ts`
- `src/app/api/shared/collections/[id]/members/route.ts`
- `src/app/api/profile/route.ts`
