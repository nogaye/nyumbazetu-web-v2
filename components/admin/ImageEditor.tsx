"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowPathIcon,
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
  XMarkIcon,
  CheckIcon,
  PhotoIcon,
  ScissorsIcon,
} from "@heroicons/react/24/outline";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

// Crop Overlay Component
function CropOverlay({
  crop,
  canvas,
}: {
  crop: CropArea | null;
  canvas: HTMLCanvasElement;
}) {
  if (!crop) return null;

  const rect = canvas.getBoundingClientRect();
  const containerRect = canvas.parentElement?.getBoundingClientRect();
  if (!containerRect) return null;

  // Calculate position relative to container
  const canvasX = rect.left - containerRect.left;
  const canvasY = rect.top - containerRect.top;

  const overlayStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    pointerEvents: "none",
  };

  const cropStyle: React.CSSProperties = {
    position: "absolute",
    left: `${canvasX + crop.x}px`,
    top: `${canvasY + crop.y}px`,
    width: `${crop.width}px`,
    height: `${crop.height}px`,
    border: "2px solid #3b82f6",
    boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.5)",
    pointerEvents: "none",
    zIndex: 10,
  };

  return (
    <div style={overlayStyle}>
      <div style={cropStyle}>
        {/* Corner handles */}
        <div className="absolute -top-1 -left-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-white" />
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-white" />
        <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-white" />
        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-white" />
      </div>
    </div>
  );
}

interface ImageEditorProps {
  files: File[];
  isOpen: boolean;
  onClose: () => void;
  onSave: (editedFiles: File[]) => void;
}

interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface EditedImage {
  file: File;
  preview: string;
  rotation: number;
  brightness: number;
  contrast: number;
  saturation: number;
  crop: CropArea | null;
  originalWidth: number;
  originalHeight: number;
}

