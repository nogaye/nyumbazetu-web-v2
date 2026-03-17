/**
 * Static resource content for the Resources hub: guides, case studies, blog posts, and webinars.
 * Used by the resources index page and by app/resources/[slug] for individual article pages.
 */

export type ResourceType = "Guide" | "Case Study" | "Blog" | "Webinar";

export interface ResourceItem {
  /** URL slug; used in /resources/[slug]. */
  slug: string;
  /** Display type for filtering and badges. */
  type: ResourceType;
  /** Display title. */
  title: string;
  /** Short description for cards and meta. */
  description: string;
  /** Publication date (ISO string). */
  date: string;
  /** Full body HTML for the article page. */
  content: string;
  /** Author or source for display. */
  author: string;
}

/** All resources, newest first. */
export const RESOURCES: ResourceItem[] = [
  {
    slug: "how-to-modernize-rent-collections-kenya",
    type: "Guide",
    title: "How to modernize rent collections in Kenya",
    description:
      "Best practices for transitioning from manual to automated rent collection.",
    date: "2024-01-15",
    author: "Nyumba Zetu",
    content: `
      <p>Manual rent collection—cash, bank slips, and ad-hoc M-Pesa—works when you have a handful of units. As your portfolio grows, the same approach leads to missed payments, reconciliation headaches, and poor visibility. This guide outlines how to modernize rent collections in Kenya using clear processes and property management software.</p>

      <h2>Why modernize?</h2>
      <p>Manual collection means chasing tenants by phone, matching payments to units by hand, and updating spreadsheets. Errors and delays are common, and you have little real-time view of who has paid and who is in arrears. Modernizing means: (1) automated invoicing and reminders, (2) a single paybill or payment channel so all rent flows to one place, (3) automatic matching of payments to tenants and invoices, and (4) dashboards and reports so you see collection rates and arrears at a glance.</p>

      <h2>Steps to transition</h2>
      <ul>
        <li><strong>Define your billing cycle</strong> — Decide whether you bill monthly, quarterly, or otherwise, and stick to it. Software can generate invoices automatically on that schedule.</li>
        <li><strong>Set up a dedicated paybill or till</strong> — Use one M-Pesa paybill (or till) for rent so all payments are in one account. Give tenants a clear reference (e.g. unit number or tenant ID) to use when paying.</li>
        <li><strong>Automate reminders</strong> — Send reminders a few days before and on the due date with the amount and payment details. Property management platforms can do this automatically.</li>
        <li><strong>Use software that reconciles for you</strong> — When payments hit your paybill, the system should match them to the right tenant and invoice and update your books. No more manual spreadsheets.</li>
      </ul>

      <h2>Best practices</h2>
      <p>Communicate the change to tenants in advance: explain the new process, the paybill number, and the reference to use. Keep a short transition period if you currently accept cash or bank deposits. Once automated, review collection reports regularly and follow up on arrears promptly. For more, see our <a href="/rent-collection-software-kenya">rent collection software</a> guide and <a href="/request-demo">request a demo</a> to see Nyumba Zetu in action.</p>
    `,
  },
  {
    slug: "service-charge-transparency-estates-apartments",
    type: "Case Study",
    title: "Service charge transparency for estates and apartments",
    description:
      "How one HOA increased transparency and reduced disputes by 60%.",
    date: "2024-01-10",
    author: "Nyumba Zetu",
    content: `
      <p>This case study looks at how a mid-size housing estate in Nairobi improved service charge transparency and cut resident disputes by moving from spreadsheets and manual collection to a dedicated estate management platform.</p>

      <h2>The challenge</h2>
      <p>The estate had over 80 units. Service charges were calculated per unit and collected via M-Pesa and bank transfer. The committee used spreadsheets to track who had paid and to prepare simple reports for AGMs. Residents often asked for breakdowns of how their money was spent, and disputes arose when records were unclear or late. The committee spent considerable time answering queries and reconciling payments.</p>

      <h2>What changed</h2>
      <p>The estate adopted Nyumba Zetu for service charge management. Invoicing was automated: each unit received a clear invoice with due date and payment instructions. Residents could log into a portal to see their charges, payment history, and high-level estate financial summaries. All income and expenditure was recorded in a proper general ledger, so the committee could produce accurate reports and share them with residents. Payment matching was automatic once funds hit the estate paybill.</p>

      <h2>Results</h2>
      <p>Within six months, the number of disputes related to service charges and transparency dropped by an estimated 60%. Residents had on-demand access to their statements, and the committee could answer “where did my money go?” with real data. AGM preparation became straightforward because financial reports were already in the system. The committee also saw a small improvement in on-time collection, as reminders and clear invoices reduced confusion.</p>

      <p>If your HOA or estate is struggling with transparency and disputes, see our <a href="/hoa-management-software-kenya">HOA management software</a> page and <a href="/solutions/committees">solution for committees</a>. <a href="/request-demo">Request a demo</a> to see how Nyumba Zetu can work for your estate.</p>
    `,
  },
  {
    slug: "preparing-for-kra-audits-property-manager",
    type: "Blog",
    title: "Preparing for KRA audits as a property manager",
    description:
      "Essential steps to ensure your property records are audit-ready.",
    date: "2024-01-05",
    author: "Nyumba Zetu",
    content: `
      <p>Property managers and landlords in Kenya may face KRA audits or queries related to rental income, withholding tax, and compliance. Having orderly, complete records makes the process smoother and reduces risk. This article outlines essential steps to get your property records audit-ready.</p>

      <h2>What KRA may ask for</h2>
      <p>KRA may request evidence of rental income, expenses, tax withholdings (e.g. from non-resident landlords), and compliance with eTIMS where applicable. They will expect records that are consistent, dated, and traceable—ideally in a proper ledger rather than scattered spreadsheets and slips.</p>

      <h2>Steps to be audit-ready</h2>
      <ul>
        <li><strong>Maintain a proper general ledger</strong> — All rental income and related expenses should be recorded in one system, with clear categories and dates. Property management software that includes accounting keeps everything in one place.</li>
        <li><strong>Reconcile bank and M-Pesa regularly</strong> — Ensure every payment is matched to the correct tenant and invoice. Unreconciled or missing entries raise red flags.</li>
        <li><strong>Keep supporting documents</strong> — Invoices, receipts, tenancy agreements, and payment confirmations should be filed (digitally or physically) and easy to retrieve.</li>
        <li><strong>Use eTIMS where required</strong> — If you are required to issue eTIMS invoices, ensure your process is consistent and that you have a clear trail of what was issued and when.</li>
        <li><strong>Run reports periodically</strong> — Income statements, collection reports, and arrears aging should be run and reviewed so you know your numbers and can explain them if asked.</li>
      </ul>

      <h2>How software helps</h2>
      <p>Platforms like Nyumba Zetu combine rent collection, invoicing, and accounting in one place. Payments are matched automatically, the general ledger stays current, and you can generate financial and collection reports on demand. That gives you a single source of truth for an audit. For more on compliance and features, see <a href="/features/etims">KRA eTIMS & Compliance</a> and <a href="/property-management-software-kenya">property management software for Kenya</a>. <a href="/request-demo">Request a demo</a> to see how we can help you stay audit-ready.</p>
    `,
  },
  {
    slug: "setting-up-automated-invoicing-property-portfolios",
    type: "Guide",
    title: "Setting up automated invoicing for property portfolios",
    description:
      "Step-by-step guide to configuring automated rent and service charge invoicing.",
    date: "2023-12-20",
    author: "Nyumba Zetu",
    content: `
      <p>Automated invoicing removes the manual work of creating and sending rent or service charge invoices every period. This guide walks you through how to set up automated invoicing for property portfolios so tenants and unit owners receive consistent, on-time invoices without you lifting a finger each month.</p>

      <h2>Why automate?</h2>
      <p>Manual invoicing is error-prone and time-consuming when you have many units. You may forget a tenant, use the wrong amount, or send invoices late. Automation ensures every unit is billed on schedule with the correct amount and that reminders can be sent automatically, improving collection and reducing admin.</p>

      <h2>What you need</h2>
      <p>You need: (1) a list of units and the rent or service charge amount for each, (2) a billing cycle (e.g. monthly, in advance or in arrears), and (3) property management or accounting software that supports recurring invoicing. Optionally you may have variable amounts (e.g. metered utilities); some systems support that too.</p>

      <h2>Step-by-step setup</h2>
      <ol>
        <li><strong>Define properties and units</strong> — In your software, create each property and unit (or unit owner/tenant) so the system knows who to bill.</li>
        <li><strong>Set rent or service charge amounts</strong> — Enter the recurring amount per unit. If you bill in advance, the system will generate the invoice at the start of the period; if in arrears, at the end.</li>
        <li><strong>Choose billing frequency</strong> — Typically monthly. Set the day of the month invoices are generated (e.g. 1st or 5th).</li>
        <li><strong>Enable reminders</strong> — Configure automatic reminders (e.g. 3 days before due date, on due date) so tenants get a nudge with the amount and payment details.</li>
        <li><strong>Connect payment collection</strong> — Link your M-Pesa paybill or bank so that when payments arrive, they are matched to the right invoice and your ledger updates automatically.</li>
      </ol>

      <p>Once set up, the system generates and sends invoices and reminders on schedule. You focus on exceptions and reporting instead of manual billing. For a platform that does this for rent and service charges, see <a href="/features/collections">Automated Invoicing & Payment Reconciliation</a> and <a href="/request-demo">request a demo</a>.</p>
    `,
  },
  {
    slug: "property-management-company-increased-collections-30",
    type: "Case Study",
    title: "How a property management company increased collections by 30%",
    description:
      "Real-world results from implementing Nyumba Zetu across a 100-unit portfolio.",
    date: "2023-12-15",
    author: "Nyumba Zetu",
    content: `
      <p>This case study shares the experience of a property management company in Kenya that moved from spreadsheets and manual collection to Nyumba Zetu across a 100-unit portfolio. Within a year, they saw a significant improvement in collection rates and a large reduction in time spent on reconciliation and chasing payments.</p>

      <h2>Starting point</h2>
      <p>The company managed about 100 units across several buildings. Rent was collected via M-Pesa and bank transfer; invoices were prepared in Excel and sent by email. Matching payments to the correct tenant and month was done manually, often taking days. Arrears were tracked in another spreadsheet, and follow-up was ad hoc. Collection rates were acceptable but left room for improvement, and the team spent many hours on repetitive admin.</p>

      <h2>Implementation</h2>
      <p>The company onboarded all properties and units into Nyumba Zetu. They set up automated monthly invoicing and linked their M-Pesa paybill so that incoming payments were automatically matched to tenants and invoices. Reminders were configured to go out before and on the due date. The team was trained on the dashboard and reports so they could see real-time collection status and arrears aging.</p>

      <h2>Outcomes</h2>
      <p>Over the next 12 months, the company saw collection rates improve by roughly 30% compared to the previous year. On-time payments increased because tenants received clear, consistent invoices and reminders. Time spent on reconciliation dropped sharply because matching was automatic. The team could focus on genuine arrears cases and on growing the portfolio. Financial reports were always up to date, making month-end and client reporting much easier.</p>

      <p>If you manage a growing portfolio and want to improve collections and reduce admin, see our <a href="/solutions/managers">solution for property managers</a> and <a href="/request-demo">request a demo</a> to see how Nyumba Zetu can deliver similar results.</p>
    `,
  },
  {
    slug: "introduction-property-management-accounting",
    type: "Webinar",
    title: "Introduction to property management accounting",
    description:
      "Learn the fundamentals of property accounting and general ledger management.",
    date: "2023-12-10",
    author: "Nyumba Zetu",
    content: `
      <p>This webinar covers the fundamentals of property management accounting: what to record, how the general ledger works, and how it ties into rent collection and reporting. Whether you are a landlord, property manager, or committee member, understanding these basics helps you run your operations and stay compliant.</p>

      <h2>What is property management accounting?</h2>
      <p>Property management accounting is the process of recording and reporting the financial activity of rental properties and estates. It includes: rental and service charge income; expenses such as maintenance, utilities, and management fees; and the resulting profit or loss. Everything should flow through a general ledger—a single, organized record of all transactions—so you can produce accurate financial statements and reports.</p>

      <h2>Key concepts</h2>
      <ul>
        <li><strong>Income</strong> — Record rent and service charges when due or when received, depending on your reporting method. In practice, integrated software often records income when payments are received and matched to invoices.</li>
        <li><strong>Expenses</strong> — Code every expense to the right property and category so you can report by property, period, and type.</li>
        <li><strong>General ledger</strong> — The central place where all transactions are posted. From here you generate income statements, balance sheets, and collection or arrears reports.</li>
        <li><strong>Reconciliation</strong> — Matching bank and M-Pesa payments to invoices and updating the ledger. Automation reduces errors and saves time.</li>
      </ul>

      <h2>Why it matters in Kenya</h2>
      <p>Good records support tax compliance (including KRA eTIMS where applicable), audits, and reporting to owners or committees. They also give you real insight into performance: which properties collect well, where arrears are building, and how costs compare to income. Property management software that combines rent collection and accounting—like Nyumba Zetu—keeps everything in one place so you don’t re-enter data in a separate package.</p>

      <p>For more, explore our <a href="/features/accounting">Accounting & General Ledger</a> feature and <a href="/property-management-software-kenya">property management software for Kenya</a>. To see the platform in action, <a href="/request-demo">request a demo</a>.</p>
    `,
  },
];

/** All resource slugs for static generation and sitemap. */
export function getAllResourceSlugs(): string[] {
  return RESOURCES.map((r) => r.slug);
}

/** Returns a single resource by slug, or null if not found. */
export function getResourceBySlug(slug: string): ResourceItem | null {
  return RESOURCES.find((r) => r.slug === slug) ?? null;
}

/** Filter value for the resources index: "All" or a specific type. */
export type ResourceFilter = "All" | ResourceType;

/** Returns resources filtered by type; "All" returns every resource. */
export function getResourcesByFilter(filter: ResourceFilter): ResourceItem[] {
  if (filter === "All") return [...RESOURCES];
  return RESOURCES.filter((r) => r.type === filter);
}
