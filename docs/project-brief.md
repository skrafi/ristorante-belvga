# Project Brief — Ristorante Pescheria Belvga

## Product description

Ristorante Pescheria Belvga is an elegant seafood restaurant website located in Lugano, Switzerland. The website showcases the restaurant's Mediterranean seafood cuisine, provides menu information in three languages (English, French, German), displays gallery of dishes and interior, enables table reservations, and provides contact/location information. The site embodies the sophistication of Ticino's finest seafood dining experience.

## Business goal

Increase direct reservations through the website by 40% within 60 days of launch.
Acceptance criterion: Reservation system records ≥50 bookings in first month with source="website".

## Scope v1

### Public Pages (3 languages: EN, FR, DE)
- **Home** — Hero, restaurant story, featured dishes, testimonials, CTA to reserve
- **Menu** — Complete menu with categories (antipasti, primi, secondi, dolci, wines)
- **Gallery** — Photo gallery of dishes, interior, lake views
- **About** — Restaurant history, chef bio, philosophy
- **Contact** — Address, map, phone, email, opening hours

### Reservation System
- Date/time picker with availability check
- Guest count selection (1-20 guests)
- Contact details form (name, email, phone, special requests)
- Confirmation email to guest + notification to restaurant
- No account required (guest booking)

### Multilingual
- Language switcher (EN/FR/DE)
- All content translated
- URL structure: `/en`, `/fr`, `/de`
- Default language: English

### Responsive Design
- Mobile-first
- Tablet and desktop optimized
- Touch-friendly interactions

## Out of scope v1

- Online payments / deposits
- User accounts / registration
- Reviews and ratings system
- Loyalty program
- Gift card purchases
- Event booking (private events)
- Newsletter subscription
- Social media integration beyond links
- Blog / news section
- Multi-restaurant support

## Visual inspirations

- **Quince (San Francisco)** — Elegant, photography-first, refined typography
- **Noma (Copenhagen)** — Minimalist, nature-inspired, premium feel
- **Le Bernardin (New York)** — Classic luxury, seafood-focused, sophisticated
- **Local Lugano aesthetics** — Lake Como/Lugano vibe, Swiss-Italian elegance, Mediterranean warmth

## Anti-inspirations

- Generic restaurant templates (TemplateMonster, etc.)
- Overly busy layouts with too many CTAs
- Fast food aesthetics
- Cheap stock photos
- Cluttered menus with too many items visible

## Tone and character

**Sophisticated yet welcoming.** Like dining at a refined Swiss-Italian lakeside restaurant.
- Premium but not pretentious
- Warm Mediterranean hospitality
- Fresh, authentic, honest
- Typography that feels like a beautifully designed menu
- Photography-first approach showcasing fresh seafood and lake views
- Swiss precision meets Italian passion

**Voice:**
- Elegant and inviting
- Descriptive but not flowery
- Professional with warmth
- Multilingual excellence

## Platform target

**Platform:** web-only (responsive)
**Offline:** no
**Push notifications:** no

## Target Audience

- International tourists visiting Lugano (English speakers)
- French-speaking Swiss and French tourists
- German-speaking Swiss locals
- Food enthusiasts seeking premium seafood
- Special occasion diners (anniversaries, celebrations)
- Business diners

## Technical Considerations

- **Hosting:** Vercel (free tier sufficient for v1)
- **Domain:** To be determined by client
- **Email:** Reservation confirmations via Resend/SendGrid
- **SEO:** Local SEO optimization for Lugano restaurants
- **Performance:** Fast loading, optimized images
