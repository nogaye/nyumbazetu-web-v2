/**
 * API Route: POST /api/property-inquiry
 * 
 * Handles property inquiry submissions from the listing detail page.
 * Stores inquiries in Supabase and optionally sends email notifications.
 */

import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";

export const runtime = "edge"; // Use Edge Runtime for better performance

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { propertyId, propertySlug, propertyTitle, name, email, phone, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Get metadata from request
    const userAgent = request.headers.get("user-agent") || "";
    const referer = request.headers.get("referer") || "";
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "";

    // If Supabase is configured, store the inquiry
    if (supabaseAdmin) {
      const inquiryData = {
        property_id: propertyId || null,
        property_slug: propertySlug || null,
        property_title: propertyTitle || null,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone?.trim() || null,
        message: message.trim(),
        source: "listing_detail",
        metadata: {
          user_agent: userAgent,
          referer,
          ip,
          submitted_at: new Date().toISOString(),
        },
      };

      const { data, error } = await (supabaseAdmin
        .from("property_inquiries") as any)
        .insert(inquiryData as any)
        .select()
        .single();

      if (error) {
        console.error("Error storing property inquiry:", error);
        // Don't fail the request if database insert fails
        // You might want to log to an error tracking service
      } else {
        console.log("Property inquiry stored:", data.id);
      }
    } else {
      console.log("Supabase not configured. Inquiry data:", {
        propertyId,
        propertyTitle,
        name,
        email,
        phone,
        message,
      });
    }

    // TODO: Send email notification
    // You can integrate with:
    // - Resend (https://resend.com)
    // - SendGrid
    // - Supabase Edge Function for email
    // - Your email service provider
    //
    // Example with Resend:
    // await resend.emails.send({
    //   from: 'inquiries@nyumbazetu.com',
    //   to: 'property-owner@example.com',
    //   subject: `New inquiry for ${propertyTitle}`,
    //   html: `<p>${name} (${email}) is interested in ${propertyTitle}...</p>`
    // });

    // Track successful submission (client-side tracking will happen in the component)

    return NextResponse.json(
      {
        success: true,
        message: "Your inquiry has been submitted successfully. We'll get back to you soon!",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing property inquiry:", error);

    // Track failed submission (client-side tracking will happen in the component)

    return NextResponse.json(
      {
        error: "Something went wrong. Please try again later.",
      },
      { status: 500 }
    );
  }
}

// Optional: GET endpoint to check if API is working
export async function GET() {
  return NextResponse.json(
    {
      message: "Property Inquiry API is running",
      endpoints: {
        POST: "/api/property-inquiry - Submit a property inquiry",
      },
    },
    { status: 200 }
  );
}

