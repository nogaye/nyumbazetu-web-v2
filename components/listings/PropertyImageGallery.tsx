"use client";

/**
 * Property image gallery with large hero + 2x2 thumbnail grid layout.
 * Displays one main image on the left and up to four thumbnails on the right;
 * "Show all photos" overlay on the last thumbnail opens fullscreen lightbox.
 */

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, X, Grid3X3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PropertyImage } from "@/components/listings/PropertyImage";
import { cn } from "@/lib/utils";

interface PropertyImageGalleryProps {
  images: Array<{
    url: string;
    alt: string;
    blurDataURL?: string;
  }>;
  propertyTitle: string;
  /** Optional class for the main gallery container (e.g. rounded-xl). */
  className?: string;
}

/**
 * Returns the image index for the nth thumbnail (1–4) when the main image is at selectedIndex.
 * Thumbnails show the next four indices wrapping around.
 */
function thumbnailIndex(selectedIndex: number, n: number, slot: 1 | 2 | 3 | 4): number {
  return (selectedIndex + slot) % n;
}

export function PropertyImageGallery({
  images,
  propertyTitle,
  className,
}: PropertyImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (images.length === 0) {
    return null;
  }

  const mainImage = images[selectedIndex];

  const goToPrevious = useCallback(() => {
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const goToNext = useCallback(() => {
    setSelectedIndex((prev) => (prev + 1) % images.length);
  }, []);

  const goToImage = (index: number) => {
    setSelectedIndex(index);
  };

  // Keyboard navigation in fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isFullscreen) return;
      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          goToPrevious();
          break;
        case "ArrowRight":
          e.preventDefault();
          goToNext();
          break;
        case "Escape":
          e.preventDefault();
          setIsFullscreen(false);
          break;
        case "Home":
          e.preventDefault();
          setSelectedIndex(0);
          break;
        case "End":
          e.preventDefault();
          setSelectedIndex(images.length - 1);
          break;
      }
    };
    if (isFullscreen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen, images.length, goToPrevious, goToNext]);

  const hasMultiple = images.length > 1;
  const thumbSlots = Math.min(4, hasMultiple ? images.length : 0);
  const showAllPhotosOverlay = images.length > 5;

  return (
    <>
      {/* Main gallery: large left image + 2x2 grid on the right */}
      <div className={cn("relative overflow-hidden rounded-xl", className)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {/* Large main image (left on desktop) */}
          <div
            className={cn(
              "relative w-full overflow-hidden bg-slate-200 dark:bg-slate-800",
              thumbSlots > 0 ? "aspect-[4/3] md:aspect-auto md:min-h-[340px]" : "aspect-video"
            )}
          >
            <Button
              type="button"
              variant="ghost"
              className="absolute inset-0 h-full w-full rounded-none focus:ring-2 focus:ring-primary focus:ring-inset"
              onClick={() => setIsFullscreen(true)}
              aria-label="View fullscreen"
            >
              <PropertyImage
                src={mainImage.url}
                alt={mainImage.alt || propertyTitle}
                fill
                className="object-cover"
                placeholder={mainImage.blurDataURL ? "blur" : "empty"}
                blurDataURL={mainImage.blurDataURL}
                priority={selectedIndex === 0}
                sizes="(max-width: 768px) 100vw, 55vw"
                objectFit="cover"
              />
            </Button>
          </div>

          {/* 2x2 thumbnail grid (right on desktop) */}
          {thumbSlots > 0 && (
            <div className="grid grid-cols-2 gap-2 aspect-[4/3] md:aspect-auto md:min-h-[340px]">
              {([1, 2, 3, 4] as const).slice(0, thumbSlots).map((slot) => {
                const idx = thumbnailIndex(selectedIndex, images.length, slot);
                const img = images[idx];
                const isLastSlot = slot === 4;
                const showOverlay = isLastSlot && showAllPhotosOverlay;

                return (
                  <Button
                    key={slot}
                    type="button"
                    variant="ghost"
                    className={cn(
                      "relative h-full w-full overflow-hidden rounded-lg bg-slate-200 p-0 transition-all focus:ring-2 focus:ring-primary focus:ring-inset dark:bg-slate-800",
                      selectedIndex === idx && "ring-2 ring-primary ring-offset-2 ring-offset-slate-100 dark:ring-offset-slate-900"
                    )}
                    onClick={() => (showOverlay ? setIsFullscreen(true) : goToImage(idx))}
                    aria-label={showOverlay ? "Show all photos" : `View image ${idx + 1}`}
                  >
                    <PropertyImage
                      src={img.url}
                      alt={img.alt || `${propertyTitle} - Image ${idx + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 27vw"
                      loading="lazy"
                      objectFit="cover"
                    />
                    {showOverlay && (
                      <span className="absolute inset-0 flex items-center justify-center gap-1.5 bg-black/40 text-white text-sm font-medium rounded-lg">
                        <Grid3X3 className="h-4 w-4" aria-hidden />
                        Show all photos
                      </span>
                    )}
                  </Button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Fullscreen lightbox */}
      {isFullscreen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
          onClick={() => setIsFullscreen(false)}
        >
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 z-10 h-10 w-10 rounded-full bg-white/10 text-white hover:bg-white/20"
            onClick={() => setIsFullscreen(false)}
            aria-label="Close fullscreen"
          >
            <X className="h-5 w-5" />
          </Button>

          {images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 z-10 h-12 w-12 -translate-y-1/2 rounded-full bg-white/10 text-white hover:bg-white/20"
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevious();
                }}
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 z-10 h-12 w-12 -translate-y-1/2 rounded-full bg-white/10 text-white hover:bg-white/20"
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </>
          )}

          <div
            className="relative h-full w-full max-w-7xl p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-full w-full">
              <PropertyImage
                src={mainImage.url}
                alt={mainImage.alt || propertyTitle}
                fill
                className="object-contain"
                placeholder={mainImage.blurDataURL ? "blur" : "empty"}
                blurDataURL={mainImage.blurDataURL}
                sizes="100vw"
                objectFit="contain"
              />
            </div>
          </div>

          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-full bg-black/50 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
              {selectedIndex + 1} / {images.length}
            </div>
          )}
        </div>
      )}
    </>
  );
}

