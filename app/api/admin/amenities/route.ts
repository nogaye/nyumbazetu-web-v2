/**
 * API Route: GET /api/admin/amenities, POST /api/admin/amenities
 *
 * Admin endpoints for listing and creating amenity definitions.
 * Used by the admin Amenities page and property-amenity assignment.
 */

import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";

/** GET - List amenities (active only by default; optional include inactive). */
export async function GET(request: NextRequest) {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: "Supabase not configured", amenities: [], total: 0 },
        { status: 200 },
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const includeInactive = searchParams.get("include_inactive") === "true";
    const limit = Math.min(parseInt(searchParams.get("limit") || "100", 10), 200);
    const offset = parseInt(searchParams.get("offset") || "0", 10);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Supabase builder
    let query = (supabaseAdmin as any)
      .from("tb_listing_amenities")
      .select("id, uuid, name, code, icon, category, description, sort_order, is_active, created_at", { count: "exact" })
      .eq("is_deleted", false)
      .order("sort_order", { ascending: true })
      .order("name", { ascending: true })
      .range(offset, offset + limit - 1);

    if (!includeInactive) {
      query = query.eq("is_active", true);
    }

    const { data, error, count } = await query;

    if (error) {
      console.error("Error fetching amenities:", error);
      return NextResponse.json(
        { error: "Failed to fetch amenities", details: error.message },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { amenities: data || [], total: count ?? 0, limit, offset },
      { status: 200 },
    );
  } catch (err) {
    console.error("Error in admin amenities GET:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/** POST - Create a new amenity. */
export async function POST(request: NextRequest) {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
    }

    const body = await request.json();
    const { name, code, icon, category, description, sort_order, is_active } = body;

    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const insertPayload: Record<string, unknown> = {
      name: name.trim(),
      code: code?.trim() || null,
      icon: icon?.trim() || null,
      category: category?.trim() || null,
      description: description?.trim() || null,
      sort_order: typeof sort_order === "number" ? sort_order : 0,
      is_active: is_active !== false,
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Supabase builder
    const { data, error } = await (supabaseAdmin as any)
      .from("tb_listing_amenities")
      .insert(insertPayload)
      .select()
      .single();

    if (error) {
      console.error("Error creating amenity:", error);
      return NextResponse.json(
        { error: "Failed to create amenity", details: error.message },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true, amenity: data }, { status: 201 });
  } catch (err) {
    console.error("Error in admin amenities POST:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
