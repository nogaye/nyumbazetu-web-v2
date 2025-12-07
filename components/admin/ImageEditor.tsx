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
} from "@heroicons/react/24/outline";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface ImageEditorProps {
  files: File[];
  isOpen: boolean;
  onClose: () => void;
  onSave: (editedFiles: File[]) => void;
}

interface EditedImage {
  file: File;
  preview: string;
  rotation: number;
  brightness: number;
  contrast: number;
  saturation: number;
}

export function ImageEditor({ files, isOpen, onClose, onSave }: ImageEditorProps) {
  const [editedImages, setEditedImages] = useState<EditedImage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  // Initialize edited images when files change
  useEffect(() => {
    if (files.length > 0 && isOpen) {
      const loadImages = async () => {
        const edited: EditedImage[] = await Promise.all(
          files.map(async (file) => {
            const preview = URL.createObjectURL(file);
            return {
              file,
              preview,
              rotation: 0,
              brightness: 100,
              contrast: 100,
              saturation: 100,
            };
          })
        );
        setEditedImages(edited);
        setCurrentIndex(0);
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

    // Calculate display size (max 800px width for preview)
    const maxWidth = 800;
    const scale = Math.min(1, maxWidth / img.width);
    const displayWidth = img.width * scale;
    const displayHeight = img.height * scale;

    // For rotation, we need a larger canvas to accommodate the rotated image
    const rotationRad = (currentImage.rotation * Math.PI) / 180;
    const cos = Math.abs(Math.cos(rotationRad));
    const sin = Math.abs(Math.sin(rotationRad));
    const rotatedWidth = img.width * cos + img.height * sin;
    const rotatedHeight = img.width * sin + img.height * cos;
    
    const rotatedDisplayWidth = rotatedWidth * scale;
    const rotatedDisplayHeight = rotatedHeight * scale;

    canvas.width = rotatedDisplayWidth;
    canvas.height = rotatedDisplayHeight;

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
    updateImage({
      rotation: 0,
      brightness: 100,
      contrast: 100,
      saturation: 100,
    });
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

      canvas.width = img.width;
      canvas.height = img.height;

      // Apply rotation
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((edited.rotation * Math.PI) / 180);
      ctx.translate(-canvas.width / 2, -canvas.height / 2);
      ctx.drawImage(img, 0, 0);
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
          <div className="relative bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden min-h-[300px] flex items-center justify-center p-4">
            <canvas
              ref={canvasRef}
              className="max-w-full max-h-[400px] object-contain"
            />
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

