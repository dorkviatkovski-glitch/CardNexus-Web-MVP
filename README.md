# Card Collection Platform

## Overview
A modern platform for collectors (Pokémon, sports cards, etc.) to manage, analyze, and trade their collections.

The system enables:
- Digital collection management
- Card scanning and valuation
- Shared collections
- Marketplace communication (chat)
- AI-driven insights and recommendations

This repository contains the MVP implementation based on the product requirements and architecture defined in /docs.

---

## Product Vision
Build the default platform for collectors worldwide by combining:
- Computer Vision (card scanning)
- Market data (pricing & trends)
- Social + trading layer
- AI-driven decision support

---

## Core Features (MVP)
- 📸 Upload and manage card collections
- 🤝 Shared collections (multiple users)
- 🔍 Card scanning + identification
- 💰 Price estimation (based on external sources like eBay)
- 💬 Buyer/Seller chat
- 📊 Collection insights & recommendations

---

## Architecture Overview
The system is built using a scalable, modular architecture:

- Frontend: Web + Mobile (React / Flutter)
- Backend: API-first (Node.js / Python)
- Database: PostgreSQL (relational data)
- Storage: Cloud object storage (images)
- AI Services:
  - Card recognition (CV model / API)
  - Pricing engine
  - Recommendation engine

For full details see:
- /docs/PRD.docx
- /docs/HLD_Architecture.docx

---

## Repository Structure
/frontend        → Web app /mobile          → Mobile app (optional MVP phase) /backend         → API & business logic /ai              → ML services (scanning, pricing, recommendations) /docs            → PRD, HLD, architecture docs

---

## Getting Started

### Prerequisites
- Node.js / Python
- Docker (recommended)
- PostgreSQL

### Installation
bash git clone <repo-url> cd card-collection-platform 

### Run Backend
bash cd backend npm install npm run dev 

### Run Frontend
bash cd frontend npm install npm start 

---

## API Design Principles
- RESTful (MVP) → future GraphQL option
- Auth via JWT
- Modular services (collections, users, pricing, chat)

---

## AI Components
- Card Scanner → image → card metadata
- Pricing Engine → aggregates market data
- Recommendation Engine → hold/sell insights

---

## Roadmap
### Phase 1 – MVP
- Collection management
- Manual + scan card input
- Basic pricing
- Chat

### Phase 2
- Advanced CV model
- Real-time market data
- Smart recommendations

### Phase 3
- Marketplace
- Auctions
- Social features

---

## Development Guidelines
- Follow modular architecture
- Keep services decoupled
- Write clean, documented APIs
- Prefer simple over complex (MVP-first mindset)

---

## Codex / AI Agent Instructions
Use /docs/PRD.docx and /docs/HLD_Architecture.docx as the source of truth.

When generating code:
1. Start from backend + DB schema
2. Implement API layer
3. Connect frontend
4. Add AI services last (mock first)

---

## Open Questions
- External pricing APIs (eBay vs others)
- CV model: build vs use API
- Real-time vs batch pricing updates

---

## License
TBD
