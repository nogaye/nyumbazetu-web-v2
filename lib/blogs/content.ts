/**
 * Static blog content for SEO and thought leadership. Each post targets
 * specific keywords and links to product/solutions pages. Used by the blogs
 * list and /blogs/[slug] pages. Legacy Heroku posts live under /blogs/[id]/[slug]
 * via migrated-content.ts and are merged into the listing here.
 */

import { MIGRATED_BLOG_POSTS } from "@/lib/blogs/migrated-content";

export interface BlogPost {
  /** URL slug; used in /blogs/[slug]. */
  slug: string;
  /** Display title. */
  title: string;
  /** Short summary for cards and meta description. */
  summary: string;
  /** Full body (HTML or React-friendly content). */
  content: string;
  /** Publication date (ISO string). */
  publishedAt: string;
  /** Optional last updated. */
  updatedAt?: string;
  /** Author display name. */
  author: string;
  /** Keywords for meta and SEO. */
  tags: string[];
}

/** All published blog posts, newest first. */
export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "long-rains-rental-maintenance-checklist-kenya",
    title: "Long Rains and Rentals: A Maintenance Checklist for Landlords in Kenya",
    summary:
      "As the long rains arrive, use this practical checklist to reduce leaks, disputes, and emergency repairs—while keeping tenants safe and your books predictable.",
    publishedAt: "2026-04-03",
    author: "Nyumba Zetu",
    tags: ["maintenance", "Kenya", "landlords", "seasonal", "property care"],
    content: `
      <p>The long rains in Kenya typically bring heavier downpours and more humidity. For landlords and property managers, that is not just weather—it is a window when small problems become expensive ones: roof leaks, drainage failures, damp walls, and electrical risks. A short, disciplined maintenance pass in early April helps you protect income, avoid emergency spend, and keep tenant relationships steady.</p>

      <h2>Roof, gutters, and drainage</h2>
      <p>Walk the property (or ask your caretaker or manager to) with a simple checklist: clear gutters and downpipes, check for cracked roofing sheets or loose flashing, and confirm water flows away from foundations. Ponding near walls invites damp and structural stress. If you manage multiple units, record what you find so you can schedule repairs before the heaviest weeks.</p>

      <h2>Electrical safety</h2>
      <p>Wet seasons increase the chance of faults where wiring meets moisture. Ensure external lights, gate motors, and common-area circuits are properly earthed and protected. If tenants report flickering, burning smells, or tripping breakers, treat it as urgent. Good property management software helps you log requests, assign follow-up, and keep an audit trail—useful if an insurer or committee ever asks what was done and when.</p>

      <h2>Plumbing and water ingress</h2>
      <p>Check tanks, pumps, and exposed pipes for leaks. Inside units, look at ceilings under bathrooms and kitchens for stains that may pre-signal leaks from above. Early fixes are almost always cheaper than mold remediation or ceiling replacement after a slow leak.</p>

      <h2>Tenant communication</h2>
      <p>Send a short message reminding tenants how to report leaks and emergencies, and who to contact. Clear channels reduce panic and duplicate work. If you use automated rent reminders and portals, combine seasonal notices with routine billing so operational communication stays in one place.</p>

      <h2>Budget and cash flow</h2>
      <p>Seasonal maintenance is easier when you have visibility on collections and reserves. If you are still reconciling M-Pesa manually, consider moving to a system that matches payments to tenants and invoices automatically—see our guide on <a href="/blogs/how-to-collect-rent-with-mpesa">how to collect rent with M-Pesa</a>. For full operations and accounting in one stack, explore <a href="/property-management-software-kenya">property management software for Kenya</a> or <a href="/request-demo">book a demo</a> to walk through Nyumba Zetu with our team.</p>
    `,
  },
  {
    slug: "how-to-choose-property-manager-kenya",
    title: "How to Choose a Property Manager in Kenya: What to Ask Before You Sign",
    summary:
      "A practical framework for comparing property managers: fees, coverage, reporting, compliance, and fit for your portfolio—plus where to start your search.",
    publishedAt: "2026-04-01",
    author: "Nyumba Zetu",
    tags: ["property managers", "Kenya", "landlords", "outsourcing", "due diligence"],
    content: `
      <p>Hiring a property manager is a strategic decision. The right partner improves collection, reduces vacancy, and keeps maintenance from becoming crises. The wrong fit creates opaque fees, slow responses, and owners who still feel like they are doing everything themselves. Whether you own a few units or a growing portfolio, a structured comparison saves time and reduces regret.</p>

      <h2>Clarify what you are buying</h2>
      <p>Property managers bundle different services: tenant placement, rent collection, maintenance coordination, owner reporting, and sometimes accounting or committee support. Before you meet anyone, list what you must have versus what is optional. That makes proposals comparable and stops you from paying for services you do not need—or discovering gaps after you have signed.</p>

      <h2>Ask about fees and incentives</h2>
      <p>Understand percentage-of-rent, fixed monthly fees, leasing fees, and any mark-ups on maintenance. Ask how arrears are chased and whether you see the same reports your manager sees. Alignment matters: you want a manager who is rewarded for stable occupancy and clean books, not for opaque pass-through costs.</p>

      <h2>Verify coverage and capacity</h2>
      <p>Confirm which areas and property types they actively serve, response-time expectations, and how many units their team realistically handles. If you run apartments, commercial, or mixed-use, ask for relevant references. A manager who excels at single-family homes may not be set up for estates with service charges and AGMs.</p>

      <h2>Compliance and records</h2>
      <p>In Kenya, financial discipline and traceable records matter for tax, committees, and disputes. Ask how they record income and expenses, how owners receive statements, and how maintenance approvals work. The best operators are happy to explain their workflow; they should not rely on informal WhatsApp alone for financial decisions.</p>

      <h2>Where to compare options</h2>
      <p>Once you know your criteria, comparing several firms side by side is much faster than ad-hoc outreach. Nyumba Zetu hosts a dedicated <a href="/services/property-managers">property manager marketplace</a> where you can explore profiles, services, and coverage in one place—built for owners who want clarity before the first call. For software that supports your own management or augments a manager’s reporting, see <a href="/property-management-software-kenya">property management software for Kenya</a> or <a href="/request-demo">request a demo</a>.</p>
    `,
  },
  {
    slug: "how-to-collect-rent-with-mpesa",
    title: "How to Collect Rent with M-Pesa: A Guide for Landlords in Kenya",
    summary:
      "Step-by-step guide to collecting rent via M-Pesa in Kenya: paybill setup, tenant instructions, reconciliation, and how property management software automates the process.",
    publishedAt: "2025-01-15",
    author: "Nyumba Zetu",
    tags: ["M-Pesa", "rent collection", "Kenya", "property management", "landlords"],
    content: `
      <p>In Kenya, M-Pesa is the default way many tenants prefer to pay rent. As a landlord or property manager, collecting rent with M-Pesa is convenient—but without a clear process, matching payments to the right tenant and invoice can become a headache. This guide walks you through how to collect rent with M-Pesa efficiently and how software can automate reconciliation and reporting.</p>

      <h2>Why use M-Pesa for rent collection?</h2>
      <p>M-Pesa is widely used across Kenya for bills and person-to-person payments. Tenants are familiar with it, and it reduces the need for cash or bank visits. For landlords, receiving payments into a paybill or till keeps funds in one place. The challenge is scale: with multiple units and tenants, you need a way to know who paid what and to which invoice. That is where a consistent reference (e.g. unit number or tenant ID) and property management software come in.</p>

      <h2>Setting up M-Pesa for rent collection</h2>
      <p>You typically use a paybill number or till so that all rent payments go to the same M-Pesa account. Tenants are then instructed to use a specific account or reference (e.g. "Unit 4B" or "T-001") when paying. That reference is what allows you—or your software—to match the payment to the correct tenant and rent invoice.</p>

      <h2>Automating reconciliation with property management software</h2>
      <p>When you use property management software like Nyumba Zetu, the platform connects to your M-Pesa paybill or till. When a payment is received, it is pulled into the system and automatically matched to the right tenant and open invoice. You get real-time collection status, and your books stay up to date without manual spreadsheets. Reminders can be sent automatically so tenants know the amount due and payment details.</p>

      <h2>Best practices</h2>
      <ul>
        <li>Use a clear, consistent reference (unit number or tenant ID) so every payment can be matched.</li>
        <li>Include paybill, account/reference, and amount in every reminder or invoice you send.</li>
        <li>Reconcile regularly; with integrated software, this happens as payments arrive.</li>
        <li>Keep full records for accounting and KRA eTIMS compliance.</li>
      </ul>

      <p>For more on rent collection in Kenya, see our guides on <a href="/rent-collection-software-kenya">rent collection software</a> and <a href="/property-management-software-kenya">property management software for Kenya</a>. To see how Nyumba Zetu automates M-Pesa rent collection, <a href="/request-demo">book a free demo</a>.</p>
    `,
  },
  {
    slug: "best-property-management-software-kenya",
    title: "Best Property Management Software in Kenya: What to Look For",
    summary:
      "A practical comparison of what to look for in property management software in Kenya: rent collection, accounting, tenant management, M-Pesa, and compliance.",
    publishedAt: "2025-01-10",
    author: "Nyumba Zetu",
    tags: ["property management software", "Kenya", "comparison", "rent collection", "accounting"],
    content: `
      <p>Choosing the best property management software in Kenya can feel overwhelming when there are many options. This article breaks down the core features and criteria that matter for landlords, property managers, and estates so you can evaluate platforms with confidence.</p>

      <h2>Core features that matter</h2>
      <p><strong>Rent and service charge collection</strong> — The software should support automated invoicing, reminders, and reconciliation. In Kenya, M-Pesa and bank integration are essential so tenants can pay easily and payments are matched to the correct tenant and invoice without manual work.</p>
      <p><strong>Accounting and reporting</strong> — Look for a proper general ledger, financial statements, and reports that support compliance (including KRA eTIMS where relevant). You should be able to see collection rates, arrears, and income vs expenses at a glance.</p>
      <p><strong>Tenant and owner experience</strong> — Portals or apps where tenants can pay, view statements, and submit maintenance requests reduce back-and-forth and improve satisfaction. Owner or investor portals are useful for multi-property or estate management.</p>
      <p><strong>Maintenance and operations</strong> — Tracking maintenance requests, assigning tasks, and keeping an audit trail help you run properties efficiently and avoid disputes.</p>

      <h2>Who is it for?</h2>
      <p>Some products are built for individual landlords with a few units; others target property management companies or housing estates. The best property management software for you depends on your portfolio size, whether you manage your own units or others', and whether you need service charge management (e.g. for HOAs and estates). Nyumba Zetu serves landlords, property managers, committees, developers, and banks—so you can start small and scale.</p>

      <h2>Local fit: Kenya</h2>
      <p>Software that is built for Kenya will integrate with M-Pesa and local banks, support local accounting and tax requirements (e.g. eTIMS), and often offer support in your time zone. Check that the vendor understands the Kenyan market and that your data is hosted and processed in line with your expectations.</p>

      <p>For more, read our pillar page on <a href="/property-management-software-kenya">property management software for Kenya</a>, explore <a href="/solutions">solutions by segment</a>, or <a href="/request-demo">request a demo</a> to see Nyumba Zetu in action.</p>
    `,
  },
  {
    slug: "how-hoas-manage-service-charges",
    title: "How HOAs and Estate Committees Manage Service Charges in Kenya",
    summary:
      "How housing estates and HOAs in Kenya can manage service charge collection, transparency, and reporting—with the right processes and software.",
    publishedAt: "2025-01-05",
    author: "Nyumba Zetu",
    tags: ["HOA", "service charges", "Kenya", "estate management", "committees"],
    content: `
      <p>Housing estates and homeowners associations (HOAs) in Kenya collect service charges from residents to cover common area maintenance, security, utilities, and other shared costs. Doing this fairly and transparently builds trust and reduces disputes. This article explains how HOAs and estate committees can manage service charges effectively, including with dedicated software.</p>

      <h2>What are service charges?</h2>
      <p>Service charges (sometimes called maintenance fees or levies) are regular payments from unit owners or tenants to fund shared expenses: cleaning, security, water, landscaping, repairs to common areas, and so on. They are typically calculated per unit—either a fixed amount or based on unit size—and billed monthly or quarterly.</p>

      <h2>Why transparency matters</h2>
      <p>Residents want to know how much they owe and how the money is spent. When service charge collection and spending are opaque, trust erodes and disputes increase. Best practice is to: (1) define clear billing rules, (2) invoice and collect consistently, (3) record all income and expenditure in a proper ledger, and (4) share summary financial reports (and where appropriate, detailed breakdowns) with residents. Software that supports resident portals can give residents read-only access to their charges and payment history, and sometimes to high-level estate financials.</p>

      <h2>Using software for service charge management</h2>
      <p>Dedicated estate or HOA management software automates billing, collection (including M-Pesa and bank), and reconciliation. It keeps a proper general ledger so records are audit-ready for AGMs and regulators. Committees can document decisions and meetings in the same place. Nyumba Zetu supports committees and HOAs with service charge management, resident communication, and financial reporting—see our <a href="/hoa-management-software-kenya">HOA management software</a> page and <a href="/solutions/committees">solution for committees</a>.</p>

      <h2>Getting started</h2>
      <p>If your estate or HOA is still using spreadsheets and manual collection, moving to a dedicated system can improve accuracy and transparency. Start by clarifying your billing rules and who will use the system (committee, manager, accountant). Then evaluate platforms that support service charge calculation, multi-channel collection, and reporting. Book a <a href="/request-demo">free demo</a> to see how Nyumba Zetu works for estates and HOAs.</p>
    `,
  },
  {
    slug: "property-management-accounting-explained",
    title: "Property Management Accounting Explained: From Rent to Reports",
    summary:
      "How property management accounting works: rent and service charge income, expenses, general ledger, financial reports, and compliance for landlords and managers in Kenya.",
    publishedAt: "2024-12-20",
    author: "Nyumba Zetu",
    tags: ["property accounting", "general ledger", "Kenya", "rent", "financial reports"],
    content: `
      <p>Property management accounting is the process of recording and reporting the financial activity of rental properties and estates: rent and service charge income, expenses (maintenance, utilities, management fees), and the resulting profit or loss. This article explains the basics and how software keeps everything in order for landlords and property managers in Kenya.</p>

      <h2>What goes into property accounting?</h2>
      <p><strong>Income</strong> — Rent from tenants and, for estates, service charges from unit owners or tenants. Income should be recorded when it is due (accrual) or when it is received (cash basis), depending on your reporting needs. In practice, rent collection software will record income when payments are received and matched to invoices.</p>
      <p><strong>Expenses</strong> — Maintenance, repairs, utilities, insurance, management fees, and other operating costs. Each expense should be coded to the right property and category so you can run reports by property, period, and type.</p>
      <p><strong>General ledger</strong> — All transactions (income and expenses) should post to a proper general ledger. That gives you a single source of truth for financial statements, tax reporting, and audits. In Kenya, integration with KRA eTIMS may be required for certain transactions; your software should support that.</p>

      <h2>Reports you need</h2>
      <p>Common reports include: income statement (revenue vs expenses), collection reports (what was due vs collected), arrears aging, and balance sheet. Landlords and managers use these for decision-making; investors and committees use them for transparency and governance. Property management software like Nyumba Zetu generates these reports from the same ledger that receives rent and records expenses, so you do not need to re-enter data in a separate accounting package.</p>

      <h2>Compliance in Kenya</h2>
      <p>Depending on your structure and size, you may need to comply with KRA eTIMS, keep records for audits, and report to owners or committees. Software that maintains a full audit trail and supports eTIMS integration reduces compliance risk and saves time at year-end.</p>

      <p>For a platform that combines rent collection, accounting, and reporting in one place, see <a href="/property-management-software-kenya">property management software for Kenya</a> and <a href="/features">features</a>. To see it in action, <a href="/request-demo">request a demo</a>.</p>
    `,
  },
];

