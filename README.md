# CardNexus Web MVP

A production-minded MVP foundation for a card collection platform (Pokémon, sports cards, and similar collectibles).

This rebuild converts the default starter into a modular, API-first codebase designed to scale into the long-term PRD vision: recognition, valuation, collaboration, and marketplace workflows.

## Product Context (from PRD/HLD)
The platform direction is to combine:
- **Collection management**
- **Card recognition (CV services)**
- **Market valuation**
- **Shared/social workflows**
- **AI-supported insights**

In this repo, the web MVP now includes:
- A clean **domain layer** (`src/domain`)
- **Repository abstraction** for persistence (`src/repositories`)
- **Service orchestration pipeline** for card processing (`src/services`)
- **Typed API routes** (`src/app/api`)
- A focused web UI to exercise the flow end-to-end (`src/app`, `src/components`)

## Architecture Principles Used in This Rebuild
1. **Separation of concerns**
   - Domain contracts are independent of framework details.
2. **Replaceable infrastructure**
   - In-memory repository and mock services can be swapped with Supabase/Postgres + real CV/pricing providers.
3. **API-first boundary**
   - Frontend uses route handlers as stable interfaces.
4. **Scale-ready service orchestration**
   - `CardProcessingPipeline` provides a single place to add async jobs, retries, and queue integrations later.
5. **Typed error handling and observability**
   - Shared error classes and structured logging for maintainability.

## Current Feature Flow
1. Create a card from image URL (`POST /api/cards`)
2. Trigger pipeline processing (`POST /api/cards/:id/process`)
3. Pipeline executes:
   - recognition stage
   - pricing stage
   - state update in repository
4. Read all cards (`GET /api/cards`)

## Project Structure

```text
src/
  app/
    api/
      cards/
        route.ts
        [id]/process/route.ts
    layout.tsx
    page.tsx
  components/
    CardWorkspace.tsx
  config/
    env.ts
  domain/
    card.ts
    errors.ts
  lib/
    logger.ts
    supabaseClient.ts
  repositories/
    CardRepository.ts
  services/
    container.ts
    pipeline/CardProcessingPipeline.ts
    pricing/PricingService.ts
    recognition/CardRecognitionService.ts
```

## Getting Started

### Prerequisites
- Node.js 20+
- npm

### Install
```bash
npm install
```

### Run locally
```bash
npm run dev
```

### Quality checks
```bash
npm run lint
npm run build
```

## Scale-Up Roadmap (next implementation steps)
1. Replace `InMemoryCardRepository` with Supabase/Postgres-backed repository.
2. Introduce async workers (BullMQ/SQS) and move pipeline execution off request path.
3. Add auth + multi-tenant collection ownership.
4. Add external pricing provider adapters (eBay/TCGPlayer).
5. Add durable eventing + audit logs for marketplace workflows.
6. Add test pyramid:
   - unit tests for domain/services
   - integration tests for API routes
   - contract tests for provider adapters

## Notes
- The previous README referenced `/docs/PRD.docx` and `/docs/HLD_Architecture.docx`; those files are not currently present in this repository. Add them to keep architecture decisions traceable in version control.
