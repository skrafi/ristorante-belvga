# Pages Specification — Ristorante Pescheria Belvga

---

## Home Page

- **URL:** `/{lang}`
- **Render type:** SSG (static with ISR)
- **Auth required:** no
- **Goal:** Captivate visitors and drive them to reserve a table

### Sections and Content

**1. Hero**
- Content: Full-viewport hero image of restaurant/lake view, restaurant name, tagline
- Data: Static
- Actions: "Reserve a Table" CTA button, scroll indicator

**2. Our Story (teaser)**
- Content: Brief paragraph about restaurant philosophy, "Learn More" link to About
- Data: Static (from translations)
- Actions: Link to About page

**3. Featured Dishes**
- Content: 4-6 featured dishes with images, names, short descriptions
- Data: Static (from translations)
- Actions: "View Full Menu" link

**4. Testimonials**
- Content: 3 customer reviews with names and ratings
- Data: Static (from translations)
- Actions: None

**5. Call to Action**
- Content: "Reserve Your Table" headline, subtext, CTA button
- Data: Static
- Actions: "Reserve Now" button → Reserve page

**6. Footer**
- Content: Address, phone, email, opening hours, social links, language switcher
- Data: Static
- Actions: Links to all pages, social media

### Page States
- **Loading:** N/A (static)
- **Empty:** N/A
- **Error:** N/A
- **Success:** Full content displayed

### Accessibility Requirements
- Hero: alt text for background image, sufficient contrast on text overlay
- Testimonials: quote formatting with proper semantics
- All CTAs: keyboard accessible, focus visible

---

## Menu Page

- **URL:** `/{lang}/menu`
- **Render type:** SSG (static with ISR)
- **Auth required:** no
- **Goal:** Showcase the full menu with appetizing descriptions

### Sections and Content

**1. Page Header**
- Content: "Our Menu" title, brief intro paragraph
- Data: Static

**2. Menu Categories**
- Content: Tabbed or scrollable sections for each category:
  - Antipasti (appetizers)
  - Primi (first courses - pasta, risotto)
  - Secondi (main courses - fish, seafood)
  - Dolci (desserts)
  - Vini (wines)
- Data: Static (from translations), structured as:
  - Category name
  - Items with: name, description, price
- Actions: Tab/section navigation

**3. Dietary Notice**
- Content: Note about allergies, dietary requirements
- Data: Static
- Actions: Link to contact for questions

**4. Reserve CTA**
- Content: "Ready to dine with us?" CTA
- Actions: "Reserve a Table" button

### Page States
- **Loading:** N/A (static)
- **Empty:** N/A
- **Error:** N/A
- **Success:** Full menu displayed

### Accessibility Requirements
- Tabs: proper ARIA roles, keyboard navigation
- Prices: clearly formatted
- Long descriptions: sufficient line height

---

## Gallery Page

- **URL:** `/{lang}/gallery`
- **Render type:** SSG (static)
- **Auth required:** no
- **Goal:** Showcase restaurant ambiance and dishes visually

### Sections and Content

**1. Page Header**
- Content: "Gallery" title
- Data: Static

**2. Photo Grid**
- Content: Masonry or grid layout of 20+ photos
  - Dishes (close-ups, plating)
  - Interior (dining room, bar)
  - Exterior (lake view, entrance)
  - Kitchen/chef in action
- Data: Static image URLs
- Actions: Click to open lightbox, navigation in lightbox

**3. Lightbox**
- Content: Full-screen image view with navigation
- Actions: Previous/Next arrows, close button, keyboard navigation

### Page States
- **Loading:** Skeleton placeholders for images
- **Empty:** "Photos coming soon" message
- **Error:** N/A
- **Success:** Full gallery

### Accessibility Requirements
- All images: descriptive alt text
- Lightbox: keyboard navigable, Escape to close
- Focus trap in lightbox

---

## About Page

- **URL:** `/{lang}/about`
- **Render type:** SSG (static)
- **Auth required:** no
- **Goal:** Tell the restaurant's story and build connection

### Sections and Content

**1. Hero Image**
- Content: Chef or restaurant photo
- Data: Static

**2. Our Story**
- Content: Restaurant history, founding story
- Data: Static (from translations)

