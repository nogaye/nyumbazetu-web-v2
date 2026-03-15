/**
 * API Route: GET /api/admin/reviews
 *
 * Admin endpoint to list listing reviews (comment_type = 'review').
 * Supports filtering by property_id. Excludes soft-deleted.
 */

import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";

/** GET - List reviews with optional property filter. */
export async function GET(request: NextRequest) {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: "Supabase not configured", reviews: [], total: 0 },
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
        "id, uuid, property_id, user_id, body, headline, rating, is_visible, is_featured, is_verified_review, moderation_status, like_count, created_at",
        { count: "exact" },
      )
      .eq("comment_type", "review")
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
      console.error("Error fetching reviews:", error);
      return NextResponse.json(
        { error: "Failed to fetch reviews", details: error.message },
        { status: 500 },
      );
    }

    const reviews = data || [];
    const propIds = [...new Set(reviews.map((r: { property_id: number }) => r.property_id))];
    let propMap: Record<number, { title: string; slug: string }> = {};
    if (propIds.length > 0) {
      const { data: props } = await (supabaseAdmin as any)
        .from("tb_listing_properties")
        .select("id, title, slug")
        .in("id", propIds);
      propMap = Object.fromEntries((props || []).map((p: { id: number; title: string; slug: string }) => [p.id, { title: p.title, slug: p.slug }]));
    }

    const enriched = reviews.map((r: { property_id: number }) => ({
      ...r,
      property_title: propMap[r.property_id]?.title ?? null,
      property_slug: propMap[r.property_id]?.slug ?? null,
    }));

    return NextResponse.json(
      { reviews: enriched, total: count ?? 0, limit, offset },
      { status: 200 },
    );
  } catch (err) {
    console.error("Error in admin reviews GET:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
