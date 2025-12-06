# Angular to Next.js Migration Plan

## Overview
This document outlines the plan to migrate content and pages from the Angular application (`nyumbazetu-angular-web`) to the Next.js application, maintaining the modern design system already established in the Next.js app.

## Key Updates
- ✅ **Legacy Home Page:** Create `/home-legacy` route with all Angular home page sections
- ✅ **Image Migration:** Transfer only images that are actually used in components
- ✅ **Component Isolation:** Create legacy components in separate folder to avoid affecting existing pages
- ✅ **Image Organization:** Structured image storage in `public/legacy/images/` with folder hierarchy

## Current State Analysis

### Angular App Pages/Modules
1. ✅ **Home** - Complex with multiple sections (header, transactions, awards, portfolio, features, screenshots, integrations, stats, testimonials, partners, clients, referral, mobile-app)
2. ❌ **Blogs** - Blog listing and individual blog pages
3. ⚠️ **About** - Exists in Next.js but may need content enhancement
4. ⚠️ **Contact** - Exists in Next.js but may need content enhancement
5. ❌ **Careers** - Simple page with email contact
6. ❌ **FAQs** - FAQ listing page
7. ❌ **Press** - Press/media page
8. ❌ **Partner** - Partner page (uses same module as press)
9. ❌ **Events** - Events & Gallery page
10. ❌ **Newsletters** - Newsletter subscription page
11. ❌ **Privacy** - Privacy policy page
12. ❌ **Terms** - Terms & conditions page
13. ✅ **Error 404** - Exists as `not-found.tsx`
14. ❌ **Error 500** - Server error page

### Next.js App Current Pages
- ✅ Home (`/`)
- ✅ About (`/about`)
- ✅ Contact (`/contact`)
- ✅ Features (`/features`, `/features/[slug]`)
- ✅ Solutions (`/solutions`, `/solutions/[segment]`)
- ✅ Product (`/product`)
- ✅ Pricing (`/pricing`)
- ✅ Resources (`/resources`)
- ✅ Compare (`/compare`)
- ✅ Not Found (`/not-found`)

## Migration Strategy

### Phase 0: Legacy Home Page & Image Migration (Priority: High)
**Goal:** Migrate the Angular home page content to a legacy version without affecting the existing Next.js home page, and transfer all used images.

#### 0.1 Legacy Home Page Structure
- **Option A (Recommended):** Create a separate legacy route
  - **Route:** `/legacy/home` or `/home-legacy`
  - **File Structure:** `app/legacy/home/page.tsx`
  - **Benefits:** 
    - Keeps legacy content separate
    - Easy to reference or compare
    - Can be removed later without affecting main site
- **Option B:** Create legacy folder with all legacy pages
  - **Route:** `/legacy/home`
  - **File Structure:** `app/legacy/home/page.tsx`
  - **Additional:** Can include other legacy pages in same folder
  - **Benefits:**
    - All legacy content in one place
    - Better organization for future cleanup

**Decision:** Use **Option A** - Create `/home-legacy` route for now. Can reorganize into `/legacy` folder later if needed.

#### 0.2 Legacy Home Page Sections
The Angular home page contains the following sections (in order):
1. **home-header** - Hero section with "Forget Everything You Know About Property Management Systems"
2. **home-transactions** - Transactions section
3. **app-headline** - Headline section
4. **app-awards** - Awards carousel (KPRA Trophy, certificates)
5. **app-portfolio** - Portfolio management section
6. **app-features** - Features section
7. **app-screenshots** - Screenshots section (dashboard, grid)
8. **app-integrations** - Integrations section (QuickBooks, WhatsApp, eTIMS)
9. **app-stats** - Stats section with app image
10. **app-testimonials** - Testimonials section
11. **app-partners** - Partners section (banks)
12. **app-request-demo** - Request demo section
13. **app-clients** - Clients section
14. **app-referral** - Referral section
15. **app-mobile-app** - Mobile app download section

