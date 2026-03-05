# Sitemap — Ristorante Pescheria Belvga

## Public Pages

| Path | Languages | Description |
|------|-----------|-------------|
| `/` | EN, FR, DE | Redirects to default language |
| `/{lang}` | EN, FR, DE | Home page — hero, story, featured dishes, CTA |
| `/{lang}/menu` | EN, FR, DE | Full menu with categories |
| `/{lang}/gallery` | EN, FR, DE | Photo gallery of dishes and restaurant |
| `/{lang}/about` | EN, FR, DE | Restaurant history, chef, philosophy |
| `/{lang}/contact` | EN, FR, DE | Contact info, map, opening hours |
| `/{lang}/reserve` | EN, FR, DE | Reservation form |

## System Pages

| Path | Description |
|------|-------------|
| `/{lang}/privacy` | Privacy policy (GDPR) |
| `/404` | Not found page |
| `/500` | Server error page |

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/v1/availability` | Check table availability |
| POST | `/api/v1/reservations` | Create reservation |
| GET | `/api/v1/reservations/[id]` | Get reservation details (confirmation) |

## Language Codes

- `en` — English (default)
- `fr` — Français
- `de` — Deutsch

## URL Examples

- English home: `/en`
- French menu: `/fr/menu`
- German reservation: `/de/reserve`
