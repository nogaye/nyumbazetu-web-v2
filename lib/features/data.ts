/**
 * Central feature data: one source of truth for all product features. Each entry
 * includes attributes for grid (title, description, bullets, icon), detail page
 * (what, how, why, faqs, detailImage), pricing (plans, freeTierLevel), nav (showInNav),
 * and group (featureGroupId) for dropdown and features page sections.
 * Consumed by feature-grid, features/[slug], pricing page, main-nav, and sitemap.
 */

import type { FeatureDefinitionRaw, FeatureGroupDef, PlanId } from "./types";

/** Feature groups for nav dropdown columns and features page; order controls display order. */
export const FEATURE_GROUPS: FeatureGroupDef[] = [
  { id: "collections-finance", label: "Collections & Finance", order: 1 },
  { id: "leasing-tenants", label: "Leasing & Tenant Experience", order: 2 },
  { id: "operations", label: "Operations", order: 3 },
  { id: "platform-integrations", label: "Platform & Integrations", order: 4 },
];

const F: PlanId[] = ["Free"];
const S: PlanId[] = ["Standard"];
const P: PlanId[] = ["Premier"];
const E: PlanId[] = ["Enterprise"];
const FS: PlanId[] = ["Free", "Standard"];
const FPSE: PlanId[] = ["Free", "Standard", "Premier", "Enterprise"];
const FPE: PlanId[] = ["Free", "Premier", "Enterprise"];
const SPE: PlanId[] = ["Standard", "Premier", "Enterprise"];
const PE: PlanId[] = ["Premier", "Enterprise"];
const EOnly: PlanId[] = ["Enterprise"];

