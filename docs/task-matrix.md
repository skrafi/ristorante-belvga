# Task Matrix — Ristorante Pescheria Belvga

## Agent Summary: 5 agents, no waves needed

| Agent | Domain | Pages / Endpoints | Complexity |
|-------|--------|------------------|-----------|
| component-agent | UI library | All base components | M |
| fe-agent-1 | Public pages | Home, Menu, Gallery, About, Contact | L |
| fe-agent-2 | Reservation | Reserve page + confirmation | M |
| be-agent-1 | Core API | Reservations API (3 endpoints) | M |
| integration | — | Merge + E2E | M |

---

## Agent Waves

| Wave | Agents | Starts when |
|------|--------|-------------|
| 1 | component-agent, be-agent-1 | Phase 04 begins |
| 2 | fe-agent-1, fe-agent-2 | Wave 1 PRs merged to develop |

---

## Component Agent

| Agent | Branch | Task | Complexity | Status |
|-------|--------|------|-----------|--------|
| component-agent | feat/components | src/components/ui/** | M | pending |

**Deliverables:**
- Button (primary, secondary, ghost, accent variants)
- Input (text, email, phone, textarea)
- Card (default, interactive, featured)
- Badge/Tag
- Modal/Lightbox
- Toast
- Skeleton
- Tabs
- DatePicker (custom or wrapper)
- LanguageSwitcher
- Navigation (Header, Footer, MobileMenu)

**File Ownership:**
- src/components/ui/** — component-agent owns
- src/styles/globals.css — component-agent owns
- tailwind.config.ts — component-agent owns
- src/lib/utils.ts — component-agent owns

---

## FE Agents

### fe-agent-1 — Public Pages

| Agent | Branch | Pages | File Ownership | Blocks | Blocked By | Complexity | Status |
|-------|--------|-------|---------------|--------|-----------|-----------|--------|
| fe-agent-1 | feat/fe-public | Home, Menu, Gallery, About, Contact | src/app/{lang}/, src/components/layout/**, src/components/home/**, src/components/menu/**, src/components/gallery/** | — | component-agent | L | pending |

**Pages:**
1. `/{lang}` — Home
2. `/{lang}/menu` — Menu
3. `/{lang}/gallery` — Gallery
4. `/{lang}/about` — About
5. `/{lang}/contact` — Contact
6. `/{lang}/privacy` — Privacy Policy
7. `/404`, `/500` — Error pages

### fe-agent-2 — Reservation Flow

| Agent | Branch | Pages | File Ownership | Blocks | Blocked By | Complexity | Status |
|-------|--------|-------|---------------|--------|-----------|-----------|--------|
| fe-agent-2 | feat/fe-reserve | Reserve, Confirmation | src/app/{lang}/reserve/**, src/components/reserve/** | — | component-agent, be-agent-1 | M | pending |

**Pages:**
1. `/{lang}/reserve` — Reservation form
2. `/{lang}/reserve/confirmation` — Confirmation page

**API Dependencies:**
- GET /api/v1/availability
- POST /api/v1/reservations
- GET /api/v1/reservations/[id]

---

## BE Agents

### be-agent-1 — Reservations API

| Agent | Branch | Module | File Ownership | Complexity | Status |
|-------|--------|--------|---------------|-----------|--------|
| be-agent-1 | feat/be-reservations | Reservations | src/app/api/v1/**, prisma/**, src/lib/prisma.ts, src/lib/email.ts | M | pending |

**Endpoints:**
1. GET /api/v1/availability
2. POST /api/v1/reservations
3. GET /api/v1/reservations/[id]

**File Ownership:**
- src/app/api/v1/** — be-agent-1 owns
- prisma/schema.prisma — be-agent-1 owns
- prisma/seed.ts — be-agent-1 owns
- src/lib/prisma.ts — be-agent-1 owns
- src/lib/email.ts — be-agent-1 owns
- src/lib/rate-limit.ts — be-agent-1 owns

---

## Shared Files — Ownership

| File | Owner | Rule |
|------|-------|------|
| src/app/layout.tsx | fe-agent-1 | Others do not modify |
| src/app/[lang]/layout.tsx | fe-agent-1 | Others do not modify |
| src/styles/globals.css | component-agent | Others do not modify |
| tailwind.config.ts | component-agent | Others do not modify |
| prisma/schema.prisma | be-agent-1 | Schema changes → escalate to OpenClaw |
| src/lib/utils.ts | component-agent | Others do not modify |
| messages/*.json | fe-agent-1 | fe-agent-2 can add keys |
| next.config.ts | fe-agent-1 | Changes via OpenClaw |
| package.json | fe-agent-1 | Changes via OpenClaw |

---

## Dependency Graph

| Agent | Blocks | Blocked By |
|-------|--------|-----------|
| component-agent | fe-agent-1, fe-agent-2 | — |
| be-agent-1 | fe-agent-2, integration | — |
| fe-agent-1 | integration | component-agent |
| fe-agent-2 | integration | component-agent, be-agent-1 |
| integration | — | all feat/* PRs open |

**No circular dependencies.** ✅

---

## Integration Agent

| Agent | Branch | Enters After | Tasks |
|-------|--------|-------------|-------|
| integration | feat/integration | all feat/* PRs open | merge, verify contracts, E2E, i18n verification |

**Tasks:**
1. Verify FE↔BE contract compliance
2. Document discrepancies in reports/integration-discrepancies.md
3. Verify all // MOCK: comments replaced
4. Squash merge feat/* → develop in dependency order
5. npm run build must pass
6. Set up E2E tests for:
   - Browse and Reserve flow
   - Language switching
   - Gallery lightbox
7. Verify i18n completeness (EN, FR, DE)

---

## Spawn Commands

```bash
# Wave 1
claude --dangerously-skip-permissions --add-dir ./ristorante-belvga < agents/component-agent/agent-prompt.md
claude --dangerously-skip-permissions --add-dir ./ristorante-belvga < agents/be-agent-1/agent-prompt.md

# Wait for Wave 1 PRs to merge

# Wave 2
claude --dangerously-skip-permissions --add-dir ./ristorante-belvga < agents/fe-agent-1/agent-prompt.md
claude --dangerously-skip-permissions --add-dir ./ristorante-belvga < agents/fe-agent-2/agent-prompt.md

# Wait for all feat/* PRs

# Integration
claude --dangerously-skip-permissions --add-dir ./ristorante-belvga < agents/integration/agent-prompt.md
```

---

## E2E Test Coverage

| Flow | Test File | Coverage |
|------|-----------|----------|
| Browse and Reserve | e2e/reserve.spec.ts | Happy path, form validation, no availability |
| Language Switch | e2e/i18n.spec.ts | All 3 languages, URL updates |
| Gallery | e2e/gallery.spec.ts | Lightbox open/close, navigation |
| Menu | e2e/menu.spec.ts | Tab navigation, content display |
| Contact | e2e/contact.spec.ts | Click-to-call, map link |
