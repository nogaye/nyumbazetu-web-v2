/**
 * API Route: GET /api/admin/comments
 *
 * Admin endpoint to list listing comments (Q&A type).
 * Supports filtering by property_id. Excludes soft-deleted.
 */

import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";

/** GET - List comments (comment_type = 'comment') with optional property filter. */
export async function GET(request: NextRequest) {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: "Supabase not configured", comments: [], total: 0 },
        { status: 200 },
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const propertyId = searchParams.get("property_id");
    const limit = Math.min(parseInt(searchParams.get("limit") || "50", 10), 100);
    const offset = parseInt(searchParams.get("offset") || "0", 10);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Supabase builder
    let query = (supabaseAdmin as any)
      .from("tb_listing_comments")
      .select(
        "id, uuid, property_id, user_id, body, title, is_visible, moderation_status, reply_count, like_count, created_at",
        { count: "exact" },
      )
      .eq("comment_type", "comment")
      .eq("is_deleted", false)
      .is("parent_comment_id", null)
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (propertyId) {
      const pid = parseInt(propertyId, 10);
      if (!Number.isNaN(pid)) query = query.eq("property_id", pid);
    }

    const { data, error, count } = await query;

    if (error) {
      console.error("Error fetching comments:", error);
      return NextResponse.json(
        { error: "Failed to fetch comments", details: error.message },
        { status: 500 },
      );
    }

    // Optionally enrich with property title/slug
    const comments = data || [];
    const propIds = [...new Set(comments.map((c: { property_id: number }) => c.property_id))];
    let propMap: Record<number, { title: string; slug: string }> = {};
    if (propIds.length > 0) {
      const { data: props } = await (supabaseAdmin as any)
        .from("tb_listing_properties")
        .select("id, title, slug")
        .in("id", propIds);
      propMap = Object.fromEntries((props || []).map((p: { id: number; title: string; slug: string }) => [p.id, { title: p.title, slug: p.slug }]));
    }

    const enriched = comments.map((c: { property_id: number }) => ({
      ...c,
      property_title: propMap[c.property_id]?.title ?? null,
      property_slug: propMap[c.property_id]?.slug ?? null,
    }));

    return NextResponse.json(
      { comments: enriched, total: count ?? 0, limit, offset },
      { status: 200 },
    );
  } catch (err) {
    console.error("Error in admin comments GET:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