**3. Our Philosophy**
- Content: Commitment to fresh seafood, sustainability, quality
- Data: Static

**4. Meet the Chef**
- Content: Chef bio, photo, culinary background
- Data: Static

**5. The Location**
- Content: About Lugano, lake views, Ticino region
- Data: Static

### Page States
- **Loading:** N/A (static)
- **Empty:** N/A
- **Error:** N/A
- **Success:** Full content

---

## Contact Page

- **URL:** `/{lang}/contact`
- **Render type:** SSG (static)
- **Auth required:** no
- **Goal:** Provide all contact information and location

### Sections and Content

**1. Page Header**
- Content: "Contact Us" title
- Data: Static

**2. Contact Info**
- Content:
  - Address: Riva Antonio Caccivio, 6900 Lugano, Switzerland
  - Phone: +41 91 XXX XX XX (click-to-call)
  - Email: info@belvga.ch (mailto link)
- Data: Static
- Actions: Click-to-call, email link

**3. Opening Hours**
- Content: Table with days and hours
  - Monday: Closed
  - Tuesday-Sunday: 12:00-14:00, 18:00-22:00
- Data: Static

**4. Map**
- Content: Embedded Google Maps or static map image with link
- Data: Static
- Actions: Open in Google Maps

**5. Reserve CTA**
- Content: "Book Your Table" CTA
- Actions: "Reserve Now" button

### Page States
- **Loading:** N/A (static)
- **Empty:** N/A
- **Error:** N/A
- **Success:** Full content

### Accessibility Requirements
- Phone: tel: link
- Email: mailto: link
- Map: accessible alternative (address link)

---

## Reserve Page

- **URL:** `/{lang}/reserve`
- **Render type:** CSR (client-side, dynamic availability)
- **Auth required:** no
- **Goal:** Enable guests to book a table

### Sections and Content

**1. Page Header**
- Content: "Reserve a Table" title, brief instructions
- Data: Static

**2. Reservation Form**
- Content:
  - Date picker (future dates only)
  - Time slot selector (based on availability)
  - Guest count (1-20)
  - Name (required)
  - Email (required)
  - Phone (required)
  - Special requests (textarea, optional)
- Data: Dynamic (availability from API)
- Actions: Form submission

**3. Availability Check**
- Content: "Checking availability..." loading state
- Data: API response
- Actions: Automatic on date/time change

**4. Confirmation**
- Content: Success message, reservation summary, confirmation number
- Data: API response
- Actions: "Add to Calendar" link (optional)

### Page States
- **Loading:** Form skeleton, availability loading indicator
- **Empty:** N/A
- **Error:** 
  - No availability: "No tables available for this time. Please try another time."
  - Form validation: Field-level error messages
  - Server error: "Something went wrong. Please call us at +41 91 XXX XX XX"
- **Success:** Confirmation message with details

### External Data
- Endpoints:
  - GET /api/v1/availability?date=YYYY-MM-DD&guests=N
  - POST /api/v1/reservations
- Mutations: Form submit → POST /api/v1/reservations

### Edge Cases
- Same-day booking: Check if within opening hours
- Large party (>8): Show note "For parties larger than 8, please call us"
- Past date/time: Disable in picker
- Fully booked date: Show "Fully Booked" badge

### Accessibility Requirements
- All fields: proper labels, aria-required
- Error messages: aria-describedby
- Date picker: keyboard accessible
- Time slots: radio group or buttons

---

## Privacy Policy Page

- **URL:** `/{lang}/privacy`
- **Render type:** SSG (static)
- **Auth required:** no
- **Goal:** GDPR compliance

### Sections and Content
- Content: Standard privacy policy text
- Data: Static (from translations)

---

## 404 Page

- **URL:** `/404`
- **Render type:** SSG
- **Auth required:** no
- **Goal:** Handle missing pages gracefully

### Content
- Message: "Page not found"
- CTA: "Return to Home" link
- Language: Detected from URL or default to EN

---

## 500 Page

- **URL:** `/500`
- **Render type:** SSG
- **Auth required:** no
- **Goal:** Handle server errors gracefully

### Content
- Message: "Something went wrong"
- CTA: "Try Again" and "Return to Home" links
- Contact info: Phone number for reservations
