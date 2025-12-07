"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Property, PropertyType } from "@/lib/listings/types";
import {
  ExclamationCircleIcon,
  CheckCircleIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import { PropertyImageUpload } from "./PropertyImageUpload";

interface PropertyFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  property?: Property | null;
}

const PROPERTY_TYPES: { value: PropertyType; label: string }[] = [
  { value: "apartment", label: "Apartment" },
  { value: "maisonette", label: "Maisonette" },
  { value: "bedsitter", label: "Bedsitter" },
  { value: "house", label: "House" },
  { value: "studio", label: "Studio" },
  { value: "office", label: "Office" },
  { value: "shop", label: "Shop" },
];

export function PropertyFormModal({
  isOpen,
  onClose,
  property,
}: PropertyFormModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    city: "",
    area: "",
    monthly_rent: "",
    bedrooms: "",
    bathrooms: "",
    size_sqm: "",
    property_type: "apartment" as PropertyType,
    is_tps_available: false,
    is_verified: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [savedPropertyId, setSavedPropertyId] = useState<string | null>(null);

  useEffect(() => {
    if (property) {
      setFormData({
        title: property.title,
        slug: property.slug,
        description: property.description || "",
        city: property.city,
        area: property.area,
        monthly_rent: property.monthly_rent.toString(),
        bedrooms: property.bedrooms.toString(),
        bathrooms: property.bathrooms.toString(),
        size_sqm: property.size_sqm?.toString() || "",
        property_type: property.property_type,
        is_tps_available: property.is_tps_available,
        is_verified: property.is_verified,
      });
      setSavedPropertyId(property.id);
    } else {
      // Reset form for new property
      setFormData({
        title: "",
        slug: "",
        description: "",
        city: "",
        area: "",
        monthly_rent: "",
        bedrooms: "",
        bathrooms: "",
        size_sqm: "",
        property_type: "apartment",
        is_tps_available: false,
        is_verified: false,
      });
      setSavedPropertyId(null);
    }
    setErrors({});
    setSubmitStatus("idle");
  }, [property, isOpen]);

  // Auto-generate slug from title
  useEffect(() => {
    if (!property && formData.title) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setFormData((prev) => ({ ...prev, slug }));
    }
  }, [formData.title, property]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.slug.trim()) newErrors.slug = "Slug is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.area.trim()) newErrors.area = "Area is required";
    if (!formData.monthly_rent || parseFloat(formData.monthly_rent) <= 0) {
      newErrors.monthly_rent = "Valid monthly rent is required";
    }
    if (!formData.bedrooms || parseInt(formData.bedrooms) < 0) {
      newErrors.bedrooms = "Valid number of bedrooms is required";
    }
    if (!formData.bathrooms || parseInt(formData.bathrooms) < 0) {
      newErrors.bathrooms = "Valid number of bathrooms is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const url = property
        ? `/api/admin/properties/${property.id}`
        : "/api/admin/properties";
      const method = property ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          monthly_rent: parseInt(formData.monthly_rent),
          bedrooms: parseInt(formData.bedrooms),
          bathrooms: parseInt(formData.bathrooms),
          size_sqm: formData.size_sqm ? parseInt(formData.size_sqm) : null,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        // Set the property ID for image upload (new or existing)
        if (data.property?.id) {
          setSavedPropertyId(data.property.id);
        }
        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
        setSubmitStatus("error");
        setErrors({ submit: data.error || "Failed to save property" });
      }
    } catch (error) {
      setSubmitStatus("error");
      setErrors({ submit: "Network error. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="overflow-y-auto w-full sm:max-w-2xl">
        <SheetClose onClick={onClose} />
        <div className="p-6">
          <SheetHeader className="space-y-2 pb-4 border-b border-slate-200 dark:border-slate-800">
            <SheetTitle className="text-2xl font-bold">
              {property ? "Edit Property" : "Add New Property"}
            </SheetTitle>
            <SheetDescription className="text-base">
              {property
                ? "Update property information below"
                : "Fill in the details to create a new property listing"}
            </SheetDescription>
          </SheetHeader>

          <form onSubmit={handleSubmit} className="mt-6 space-y-6" noValidate>
            {submitStatus === "success" && (
              <Alert className="border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20">
                <CheckCircleIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
                <AlertTitle className="text-green-800 dark:text-green-200">
                  Property saved successfully!
                </AlertTitle>
                <AlertDescription className="text-green-700 dark:text-green-300">
                  The property has been {property ? "updated" : "created"} successfully.
                </AlertDescription>
              </Alert>
            )}

            {submitStatus === "error" && errors.submit && (
              <Alert variant="destructive">
                <ExclamationCircleIcon className="h-5 w-5" />
                <AlertTitle>Something went wrong</AlertTitle>
                <AlertDescription>
                  {errors.submit}
                </AlertDescription>
              </Alert>
            )}

            {/* Basic Information Section */}
            <div className="space-y-4">
              <div className="pb-2 border-b border-slate-200 dark:border-slate-700">
                <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                  Basic Information
                </h3>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">
                    Title *
                  </Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="2BR Apartment - Kilimani"
                    aria-invalid={errors.title ? "true" : "false"}
                    aria-describedby={errors.title ? "title-error" : undefined}
                    className={cn(
                      errors.title && "border-red-500 dark:border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  {errors.title && (
                    <p id="title-error" className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1" role="alert">
                      <ExclamationCircleIcon className="h-4 w-4" />
                      {errors.title}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slug">
                    Slug *
                  </Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData({ ...formData, slug: e.target.value })
                    }
                    placeholder="2br-apartment-kilimani"
                    aria-invalid={errors.slug ? "true" : "false"}
                    aria-describedby={errors.slug ? "slug-error" : undefined}
                    className={cn(
                      errors.slug && "border-red-500 dark:border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  {errors.slug && (
                    <p id="slug-error" className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1" role="alert">
                      <ExclamationCircleIcon className="h-4 w-4" />
                      {errors.slug}
                    </p>
                  )}
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    URL-friendly identifier (auto-generated from title)
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    rows={4}
                    placeholder="Describe the property, its features, and amenities..."
                    className="resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Location Section */}
            <div className="space-y-4">
              <div className="pb-2 border-b border-slate-200 dark:border-slate-700">
                <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                  Location
                </h3>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="city">
                    City *
                  </Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                    placeholder="Nairobi"
                    aria-invalid={errors.city ? "true" : "false"}
                    aria-describedby={errors.city ? "city-error" : undefined}
                    className={cn(
                      errors.city && "border-red-500 dark:border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  {errors.city && (
                    <p id="city-error" className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1" role="alert">
                      <ExclamationCircleIcon className="h-4 w-4" />
                      {errors.city}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="area">
                    Area *
                  </Label>
                  <Input
                    id="area"
                    value={formData.area}
                    onChange={(e) =>
                      setFormData({ ...formData, area: e.target.value })
                    }
                    placeholder="Kilimani"
                    aria-invalid={errors.area ? "true" : "false"}
                    aria-describedby={errors.area ? "area-error" : undefined}
                    className={cn(
                      errors.area && "border-red-500 dark:border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  {errors.area && (
                    <p id="area-error" className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1" role="alert">
                      <ExclamationCircleIcon className="h-4 w-4" />
                      {errors.area}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Property Details Section */}
            <div className="space-y-4">
              <div className="pb-2 border-b border-slate-200 dark:border-slate-700">
                <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                  Property Details
                </h3>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="property_type">
                    Property Type *
                  </Label>
                  <Select
                    value={formData.property_type}
                    onValueChange={(value) =>
                      setFormData({
                        ...formData,
                        property_type: value as PropertyType,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent>
                      {PROPERTY_TYPES.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="bedrooms">
                      Bedrooms *
                    </Label>
                    <Input
                      id="bedrooms"
                      type="number"
                      min="0"
                      value={formData.bedrooms}
                      onChange={(e) =>
                        setFormData({ ...formData, bedrooms: e.target.value })
                      }
                      placeholder="0"
                      aria-invalid={errors.bedrooms ? "true" : "false"}
                      aria-describedby={errors.bedrooms ? "bedrooms-error" : undefined}
                      className={cn(
                        errors.bedrooms && "border-red-500 dark:border-red-500 focus-visible:ring-red-500"
                      )}
                    />
                    {errors.bedrooms && (
                      <p id="bedrooms-error" className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1" role="alert">
                        <ExclamationCircleIcon className="h-4 w-4" />
                        {errors.bedrooms}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bathrooms">
                      Bathrooms *
                    </Label>
                    <Input
                      id="bathrooms"
                      type="number"
                      min="0"
                      value={formData.bathrooms}
                      onChange={(e) =>
                        setFormData({ ...formData, bathrooms: e.target.value })
                      }
                      placeholder="0"
                      aria-invalid={errors.bathrooms ? "true" : "false"}
                      aria-describedby={errors.bathrooms ? "bathrooms-error" : undefined}
                      className={cn(
                        errors.bathrooms && "border-red-500 dark:border-red-500 focus-visible:ring-red-500"
                      )}
                    />
                    {errors.bathrooms && (
                      <p id="bathrooms-error" className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1" role="alert">
                        <ExclamationCircleIcon className="h-4 w-4" />
                        {errors.bathrooms}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="size_sqm">
                      Size (m²)
                    </Label>
                    <Input
                      id="size_sqm"
                      type="number"
                      min="0"
                      value={formData.size_sqm}
                      onChange={(e) =>
                        setFormData({ ...formData, size_sqm: e.target.value })
                      }
                      placeholder="Optional"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="monthly_rent">
                    Monthly Rent (KES) *
                  </Label>
                  <Input
                    id="monthly_rent"
                    type="number"
                    min="0"
                    value={formData.monthly_rent}
                    onChange={(e) =>
                      setFormData({ ...formData, monthly_rent: e.target.value })
                    }
                    placeholder="85000"
                    aria-invalid={errors.monthly_rent ? "true" : "false"}
                    aria-describedby={errors.monthly_rent ? "monthly_rent-error" : undefined}
                    className={cn(
                      errors.monthly_rent && "border-red-500 dark:border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  {errors.monthly_rent && (
                    <p id="monthly_rent-error" className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1" role="alert">
                      <ExclamationCircleIcon className="h-4 w-4" />
                      {errors.monthly_rent}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Options Section */}
            <div className="space-y-4">
              <div className="pb-2 border-b border-slate-200 dark:border-slate-700">
                <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                  Options & Status
                </h3>
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.is_verified}
                    onChange={(e) =>
                      setFormData({ ...formData, is_verified: e.target.checked })
                    }
                    className="rounded border-slate-300 text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-slate-700 dark:text-slate-300">
                    Verified Property
                  </span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.is_tps_available}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        is_tps_available: e.target.checked,
                      })
                    }
                    className="rounded border-slate-300 text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-slate-700 dark:text-slate-300">
                    TPS Available (Rent-to-Own)
                  </span>
                </label>
              </div>
            </div>

            {/* Images Section */}
            <div className="space-y-4">
              <PropertyImageUpload propertyId={savedPropertyId || property?.id || null} />
            </div>

            <div className="pt-4 space-y-3">
              <Button
                type="submit"
                size="lg"
                className="w-full flex items-center justify-center gap-2 h-12 text-base font-semibold"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  "Saving..."
                ) : (
                  <>
                    {property ? "Update Property" : "Create Property"}
                    <PaperAirplaneIcon className="h-5 w-5" />
                  </>
                )}
              </Button>
              <p className="text-xs text-center text-slate-500 dark:text-slate-400">
                * Required fields
              </p>
            </div>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
}


