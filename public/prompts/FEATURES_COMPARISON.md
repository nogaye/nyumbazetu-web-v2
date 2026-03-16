# Feature comparison: API / App vs Marketing Web

This document compares **features implemented in nyumbazetu-api and nyumbazetu-app** with **features presented on nyumbazetu-web** (marketing site). Use it to keep the marketing site aligned with the product and to spot gaps.

---

## 1. Features on the marketing web (nyumbazetu-web)

Sources: **feature-grid.tsx**, **app/features/page.tsx**, **app/features/[slug]/page.tsx**, **legacy-features.tsx**, **app/product/page.tsx**.

| # | Feature (Web) | Where shown | Slug / Link |
|---|----------------|-------------|-------------|
| 1 | Automated Invoicing & Payment Reconciliation | Grid, Features, Product | `/features/collections` |
| 2 | Accounting & General Ledger | Grid, Features, Product | `/features/accounting` |
| 3 | Tenant & Owner Experience | Grid, Features, Product | `/features/tenant-experience` |
| 4 | Maintenance & Assets | Grid, Features, Product | `/features/maintenance` |
| 5 | Tasks & Projects | Grid, Features, Product | `/features/tasks` |
| 6 | KRA eTIMS & Compliance | Grid, Features, Product | `/features/etims` |
| 7 | TPS & Rent-to-Own | Grid, Features, Product | `/features/tps` |
| 8 | Communication Hub | Grid, Features, Product | `/features/communications` |
| 9 | CRM | Grid, Features | `/features/crm` |
| 10 | White Labeling | Grid, Features | `/features/white-labeling` |
| 11 | Calendar & Event Scheduling | Grid, Features | `/features/calendar-scheduling` |
| 12 | Webhooks & API Events | Grid, Features | `/features/webhooks` |
| 13 | Property Listings | Grid, Features | `/features/listings` |
| 14 | Visitor Management | Grid, Features, Legacy | `/features/visitors` |
| 15 | Reports & Analytics | Grid, Features, Legacy | `/features/reports` |
| 16 | Lease Applications | Grid, Features | `/features/lease-applications` |
| 17 | Smart Meters & Utilities | Grid, Features | `/features/smart-meters` |
| 18 | Security Deposits | Grid, Features | `/features/security-deposits` |

**Legacy home (different wording):** Digital Invoices & Receipts, Bill Payments & Auto-Reconciliation, Financial Reports & Statements, Tenant & Lease Management, Automated Communication & Reminders, Expense & Vendor Management, Mobile App Access, WhatsApp Chatbot Assistant, ETIMS Integration, Visitor Management, Reports & Analytics.

**Product page “Core Modules”:** 8 items (Collections, Accounting, Tenant Experience, Maintenance, Tasks, eTIMS, TPS, Communications) — no separate cards for CRM, White Labeling, Calendar, Webhooks, Listings, Visitors, Reports, Lease Applications, Smart Meters, Security Deposits.

---

## 2. Features in the API (nyumbazetu-api)

Sources: **Express routes** (`src/routes/routes.ts`), **NestJS app.module** (schedules, webhooks, IoT, tax, QuickBooks, banking, approvals, RAG, docs, letters, adhoc-documents, etc.).

### 2.1 Express (core) routes