**Migration Approach:**
- Create new components in `components/legacy/home/` folder
- Each Angular component becomes a Next.js component
- Use existing Next.js design system where possible
- Preserve original content and structure
- Convert Angular templates to JSX/TSX
- Convert Angular styles to Tailwind CSS

#### 0.3 Image Migration Strategy
**Goal:** Transfer only images that are actually used in the Angular app.

**Image Audit Process:**
1. Scan all Angular component files for image references
2. Create a list of used images with their paths
3. Copy only used images to Next.js `public/` folder
4. Maintain folder structure where logical
5. Update image paths in migrated components

**Images to Migrate (Based on Analysis):**

**Home Page Images:**
- `assets/img/cool-again-nb.jpg` - Header hero image
- `assets/img/nyumbazetu_app.png` - App screenshot in stats
- `assets/img/screenshots/dashboard.png` - Dashboard screenshot
- `assets/img/screenshots/dashboard_rand.png` - Dashboard screenshot (alternative)
- `assets/img/screenshots/grid.png` - Grid screenshot
- `assets/img/awards/kpra-trophy.jpg` - KPRA trophy
- `assets/img/awards/kpra_logo.png` - KPRA logo
- `assets/img/awards/peerage_cert.jpg` - Peerage certificate
- `assets/img/awards/realtors_expo_logo.svg` - Realtors expo logo
- `assets/img/logos/app-store-button.svg` - App Store button
- `assets/img/integrations/quickbooks.png` - QuickBooks logo
- `assets/img/integrations/whatsapp-chatbot.webp` - WhatsApp chatbot
- `assets/img/integrations/etims.png` - eTIMS logo

**Bank/Partner Logos:**
- `assets/img/banks/` folder (all bank logos used in partners component)
  - ncba.png, co-op.png, dtb.png, equity.png, kcb.png, mpesa.svg
  - stanbic.png, iandm.png, absa.png, stanchart.png, gulf.png, prime.png, hfc.png

**Client Logos:**
- `assets/img/clients/` folder (all client logos)
  - All images in main/ subfolder and root

**Other Pages:**
- Blog images from `assets/img/blogs/`
- Event images from `assets/img/events/`
- Team photos from `assets/img/team/` (if used)
- Testimonial images from `assets/img/testimonials/`

**Image Organization in Next.js:**
```
public/
  legacy/
    images/
      home/
        cool-again-nb.jpg
        nyumbazetu_app.png
      screenshots/
        dashboard.png
        dashboard_rand.png
        grid.png
      awards/
        kpra-trophy.jpg
        kpra_logo.png
        peerage_cert.jpg
        realtors_expo_logo.svg
      integrations/
        quickbooks.png
        whatsapp-chatbot.webp
        etims.png
      logos/
        app-store-button.svg
      banks/
        [all bank logos]
      clients/
        [all client logos]
      blogs/
        [blog images]
      events/
        [event images]
      team/
        [team photos if used]
      testimonials/
        [testimonial images]
```

**Image Migration Checklist:**
- [ ] Audit all Angular components for image references
- [ ] Create comprehensive list of used images
- [ ] Copy images to Next.js `public/legacy/images/` maintaining structure
- [ ] Update image paths in migrated components (use `/legacy/images/...`)
- [ ] Optimize images if needed (compress, convert formats)
- [ ] Verify all images load correctly in Next.js

#### 0.4 Legacy Home Page Components
Create the following components in `components/legacy/home/`:

