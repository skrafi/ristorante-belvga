# Agent Prompt — Backend Agent 1 | Project: Ristorante Pescheria Belvga
# Branch: feat/be-reservations

## STEP 0 — ORIENTATION (MANDATORY BEFORE ANY CODE)
Read in order:
1. docs/api-contracts.md — all 3 endpoints
2. docs/user-flows.md — Browse and Reserve flow
3. docs/data-model.md
4. docs/tech-stack.md
5. docs/environments.md

After reading, output:
- "CONFIRMED: I have read all 5 input documents."
- Your endpoints (method + path, each)
- Your Prisma models (list)
- Contract ambiguities (list, or "none")

If api-contracts.md is missing a contract for any endpoint in your task:
DO NOT infer or implement. Write to agents/be-agent-1/escalations.md and await resolution.

## Role
You implement the Reservations backend for Ristorante Pescheria Belvga:
  - GET /api/v1/availability
  - POST /api/v1/reservations
  - GET /api/v1/reservations/[id]

You DO NOT modify:
  src/app/**                      ← except src/app/api/v1/ your routes
  src/components/**
  Any files outside your ownership

## Project Context
- **Name:** Ristorante Pescheria Belvga
- **Type:** Restaurant website with reservation system
- **Auth:** None (guest bookings only)
- **Database:** PostgreSQL + Prisma
- **Email:** Resend for confirmations

## Your Endpoints

### GET /api/v1/availability
**Description:** Check available time slots for a given date and guest count
**Query params:** date (YYYY-MM-DD), guests (1-20)
**Response 200:**
```json
{
  "date": "2026-03-07",
  "guests": 4,
  "availableSlots": ["12:00", "12:30", "18:00", "18:30", "19:00"],
  "message": null
}
```
**Errors:** 400 INVALID_DATE, 400 PAST_DATE, 400 INVALID_GUESTS, 400 CLOSED

### POST /api/v1/reservations
**Description:** Create a new reservation
**Request body:**
```json
{
  "date": "2026-03-07",
  "time": "19:30",
  "guests": 4,
  "name": "Jean-Pierre Müller",
  "email": "jp.muller@example.com",
  "phone": "+41 79 123 45 67",
  "notes": "Anniversary dinner",
  "language": "fr"
}
```
**Response 201:**
```json
{
  "id": "clx1234567890",
  "confirmationCode": "BEL-K7M3P",
  "date": "2026-03-07",
  "time": "19:30",
  "guests": 4,
  "name": "Jean-Pierre Müller",
  "status": "PENDING"
}
```
**Errors:** 400 INVALID_DATE, 400 INVALID_TIME, 400 SLOT_UNAVAILABLE, 422 VALIDATION_ERROR, 429 RATE_LIMITED

### GET /api/v1/reservations/[id]
**Description:** Get reservation details by ID
**Response 200:**
```json
{
  "id": "clx1234567890",
  "confirmationCode": "BEL-K7M3P",
  "date": "2026-03-07",
  "time": "19:30",
  "guests": 4,
  "name": "Jean-Pierre Müller",
  "status": "PENDING",
  "createdAt": "2026-03-05T12:30:00Z"
}
```
**Errors:** 404 NOT_FOUND

## Implementation Standards

### Route Handler Pattern
```ts
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { ApiError } from '@/lib/api-error'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const validated = schema.parse(body)
    // ... business logic
    return NextResponse.json({ data: result }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        error: 'VALIDATION_ERROR',
        fields: error.flatten().fieldErrors
      }, { status: 422 })
    }
    if (error instanceof ApiError) {
      return NextResponse.json({ error: error.code }, { status: error.status })
    }
    console.error(`[POST /api/v1/reservations]`, error)
    return NextResponse.json({ error: 'INTERNAL_ERROR' }, { status: 500 })
  }
}
```

### Business Rules

**Availability Logic:**
- Restaurant capacity: 100 guests per service (simplified for v1)
- Time slots: 12:00, 12:30, 13:00, 13:30 (lunch), 18:00, 18:30, 19:00, 19:30, 20:00, 20:30, 21:00 (dinner)
- Closed: Mondays
- Same-day reservations: Available until 2 hours before slot

**Confirmation Code:**
- Format: `BEL-XXXXX` where X is alphanumeric
- Generate using: `BEL-${nanoid(5).toUpperCase()}`

### Email Integration
After successful reservation creation:
1. Send confirmation email to guest (using Resend)
2. Send notification email to restaurant
3. Email template in guest's selected language

Create src/lib/email.ts with:
```ts
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendReservationConfirmation(data: ReservationEmailData) {
  // Implementation
}
```

### Database Standards
- DB indexes: date, status fields
- Seed data: 10+ sample reservations with various states

### Rate Limiting
Create src/lib/rate-limit.ts:
- POST /api/v1/reservations: 5 requests per minute per IP
- GET /api/v1/availability: 30 requests per minute per IP

## Output File Tree
```
src/
  app/api/v1/
    availability/route.ts
    reservations/
      route.ts
      [id]/route.ts
  lib/
    prisma.ts
    api-error.ts
    rate-limit.ts
    email.ts
prisma/
  schema.prisma
  migrations/
  seed.ts
src/__tests__/api/
  reservations.test.ts
```

## Prisma Schema
```prisma
model Reservation {
  id              String   @id @default(cuid())
  confirmationCode String  @unique
  date            DateTime
  time            String
  guests          Int
  name            String
  email           String
  phone           String
  notes           String?
  status          ReservationStatus @default(PENDING)
  language        String   @default("en")
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  @@index([date])
  @@index([status])
}

enum ReservationStatus {
  PENDING
  CONFIRMED
  CANCELLED
  COMPLETED
}
```

## Definition of Done (MECHANICALLY VERIFIABLE)
- [ ] npx tsc --noEmit — zero errors
- [ ] npx prisma migrate dev — applies without errors
- [ ] npx prisma db seed — completes without errors
- [ ] npm run test -- --testPathPattern=api/reservations — all pass
- [ ] Every documented error code has a test case
- [ ] npm audit --audit-level moderate — no new vulnerabilities
- [ ] grep -rn "passwordHash\|secret" src/app/api/ — verify none in responses
- [ ] npx commitlint --last — passes
- [ ] Append to agents/events.log: "[timestamp] be-agent-1 COMPLETED feat/be-reservations"
- [ ] PR opened, base: develop

## Escalation → agents/be-agent-1/escalations.md
Escalate when:
  - Contract ambiguous or contradictory
  - Business rule has undocumented edge case
  - Security concern not addressed in spec

Format: [ISO8601] BLOCKING|NON-BLOCKING / Issue / Options / Recommendation

## Git
Branch: feat/be-reservations | Commits: feat(api): [endpoint] — [description]
