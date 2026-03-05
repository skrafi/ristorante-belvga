# Agent Prompt — Frontend Agent 1 | Project: Ristorante Pescheria Belvga
# Branch: feat/fe-public

## STEP 0 — ORIENTATION (MANDATORY BEFORE ANY CODE)
Read in order:
1. docs/pages-spec.md — Home, Menu, Gallery, About, Contact pages
2. docs/ui-guide.md
3. docs/ui-concepts.md
4. docs/sitemap.md
5. docs/accessibility.md
6. docs/performance-budget.md

After reading, output:
- "CONFIRMED: I have read all 6 input documents."
- Your pages (list)
- Creative Brief deliverables (3 items)
- Ambiguities or missing information (list, or "none")

## Role
You implement the public pages for Ristorante Pescheria Belvga:
  - / (Home)
  - /menu
  - /gallery
  - /about
  - /contact
  - /privacy
  - /404, /500

You DO NOT modify:
  src/components/ui/**            ← import only
  src/styles/globals.css
  tailwind.config.ts
  src/app/api/**
  src/app/{lang}/reserve/**       ← owned by fe-agent-2

## Project Context
- **Name:** Ristorante Pescheria Belvga
- **Type:** Elegant seafood restaurant in Lugano, Switzerland
- **Languages:** EN, FR, DE via next-intl
- **Character:** Mediterranean elegance meets Swiss precision

## Pages You Own

### 1. Home Page (`/{lang}`)
- Full-viewport hero with parallax background
- Restaurant story teaser
- Featured dishes (4-6 items)
- Testimonials (3 reviews)
- CTA section for reservations

### 2. Menu Page (`/{lang}/menu`)
- Tabbed categories: Antipasti, Primi, Secondi, Dolci, Vini
- Each item: name, description, price
- Sliding tab indicator animation

### 3. Gallery Page (`/{lang}/gallery`)
- Masonry/grid layout of 20+ photos
- Lightbox with navigation
- Categories: Dishes, Interior, Exterior, Kitchen

### 4. About Page (`/{lang}/about`)
- Restaurant history
- Philosophy
- Chef bio
- Location/Lugano info

### 5. Contact Page (`/{lang}/contact`)
- Address, phone, email
- Opening hours table
- Google Maps embed/link
- CTA to reserve

### 6. Privacy Page (`/{lang}/privacy`)
- GDPR-compliant privacy policy
- Static content from translations

### 7. Error Pages
- 404: "Page not found" with home link
- 500: "Something went wrong" with retry and home links

## Implementation Requirements

### i18n Setup
- Configure next-intl with EN, FR, DE
- Create messages/{en,fr,de}.json with all translations
- URL structure: /{lang}/page

### Semantic Tokens — Non-Negotiable
Reference semantic tokens from ui-guide.md only. Never primitives, never hardcoded values.

### Dark Mode
Every page must render correctly under [data-theme="dark"].

### Creative Brief Deliverables (implement all 3)
1. **Hero Interaction** — Full-viewport hero with parallax (0.4x scroll speed desktop), content fade-in on load (800ms, 300ms delay)
2. **Menu Category Transition** — Tabbed navigation with sliding underline indicator (200ms), content fade between tabs (300ms)
3. **Gallery Lightbox** — Scale animation (0.9 → 1, 400ms spring), backdrop fade, arrow navigation

### Performance
- next/image for ALL images
- font-display: swap
- Lazy load below-the-fold content
- Preload critical fonts

## Output File Tree
```
src/
  app/
    [lang]/
      layout.tsx
      page.tsx                    ← Home
      menu/
        page.tsx
      gallery/
        page.tsx
      about/
        page.tsx
      contact/
        page.tsx
      privacy/
        page.tsx
    404.tsx
    500.tsx (or error.tsx)
  components/
    layout/
      Header.tsx
      Footer.tsx
      MobileMenu.tsx
      LanguageSwitcher.tsx
    home/
      Hero.tsx
      Story.tsx
      FeaturedDishes.tsx
      Testimonials.tsx
      CTASection.tsx
    menu/
      MenuTabs.tsx
      MenuCategory.tsx
      MenuItem.tsx
    gallery/
      GalleryGrid.tsx
      GalleryLightbox.tsx
    about/
      StorySection.tsx
      PhilosophySection.tsx
      ChefSection.tsx
      LocationSection.tsx
    contact/
      ContactInfo.tsx
      OpeningHours.tsx
      MapEmbed.tsx
  messages/
    en.json
    fr.json
    de.json
  i18n/
    config.ts
    request.ts
```

## Definition of Done (MECHANICALLY VERIFIABLE)
- [ ] npx tsc --noEmit — zero errors
- [ ] npm run build — zero errors
- [ ] Each page renders at 375px, 768px, 1280px — no overflow
- [ ] Dark mode: each page renders correctly under [data-theme="dark"]
- [ ] Creative Brief: all 3 deliverables present and functional
- [ ] i18n: all 3 languages working, URL structure correct
- [ ] Lighthouse Accessibility ≥95 on all pages
- [ ] npx commitlint --last — passes
- [ ] Append to agents/events.log: "[timestamp] fe-agent-1 COMPLETED feat/fe-public"
- [ ] PR opened, base: develop

## Escalation → agents/fe-agent-1/escalations.md
Escalate when:
  - Required component absent from src/components/ui/
  - Page spec has contradictory requirements
  - Translation keys conflict

Format: [ISO8601] BLOCKING|NON-BLOCKING / Issue / Options / Recommendation

## Git
Branch: feat/fe-public | Commits: feat(public): [page] — [description]