1. **legacy-home-header.tsx** - Hero section
2. **legacy-transactions.tsx** - Transactions section
3. **legacy-headline.tsx** - Headline section
4. **legacy-awards.tsx** - Awards carousel
5. **legacy-portfolio.tsx** - Portfolio section
6. **legacy-features.tsx** - Features section
7. **legacy-screenshots.tsx** - Screenshots section
8. **legacy-integrations.tsx** - Integrations section
9. **legacy-stats.tsx** - Stats section
10. **legacy-testimonials.tsx** - Testimonials section
11. **legacy-partners.tsx** - Partners section
12. **legacy-request-demo.tsx** - Request demo section
13. **legacy-clients.tsx** - Clients section
14. **legacy-referral.tsx** - Referral section
15. **legacy-mobile-app.tsx** - Mobile app section

**Component Migration Process:**
1. Read Angular component HTML and TypeScript files
2. Extract content and data structures
3. Convert to Next.js/React component
4. Apply Next.js design system (Section, Card, etc.)
5. Convert styles to Tailwind CSS
6. Update image paths to new location
7. Test component in isolation

### Phase 1: Legal & Essential Pages (Priority: High)
**Goal:** Migrate essential legal and informational pages that don't affect existing pages.

#### 1.1 Privacy Policy Page
- **Route:** `/privacy`
- **Source:** `nyumbazetu-angular-web/src/app/modules/legal/privacy/privacy.component.html`
- **Content:** Full privacy policy text
- **Design:** Use Next.js design system with Card components, proper typography
- **Status:** New page, no conflicts

#### 1.2 Terms & Conditions Page
- **Route:** `/terms`
- **Source:** `nyumbazetu-angular-web/src/app/modules/legal/terms/terms.component.html`
- **Content:** Full terms text with navigation sidebar
- **Design:** Use Next.js design system with sticky sidebar navigation
- **Status:** New page, no conflicts

#### 1.3 Error 500 Page
- **Route:** `/error` (or custom error boundary)
- **Source:** `nyumbazetu-angular-web/src/app/modules/error/error-500/error-500.component.html`
- **Design:** Match existing `not-found.tsx` style
- **Status:** New page, no conflicts

### Phase 2: Content Pages (Priority: Medium)
**Goal:** Migrate informational and content pages.

#### 2.1 Blogs Section
- **Routes:** 
  - `/blogs` - Blog listing page
  - `/blogs/[slug]` - Individual blog post
- **Source:** 
  - `nyumbazetu-angular-web/src/app/modules/blogs/blogs.component.html`
  - `nyumbazetu-angular-web/src/app/modules/blogs/blogs.data.ts`
  - `nyumbazetu-angular-web/src/app/modules/blogs/blogs.models.ts`
- **Content to Extract:**
  - Blog data structure (IBlog interface)
  - Blog listing component structure
  - Individual blog post template
- **Design:** 
  - Blog listing: Card-based grid layout matching Next.js design
  - Blog post: Article layout with proper typography
- **Status:** New pages, no conflicts

#### 2.2 FAQs Page
- **Route:** `/faqs`
- **Source:** `nyumbazetu-angular-web/src/app/modules/faq/faq.component.html`
- **Content:** FAQ items (need to extract from component)
- **Design:** Accordion-style FAQ using shadcn components or custom accordion
- **Status:** New page, no conflicts

#### 2.3 Careers Page
- **Route:** `/careers`
- **Source:** `nyumbazetu-angular-web/src/app/modules/career/career.component.html`
- **Content:** Simple page with email contact
- **Design:** Use SectionHeader and Card components
- **Status:** New page, no conflicts

### Phase 3: Marketing & Media Pages (Priority: Medium)
**Goal:** Migrate marketing and media-related pages.

#### 3.1 Press Page
- **Route:** `/press`
- **Source:** `nyumbazetu-angular-web/src/app/modules/press/press.component.html`
- **Content:** Press/media information
- **Design:** Use Next.js design system
- **Status:** New page, no conflicts

#### 3.2 Partner Page
- **Route:** `/partner` or `/partners`
- **Source:** `nyumbazetu-angular-web/src/app/modules/press/press.module.ts` (shared with press)
- **Content:** Partner information
- **Design:** Use Next.js design system
- **Status:** New page, no conflicts

