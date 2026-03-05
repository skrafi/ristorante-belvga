# Accessibility — Ristorante Pescheria Belvga

## WCAG 2.1 AA Compliance

All pages must meet WCAG 2.1 Level AA standards.

---

## Global Requirements

### Color Contrast
- **Normal text:** Minimum 4.5:1 contrast ratio
- **Large text (18px+ bold or 24px+):** Minimum 3:1 contrast ratio
- **UI components:** Minimum 3:1 against adjacent colors

### Focus Management
- All interactive elements must have visible focus indicators
- Focus indicator: `outline: 2px solid var(--color-interactive); outline-offset: 2px`
- Never remove focus outlines without providing an alternative

### Skip Links
- Skip link must be the first focusable element in the page
- Links to main content: `<a href="#main" class="skip-link">Skip to main content</a>`
- Visually hidden until focused

```css
.skip-link {
  position: absolute;
  top: -100px;
  left: 0;
  padding: var(--space-3) var(--space-4);
  background: var(--color-interactive);
  color: var(--color-interactive-foreground);
  z-index: 1000;
  transition: top var(--duration-fast);
}

.skip-link:focus {
  top: 0;
}
```

### Language Attribute
- HTML element must have `lang` attribute matching current language
- EN: `<html lang="en">`
- FR: `<html lang="fr">`
- DE: `<html lang="de">`

---

## Mobile Interaction

### Touch Targets
- **Minimum touch target:** 44×44px for all interactive elements
- Buttons, links, form inputs must meet this minimum
- If visual target is smaller, increase padding or use pseudo-element

### Navigation
- Bottom navigation NOT required (header navigation is sufficient)
- Mobile menu must be easily reachable with thumb

### Swipe Gestures
- Gallery lightbox supports swipe (optional enhancement)
- Must provide button alternatives for all swipe actions

### Thumb Zone
- Primary CTAs should be in bottom 60% of screen on mobile
- "Reserve a Table" button positioned for easy thumb access

---

## Keyboard Navigation

### Global Shortcuts

| Key | Action |
|-----|--------|
| Tab | Move to next interactive element |
| Shift + Tab | Move to previous interactive element |
| Enter / Space | Activate button or link |
| Escape | Close modal, lightbox, or menu |
| Arrow keys | Navigate within menus, tabs, galleries |

### Page-Specific Navigation

**Menu Page (Tabs)**
- Tab: Move to tab list
- Arrow Left/Right: Navigate between tabs
- Enter/Space: Select tab
- Tab: Move to tab panel content

**Gallery Lightbox**
- Escape: Close lightbox
- Arrow Left: Previous image
- Arrow Right: Next image
- Tab: Cycle through close button and navigation arrows

**Reservation Form**
- Tab: Move between form fields
- Arrow keys: Navigate within date picker
- Enter: Submit form (from submit button)

---

## ARIA Requirements by Component

### Modal / Lightbox
```html
<div role="dialog" aria-modal="true" aria-labelledby="dialog-title">
  <h2 id="dialog-title">Image Preview</h2>
  <!-- content -->
</div>
```
- `role="dialog"` or `role="alertdialog"`
- `aria-modal="true"`
- `aria-labelledby` pointing to title element
- Focus trap must be implemented
- Escape key closes dialog
- Focus returns to trigger element on close

### Dropdown Menu
```html
<button aria-haspopup="true" aria-expanded="false">
  Menu
</button>
<ul role="menu" hidden>
  <li role="menuitem"><a href="...">Item</a></li>
</ul>
```
- `aria-haspopup="true"` on trigger
- `aria-expanded` toggles true/false
- `role="menu"` on container
- `role="menuitem"` on items

### Tabs (Menu Page)
```html
<div role="tablist">
  <button role="tab" aria-selected="true" aria-controls="panel-1">Antipasti</button>
  <button role="tab" aria-selected="false" aria-controls="panel-2">Primi</button>
</div>
<div role="tabpanel" id="panel-1">...</div>
```
- `role="tablist"` on container
- `role="tab"` on each tab button
- `aria-selected="true/false"` indicates active tab
- `aria-controls` points to panel ID
- `role="tabpanel"` on content panels

### Toast Notifications
```html
<div role="alert" aria-live="polite">
  Reservation confirmed!
</div>
```
- `role="alert"` for important messages
- `aria-live="polite"` (or `assertive` for critical)
- Auto-dismiss with sufficient time to read

### Form Fields with Errors
```html
<label for="email">Email</label>
<input id="email" type="email" aria-invalid="true" aria-describedby="email-error">
<span id="email-error" role="alert">Please enter a valid email</span>
```
- `aria-invalid="true"` on field with error
- `aria-describedby` points to error message
- Error message has `role="alert"`

### Loading States
```html
<div aria-busy="true" aria-label="Loading menu items">
  <!-- skeleton or spinner -->
</div>
```
- `aria-busy="true"` on container being loaded
- `aria-label` describes what is loading

### Image Gallery
```html
<figure>
  <img src="dish.jpg" alt="Grilled Mediterranean sea bass with herb butter">
  <figcaption>Sea Bass al Forno</figcaption>
</figure>
```
- All images must have descriptive `alt` text
- Decorative images use `alt=""`
- Complex images may use `aria-describedby` for long descriptions

---

## Screen Reader Considerations

### Announcements
- Page title should change on navigation
- Dynamic content changes should be announced
- Form submission success/failure announced

### Reading Order
- Logical heading hierarchy (h1 → h2 → h3)
- No skipped heading levels
- Content order matches visual order

### Alternative Text for Images
- **Food photos:** Describe the dish (e.g., "Pan-seared scallops with cauliflower purée and crispy pancetta")
- **Restaurant photos:** Describe the scene (e.g., "Elegant dining room with white tablecloths and lake view through large windows")
- **Decorative images:** Use empty alt (`alt=""`)

---

## Form Accessibility

### Labels
- All form fields must have associated labels
- Use `<label for="id">` or `aria-labelledby`
- Placeholder is NOT a label

### Required Fields
- Indicate required fields visually (asterisk) and programmatically
- Use `aria-required="true"` or `required` attribute
- Include "(required)" in label text for screen readers

### Error Handling
- Errors announced on submission
- Field-level errors linked with `aria-describedby`
- Clear error messages that explain the fix

### Date Picker
- Keyboard navigable
- Clear indication of selected date
- Available/unavailable dates distinguishable

---

## Testing Checklist

### Automated Testing
- [ ] axe-core / axe-playwright: Zero violations
- [ ] Lighthouse Accessibility: Score ≥95

### Manual Testing
- [ ] Keyboard-only navigation: All functions accessible
- [ ] Screen reader testing (VoiceOver/NVDA): Content makes sense
- [ ] Zoom to 200%: No content overlap or clipping
- [ ] Color contrast: All text meets 4.5:1 minimum

### Mobile Testing
- [ ] Touch targets: All ≥44×44px
- [ ] Screen reader on mobile: Navigation works
- [ ] Orientation: Works in portrait and landscape

---

## Tools

- **axe DevTools:** Browser extension for automated testing
- **WAVE:** Web Accessibility Evaluation Tool
- **VoiceOver:** Built-in Mac screen reader
- **NVDA:** Free Windows screen reader
- **Color Contrast Checker:** WebAIM or similar

---

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Inclusive Components](https://inclusive-components.design/)
- [A11y Project](https://www.a11yproject.com/)
- [MDN Accessibility Guide](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
