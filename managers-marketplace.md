Create a sleek, production-quality **Property Manager Marketplace** frontend page for the Nyumba Zetu ecosystem.

## Objective
Build a **dedicated marketplace experience** where **property owners / landlords can discover, compare, and contact property managers** who are looking for more properties to manage.

This is **not** the maintenance vendors marketplace.
This is a separate, dedicated marketplace for **property management service providers**.

The goal is to make it feel like a premium, trustworthy, modern B2B marketplace that is:
- minimalistic
- polished
- conversion-focused
- SEO-friendly
- mobile responsive
- visually clean
- high trust
- enterprise-grade

Use **mock data only** for now.

---

## Tech / Stack
Use:
- **Angular**
- **Tailwind CSS**
- standalone components if appropriate
- clean reusable components
- strongly typed mock interfaces
- signal-friendly / modern Angular patterns where appropriate

Do not focus on backend integration yet.
Do not use hardcoded messy inline logic.
Keep the architecture clean and componentized.

---

## Core Product Positioning
This page is for:

### Property Owners / Landlords
They want to:
- find a qualified property manager
- compare companies
- evaluate trust
- check location coverage
- check property types managed
- check pricing model
- request contact / consultation

### Property Managers
They want to:
- market their company
- generate leads
- show credibility
- display reviews, portfolio, and services
- get more properties to manage

---

## UX Goal
The page should immediately answer:
- Why should I trust these property managers?
- Which one is best for my type of property?
- What areas do they serve?
- How do they charge?
- How do I contact them?

The design should feel like:
- premium marketplace
- strong trust signals
- clear CTAs
- easy scanning
- low friction

---

## Page Structure

### 1. Hero Section
Create a clean hero section with:
- headline such as: **Find the Right Property Manager for Your Property**
- short supporting text
- primary CTA: **Find a Property Manager**
- secondary CTA: **List Your Property Management Company**
- optional supporting trust stats:
  - number of managers
  - number of properties managed
  - average rating
  - cities covered

Hero should feel premium and confident, not noisy.

---

### 2. Search + Filter Bar
Add a prominent search and filtering section.

Filters should include:
- location / area served
- property type
- pricing model
- minimum rating
- services offered
- company size / portfolio size
- verified only toggle

Examples of property types:
- Residential
- Commercial
- Mixed Use
- Student Housing
- Airbnb / Short Stay
- Estates / Communities

Examples of pricing models:
- Percentage of rent
- Fixed monthly fee
- Per unit pricing
- Custom quote

Make filters visually elegant and easy to use.

---

### 3. Featured Property Managers Section
Add a section for featured/highlighted property managers near the top.

Each featured card should show:
- company logo/avatar
- company name
- rating + number of reviews
- short tagline
- areas served
- property types managed
- number of units/properties managed
- pricing summary
- verified badge if applicable
- CTA buttons:
  - View Profile
  - Contact
  - Request Consultation

Cards should feel premium, modern, and highly scannable.

---

### 4. Main Marketplace Listing Grid
Create the main marketplace list/grid of property manager cards.

Each card should include:
- logo or initials
- company name
- short description
- trust badges
- rating
- review count
- response time
- occupancy/performance style metric if appropriate
- service areas
- specialties
- pricing model
- portfolio size
- years of experience
- CTA button

Support:
- card view
- optional list/grid toggle
- sorting options

Sorting options:
- Recommended
- Highest Rated
- Most Reviewed
- Fastest Response
- Largest Portfolio
- Newest

---

### 5. Property Manager Profile Preview / Expanded Details
Create a richer profile view or expandable card state that can show:

- overview
- about the company
- services offered
- areas served
- property types handled
- sample pricing
- years in business
- number of staff
- portfolio metrics
- testimonials / reviews
- certifications / compliance badges
- languages spoken
- contact options

Optional tabs:
- Overview
- Services
- Reviews
- Pricing
- Coverage

---

### 6. Why Use This Marketplace Section
Add a marketing section explaining the benefits for owners.

Examples:
- Compare trusted property managers in one place
- See reviews and service coverage
- Find the right fit for your property type
- Save time on outreach
- Request consultations directly

Use icon-supported benefit cards.

---

### 7. Why List Your Company Section
A dedicated section for property managers to join the marketplace.

Explain benefits like:
- Get discovered by landlords and property owners
- Generate high-intent leads
- Build trust with verified profiles and reviews
- Showcase your portfolio and expertise
- Grow your management business

CTA:
- **List Your Company**
- **Become a Featured Manager**

---

### 8. Testimonials / Social Proof
Add a testimonial/review section from landlords or property owners.

Examples:
- “We found a better property manager in under a day.”
- “The comparison experience made it easy to choose.”
- “Great visibility for our property management company.”

Keep it polished and credible.

---

### 9. FAQ Section
Add SEO-friendly FAQ accordion.

Examples:
- How do I choose the right property manager?
- How are property managers verified?
- Can I contact multiple managers?
- Do property managers specialize by property type?
- How do pricing models work?
- Can I list my company on the marketplace?

---

### 10. Final CTA Section
Strong closing CTA section with two paths:
- **Find a Property Manager**
- **List Your Property Management Company**

---

## Design Guidelines
The UI should be:
- elegant
- clean
- premium
- minimal
- spacious
- modern
- trust-driven

Use:
- soft shadows
- rounded corners
- subtle borders
- balanced spacing
- consistent typography hierarchy
- tasteful badges
- restrained use of accent colors
- professional iconography

Avoid:
- clutter
- overly playful visuals
- cheap marketplace aesthetics
- crowded cards
- noisy gradients everywhere

Make it feel like a serious, high-quality proptech platform.

---

## Important Product Distinction
This marketplace is specifically for **property management providers**, not technicians or maintenance vendors.

Do not mix in:
- plumbers
- electricians
- cleaners
- handymen

This is a separate category of marketplace focused on:
- acquiring properties to manage
- matching owners with property managers
- long-term service relationships

---

## Recommended Components
Break the page into reusable components such as:
- hero section
- search/filter bar
- featured manager cards
- manager listing card
- manager profile preview
- benefits section
- testimonials section
- faq section
- CTA banner

Keep components modular and reusable.

---

## Mock Data
Create realistic mock property manager data with fields like:
- id
- slug
- companyName
- logoUrl or initials
- shortDescription
- fullDescription
- rating
- reviewCount
- yearsExperience
- unitsManaged
- propertiesManaged
- serviceAreas
- propertyTypes
- pricingModel
- pricingSummary
- verified
- featured
- responseTime
- specialties
- languages
- badges
- testimonials
- contactEmail
- contactPhone
- consultationAvailable

Use believable Kenyan / urban real-estate-inspired examples where appropriate, but keep the product globally polished.

---

## SEO
Ensure the page is structured in an SEO-friendly way:
- semantic headings
- proper section structure
- FAQ content
- descriptive copy
- trust-oriented content
- discoverability for searches related to:
  - property managers
  - property management companies
  - find a property manager
  - landlord property management services

---

## Conversion Focus
The page should optimize for:
1. landlords finding a property manager
2. property managers signing up to be listed

Each major section should support one of those goals.

---

## Deliverables
Generate:
1. Angular page/component structure
2. reusable child components
3. typed mock data model
4. clean Tailwind styling
5. responsive layout
6. elegant sample content
7. good empty states if no results match filters
8. sorting/filtering UI with mock behavior
9. strong CTA placement throughout

Make the output feel like something that could ship as the first polished version of a serious property manager marketplace.