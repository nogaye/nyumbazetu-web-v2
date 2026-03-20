/**
 * API Route: POST /api/contact
 *
 * Accepts contact form submissions from the public contact page, stores each
 * submission as a sales opportunity in Postgres (via Supabase), and sends an
 * email notification to support.
 */

import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { CONTACT_EMAIL } from "@/lib/constants/contact";
import { supabaseAdmin } from "@/lib/supabase/server";

/**
 * Payload accepted from the contact page form.
 */
type ContactFormPayload = {
  /** Full name of the person submitting the form. */
  name: string;
  /** Company/organization name provided by the submitter. */
  company?: string;
  /** Role/job title provided by the submitter. */
  role?: string;
  /** Portfolio size selected in the form. */
  portfolio?: string;
  /** Contact phone number. */
  phone: string;
  /** Contact email address. */
  email: string;
  /** Optional free-text message. */
  message?: string;
  /** Optional attribution source selected by the submitter. */
  source?: string;
};

/**
 * Context about persistence outcome, included in support notifications so the
 * team can quickly tell whether the lead exists in the database.
 */
type LeadPersistenceContext = {
  /** True when the lead was successfully inserted into tb_sales_opportunities. */
  wasSavedToDatabase: boolean;
  /** Generated database ID when persistence succeeds, otherwise null. */
  leadId: number | null;
  /** Database error details captured for support visibility when save fails. */
  databaseErrorMessage: string | null;
};

/** Fixed org scope requested for contact form opportunities. */
const CONTACT_FORM_ORG_ID = 3;
/** Fixed branch scope requested for contact form opportunities. */
const CONTACT_FORM_BRANCH_ID = 1;
/**
 * Creator user id for opportunity rows. This table requires `created_by`.
 * Override in environment when your production system uses a different
 * service/system user.
 */
const CONTACT_FORM_CREATED_BY_USER_ID = Number(
  process.env.CONTACT_FORM_CREATED_BY_USER_ID ?? "1",
);

/**
 * Validates basic email format for contact form submissions.
 *
 * @param email - Email value to validate.
 * @returns True when the value appears to be a valid email.
 */
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Escapes untrusted text for safe HTML interpolation in emails.
 *
 * @param value - Raw text from user input.
 * @returns HTML-escaped text safe to place in email markup.
 */
function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

/**
 * Builds the sales opportunity insert payload from validated form input.
 *
 * @param payload - Validated contact form submission.
 * @param request - Incoming request, used for metadata capture.
 * @returns Plain object compatible with `tb_sales_opportunities` insert.
 */
function buildOpportunityInsert(
  payload: ContactFormPayload,
  request: NextRequest,
): Record<string, unknown> {
  const userAgent = request.headers.get("user-agent") ?? "";
  const referer = request.headers.get("referer") ?? "";
  const ip =
    request.headers.get("x-forwarded-for") ??
    request.headers.get("x-real-ip") ??
    "";

  const trimmedMessage = payload.message?.trim() ?? "";
  const description = trimmedMessage || "Website contact form submission.";
  const sourceDetail = payload.source?.trim() || "unspecified";

  return {
    org_id: CONTACT_FORM_ORG_ID,
    branch_id: CONTACT_FORM_BRANCH_ID,
    title: `Website contact - ${payload.name.trim()}`,
    description,
    company_name: payload.company?.trim() || null,
    contact_name: payload.name.trim(),
    contact_email: payload.email.trim().toLowerCase(),
    contact_phone: payload.phone.trim(),
    stage: "lead",
    status: "active",
    currency: "KES",
    source: "website_contact_form",
    source_detail: sourceDetail,
    created_by: CONTACT_FORM_CREATED_BY_USER_ID,
    notes: [
      payload.role?.trim() ? `Role: ${payload.role.trim()}` : null,
      payload.portfolio?.trim()
        ? `Portfolio: ${payload.portfolio.trim()}`
        : null,
      `Submitted at: ${new Date().toISOString()}`,
      referer ? `Referrer: ${referer}` : null,
      ip ? `IP: ${ip}` : null,
      userAgent ? `User Agent: ${userAgent}` : null,
    ]
      .filter(Boolean)
      .join("\n"),
  };
}

/**
 * Sends support email with submitted contact details.
 *
 * @param payload - Validated form payload.
 * @param persistence - Database save status details for this submission.
 * @returns Resolves when email send has been attempted successfully.
 * @throws When Resend is misconfigured or the send operation fails.
 */