| Area | Route(s) | Purpose |
|------|----------|---------|
| Auth | `/v1/auth` | Login, token, current user |
| Payments | `/v1/payments`, `/payment/receive` | Payments CRUD, receive webhook |
| Dashboard | `/v1/dashboard` | Dashboard data |
| Invoicing | `/v1/pre-invoice`, `/v1/invoices`, `/v1/invoice-generator` | Pre-invoice, invoices, generator |
| Documents | `/v1/documents`, `/v1/finance-documents` | Documents, finance docs |
| Units / Leases | `/v1/units` | Units (leases) |
| Domains | `/v1/domains` | Domains (white-label) |
| Jobs | `/v1/jobs` | Background jobs |
| Bank accounts | `/v1/bank-accounts` | Bank account config |
| Users | `/v1/users`, `/v1/users-sessions` | Users, sessions |
| Residents | `/v1/residents` | Tenants/residents |
| Visitors | `/v1/visitors` | Visitor management |
| Service requests | `/v1/service-requests` | Maintenance requests |
| Lookups | `/v1/lookups` | Reference data |
| Finance | `/v1/finance` | Finance aggregate |
| Contacts | `/v1/contacts` | CRM contacts |
| Web (marketing) | `/v1/web-contacts`, `/v1/web-blogs` | Web contacts, blogs |
| Notices | `/v1/notices` | Notice board |
| Teams | `/v1/teams` | Teams |
| Roles | `/v1/roles` | Roles |
| Profiles | `/v1/profiles` | User profiles |
| Utilities | `/v1/utilities` | Utilities (non-IoT) |
| File upload | `/v1/file-upload` | File upload |
| Ag-Grid | `/v1/ag-grid` | Generic grid/data (invoices, payments, etc.) |
| Budgets | `/v1/budgets`, `/v1/budget-reports` | Budgets, reports |
| Activities | `/v1/activities` | Activity/audit log |
| Tenures | `/v1/tenures` | Tenures |
| File generator | `/v1/file-generator` | Document generation |
| Scrumboard | `/v1/scrumboard` | Tasks / kanban |
| Notes | `/v0/notes`, `/v1/notes`, `/v1/tags` | Notes, tags |
| Onboard | `/v1/onboard` | Onboarding |
| Polls | `/v1/polls` | Polls / voting |
| Permissions | `/v1/permissions` | Permissions |
| User roles | `/v1/user-roles` | User-role assignment |
| Payment import | `/v1/payment-import` | Payment import |
| Applications | `/v1/applications` | Lease applications |
| Payments manager | `/v1/payments-manager` | Payment management |
| Payment rules | `/v1/payment-rules`, `/v2/payment-rules` | Payment rules v1/v2 |
| Marketplace | `/v1/marketplace` | Marketplace |
| Reports | `/v1/reports` | Reports |
| Charges | `/v1/charges` | Recurring charges |
| Ledger | `/v1/ledger` | General ledger |
| Chats | `/v1/chats` | In-app chat |
| Mailbox | `/v1/mailbox` | Mailbox / comms |
| eTIMS | `/v1/etims` | KRA eTIMS |
| Email / AWS | `/v1/email`, `/v1/aws` | Email, AWS comms |
| WhatsApp | `/v1/whatsapp`, `/v1/sc-whatsapp` | WhatsApp, SugarCubes |
| M-Pesa | `/v1/mpesa` | M-Pesa |
| Banks | `/v1/daraja`, `/v1/ncba`, `/v1/dtb`, `/v1/equity`, `/v1/kcb`, `/v1/coop`, `/v1/sbm`, `/v1/iandm`, `/v1/stanbic`, `/v1/gab`, `/v1/gulf`, `/v1/hfc`, `/v1/stripe`, `/v1/bomayangu`, `/v1/oauth`, `/v1/pesapal`, `/v1/quickbooks` | Bank/payment integrations |
| Transactions | `/transactions` | Transactions |

### 2.2 NestJS modules (app.module) – not always exposed as Express routes

