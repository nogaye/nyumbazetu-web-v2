/**
 * API Route: PATCH /api/admin/properties/[id]
 * API Route: DELETE /api/admin/properties/[id]
 * 
 * Admin endpoints for updating and deleting properties.
 * Requires authentication (to be implemented).
 */

import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";

// Note: Using Node.js runtime for compatibility
// export const runtime = "edge";

// PATCH - Update property
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // TODO: Add authentication check

    const { id } = await params;
    const body = await request.json();

    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: "Supabase not configured" },
        { status: 500 }
      );
    }

    // Build update object (only include provided fields)
    const updateData: any = {};
    if (body.title !== undefined) updateData.title = body.title;
    if (body.slug !== undefined) updateData.slug = body.slug;
    if (body.description !== undefined) updateData.description = body.description;
    if (body.city !== undefined) updateData.city = body.city;
    if (body.area !== undefined) updateData.area = body.area;
    if (body.monthly_rent !== undefined) updateData.monthly_rent = parseInt(body.monthly_rent);
    if (body.bedrooms !== undefined) updateData.bedrooms = parseInt(body.bedrooms);
    if (body.bathrooms !== undefined) updateData.bathrooms = parseInt(body.bathrooms);
    if (body.size_sqm !== undefined) updateData.size_sqm = body.size_sqm ? parseInt(body.size_sqm) : null;
    if (body.property_type !== undefined) updateData.property_type = body.property_type;
    if (body.is_tps_available !== undefined) updateData.is_tps_available = body.is_tps_available;
    if (body.is_verified !== undefined) updateData.is_verified = body.is_verified;

    const { data, error } = await (supabaseAdmin
      .from("properties") as any)
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating property:", error);
      return NextResponse.json(
        { error: "Failed to update property", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        property: data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating property:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE - Delete property
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // TODO: Add authentication check

    const { id } = await params;

    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: "Supabase not configured" },
        { status: 500 }
      );
    }

    const { error } = await (supabaseAdmin
      .from("properties") as any)
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting property:", error);
      return NextResponse.json(
        { error: "Failed to delete property", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Property deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting property:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}


