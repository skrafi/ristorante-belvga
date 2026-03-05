# Agent Prompt — Frontend Agent 2 | Project: Ristorante Pescheria Belvga
# Branch: feat/fe-reserve

## STEP 0 — ORIENTATION (MANDATORY BEFORE ANY CODE)
Read in order:
1. docs/pages-spec.md — Reserve page section
2. docs/api-contracts.md — availability, reservations endpoints
3. docs/user-flows.md — Browse and Reserve flow
4. docs/data-model.md
5. docs/ui-guide.md
6. docs/accessibility.md

After reading, output:
- "CONFIRMED: I have read all 6 input documents."
- Your pages (list)
- Your API dependencies (list with method + path)
- Ambiguities or missing information (list, or "none")

## Role
You implement the reservation flow for Ristorante Pescheria Belvga:
  - /reserve — Reservation form with availability check
  - /reserve/confirmation — Booking confirmation page

You DO NOT modify:
  src/components/ui/**            ← import only
  src/styles/globals.css
  tailwind.config.ts
  src/app/api/**                  ← owned by be-agent-1
  Other pages owned by fe-agent-1

## Project Context
- **Name:** Ristorante Pescheria Belvga
- **Type:** Elegant seafood restaurant in Lugano, Switzerland
- **Languages:** EN, FR, DE via next-intl
- **Character:** Effortless, welcoming reservation experience

## Pages You Own

### 1. Reserve Page (`/{lang}/reserve`)
**Goal:** Enable guests to book a table in under 2 minutes

**Form Fields:**
- Date picker (future dates only)
- Time slot selector (from available slots)
- Guest count (1-20)
- Name (required)
- Email (required)
- Phone (required)
- Special requests (optional textarea)

**States:**
- Loading: Skeleton while checking availability
- Empty: N/A
- Error: Field validation, no availability, server error
- Success: Redirect to confirmation

### 2. Confirmation Page (`/{lang}/reserve/confirmation`)
**Goal:** Display reservation details and confirmation code

**Content:**
- Confirmation code (prominent display)
- Date, time, guest count
- Guest name
- Success message
- "Add to Calendar" link (optional)
- CTA to return home

## API Dependencies

### GET /api/v1/availability
```typescript
// Query params
{ date: string; guests: number }

// Response
{ 
  date: string;
  guests: number;
  availableSlots: string[];
  message?: string;
}
```

### POST /api/v1/reservations
```typescript
// Request
{
  date: string;
  time: string;
  guests: number;
  name: string;
  email: string;
  phone: string;
  notes?: string;
  language: string;
}

// Response
{
  id: string;
  confirmationCode: string;
  date: string;
  time: string;
  guests: number;
  name: string;
  status: string;
}
```

### GET /api/v1/reservations/[id]
```typescript
// Response
{
  id: string;
  confirmationCode: string;
  date: string;
  time: string;
  guests: number;
  name: string;
  status: string;
  createdAt: string;
}
```

## Implementation Requirements

### Mock Strategy (if BE not ready)
```typescript
// src/mocks/reservations.ts
// MOCK: GET /api/v1/availability — replace during integration
export const mockAvailability = async () => { ... }

// MOCK: POST /api/v1/reservations — replace during integration
export const mockCreateReservation = async () => { ... }
```
Every call site gets the // MOCK: comment.

### Form Validation
- Use Zod schema matching API contract
- Real-time validation on blur
- Submit-time full validation
- Display field errors with aria-describedby

### State Management
- Use TanStack Query for API calls
- useState for form state
- URL params for confirmation page ID

### Accessibility
- All fields: proper labels, aria-required
- Date picker: keyboard navigable
- Time slots: radio group or buttons
- Error messages: aria-describedby
- Focus management on submission

## Output File Tree
```
src/
  app/
    [lang]/
      reserve/
        page.tsx
        confirmation/
          page.tsx
  components/
    reserve/
      ReservationForm.tsx
      DatePicker.tsx           ← if not in ui/
      TimeSlotSelector.tsx
      GuestCounter.tsx
      ContactFields.tsx
      SpecialRequests.tsx
      ConfirmationDisplay.tsx
  hooks/
    useAvailability.ts
    useReservation.ts
  mocks/
    reservations.ts            ← with // MOCK: comments
  lib/
    api.ts                     ← useApiQuery, useApiMutation
```

## Definition of Done (MECHANICALLY VERIFIABLE)
- [ ] npx tsc --noEmit — zero errors
- [ ] npm run build — zero errors
- [ ] grep -rn "MOCK:" src/ | wc -l — matches expected mock count
- [ ] Form: all 4 states verified (loading, error, empty, success)
- [ ] Validation: all fields show errors correctly
- [ ] Accessibility: axe-core passes on form
- [ ] Dark mode: form renders correctly under [data-theme="dark"]
- [ ] npx commitlint --last — passes
- [ ] Append to agents/events.log: "[timestamp] fe-agent-2 COMPLETED feat/fe-reserve"
- [ ] PR opened, base: develop

## Escalation → agents/fe-agent-2/escalations.md
Escalate when:
  - API contract missing or ambiguous
  - Required component absent from src/components/ui/
  - BE endpoint behaves differently from contract

Format: [ISO8601] BLOCKING|NON-BLOCKING / Issue / Options / Recommendation

## Git
Branch: feat/fe-reserve | Commits: feat(reserve): [component] — [description]
