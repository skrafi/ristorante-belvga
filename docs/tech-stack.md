# Tech Stack — Ristorante Pescheria Belvga

## Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Frontend | Next.js 15 (App Router) | SSR + SSG, i18n routing built-in, Vercel native |
| Styling | Tailwind CSS v4 | Utility-first, semantic tokens, fast development |
| Language | TypeScript | Type safety, better DX |
| Database | PostgreSQL + Prisma | Relational for reservations, free tier available |
| Auth | None | Guest bookings only, no user accounts in v1 |
| State (global) | Zustand | Simple state for language, UI preferences |
| State (server) | TanStack Query | Reservation API calls, caching |
| Error handling | useApiQuery / useApiMutation wrappers | Standardized HTTP error handling |
| i18n | next-intl | Built-in App Router support, 3 languages |
| Email | Resend | Free tier, simple API, reliable delivery |
| Hosting | Vercel (prod) + 0.0.0.0 (local) | Zero-config deployment |
| Monitoring | Sentry (optional v1.1) | Error tracking |
| E2E tests | Playwright | Cross-browser, accessibility |
| Commit validation | commitlint | Enforced conventional commits |

## State Architecture Rules

**Global state** (Zustand):
- Current language preference (en/fr/de)
- Theme preference (light/dark)
- Mobile menu open/closed

**Server state** (TanStack Query):
- Reservation availability checks
- Reservation submission
- Menu data (if dynamic, otherwise static)

**Local state** (useState):
- Form inputs before submission
- Modal open/closed states
- Gallery lightbox state

## Error Handling Protocol

All API calls go through `useApiQuery` / `useApiMutation` wrappers (`src/lib/api.ts`).

| HTTP Code | Action |
|-----------|--------|
| 400 | Show Toast "Invalid request — please check your input" |
| 422 | Return field errors to form state |
| 429 | Show Toast "Too many requests — please wait" |
| 500 | Show Toast "Something went wrong — please call us" + log |
| Network error | Show Toast "Connection problem — please try again" |

## i18n Architecture

```
/messages
  /en.json
  /fr.json
  /de.json
```

URL structure:
- `/` → redirects to `/en`
- `/en`, `/fr`, `/de` → home page in language
- `/en/menu`, `/fr/menu`, `/de/menu` → menu in language

## Security Headers

```ts
// next.config.ts
headers: async () => [{
  source: '/(.*)',
  headers: [
    { key: 'X-Frame-Options', value: 'DENY' },
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  ]
}]
```

## package.json scripts

```json
{
  "dev": "next dev -H 0.0.0.0",
  "build": "next build",
  "start": "next start -H 0.0.0.0",
  "type-check": "tsc --noEmit",
  "lint": "eslint src/ --max-warnings 0",
  "test": "jest --passWithNoTests",
  "test:e2e": "playwright test"
}
```
