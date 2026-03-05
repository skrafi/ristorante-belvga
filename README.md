# Ristorante Pescheria Belvga - Backend Implementation

## Overview

This is the backend implementation for the Ristorante Pescheria Belvga reservation system.

## Implemented Features

### API Endpoints

1. **GET /api/v1/availability**
   - Check available time slots for a given date and guest count
   - Query params: `date` (YYYY-MM-DD), `guests` (1-20)
   - Returns list of available slots

2. **POST /api/v1/reservations**
   - Create a new reservation
   - Body: date, time, guests, name, email, phone, notes, language
   - Rate limited: 5 requests per minute per IP
   - Sends confirmation email to guest and notification to restaurant

3. **GET /api/v1/reservations/[id]**
   - Get reservation details by ID
   - Returns reservation information including confirmation code

### Technical Implementation

- **Database**: PostgreSQL with Prisma ORM
- **Validation**: Zod schemas for all inputs
- **Rate Limiting**: In-memory rate limiter for API endpoints
- **Email**: Resend integration for confirmation emails
- **Security**: Security headers configured in Next.js

### Project Structure

```
src/
  app/api/v1/
    availability/route.ts     # GET availability endpoint
    reservations/
      route.ts               # POST reservations endpoint
      [id]/route.ts          # GET reservation by ID
  lib/
    prisma.ts                # Prisma client singleton
    api-error.ts             # Custom error classes
    rate-limit.ts            # Rate limiting utility
    email.ts                 # Email service (Resend)
    validation.ts            # Zod validation schemas
    reservation-utils.ts     # Business logic utilities
prisma/
  schema.prisma              # Database schema
  seed.ts                    # Seed data script
```

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

Required variables:
- `DATABASE_URL`: PostgreSQL connection string
- `RESEND_API_KEY`: Resend API key for emails

### 3. Initialize Database

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Seed with sample data
npx prisma db seed
```

### 4. Run Development Server

```bash
npm run dev
```

The API will be available at `http://localhost:3000`

## API Testing

Test the endpoints with curl or your preferred API client:

### Check Availability

```bash
curl "http://localhost:3000/api/v1/availability?date=2026-03-07&guests=4"
```

### Create Reservation

```bash
curl -X POST http://localhost:3000/api/v1/reservations \
  -H "Content-Type: application/json" \
  -d '{
    "date": "2026-03-07",
    "time": "19:30",
    "guests": 4,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+41 79 123 45 67",
    "notes": "Anniversary dinner",
    "language": "en"
  }'
```

### Get Reservation

```bash
curl http://localhost:3000/api/v1/reservations/[reservation-id]
```

## Business Rules

- Restaurant capacity: 100 guests per service
- Time slots: Every 30 minutes (12:00-13:30 lunch, 18:00-21:00 dinner)
- Closed on Mondays
- Same-day reservations allowed until 2 hours before slot
- Guest count: 1-20 people

## Database Schema

See `prisma/schema.prisma` for the complete schema. Key model:

- **Reservation**: Stores all reservation data with status tracking
- **ReservationStatus**: Enum (PENDING, CONFIRMED, CANCELLED, COMPLETED)

## Security

- Rate limiting on all POST endpoints
- Input validation using Zod
- Security headers configured
- No sensitive data in API responses

## Testing

```bash
# Run tests
npm test

# Type checking
npm run type-check

# Linting
npm run lint
```

## Deployment

Before deploying:
1. Ensure all environment variables are set
2. Run database migrations
3. Test email service configuration

## Notes

- Email sending is non-blocking - reservation creation succeeds even if emails fail
- Seed data includes 12 sample reservations in various states
- Rate limiter is in-memory - resets on server restart
