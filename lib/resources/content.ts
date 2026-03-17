/**
 * Static resource content for the Resources hub: guides, case studies, blog posts, and webinars.
 * Used by the resources index page and by app/resources/[slug] for individual article pages.
 * Content is written for the Kenyan property market, SEO (titles, meta descriptions, keywords,
 * semantic HTML), and readability; internal links support discovery of product pages.
 */

export type ResourceType = "Guide" | "Case Study" | "Blog" | "Webinar";

/** Optional featured image for the article (path from public root, used for OG and in-article). */
export interface ResourceImage {
  /** Path from site root, e.g. /images/features/feature-collections.jpg. */
  src: string;
  /** Alt text for accessibility and SEO. */
  alt: string;
}

export interface ResourceItem {
  /** URL slug; used in /resources/[slug]. */
  slug: string;
  /** Display type for filtering and badges. */
  type: ResourceType;
  /** Display title. */
  title: string;
  /** Short description for cards and meta (aim 150–160 chars for meta description). */
  description: string;
  /** Publication date (ISO string). */
  date: string;
  /** Full body HTML for the article page. */
  content: string;
  /** Author or source for display. */
  author: string;
  /** Optional featured image; used for OG/Twitter and above-the-fold on article page. */
  image?: ResourceImage;
  /** Keywords for meta keywords and Article schema. */
  keywords?: string[];
}

