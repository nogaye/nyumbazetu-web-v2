Redesign the `/listings` area of `nyumbazetu.com` so it feels like a dedicated property marketplace product, clearly different from the rest of the main Nyumba Zetu marketing website.

High-level goal:
The main Nyumba Zetu website is a SaaS/marketing website for property management software.
The `/listings` section should instead feel like a real estate portal / property marketplace with its own UX language, information architecture, navigation, footer, CTAs, and layout shell.

Core product thinking:
- The main marketing site sells software.
- The listings area helps users browse, search, compare, save, post, and manage property listings.
- `/listings` should feel like a mini-product or sub-brand inside Nyumba Zetu.
- It should still be on-brand, but visually and structurally distinct.
- The user should immediately feel that they have entered a listings marketplace.

What to implement:
1. Create a dedicated listings layout shell for all `/listings/**` routes
2. Give the listings section its own header/navigation
3. Give the listings section its own footer
4. Make the visual design more like a premium property portal and less like a generic SaaS landing page
5. Add strong user journeys for:
   - browsing listings
   - searching/filtering listings
   - posting a listing
   - managing existing listings
   - saving listings
   - contacting an agent / landlord
6. Add clear pathways to a listings portal/dashboard for listers

Design direction:
The listings area should feel:
- premium
- image-forward
- search-first
- utility-driven
- marketplace-oriented
- polished and credible
- modern and conversion-focused

It should NOT feel:
- like the same exact marketing site header/footer reused
- overly corporate
- too fluffy
- too SaaS-landing-page heavy
- too dashboard-like on browse pages

Branding guidance:
- Keep Nyumba Zetu branding consistent
- But create a sub-brand feel such as:
  - “Nyumba Zetu Listings”
  - “Homes by Nyumba Zetu”
  - “Nyumba Zetu Marketplace”
- Use the existing brand system, but adapt the UI language for listings
- The listings section can use slightly more neutral backgrounds, tighter spacing, stronger imagery, more practical UI density, and more search/filter emphasis

Use my brand colors where appropriate:
- Primary: #b98036
- Secondary: #344767
- Tertiary: #e27d60
- Support: #36b9a0

Important UX/Design principles:
Factor in strong UX laws and principles:
- Miller’s Law
- Hick’s Law
- Fitts’s Law
- Jakob’s Law
- Gestalt principles
- Progressive disclosure
- Clear feedback and visibility
- Strong CTA hierarchy
- Excellent scanning and information scent

Architecture requirements:
Build this cleanly with reusable components and route-based layout separation.

Expected structure:
- Main site layout remains unchanged for normal marketing pages
- `/listings/**` uses a dedicated listings shell/layout

Potential route structure:
- `/listings`
- `/listings/search`
- `/listings/:slug`
- `/listings/post`
- `/listings/portal`
- `/listings/portal/my-listings`
- `/listings/portal/new`
- `/listings/portal/leads`
- `/listings/portal/favorites`
- `/listings/portal/settings`

Header requirements for listings shell:
Create a listings-specific header, different from the main marketing nav.

Left side:
- Nyumba Zetu Listings logo/sub-brand treatment
- optional compact location-aware search input

Primary navigation suggestions:
- Rent
- Buy
- Commercial
- Short Stays
- New Developments
- Agents / Landlords

Right side:
- Saved
- Post Listing
- Manage Listings
- Sign In / Account

If user is logged in, show:
- My Listings
- Leads / Inquiries
- Saved
- Dashboard / Portal
- Profile menu

Also include a subtle path back to the main software site, e.g.:
- “Property Management Software”
or
- “Back to Nyumba Zetu”

But do not let the software site links dominate the listings experience.

Footer requirements for listings shell:
Create a listings-specific footer, separate from the main marketing footer.

Suggested footer groups:
1. Browse
- Apartments for Rent
- Houses for Sale
- Commercial Listings
- Short-Term Rentals
- New Developments

2. List Your Property
- Post a Listing
- Pricing / Packages
- Listing Guidelines
- Manage Listings
- Verified Listings

3. Tools
- Saved Listings
- Property Alerts
- Viewing Requests
- Help Center
- Safety Tips

