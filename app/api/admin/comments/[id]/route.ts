/**
 * API Route: GET /api/admin/comments/[id], PATCH /api/admin/comments/[id], DELETE /api/admin/comments/[id]
 *
 * Admin endpoints for single comment read, update (moderation), and soft-delete.
 */

import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";

/** GET - Fetch one comment by id. */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const idNum = parseInt(id, 10);
    if (Number.isNaN(idNum)) {
      return NextResponse.json({ error: "Invalid comment id" }, { status: 400 });
    }

    if (!supabaseAdmin) {
      return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Supabase builder
    const { data, error } = await (supabaseAdmin as any)
      .from("tb_listing_comments")
      .select("*")
      .eq("id", idNum)
      .eq("comment_type", "comment")
      .eq("is_deleted", false)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    return NextResponse.json({ comment: data }, { status: 200 });
  } catch (err) {
    console.error("Error in admin comments GET [id]:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/** PATCH - Update comment (moderation: is_visible, moderation_status). */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const idNum = parseInt(id, 10);
    if (Number.isNaN(idNum)) {
      return NextResponse.json({ error: "Invalid comment id" }, { status: 400 });
    }

    if (!supabaseAdmin) {
      return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
    }

    const body = await request.json();
    const updateData: Record<string, unknown> = {};
    if (typeof body.is_visible === "boolean") updateData.is_visible = body.is_visible;
    if (typeof body.moderation_status === "string") updateData.moderation_status = body.moderation_status;
    if (body.body !== undefined) updateData.body = body.body;
    if (body.title !== undefined) updateData.title = body.title ?? null;

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: "No fields to update" }, { status: 400 });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Supabase builder
    const { data, error } = await (supabaseAdmin as any)
      .from("tb_listing_comments")
      .update(updateData)
      .eq("id", idNum)
      .eq("comment_type", "comment")
      .eq("is_deleted", false)
      .select()
      .single();

    if (error) {
      console.error("Error updating comment:", error);
      return NextResponse.json(
        { error: "Failed to update comment", details: error.message },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true, comment: data }, { status: 200 });
  } catch (err) {
    console.error("Error in admin comments PATCH:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/** DELETE - Soft-delete comment. */
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const idNum = parseInt(id, 10);
    if (Number.isNaN(idNum)) {
      return NextResponse.json({ error: "Invalid comment id" }, { status: 400 });
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
      .eq("comment_type", "comment");

    if (error) {
      console.error("Error deleting comment:", error);
      return NextResponse.json(
        { error: "Failed to delete comment", details: error.message },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true, message: "Comment deleted" }, { status: 200 });
  } catch (err) {
    console.error("Error in admin comments DELETE:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
