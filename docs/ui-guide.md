# UI Guide — Ristorante Pescheria Belvga

> Source of truth for all visual decisions.
> Mediterranean elegance meets Swiss precision. Lake Lugano sophistication.
> Components reference SEMANTIC tokens only — never primitives, never hardcoded values.
> Dark mode is required.

---

## Design Philosophy

**Mediterranean Sophistication**
- Warm, inviting, elegant
- Photography-first approach
- Typography does the heavy lifting
- Minimalist but not cold
- Lake Como/Lugano aesthetic

**Swiss Precision**
- Clean layouts
- Perfect spacing
- Crisp typography
- Professional polish

---

## Semantic Color Tokens

```css
/* ── Primitives (never used directly in components) ── */
:root {
  /* Brand - Mediterranean Sea & Sunset */
  --primitive-ocean-400: #4da6a6;
  --primitive-ocean-500: #2d8a8a;
  --primitive-ocean-600: #1f6b6b;
  
  /* Warm terracotta accent */
  --primitive-terracotta-400: #d97757;
  --primitive-terracotta-500: #c45a3a;
  --primitive-terracotta-600: #a8482f;
  
  /* Neutral palette */
  --primitive-cream-50: #fdfcfa;
  --primitive-cream-100: #f8f6f2;
  --primitive-cream-200: #ebe7df;
  --primitive-stone-600: #6b6860;
  --primitive-stone-700: #524e46;
  --primitive-stone-800: #3d3a34;
  --primitive-stone-900: #1a1816;
  
  /* Deep forest for accents */
  --primitive-forest-700: #2d4a3e;
  --primitive-forest-800: #1f352b;
}

/* ── Semantic tokens — Light theme ── */
:root {
  /* Interactive */
  --color-interactive:            var(--primitive-ocean-500);
  --color-interactive-hover:      var(--primitive-ocean-600);
  --color-interactive-foreground: #ffffff;

  /* Accent (secondary actions) */
  --color-accent:                 var(--primitive-terracotta-500);
  --color-accent-hover:           var(--primitive-terracotta-600);
  --color-accent-foreground:      #ffffff;

  /* Surfaces */
  --color-background:             var(--primitive-cream-50);
  --color-surface:                #ffffff;
  --color-surface-alt:            var(--primitive-cream-100);
  --color-surface-warm:           var(--primitive-cream-100);
  --color-border:                 var(--primitive-cream-200);
  --color-border-subtle:          rgba(0, 0, 0, 0.06);

  /* Text */
  --color-text-primary:           var(--primitive-stone-900);
  --color-text-secondary:         var(--primitive-stone-700);
  --color-text-tertiary:          var(--primitive-stone-600);
  --color-text-disabled:          var(--primitive-cream-200);
  --color-text-inverse:           #ffffff;
  --color-text-on-dark:           var(--primitive-cream-50);

  /* Semantic states */
  --color-destructive:            #c45a3a;
  --color-destructive-hover:      #a8482f;
  --color-success:                #2d7a4a;
  --color-warning:                #c4882a;
  --color-info:                   var(--primitive-ocean-500);

  /* Overlay */
  --color-overlay:                rgba(26, 24, 22, 0.5);
  --color-overlay-light:          rgba(26, 24, 22, 0.3);
}

/* ── Semantic tokens — Dark theme ── */
[data-theme="dark"] {
  /* Interactive */
  --color-interactive:            var(--primitive-ocean-400);
  --color-interactive-hover:      #6bbfbf;
  --color-interactive-foreground: var(--primitive-stone-900);

  /* Accent */
  --color-accent:                 var(--primitive-terracotta-400);
  --color-accent-hover:           #e88a6a;
  --color-accent-foreground:      var(--primitive-stone-900);

  /* Surfaces */
  --color-background:             var(--primitive-stone-900);
  --color-surface:                var(--primitive-stone-800);
  --color-surface-alt:            #2a2724;
  --color-surface-warm:           #2d2a26;
  --color-border:                 #3d3a34;
  --color-border-subtle:          rgba(255, 255, 255, 0.08);

  /* Text */
  --color-text-primary:           var(--primitive-cream-50);
  --color-text-secondary:         #c4c0b8;
  --color-text-tertiary:          #9a958c;
  --color-text-disabled:          #4d4a44;
  --color-text-inverse:           var(--primitive-stone-900);
  --color-text-on-dark:           var(--primitive-cream-50);

  /* Semantic states — adjusted for dark bg */
  --color-destructive:            #e87a5a;
  --color-destructive-hover:      #f08a6a;
  --color-success:                #4da86a;
  --color-warning:                #e8a84a;
  --color-info:                   var(--primitive-ocean-400);

  /* Overlay */
  --color-overlay:                rgba(0, 0, 0, 0.7);
  --color-overlay-light:          rgba(0, 0, 0, 0.4);
}
```

