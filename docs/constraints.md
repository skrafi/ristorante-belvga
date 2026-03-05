# Constraints — Ristorante Pescheria Belvga

## Technical

- **Framework:** Next.js 15 with App Router
- **Styling:** Tailwind CSS v4
- **Database:** PostgreSQL + Prisma (for reservations)
- **No user authentication required** — guest bookings only
- **Email service:** Resend or SendGrid for confirmations
- **Image optimization:** next/image mandatory
- **Bundle size:** Max 200KB initial JS gzipped

## Timeline

- **Phase 01-02 (Planning):** Completed by end of day
- **Phase 03-04 (Implementation):** 2-3 days
- **Phase 05-07 (QA + Deploy):** 1 day
- **Target launch:** Within 5 days

## Legal / Compliance

- **GDPR compliance** — EU users' data protection
- **Cookie consent** — Required for any tracking
- **Privacy policy** — Required page
- **Reservation data** — Stored securely, deleted on request
- **No payment processing** — v1 scope excludes payments

## Content

- **Languages:** English, French, German only
- **Menu content:** To be provided by client (placeholder for v1)
- **Images:** Placeholder/stock for v1, client to provide final
- **Contact info:** Placeholder addresses for Lugano area

## Design

- **No animations that delay content** by >300ms
- **prefers-reduced-motion** must be respected
- **Minimum touch target:** 44×44px
- **Color contrast:** WCAG AA minimum (4.5:1)

## Budget

- **Hosting:** Vercel free tier (upgrades if needed)
- **Email:** Free tier (Resend 100 emails/day or SendGrid 100/day)
- **Database:** Vercel Postgres free tier or Neon free tier
- **Images:** Vercel Image Optimization (included)
- **Domain:** Client-provided

## Browser Support

- Chrome, Firefox, Safari, Edge (latest 2 versions)
- iOS Safari, Android Chrome (latest 2 versions)
- No IE11 support required
