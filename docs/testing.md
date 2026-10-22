# Critical-flow regression coverage

Run `npm ci` then `npm test`. Use `npm run test:watch` while editing.
CI runs the suite, lint and production build on pushes and pull requests (Node 22).

## Smallest useful layers

| File | Protection | Boundary |
| --- | --- | --- |
| `tests/api.test.ts` | Signup/login identity, duplicate and malformed input, wrong passwords; seeded valuation, quantity math, add-card to dashboard payload; listing creation/readback, invalid price, references and ownership | Real Next route functions → controllers → services → in-memory DB; no network or controller mocks |
| `tests/pricing.test.ts` | Provider delegation, timestamp-based snapshot selection, documented fallback, provider failures | Real pricing service with deterministic injected provider |
| `tests/auth-ui.test.tsx` | All protected screens and nested add-card redirect while hiding children/nav; public routes; stored-session redirects; login/signup store API response and navigate; failed login stays unauthenticated | Real React components in jsdom, mocked Next navigation and HTTP boundary |

The DB is cloned/restored before each API/pricing test, including private password hashes. No production database, LLM, pricing network or user data is used. No snapshots or arbitrary coverage-percentage target: assertions check externally observable results and rejected writes staying atomic.

## Inconsistencies exposed and fixed

- `apps/api/src/modules/auth/service.ts` ignored passwords. Signup now stores a salted scrypt hash in a server-only mock DB credential map; login checks it. Public `User`/`AuthResponse` contracts never include the hash. The seeded account remains `collector@cardnexus.com` / `demo-password`. Emails are normalized consistently and required signup fields are validated before mutation.
- `apps/api/src/modules/marketplace/service.ts` accepted any price, dangling references and a seller who did not own the card. Validate these before inserting. `src/app/api/marketplace/listings/route.ts` now maps invalid payloads and JSON to HTTP 400.
- `src/app/api/collection/value/route.ts` returned a successful zero for an unknown ID while the collection endpoint returned 404. Both now return 404; an existing empty collection still returns zero.
- `apps/api/src/modules/pricing/service.ts` interpreted insertion order as recency. The mock provider now selects by `capturedAt`.

## Explicit remaining contracts (not proven safe by this suite)

1. **API authentication/authorization remains a blocker for non-demo use.** `AuthGuard` checks only token presence in localStorage; the base64 token is unsigned. The route handlers do not validate it. Listing ownership compares a client-supplied `sellerId`, so an attacker can impersonate the owner. Derive identity from a verified server session and authorize collection/profile/shared/listing requests. UI redirect tests are routing tests, not security tests.
2. **New-account collection isolation is not implemented.** `src/app/collection/page.tsx` and `src/app/collection/add-card/page.tsx` use the default/hardcoded `collection-1`; signup creates no personal collection. Profile has a default `user-1`. Decide and implement a session-derived collection/profile contract before calling the flow multi-user. Tests deliberately use the documented seeded portfolio rather than pretending a new user's collection is isolated.
3. **Persistence and production credentials:** hashes and all domain data are process-local and disappear on restart. Replace the DB with Prisma and align its `User.passwordHash` with the internal credential store. JWT/session expiry, revocation and refresh are outside this patch.
4. **Pricing fallback is synthetic:** absent snapshots return 15 USD; add-card seeds 35 USD. The tests preserve this demo behavior. A production contract must specify missing/failed/stale prices and currency/decimal rules. Provider failure currently propagates instead of silently returning zero.
5. **Listing creation has an API but no UI.** `src/app/marketplace/page.tsx` only reads listings. The suite tests creation through the real route and readback; it does not claim a browser listing-creation flow exists.
6. These tests call route handlers in-process, not through a running Next server. They do not cover middleware, deployment, hydration, browser storage timing or a real database. Add one browser smoke journey when server sessions and per-user collections are wired. The runtime entry point is `src/app`; `apps/web/src/app` contains forwarding exports, not a second application.

## Validation record

On the PR #7 head before fixes: 19 failed / 24 passed (43 total). After the focused fixes: 43 passed. This red-to-green check confirms the suite detects the identified regressions rather than merely restating current behavior.
