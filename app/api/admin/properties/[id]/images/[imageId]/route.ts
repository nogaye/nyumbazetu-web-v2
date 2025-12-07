/**
 * API Route: PATCH /api/admin/properties/[id]/images/[imageId]
 * API Route: DELETE /api/admin/properties/[id]/images/[imageId]
 * 
 * Admin endpoints for updating and deleting individual property images.
 * Requires authentication (to be implemented).
 */

import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";

// PATCH - Update image (set cover, reorder)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; imageId: string }> }
) {
  try {
    // TODO: Add authentication check

    const { id: propertyId, imageId } = await params;
    const body = await request.json();

    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: "Supabase not configured" },
        { status: 500 }
      );
    }

    // Verify image belongs to property
    const { data: image, error: imageError } = await (supabaseAdmin
      .from("property_images") as any)
      .select("*")
      .eq("id", imageId)
      .eq("property_id", propertyId)
      .single();

    if (imageError || !image) {
      return NextResponse.json(
        { error: "Image not found" },
        { status: 404 }
      );
    }

    const updateData: any = {};

    // Handle setting cover image
    if (body.is_cover === true) {
      // Unset all other cover images for this property
      await (supabaseAdmin
        .from("property_images") as any)
        .update({ is_cover: false })
        .eq("property_id", propertyId)
        .neq("id", imageId);

      updateData.is_cover = true;
    } else if (body.is_cover === false) {
      updateData.is_cover = false;
    }

    // Handle position update
    if (body.position !== undefined) {
      updateData.position = parseInt(body.position);
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: "No valid fields to update" },
        { status: 400 }
      );
    }

    const { data, error } = await (supabaseAdmin
      .from("property_images") as any)
      .update(updateData)
      .eq("id", imageId)
      .select()
      .single();

    if (error) {
      console.error("Error updating image:", error);
      return NextResponse.json(
        { error: "Failed to update image", details: error.message },
        { status: 500 }
      );
    }

    // Get public URL
    const { data: urlData } = supabaseAdmin.storage
      .from("property-images")
      .getPublicUrl(data.storage_path);

    return NextResponse.json(
      {
        success: true,
        image: {
          ...data,
          url: urlData.publicUrl,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error updating image:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}

// DELETE - Delete image
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; imageId: string }> }
) {
  try {
    // TODO: Add authentication check

    const { id: propertyId, imageId } = await params;

    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: "Supabase not configured" },
        { status: 500 }
      );
    }

    // Get image record to get storage path
    const { data: image, error: imageError } = await (supabaseAdmin
      .from("property_images") as any)
      .select("storage_path")
      .eq("id", imageId)
      .eq("property_id", propertyId)
      .single();

    if (imageError || !image) {
      return NextResponse.json(
        { error: "Image not found" },
        { status: 404 }
      );
    }

    // Delete from storage
    const { error: storageError } = await supabaseAdmin.storage
      .from("property-images")
      .remove([image.storage_path]);

    if (storageError) {
      console.error("Error deleting from storage:", storageError);
      // Continue with DB deletion even if storage deletion fails
    }

    // Delete from database
    const { error: dbError } = await (supabaseAdmin
      .from("property_images") as any)
      .delete()
      .eq("id", imageId);

    if (dbError) {
      console.error("Error deleting image record:", dbError);
      return NextResponse.json(
        { error: "Failed to delete image", details: dbError.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Image deleted successfully",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error deleting image:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}