| Module | Purpose |
|--------|---------|
| SchedulesModule | Scheduled jobs (calendar/scheduling) |
| WebhooksModule | Outbound webhooks |
| EventSyncModule | Event sync |
| PaymentsAutomationModule | Payment automation |
| ProjectManagementModule | Projects / tasks |
| ProjectAssignmentModule | Project assignment |
| TpsComplianceModule | TPS compliance |
| TaxModule | Tax / eTIMS integration |
| IntegrationsModule | Integrations core (connections, webhooks) |
| QuickbooksModule | QuickBooks |
| BankingModule | Banking integrations |
| IotModule | Smart meters, readings, billing runs, webhooks |
| ReportsModule | Reports |
| RagModule | Ask Nyumba Zetu (RAG) |
| DocsModule | Document templates |
| LettersModule | Letter composer |
| AdhocDocumentsModule | Ad-hoc documents (invoices, receipts, etc.) |
| ExpenseLifecycleModule | Expense lifecycle |
| ApprovalsModule | Approval workflows |
| FinancialReportsModule | Accounting reports |
| BankReconciliationModule | Bank reconciliation |
| FiscalYearModule | Fiscal year |
| LedgerTraceModule | Ledger trace |
| CloseToolkitModule | Period close |
| AssetsModule | Asset management |
| CloseWorkflowModule | Close workflow |
| SettingsModule | Settings |
| OrganizationsModule, BranchesModule, BlocksModule, UnitsModule, LeasesModule, LeaseChargesModule | Core org structure |
| BrandingModule | Branding (white-label) |
| OwnersModule | Owners / management contracts |

---

## 3. Features in the app (nyumbazetu-app)

Sources: **app.routes.ts**, **PermissionType** (user.types.ts). Grouped by feature area.

| Feature area | App route(s) / module | Notes |
|--------------|------------------------|-------|
| **Automated invoicing & payment reconciliation** | `payments`, `payments-2`, `payments-view`, `receive-pay`, `payment-rules`, `payment-allocation-rules`, `charges`, `recurring-charges`, `adjustments`, `invoices`, `tax-schedule`, `expense/payments` | Full flow |
| **Accounting** | `finance`, `accounting-ledger`, `accounting-reports`, `lookups`, `statements` | Ledger, reports, COA |
| **Tenant / owner experience** | `profile`, `residents`, `tenant-portal`, `contacts`, `transactions`, `financial-records`, `polls`, `vote`, `bills`, `invoice` (public) | Portals, bills, polls |
| **Maintenance & assets** | `service-requests`, `maintenance`, `assets` | Requests, work orders, assets |
| **Tasks & projects** | `tasks`, `tasks-2`, `comments`, `project-assignment`, `scrumboard` | PM, kanban, comments |
| **eTIMS** | `etims` | eTIMS UI |
| **TPS & rent-to-own** | `tps` | TPS contracts, schedules |
| **Communications** | `communications`, `mailbox`, `chat` | Comms hub, mailbox, chat |
| **CRM** | `sales`, `vendors`, `contacts`, `landlords`, `employees`, `suppliers`, `marketing` | Sales, contacts, vendors, marketing leads |
| **White labeling** | (domains in API; app may use branch/org branding) | Config-driven |
| **Calendar / scheduling** | `schedules` | Recurring tasks, invoice dates |
| **Webhooks** | (API: WebhooksModule, IntegrationsModule) | No dedicated app UI in routes |
| **Property listings** | — | **Web-only** (nyumbazetu-web `/listings`) |
| **Visitor management** | `visitors` | Check-in/out, host linking |
| **Reports & analytics** | `reports`, `report`, `rag`, `dashboard` (under report) | Reports, RAG, dashboard |
| **Lease applications** | `apply`, `applications` | Apply flow, applications list |
| **Smart meters / utilities** | `iot`, `utilities` | IoT meters, utilities |
| **Security deposits** | `security-deposits` | Deposits by unit |
| **Leases / units** | `lease`, `leases`, `units`, `units-list` | Leases, units |
| **Documents** | `documents`, `docs`, `letter`, `adhoc-documents` | Docs, templates, letters |
| **Budgets** | `budgets`, `budget-reports` | Budgets, reports |
| **Approvals** | `approvals` | Approval workflows |
| **Refunds** | (refunds route / module) | Refunds |
| **Banks** | `banks` | Bank config |
| **QuickBooks** | `quickbooks` | QuickBooks export |
| **Onboarding** | `onboard` (auth flow) | User onboarding |
| **Activities** | `activities` | Activity log |
| **Users & roles** | `settings`, `user-sessions` | Settings, sessions (users/roles in settings) |
| **Notice board** | (API: notices) | Notices |
| **File / bulk upload** | `file-upload` | Bulk upload |
| **Portfolios** | `portfolios` | Portfolios |
| **Owners / management** | `owners` | Management contracts |
| **Amenities** | `amenities` | Amenities |
| **Disbursements** | `disbursements` | Disbursements |
| **Help / academy** | `help-center`, `academy` | Help, academy |
| **Other** | `blocks`, `properties`, `companies`, `building`, `request-reports`, `notes`, `config-settings` | Blocks, properties, notes, etc. |

