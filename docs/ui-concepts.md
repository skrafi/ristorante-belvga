# UI Concepts — Ristorante Pescheria Belvga

## Visual Direction

**Mediterranean Elegance with Swiss Precision**

The website should feel like stepping into a refined lakeside restaurant in Lugano. Warm cream backgrounds, elegant serif typography for headlines, and a sophisticated color palette inspired by the Mediterranean sea and Swiss sunsets.

**Key Visual Elements:**
- Photography-first: Large, appetizing images of dishes and lake views
- Elegant typography: Playfair Display for headlines, Inter for body
- Warm neutrals: Cream, stone, with ocean blue accent
- Subtle animations: Smooth, never distracting
- Ample white space: Let the content breathe

**Photography Style:**
- Natural light, not overly processed
- Close-ups of dishes showing texture and freshness
- Wide shots of restaurant interior and lake views
- Lifestyle shots of dining experience
- Editorial feel, not typical stock photos

---

## Component and Interaction Ideas

### 1. Hero Parallax with Reveal
**Idea:** Full-viewport hero with lake/restaurant photo. As user scrolls, the image parallax-scrolls at 0.5x speed while content fades in from below.
**Where it fits:** Home page hero
**CSS sketch:**
```css
.hero {
  height: 100vh;
  background-attachment: fixed; /* Fallback */
  background-size: cover;
}

@supports (transform: translateZ(0)) {
  .hero-image {
    will-change: transform;
    transform: translateZ(0);
  }
}

.hero-content {
  animation: fadeSlideUp 0.8s var(--easing-out) 0.3s both;
}

@keyframes fadeSlideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### 2. Menu Tab Navigation with Smooth Transition
**Idea:** Horizontal tabs for menu categories. Active tab slides an underline indicator. Content fades between categories.
**Where it fits:** Menu page
**CSS sketch:**
```css
.menu-tabs {
  display: flex;
  gap: var(--space-1);
  border-bottom: 1px solid var(--color-border);
}

.menu-tab {
  padding: var(--space-3) var(--space-4);
  position: relative;
  color: var(--color-text-secondary);
  transition: color var(--duration-fast);
}

.menu-tab[aria-selected="true"] {
  color: var(--color-text-primary);
}

.menu-tab::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--color-interactive);
  transform: scaleX(0);
  transition: transform var(--duration-normal) var(--easing-out);
}

.menu-tab[aria-selected="true"]::after {
  transform: scaleX(1);
}

