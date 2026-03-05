# Performance Budget — Ristorante Pescheria Belvga

## Lighthouse (mobile and desktop)

| Metric | Target |
|--------|--------|
| Performance | ≥90 |
| Accessibility | ≥95 |
| Best Practices | ≥90 |
| SEO | ≥90 |

## Core Web Vitals

| Metric | Target |
|--------|--------|
| LCP (Largest Contentful Paint) | ≤2.5s |
| CLS (Cumulative Layout Shift) | ≤0.1 |
| INP (Interaction to Next Paint) | ≤200ms |

## Bundle Size

| Metric | Limit |
|--------|-------|
| Max initial JS | 200KB gzipped |
| Max JS chunk | 200KB gzipped |
| Max initial CSS | 50KB gzipped |

Violations are **P1 bugs**.

## Images

| Rule | Requirement |
|------|-------------|
| Format | WebP/AVIF preferred, JPEG fallback |
| Lazy loading | All images below fold |
| Max size | 200KB per image (optimized) |
| Hero images | Preload critical above-fold images |
| Gallery | Lazy load, progressive enhancement |

## Fonts

| Rule | Requirement |
|------|-------------|
| Max font families | 2 (display + body) |
| Font display | `font-display: swap` |
| Preload | Critical fonts preloaded |

## Performance Regression Rule

If Lighthouse score drops >5 points from previous QA iteration → **P1 bug**.

## Policies

- **next/image mandatory** — no raw `<img>` tags
- **font-display: swap** + preload critical fonts
- **Lazy load** all components below the fold
- **Dynamic imports** for heavy components (gallery lightbox, etc.)

## Monitoring

- Vercel Analytics (built-in)
- Lighthouse CI on PRs (optional)
