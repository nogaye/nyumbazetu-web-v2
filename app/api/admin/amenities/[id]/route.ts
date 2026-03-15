/**
 * API Route: GET /api/admin/amenities/[id], PATCH /api/admin/amenities/[id], DELETE /api/admin/amenities/[id]
 *
 * Admin endpoints for single-amenity read, update, and delete.
 */

import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";

/** GET - Fetch one amenity by id. */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const idNum = parseInt(id, 10);
    if (Number.isNaN(idNum)) {
      return NextResponse.json({ error: "Invalid amenity id" }, { status: 400 });
    }

    if (!supabaseAdmin) {
      return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Supabase builder
    const { data, error } = await (supabaseAdmin as any)
      .from("tb_listing_amenities")
      .select("*")
      .eq("id", idNum)
      .eq("is_deleted", false)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: "Amenity not found" }, { status: 404 });
    }

    return NextResponse.json({ amenity: data }, { status: 200 });
  } catch (err) {
    console.error("Error in admin amenities GET [id]:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/** PATCH - Update an amenity. */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const idNum = parseInt(id, 10);
    if (Number.isNaN(idNum)) {
      return NextResponse.json({ error: "Invalid amenity id" }, { status: 400 });
    }

    if (!supabaseAdmin) {
      return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
    }

    const body = await request.json();
    const updateData: Record<string, unknown> = {};
    if (body.name !== undefined) updateData.name = String(body.name).trim();
    if (body.code !== undefined) updateData.code = body.code?.trim() ?? null;
    if (body.icon !== undefined) updateData.icon = body.icon?.trim() ?? null;
    if (body.category !== undefined) updateData.category = body.category?.trim() ?? null;
    if (body.description !== undefined) updateData.description = body.description?.trim() ?? null;
    if (typeof body.sort_order === "number") updateData.sort_order = body.sort_order;
    if (typeof body.is_active === "boolean") updateData.is_active = body.is_active;

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: "No fields to update" }, { status: 400 });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Supabase builder
    const { data, error } = await (supabaseAdmin as any)
      .from("tb_listing_amenities")
      .update(updateData)
      .eq("id", idNum)
      .eq("is_deleted", false)
      .select()
      .single();

    if (error) {
      console.error("Error updating amenity:", error);
      return NextResponse.json(
        { error: "Failed to update amenity", details: error.message },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true, amenity: data }, { status: 200 });
  } catch (err) {
    console.error("Error in admin amenities PATCH:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/** DELETE - Soft-delete an amenity (set is_deleted = true). */
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const idNum = parseInt(id, 10);
    if (Number.isNaN(idNum)) {
      return NextResponse.json({ error: "Invalid amenity id" }, { status: 400 });
    }

    if (!supabaseAdmin) {
      return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Supabase builder
    const { error } = await (supabaseAdmin as any)
      .from("tb_listing_amenities")
      .update({
        is_deleted: true,
        is_active: false,
        deleted_at: new Date().toISOString(),
      })
      .eq("id", idNum);

    if (error) {
      console.error("Error deleting amenity:", error);
      return NextResponse.json(
        { error: "Failed to delete amenity", details: error.message },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true, message: "Amenity deleted" }, { status: 200 });
  } catch (err) {
    console.error("Error in admin amenities DELETE:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