.menu-content {
  animation: fadeIn var(--duration-normal) var(--easing-out);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

### 3. Gallery Lightbox with Smooth Transitions
**Idea:** Click photo to open lightbox. Background dims, image scales up smoothly. Arrow navigation with slide animation.
**Where it fits:** Gallery page
**CSS sketch:**
```css
.lightbox {
  position: fixed;
  inset: 0;
  background: var(--color-overlay);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn var(--duration-normal) var(--easing-out);
  z-index: 100;
}

.lightbox-image {
  max-width: 90vw;
  max-height: 90vh;
  border-radius: var(--radius-lg);
  animation: scaleIn var(--duration-slow) var(--easing-spring);
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.lightbox-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  border-radius: var(--radius-full);
  background: var(--color-surface);
  box-shadow: var(--shadow-lg);
  transition: transform var(--duration-fast);
}

.lightbox-nav:hover {
  transform: translateY(-50%) scale(1.1);
}

.lightbox-nav.prev { left: var(--space-6); }
.lightbox-nav.next { right: var(--space-6); }
```

### 4. Reservation Form with Real-Time Availability
**Idea:** Date picker shows availability visually. Time slots appear as selectable chips. Form sections animate in sequence.
**Where it fits:** Reserve page
**CSS sketch:**
```css
.time-slot {
  padding: var(--space-3) var(--space-4);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  transition: all var(--duration-fast);
  cursor: pointer;
}

.time-slot:hover:not(:disabled) {
  border-color: var(--color-interactive);
  background: var(--color-surface-alt);
}

.time-slot.selected {
  background: var(--color-interactive);
  color: var(--color-interactive-foreground);
  border-color: var(--color-interactive);
}

.time-slot:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.form-section {
  animation: slideIn var(--duration-normal) var(--easing-out);
  animation-delay: calc(var(--section-index) * 100ms);
  animation-fill-mode: both;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
```

### 5. Navigation Slide-In (Mobile)
**Idea:** Hamburger menu triggers full-height slide-in from left. Backdrop blur effect. Staggered link animations.
**Where it fits:** Global navigation (mobile)
**CSS sketch:**
```css
.mobile-nav {
  position: fixed;
  inset: 0 auto 0 0;
  width: 280px;
  background: var(--color-surface);
  transform: translateX(-100%);
  transition: transform var(--duration-slow) var(--easing-out);
  z-index: 100;
}

.mobile-nav.open {
  transform: translateX(0);
}

.mobile-nav-backdrop {
  position: fixed;
  inset: 0;
  background: var(--color-overlay);
  opacity: 0;
  visibility: hidden;
  transition: all var(--duration-normal);
}

.mobile-nav-backdrop.visible {
  opacity: 1;
  visibility: visible;
  backdrop-filter: blur(4px);
}

.mobile-nav-link {
  display: block;
  padding: var(--space-4) var(--space-6);
  opacity: 0;
  transform: translateX(-20px);
  transition: all var(--duration-normal) var(--easing-out);
}

.mobile-nav.open .mobile-nav-link {
  opacity: 1;
  transform: translateX(0);
  transition-delay: calc(var(--link-index) * 50ms + 100ms);
}
```

---

## Loading States

### Skeleton Components
```css
.skeleton {
  background: linear-gradient(
    90deg,
    var(--color-surface-alt) 0%,
    var(--color-surface) 50%,
    var(--color-surface-alt) 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: var(--radius-sm);
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.skeleton-text {
  height: 1em;
  width: 100%;
}

.skeleton-title {
  height: 2em;
  width: 60%;
}

.skeleton-image {
  aspect-ratio: 16 / 9;
  width: 100%;
}
```

---

## Empty States

### No Availability
- Icon: Calendar with X
- Headline: "No tables available"
- Subtext: "Please try a different date or time"
- CTA: "View other dates" button

### Gallery Empty
- Icon: Camera
- Headline: "Photos coming soon"
- Subtext: "We're preparing beautiful images of our dishes and restaurant"
- CTA: None (or "Make a reservation" as secondary)

---

## Creative Brief (concrete deliverables for FE agents)

### 1. Hero Interaction
**What:** Full-viewport hero on home page with lake/restaurant background image. Content (restaurant name, tagline, CTA) is centered with elegant typography.
**Animation:** On load, content fades in and slides up over 800ms with 300ms delay. Background has subtle parallax on scroll (0.4x speed on desktop only).
**Technical:** Use CSS transforms and intersection observer for scroll-based parallax. Respect prefers-reduced-motion.

### 2. Menu Category Transition
**What:** Menu page with tabbed navigation for categories (Antipasti, Primi, Secondi, Dolci, Vini).
**Animation:** Active tab has sliding underline indicator (200ms ease-out). Content fades between tabs (300ms). Menu items stagger in (50ms delay per item).
**Technical:** CSS transitions with transform for performance. ARIA tabs pattern for accessibility.

### 3. Gallery Lightbox
**What:** Photo gallery with grid layout. Clicking a photo opens full-screen lightbox with navigation.
**Animation:** Lightbox backdrop fades in (250ms). Image scales from 0.9 to 1 with spring easing (400ms). Navigation arrows appear after 500ms. Navigate between photos with slide animation.
**Technical:** Focus trap in lightbox. Escape key closes. Arrow keys navigate. Respect prefers-reduced-motion.

---

## Signature Moments

1. **First Impression:** The hero should immediately convey the elegance of the restaurant. Beautiful photography, elegant typography, clear CTA.

2. **Menu Discovery:** The menu should feel like browsing a beautifully designed physical menu. Easy to navigate, appetizing descriptions, clear prices.

3. **Reservation Flow:** The reservation process should be effortless. Real-time availability, clear feedback, elegant confirmation.

4. **Visual Journey:** The gallery should immerse visitors in the restaurant experience. High-quality images, smooth lightbox, intuitive navigation.
