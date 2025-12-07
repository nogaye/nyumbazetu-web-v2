/**
 * API Route: GET /api/property-inquiry/admin
 * 
 * Admin endpoint to view property inquiries.
 * Requires authentication (to be implemented).
 * 
 * Query parameters:
 * - limit: Number of results (default: 50)
 * - offset: Pagination offset (default: 0)
 * - status: Filter by status (new, contacted, viewing_scheduled, closed)
 * - property_id: Filter by property ID
 */

import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  try {
    // TODO: Add authentication check
    // const session = await getServerSession();
    // if (!session || !session.user.isAdmin) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get("limit") || "50", 10);
    const offset = parseInt(searchParams.get("offset") || "0", 10);
    const status = searchParams.get("status");
    const propertyId = searchParams.get("property_id");

    if (!supabaseAdmin) {
      return NextResponse.json(
        {
          error: "Supabase not configured",
          inquiries: [],
          total: 0,
        },
        { status: 200 }
      );
    }

    let query = (supabaseAdmin
      .from("property_inquiries") as any)
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    // Apply filters
    if (status) {
      query = query.eq("status", status);
    }

    if (propertyId) {
      query = query.eq("property_id", propertyId);
    }

    const { data, error, count } = await query;

    if (error) {
      console.error("Error fetching inquiries:", error);
      return NextResponse.json(
        { error: "Failed to fetch inquiries", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        inquiries: data || [],
        total: count || 0,
        limit,
        offset,
        hasMore: (count || 0) > offset + limit,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in admin inquiry endpoint:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/property-inquiry/admin
 * 
 * Update inquiry status
 */
export async function PATCH(request: NextRequest) {
  try {
    // TODO: Add authentication check

    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { error: "id and status are required" },
        { status: 400 }
      );
    }

    const validStatuses = ["new", "contacted", "viewing_scheduled", "closed"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: `Invalid status. Must be one of: ${validStatuses.join(", ")}` },
        { status: 400 }
      );
    }

    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: "Supabase not configured" },
        { status: 500 }
      );
    }

    const { data, error } = await (supabaseAdmin
      .from("property_inquiries") as any)
      .update({ status } as any)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating inquiry:", error);
      return NextResponse.json(
        { error: "Failed to update inquiry", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        inquiry: data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating inquiry:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

