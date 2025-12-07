/**
 * API Route: GET /api/admin/properties
 * API Route: POST /api/admin/properties
 * 
 * Admin endpoints for managing properties.
 * Requires authentication (to be implemented).
 */

import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";

// Note: Using Node.js runtime for compatibility with bcryptjs
// export const runtime = "edge";

// GET - List properties with filters
export async function GET(request: NextRequest) {
  try {
    // TODO: Add authentication check
    // const session = await getServerSession();
    // if (!session || !session.user.isAdmin) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get("search");
    const city = searchParams.get("city");
    const propertyType = searchParams.get("property_type");
    const limit = parseInt(searchParams.get("limit") || "50", 10);
    const offset = parseInt(searchParams.get("offset") || "0", 10);

    if (!supabaseAdmin) {
      return NextResponse.json(
        {
          error: "Supabase not configured",
          properties: [],
          total: 0,
        },
        { status: 200 }
      );
    }

    let query = (supabaseAdmin
      .from("properties") as any)
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    // Apply filters
    if (search) {
      query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
    }

    if (city && city !== "all") {
      query = query.eq("city", city);
    }

    if (propertyType && propertyType !== "all") {
      query = query.eq("property_type", propertyType);
    }

    const { data, error, count } = await query;

    if (error) {
      console.error("Error fetching properties:", error);
      return NextResponse.json(
        { error: "Failed to fetch properties", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        properties: data || [],
        total: count || 0,
        limit,
        offset,
        hasMore: (count || 0) > offset + limit,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in admin properties endpoint:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST - Create new property
export async function POST(request: NextRequest) {
  try {
    // TODO: Add authentication check

    const body = await request.json();
    const {
      title,
      slug,
      description,
      city,
      area,
      monthly_rent,
      bedrooms,
      bathrooms,
      size_sqm,
      property_type,
      is_tps_available,
      is_verified,
    } = body;

    // Validation
    if (!title || !slug || !city || !area || !monthly_rent || !bedrooms || !bathrooms || !property_type) {
      return NextResponse.json(
        { error: "Missing required fields" },
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
      .from("properties") as any)
      .insert({
        title,
        slug,
        description: description || null,
        city,
        area,
        monthly_rent: parseInt(monthly_rent),
        bedrooms: parseInt(bedrooms),
        bathrooms: parseInt(bathrooms),
        size_sqm: size_sqm ? parseInt(size_sqm) : null,
        property_type,
        is_tps_available: is_tps_available || false,
        is_verified: is_verified || false,
      } as any)
      .select()
      .single();

    if (error) {
      console.error("Error creating property:", error);
      return NextResponse.json(
        { error: "Failed to create property", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        property: data,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating property:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}