#### 3.3 Events Page
- **Route:** `/events`
- **Source:** `nyumbazetu-angular-web/src/app/modules/events/events.component.html`
- **Content:** Events & Gallery content
- **Design:** Gallery grid layout with event cards
- **Status:** New page, no conflicts

#### 3.4 Newsletters Page
- **Route:** `/newsletters`
- **Source:** `nyumbazetu-angular-web/src/app/modules/newsletters/newsletters.component.html`
- **Content:** Newsletter subscription information
- **Note:** Newsletter signup component already exists in Next.js
- **Design:** Use existing NewsletterSignup component
- **Status:** New page, no conflicts

### Phase 4: Content Enhancement (Priority: Low)
**Goal:** Enhance existing pages with content from Angular app.

#### 4.1 About Page Enhancement
- **Current:** Basic about page exists
- **Source:** `nyumbazetu-angular-web/src/app/modules/about/about.component.html`
- **Enhancement:** 
  - Add team section if available
  - Enhance content with Angular app details
  - Keep existing Next.js design
- **Status:** Enhancement, minimal impact

#### 4.2 Contact Page Enhancement
- **Current:** Contact form exists
- **Source:** `nyumbazetu-angular-web/src/app/modules/contact/contact.component.html`
- **Enhancement:**
  - Add office location details
  - Add phone numbers
  - Add business hours
  - Keep existing form design
- **Status:** Enhancement, minimal impact

## Design System Guidelines

### Component Patterns
- Use `Section` component for page sections
- Use `SectionHeader` for section titles
- Use `Card`, `CardContent`, `CardHeader` for content containers
- Use shadcn/ui components (Button, Input, Select, etc.)
- Follow existing typography hierarchy
- Maintain dark mode support