---

## 4. Side-by-side: implemented vs marketing

### 4.1 ✅ Implemented in API/App and shown on Web

| Feature | API | App | Web (grid / features / product) |
|---------|-----|-----|----------------------------------|
| Automated invoicing & payment reconciliation | ✅ payments, invoices, charges, receive | ✅ payments, invoices, receive-pay, charges | ✅ |
| Accounting & general ledger | ✅ ledger, finance, ag-grid | ✅ finance, accounting-ledger, accounting-reports | ✅ |
| Tenant & owner experience | ✅ residents, profiles | ✅ profile, tenant-portal, residents | ✅ |
| Maintenance & assets | ✅ service-requests | ✅ service-requests, maintenance, assets | ✅ |
| Tasks & projects | ✅ scrumboard | ✅ tasks, scrumboard, project-assignment | ✅ |
| KRA eTIMS | ✅ etims | ✅ etims | ✅ |
| TPS & rent-to-own | ✅ (Nest + core) | ✅ tps | ✅ |
| Communication hub | ✅ chats, mailbox, email, whatsapp | ✅ communications, mailbox, chat | ✅ |
| CRM | ✅ contacts | ✅ sales, contacts, vendors, marketing | ✅ |
| Calendar & event scheduling | ✅ jobs, schedules (Nest) | ✅ schedules | ✅ |
| Visitor management | ✅ visitors | ✅ visitors | ✅ |
| Reports & analytics | ✅ reports (Nest RagModule) | ✅ reports, report, rag | ✅ |
| Lease applications | ✅ applications | ✅ apply, applications | ✅ |
| Smart meters & utilities | ✅ IotModule (Nest) + utilities | ✅ iot, utilities | ✅ |
| Security deposits | (in units/finance) | ✅ security-deposits | ✅ |

### 4.2 ⚠️ Implemented in API/App but not (or barely) on Web

| Feature | API | App | Web | Suggestion |
|---------|-----|-----|-----|------------|
| **Approvals** | ✅ ApprovalsModule | ✅ approvals | ❌ No feature card | Add “Approvals & workflows” to grid/features or fold into “Finance” or “Operations”. |
| **Refunds** | ✅ (payments/refunds) | ✅ refunds | ❌ No feature card | Mention under Collections or add short “Refunds” highlight. |
| **Budgets** | ✅ budgets, budget-reports | ✅ budgets, budget-reports | ❌ No feature card | Add “Budgets & planning” or include in Reports. |
| **Documents & templates** | ✅ Docs, Letters, AdhocDocuments | ✅ documents, docs, letter, adhoc-documents | ❌ No feature card | Add “Documents & templates” (letters, branded PDFs). |
| **Bank reconciliation** | ✅ BankReconciliationModule | (in accounting/finance) | ❌ Not called out | Mention under Accounting or Collections. |
| **QuickBooks export** | ✅ QuickbooksModule | ✅ quickbooks | ❌ Not called out | Already in accounting highlights; ensure “QuickBooks” is in copy. |
| **Multiple bank/payment methods** | ✅ Many bank routes | ✅ banks, receive-pay | ❌ Not called out | Already under Collections; optional “Bank integrations” card. |
| **Dashboard** | ✅ dashboard | ✅ report/dashboard | ❌ No feature card | Optional “Executive dashboard” or part of Reports. |
| **RAG (Ask Nyumba Zetu)** | ✅ RagModule | ✅ rag | ✅ Under Reports | — |
| **Onboarding** | ✅ onboard | ✅ onboard | ❌ No feature card | Optional “Onboarding” or part of Tenant experience. |
| **Polls / voting** | ✅ polls | ✅ polls, vote | ❌ No feature card | Optional “Polls & voting” or part of Tenant experience. |
| **Activity / audit log** | ✅ activities | ✅ activities | ❌ No feature card | Optional “Audit & activity log” or under Security/Compliance. |
| **Portfolios** | (in core) | ✅ portfolios | ❌ No feature card | Optional or part of “Properties & portfolios”. |
| **Owners / management contracts** | ✅ OwnersModule | ✅ owners | ❌ No feature card | Optional or part of CRM/Finance. |
| **Amenities** | (in core/ag-grid) | ✅ amenities | ❌ No feature card | Optional or part of Tenant experience. |
| **Disbursements** | (in payments/finance) | ✅ disbursements | ❌ No feature card | Optional or under Finance/Payables. |
| **Notice board** | ✅ notices | (API only in list) | ❌ No feature card | Optional “Notice board” or under Communications. |
| **Help / Academy** | — | ✅ help-center, academy | ❌ No feature card | Optional “Help & training”. |

