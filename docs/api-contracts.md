# API Contracts — Ristorante Pescheria Belvga

## Version: v1

All endpoints use `/api/v1/` prefix.

---

## GET /api/v1/availability

**Description:** Check available time slots for a given date and guest count
**Auth required:** no

### Request

```
GET /api/v1/availability?date=2026-03-07&guests=4
```

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| date | string | yes | Date in YYYY-MM-DD format, must be today or future |
| guests | number | yes | Number of guests, 1-20 |

### Response 200

```json
{
  "date": "2026-03-07",
  "guests": 4,
  "availableSlots": ["12:00", "12:30", "18:00", "18:30", "19:00", "19:30", "20:00"],
  "message": null
}
```

### Response 200 (Limited Availability)

```json
{
  "date": "2026-03-07",
  "guests": 4,
  "availableSlots": ["12:00", "18:00"],
  "message": "Limited availability"
}
```

### Response 200 (Fully Booked)

```json
{
  "date": "2026-03-07",
  "guests": 4,
  "availableSlots": [],
  "message": "Fully booked"
}
```

### Errors

| Code | Situation | Body |
|------|-----------|------|
| 400 | Invalid date format | `{ "error": "INVALID_DATE", "message": "Date must be in YYYY-MM-DD format" }` |
| 400 | Past date | `{ "error": "PAST_DATE", "message": "Date must be today or in the future" }` |
| 400 | Invalid guests | `{ "error": "INVALID_GUESTS", "message": "Guests must be between 1 and 20" }` |
| 400 | Restaurant closed | `{ "error": "CLOSED", "message": "Restaurant is closed on this date" }` |

---

## POST /api/v1/reservations

**Description:** Create a new reservation
**Auth required:** no

### Request

```json
{
  "date": "2026-03-07",
  "time": "19:30",
  "guests": 4,
  "name": "Jean-Pierre Müller",
  "email": "jp.muller@example.com",
  "phone": "+41 79 123 45 67",
  "notes": "Anniversary dinner, please prepare a small cake",
  "language": "fr"
}
```

**Body Fields:**

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| date | string | yes | YYYY-MM-DD, today or future |
| time | string | yes | HH:mm, must be in available slots |
| guests | number | yes | 1-20 |
| name | string | yes | 2-100 characters |
| email | string | yes | Valid email format |
| phone | string | yes | Valid phone format, 5-20 characters |
| notes | string | no | Max 500 characters |
| language | string | yes | "en", "fr", or "de" |

### Response 201

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

### Errors

| Code | Situation | Body |
|------|-----------|------|
| 400 | Invalid date | `{ "error": "INVALID_DATE" }` |
| 400 | Invalid time | `{ "error": "INVALID_TIME" }` |
| 400 | Time not available | `{ "error": "SLOT_UNAVAILABLE", "message": "This time slot is no longer available" }` |
| 422 | Validation error | `{ "error": "VALIDATION_ERROR", "fields": { "email": ["Invalid email format"], "name": ["Name is required"] } }` |
| 429 | Too many requests | `{ "error": "RATE_LIMITED", "message": "Too many reservation attempts. Please wait." }` |
| 500 | Server error | `{ "error": "INTERNAL_ERROR" }` |

---

## GET /api/v1/reservations/[id]

**Description:** Get reservation details by ID (for confirmation page)
**Auth required:** no (confirmation code provides access control)

### Request

```
GET /api/v1/reservations/clx1234567890
```

### Response 200

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

### Errors

| Code | Situation | Body |
|------|-----------|------|
| 404 | Not found | `{ "error": "NOT_FOUND" }` |

---

## Rate Limiting

| Endpoint | Limit | Window |
|----------|-------|--------|
| POST /api/v1/reservations | 5 requests | 1 minute |
| GET /api/v1/availability | 30 requests | 1 minute |

---

## Email Triggers

### POST /api/v1/reservations triggers:

1. **Guest Confirmation Email**
   - To: guest email
   - Subject: "Your reservation at Ristorante Pescheria Belvga - [CONFIRMATION_CODE]"
   - Language: Based on `language` field
   - Content: Reservation details, confirmation code, contact info

2. **Restaurant Notification Email**
   - To: reservations@belvga.ch
   - Subject: "New Reservation - [DATE] [TIME] - [GUESTS] guests"
   - Content: Full reservation details, guest contact info