---

## Typography

```css
:root {
  /* Display font - Elegant serif for headlines */
  --font-display: 'Playfair Display', Georgia, 'Times New Roman', serif;
  
  /* Body font - Clean sans-serif */
  --font-body: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  
  /* Accent font - For small labels, tags */
  --font-accent: 'DM Sans', var(--font-body);

  /* Scale */
  --text-xs:   0.75rem;   /* 12px */
  --text-sm:   0.875rem;  /* 14px */
  --text-base: 1rem;      /* 16px */
  --text-lg:   1.125rem;  /* 18px */
  --text-xl:   1.25rem;   /* 20px */
  --text-2xl:  1.5rem;    /* 24px */
  --text-3xl:  1.875rem;  /* 30px */
  --text-4xl:  2.25rem;   /* 36px */
  --text-5xl:  3rem;      /* 48px */
  --text-6xl:  3.75rem;   /* 60px */
  --text-7xl:  4.5rem;    /* 72px - Hero headlines */

  /* Line heights */
  --leading-tight:    1.15;
  --leading-snug:     1.3;
  --leading-normal:   1.5;
  --leading-relaxed:  1.7;

  /* Weights */
  --font-light:     300;
  --font-normal:    400;
  --font-medium:    500;
  --font-semibold:  600;
  --font-bold:      700;
}

/* Typography pairings */
.text-hero {
  font-family: var(--font-display);
  font-size: var(--text-6xl);
  font-weight: var(--font-normal);
  line-height: var(--leading-tight);
  letter-spacing: -0.02em;
}

.text-headline {
  font-family: var(--font-display);
  font-size: var(--text-4xl);
  font-weight: var(--font-normal);
  line-height: var(--leading-snug);
}

.text-subhead {
  font-family: var(--font-body);
  font-size: var(--text-xl);
  font-weight: var(--font-normal);
  line-height: var(--leading-relaxed);
  color: var(--color-text-secondary);
}

.text-body {
  font-family: var(--font-body);
  font-size: var(--text-base);
  font-weight: var(--font-normal);
  line-height: var(--leading-relaxed);
}

.text-label {
  font-family: var(--font-accent);
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
```

---

## Spacing (4px scale)

```css
:root {
  --space-1:  0.25rem;  /* 4px  */
  --space-2:  0.5rem;   /* 8px  */
  --space-3:  0.75rem;  /* 12px */
  --space-4:  1rem;     /* 16px */
  --space-5:  1.25rem;  /* 20px */
  --space-6:  1.5rem;   /* 24px */
  --space-8:  2rem;     /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-20: 5rem;     /* 80px */
  --space-24: 6rem;     /* 96px */
  --space-32: 8rem;     /* 128px */
}
```

---

## Breakpoints

```css
/* 
  sm:  640px   - Large phones, small tablets
  md:  768px   - Tablets
  lg:  1024px  - Small laptops
  xl:  1280px  - Desktops
  2xl: 1536px  - Large screens
*/
```

---

## Border Radius & Shadows

```css
:root {
  --radius-sm:    0.25rem;  /* 4px - subtle */
  --radius-md:    0.5rem;   /* 8px - buttons, inputs */
  --radius-lg:    0.75rem;  /* 12px - cards */
  --radius-xl:    1rem;     /* 16px - modals */
  --radius-2xl:   1.5rem;   /* 24px - large cards */
  --radius-full:  9999px;   /* pills, avatars */

  /* Soft, warm shadows */
  --shadow-sm:  0 1px 2px rgba(26, 24, 22, 0.04);
  --shadow-md:  0 4px 12px rgba(26, 24, 22, 0.08);
  --shadow-lg:  0 12px 32px rgba(26, 24, 22, 0.12);
  --shadow-xl:  0 24px 48px rgba(26, 24, 22, 0.16);
}

[data-theme="dark"] {
  --shadow-sm:  0 1px 2px rgba(0, 0, 0, 0.2);
  --shadow-md:  0 4px 12px rgba(0, 0, 0, 0.3);
  --shadow-lg:  0 12px 32px rgba(0, 0, 0, 0.4);
  --shadow-xl:  0 24px 48px rgba(0, 0, 0, 0.5);
}
```

