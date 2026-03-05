# Agent Prompt — Component Agent | Project: Ristorante Pescheria Belvga
# Branch: feat/components

## STEP 0 — ORIENTATION (MANDATORY BEFORE ANY CODE)
Read in order:
1. docs/ui-guide.md
2. docs/ui-concepts.md
3. docs/tech-stack.md

After reading, output:
- "CONFIRMED: I have read all 3 input documents."
- 3-bullet summary of visual direction
- Full list of components you will build
DO NOT write any code until this step is complete.

## Role
You build the shared UI component library for Ristorante Pescheria Belvga - an elegant seafood restaurant website in Lugano, Switzerland.

You are the ONLY agent that writes to:
  src/components/ui/**
  src/styles/globals.css
  tailwind.config.ts
  src/lib/utils.ts

You DO NOT write:
  - Business logic or API calls
  - Page-level components
  - Anything outside the paths above

## Project Context
- **Name:** Ristorante Pescheria Belvga
- **Character:** Mediterranean elegance meets Swiss precision. Warm, inviting, sophisticated.
- **Tech Stack:** Next.js 15 (App Router), TypeScript, Tailwind CSS v4
- **Languages:** EN, FR, DE (i18n via next-intl)

## Constraints
- Every color, spacing, radius, shadow: CSS variable from ui-guide.md only
- Dark mode: every component must render correctly under [data-theme="dark"]
- All components: TypeScript + JSDoc + forwardRef + className via cn()
- Zero new dependencies — escalate if you need one

## Components to Build

### Core UI Components
1. **Button** - variants: primary, secondary, ghost, accent; sizes: sm, md, lg; states: default, hover, active, disabled, loading
2. **Input** - types: text, email, phone; sizes: md, lg; states: default, focus, error, disabled; supports label, error message
3. **Textarea** - same as Input but multiline
4. **Card** - variants: default, interactive, featured; padding: --space-6; radius: --radius-lg
5. **Badge/Tag** - variants: default, success, warning, info; size: --text-xs
6. **Spinner** - sizes: sm, md, lg
7. **Skeleton** - variants: text, title, image, card
8. **Toast** - variants: success, error, warning, info; auto-dismiss

### Complex Components
9. **Modal** - sizes: sm, md, lg; focus trap; Escape closes; aria-modal
10. **Tabs** - role="tablist/tab/tabpanel"; arrow key navigation; sliding indicator
11. **DatePicker** - calendar picker; keyboard navigable; future dates only mode
12. **Lightbox** - for gallery; image display; prev/next navigation; close button; Escape key

### Layout Components
13. **Header** - logo, navigation links, language switcher, mobile menu toggle
14. **Footer** - address, hours, links, social icons
15. **MobileMenu** - slide-in from left; staggered link animation
16. **LanguageSwitcher** - dropdown with EN/FR/DE options
17. **SkipLink** - accessibility skip to main content

Derived from pages-spec.md. If a component needed by a page is missing from this list, escalate before building.

## Implementation Standards

### TypeScript Interface Pattern
```ts
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'primary' | 'secondary' | 'ghost' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size = 'md', isLoading, className, children, ...props }, ref) => (
    <button ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props}>
      {isLoading ? <Spinner size="sm" aria-hidden /> : children}
    </button>
  )
)
Button.displayName = 'Button'
```

### Accessibility Requirements
- Button: aria-disabled when disabled, aria-busy="true" when loading
- Modal: role="dialog", aria-modal="true", aria-labelledby, focus trap on mount, Escape closes, focus returns to trigger element on close
- Toast: role="alert", aria-live="polite", auto-dismiss with configurable delay
- Tabs: role="tablist/tab/tabpanel", aria-selected, arrow key navigation
- DatePicker: keyboard navigable, aria-label for current date
- Lightbox: role="dialog", Escape closes, arrow keys navigate
- All interactive: focus indicator — 2px solid var(--color-interactive), offset 2px

### CSS Variables
Step 1: Write ALL tokens from ui-guide.md into :root in globals.css — light and dark themes.
Step 2: Map all tokens in tailwind.config.ts.
Step 3: Build cn() helper in src/lib/utils.ts.
Step 4: Build components.

## Output File Tree
```
src/
  styles/globals.css              ← ALL CSS variables, light + dark themes
  lib/utils.ts                    ← cn() helper
  components/ui/
    Button/
      Button.tsx
      index.ts
    Input/
      Input.tsx
      index.ts
    Textarea/
      Textarea.tsx
      index.ts
    Card/
      Card.tsx
      index.ts
    Badge/
      Badge.tsx
      index.ts
    Spinner/
      Spinner.tsx
      index.ts
    Skeleton/
      Skeleton.tsx
      index.ts
    Toast/
      Toast.tsx
      ToastProvider.tsx
      index.ts
    Modal/
      Modal.tsx
      index.ts
    Tabs/
      Tabs.tsx
      index.ts
    DatePicker/
      DatePicker.tsx
      index.ts
    Lightbox/
      Lightbox.tsx
      index.ts
    Header/
      Header.tsx
      index.ts
    Footer/
      Footer.tsx
      index.ts
    MobileMenu/
      MobileMenu.tsx
      index.ts
    LanguageSwitcher/
      LanguageSwitcher.tsx
      index.ts
    SkipLink/
      SkipLink.tsx
      index.ts
    index.ts                      ← barrel exports for all
```

## Definition of Done (MECHANICALLY VERIFIABLE)
All must pass before opening PR:
- [ ] npx tsc --noEmit — zero errors
- [ ] grep -rn "color:#\|background:#\|padding: " src/components/ui/ — zero results
- [ ] grep -rn "console.log" src/components/ui/ — zero results
- [ ] All components in index.ts barrel export
- [ ] Modal: manual test — Tab cycles within modal, Escape closes, focus returns
- [ ] Lightbox: manual test — Escape closes, arrows navigate
- [ ] Dark mode: manual test — all components render correctly under [data-theme="dark"]
- [ ] npx commitlint --last — passes
- [ ] Append to agents/events.log: "[timestamp] component-agent COMPLETED feat/components"
- [ ] PR opened, base: develop

## Escalation → agents/component-agent/escalations.md
Escalate (do not guess) when:
  - CSS variable from your code is not in ui-guide.md
  - Required dependency not in package.json
  - Component referenced in pages-spec.md not in your component list
  - Shared file (globals.css, tailwind.config.ts) needs a change beyond your task

Format:
  [ISO8601] BLOCKING|NON-BLOCKING
  Issue: [description]
  Options considered: [list]
  Recommended resolution: [suggestion]

## Git
Branch: feat/components | Commits: feat(ui): [component] — [what it does]
Run npx commitlint --last before opening PR.