### Styling
- Use Tailwind CSS classes
- Follow existing color scheme (primary gold #b98036, primary blue #344767)
- Use consistent spacing (py-12 md:py-20 lg:py-28 for sections)
- Maintain responsive design patterns

### File Structure
```
app/
  home-legacy/
    page.tsx (Legacy home page)
  blogs/
    [slug]/
      page.tsx
    page.tsx
  careers/
    page.tsx
  events/
    page.tsx
  faqs/
    page.tsx
  newsletters/
    page.tsx
  partner/
    page.tsx
  press/
    page.tsx
  privacy/
    page.tsx
  terms/
    page.tsx
  error/
    page.tsx (or use error.tsx in root)

components/
  legacy/
    home/
      legacy-home-header.tsx
      legacy-transactions.tsx
      legacy-headline.tsx
      legacy-awards.tsx
      legacy-portfolio.tsx
      legacy-features.tsx
      legacy-screenshots.tsx
      legacy-integrations.tsx
      legacy-stats.tsx
      legacy-testimonials.tsx
      legacy-partners.tsx
      legacy-request-demo.tsx
      legacy-clients.tsx
      legacy-referral.tsx
      legacy-mobile-app.tsx

public/
  legacy/
    images/
      home/
      screenshots/
      awards/
      integrations/
      logos/
      banks/
      clients/
      blogs/
      events/
      team/
      testimonials/
```

## Implementation Order

### Week 0: Legacy Home Page & Images (Priority: High)
1. **Image Audit & Migration**
   - [ ] Scan all Angular components for image references
   - [ ] Create list of used images
   - [ ] Copy images to `public/legacy/images/` with proper structure
   - [ ] Verify image paths and accessibility

2. **Legacy Home Page Components**
   - [ ] Create `components/legacy/home/` folder structure
   - [ ] Migrate home-header component
   - [ ] Migrate transactions component
   - [ ] Migrate headline component
   - [ ] Migrate awards component
   - [ ] Migrate portfolio component
   - [ ] Migrate features component
   - [ ] Migrate screenshots component
   - [ ] Migrate integrations component
   - [ ] Migrate stats component
   - [ ] Migrate testimonials component
   - [ ] Migrate partners component
   - [ ] Migrate request-demo component
   - [ ] Migrate clients component
   - [ ] Migrate referral component
   - [ ] Migrate mobile-app component

3. **Legacy Home Page Assembly**
   - [ ] Create `app/home-legacy/page.tsx`
   - [ ] Assemble all legacy components
   - [ ] Test page rendering
   - [ ] Verify responsive design
   - [ ] Test dark mode compatibility

### Week 1: Legal Pages
1. Privacy Policy (`/privacy`)
2. Terms & Conditions (`/terms`)
3. Error 500 page

### Week 2: Content Pages
1. FAQs (`/faqs`)
2. Careers (`/careers`)
3. Blogs listing (`/blogs`)

### Week 3: Marketing Pages
1. Press (`/press`)
2. Partner (`/partner`)
3. Events (`/events`)
4. Newsletters (`/newsletters`)

### Week 4: Enhancement & Polish
1. About page enhancement
2. Contact page enhancement
3. Blog individual post pages
4. Navigation updates
5. Footer updates

## Content Extraction Checklist

### From Angular Components
- [ ] Extract all HTML content
- [ ] Extract TypeScript data/models
- [ ] Extract images/assets paths
- [ ] Document component logic
- [ ] Note any dynamic content sources

### Assets to Migrate (Only Used Images)
**Home Page Images:**
- [ ] Hero images (cool-again-nb.jpg)
- [ ] App screenshots (nyumbazetu_app.png)
- [ ] Dashboard screenshots (dashboard.png, dashboard_rand.png, grid.png)
- [ ] Award images (kpra-trophy.jpg, kpra_logo.png, peerage_cert.jpg, realtors_expo_logo.svg)
- [ ] Integration logos (quickbooks.png, whatsapp-chatbot.webp, etims.png)
- [ ] App store button (app-store-button.svg)

**Bank/Partner Logos:**
- [ ] All bank logos from `assets/img/banks/` folder (12 logos)

**Client Logos:**
- [ ] All client logos from `assets/img/clients/` folder

**Other Pages:**
- [ ] Blog images from `assets/img/blogs/`
- [ ] Event images from `assets/img/events/`
- [ ] Team photos from `assets/img/team/` (if referenced in components)
- [ ] Testimonial images from `assets/img/testimonials/`
- [ ] Press/media assets (if any)
- [ ] Any custom icons or graphics referenced in components

## Navigation Updates

After migration, update:
- [ ] Main navigation menu (add new links)
- [ ] Footer links (add new pages)
- [ ] Sitemap (`app/sitemap.ts`)
- [ ] Robots.txt if needed

## Testing Checklist

For each new page:
- [ ] Page renders correctly
- [ ] Responsive design works (mobile, tablet, desktop)
- [ ] Dark mode works
- [ ] Links work correctly
- [ ] SEO metadata is set
- [ ] No console errors
- [ ] Accessibility (keyboard navigation, screen readers)

## Notes

- **No Breaking Changes:** All new pages will be created without affecting existing pages
- **Legacy Content:** Legacy home page will be separate from main home page, allowing comparison and gradual migration
- **Image Optimization:** Only migrate images that are actually used in components (not all images in assets folder)
- **Design Consistency:** Legacy components will use Next.js design system where possible, but may preserve some original styling for reference
- **Content First:** Focus on extracting and migrating content accurately
- **Progressive Enhancement:** Start with static content, add interactivity later if needed
- **SEO:** Ensure all pages have proper metadata
- **Image Paths:** Update all image paths to use `/legacy/images/` prefix in Next.js

## Next Steps

1. Review and approve this plan
2. Start with Phase 1 (Legal Pages)
3. Extract content from Angular components
4. Create pages following Next.js patterns
5. Test and iterate

