/**
 * API Route: POST /api/admin/properties/[id]/images
 * API Route: GET /api/admin/properties/[id]/images
 * 
 * Admin endpoints for uploading and fetching property images.
 * Requires authentication (to be implemented).
 */

import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";

// Maximum file size: 10MB
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

// POST - Upload images for a property
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // TODO: Add authentication check

    const { id: propertyId } = await params;

    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: "Supabase not configured" },
        { status: 500 }
      );
    }

    // Verify property exists
    const { data: property, error: propertyError } = await (supabaseAdmin
      .from("properties") as any)
      .select("id")
      .eq("id", propertyId)
      .single();

    if (propertyError || !property) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    // Parse form data
    const formData = await request.formData();
    const files = formData.getAll("images") as File[];

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: "No images provided" },
        { status: 400 }
      );
    }

    // Validate files
    for (const file of files) {
      if (!ALLOWED_MIME_TYPES.includes(file.type)) {
        return NextResponse.json(
          { error: `Invalid file type: ${file.type}. Allowed types: ${ALLOWED_MIME_TYPES.join(", ")}` },
          { status: 400 }
        );
      }

      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { error: `File ${file.name} exceeds maximum size of ${MAX_FILE_SIZE / 1024 / 1024}MB` },
          { status: 400 }
        );
      }
    }

    // Get current max position for this property
    const { data: existingImages } = await (supabaseAdmin
      .from("property_images") as any)
      .select("position")
      .eq("property_id", propertyId)
      .order("position", { ascending: false })
      .limit(1);

    let nextPosition = 0;
    if (existingImages && existingImages.length > 0) {
      nextPosition = (existingImages[0].position || 0) + 1;
    }

    // Check if there's already a cover image
    const { data: coverImage } = await (supabaseAdmin
      .from("property_images") as any)
      .select("id")
      .eq("property_id", propertyId)
      .eq("is_cover", true)
      .limit(1);

    const hasCoverImage = coverImage && coverImage.length > 0;

    // Upload files and create database records
    const uploadedImages = [];
    const errors = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${i}.${fileExt}`;
      const storagePath = `property-images/${propertyId}/${fileName}`;

      try {
        // Convert File to ArrayBuffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Upload to Supabase Storage
        const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
          .from("property-images")
          .upload(storagePath, buffer, {
            contentType: file.type,
            upsert: false,
          });

        if (uploadError) {
          errors.push({ file: file.name, error: uploadError.message });
          continue;
        }

        // Create database record
        const isCover = !hasCoverImage && i === 0; // First image is cover if no cover exists
        const position = nextPosition + i;

        const { data: imageRecord, error: dbError } = await (supabaseAdmin
          .from("property_images") as any)
          .insert({
            property_id: propertyId,
            storage_path: storagePath,
            is_cover: isCover,
            position: position,
          })
          .select()
          .single();

        if (dbError) {
          // Try to delete uploaded file if DB insert fails
          await supabaseAdmin.storage
            .from("property-images")
            .remove([storagePath]);
          
          errors.push({ file: file.name, error: dbError.message });
          continue;
        }

        // Get public URL
        const { data: urlData } = supabaseAdmin.storage
          .from("property-images")
          .getPublicUrl(storagePath);

        uploadedImages.push({
          id: imageRecord.id,
          storage_path: storagePath,
          url: urlData.publicUrl,
          is_cover: isCover,
          position: position,
        });
      } catch (error: any) {
        errors.push({ file: file.name, error: error.message || "Unknown error" });
      }
    }

    if (uploadedImages.length === 0) {
      return NextResponse.json(
        { 
          error: "Failed to upload images",
          details: errors,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        images: uploadedImages,
        errors: errors.length > 0 ? errors : undefined,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error uploading images:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}

// GET - Fetch all images for a property
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // TODO: Add authentication check

    const { id: propertyId } = await params;

    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: "Supabase not configured" },
        { status: 500 }
      );
    }

    const { data, error } = await (supabaseAdmin
      .from("property_images") as any)
      .select("*")
      .eq("property_id", propertyId)
      .order("position", { ascending: true });

    if (error) {
      console.error("Error fetching images:", error);
      return NextResponse.json(
        { error: "Failed to fetch images", details: error.message },
        { status: 500 }
      );
    }

    // Get public URLs for all images
    const imagesWithUrls = (data || []).map((img: any) => {
      const { data: urlData } = supabaseAdmin.storage
        .from("property-images")
        .getPublicUrl(img.storage_path);

      return {
        ...img,
        url: urlData.publicUrl,
      };
    });

    return NextResponse.json(
      {
        success: true,
        images: imagesWithUrls,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching images:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}