export function ImageEditor({ files, isOpen, onClose, onSave }: ImageEditorProps) {
  const [editedImages, setEditedImages] = useState<EditedImage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCropping, setIsCropping] = useState(false);
  const [cropMode, setCropMode] = useState<"free" | "16:9" | "4:3" | "1:1">("16:9");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLImageElement | null>(null);

  // Calculate best default crop (16:9 landscape for property photos)
  const calculateDefaultCrop = (imgWidth: number, imgHeight: number): CropArea => {
    const targetAspect = 16 / 9; // Best for property listings
    const imageAspect = imgWidth / imgHeight;

    let cropWidth: number, cropHeight: number;

    if (imageAspect > targetAspect) {
      // Image is wider than target - fit height
      cropHeight = imgHeight;
      cropWidth = cropHeight * targetAspect;
    } else {
      // Image is taller than target - fit width
      cropWidth = imgWidth;
      cropHeight = cropWidth / targetAspect;
    }

    // Center the crop
    const x = (imgWidth - cropWidth) / 2;
    const y = (imgHeight - cropHeight) / 2;

    return {
      x: Math.max(0, x),
      y: Math.max(0, y),
      width: Math.min(cropWidth, imgWidth),
      height: Math.min(cropHeight, imgHeight),
    };
  };

  // Initialize edited images when files change
  useEffect(() => {
    if (files.length > 0 && isOpen) {
      const loadImages = async () => {
        const edited: EditedImage[] = await Promise.all(
          files.map(async (file) => {
            const preview = URL.createObjectURL(file);
            
            // Load image to get dimensions
            const img = new Image();
            await new Promise((resolve, reject) => {
              img.onload = resolve;
              img.onerror = reject;
              img.src = preview;
            });

            const defaultCrop = calculateDefaultCrop(img.width, img.height);

            return {
              file,
              preview,
              rotation: 0,
              brightness: 100,
              contrast: 100,
              saturation: 100,
              crop: defaultCrop,
              originalWidth: img.width,
              originalHeight: img.height,
            };
          })
        );
        setEditedImages(edited);
        setCurrentIndex(0);
        setIsCropping(true); // Start in crop mode
      };
      loadImages();
    }
  }, [files, isOpen]);

  // Cleanup object URLs
  useEffect(() => {
    return () => {
      editedImages.forEach((img) => {
        URL.revokeObjectURL(img.preview);
      });
    };
  }, []);

  const currentImage = editedImages[currentIndex];

  // Get canvas scale for display
  const getCanvasScale = (imgWidth: number, imgHeight: number): number => {
    if (!containerRef.current) return 1;
    const container = containerRef.current;
    const maxWidth = container.clientWidth - 32; // padding
    const maxHeight = 400;
    const scaleX = maxWidth / imgWidth;
    const scaleY = maxHeight / imgHeight;
    return Math.min(1, scaleX, scaleY);
  };

  // Draw image on canvas with all edits applied
  const drawImage = async () => {
    if (!canvasRef.current || !currentImage) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
      img.src = currentImage.preview;
    });

    // Apply rotation first to get final dimensions
    const rotationRad = (currentImage.rotation * Math.PI) / 180;
    const cos = Math.abs(Math.cos(rotationRad));
    const sin = Math.abs(Math.sin(rotationRad));
    const rotatedWidth = img.width * cos + img.height * sin;
    const rotatedHeight = img.width * sin + img.height * cos;

    // Calculate scale for display
    const scale = getCanvasScale(rotatedWidth, rotatedHeight);
    const displayWidth = rotatedWidth * scale;
    const displayHeight = rotatedHeight * scale;

    canvas.width = displayWidth;
    canvas.height = displayHeight;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Apply rotation and scaling
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(rotationRad);
    ctx.scale(scale, scale);
    ctx.drawImage(img, -img.width / 2, -img.height / 2);
    ctx.restore();

    // Apply filters
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // Apply brightness, contrast, and saturation
    for (let i = 0; i < data.length; i += 4) {
      // Brightness
      let r = data[i] * (currentImage.brightness / 100);
      let g = data[i + 1] * (currentImage.brightness / 100);
      let b = data[i + 2] * (currentImage.brightness / 100);

      // Contrast
      const factor = (259 * (currentImage.contrast + 255)) / (255 * (259 - currentImage.contrast));
      r = Math.max(0, Math.min(255, factor * (r - 128) + 128));
      g = Math.max(0, Math.min(255, factor * (g - 128) + 128));
      b = Math.max(0, Math.min(255, factor * (b - 128) + 128));

      // Saturation
      const gray = 0.299 * r + 0.587 * g + 0.114 * b;
      const sat = currentImage.saturation / 100;
      r = gray + sat * (r - gray);
      g = gray + sat * (g - gray);
      b = gray + sat * (b - gray);

      data[i] = Math.max(0, Math.min(255, r));
      data[i + 1] = Math.max(0, Math.min(255, g));
      data[i + 2] = Math.max(0, Math.min(255, b));
    }

    ctx.putImageData(imageData, 0, 0);
  };

  useEffect(() => {
    if (currentImage) {
      drawImage();
    }
  }, [currentImage, editedImages]);

  const updateImage = (updates: Partial<EditedImage>) => {
    setEditedImages((prev) =>
      prev.map((img, idx) => (idx === currentIndex ? { ...img, ...updates } : img))
    );
  };

  const rotate = (degrees: number) => {
    updateImage({ rotation: (currentImage.rotation + degrees) % 360 });
  };

  const reset = () => {
    if (!currentImage) return;
    const defaultCrop = calculateDefaultCrop(currentImage.originalWidth, currentImage.originalHeight);
    updateImage({
      rotation: 0,
      brightness: 100,
      contrast: 100,
      saturation: 100,
      crop: defaultCrop,
    });
  };

  // Update crop based on aspect ratio preset
  const setCropAspectRatio = (ratio: "free" | "16:9" | "4:3" | "1:1") => {
    if (!currentImage) return;
    setCropMode(ratio);

    if (ratio === "free") {
      // Keep current crop or set to full image
      if (!currentImage.crop) {
        updateImage({
          crop: {
            x: 0,
            y: 0,
            width: currentImage.originalWidth,
            height: currentImage.originalHeight,
          },
        });
      }
      return;
    }

    const [w, h] = ratio.split(":").map(Number);
    const targetAspect = w / h;
    const imageAspect = currentImage.originalWidth / currentImage.originalHeight;

    let cropWidth: number, cropHeight: number;

    if (imageAspect > targetAspect) {
      // Image is wider - fit height
      cropHeight = currentImage.originalHeight;
      cropWidth = cropHeight * targetAspect;
    } else {
      // Image is taller - fit width
      cropWidth = currentImage.originalWidth;
      cropHeight = cropWidth / targetAspect;
    }

    const x = (currentImage.originalWidth - cropWidth) / 2;
    const y = (currentImage.originalHeight - cropHeight) / 2;

    updateImage({
      crop: {
        x: Math.max(0, x),
        y: Math.max(0, y),
        width: Math.min(cropWidth, currentImage.originalWidth),
        height: Math.min(cropHeight, currentImage.originalHeight),
      },
    });
  };

  // Get crop area in canvas coordinates
  const getCanvasCropArea = (): CropArea | null => {
    if (!currentImage || !currentImage.crop || !canvasRef.current) return null;

    const canvas = canvasRef.current;
    
    // Account for rotation to get display dimensions
    const rotationRad = (currentImage.rotation * Math.PI) / 180;
    const cos = Math.abs(Math.cos(rotationRad));
    const sin = Math.abs(Math.sin(rotationRad));
    const rotatedWidth = currentImage.originalWidth * cos + currentImage.originalHeight * sin;
    const rotatedHeight = currentImage.originalWidth * sin + currentImage.originalHeight * cos;

    const displayScale = getCanvasScale(rotatedWidth, rotatedHeight);
    
    // Calculate how the original image maps to the canvas
    // The canvas shows the rotated image, so we need to map crop coordinates
    const canvasWidth = rotatedWidth * displayScale;
    const canvasHeight = rotatedHeight * displayScale;
    
    // For now, show crop on original image coordinates (before rotation)
    // This is a simplified version - in a full implementation, you'd transform coordinates
    const cropScale = displayScale;
    
    // Center the crop area on canvas
    const offsetX = (canvas.width - canvasWidth) / 2;
    const offsetY = (canvas.height - canvasHeight) / 2;

    return {
      x: offsetX + (currentImage.crop.x * cropScale),
      y: offsetY + (currentImage.crop.y * cropScale),
      width: currentImage.crop.width * cropScale,
      height: currentImage.crop.height * cropScale,
    };
  };

  const handleSave = async () => {
    const editedFiles: File[] = [];

    for (let i = 0; i < editedImages.length; i++) {
      const edited = editedImages[i];
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) continue;

      const img = new Image();
      img.crossOrigin = "anonymous";

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = edited.preview;
      });

      // Apply crop first (before rotation)
      let sourceX = 0;
      let sourceY = 0;
      let sourceWidth = img.width;
      let sourceHeight = img.height;

      if (edited.crop) {
        sourceX = edited.crop.x;
        sourceY = edited.crop.y;
        sourceWidth = edited.crop.width;
        sourceHeight = edited.crop.height;
      }

      // Set canvas to cropped size
      canvas.width = sourceWidth;
      canvas.height = sourceHeight;

      // Apply rotation
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((edited.rotation * Math.PI) / 180);
      ctx.translate(-canvas.width / 2, -canvas.height / 2);
      ctx.drawImage(img, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, sourceWidth, sourceHeight);
      ctx.restore();

      // Apply filters
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      for (let j = 0; j < data.length; j += 4) {
        let r = data[j] * (edited.brightness / 100);
        let g = data[j + 1] * (edited.brightness / 100);
        let b = data[j + 2] * (edited.brightness / 100);

        const factor = (259 * (edited.contrast + 255)) / (255 * (259 - edited.contrast));
        r = Math.max(0, Math.min(255, factor * (r - 128) + 128));
        g = Math.max(0, Math.min(255, factor * (g - 128) + 128));
        b = Math.max(0, Math.min(255, factor * (b - 128) + 128));

        const gray = 0.299 * r + 0.587 * g + 0.114 * b;
        const sat = edited.saturation / 100;
        r = gray + sat * (r - gray);
        g = gray + sat * (g - gray);
        b = gray + sat * (b - gray);

        data[j] = Math.max(0, Math.min(255, r));
        data[j + 1] = Math.max(0, Math.min(255, g));
        data[j + 2] = Math.max(0, Math.min(255, b));
      }

      ctx.putImageData(imageData, 0, 0);

      // Convert canvas to blob and create File
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const file = new File([blob], edited.file.name, {
              type: edited.file.type,
              lastModified: Date.now(),
            });
            editedFiles.push(file);

            if (editedFiles.length === editedImages.length) {
              onSave(editedFiles);
            }
          }
        },
        edited.file.type,
        0.92
      );
    }

    if (editedFiles.length > 0) {
      onSave(editedFiles);
    }
  };

  if (!currentImage) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-2xl">
        <SheetClose onClick={onClose} />
        <SheetHeader>
          <SheetTitle>Edit Images ({currentIndex + 1} of {editedImages.length})</SheetTitle>
        </SheetHeader>

        <div className="p-6 space-y-6">
          {/* Image Preview */}
          <div 
            ref={containerRef}
            className="relative bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden min-h-[300px] flex items-center justify-center p-4"
          >
            <canvas
              ref={canvasRef}
              className="max-w-full max-h-[400px] object-contain"
            />
            {/* Crop Overlay */}
            {isCropping && currentImage.crop && canvasRef.current && (
              <CropOverlay
                crop={getCanvasCropArea()}
                canvas={canvasRef.current}
              />
            )}
          </div>

          {/* Navigation */}
          {editedImages.length > 1 && (
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={() => setCurrentIndex((prev) => (prev - 1 + editedImages.length) % editedImages.length)}
                disabled={editedImages.length === 1}
              >
                Previous
              </Button>
              <span className="text-sm text-slate-600 dark:text-slate-400">
                Image {currentIndex + 1} of {editedImages.length}
              </span>
              <Button
                variant="outline"
                onClick={() => setCurrentIndex((prev) => (prev + 1) % editedImages.length)}
                disabled={editedImages.length === 1}
              >
                Next
              </Button>
            </div>
          )}

          {/* Crop Controls */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <ScissorsIcon className="h-4 w-4" />
                Crop
              </h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsCropping(!isCropping)}
              >
                {isCropping ? "Hide Crop" : "Show Crop"}
              </Button>
            </div>
            {isCropping && (
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={cropMode === "16:9" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCropAspectRatio("16:9")}
                >
                  16:9
                </Button>
                <Button
                  variant={cropMode === "4:3" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCropAspectRatio("4:3")}
                >
                  4:3
                </Button>
                <Button
                  variant={cropMode === "1:1" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCropAspectRatio("1:1")}
                >
                  1:1
                </Button>
                <Button
                  variant={cropMode === "free" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCropAspectRatio("free")}
                >
                  Free
                </Button>
              </div>
            )}
          </div>

          {/* Rotation Controls */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Rotation</h3>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => rotate(-90)}
                title="Rotate left 90°"
              >
                <ArrowUturnLeftIcon className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => rotate(90)}
                title="Rotate right 90°"
              >
                <ArrowUturnRightIcon className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => rotate(180)}
                title="Rotate 180°"
              >
                <ArrowPathIcon className="h-4 w-4" />
              </Button>
              <div className="flex-1 text-right text-xs text-slate-500 dark:text-slate-400">
                {currentImage.rotation}°
              </div>
            </div>
          </div>

          {/* Adjustments */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Adjustments</h3>

            {/* Brightness */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm text-slate-600 dark:text-slate-400">Brightness</label>
                <span className="text-xs text-slate-500 dark:text-slate-400">{currentImage.brightness}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="150"
                value={currentImage.brightness}
                onChange={(e) => updateImage({ brightness: parseInt(e.target.value) })}
                className="w-full"
              />
            </div>

            {/* Contrast */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm text-slate-600 dark:text-slate-400">Contrast</label>
                <span className="text-xs text-slate-500 dark:text-slate-400">{currentImage.contrast}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="150"
                value={currentImage.contrast}
                onChange={(e) => updateImage({ contrast: parseInt(e.target.value) })}
                className="w-full"
              />
            </div>

            {/* Saturation */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm text-slate-600 dark:text-slate-400">Saturation</label>
                <span className="text-xs text-slate-500 dark:text-slate-400">{currentImage.saturation}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="200"
                value={currentImage.saturation}
                onChange={(e) => updateImage({ saturation: parseInt(e.target.value) })}
                className="w-full"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
            <Button variant="outline" onClick={reset} className="flex-1">
              Reset
            </Button>
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleSave} className="flex-1">
              <CheckIcon className="h-4 w-4 mr-2" />
              Save & Upload
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