/** All resources, newest first. */
export const RESOURCES: ResourceItem[] = [
  {
    slug: "agentic-ai-for-property-management-kenya",
    type: "Guide",
    title: "Agentic AI for property management in Kenya: where it helps and where it should not act alone",
    description:
      "A practical 2026 guide to agentic AI in property operations: task planning, workflows, approvals, and the controls every Kenyan manager should keep.",
    date: "2026-03-10",
    author: "Nyumba Zetu",
    image: {
      src: "/images/features/feature-tasks.jpg",
      alt: "Agentic AI workflow planning and task automation for property managers in Kenya",
    },
    keywords: [
      "agentic AI property management",
      "AI workflows Kenya",
      "real estate AI",
      "property operations automation",
    ],
    content: `
      <p>Agentic AI is moving beyond chatbots. In property management, it can help coordinate multi-step work such as chasing arrears, creating maintenance tickets, routing approvals, and drafting tenant messages. The best use cases are the ones that save time but still keep humans in charge of money, legal decisions, and sensitive disputes.</p>

      <h2>Where agentic AI is useful</h2>
      <p>Think of repeatable workflows with clear inputs and outputs: identify overdue invoices, draft reminders, open a task, assign it to a team member, and escalate if there is no response. That is more valuable than asking a model to “manage the property” in the abstract.</p>

      <h2>Where humans must stay involved</h2>
      <p>Never let an automated system make final decisions about eviction, legal notices, deposits, refunds, or financial write-offs without review. The agent can prepare a recommendation, but a manager should approve the final action.</p>

      <h2>How to implement safely</h2>
      <ul>
        <li><strong>Start with low-risk tasks</strong> — reminders, summaries, and task routing.</li>
        <li><strong>Add approval gates</strong> — anything that affects tenants, money, or compliance should require a human sign-off.</li>
        <li><strong>Keep logs</strong> — record what the agent did, what data it used, and who approved the result.</li>
      </ul>

      <h2>What current industry work suggests</h2>
      <p>Recent coverage from firms like <a href="https://www.forbes.com/sites/deloitte/2026/01/21/how-agentic-physical-and-sovereign-ai-are-rewriting-the-rules-of-enterprise-innovation/" target="_blank" rel="noreferrer">Deloitte via Forbes</a> and <a href="https://aws.amazon.com/nova/act/" target="_blank" rel="noreferrer">AWS</a> shows that agentic AI is being used for real workflow automation, not just content generation. In real estate, that means practical gains when the workflow is defined and auditable. See also <a href="/features/tasks">task automation</a>, <a href="/features/communications">tenant communications</a>, and <a href="/request-demo">request a demo</a>.</p>
    `,
  },
  {
    slug: "ai-property-maintenance-predictive-approach-kenya",
    type: "Blog",
    title: "How AI can improve property maintenance planning in Kenya",
    description:
      "Use AI to spot maintenance patterns earlier, prioritise repairs, and reduce downtime—without replacing good inspections and vendor control.",
    date: "2026-02-24",
    author: "Nyumba Zetu",
    image: {
      src: "/images/features/feature-maintenance.jpg",
      alt: "AI-assisted property maintenance planning and work order triage in Kenya",
    },
    keywords: [
      "AI maintenance Kenya",
      "predictive maintenance real estate",
      "property repairs AI",
      "work order automation",
    ],
    content: `
      <p>Maintenance is one of the best places to apply AI in real estate because the data is structured enough to be useful: request type, property, frequency, cost, and resolution time. AI can help turn that history into better planning.</p>

      <h2>What AI can do well</h2>
      <p>AI can cluster recurring issues, identify properties with unusually high repair spend, and suggest preventive work before a small issue becomes an expensive outage. It can also summarise work order history so managers know what keeps failing.</p>

      <h2>What AI cannot replace</h2>
      <p>An AI model cannot inspect a leaking roof, verify electrical safety, or judge whether a vendor quote is fair without real context. Use it to assist planning, not to replace physical inspection or accountability.</p>

      <h2>Best practice workflow</h2>
      <p>Collect maintenance requests in one system, categorise them properly, and link them to cost and completion data. Over time, the pattern reveals whether a building needs preventive action. Nyumba Zetu’s <a href="/features/maintenance">maintenance tools</a>, <a href="/features/expense-vendor-management">vendor management</a>, and <a href="/features/reports">reports</a> are designed for that kind of visibility. <a href="/request-demo">Request a demo</a> to see the workflow.</p>
    `,
  },
  {
    slug: "ai-leasing-assistants-real-estate-kenya",
    type: "Guide",
    title: "AI leasing assistants for real estate teams in Kenya",
    description:
      "A guide to using AI for lead qualification, viewing scheduling, FAQs, and application follow-up while keeping the human sales touch where it matters.",
    date: "2026-02-05",
    author: "Nyumba Zetu",
    image: {
      src: "/images/features/feature-lease-applications.jpg",
      alt: "AI leasing assistant for tenant applications and viewing follow-up in Kenya",
    },
    keywords: [
      "AI leasing assistant",
      "real estate lead qualification",
      "tenant applications AI",
      "property leasing automation",
    ],
    content: `
      <p>Leasing teams spend a lot of time answering the same questions: availability, rent, parking, requirements, and viewing slots. An AI assistant can handle the repetitive part quickly so your team can focus on the leads most likely to convert.</p>

      <h2>What to automate</h2>
      <p>Use AI to answer FAQs, suggest available viewing times, collect basic application information, and summarise each lead before handoff. This reduces response delays and improves the applicant experience.</p>

      <h2>What to keep manual</h2>
      <p>Do not let automation approve applicants, change pricing without review, or make promises about lease terms. Final decisions should remain with a human leasing or property manager.</p>

      <h2>Why this matters in practice</h2>
      <p>Real estate prospects move quickly. A prompt, consistent response can be the difference between a signed lease and a lost lead. See <a href="/features/lease-applications">lease applications</a>, <a href="/features/crm">CRM</a>, and <a href="/request-demo">request a demo</a> to learn how Nyumba Zetu supports the full leasing journey.</p>
    `,
  },
  {
    slug: "ai-governance-for-property-teams",
    type: "Blog",
    title: "AI governance for property teams: policies, approvals, and audit trails",
    description:
      "Practical governance for real estate AI: what to permit, what to review, and how to keep property decisions explainable and defensible.",
    date: "2026-01-20",
    author: "Nyumba Zetu",
    image: {
      src: "/images/features/feature-reports.jpg",
      alt: "AI governance, reporting, and audit trail management for property teams",
    },
    keywords: [
      "AI governance real estate",
      "property AI policy",
      "audit trail AI",
      "AI risk management",
    ],
    content: `
      <p>As AI becomes more useful, governance becomes more important. Property teams deal with tenant data, payment records, maintenance issues, and legal notices, so AI needs rules just like any other operational tool.</p>

      <h2>Set boundaries first</h2>
      <p>Define which tasks AI may perform independently and which tasks require approval. A good boundary is whether the action affects money, rights, safety, or compliance.</p>

      <h2>Track the full trail</h2>
      <p>Keep a record of the prompt or input, the output, the person who reviewed it, and the final action taken. If a tenant disputes a notice or a manager questions a recommendation, you should be able to explain what happened.</p>

      <h2>Build around real workflows</h2>
      <p>Governance should live inside the product, not as a policy document no one reads. Nyumba Zetu’s <a href="/features/reports">reports</a>, <a href="/features/communications">communications</a>, and <a href="/features/tasks">tasks</a> features are the right place to enforce human review. For more context, compare this with broader enterprise AI governance discussions from <a href="https://www.forbes.com/sites/deloitte/2026/01/21/how-agentic-physical-and-sovereign-ai-are-rewriting-the-rules-of-enterprise-innovation/" target="_blank" rel="noreferrer">Deloitte</a> and <a href="https://aws.amazon.com/blogs/machine-learning/ai-agent-driven-browser-automation-for-enterprise-workflow-management/" target="_blank" rel="noreferrer">AWS</a>.</p>
    `,
  },
  {
    slug: "technology-shaping-real-estate-2026",
    type: "Blog",
    title: "Technology shaping real estate in 2026: AI, automation, and smarter operations",
    description:
      "A forward-looking summary of the tech trends shaping real estate in 2026, with practical advice for landlords, committees, and managers in Kenya.",
    date: "2026-01-08",
    author: "Nyumba Zetu",
    image: {
      src: "/images/features/feature-dashboard.jpg",
      alt: "Real estate technology dashboard for modern property operations in Kenya",
    },
    keywords: [
      "real estate technology 2026",
      "AI in property management",
      "property technology Kenya",
      "real estate automation",
    ],
    content: `
      <p>Real estate technology in 2026 is less about isolated tools and more about connected operations. The strongest platforms combine collections, accounting, maintenance, communications, and reporting so data flows once and gets reused many times.</p>

      <h2>Three trends to watch</h2>
      <p>First, AI is moving into workflow execution rather than just text generation. Second, predictive analytics is helping teams identify risk earlier, from arrears to maintenance. Third, owners and residents expect faster, clearer digital communication.</p>

      <h2>What this means for Kenya</h2>
      <p>Local market realities still matter: M-Pesa reconciliation, HOA transparency, service charge reporting, and compliance. Technology only works when it fits those workflows instead of forcing teams into generic global templates.</p>

      <h2>How to stay ahead</h2>
      <p>Choose systems that are easy to use, auditable, and built for the property types you manage. Start with practical automation, measure the result, then expand. Explore <a href="/property-management-software-kenya">property management software in Kenya</a>, <a href="/features/accounting">accounting</a>, and <a href="/features/reports">reporting</a>, or <a href="/request-demo">request a demo</a>.</p>
    `,
  },
  {
    slug: "tenant-onboarding-checklist-kenya-landlords",
    type: "Guide",
    title: "Tenant onboarding checklist for landlords in Kenya",
    description:
      "A practical checklist for Kenyan landlords: applications, references, lease signing, inventory, and first rent—so every tenancy starts on solid ground.",
    date: "2025-03-10",
    author: "Nyumba Zetu",
    image: {
      src: "/images/features/feature-lease-applications.jpg",
      alt: "Tenant applications and lease onboarding for rental property in Kenya",
    },
    keywords: [
      "tenant onboarding Kenya",
      "landlord checklist",
      "rental lease Kenya",
      "tenant screening",
    ],
    content: `
      <p>Strong tenant onboarding reduces disputes later and protects your income. This guide gives landlords and property managers in Kenya a clear, repeatable process from application to first payment.</p>

      <h2>Before you offer the unit</h2>
      <p>Verify that the applicant can afford the rent (typically rent should not exceed a reasonable share of stated income). Ask for employment or business references and, where practical, a previous landlord reference. Keep records of what you collected—consistency helps if questions arise later.</p>

      <h2>Lease and legal basics</h2>
      <p>Use a written tenancy agreement that states rent amount, due date, deposit, notice periods, and rules on subletting and alterations. Both parties should sign; provide a copy to the tenant. If you use digital lease tools, ensure signatures and versions are stored securely.</p>

      <h2>Move-in day</h2>
      <ul>
        <li><strong>Inventory</strong> — Walk through with the tenant and note the condition of fixtures, paint, and fittings. Photos dated on the day are invaluable.</li>
        <li><strong>Keys and access</strong> — Hand over keys only after deposit and first period’s rent are received as agreed.</li>
        <li><strong>Payment instructions</strong> — Give clear M-Pesa paybill or bank details and the reference format tenants must use.</li>
      </ul>

      <h2>After move-in</h2>
      <p>Send a short welcome message with emergency contacts and how to report maintenance. If you use <a href="/property-management-software-kenya">property management software</a>, tenants can see invoices and pay on time through automated reminders. Explore <a href="/features/collections">automated invoicing</a> or <a href="/request-demo">request a demo</a> to see how Nyumba Zetu supports the full rental cycle.</p>
    `,
  },
  {
    slug: "pricing-rental-units-nairobi-mombasa",
    type: "Blog",
    title: "How to price rental units in Nairobi, Mombasa, and other Kenyan cities",
    description:
      "Data-informed tips for setting rent: location, amenities, comparables, and seasonality—without leaving money on the table or sitting empty.",
    date: "2025-03-05",
    author: "Nyumba Zetu",
    image: {
      src: "/images/features/feature-listings.jpg",
      alt: "Rental property listings and market positioning in Kenya",
    },
    keywords: [
      "rental pricing Kenya",
      "Nairobi rent",
      "Mombasa rental market",
      "landlord pricing strategy",
    ],
    content: `
      <p>Setting the right rent balances income against vacancy. Price too high and the unit sits empty; too low and you subsidise the market. Here is a professional framework landlords use in Kenya’s main cities.</p>

      <h2>Start with comparables</h2>
      <p>Look at similar units in the same neighbourhood: size, bedrooms, parking, security, and proximity to transport and schools. Online listings and agent briefings help, but ground truth from recent lets in your building or street matters most. Adjust for floor level, natural light, and finish quality.</p>

      <h2>Factor in your costs</h2>
      <p>Mortgage, service charge, insurance, and maintenance are not the tenant’s problem directly, but they define your break-even. If service charges rise, you may need to review rent at renewal—subject to lease terms and market conditions.</p>

      <h2>Seasonality and positioning</h2>
      <p>Demand often peaks before school terms and after bonuses. If you need a quick let, a slight discount for the first month or inclusive service charge can speed uptake. Once let, consistent invoicing and clear communication support renewals. Tools that combine <a href="/features/listings">listings</a> with <a href="/rent-collection-software-kenya">rent collection</a> help you track performance across units. <a href="/request-demo">Request a demo</a> to see how Nyumba Zetu ties pricing decisions to collection data.</p>
    `,
  },
  {
    slug: "mpesa-rent-collection-mistakes-landlords",
    type: "Blog",
    title: "Seven M-Pesa rent collection mistakes Kenyan landlords should avoid",
    description:
      "Common M-Pesa pitfalls—wrong references, mixed tills, missing reconciliations—and how to fix them for cleaner books and fewer tenant disputes.",
    date: "2025-02-28",
    author: "Nyumba Zetu",
    image: {
      src: "/images/features/feature-collections.jpg",
      alt: "M-Pesa and digital rent collection for Kenyan landlords",
    },
    keywords: [
      "M-Pesa rent Kenya",
      "rent collection mistakes",
      "paybill reconciliation",
      "landlord M-Pesa",
    ],
    content: `
      <p>M-Pesa transformed rent collection in Kenya, but informal use still causes reconciliation pain. These are the mistakes we see most often—and how to avoid them.</p>

      <h2>1. One till for business and personal use</h2>
      <p>Mixing rent with shop sales or personal transfers makes bank and tax records opaque. Use a dedicated paybill or till for property income only.</p>

      <h2>2. Weak or missing payment references</h2>
      <p>If tenants send money without a unit or invoice reference, you cannot match payments reliably. Publish a single reference format (e.g. unit code + month) and remind tenants every billing cycle.</p>

      <h2>3. Manual spreadsheet reconciliation</h2>
      <p>Matching hundreds of SMS confirmations to tenants burns time and invites error. <a href="/features/collections">Automated reconciliation</a> links incoming M-Pesa payments to the right tenant and invoice.</p>

      <h2>4. No automated reminders</h2>
      <p>Many late payments are forgetfulness, not refusal. Scheduled SMS or email reminders before the due date improve collection without awkward calls.</p>

      <h2>5–7. Skipping ledger discipline</h2>
      <p>Every receipt should post to a proper general ledger for reporting and compliance. For audit-ready workflows, see <a href="/features/etims">eTIMS</a> and <a href="/features/accounting">accounting</a>, or <a href="/request-demo">book a demo</a> with Nyumba Zetu.</p>
    `,
  },
  {
    slug: "hoa-reserve-fund-planning-kenya",
    type: "Blog",
    title: "HOA reserve fund planning: what Kenyan estates should know",
    description:
      "Why reserve funds matter for roofs, lifts, and roads, how to budget sensibly, and how transparent reporting builds resident trust.",
    date: "2025-02-20",
    author: "Nyumba Zetu",
    image: {
      src: "/images/solutions/solution-committees.jpg",
      alt: "Estate committee planning service charges and reserves in Kenya",
    },
    keywords: [
      "HOA reserve fund Kenya",
      "estate management",
      "service charge planning",
      "Nairobi HOA",
    ],
    content: `
      <p>Major repairs—roof replacement, generator overhaul, access roads—cannot always be funded from monthly service charge alone. A reserve fund spreads large costs over time and avoids special levies that catch residents off guard.</p>

      <h2>What is a reserve fund?</h2>
      <p>It is a portion of service charge (or separate contribution) set aside for capital expenditure and long-life assets. Good practice includes a written policy: what the fund covers, target balance, and who approves draws.</p>

      <h2>How much to set aside</h2>
      <p>There is no single rule; it depends on building age, plant and equipment, and your maintenance plan. A condition survey or engineer’s report helps prioritise works and amounts. Share high-level targets at AGMs so owners understand the trade-off between monthly charge and future levies.</p>

      <h2>Transparency and tools</h2>
      <p>Residents support reserves when they see where money goes. Separate accounting for operating vs reserve balances, with clear reports, reduces conflict. <a href="/hoa-management-software-kenya">HOA management software</a> and our <a href="/solutions/committees">committee solution</a> help estates publish statements and collect on time. <a href="/request-demo">Request a demo</a> to learn more.</p>
    `,
  },
  {
    slug: "year-end-property-financial-close-checklist",
    type: "Guide",
    title: "Year-end financial close checklist for property portfolios",
    description:
      "Close the books confidently: reconcile M-Pesa and bank, review arrears, fix mis-postings, and produce owner-ready reports for Kenyan portfolios.",
    date: "2025-02-12",
    author: "Nyumba Zetu",
    image: {
      src: "/images/features/feature-accounting.jpg",
      alt: "Property portfolio year-end accounting and financial reports",
    },
    keywords: [
      "property year end close",
      "rental accounting Kenya",
      "portfolio financial reporting",
      "property manager checklist",
    ],
    content: `
      <p>Year-end is when scattered errors show up in tax filings and owner reports. Use this checklist to close cleanly whether you manage five units or five hundred.</p>

      <h2>Reconciliation</h2>
      <p>Ensure every M-Pesa and bank line item is matched to tenant invoices or estate income. Unmatched items should be investigated—not carried blindly into the new year.</p>

      <h2>Arrears and bad debt</h2>
      <p>Run an ageing report. Document any amounts you will write off or pursue legally. Consistent policy protects you if owners or auditors ask questions.</p>

      <h2>Expense coding</h2>
      <p>Verify that repairs, utilities, and management fees sit in the right property and category. Mis-coded entries distort per-property profitability.</p>

      <h2>Reports and handover</h2>
      <p>Produce income statements and collection summaries per property or client. Integrated <a href="/features/accounting">general ledger</a> software avoids exporting fragile spreadsheets. For Kenyan compliance context, see our notes on <a href="/resources/preparing-for-kra-audits-property-manager">KRA audits</a> and <a href="/request-demo">request a demo</a>.</p>
    `,
  },
  {
    slug: "etims-property-managers-practical-overview",
    type: "Blog",
    title: "eTIMS for property managers: a practical overview for Kenya",
    description:
      "How eTIMS fits rental and management income, what to document, and why a single financial system makes compliance easier—not harder.",
    date: "2025-02-04",
    author: "Nyumba Zetu",
    image: {
      src: "/images/features/feature-etims.jpg",
      alt: "KRA eTIMS compliance for property management companies in Kenya",
    },
    keywords: [
      "eTIMS property manager",
      "KRA eTIMS Kenya",
      "rental invoice compliance",
      "property tax Kenya",
    ],
    content: `
      <p>Electronic invoicing is now part of how many businesses interact with KRA. Property managers who charge management fees or issue invoices to landlords need processes that are consistent and traceable.</p>

      <h2>Why integration beats bolt-on</h2>
      <p>When rent collection, invoicing, and accounting live in separate tools, eTIMS data may not match your ledger. A single platform reduces duplicate entry and reconciliation gaps.</p>

      <h2>Records to maintain</h2>
      <p>Keep a clear trail from tenant payment to management fee recognition and any invoices issued through eTIMS. Your auditor—and KRA—will expect alignment between bank, M-Pesa, and books.</p>

      <h2>Next steps</h2>
      <p>Nyumba Zetu supports <a href="/features/etims">eTIMS-related workflows</a> alongside rent and service charge. Pair this article with <a href="/resources/preparing-for-kra-audits-property-manager">preparing for KRA audits</a> and <a href="/request-demo">request a demo</a> for your scenario.</p>
    `,
  },
  {
    slug: "diaspora-landlord-portfolio-kenya-case-study",
    type: "Case Study",
    title: "How a diaspora landlord simplified a Kenya portfolio from abroad",
    description:
      "Case study: visibility into collections, single paybill, and reports that work across time zones—without relying on ad-hoc WhatsApp updates.",
    date: "2025-01-22",
    author: "Nyumba Zetu",
    image: {
      src: "/images/solutions/solution-diaspora.jpg",
      alt: "Diaspora investor managing Kenyan rental property remotely",
    },
    keywords: [
      "diaspora landlord Kenya",
      "remote property management",
      "Kenya rental investment",
      "overseas landlord",
    ],
    content: `
      <p>This case study reflects a common pattern: a Kenyan family living overseas inherited and expanded a small rental portfolio in Nairobi. Local relatives helped with keys and emergencies, but financial visibility was poor.</p>

      <h2>The problem</h2>
      <p>Rent arrived on different M-Pesa numbers and bank accounts. Monthly “updates” on WhatsApp did not reconcile to actual bank balances. The owner could not tell which units were in arrears without calling the caretaker.</p>

      <h2>The approach</h2>
      <p>They consolidated collection through one paybill linked to <a href="/solutions/diaspora">property management software</a>, automated invoices and reminders, and granted their local agent role-based access for maintenance while retaining financial oversight. Dashboards replaced screenshot chains.</p>

      <h2>Outcome</h2>
      <p>Within two quarters, reported on-time collection improved and the owner spent less time on back-and-forth. AGM-style reporting for a family trust became a scheduled export rather than a weekend spreadsheet project. See <a href="/request-demo">request a demo</a> if you face similar constraints.</p>
    `,
  },
  {
    slug: "clear-rent-policies-reduce-disputes",
    type: "Blog",
    title: "How clear rent policies reduce payment disputes in Kenya",
    description:
      "Written rules on due dates, grace periods, late fees, and payment channels prevent misunderstandings and strengthen your position if mediation is needed.",
    date: "2025-01-14",
    author: "Nyumba Zetu",
    image: {
      src: "/images/features/feature-communications.jpg",
      alt: "Clear communication of rent policies to tenants in Kenya",
    },
    keywords: [
      "rent policy Kenya",
      "tenant disputes rent",
      "landlord tenant communication",
      "rent due date policy",
    ],
    content: `
      <p>Most rent disputes are not about willingness to pay—they are about mismatched expectations on timing, amount, or method. Clear policies, communicated once and reinforced automatically, prevent a large share of friction.</p>

      <h2>What to document</h2>
      <p>State the due date (e.g. first of month), whether rent is in advance or arrears, acceptable payment methods, and the exact paybill reference. If you allow a short grace period, say so in writing.</p>

      <h2>Consistency</h2>
      <p>Apply the same rules to all comparable tenancies. Selective enforcement invites claims of unfair treatment. If you make an exception, note it in your records.</p>

      <h2>Automation as reinforcement</h2>
      <p>Automated invoices and reminders repeat your policy every cycle without sounding personal or confrontational. Explore <a href="/features/collections">collections features</a> and <a href="/rent-collection-software-kenya">rent collection software</a> on Nyumba Zetu, or <a href="/request-demo">book a demo</a>.</p>
    `,
  },
  {
    slug: "choosing-property-management-software-kenya-rfp",
    type: "Guide",
    title: "Choosing property management software in Kenya: an RFP-style checklist",
    description:
      "Evaluate vendors on M-Pesa reconciliation, multi-property support, HOA vs rental, reporting, security, and support—before you sign a contract.",
    date: "2024-12-18",
    author: "Nyumba Zetu",
    image: {
      src: "/images/features/feature-dashboard.jpg",
      alt: "Property management software evaluation and dashboard features",
    },
    keywords: [
      "property management software Kenya",
      "PM software RFP",
      "compare property software",
      "landlord software Kenya",
    ],
    content: `
      <p>Buying software is a process decision as much as a product decision. This guide frames questions that Kenyan landlords and management companies should ask any vendor.</p>

      <h2>Collections and Kenya-specific payments</h2>
      <p>Does the system reconcile M-Pesa (paybill/till) to tenants and invoices automatically? Can it handle split portfolios (yours vs client-owned)?</p>

      <h2>Accounting and compliance</h2>
      <p>Is there a real general ledger, not only payment tracking? How does the product support eTIMS or export to your accountant’s tools?</p>

      <h2>HOA vs residential rental</h2>
      <p>If you manage estates, confirm service charge invoicing, owner statements, and committee reporting. Mixed portfolios need one login, not three apps.</p>

      <h2>Security and support</h2>
      <p>Ask about data residency expectations, role-based access, audit logs, and local support hours. Then compare against <a href="/property-management-software-kenya">Nyumba Zetu’s offering</a> and <a href="/request-demo">request a demo</a> with your checklist in hand.</p>
    `,
  },
  {
    slug: "sub-metering-utilities-apartments-kenya",
    type: "Blog",
    title: "Sub-metering water and electricity in Kenyan apartments: benefits and pitfalls",
    description:
      "Fairer billing, lower disputes, and recovery of utility costs—when sub-metering works, and what committees must plan for upfront.",
    date: "2024-12-05",
    author: "Nyumba Zetu",
    image: {
      src: "/images/features/feature-smart-meters.jpg",
      alt: "Smart sub-meters for water and electricity in residential estates Kenya",
    },
    keywords: [
      "sub metering Kenya",
      "apartment water meter",
      "utility billing estate",
      "smart meters Kenya",
    ],
    content: `
      <p>Flat-rate utility charges in shared buildings often subsidise heavy users and annoy frugal ones. Sub-metering shifts consumption visibility to the unit level—when done well.</p>

      <h2>Benefits</h2>
      <p>Fair allocation, incentive to conserve, and clearer separation between landlord or estate bulk supply vs tenant responsibility. Many residents accept variable charges when they trust the meter readings.</p>

      <h2>Challenges</h2>
      <p>Upfront installation cost, meter maintenance, and clear rules for estimated reads or meter failure. Estates need a policy for vacant units and common areas.</p>

      <h2>Operational fit</h2>
      <p>Readings must feed billing on a schedule. <a href="/features/smart-meters">Smart meter integrations</a> reduce manual reads and errors. For full estate workflows, see <a href="/hoa-management-software-kenya">HOA software</a> and <a href="/request-demo">request a demo</a>.</p>
    `,
  },
  {
    slug: "tenant-retention-strategies-landlords-kenya",
    type: "Blog",
    title: "Tenant retention strategies that work for Kenyan landlords",
    description:
      "Renewals cost less than turnovers. Responsive maintenance, fair renewals, and professional communication keep good tenants longer.",
    date: "2024-11-28",
    author: "Nyumba Zetu",
    image: {
      src: "/images/features/feature-tenant-experience.jpg",
      alt: "Positive tenant experience and retention for rental housing Kenya",
    },
    keywords: [
      "tenant retention Kenya",
      "landlord renewals",
      "reduce tenant turnover",
      "rental customer experience",
    ],
    content: `
      <p>Vacancy, repainting, and agent fees make turnover expensive. Retaining reliable tenants is often the highest-return activity a landlord can invest in.</p>

      <h2>Respond to maintenance quickly</h2>
      <p>Small fixes ignored become reasons to leave. A simple ticketing or WhatsApp protocol—with someone accountable—beats “we’ll send someone.”</p>

      <h2>Fair renewal conversations</h2>
      <p>Give notice of rent reviews early and justify increases with market context where possible. Surprise hikes at signature time breed resentment.</p>

      <h2>Professional touchpoints</h2>
      <p>Clear invoices, polite reminders, and easy payment methods signal that you run a serious operation. <a href="/features/tenant-experience">Tenant experience tools</a> and <a href="/solutions/landlords">landlord solutions</a> on Nyumba Zetu support that impression. <a href="/request-demo">Request a demo</a> to explore.</p>
    `,
  },
  {
    slug: "estate-committee-financial-oversight-webinar",
    type: "Webinar",
    title: "Estate committee financial oversight: webinar outline for Kenyan HOAs",
    description:
      "What treasurers should review monthly: bank vs ledger, service charge vs reserve, and how to prepare digestible reports for members.",
    date: "2024-11-15",
    author: "Nyumba Zetu",
    image: {
      src: "/images/features/feature-reports.jpg",
      alt: "Financial reports and oversight for estate committees in Kenya",
    },
    keywords: [
      "HOA treasurer Kenya",
      "estate committee finance",
      "service charge reporting",
      "committee oversight",
    ],
    content: `
      <p>This webinar-style resource summarises how voluntary estate committees can exercise proper oversight without becoming full-time accountants.</p>

      <h2>Monthly rhythm</h2>
      <p>Compare bank and M-Pesa statements to the management accounts. Flag any transaction that lacks a receipt or invoice. Review aged receivables for units in default.</p>

      <h2>Operating vs reserve</h2>
      <p>Ensure spending from the reserve fund matches approved projects. Operating account should cover routine security, cleaning, and utilities.</p>

      <h2>Member communication</h2>
      <p>A one-page summary beats a fifty-page printout. Charts for collection rate and major expense categories help. <a href="/solutions/committees">Committee tools</a> and <a href="/request-demo">demos</a> show how Nyumba Zetu supports transparent reporting.</p>
    `,
  },
  {
    slug: "bank-mpesa-reconciliation-rent-accounts",
    type: "Blog",
    title: "Reconciling bank and M-Pesa accounts for rental income in Kenya",
    description:
      "A disciplined monthly routine: statements, exceptions, and ledger posting so your accountant—and KRA—see the same numbers you do.",
    date: "2024-11-01",
    author: "Nyumba Zetu",
    image: {
      src: "/images/solutions/solution-banks.jpg",
      alt: "Bank and M-Pesa reconciliation for property rental accounts Kenya",
    },
    keywords: [
      "M-Pesa bank reconciliation",
      "rental income reconciliation Kenya",
      "property accounting",
      "landlord bookkeeping",
    ],
    content: `
      <p>Reconciliation is the bridge between “money came in” and “we know who paid for what.” Without it, financial statements are guesses.</p>

      <h2>Monthly steps</h2>
      <ol>
        <li>Download complete M-Pesa and bank statements for the period.</li>
        <li>Match each credit to an invoice or tenant reference.</li>
        <li>Investigate duplicates, reversals, and unidentified deposits immediately.</li>
        <li>Post adjustments to the general ledger with notes.</li>
      </ol>

      <h2>When volume grows</h2>
      <p>Manual matching does not scale past a few dozen transactions. Automated matching against your rent roll saves days each month. See <a href="/features/collections">payment reconciliation</a> and <a href="/features/accounting">accounting</a>, or <a href="/request-demo">request a demo</a>.</p>
    `,
  },
  {
    slug: "documentation-tenancy-disputes-kenya",
    type: "Guide",
    title: "Documentation that helps in tenancy disputes in Kenya",
    description:
      "Leases, notices, payment logs, and condition reports—what to keep and how organised records support mediation or legal steps if needed.",
    date: "2024-10-22",
    author: "Nyumba Zetu",
    image: {
      src: "/images/features/feature-crm.jpg",
      alt: "Tenant records and documentation for property disputes Kenya",
    },
    keywords: [
      "tenancy dispute Kenya",
      "landlord documentation",
      "rental evidence",
      "lease records Kenya",
    ],
    content: `
      <p>Disputes over rent, deposits, or damage rarely turn on memory—they turn on documents. Building the habit early costs little; rebuilding history later costs a lot.</p>

      <h2>Core documents</h2>
      <p>Signed lease, move-in inventory with photos, rent invoices, proof of payment (or ledger entries), and any written notices for rent review or termination.</p>

      <h2>Chronology</h2>
      <p>Keep a dated log of significant conversations about repairs or payment plans. Email is better than verbal-only for important agreements.</p>

      <h2>Systems</h2>
      <p>Digital systems with immutable payment history and issued invoices strengthen your position. Nyumba Zetu’s <a href="/features/collections">collections</a> and <a href="/property-management-software-kenya">platform</a> centralise this data—<a href="/request-demo">book a demo</a> to evaluate fit.</p>
    `,
  },
  {
    slug: "scale-property-portfolio-without-doubling-staff",
    type: "Blog",
    title: "Scaling from five to fifty units without doubling your admin team",
    description:
      "Process, delegation, and software: where automation replaces headcount in rent billing, reconciliation, and owner reporting for growing managers.",
    date: "2024-10-10",
    author: "Nyumba Zetu",
    image: {
      src: "/images/solutions/solution-managers.jpg",
      alt: "Property management company scaling portfolio operations Kenya",
    },
    keywords: [
      "scale property management Kenya",
      "property portfolio growth",
      "PM company efficiency",
      "automate property admin",
    ],
    content: `
      <p>Growth that linearly adds admin staff erodes margins. The goal is repeatable processes and systems so each new block of units adds less than proportional overhead.</p>

      <h2>Standardise the playbook</h2>
      <p>Same lease template, same billing calendar, same payment channel, same report format for owners. Exceptions should be rare and documented.</p>

      <h2>Automate the repetitive</h2>
      <p>Invoice generation, payment matching, and basic reminders should not require daily manual effort. Your team should focus on arrears, maintenance escalations, and client relationships.</p>

      <h2>Platform choice</h2>
      <p><a href="/solutions/managers">Nyumba Zetu for property managers</a> is built around multi-property workflows. Read <a href="/resources/property-management-company-increased-collections-30">our collections case study</a> and <a href="/request-demo">request a demo</a>.</p>
    `,
  },
  {
    slug: "security-deposits-refunds-kenya-rental-practice",
    type: "Blog",
    title: "Security deposits and refunds: rental practice in Kenya",
    description:
      "Setting deposit amounts, holding funds fairly, deductions for damage, and timelines for refund—so both sides know what to expect at move-out.",
    date: "2024-09-25",
    author: "Nyumba Zetu",
    image: {
      src: "/images/features/feature-maintenance.jpg",
      alt: "Rental property condition and security deposit deductions Kenya",
    },
    keywords: [
      "security deposit Kenya",
      "tenant deposit refund",
      "rental deposit deductions",
      "landlord deposit policy",
    ],
    content: `
      <p>Deposits protect landlords against unpaid rent and unreasonable damage; they also create tension at move-out. Transparency on both sides prevents many arguments.</p>

      <h2>At lease start</h2>
      <p>State the deposit amount, where it is held (if relevant), and the process for inspection at exit. The move-in inventory sets the baseline for “beyond normal wear.”</p>

      <h2>At move-out</h2>
      <p>Joint inspection where possible. Itemise any deductions with quotes or receipts. Refund the balance within a timeframe agreed in the lease—delays erode trust and can attract disputes.</p>

      <h2>Record-keeping</h2>
      <p>Link deposit movements to your ledger like any other transaction. For integrated rent and accounting, see <a href="/features/accounting">Nyumba Zetu accounting</a> and <a href="/request-demo">request a demo</a>.</p>
    `,
  },
  {
    slug: "vendor-management-maintenance-property-managers",
    type: "Guide",
    title: "Vendor management for property maintenance: a short guide",
    description:
      "Qualify plumbers, electricians, and cleaners; track work orders; and control spend so maintenance supports tenant satisfaction and budget discipline.",
    date: "2024-09-12",
    author: "Nyumba Zetu",
    image: {
      src: "/images/features/feature-expense-vendor-management.jpg",
      alt: "Vendor and maintenance expense management for property portfolios",
    },
    keywords: [
      "property maintenance vendors Kenya",
      "work order management",
      "landlord contractors",
      "maintenance spend control",
    ],
    content: `
      <p>Maintenance is where tenant experience and cost control meet. Weak vendor discipline leads to repeat breakdowns, inflated invoices, and unhappy residents.</p>

      <h2>Onboarding vendors</h2>
      <p>Verify licences or references where relevant, agree rates or quote rules, and capture bank details for payment. Prefer vendors who issue written quotes for non-emergency work.</p>

      <h2>Work orders</h2>
      <p>Every job should have a request source, description, assignment, completion note, and cost. Without that trail, you cannot analyse repeat issues or vendor performance.</p>

      <h2>Tools</h2>
      <p><a href="/features/maintenance">Maintenance features</a> and <a href="/features/expense-vendor-management">vendor management</a> on Nyumba Zetu connect work to properties and expenses. <a href="/request-demo">Request a demo</a> for a walkthrough.</p>
    `,
  },
  {
    slug: "rental-income-tax-landlords-kenya-overview",
    type: "Blog",
    title: "Rental income and tax: a high-level overview for Kenyan landlords",
    description:
      "Not tax advice—orientation on why good records matter, common reporting themes, and when to involve a qualified tax professional.",
    date: "2024-08-30",
    author: "Nyumba Zetu",
    image: {
      src: "/images/solutions/solution-landlords.jpg",
      alt: "Kenyan landlord rental income and financial record keeping",
    },
    keywords: [
      "rental income tax Kenya",
      "landlord tax Kenya",
      "rental property records",
      "KRA landlord",
    ],
    content: `
      <p>This article is general information only, not tax or legal advice. Always consult a qualified professional for your situation.</p>

      <h2>Why records matter</h2>
      <p>Rental income is typically taxable; allowable expenses may reduce the chargeable amount. KRA can only work from what you can substantiate—invoices, agreements, and bank records.</p>

      <h2>Themes to discuss with your advisor</h2>
      <p>How you recognise income, what expenses are deductible, withholding where applicable, and alignment with eTIMS if you operate through a company or issue tax invoices.</p>

      <h2>Software as foundation</h2>
      <p>Clean ledgers make accountant and KRA conversations shorter. Nyumba Zetu combines <a href="/features/accounting">accounting</a> with <a href="/features/collections">collections</a>. See also <a href="/resources/preparing-for-kra-audits-property-manager">audit preparation</a> and <a href="/request-demo">request a demo</a>.</p>
    `,
  },
  {
    slug: "developers-handover-estate-management-software",
    type: "Blog",
    title: "Why developers should plan estate software before handover to owners",
    description:
      "From provisional budgets to first AGM: early adoption of estate management tools smooths handover and protects your brand after the last unit sells.",
    date: "2024-08-14",
    author: "Nyumba Zetu",
    image: {
      src: "/images/solutions/solution-developers.jpg",
      alt: "Property developer handover to estate management and owners Kenya",
    },
    keywords: [
      "developer handover Kenya",
      "estate management new build",
      "HOA setup Kenya",
      "property developer estate",
    ],
    content: `
      <p>Buyers remember the developer from how the estate runs after occupation—not only from the sales brochure. Chaotic service charge collection in year one damages reputation.</p>

      <h2>Before handover</h2>
      <p>Define provisional service charge, payment channels, and how the owners’ association will inherit data. Spreadsheets handed over on a USB stick rarely survive the first AGM.</p>

      <h2>Continuity</h2>
      <p>A proper system carries unit registers, opening balances, and historical payments into committee control. Training for the first treasurer prevents knowledge loss.</p>

      <h2>Developer solutions</h2>
      <p>See <a href="/solutions/developers">Nyumba Zetu for developers</a> and <a href="/request-demo">request a demo</a> to discuss handover-ready workflows.</p>
    `,
  },
  {
    slug: "how-to-modernize-rent-collections-kenya",
    type: "Guide",
    title: "How to modernize rent collections in Kenya",
    description:
      "Best practices for transitioning from manual to automated rent collection in Kenya. Learn invoicing, M-Pesa paybill setup, and reconciliation.",
    date: "2024-01-15",
    author: "Nyumba Zetu",
    image: {
      src: "/images/features/feature-collections.jpg",
      alt: "Rent collection and payment reconciliation dashboard for property managers in Kenya",
    },
    keywords: ["rent collection Kenya", "automated rent collection", "M-Pesa rent", "property management Kenya"],
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
      "Case study: how one Nairobi HOA increased service charge transparency and reduced resident disputes by 60% with estate management software.",
    date: "2024-01-10",
    author: "Nyumba Zetu",
    image: {
      src: "/images/solutions/solution-committees.jpg",
      alt: "HOA and estate committee management for service charges in Kenya",
    },
    keywords: ["service charge transparency", "HOA Kenya", "estate management", "Nairobi estates"],
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
      "Essential steps to get your property records audit-ready for KRA: general ledger, eTIMS, reconciliation, and supporting documents in Kenya.",
    date: "2024-01-05",
    author: "Nyumba Zetu",
    image: {
      src: "/images/features/feature-etims.jpg",
      alt: "KRA eTIMS and tax compliance for property management in Kenya",
    },
    keywords: ["KRA audit", "property manager Kenya", "eTIMS", "audit-ready records"],
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
      "Step-by-step guide to configuring automated rent and service charge invoicing for landlords and property managers in Kenya.",
    date: "2023-12-20",
    author: "Nyumba Zetu",
    image: {
      src: "/images/features/feature-collections.jpg",
      alt: "Automated invoicing and payment collection for property portfolios",
    },
    keywords: ["automated invoicing", "rent invoicing Kenya", "property portfolio", "recurring billing"],
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
      "Real-world case study: property management company in Kenya increased rent collections by 30% across a 100-unit portfolio with Nyumba Zetu.",
    date: "2023-12-15",
    author: "Nyumba Zetu",
    image: {
      src: "/images/solutions/solution-managers.jpg",
      alt: "Property management company dashboard for rent collections in Kenya",
    },
    keywords: ["property management company Kenya", "rent collections", "case study", "100 units"],
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
      "Learn the fundamentals of property accounting and general ledger management for landlords and property managers in Kenya.",
    date: "2023-12-10",
    author: "Nyumba Zetu",
    image: {
      src: "/images/features/feature-accounting.jpg",
      alt: "Property management accounting and general ledger for Kenya",
    },
    keywords: ["property accounting", "general ledger", "property management Kenya", "financial reports"],
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
  {
    slug: "rental-market-trends-kenya-2022",
    type: "Blog",
    title: "Rental market trends in Kenya: what landlords should watch in 2022",
    description:
      "A practical 2022 outlook for Kenyan landlords: demand shifts, vacancy pressure, tenant expectations, and how to keep your portfolio competitive.",
    date: "2022-12-20",
    author: "Nyumba Zetu",
    image: {
      src: "/images/features/feature-dashboard.jpg",
      alt: "Property portfolio dashboards and rental market tracking in Kenya",
    },
    keywords: [
      "rental market Kenya 2022",
      "Kenya landlord trends",
      "vacancy rates Kenya",
      "property market outlook",
    ],
    content: `
      <p>The Kenyan rental market changes quickly, especially in urban areas where supply, affordability, and tenant preferences move together. If you manage units professionally, it helps to treat market tracking as part of your operating routine rather than a once-a-year exercise.</p>

      <h2>What to monitor</h2>
      <p>Track asking rent versus achieved rent, average days on market, and the number of enquiries per listing. Those numbers tell you whether your pricing and presentation are aligned with the market.</p>

      <h2>What tenants value</h2>
      <p>In many areas, tenants are willing to pay more for reliable water, security, parking, easy transport access, and clear communication. When your unit offers those benefits, make them obvious in your listings and renewal discussions.</p>

      <h2>Why systems matter</h2>
      <p>Market insight is stronger when it comes from data, not guesswork. If your listings, collections, and reports live in one place, you can adjust rent, reduce vacancy, and follow up consistently. Explore <a href="/features/listings">listings management</a>, <a href="/features/reports">reporting</a>, or <a href="/request-demo">request a demo</a> to see how Nyumba Zetu supports smarter decisions.</p>
    `,
  },
  {
    slug: "first-time-landlord-guide-kenya",
    type: "Guide",
    title: "A first-time landlord guide for Kenya",
    description:
      "The essentials for new landlords in Kenya: setting rent, screening tenants, collecting payments, and keeping proper records from day one.",
    date: "2022-11-28",
    author: "Nyumba Zetu",
    image: {
      src: "/images/solutions/solution-landlords.jpg",
      alt: "First-time landlord managing a rental property in Kenya",
    },
    keywords: [
      "first time landlord Kenya",
      "landlord guide Kenya",
      "rental property records",
      "new landlord tips",
    ],
    content: `
      <p>Becoming a landlord is simple; running a good rental business is not. New landlords often start with a unit and a spreadsheet, then discover that rent collection, repairs, and records are all happening at once. This guide gives you the basics.</p>

      <h2>Set up the business properly</h2>
      <p>Separate property income from personal money as early as possible. Use a dedicated account or paybill, and keep a clear record of rent, deposits, and expenses. If you later need to explain a number to an accountant or auditor, this discipline will save time.</p>

      <h2>Choose tenants carefully</h2>
      <p>Ask for references, confirm occupation and income where possible, and use a written lease. Good tenants appreciate clear rules as much as good landlords do.</p>

      <h2>Use software before things get messy</h2>
      <p>Once you have recurring invoices and payments, software becomes useful quickly. Automated reminders, reconciliation, and reporting reduce mistakes and make you look professional from the start. Learn more about <a href="/rent-collection-software-kenya">rent collection software</a> or <a href="/request-demo">request a demo</a>.</p>
    `,
  },
  {
    slug: "service-charge-basics-kenya-estates",
    type: "Blog",
    title: "Service charge basics for Kenyan estates and apartments",
    description:
      "Understand what service charge covers, how to budget fairly, and how committees can communicate charges clearly to residents and owners.",
    date: "2022-10-14",
    author: "Nyumba Zetu",
    image: {
      src: "/images/solutions/solution-committees.jpg",
      alt: "Estate committee explaining service charge budgets in Kenya",
    },
    keywords: [
      "service charge Kenya",
      "estate management basics",
      "HOA charges Kenya",
      "apartment service charge",
    ],
    content: `
      <p>Service charge is one of the most misunderstood parts of estate ownership. When residents do not understand what they are paying for, disputes grow quickly. Clear budgets and reports solve a large part of the problem.</p>

      <h2>What service charge usually covers</h2>
      <p>Common items include cleaning, security, gardening, common-area utilities, minor maintenance, and management costs. Reserve fund contributions should be discussed separately so operating costs remain transparent.</p>

      <h2>How to communicate it</h2>
      <p>Share a simple budget by category and update it when costs change. Residents do not need accounting jargon; they need clarity on what changed and why.</p>

      <h2>Make collection easier</h2>
      <p>Issue clear invoices and track payment status against each unit. If you manage an HOA or apartment block, see <a href="/hoa-management-software-kenya">HOA management software</a> and <a href="/solutions/committees">committee workflows</a>, or <a href="/request-demo">request a demo</a> for a closer look.</p>
    `,
  },
  {
    slug: "maintenance-planning-property-kenya",
    type: "Blog",
    title: "Maintenance planning for property owners in Kenya",
    description:
      "Prevent costly surprises with a simple maintenance plan for rentals: inspections, vendor management, budgets, and tenant communication.",
    date: "2022-09-02",
    author: "Nyumba Zetu",
    image: {
      src: "/images/features/feature-maintenance.jpg",
      alt: "Property maintenance planning and vendor coordination in Kenya",
    },
    keywords: [
      "property maintenance Kenya",
      "rental maintenance plan",
      "landlord repairs",
      "vendor management Kenya",
    ],
    content: `
      <p>Reactive maintenance is expensive. A planned approach reduces emergency costs, keeps tenants happier, and protects the asset. For Kenyan landlords and property managers, even a simple schedule makes a big difference.</p>

      <h2>Plan around inspections</h2>
      <p>Schedule periodic inspections for roofs, plumbing, electricals, doors, and common areas. Catching problems early is cheaper than fixing failures after complaints pile up.</p>

      <h2>Use trusted vendors</h2>
      <p>Keep a shortlist of electricians, plumbers, painters, and cleaners with agreed rates and response times. Track who did the work and how much it cost so you can compare performance over time.</p>

      <h2>Connect work to reporting</h2>
      <p>When maintenance data sits beside financial records, you can see which properties consume more spend and why. Explore <a href="/features/maintenance">maintenance tools</a>, <a href="/features/expense-vendor-management">vendor management</a>, and <a href="/request-demo">request a demo</a>.</p>
    `,
  },
  {
    slug: "vacancy-reduction-strategies-kenya",
    type: "Blog",
    title: "Vacancy reduction strategies for Kenyan rentals",
    description:
      "Practical ways to reduce vacancy in 2022: better listings, faster responses, clean units, flexible renewals, and sharper follow-up.",
    date: "2022-08-18",
    author: "Nyumba Zetu",
    image: {
      src: "/images/features/feature-listings.jpg",
      alt: "Rental listings and vacancy reduction strategy for Kenyan landlords",
    },
    keywords: [
      "vacancy reduction Kenya",
      "rental marketing Kenya",
      "reduce empty units",
      "property listings Kenya",
    ],
    content: `
      <p>Every vacant unit costs money. Vacancy reduction is part marketing, part operations, and part customer service. The faster a qualified tenant can view, apply, and move in, the better your yield.</p>

      <h2>Improve the listing</h2>
      <p>Use accurate photos, honest descriptions, and clear pricing. Highlight the features that matter most to your target tenant, such as parking, security, water, or proximity to work.</p>

      <h2>Respond quickly</h2>
      <p>Slow replies lose good leads. Set a process for enquiry follow-up, viewing schedules, and application screening so prospects do not drift to other listings.</p>

      <h2>Keep current tenants</h2>
      <p>The cheapest vacancy is the one you never create. Good communication, timely repairs, and easy payments improve renewals. See <a href="/features/tenant-experience">tenant experience tools</a> and <a href="/request-demo">request a demo</a> to reduce turnover.</p>
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
