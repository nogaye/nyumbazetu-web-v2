"use client";

import { useState } from "react";
import Image from "next/image";
import { getPlaceholderImageUrl } from "@/lib/listings/mock-data";

interface PropertyImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
  loading?: "lazy" | "eager";
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
}

/**
 * PropertyImage component with automatic fallback to placeholder images
 * when Supabase Storage images fail to load
 */
export function PropertyImage({
  src,
  alt,
  fill,
  width,
  height,
  className,
  sizes,
  priority,
  loading,
  placeholder,
  blurDataURL,
  objectFit = "cover",
}: PropertyImageProps) {
  const [imageSrc, setImageSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  // Extract property ID from Supabase Storage URL or path for fallback
  const getPropertyIdFromUrl = (url: string): string => {
    try {
      // If it's a Supabase Storage URL, extract the property ID
      // Format: https://...supabase.co/storage/v1/object/public/property-images/{property-id}/...
      const match = url.match(/property-images\/([^/]+)/);
      if (match && match[1]) {
        return match[1];
      }
      
      // If it's a storage path, extract property ID
      const pathParts = url.split("/");
      if (pathParts.includes("property-images")) {
        const index = pathParts.indexOf("property-images");
        if (pathParts[index + 1]) {
          return pathParts[index + 1];
        }
      }
    } catch (error) {
      // Ignore errors in URL parsing
    }
    
    return "default";
  };

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      // Fallback to placeholder image
      const propertyId = getPropertyIdFromUrl(imageSrc);
      setImageSrc(getPlaceholderImageUrl(propertyId));
    }
  };

  const imageProps = {
    src: imageSrc,
    alt,
    className: className || `object-${objectFit}`,
    onError: handleError,
    ...(fill
      ? { fill: true }
      : {
          width: width || 800,
          height: height || 600,
        }),
    ...(sizes && { sizes }),
    ...(priority !== undefined && { priority }),
    ...(loading && { loading }),
    ...(placeholder && { placeholder }),
    ...(blurDataURL && { blurDataURL }),
  };

  return <Image {...imageProps} />;
}