4. Nyumba Zetu
- Main Website
- Property Management Software
- Contact
- Privacy Policy
- Terms

Homepage for `/listings`:
Design a dedicated listings landing page that feels like a marketplace home, not a SaaS homepage.

Recommended sections:
1. Search hero
- strong marketplace headline
- location search
- tabs or segmented controls for Rent / Buy / Commercial / Short Stay
- quick filters
- CTA for “Post Listing”

2. Popular locations / neighborhoods
- visually rich cards
- counts of available listings
- clear drill-down behavior

3. Featured / premium listings
- elegant property cards
- strong imagery
- visible price, location, key facts, badges

4. Browse by category
- apartment
- house
- villa
- commercial
- land
- short stay

5. Why list with us
- benefits for agents, landlords, developers
- visibility, inquiries, easy management

6. Marketplace trust strip
- verified listings
- professional listers
- secure inquiries
- transparent details

7. CTA band
- Post your property
- Manage your listings
- Explore available homes

Results/search page requirements:
Design a proper marketplace results page.

Needs:
- sticky search/filter bar
- optional map/list toggle
- good scanning experience
- fast filtering
- elegant empty states
- responsive layout

Filters to support visually:
- purpose (rent / sale / short stay / commercial)
- price range
- beds
- baths
- property type
- furnished
- parking
- pets allowed
- amenities
- verified only
- location / neighborhood
- sort by newest / price / relevance / featured

Property cards:
- strong image
- price first
- title
- location
- beds / baths / size
- featured / verified badges
- save/favorite button
- quick action for view details
- optionally show posted date or updated date

Listing details page requirements:
Design a premium listing details experience optimized for lead conversion.

Key sections:
- image gallery / hero gallery
- price and headline block
- address / location
- quick facts row
- description
- amenities
- map
- lister/agent card
- inquire / contact CTA
- schedule viewing CTA
- save/share/report
- similar listings carousel

The page should feel serious, high-trust, and conversion-oriented.

Portal / management requirements:
The listings product should have a lister portal area for people posting properties.

Create UX and placeholder structure for:
- My Listings
- Drafts
- Pending Review
- Live Listings
- Expired Listings
- Leads / Inquiries
- Performance / Views / Saves
- New Listing flow
- Billing / Packages
- Profile / Company settings

Portal UX should feel operational and efficient, but still consistent with the listings sub-brand.

Important CTA strategy:
Across the listings section, clearly expose:
- Post Listing
- Manage Listings
- Save Listing
- Contact Agent
- Schedule Viewing

These should be obvious and strategically placed.

Visual design requirements:
Shift the UI language away from generic marketing sections and toward marketplace usability.

Use:
- cleaner surfaces
- better whitespace discipline
- more photo-led design
- subtle borders
- refined shadows
- tighter card systems
- elegant filter chips
- practical typography hierarchy
- premium but restrained styling

Avoid:
- giant fluffy gradient hero sections everywhere
- too much feature-marketing language
- repeating generic SaaS sections
- heavy text blocks
- visual clutter

Implementation guidance:
- use reusable Angular components
- use route-based layout switching
- keep components modular and production-grade
- use Tailwind CSS
- use Heroicons where useful
- optimize for responsive behavior
- ensure accessibility
- create realistic placeholder data and flows
- preserve high performance and maintainability

Please implement or scaffold:
1. Listings layout shell
2. Listings header
3. Listings footer
4. Listings homepage
5. Listings search/results page
6. Listing details page
7. Listings portal/dashboard shell
8. Reusable property card, filter bar, location card, and CTA components

Also:
- tighten the copy so it sounds like a world-class property marketplace
- improve information architecture
- reduce ambiguity
- make the browse journey intuitive
- make the portal journey obvious
- make the whole thing feel like a serious listings website, not just a tab on a SaaS landing page

Deliverables:
- updated route/layout structure
- new components
- polished UI
- consistent marketplace UX
- clean code
- clear separation between main marketing shell and listings shell

Final expectation:
The `/listings` experience should feel like a premium standalone listings marketplace inside Nyumba Zetu, with its own identity, its own user journeys, and its own operational portal for posting and managing listings.