async function sendSupportEmail(
  payload: ContactFormPayload,
  persistence: LeadPersistenceContext,
): Promise<void> {
  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) {
    throw new Error("RESEND_API_KEY is not configured");
  }

  const resend = new Resend(resendApiKey);
  const fromEmail =
    process.env.CONTACT_FORM_FROM_EMAIL ??
    "Nyumba Zetu Contact <support@tax.ke>";

  const messageBlock = payload.message?.trim()
    ? `<p><strong>Message</strong><br/>${escapeHtml(payload.message.trim())}</p>`
    : "<p><strong>Message</strong><br/>No additional message provided.</p>";
  const databaseStatusText = persistence.wasSavedToDatabase
    ? "Saved to database"
    : "NOT saved to database";
  const leadReferenceText =
    persistence.leadId != null
      ? String(persistence.leadId)
      : "No lead ID generated";
  const databaseErrorBlock = persistence.databaseErrorMessage
    ? `<p style="margin: 8px 0 0 0; color: #b42318;"><strong>Database Error:</strong> ${escapeHtml(
        persistence.databaseErrorMessage,
      )}</p>`
    : "";

  await resend.emails.send({
    from: fromEmail,
    to: CONTACT_EMAIL,
    subject: "Lead Opportunity Submitted on nyumbazetu.com",
    html: `
      <div style="margin: 0; padding: 24px; background: #f8fafc; font-family: Arial, sans-serif; color: #0f172a;">
        <div style="max-width: 720px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
          <div style="padding: 20px 24px; background: #0f172a; color: #ffffff;">
            <p style="margin: 0; font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; opacity: 0.85;">
              Nyumba Zetu
            </p>
            <h1 style="margin: 8px 0 0 0; font-size: 20px; line-height: 1.3;">
              New Lead Opportunity Submitted on nyumbazetu.com
            </h1>
          </div>
          <div style="padding: 24px;">
            <p style="margin: 0 0 16px 0; color: #334155;">
              This notification confirms a new contact form submission from the website.
            </p>

            <div style="margin: 0 0 20px 0; padding: 12px 14px; border-radius: 10px; background: #f8fafc; border: 1px solid #e2e8f0;">
              <p style="margin: 0 0 6px 0;">
                <strong>Database Status:</strong> ${escapeHtml(databaseStatusText)}
              </p>
              <p style="margin: 0;">
                <strong>Lead ID:</strong> ${escapeHtml(leadReferenceText)}
              </p>
              ${databaseErrorBlock}
            </div>

            <h2 style="margin: 0 0 12px 0; font-size: 16px;">Submission Details</h2>
            <p style="margin: 0 0 8px 0;"><strong>Name:</strong> ${escapeHtml(payload.name.trim())}</p>
            <p style="margin: 0 0 8px 0;"><strong>Email:</strong> ${escapeHtml(payload.email.trim().toLowerCase())}</p>
            <p style="margin: 0 0 8px 0;"><strong>Phone:</strong> ${escapeHtml(payload.phone.trim())}</p>
            <p style="margin: 0 0 8px 0;"><strong>Company:</strong> ${escapeHtml(payload.company?.trim() || "Not provided")}</p>
            <p style="margin: 0 0 8px 0;"><strong>Role:</strong> ${escapeHtml(payload.role?.trim() || "Not provided")}</p>
            <p style="margin: 0 0 8px 0;"><strong>Portfolio:</strong> ${escapeHtml(payload.portfolio?.trim() || "Not provided")}</p>
            <p style="margin: 0 0 16px 0;"><strong>Source:</strong> ${escapeHtml(payload.source?.trim() || "Not provided")}</p>
            <div style="margin: 0 0 8px 0; color: #0f172a;">
              ${messageBlock}
            </div>
          </div>
          <div style="padding: 16px 24px; background: #f8fafc; border-top: 1px solid #e2e8f0;">
            <p style="margin: 0; font-size: 12px; color: #64748b;">
              This is an automated notification from nyumbazetu.com contact form submissions.
            </p>
          </div>
        </div>
      </div>
    `,
  });
}

/**
 * Handles contact form submissions.
 *
 * @param request - Incoming HTTP request with JSON payload.
 * @returns JSON response indicating success or failure.
 */
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ContactFormPayload;

    if (!body.name?.trim() || !body.email?.trim() || !body.phone?.trim()) {
      return NextResponse.json(
        { error: "Name, email, and phone are required." },
        { status: 400 },
      );
    }

    if (!isValidEmail(body.email.trim())) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 },
      );
    }

    let wasSavedToDatabase = false;
    let leadId: number | null = null;
    let databaseErrorMessage: string | null = null;
    if (!supabaseAdmin) {
      databaseErrorMessage = "Database is not configured on the server.";
    } else {
      const insertPayload = buildOpportunityInsert(body, request);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Table is not yet present in generated DB types.
      const { data, error: insertError } = await (supabaseAdmin as any)
        .from("tb_sales_opportunities")
        .insert(insertPayload)
        .select("id")
        .single();

      if (insertError) {
        databaseErrorMessage =
          insertError.message ?? "Unknown database insert error.";
        console.error("Failed to insert contact opportunity:", insertError);
      } else {
        wasSavedToDatabase = true;
        leadId =
          data?.id != null && !Number.isNaN(Number(data.id))
            ? Number(data.id)
            : null;
      }
    }

    let emailNotificationSent = true;
    try {
      await sendSupportEmail(body, {
        wasSavedToDatabase,
        leadId,
        databaseErrorMessage,
      });
    } catch (emailError) {
      emailNotificationSent = false;
      // We intentionally do not fail the request here because the lead has
      // already been persisted to tb_sales_opportunities.
      console.error(
        "Contact opportunity saved but email notification failed:",
        {
          error: emailError,
          contactEmail: body.email,
        },
      );
    }

    return NextResponse.json(
      {
        success: wasSavedToDatabase,
        message: wasSavedToDatabase
          ? "Your message has been submitted successfully."
          : "Your message was received but could not be saved in the database.",
        leadId,
        emailNotificationSent,
      },
      { status: wasSavedToDatabase ? 200 : 500 },
    );
  } catch (error) {
    console.error("Error processing contact form submission:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 },
    );
  }
}
