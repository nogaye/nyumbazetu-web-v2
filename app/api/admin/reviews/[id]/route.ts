/**
 * API Route: GET /api/admin/reviews/[id], PATCH /api/admin/reviews/[id], DELETE /api/admin/reviews/[id]
 *
 * Admin endpoints for single review read, update (visibility, featured, moderation), and soft-delete.
 */

import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";

/** GET - Fetch one review by id. */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const idNum = parseInt(id, 10);
    if (Number.isNaN(idNum)) {
      return NextResponse.json({ error: "Invalid review id" }, { status: 400 });
    }

    if (!supabaseAdmin) {
      return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Supabase builder
    const { data, error } = await (supabaseAdmin as any)
      .from("tb_listing_comments")
      .select("*")
      .eq("id", idNum)
      .eq("comment_type", "review")
      .eq("is_deleted", false)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }

    return NextResponse.json({ review: data }, { status: 200 });
  } catch (err) {
    console.error("Error in admin reviews GET [id]:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/** PATCH - Update review (is_visible, is_featured, moderation_status, body, headline, rating). */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const idNum = parseInt(id, 10);
    if (Number.isNaN(idNum)) {
      return NextResponse.json({ error: "Invalid review id" }, { status: 400 });
    }

    if (!supabaseAdmin) {
      return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
    }

    const body = await request.json();
    const updateData: Record<string, unknown> = {};
    if (typeof body.is_visible === "boolean") updateData.is_visible = body.is_visible;
    if (typeof body.is_featured === "boolean") updateData.is_featured = body.is_featured;
    if (typeof body.is_verified_review === "boolean") updateData.is_verified_review = body.is_verified_review;
    if (typeof body.moderation_status === "string") updateData.moderation_status = body.moderation_status;
    if (body.body !== undefined) updateData.body = body.body;
    if (body.headline !== undefined) updateData.headline = body.headline ?? null;
    if (typeof body.rating === "number") updateData.rating = body.rating;

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: "No fields to update" }, { status: 400 });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Supabase builder
    const { data, error } = await (supabaseAdmin as any)
      .from("tb_listing_comments")
      .update(updateData)
      .eq("id", idNum)
      .eq("comment_type", "review")
      .eq("is_deleted", false)
      .select()
      .single();

    if (error) {
      console.error("Error updating review:", error);
      return NextResponse.json(
        { error: "Failed to update review", details: error.message },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true, review: data }, { status: 200 });
  } catch (err) {
    console.error("Error in admin reviews PATCH:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/** DELETE - Soft-delete review. */
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const idNum = parseInt(id, 10);
    if (Number.isNaN(idNum)) {
      return NextResponse.json({ error: "Invalid review id" }, { status: 400 });
    }

    if (!supabaseAdmin) {
      return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Supabase builder
    const { error } = await (supabaseAdmin as any)
      .from("tb_listing_comments")
      .update({
        is_deleted: true,
        is_visible: false,
        deleted_at: new Date().toISOString(),
      })
      .eq("id", idNum)
      .eq("comment_type", "review");

    if (error) {
      console.error("Error deleting review:", error);
      return NextResponse.json(
        { error: "Failed to delete review", details: error.message },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true, message: "Review deleted" }, { status: 200 });
  } catch (err) {
    console.error("Error in admin reviews DELETE:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