/** Canonical list of all product features with attributes for every view (grid, detail, pricing, nav). */
export const FEATURES_RAW: FeatureDefinitionRaw[] = [
  {
    slug: "collections",
    title: "Automated Invoicing & Payment Reconciliation",
    description:
      "Automated invoicing and payment tracking for any charge type—rent, service charges, utilities, fees—with M-Pesa, bank, and wallet integrations.",
    bullets: [
      "Invoices and receipts by email or WhatsApp",
      "M-Pesa, bank, and wallet with auto-reconciliation",
      "Real-time payment tracking for any charge type",
    ],
    iconKey: "CurrencyDollar",
    what: "Nyumba Zetu automates the full collections and payment workflow. Create invoices for any charge type: rent, service charges, utility bills, fees, penalties, or custom line items. The system sends invoices via email or SMS, tracks payments from M-Pesa, bank transfers, and mobile wallets, and reconciles everything in real-time.",
    how: "Set up recurring or one-off invoices for any charge type. Recipients receive automated reminders before due dates. When payments come in via M-Pesa, bank transfer, or other methods, the system automatically matches them to invoices and updates balances. Property managers get real-time dashboards showing collection rates, arrears, and payment trends across all charge types.",
    why: "Manual collection is time-consuming and error-prone. Automated collections increase on-time payments, reduce administrative overhead, and give real-time visibility into cash flow—whether you collect rent, service charges, utilities, or other fees. For property teams managing multiple units, this is essential.",
    faqs: [
      {
        q: "Which payment methods are supported?",
        a: "M-Pesa, bank transfers, mobile wallets, and cash payments can all be tracked and reconciled.",
      },
      {
        q: "Can I collect more than rent and service charges?",
        a: "Yes. You can invoice and collect any charge type—rent, service charges, utilities, fees, penalties, or custom line items—all in one workflow.",
      },
    ],
    detailImage: "/images/features/feature-collections.jpg",
    plans: FPSE,
    freeTierLevel: "basic",
    showInNav: true,
    showInGrid: true,
    homePageOrder: 1,
    featureGroupId: "collections-finance",
  },
  {
    slug: "bank-integrations",
    title: "Bank & Payment Integrations",
    description:
      "Bank feeds, M-Pesa, wallet integrations, and automated payment reconciliation.",
    plans: PE,
    showInNav: false,
    showInGrid: false,
    featureGroupId: "collections-finance",
  },
  {
    slug: "accounting",
    title: "Accounting & General Ledger",
    description:
      "Full accounting system with journals, ledgers, trial balance, P&L, and balance sheet.",
    bullets: [
      "Double-entry accounting",
      "Automated journal entries",
      "Reports, statements, and exports",
    ],
    iconKey: "Calculator",
    what: "Nyumba Zetu's accounting module provides a complete general ledger system designed specifically for property management. Every transaction—rent collection, service charges, maintenance expenses, deposits—automatically posts to the correct accounts with proper double-entry bookkeeping.",
    how: "When a tenant pays rent, the system automatically creates journal entries: debiting cash and crediting rent income. Service charges are tracked separately, maintenance expenses post to the correct expense accounts, and all transactions flow into trial balance, P&L, and balance sheet reports. The system supports multiple chart of accounts configurations and can export to QuickBooks and other accounting tools.",
    why: "Property management requires serious accounting. Without proper general ledger management, you can't generate accurate financial statements, prepare for audits, or make informed decisions. Nyumba Zetu ensures every transaction is properly recorded and categorized from day one.",
    faqs: [
      {
        q: "Can I export data to QuickBooks?",
        a: "Yes, Nyumba Zetu supports export to QuickBooks and other accounting software formats.",
      },
      {
        q: "Does it support multiple chart of accounts?",
        a: "Yes, you can configure custom chart of accounts to match your organization's structure.",
      },
    ],
    detailImage: "/images/features/feature-accounting.jpg",
    plans: SPE,
    showInNav: true,
    showInGrid: true,
    homePageOrder: 2,
    featureGroupId: "collections-finance",
  },
  {
    slug: "tenant-experience",
    title: "Tenant & Owner Experience",
    description:
      "Portals, mobile apps, and WhatsApp chatbot for seamless tenant and owner engagement.",
    bullets: [
      "Lease management, renewals, and digitized records",
      "Portals and mobile apps (iOS & Android)",
      "WhatsApp chatbot for balances and requests",
    ],
    iconKey: "UserGroup",
    what: "Nyumba Zetu provides dedicated portals and mobile apps for tenants and property owners. Tenants can view invoices, make payments, submit maintenance requests, and communicate with property managers. Owners can access real-time dashboards showing collections, occupancy, and financial performance.",
    how: "Tenants and owners receive login credentials and can access their portals via web or mobile app. The WhatsApp chatbot provides instant support for common questions and payment confirmations. All interactions are logged and visible to property managers.",
    why: "Modern tenants and owners expect self-service access to their property information. Portals reduce support burden, improve satisfaction, and provide transparency that builds trust.",
    faqs: [
      {
        q: "Are the mobile apps available for iOS and Android?",
        a: "Yes, native mobile apps are available for both iOS and Android platforms.",
      },
      {
        q: "Can tenants pay through the portal?",
        a: "Yes, tenants can make payments directly through the portal using M-Pesa or bank transfer.",
      },
    ],
    detailImage: "/images/features/feature-tenant-experience.jpg",
    plans: FPSE,
    freeTierLevel: "basic",
    showInNav: true,
    showInGrid: true,
    homePageOrder: 3,
    featureGroupId: "leasing-tenants",
  },
  {
    slug: "maintenance",
    title: "Maintenance and Service Requests",
    description:
      "Track maintenance and service requests, create work orders, and track completion.",
    bullets: [
      "Request logging and prioritization",
      "Work orders and assignment",
      "Completion tracking and history",
    ],
    iconKey: "WrenchScrewdriver",
    what: "The Maintenance and Service Requests module allows tenants to submit maintenance and service requests and property managers to create work orders, assign to staff or vendors, and track progress to completion. Full history is maintained for audit and planning.",
    how: "Tenants submit maintenance and service requests through the portal or mobile app. Property managers review, create work orders, assign assignees, and track progress. Completed work is recorded with status and notes.",
    why: "Structured maintenance and service request management improves response times, tenant satisfaction, and visibility into property condition and repair history.",
    faqs: [
      {
        q: "Can I assign work orders to vendors?",
        a: "Yes, work orders can be assigned to internal staff or external vendors; vendor payment is handled in Expense & Vendor Management.",
      },
      {
        q: "Is maintenance history retained?",
        a: "Yes, full request and work order history is kept for each unit and property.",
      },
    ],
    detailImage: "/images/features/feature-maintenance.jpg",
    plans: PE,
    showInNav: true,
    showInGrid: true,
    homePageOrder: 4,
    featureGroupId: "operations",
  },
  {
    slug: "assets-management",
    title: "Assets Management",
    description:
      "Property and facility asset register with tracking and depreciation.",
    bullets: [
      "Asset register and catalog",
      "Track by property or unit",
      "Depreciation and reporting",
    ],
    iconKey: "Cube",
    what: "Assets Management lets you maintain a register of property and facility assets—appliances, fixtures, equipment—with tracking by property or unit and optional depreciation schedules for financial reporting.",
    how: "Create asset records with name, category, location (property/unit), purchase or installation date, and value. Configure depreciation method and useful life where needed. Run reports for asset register, depreciation, and net book value.",
    why: "A clear asset register supports insurance, budgeting, and compliance, and depreciation feeds correctly into your accounts.",
    faqs: [
      {
        q: "Can I track assets by unit?",
        a: "Yes, assets can be linked to a property, building, or specific unit.",
      },
      {
        q: "Which depreciation methods are supported?",
        a: "The system supports common methods such as straight-line; exact options depend on your configuration.",
      },
    ],
    detailImage: "/images/features/feature-assets-management.jpg",
    plans: PE,
    showInNav: true,
    showInGrid: true,
    featureGroupId: "operations",
  },
  {
    slug: "expense-vendor-management",
    title: "Expense & Vendor Management",
    description:
      "Track expenses, manage vendor records, contracts, and payments.",
    bullets: [
      "Expense tracking and categories",
      "Vendor records and contracts",
      "Vendor payment tracking",
    ],
    iconKey: "Banknotes",
    what: "Expense & Vendor Management centralizes property-related expenses and vendor relationships. Track and categorize expenses, maintain vendor records and contracts, and manage vendor invoices and payments—all integrated with accounting.",
    how: "Record expenses against properties or cost centers and categorize them. Create vendor records with contact and bank details; attach contracts and terms. Raise or receive vendor invoices and record payments; payments post to the general ledger.",
    why: "Centralized expense and vendor management improves cost visibility, reduces duplicate payments, and keeps a clear audit trail for compliance.",
    faqs: [
      {
        q: "How do vendor payments flow to accounting?",
        a: "Vendor payments are recorded in the module and post to the appropriate expense and liability accounts in the general ledger.",
      },
      {
        q: "Can I track contracts by vendor?",
        a: "Yes, vendor records can include contract details, renewal dates, and related documents.",
      },
    ],
    detailImage: "/images/features/feature-expense-vendor-management.jpg",
    plans: PE,
    showInNav: true,
    showInGrid: true,
    featureGroupId: "collections-finance",
  },
  {
    slug: "tasks",
    title: "Tasks & Projects",
    description:
      "Project management for property development, renovations, and capital improvements.",
    bullets: [
      "Task assignment and tracking",
      "Timelines and milestones",
      "Budget and cost tracking",
    ],
    iconKey: "ClipboardDocumentCheck",
    what: "Nyumba Zetu's Tasks & Projects module helps property teams manage development projects, renovations, and capital improvements. Track tasks, assign team members, monitor timelines, and manage budgets—all within the same platform that handles your property operations.",
    how: "Create projects for developments, renovations, or capital improvements. Break down projects into tasks with assignees, due dates, and dependencies. Track progress with visual timelines, monitor budgets against actual costs, and generate project reports for stakeholders. All project expenses can be integrated with the accounting module.",
    why: "Property management often involves ongoing projects and improvements. Without proper project management, timelines slip, budgets overrun, and stakeholders lack visibility. Nyumba Zetu brings project management into your property operations platform.",
    faqs: [
      {
        q: "Can I track multiple projects simultaneously?",
        a: "Yes, you can manage multiple projects at once, each with its own tasks, timeline, and budget.",
      },
      {
        q: "How does project budgeting work?",
        a: "Set project budgets and track actual costs. The system integrates with the accounting module to automatically capture expenses.",
      },
    ],
    detailImage: "/images/features/feature-tasks.jpg",
    plans: PE,
    showInNav: true,
    showInGrid: true,
    featureGroupId: "operations",
  },
  {
    slug: "etims",
    title: "KRA eTIMS & Compliance",
    description:
      "KRA eTIMS-ready invoicing and tax-compliant workflows for property operations.",
    bullets: [
      "eTIMS e-invoices to KRA",
      "Tax-compliant, real-time reporting",
      "Audit logs and digital records",
    ],
    iconKey: "DocumentText",
    what: "Nyumba Zetu generates eTIMS-compliant invoices for all rent, service charge, and other property-related transactions. The system ensures all invoices meet KRA requirements and can be submitted directly to eTIMS.",
    how: "When invoices are generated, the system automatically formats them according to eTIMS specifications and includes all required fields. Invoices can be exported or submitted directly to eTIMS via API integration. Full audit trails are maintained.",
    why: "KRA eTIMS compliance is mandatory for property management operations. Automated eTIMS integration ensures compliance from day one and reduces the risk of penalties.",
    faqs: [
      {
        q: "Is eTIMS integration automatic?",
        a: "Yes, invoices are automatically formatted for eTIMS and can be submitted via API integration.",
      },
      {
        q: "What if I need to modify an invoice?",
        a: "The system supports invoice amendments with proper eTIMS credit notes and adjustments.",
      },
    ],
    detailImage: "/images/features/feature-etims.jpg",
    plans: PE,
    showInNav: true,
    showInGrid: true,
    featureGroupId: "collections-finance",
  },
  {
    slug: "tps",
    title: "TPS & Rent-to-Own",
    description:
      "Tenant Purchase Scheme and rent-to-own tracking with installment management.",
    bullets: [
      "TPS installment tracking",
      "Rent-to-own calculations",
      "Ownership transfer workflow",
    ],
    iconKey: "Home",
    what: "Nyumba Zetu supports Tenant Purchase Schemes (TPS) and rent-to-own arrangements common in Kenyan real estate. Track installment payments, calculate ownership percentages, manage transfer processes, and maintain complete records of the ownership journey. Our TPS platform integrates with Boma Yangu for affordable housing programs and collaborates with HFC (Housing Finance) to deliver comprehensive property finance solutions.",
    how: "Set up TPS or rent-to-own agreements with initial purchase price, installment amounts, and payment schedules. The system tracks each payment, calculates the tenant's ownership percentage, and manages the transfer process when the final payment is made. All transactions are recorded in the accounting system, and tenants can view their progress through the tenant portal. Integration with Boma Yangu enables seamless management of affordable housing projects, while collaboration with HFC provides integrated property finance and management solutions.",
    why: "TPS and rent-to-own are popular in Kenya, but managing them manually is complex and error-prone. Nyumba Zetu automates the tracking, calculations, and documentation needed for these arrangements. Our partnerships with Boma Yangu and HFC ensure that TPS solutions are comprehensive, compliant, and integrated with Kenya's affordable housing and property finance ecosystem.",
    faqs: [
      {
        q: "How does ownership percentage calculation work?",
        a: "The system automatically calculates ownership percentage based on payments made versus the total purchase price.",
      },
      {
        q: "Can tenants see their TPS progress?",
        a: "Yes, tenants can view their TPS progress, remaining balance, and ownership percentage through the tenant portal.",
      },
      {
        q: "Does Nyumba Zetu integrate with Boma Yangu?",
        a: "Yes, Boma Yangu is integrated with Nyumba Zetu as part of our TPS platform, providing comprehensive property management solutions for affordable housing projects.",
      },
      {
        q: "How does the HFC partnership work?",
        a: "We collaborate with HFC (Housing Finance) on TPS implementations, combining their property finance expertise with our property management technology to deliver integrated solutions.",
      },
    ],
    detailImage: "/images/features/feature-tps.jpg",
    plans: EOnly,
    showInNav: true,
    showInGrid: true,
    featureGroupId: "platform-integrations",
  },
  {
    slug: "communications",
    title: "Communication Hub",
    description:
      "Centralized communication via email, SMS, WhatsApp, and an AI-powered chatbot.",
    bullets: [
      "Automated reminders, invoices, and lease alerts",
      "WhatsApp, email, SMS, and AI chatbot",
      "In-app messaging and broadcasts",
    ],
    iconKey: "ChatBubbleLeftRight",
    what: "Nyumba Zetu's Communication Hub centralizes all property-related communication. Reach tenants and owners through email, SMS, in-app messaging, and WhatsApp. The AI-powered chatbot handles common inquiries, balance checks, and payment confirmations 24/7. Send automated notifications, broadcast announcements, and maintain a complete communication history—all from one place.",
    how: "Send automated emails and SMS for rent reminders, payment confirmations, maintenance updates, and announcements. Connect via WhatsApp so tenants can message you or use the AI chatbot for instant answers. Use in-app messaging for direct communication with tenants and owners. Broadcast announcements to specific groups (all tenants, specific buildings, etc.). All communications are logged and searchable.",
    why: "Property management involves constant communication with tenants, owners, and team members. Scattered communication across WhatsApp, email, and phone calls creates chaos. Nyumba Zetu brings it all together—including WhatsApp and an AI-powered chatbot—so nothing gets lost and tenants get instant support.",
    faqs: [
      {
        q: "What can the AI-powered chatbot do?",
        a: "The chatbot can answer common questions, provide balance and payment information, and guide tenants through simple tasks—available 24/7 via WhatsApp and in-app.",
      },
      {
        q: "Can I send bulk messages to tenants?",
        a: "Yes, you can send bulk messages to all tenants, specific buildings, or custom groups via email, SMS, or in-app.",
      },
      {
        q: "Are SMS notifications included?",
        a: "SMS notifications are available and can be configured for various events like rent reminders and payment confirmations.",
      },
    ],
    detailImage: "/images/features/feature-communications.jpg",
    plans: FPE,
    freeTierLevel: "basic",
    showInNav: true,
    showInGrid: true,
    homePageOrder: 5,
    featureGroupId: "leasing-tenants",
  },
  {
    slug: "crm",
    title: "CRM",
    description: "CRM for tenants, owners, vendors, and prospects.",
    bullets: [
      "Contact and interaction history",
      "Lead management and conversion",
      "Full communication history",
    ],
    iconKey: "BuildingOffice",
    what: "Nyumba Zetu's CRM module provides comprehensive customer relationship management for property operations. Track all interactions with tenants, property owners, vendors, and prospects. Manage leads, follow-ups, and maintain complete communication history—all integrated with your property management workflows.",
    how: "Create contact records for tenants, owners, vendors, and prospects. Log all interactions including calls, emails, meetings, and property viewings. Set up automated follow-up reminders and track lead conversion. The CRM integrates seamlessly with property management workflows, so tenant information, lease history, and payment records are all accessible from the contact profile. Generate reports on tenant satisfaction, owner engagement, and vendor performance.",
    why: "Property management is fundamentally about relationships. Without proper CRM, important interactions are forgotten, follow-ups are missed, and opportunities are lost. Nyumba Zetu's CRM ensures every interaction is tracked and nothing falls through the cracks.",
    faqs: [
      {
        q: "Can I track prospects and leads?",
        a: "Yes, the CRM includes lead management with conversion tracking, follow-up reminders, and pipeline management.",
      },
      {
        q: "How does it integrate with property management?",
        a: "The CRM is fully integrated with property management workflows. Tenant records automatically include lease history, payment records, and maintenance requests.",
      },
      {
        q: "Can I track vendor relationships?",
        a: "Yes, vendor contacts include performance history, work order tracking, and payment records.",
      },
    ],
    detailImage: "/images/features/feature-crm.jpg",
    plans: PE,
    showInNav: true,
    showInGrid: true,
    featureGroupId: "leasing-tenants",
  },
  {
    slug: "white-labeling",
    title: "White Labeling",
    description:
      "Fully customizable white-label solution to brand the platform as your own.",
    bullets: [
      "Custom branding and domain",
      "Logo and color control",
      "Enterprise deployment",
    ],
    iconKey: "PaintBrush",
    what: "Nyumba Zetu's white-label solution allows property management companies, banks, and enterprises to rebrand the entire platform with their own logo, colors, domain, and branding. The platform can be completely customized to match your brand identity while maintaining all the powerful property management features.",
    how: "Customize the platform with your logo, brand colors, and domain name. Replace Nyumba Zetu branding throughout the interface including tenant portals, mobile apps, email templates, and reports. Configure custom email domains and SSL certificates. The platform can be deployed under your own domain with full white-label branding. All features remain fully functional while presenting your brand to tenants, owners, and stakeholders.",
    why: "For property management companies and enterprises, presenting a branded platform builds trust and reinforces your brand identity. White-labeling allows you to offer enterprise-grade property management technology under your own brand, without the cost and complexity of building it from scratch.",
    faqs: [
      {
        q: "What can be customized in the white-label version?",
        a: "Logo, brand colors, domain name, email templates, tenant portals, mobile apps, and all user-facing interfaces can be fully customized.",
      },
      {
        q: "Can I use my own domain?",
        a: "Yes, white-label deployments can use your own domain with custom SSL certificates.",
      },
      {
        q: "Are all features available in the white-label version?",
        a: "Yes, all Nyumba Zetu features are available in the white-label version. Only the branding changes.",
      },
    ],
    detailImage: "/images/features/feature-white-labeling.jpg",
    plans: EOnly,
    showInNav: true,
    showInGrid: true,
    featureGroupId: "platform-integrations",
  },
  {
    slug: "calendar-scheduling",
    title: "Calendar & Event Scheduling",
    description:
      "Automated scheduling for invoice generation, reminders, penalties, and recurring tasks.",
    bullets: [
      "Scheduled invoice generation",
      "Automated payment reminders",
      "Automatic penalty calculation",
    ],
    iconKey: "CalendarDays",
    what: "Nyumba Zetu's Calendar & Event Scheduling feature provides a powerful automation engine that lets you schedule when the system should generate invoices, send payment reminders, calculate penalties, and execute other recurring property management tasks. Set up rules once, and the system handles everything automatically according to your schedule.",
    how: "Configure scheduling rules for any property management task. Schedule invoice generation for specific dates (e.g., 1st of every month for rent, 15th for service charges). Set up automated reminder sequences (e.g., send reminder 3 days before due date, another on due date, and a final reminder 3 days after). Configure penalty calculations to automatically apply late fees based on your rules (e.g., 5% penalty after 7 days, additional 2% after 14 days). Schedule recurring tasks like maintenance inspections, lease renewals, and reporting. The calendar view shows all scheduled events, and you can modify or pause schedules at any time. All scheduled events are logged with timestamps for audit purposes.",
    why: "Property management involves many repetitive, time-sensitive tasks. Without automation, property managers spend hours each month manually generating invoices, sending reminders, and calculating penalties. Calendar & Event Scheduling eliminates this manual work, ensures consistency, and ensures nothing is forgotten. For property teams managing hundreds of units, this automation is essential for operational efficiency.",
    faqs: [
      {
        q: "Can I schedule different invoice dates for different properties?",
        a: "Yes, you can configure unique scheduling rules for each property, unit, or tenant. For example, commercial properties might have different rent due dates than residential units.",
      },
      {
        q: "How do penalty calculations work with scheduling?",
        a: "You can set up penalty rules that automatically calculate and apply late fees based on how many days past due a payment is. The system checks daily and applies penalties according to your configured schedule.",
      },
      {
        q: "Can I schedule recurring maintenance tasks?",
        a: "Yes, you can schedule recurring maintenance inspections, asset audits, and other property management tasks. The system will create work orders or reminders automatically.",
      },
      {
        q: "What happens if I need to pause a scheduled event?",
        a: "You can pause, modify, or delete any scheduled event at any time. The system maintains a history of all scheduled events and their execution status.",
      },
      {
        q: "Can I schedule bulk operations?",
        a: "Yes, you can schedule bulk invoice generation, bulk reminders, and other operations that apply to multiple tenants or properties at once.",
      },
    ],
    detailImage: "/images/features/feature-calendar-scheduling.jpg",
    plans: PE,
    showInNav: true,
    showInGrid: true,
    featureGroupId: "platform-integrations",
  },
  {
    slug: "webhooks",
    title: "Webhooks & API Events",
    description:
      "Real-time event notifications and integrations to connect with your existing systems.",
    bullets: [
      "Real-time event notifications",
      "API integrations and workflows",
      "Custom automation triggers",
    ],
    iconKey: "Link",
    what: "Nyumba Zetu's Webhooks feature allows you to receive real-time notifications when events occur in the system. When an invoice is generated, a payment is received, a maintenance request is submitted, or any other event happens, the system can automatically send a webhook to your specified URL, trigger an email, call another API, or execute custom workflows.",
    how: "Configure webhooks for any system event: invoice generation, payment received, payment overdue, maintenance request created, tenant added, lease renewed, and many more. Set up webhook endpoints (URLs) where you want to receive notifications. When an event occurs, Nyumba Zetu sends a POST request to your endpoint with event details in JSON format. You can use these webhooks to update external systems, trigger custom workflows, send notifications to third-party services, or integrate with your existing tools. Webhooks include authentication tokens for security, retry logic for failed deliveries, and full event history for debugging.",
    why: "Modern property management requires integration with multiple systems: CRMs, accounting software, communication tools, and custom workflows. Webhooks provide a flexible, real-time way to connect Nyumba Zetu with your existing infrastructure.",
    faqs: [
      {
        q: "What events can trigger webhooks?",
        a: "Virtually any event in the system can trigger a webhook: invoice generation, payment received, payment overdue, maintenance request created/completed, tenant added/updated, lease created/renewed, service charge calculated, penalty applied, and many more.",
      },
      {
        q: "How secure are webhooks?",
        a: "Webhooks use authentication tokens and can be configured with SSL/TLS. Each webhook request includes a signature that you can verify to ensure it's coming from Nyumba Zetu.",
      },
      {
        q: "What happens if my webhook endpoint is down?",
        a: "The system includes retry logic with exponential backoff. Failed webhook deliveries are retried multiple times, and you can view the delivery status and history in the webhook dashboard.",
      },
      {
        q: "Can I use webhooks to call other APIs?",
        a: "Yes, you can configure webhooks to call external APIs, send emails, trigger SMS notifications, or execute any HTTP-based workflow. The webhook payload includes all relevant event data in JSON format.",
      },
      {
        q: "Can I filter which events trigger webhooks?",
        a: "Yes, you can configure webhooks to only trigger for specific events, properties, tenants, or based on custom conditions.",
      },
      {
        q: "How do I test webhooks?",
        a: "The system includes a webhook testing tool that lets you trigger test events and verify your endpoint is receiving data correctly. You can also view webhook delivery logs and response codes.",
      },
    ],
    detailImage: "/images/features/feature-webhooks.jpg",
    plans: PE,
    showInNav: true,
    showInGrid: true,
    featureGroupId: "platform-integrations",
  },
  {
    slug: "listings",
    title: "Property Listings",
    description:
      "Browse and search verified apartments, maisonettes, and TPS homes across Kenya.",
    bullets: [
      "Verified listings across Kenya",
      "Search and filtering",
      "Details and images",
    ],
    iconKey: "MagnifyingGlass",
    what: "Nyumba Zetu's Property Listings feature provides a comprehensive platform for browsing and discovering verified rental properties across Kenya. Whether you're looking for apartments in Nairobi, maisonettes in Mombasa, or TPS homes in various cities, the listings platform offers an intuitive search experience with detailed property information, high-quality images, and direct contact options.",
    how: "Property owners and managers can list their properties through the Nyumba Zetu platform, providing details such as location, size, rent, amenities, and property type. The listings are verified to ensure accuracy and quality. Tenants and prospective renters can browse listings using advanced filters including location (city and area), property type, rent range, number of bedrooms, and amenities.",
    why: "Finding the right rental property in Kenya can be challenging, with information scattered across multiple platforms and limited verification. Nyumba Zetu's Property Listings platform centralizes verified property information, making it easier for tenants to find suitable homes and for property owners to reach qualified tenants.",
    faqs: [
      {
        q: "What types of properties are listed?",
        a: "The platform includes apartments, maisonettes, houses, and TPS (Tenant Purchase Scheme) properties across various cities in Kenya.",
      },
      {
        q: "How are listings verified?",
        a: "Listings are verified to ensure accuracy of property details, location, and availability.",
      },
      {
        q: "Can I filter listings by location?",
        a: "Yes, you can filter listings by city and area, allowing you to find properties in specific neighborhoods or regions across Kenya.",
      },
      {
        q: "How do I contact a property owner?",
        a: "Each listing includes contact information and a direct contact option.",
      },
      {
        q: "Can property managers list their properties?",
        a: "Yes, property managers using Nyumba Zetu can list available properties directly from their property portfolio.",
      },
      {
        q: "Are TPS properties included?",
        a: "Yes, the platform includes Tenant Purchase Scheme (TPS) properties.",
      },
    ],
    detailImage: "/images/features/feature-listings.jpg",
    plans: PE,
    showInNav: true,
    showInGrid: true,
    featureGroupId: "operations",
  },
  {
    slug: "visitors",
    title: "Visitor Management",
    description:
      "Register and track visitors with check-in/check-out, host linking, and visit history.",
    bullets: [
      "Check-in and check-out",
      "Host and unit linking",
      "Visit history and reports",
    ],
    iconKey: "UserPlus",
    what: "Nyumba Zetu's Visitor Management module lets property managers and security personnel register visitors, record check-in and check-out times, and link each visit to a host (resident or unit). Full visit history is maintained for security audits and compliance.",
    how: "Visitors are registered at the gate or reception with name, contact, and host details. Check-in and check-out timestamps are recorded. Reports show visit history by date, visitor, unit, or property. The feature integrates with your existing property and unit data so hosts are selected from current residents or units.",
    why: "Controlled visitor access improves security, supports incident investigation, and meets compliance requirements for many residential and commercial properties. Centralized visitor records replace paper logbooks and make reporting straightforward.",
    faqs: [
      {
        q: "Can I link a visitor to a specific unit or resident?",
        a: "Yes, each visit can be linked to a host (resident) and unit so you know who the visitor came to see.",
      },
      {
        q: "Is visit history searchable?",
        a: "Yes, you can search and filter visit history by date, visitor name, unit, or property and export for reporting.",
      },
    ],
    detailImage: "/images/features/feature-visitors.jpg",
    plans: PE,
    showInNav: true,
    showInGrid: true,
    featureGroupId: "operations",
  },
  {
    slug: "reports",
    title: "Reports & Analytics",
    description:
      "Financial reports, tenant ledgers, trial balance, P&L, balance sheet, and RAG-powered insights.",
    bullets: [
      "Landlord statements and tenant ledgers",
      "Trial balance, P&L, balance sheet",
      "Ask Nyumba Zetu (RAG) for insights",
    ],
    iconKey: "ChartBarSquare",
    what: "Nyumba Zetu provides a full reporting suite: landlord statements, tenant ledgers, income summaries, trial balance, profit & loss, balance sheet, and cash flow—filterable by property, unit, or branch. Ask Nyumba Zetu (RAG) lets you query policies, invoices, and statements in natural language.",
    how: "Run standard reports from the Reports module with date ranges and filters. Accounting reports (trial balance, P&L, balance sheet) use the general ledger. Tenant and landlord reports use lease and payment data. Ask Nyumba Zetu uses RAG to answer questions over your uploaded policies and financial data.",
    why: "Accurate, export-ready reports are essential for owners, auditors, and management. Centralizing reporting in the platform avoids spreadsheets and ensures consistency. RAG-powered insights make it easier to find answers in long documents and statements.",
    faqs: [
      {
        q: "Can I export reports?",
        a: "Yes, reports can be exported in common formats for sharing with stakeholders and auditors.",
      },
      {
        q: "What is Ask Nyumba Zetu?",
        a: "Ask Nyumba Zetu is an RAG-powered feature that answers questions using your organization's policies, invoices, and statements so you can get insights without manually searching documents.",
      },
    ],
    detailImage: "/images/features/feature-reports.jpg",
    plans: FPSE,
    freeTierLevel: "basic",
    showInNav: true,
    showInGrid: true,
    homePageOrder: 6,
    featureGroupId: "collections-finance",
  },
  {
    slug: "reports-advanced",
    title: "Advanced Reports & Analytics",
    description:
      "Custom reports, dashboards, RAG (Ask Nyumba Zetu), and export options.",
    plans: PE,
    showInNav: false,
    showInGrid: false,
    featureGroupId: "collections-finance",
  },
  {
    slug: "lease-applications",
    title: "Lease Applications",
    description:
      "Manage lease applications, approvals, and onboarding from a single workflow.",
    bullets: [
      "Application submission and tracking",
      "Approval workflows and KYC",
      "Onboarding to lease and units",
    ],
    iconKey: "ClipboardDocumentList",
    what: "The Lease Applications module handles the full journey from application submission to lease and unit onboarding. Applicants submit details online; managers run approval workflows, collect KYC documents, and once approved, onboard the tenant into leases and units.",
    how: "Applicants use the apply flow to submit applications. Managers review applications, request KYC, and approve or reject. Approved applicants are converted to residents and linked to leases and units. The workflow is configurable and integrated with documents and permissions.",
    why: "Streamlining applications reduces time-to-lease and ensures consistent KYC and approval standards. Having applications and onboarding in the same platform as leases and finance keeps data in one place.",
    faqs: [
      {
        q: "Can applicants track their application status?",
        a: "Yes, applicants can track the status of their application through the application portal.",
      },
      {
        q: "Is KYC document storage included?",
        a: "Yes, KYC documents can be uploaded, stored, and linked to applications and tenant records with appropriate access controls.",
      },
    ],
    detailImage: "/images/features/feature-lease-applications.jpg",
    plans: PE,
    showInNav: true,
    showInGrid: true,
    featureGroupId: "leasing-tenants",
  },
  {
    slug: "smart-meters",
    title: "Smart Meters & Utilities",
    description:
      "IoT meter readings, consumption tracking, billing runs, and utility management.",
    bullets: [
      "Smart meter integration and readings",
      "Consumption and tariff tracking",
      "Automated utility billing",
    ],
    iconKey: "Bolt",
    what: "Nyumba Zetu's Smart Meters & Utilities feature connects IoT meters to the platform for automated readings, consumption tracking, and tariff-based billing. Billing runs generate utility charges from consumption data.",
    how: "Meters are registered and linked to units. Readings are collected via integration (API or manual entry). Tariffs define rates; billing runs calculate consumption and create charges or invoices. The system supports multiple meter types and vendors.",
    why: "Automating meter reading and utility billing reduces manual errors and disputes, and gives tenants and managers clear consumption and cost visibility. IoT integration scales across many units and meters.",
    faqs: [
      {
        q: "Which meter types are supported?",
        a: "The platform supports integration with various IoT meter vendors and manual meter reading entry. Supported types and APIs depend on your deployment.",
      },
      {
        q: "How are billing runs executed?",
        a: "Billing runs use consumption data and configured tariffs to generate charges or invoices, which then flow into the standard finance and collections workflow.",
      },
    ],
    detailImage: "/images/features/feature-smart-meters-water.png",
    plans: PE,
    showInNav: true,
    showInGrid: true,
    featureGroupId: "platform-integrations",
  },
];
