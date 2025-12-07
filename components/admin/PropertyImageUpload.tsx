"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  ExclamationCircleIcon,
  PhotoIcon,
  XMarkIcon,
  StarIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface PropertyImage {
  id: string;
  storage_path: string;
  url: string;
  is_cover: boolean;
  position: number;
}

interface PropertyImageUploadProps {
  propertyId: string | null;
  onImagesChange?: (images: PropertyImage[]) => void;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const MAX_IMAGES = 20;

export function PropertyImageUpload({
  propertyId,
  onImagesChange,
}: PropertyImageUploadProps) {
  const [images, setImages] = useState<PropertyImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch existing images when propertyId changes
  useEffect(() => {
    if (propertyId) {
      fetchImages();
    } else {
      setImages([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propertyId]);

  // Notify parent of image changes
  useEffect(() => {
    if (onImagesChange) {
      onImagesChange(images);
    }
  }, [images, onImagesChange]);

  const fetchImages = async () => {
    if (!propertyId) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/admin/properties/${propertyId}/images`);
      const data = await response.json();

      if (response.ok && data.success) {
        setImages(data.images || []);
      } else {
        setError(data.error || "Failed to fetch images");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  const handleFiles = useCallback(async (files: FileList | File[]) => {
    if (!propertyId) {
      setError("Please save the property first before uploading images");
      return;
    }

    const fileArray = Array.from(files);

    // Validate all files first
    const validationErrors: string[] = [];
    fileArray.forEach((file) => {
      if (!ALLOWED_TYPES.includes(file.type)) {
        validationErrors.push(`Invalid file type: ${file.type}. Allowed types: JPEG, PNG, WebP`);
      }
      if (file.size > MAX_FILE_SIZE) {
        validationErrors.push(`File ${file.name} exceeds maximum size of ${MAX_FILE_SIZE / 1024 / 1024}MB`);
      }
    });

    if (validationErrors.length > 0) {
      setError(validationErrors.join("; "));
      return;
    }

    // Check total image count (we'll check this after fetching current images)
    setError(null);
    setUploading(true);

    const formData = new FormData();
    fileArray.forEach((file) => {
      formData.append("images", file);
    });

    try {
      // Check current image count before uploading
      const currentImagesResponse = await fetch(`/api/admin/properties/${propertyId}/images`);
      const currentImagesData = await currentImagesResponse.json();
      const currentImageCount = currentImagesData.success ? (currentImagesData.images?.length || 0) : 0;

      if (currentImageCount + fileArray.length > MAX_IMAGES) {
        setError(`Maximum ${MAX_IMAGES} images allowed. You can upload ${MAX_IMAGES - currentImageCount} more.`);
        setUploading(false);
        return;
      }

      const response = await fetch(`/api/admin/properties/${propertyId}/images`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Refresh images list
        await fetchImages();
        setError(null);
      } else {
        setError(data.error || "Failed to upload images");
        if (data.errors && data.errors.length > 0) {
          const errorMessages = data.errors.map((e: any) => `${e.file}: ${e.error}`).join("; ");
          setError(errorMessages);
        }
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setUploading(false);
      setUploadProgress({});
    }
  }, [propertyId]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        handleFiles(e.dataTransfer.files);
      }
    },
    [handleFiles]
  );

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const handleDelete = async (imageId: string) => {
    if (!propertyId) return;

    if (!confirm("Are you sure you want to delete this image?")) {
      return;
    }

    try {
      const response = await fetch(
        `/api/admin/properties/${propertyId}/images/${imageId}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        await fetchImages();
      } else {
        setError(data.error || "Failed to delete image");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    }
  };

  const handleSetCover = async (imageId: string) => {
    if (!propertyId) return;

    try {
      const response = await fetch(
        `/api/admin/properties/${propertyId}/images/${imageId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ is_cover: true }),
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        await fetchImages();
      } else {
        setError(data.error || "Failed to set cover image");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    }
  };

  const handleMovePosition = async (imageId: string, direction: "up" | "down") => {
    if (!propertyId) return;

    const image = images.find((img) => img.id === imageId);
    if (!image) return;

    const currentIndex = images.findIndex((img) => img.id === imageId);
    const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;

    if (newIndex < 0 || newIndex >= images.length) return;

    const targetImage = images[newIndex];
    const newPosition = targetImage.position;

    try {
      // Swap positions
      const response1 = await fetch(
        `/api/admin/properties/${propertyId}/images/${imageId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ position: newPosition }),
        }
      );

      const response2 = await fetch(
        `/api/admin/properties/${propertyId}/images/${targetImage.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ position: image.position }),
        }
      );

      if (response1.ok && response2.ok) {
        await fetchImages();
      } else {
        setError("Failed to reorder images");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-sm text-slate-500">Loading images...</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="pb-2 border-b border-slate-200 dark:border-slate-700">
        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
          Images ({images.length}/{MAX_IMAGES})
        </h3>
      </div>

      {error && (
        <Alert variant="destructive">
          <ExclamationCircleIcon className="h-5 w-5" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Upload Area */}
      {propertyId && (
        <div
          className={cn(
            "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
            dragActive
              ? "border-primary bg-primary/5"
              : "border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600",
            uploading && "opacity-50 pointer-events-none"
          )}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            id="image-upload"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            multiple
            onChange={handleFileInput}
            className="hidden"
            disabled={uploading || images.length >= MAX_IMAGES}
          />
          <label
            htmlFor="image-upload"
            className={cn(
              "cursor-pointer flex flex-col items-center gap-2",
              (uploading || images.length >= MAX_IMAGES) && "cursor-not-allowed opacity-50"
            )}
          >
            <PhotoIcon className="h-12 w-12 text-slate-400" />
            <div className="space-y-1">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {uploading
                  ? "Uploading..."
                  : images.length >= MAX_IMAGES
                  ? "Maximum images reached"
                  : "Click to upload or drag and drop"}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                PNG, JPG, WebP up to 10MB each
              </p>
            </div>
            {!uploading && images.length < MAX_IMAGES && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
              >
                Select Images
              </Button>
            )}
          </label>
        </div>
      )}

      {!propertyId && (
        <Alert>
          <ExclamationCircleIcon className="h-5 w-5" />
          <AlertTitle>Save Property First</AlertTitle>
          <AlertDescription>
            Please save the property before uploading images.
          </AlertDescription>
        </Alert>
      )}

      {/* Images Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div
              key={image.id}
              className="group relative aspect-square rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900"
            >
              <Image
                src={image.url}
                alt={`Property image ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
              />

              {/* Cover Badge */}
              {image.is_cover && (
                <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-semibold flex items-center gap-1">
                  <StarIconSolid className="h-3 w-3" />
                  Cover
                </div>
              )}

              {/* Actions Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <div className="flex flex-col gap-2">
                  {/* Set Cover */}
                  {!image.is_cover && (
                    <Button
                      type="button"
                      size="sm"
                      variant="secondary"
                      onClick={() => handleSetCover(image.id)}
                      className="h-8 w-8 p-0"
                      title="Set as cover image"
                    >
                      <StarIcon className="h-4 w-4" />
                    </Button>
                  )}

                  {/* Move Up */}
                  {index > 0 && (
                    <Button
                      type="button"
                      size="sm"
                      variant="secondary"
                      onClick={() => handleMovePosition(image.id, "up")}
                      className="h-8 w-8 p-0"
                      title="Move up"
                    >
                      <ArrowUpIcon className="h-4 w-4" />
                    </Button>
                  )}

                  {/* Move Down */}
                  {index < images.length - 1 && (
                    <Button
                      type="button"
                      size="sm"
                      variant="secondary"
                      onClick={() => handleMovePosition(image.id, "down")}
                      className="h-8 w-8 p-0"
                      title="Move down"
                    >
                      <ArrowDownIcon className="h-4 w-4" />
                    </Button>
                  )}

                  {/* Delete */}
                  <Button
                    type="button"
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(image.id)}
                    className="h-8 w-8 p-0"
                    title="Delete image"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Position Number */}
              <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                {index + 1}
              </div>
            </div>
          ))}
        </div>
      )}

      {images.length === 0 && propertyId && (
        <div className="text-center py-8 text-sm text-slate-500">
          No images uploaded yet. Upload images using the area above.
        </div>
      )}
    </div>
  );
}

