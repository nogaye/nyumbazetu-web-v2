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
 * @returns Resolves when email send has been attempted successfully.
 * @throws When Resend is misconfigured or the send operation fails.
 */
async function sendSupportEmail(payload: ContactFormPayload): Promise<void> {
  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) {
    throw new Error("RESEND_API_KEY is not configured");
  }

  const resend = new Resend(resendApiKey);
  const fromEmail =
    process.env.CONTACT_FORM_FROM_EMAIL ??
    "Nyumba Zetu Contact <onboarding@resend.dev>";

  const messageBlock = payload.message?.trim()
    ? `<p><strong>Message</strong><br/>${escapeHtml(payload.message.trim())}</p>`
    : "<p><strong>Message</strong><br/>No additional message provided.</p>";

  await resend.emails.send({
    from: fromEmail,
    to: CONTACT_EMAIL,
    subject: `New website contact from ${payload.name.trim()}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${escapeHtml(payload.name.trim())}</p>
      <p><strong>Email:</strong> ${escapeHtml(payload.email.trim().toLowerCase())}</p>
      <p><strong>Phone:</strong> ${escapeHtml(payload.phone.trim())}</p>
      <p><strong>Company:</strong> ${escapeHtml(payload.company?.trim() || "Not provided")}</p>
      <p><strong>Role:</strong> ${escapeHtml(payload.role?.trim() || "Not provided")}</p>
      <p><strong>Portfolio:</strong> ${escapeHtml(payload.portfolio?.trim() || "Not provided")}</p>
      <p><strong>Source:</strong> ${escapeHtml(payload.source?.trim() || "Not provided")}</p>
      ${messageBlock}
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

    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: "Database is not configured on the server." },
        { status: 500 },
      );
    }

    const insertPayload = buildOpportunityInsert(body, request);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Table is not yet present in generated DB types.
    const { error: insertError } = await (supabaseAdmin as any)
      .from("tb_sales_opportunities")
      .insert(insertPayload);

    if (insertError) {
      console.error("Failed to insert contact opportunity:", insertError);
      return NextResponse.json(
        { error: "Failed to save your message. Please try again." },
        { status: 500 },
      );
    }

    let emailNotificationSent = true;
    try {
      await sendSupportEmail(body);
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
        success: true,
        message: "Your message has been submitted successfully.",
        emailNotificationSent,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error processing contact form submission:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 },
    );
  }
}