### 4.3 ✅ On Web; implementation note

| Feature | API | App | Web | Note |
|---------|-----|-----|-----|------|
| **White labeling** | ✅ domains, BrandingModule | Config / branding | ✅ | Implemented; ensure copy matches (domains, branding). |
| **Webhooks & API events** | ✅ WebhooksModule, IntegrationsModule, IoT webhooks | No dedicated UI in routes | ✅ | API supports webhooks; app may configure via settings/integrations. |
| **Property listings** | — | — | ✅ | **Web-only**: public listings on nyumbazetu-web; no matching API/app “listings” product. |

---

## 5. Summary: what’s missing on the web

- **Not on marketing at all:** Approvals, Refunds, Budgets, Documents & templates (letters, adhoc), Bank reconciliation, Dashboard, Onboarding, Polls/voting, Activity/audit log, Portfolios, Owners/management contracts, Amenities, Disbursements, Notice board, Help/Academy.
- **Only briefly or implicitly:** QuickBooks (in accounting copy), multiple bank integrations (under Collections), RAG (under Reports).
- **Product page:** Only 8 “Core Modules” listed; consider adding Reports, Visitors, Lease applications, Smart meters, Security deposits, and optionally Listings so product page matches the feature grid.

---

## 6. Recommended next steps

1. **Product page**  
   Add the same feature set as the grid (or a short “And more” list): Reports & Analytics, Visitor Management, Lease Applications, Smart Meters & Utilities, Security Deposits, Property Listings (as “Web listings”), and optionally Approvals, Budgets, Documents.

2. **New feature cards (optional)**  
   Add one or more of: Approvals & workflows, Budgets & planning, Documents & templates, Refunds (or keep as part of Collections).

3. **Copy and slugs**  
   Keep feature slugs and titles in sync across `feature-grid.tsx`, `app/features/page.tsx`, and `app/features/[slug]/page.tsx` (and product page if you add more modules there).

4. **White labeling**  
   Confirm domains/branding in API/app and align marketing copy (custom domain, logo, tenant-facing branding).

5. **Webhooks**  
   If the app has a webhook/integrations UI (e.g. under settings), mention it in the Webhooks feature copy; otherwise describe API-level webhooks.

6. **Property listings**  
   Keep marketing as-is; optionally add a line that listings are on the Nyumba Zetu website (web-only) so it’s clear this is not inside the main app.

---

*Generated from nyumbazetu-api routes, nyumbazetu-app routes, and nyumbazetu-web feature components. Update this doc when adding or removing features in any of the three codebases.*
