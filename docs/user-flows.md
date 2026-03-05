# User Flows — Ristorante Pescheria Belvga

---

## Flow: Browse and Reserve

**Entry:** Search engine, social media link, or direct URL
**Goal:** Guest discovers restaurant and books a table

### Steps

1. Guest lands on home page `/{lang}`
2. Guest scrolls through hero, story, featured dishes
3. Guest clicks "Reserve a Table" CTA
4. Guest is taken to `/{lang}/reserve`
5. Guest selects date (datepicker)
6. System shows available time slots
7. Guest selects time and guest count
8. Guest fills name, email, phone
9. Guest optionally adds special requests
10. Guest clicks "Confirm Reservation"
11. System validates form
12. System creates reservation
13. System sends confirmation email
14. Guest sees confirmation page with details

### Errors and Recovery

| Error | User sees | Recovery |
|-------|-----------|----------|
| No availability | "No tables available for this time" message | Select different date/time |
| Form validation error | Field highlighted with error message | Fix field and resubmit |
| Server error | "Something went wrong. Please call us at +41 91 XXX XX XX" | Call restaurant directly |
| Network error | "Connection problem. Please try again." | Retry button |

---

## Flow: View Menu

**Entry:** Home page "View Menu" link or navigation
**Goal:** Guest explores menu options

### Steps

1. Guest clicks "Menu" in navigation
2. Guest lands on `/{lang}/menu`
3. Guest browses menu categories (tabs/sections)
4. Guest reads dish descriptions and prices
5. Guest clicks "Reserve a Table" CTA

### Errors and Recovery

| Error | User sees | Recovery |
|-------|-----------|----------|
| Page not found | 404 page | Click "Return to Home" |

---

## Flow: View Gallery

**Entry:** Navigation or home page link
**Goal:** Guest views restaurant photos

### Steps

1. Guest clicks "Gallery" in navigation
2. Guest lands on `/{lang}/gallery`
3. Guest browses photo grid
4. Guest clicks photo to open lightbox
5. Guest navigates between photos (arrows/keyboard)
6. Guest closes lightbox (X / Escape / click outside)

### Errors and Recovery

| Error | User sees | Recovery |
|-------|-----------|----------|
| Image fails to load | Placeholder or alt text | Continue browsing |

---

## Flow: Get Contact Info

**Entry:** Navigation or CTA
**Goal:** Guest finds contact information

### Steps

1. Guest clicks "Contact" in navigation
2. Guest lands on `/{lang}/contact`
3. Guest views address, phone, email, hours
4. Guest optionally clicks phone (mobile: initiates call)
5. Guest optionally clicks email (opens mail client)
6. Guest optionally clicks map (opens Google Maps)

### Errors and Recovery

| Error | User sees | Recovery |
|-------|-----------|----------|
| Map fails to load | Address text with link to Google Maps | Click link |

---

## Flow: Change Language

**Entry:** Any page
**Goal:** Guest switches to preferred language

### Steps

1. Guest sees current language in header/footer
2. Guest clicks language selector
3. Dropdown shows: English, Français, Deutsch
4. Guest selects new language
5. Page reloads with new `/{lang}/...` URL
6. All content displays in selected language

### Errors and Recovery

| Error | User sees | Recovery |
|-------|-----------|----------|
| Invalid language code | Redirect to default language (EN) | N/A |

---

## Flow: Mobile Navigation

**Entry:** Mobile device, any page
**Goal:** Guest navigates site on mobile

### Steps

1. Guest sees hamburger menu icon
2. Guest taps menu icon
3. Slide-out menu appears with navigation links
4. Guest taps desired page
5. Menu closes, page navigates

### Errors and Recovery

| Error | User sees | Recovery |
|-------|-----------|----------|
| N/A | N/A | N/A |

---

## Flow: Reservation Confirmation Email

**Entry:** Completed reservation
**Goal:** Guest receives confirmation details

### Steps (System)

1. Reservation created in database
2. System generates confirmation email in guest's selected language
3. Email includes:
   - Restaurant name and logo
   - Confirmation code
   - Date, time, guest count
   - Guest name
   - Restaurant contact info
   - Cancellation note ("Please call to cancel")
4. Email sent via Resend
5. Parallel email sent to restaurant with reservation details

### Email Template Data

```typescript
interface EmailData {
  to: string;           // Guest email
  confirmationCode: string;
  date: string;         // Formatted: "Friday, March 7, 2026"
  time: string;         // Formatted: "7:30 PM"
  guests: number;
  guestName: string;
  language: "en" | "fr" | "de";
  restaurantName: string;
  restaurantPhone: string;
  restaurantAddress: string;
}
```
