/**
 * API Route: GET /api/admin/properties/[id]/amenities, POST /api/admin/properties/[id]/amenities, DELETE
 *
 * Admin endpoints for listing and managing amenities assigned to a property.
 * GET returns assigned amenities; POST assigns one; DELETE unassigns one.
 */

import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";

/** GET - List amenities assigned to this property. */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const propertyId = parseInt(id, 10);
    if (Number.isNaN(propertyId)) {
      return NextResponse.json({ error: "Invalid property id" }, { status: 400 });
    }

    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: "Supabase not configured", assigned: [] },
        { status: 200 },
      );
    }

    // Fetch junction rows with amenity details
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Supabase builder
    const { data: junctions, error: junctionError } = await (supabaseAdmin as any)
      .from("tb_listing_property_amenities")
      .select("id, amenity_id, notes, is_active")
      .eq("property_id", propertyId)
      .eq("is_deleted", false);

    if (junctionError) {
      console.error("Error fetching property amenities:", junctionError);
      return NextResponse.json(
        { error: "Failed to fetch property amenities", assigned: [] },
        { status: 500 },
      );
    }

    if (!junctions?.length) {
      return NextResponse.json({ assigned: [] }, { status: 200 });
    }

    const amenityIds = junctions.map((j: { amenity_id: number }) => j.amenity_id);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Supabase builder
    const { data: amenities, error: amenityError } = await (supabaseAdmin as any)
      .from("tb_listing_amenities")
      .select("id, name, code, icon, category, sort_order")
      .in("id", amenityIds)
      .eq("is_deleted", false);

    if (amenityError) {
      console.error("Error fetching amenities:", amenityError);
      return NextResponse.json(
        { error: "Failed to fetch amenities", assigned: [] },
        { status: 500 },
      );
    }

    const amenityMap = Object.fromEntries(
      (amenities || []).map((a: { id: number }) => [a.id, a]),
    );
    const assigned = junctions.map((j: { id: number; amenity_id: number; notes: string | null; is_active: boolean }) => ({
      ...amenityMap[j.amenity_id],
      assignment_id: j.id,
      amenity_id: j.amenity_id,
      notes: j.notes,
      is_active: j.is_active,
    }));

    return NextResponse.json({ assigned }, { status: 200 });
  } catch (err) {
    console.error("Error in admin property amenities GET:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/** POST - Assign an amenity to this property. Body: { amenity_id: number, notes?: string }. */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const propertyId = parseInt(id, 10);
    if (Number.isNaN(propertyId)) {
      return NextResponse.json({ error: "Invalid property id" }, { status: 400 });
    }

    const body = await request.json();
    const amenityId = body?.amenity_id != null ? parseInt(String(body.amenity_id), 10) : NaN;
    if (Number.isNaN(amenityId)) {
      return NextResponse.json({ error: "amenity_id is required" }, { status: 400 });
    }

    if (!supabaseAdmin) {
      return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
    }

    const notes = typeof body.notes === "string" ? body.notes.trim() || null : null;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Supabase builder
    const { data, error } = await (supabaseAdmin as any)
      .from("tb_listing_property_amenities")
      .insert({
        property_id: propertyId,
        amenity_id: amenityId,
        notes,
        is_active: true,
      })
      .select()
      .single();

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json(
          { error: "This amenity is already assigned to the property" },
          { status: 409 },
        );
      }
      console.error("Error assigning amenity:", error);
      return NextResponse.json(
        { error: "Failed to assign amenity", details: error.message },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true, assignment: data }, { status: 201 });
  } catch (err) {
    console.error("Error in admin property amenities POST:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/** DELETE - Unassign an amenity from this property. Query: ?amenity_id=123 or body { amenity_id: 123 }. */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const propertyId = parseInt(id, 10);
    if (Number.isNaN(propertyId)) {
      return NextResponse.json({ error: "Invalid property id" }, { status: 400 });
    }

    let amenityId: number | null = null;
    const q = request.nextUrl.searchParams.get("amenity_id");
    if (q) {
      amenityId = parseInt(q, 10);
    } else {
      try {
        const body = await request.json();
        if (body?.amenity_id != null) amenityId = parseInt(String(body.amenity_id), 10);
      } catch {
        // no body
      }
    }
    if (amenityId == null || Number.isNaN(amenityId)) {
      return NextResponse.json({ error: "amenity_id is required" }, { status: 400 });
    }

    if (!supabaseAdmin) {
      return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
    }

    // Soft-delete the junction row
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Supabase builder
    const { error } = await (supabaseAdmin as any)
      .from("tb_listing_property_amenities")
      .update({
        is_deleted: true,
        is_active: false,
        deleted_at: new Date().toISOString(),
      })
      .eq("property_id", propertyId)
      .eq("amenity_id", amenityId);

    if (error) {
      console.error("Error unassigning amenity:", error);
      return NextResponse.json(
        { error: "Failed to unassign amenity", details: error.message },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true, message: "Amenity unassigned" }, { status: 200 });
  } catch (err) {
    console.error("Error in admin property amenities DELETE:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