---

## Motion System

```css
:root {
  --duration-instant: 100ms;
  --duration-fast:    150ms;
  --duration-normal:  250ms;
  --duration-slow:    400ms;
  --duration-slower:  600ms;

  --easing-default:   cubic-bezier(0.4, 0, 0.2, 1);
  --easing-in:        cubic-bezier(0.4, 0, 1, 1);
  --easing-out:       cubic-bezier(0, 0, 0.2, 1);
  --easing-spring:    cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

**Motion philosophy:** 
- Subtle, elegant, never distracting
- Ease-out for entrances (feels welcoming)
- Spring easing only for small interactive elements (buttons, toggles)
- Smooth scroll behavior
- Respect prefers-reduced-motion

**prefers-reduced-motion guard (required):**
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

No animation may delay critical content visibility by more than 300ms.

---

## Interaction Design System

### Hover States
- **Buttons/Links:** `--color-interactive-hover`, transition `--duration-fast --easing-default`
- **Cards:** `--shadow-md` → `--shadow-lg`, `translate-y: -4px`, transition `--duration-normal --easing-out`
- **Gallery images:** Slight scale (1.02), shadow increase
- **Destructive actions:** `--color-destructive` → `--color-destructive-hover`

### Focus States
All focusable elements:
```css
outline: 2px solid var(--color-interactive);
outline-offset: 2px;
```
Never suppress focus outlines without custom visible replacement.

### Active/Pressed States
- Buttons: Slight scale down (0.98)
- Links: Slight underline fade in

### Loading Feedback Decision Tree
| Situation | Pattern |
|-----------|---------|
| Page/section data loading | Skeleton matching content shape |
| Button-triggered async action | Spinner in button, button disabled |
| Gallery loading | Blur-up placeholder |
| Form submission | Button loading state, then success message |

### Empty State Standard
Every empty state requires: elegant icon + headline + subtext + CTA.

---

## Base Component Specifications

### Button
- **Variants:** primary, secondary, ghost, accent
- **Sizes:** sm, md, lg
- **States:** default, hover, active, disabled, loading

### Input
- **Variants:** default
- **Sizes:** md, lg
- **States:** default, focus, error, disabled

### Card
- **Variants:** default, interactive, featured
- **Padding:** `--space-6` (24px)
- **Radius:** `--radius-lg` (12px)
- **Shadow:** `--shadow-sm`

### Badge/Tag
- **Variants:** default, success, warning, info
- **Size:** `--text-xs`, padding `--space-1 --space-2`

### Modal
- **Sizes:** sm, md, lg
- **Overlay:** `--color-overlay`
- **Animation:** Fade + scale from 0.95

### Toast
- **Variants:** success, error, warning, info
- **Position:** Bottom right (mobile: bottom center)

---

## Layout Patterns

### Page Layout
```
┌────────────────────────────────────┐
│           Header (fixed)           │
├────────────────────────────────────┤
│                                    │
│           Main Content             │
│         (max-width: 1280px)        │
│         (padding: --space-4        │
│          to --space-8)             │
│                                    │
├────────────────────────────────────┤
│             Footer                 │
└────────────────────────────────────┘
```

### Hero Pattern
- Full viewport height on desktop (100vh)
- 75vh on tablet, auto on mobile
- Background image with gradient overlay
- Centered text, CTA button
- Scroll indicator at bottom

### Section Spacing
- Between sections: `--space-20` (80px) on desktop, `--space-12` (48px) on mobile
- Section header to content: `--space-8` (32px)

---

## Anti-Patterns

- ❌ Inline colors — always use CSS variables
- ❌ Hardcoded spacing — always use spacing scale
- ❌ New shades not defined in primitives
- ❌ `font-family` outside `--font-*` variables
- ❌ Hardcoded breakpoints in component code
- ❌ `margin-top` on first child — use `gap` on parent
- ❌ Semantic tokens bypassed for primitives
- ❌ Animations without `prefers-reduced-motion` guard
- ❌ Focus outlines hidden without replacement
- ❌ Busy, cluttered layouts
- ❌ Low-quality or obviously stock images
- ❌ Auto-playing videos or audio
- ❌ Intrusive popups
