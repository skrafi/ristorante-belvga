# Environments — Ristorante Pescheria Belvga

## Local

- **URL:** http://0.0.0.0:3000
- **DB:** postgresql://localhost:5432/belvga_dev (or Vercel Postgres)
- **File:** .env.local (never commit)
- **Start:** `npm run dev`

## package.json scripts

```json
{
  "dev": "next dev -H 0.0.0.0",
  "build": "next build",
  "start": "next start -H 0.0.0.0"
}
```

## Staging

- **URL:** belvga-staging.vercel.app (or similar)
- **Variables:** Vercel dashboard → Environment: Preview

## Production

- **URL:** [client domain, TBD]
- **Variables:** Vercel dashboard → Environment: Production

## Required Environment Variables

| Variable | Description | Environments |
|----------|-------------|--------------|
| DATABASE_URL | PostgreSQL connection string | all |
| RESEND_API_KEY | Email sending API key | staging, production |
| NEXT_PUBLIC_APP_URL | Public URL for emails | staging, production |

## Optional Environment Variables

| Variable | Description | Environments |
|----------|-------------|--------------|
| SENTRY_DSN | Error tracking | staging, production |
| NEXT_PUBLIC_GA_ID | Google Analytics | production |

## Pre-deploy Validation

Before every deploy, verify:
- [ ] All required environment variables are set
- [ ] Database migrations applied
- [ ] Email service configured and tested

## Database Setup

```bash
# Local development
npx prisma migrate dev

# Production deploy
npx prisma migrate deploy
```
