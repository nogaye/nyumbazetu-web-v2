Here is a **production-grade Cursor prompt** tailored exactly to what you want — focused purely on the **frontend marketing site**, clean, minimal, SEO-friendly, and using mock data.

---

# Nyumba Zetu Vendor Marketplace — Frontend Marketing Site (Cursor Prompt)

## Objective

Build a sleek, minimalistic, SEO-friendly marketing website for the **Nyumba Zetu Vendor Marketplace**.

This is a **frontend-only implementation (Angular + Tailwind CSS)** using **mock data**.

The site should:

* Showcase vendors (listings, profiles, ratings, reviews)
* Clearly communicate value for:

  * Vendors (why join)
  * Property managers (why use)
  * Tenants (why use)
* Drive conversions:

  * “Join as Vendor”
  * “Request a Service”

---

## Design Principles

* Minimal, premium, fintech-like UI
* Clean spacing, strong typography (Inter or similar)
* Soft shadows, rounded cards (2xl)
* Subtle animations (hover, fade-in, AOS-style)
* No clutter (Hick’s Law)
* Strong CTA placement (Fitts’s Law)
* Progressive disclosure (don’t overload UI)
* Mobile-first responsive design

---

## Tech Requirements

* Angular (standalone components preferred)
* Tailwind CSS
* Heroicons
* Mock data (hardcoded JSON or service)
* Reusable components
* SEO-friendly structure (semantic HTML)

---

## Routes / Pages

### Public Routes

* `/services` → Main marketplace landing page
* `/services/vendors` → Vendor listing page
* `/services/vendors/:slug` → Vendor profile page
* `/services/categories/:category` → Category page (plumbing, electrical, etc.)
* `/services/for-vendors` → Vendor marketing page
* `/services/for-managers` → Property manager marketing page
* `/services/how-it-works` → Flow explanation page

---

## 1. Landing Page (`/services`)

### Sections

#### 1. Hero Section

* Headline:
  **“Trusted vendors for property maintenance and services.”**
* Subtext:
  “Find verified plumbers, electricians, cleaners, and more. Compare quotes, track work, and pay with confidence.”
* CTA buttons:

  * Primary: “Request a Service”
  * Secondary: “Join as Vendor”

---

#### 2. How It Works (Core Flow Section)

Show this as a horizontal or vertical step UI:

1. Select property (pre-filled context)
2. Describe issue + upload photos
3. Set urgency
4. Get vendor suggestions
5. Send request & compare quotes

---

#### 3. Featured Vendors

Grid of vendor cards (4–8 items)

Each card:

* Logo
* Name
* Category tags
* Rating ⭐ + count
* “Verified” badge
* Location
* Response time
* CTA: “View Profile”

---

#### 4. Categories Grid

* Plumbing
* Electrical
* Cleaning
* Painting
* Security
* Appliances

Each is a clickable card → routes to category page

---

#### 5. Why Use Nyumba Zetu

Split into 3 columns:

**For Vendors**

* Get consistent jobs
* Build reputation
* Faster payments

**For Property Managers**

* Verified vendors only
* Compare quotes easily
* Track jobs centrally

**For Tenants**

* Easy issue reporting
* Transparent updates
* Trusted vendors

---

#### 6. Trust Section

* Verified vendors
* Real reviews
* Insurance-ready (placeholder)
* Performance tracking

---

#### 7. CTA Section

* “Start finding trusted vendors today”
* Buttons:

  * Request Service
  * Join as Vendor

---

## 2. Vendor Listing Page (`/services/vendors`)

### Layout

* Left sidebar filters
* Right grid of vendor cards

### Filters

* Category
* Location
* Rating
* Verified only toggle
* Availability (optional UI only)

---

### Vendor Card Component

Reusable component with:

* Logo/avatar
* Business name
* Categories
* Rating + review count
* Verified badge
* Location
* Response time
* CTA buttons:

  * View Profile
  * Request Service

---

### Special Section (IMPORTANT)

**“Recommended for Property Managers”**

* Horizontal section at top
* Vendors tagged:

  * “Top Rated”
  * “Fast Response”
  * “Used in your area” (mock label)

---

## 3. Vendor Profile Page (`/services/vendors/:slug`)

### Sections

#### Hero

* Logo
* Name
* Rating
* Verified badge
* Location
* Response time
* CTA:

  * Request Service
  * Save Vendor

---

#### About

* Business description

---

#### Services Offered

List of services:

* Plumbing repair
* Pipe installation
* Emergency fixes

---

#### Portfolio

Grid of images (mock)

---

#### Reviews

* Rating summary (average + breakdown)
* List of reviews:

  * Name (mock)
  * Rating
  * Comment
  * Date

---

#### Trust Badges

* Verified
* Insured (mock)
* Top Rated

---

## 4. Vendor Marketing Page (`/services/for-vendors`)

### Goal: Convert vendors

Sections:

* Hero: “Grow your business with Nyumba Zetu”
* Benefits:

  * More jobs
  * Verified clients
  * Faster payments
  * Reputation building
* How it works (vendor side)
* CTA: “Create Vendor Account”

---

## 5. Property Manager Page (`/services/for-managers`)

### Goal: Convert demand side

Sections:

* Hero: “Manage vendors the smart way”
* Features:

  * Request services by unit/block
  * Compare quotes
  * Track jobs
  * Only verified vendors
* CTA: “Start Using Services”

---

## 6. Components to Build

* VendorCardComponent
* RatingStarsComponent
* ReviewCardComponent
* CategoryCardComponent
* CTASectionComponent
* HowItWorksComponent
* FilterSidebarComponent

---

## 7. Mock Data Structure

Create a mock service:

```ts
vendors = [
  {
    id: 1,
    name: 'ProFix Plumbing',
    category: ['Plumbing'],
    rating: 4.7,
    reviews: 124,
    verified: true,
    location: 'Westlands',
    responseTime: '15 mins',
    description: 'Expert plumbing services...',
    portfolio: ['img1.jpg', 'img2.jpg']
  }
];
```

---

## 8. SEO Requirements

* Use semantic HTML (section, article, header)
* Add meta tags per page
* Use descriptive URLs
* Use proper heading hierarchy (H1, H2, H3)
* Add alt text for images
* Ensure fast load and minimal JS blocking

---

## 9. Styling Guidelines

* Tailwind spacing (p-4, p-6, p-8)
* Rounded cards (rounded-2xl)
* Subtle shadows (shadow-sm / shadow-md)
* Hover effects:

  * scale-105
  * shadow-lg
* Color palette:

  * Primary: #b98036
  * Secondary: #344767

---

## 10. Deliverables

* Fully functional Angular UI (frontend only)
* Mock data wired to components
* Clean component structure
* Responsive design (mobile + desktop)
* Ready for backend integration later

---

## Important Notes

* DO NOT implement backend logic
* DO NOT overcomplicate state management
* PRIORITIZE UI clarity and UX
* Keep everything modular and reusable
* Focus on conversion and trust

---

---

If you want next step, I can generate:

* Angular folder structure + file scaffolding
* Tailwind design tokens for your brand
* Or a pixel-perfect UI spec (like Figma but in code terms)