/** Returns all blog slugs for static generation and sitemap. */
export function getAllBlogSlugs(): string[] {
  return BLOG_POSTS.map((p) => p.slug);
}

/** Returns a single post by slug, or null if not found. */
export function getBlogPostBySlug(slug: string): BlogPost | null {
  return BLOG_POSTS.find((p) => p.slug === slug) ?? null;
}

/**
 * One row for the /blogs index: either a legacy URL (/blogs/{id}/{slug}) or a
 * newer single-segment post (/blogs/{slug}).
 */
export interface BlogListingEntry {
  /** Next.js href, e.g. /blogs/114/foo or /blogs/how-to-collect-rent. */
  href: string;
  /** Card and H1 title. */
  title: string;
  /** Excerpt for the listing card. */
  summary: string;
  /** Byline. */
  author: string;
  /** Sort key and display date (ISO YYYY-MM-DD). */
  publishedAt: string;
  /** Topic chips (may be empty). */
  tags: string[];
}

/**
 * Returns `/blogs`-route posts only (legacy URLs plus `BLOG_POSTS`). For the full index that
 * also includes `Blog`-typed articles under `/resources/[slug]`, use `getAllUnifiedBlogEntries`
 * from `unified-blog-list.ts` (used by `/blogs` and `/resources?type=Blog`).
 * @returns Sorted array of href + metadata for each post.
 */
export function getAllBlogListingEntries(): BlogListingEntry[] {
  const migrated: BlogListingEntry[] = MIGRATED_BLOG_POSTS.map((p) => ({
    href: `/blogs/${p.legacyId}/${p.slug}`,
    title: p.title,
    summary: p.summary,
    author: p.author,
    publishedAt: p.publishedAt,
    tags: p.tags,
  }));
  const newer: BlogListingEntry[] = BLOG_POSTS.map((p) => ({
    href: `/blogs/${p.slug}`,
    title: p.title,
    summary: p.summary,
    author: p.author,
    publishedAt: p.publishedAt,
    tags: p.tags,
  }));
  return [...migrated, ...newer].sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt)
  );
}
