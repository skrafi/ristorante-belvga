# Data Model — Ristorante Pescheria Belvga

## Entities

| Entity | Key Fields | Relationships | Notes |
|--------|-----------|--------------|-------|
| Reservation | id, date, time, guests, name, email, phone, notes, status, confirmationCode, createdAt | none | Guest bookings only, no user accounts |

## Entity Details

### Reservation

```prisma
model Reservation {
  id              String   @id @default(cuid())
  confirmationCode String  @unique // Human-readable: BEL-XXXXX
  date            DateTime
  time            String   // HH:mm format
  guests          Int
  name            String
  email           String
  phone           String
  notes           String?
  status          ReservationStatus @default(PENDING)
  language        String   @default("en") // For email localization
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}

enum ReservationStatus {
  PENDING      // Awaiting restaurant confirmation
  CONFIRMED    // Restaurant confirmed
  CANCELLED    // Cancelled by guest or restaurant
  COMPLETED    // Dining completed
}
```

## Business Rules

### Availability Logic
- Restaurant has 15 tables total (simplified for v1)
- Table capacities: 5×2-person, 6×4-person, 4×6-person
- A reservation is "available" if:
  - Total guests for that time slot < restaurant capacity
  - OR: specific table assignment logic (v1.1)
- Time slots: Every 30 minutes during opening hours
  - Lunch: 12:00, 12:30, 13:00, 13:30
  - Dinner: 18:00, 18:30, 19:00, 19:30, 20:00, 20:30, 21:00
- Same-day reservations: Available until 2 hours before slot

### Reservation Flow
1. Guest selects date, time, guests
2. System checks availability (max 100 guests per service)
3. Guest fills form
4. System creates reservation with status=PENDING
5. System sends confirmation email to guest
6. System sends notification email to restaurant
7. Restaurant confirms (manual process, outside system for v1)

### Confirmation Code
- Format: `BEL-XXXXX` where X is alphanumeric
- Example: `BEL-A3F7K`
- Generated on reservation creation

## Notes for FE Agents

- No user accounts — all reservations are guest bookings
- Email/phone are required for every reservation
- `date` is stored as DateTime but only the date portion matters
- `time` is stored as string "HH:mm" for simplicity
- `notes` is optional — dietary requirements, special occasions, etc.
- `language` is captured to send localized confirmation emails

## API Data Shapes

### Availability Request
```typescript
interface AvailabilityRequest {
  date: string;      // YYYY-MM-DD
  guests: number;    // 1-20
}
```

### Availability Response
```typescript
interface AvailabilityResponse {
  date: string;
  guests: number;
  availableSlots: string[];  // ["12:00", "12:30", "18:00", ...]
  message?: string;          // "Fully booked" or "Limited availability"
}
```

### Reservation Request
```typescript
interface ReservationRequest {
  date: string;      // YYYY-MM-DD
  time: string;      // HH:mm
  guests: number;    // 1-20
  name: string;
  email: string;
  phone: string;
  notes?: string;
  language: string;  // "en" | "fr" | "de"
}
```

### Reservation Response
```typescript
interface ReservationResponse {
  id: string;
  confirmationCode: string;
  date: string;
  time: string;
  guests: number;
  name: string;
  status: string;
}
```
