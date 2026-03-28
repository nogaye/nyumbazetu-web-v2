"use client";

/**
 * Client-side interactive flow for `/services/request`: property/block/unit context,
 * job details (category, description, photos, urgency), AI-labelled vendor suggestions
 * with Recommended vs All tabs and cheapest/fastest bias, and multi-select dispatch (demo).
 *
 * Uses mock data only; no network submit. Photo files stay in memory for preview URLs.
 */

import Image from "next/image";
import Link from "next/link";
import type { ComponentType, ReactNode } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ArrowPathIcon,
  BoltIcon,
  BuildingOffice2Icon,
  CameraIcon,
  CheckBadgeIcon,
  ClockIcon,
  MapPinIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { CheckBadgeIcon as CheckBadgeSolid } from "@heroicons/react/24/solid";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  DEMO_DEFAULT_BLOCK_ID,
  DEMO_DEFAULT_UNIT_ID,
  DEMO_PROPERTY_CONTEXT,
  type VendorSortBias,
  type VendorSuggestionRow,
  listVendorsForCategory,
  sortSuggestionRows,
  toSuggestionRows,
  unitsForBlock,
} from "@/lib/services/request-flow-mock";
import {
  SERVICE_CATEGORY_SLUGS,
  categoryLabelFromSlug,
  type ServiceCategorySlug,
} from "@/lib/services/vendors-mock";
import { RatingStars } from "@/components/services/rating-stars";

/** Urgency levels for maintenance triage (mock; maps to future SLA rules). */
type Urgency = "low" | "medium" | "emergency";

/** Local preview for uploaded images (object URL + file name). */
interface PhotoPreview {
  /** `URL.createObjectURL` result; must be revoked on remove/unmount. */
  url: string;
  /** Original filename for accessible labels. */
  name: string;
}

/**
 * Renders the full request-service experience: form, suggestion panels, and submit stub.
 */
export function RequestServiceFlow() {
  const [blockId, setBlockId] = useState<string>(DEMO_DEFAULT_BLOCK_ID);
  const [unitId, setUnitId] = useState<string>(DEMO_DEFAULT_UNIT_ID);
  const [categorySlug, setCategorySlug] = useState<ServiceCategorySlug>("plumbing");
  const [description, setDescription] = useState<string>("");
  const [urgency, setUrgency] = useState<Urgency>("medium");
  const [vendorTab, setVendorTab] = useState<"recommended" | "all">("recommended");
  const [sortBias, setSortBias] = useState<VendorSortBias>("fastest");
  const [selectedSlugs, setSelectedSlugs] = useState<Set<string>>(new Set());
  const [photoPreviews, setPhotoPreviews] = useState<PhotoPreview[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const blockUnits = useMemo(() => unitsForBlock(blockId), [blockId]);

  /**
   * Updates block and, when the current unit is not under the new block, selects the first unit there.
   * @param newBlockId - Block id from the block `<Select>`.
   */
  const onBlockChange = useCallback(
    (newBlockId: string) => {
      setBlockId(newBlockId);
      const nextUnits = unitsForBlock(newBlockId);
      const stillValid = nextUnits.some((u) => u.id === unitId);
      if (!stillValid && nextUnits.length > 0) {
        setUnitId(nextUnits[0].id);
      }
    },
    [unitId],
  );

  /**
   * Revoke all blob URLs on unmount to avoid leaking object URLs.
   */
  useEffect(() => {
    return () => {
      photoPreviews.forEach((p) => URL.revokeObjectURL(p.url));
    };
  }, [photoPreviews]);

  const suggestionRows: VendorSuggestionRow[] = useMemo(() => {
    const vendors = listVendorsForCategory(categorySlug);
    return toSuggestionRows(vendors, blockId);
  }, [categorySlug, blockId]);

  const sortedRows = useMemo(
    () => sortSuggestionRows(suggestionRows, vendorTab, sortBias),
    [suggestionRows, vendorTab, sortBias],
  );

  /**
   * Toggles vendor inclusion in the mock multi-recipient send list.
   * @param slug - Vendor `slug`; added or removed from selection.
   * @param checked - Radix checkbox checked state.
   */
  const toggleVendor = useCallback((slug: string, checked: boolean) => {
    setSelectedSlugs((prev) => {
      const next = new Set(prev);
      if (checked) next.add(slug);
      else next.delete(slug);
      return next;
    });
  }, []);

  /**
   * Handles multi-file input: builds previews and revokes URLs for replaced files.
   * @param fileList - From an `<input type="file" />` change event.
   */
  const onPhotosChange = useCallback((fileList: FileList | null) => {
    if (!fileList?.length) return;
    const files = Array.from(fileList).slice(0, 8);
    setPhotoPreviews((prev) => {
      prev.forEach((p) => URL.revokeObjectURL(p.url));
      return files.map((f) => ({ url: URL.createObjectURL(f), name: f.name }));
    });
  }, []);

  /**
   * Removes one preview tile and revokes its object URL.
   * @param url - The preview URL to revoke and filter out.
   */
  const removePhoto = useCallback((url: string) => {
    setPhotoPreviews((prev) => {
      URL.revokeObjectURL(url);
      return prev.filter((p) => p.url !== url);
    });
  }, []);

  /**
   * Demo submit: validates minimal fields and flips to a success panel (no API).
   * @param e - Form submit event from the wrapping `<form>`.
   */
  const onSubmitForm = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (selectedSlugs.size === 0 || description.trim().length < 8) return;
      setSubmitted(true);
    },
    [description, selectedSlugs.size],
  );

  const canSend = selectedSlugs.size > 0 && description.trim().length >= 8;

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200/90 bg-white p-8 text-center shadow-sm dark:border-slate-700/90 dark:bg-slate-900/45 sm:p-12">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/15 text-primary">
          <BoltIcon className="h-8 w-8" aria-hidden />
        </div>
        <h2 className="mt-6 font-display text-2xl font-bold text-secondary dark:text-slate-100">
          Request queued (demo)
        </h2>
        <p className="mt-3 text-muted-foreground">
          In the live product this would notify{" "}
          <span className="font-semibold text-foreground">{selectedSlugs.size}</span> vendor
          {selectedSlugs.size === 1 ? "" : "s"} with your photos, urgency, and unit context.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild variant="outline">
            <Link href="/services/vendors">Back to vendors</Link>
          </Button>
          <Button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setSelectedSlugs(new Set());
              setDescription("");
              setPhotoPreviews((prev) => {
                prev.forEach((p) => URL.revokeObjectURL(p.url));
                return [];
              });
            }}
          >
            New request
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form className="mx-auto max-w-4xl space-y-10" onSubmit={onSubmitForm} noValidate>
      <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm dark:border-slate-700/90 dark:bg-slate-900/45 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="font-display text-xl font-bold text-secondary dark:text-slate-100">
              Job details
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Location is pre-filled from your portfolio; add photos and urgency so vendors can
              quote accurately.
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200">
            <BuildingOffice2Icon className="h-4 w-4" aria-hidden />
            Signed-in preview
          </span>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          <div className="space-y-2 sm:col-span-3">
            <Label htmlFor="property-field">Property</Label>
            <Select disabled value={DEMO_PROPERTY_CONTEXT.propertyId}>
              <SelectTrigger id="property-field" className="bg-slate-50 dark:bg-slate-900/60">
                <SelectValue placeholder="Property" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={DEMO_PROPERTY_CONTEXT.propertyId}>
                  {DEMO_PROPERTY_CONTEXT.propertyName}
                </SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Pulled from your Nyumba Zetu workspace (mock: one estate for this demo).
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="block-select">Block</Label>
            <Select value={blockId} onValueChange={onBlockChange}>
              <SelectTrigger id="block-select">
                <SelectValue placeholder="Block" />
              </SelectTrigger>
              <SelectContent>
                {DEMO_PROPERTY_CONTEXT.blocks.map((b) => (
                  <SelectItem key={b.id} value={b.id}>
                    {b.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="unit-select">Unit</Label>
            <Select value={unitId} onValueChange={setUnitId}>
              <SelectTrigger id="unit-select">
                <SelectValue placeholder="Unit" />
              </SelectTrigger>
              <SelectContent>
                {blockUnits.map((u) => (
                  <SelectItem key={u.id} value={u.id}>
                    {u.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 sm:col-span-3">
            <Label htmlFor="category-select">Category</Label>
            <Select
              value={categorySlug}
              onValueChange={(v) => setCategorySlug(v as ServiceCategorySlug)}
            >
              <SelectTrigger id="category-select">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {SERVICE_CATEGORY_SLUGS.map((slug) => (
                  <SelectItem key={slug} value={slug}>
                    {categoryLabelFromSlug(slug)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 sm:col-span-3">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              required
              minLength={8}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What needs doing? Access instructions, preferred times, safety notes…"
              className="min-h-[120px]"
            />
            {description.trim().length > 0 && description.trim().length < 8 && (
              <p className="text-xs text-amber-700 dark:text-amber-400">
                Add a few more characters so vendors have enough context (min. 8).
              </p>
            )}
          </div>

          <div className="space-y-3 sm:col-span-3">
            <Label className="flex items-center gap-2">
              <CameraIcon className="h-4 w-4 text-primary" aria-hidden />
              Photos
              <span className="font-semibold text-primary">(highly recommended)</span>
            </Label>
            <p className="text-sm text-muted-foreground">
              Clear photos reduce callbacks and wrong quotes. Show the fault, wider context, and
              any labels or serial numbers.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <label className="inline-flex cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-primary/40 bg-primary/5 px-4 py-3 text-sm font-medium text-primary transition hover:bg-primary/10">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="sr-only"
                  onChange={(e) => onPhotosChange(e.target.files)}
                />
                Add photos
              </label>
              <span className="text-xs text-muted-foreground">Up to 8 images, on-device only.</span>
            </div>
            {photoPreviews.length > 0 && (
              <ul className="mt-4 flex flex-wrap gap-3">
                {photoPreviews.map((p) => (
                  <li
                    key={p.url}
                    className="relative h-24 w-24 overflow-hidden rounded-lg border border-slate-200 dark:border-slate-600"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element -- blob URLs */}
                    <img src={p.url} alt="" className="h-full w-full object-cover" />
                    <button
                      type="button"
                      className="absolute right-1 top-1 rounded bg-black/60 px-1.5 py-0.5 text-xs text-white hover:bg-black/80"
                      onClick={() => removePhoto(p.url)}
                      aria-label={`Remove ${p.name}`}
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <fieldset className="space-y-3 sm:col-span-3">
            <legend className="text-sm font-medium">Urgency</legend>
            <div className="flex flex-wrap gap-4">
              {(
                [
                  { id: "urgency-low", value: "low" as const, label: "Low" },
                  { id: "urgency-medium", value: "medium" as const, label: "Medium" },
                  { id: "urgency-emergency", value: "emergency" as const, label: "Emergency" },
                ] as const
              ).map((opt) => (
                <label
                  key={opt.id}
                  className={cn(
                    "flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition",
                    urgency === opt.value
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-slate-200 dark:border-slate-600",
                    opt.value === "emergency" &&
                      urgency === "emergency" &&
                      "border-red-500/60 bg-red-500/10 text-red-800 dark:text-red-200",
                  )}
                >
                  <input
                    type="radio"
                    name="urgency"
                    id={opt.id}
                    value={opt.value}
                    checked={urgency === opt.value}
                    onChange={() => setUrgency(opt.value)}
                    className="h-4 w-4 border-slate-300 text-primary"
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          </fieldset>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm dark:border-slate-700/90 dark:bg-slate-900/45 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-display text-xl font-bold text-secondary dark:text-slate-100">
                Suggested vendors
              </h2>
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/15 px-2.5 py-0.5 text-xs font-semibold text-amber-900 dark:text-amber-200">
                <SparklesIcon className="h-3.5 w-3.5" aria-hidden />
                AI-assisted ranking
              </span>
            </div>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">
              Weights vendors you have used before, repeat work in this block, strong ratings, and
              response speed — then applies your{" "}
              <span className="font-medium text-foreground">cheapest</span> vs{" "}
              <span className="font-medium text-foreground">fastest</span> preference. Live
              product will call your matching model.
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <Tabs
            value={vendorTab}
            onValueChange={(v) => setVendorTab(v as "recommended" | "all")}
            className="w-full lg:w-auto"
          >
            <TabsList className="grid w-full grid-cols-2 sm:w-auto sm:inline-flex">
              <TabsTrigger value="recommended">Recommended</TabsTrigger>
              <TabsTrigger value="all">All matching</TabsTrigger>
            </TabsList>
          </Tabs>

          <div
            className="flex flex-col gap-2 sm:flex-row sm:items-center"
            role="group"
            aria-label="Sort preference"
          >
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Optimise for
            </span>
            <div className="inline-flex rounded-lg border border-slate-200 p-0.5 dark:border-slate-600">
              <button
                type="button"
                onClick={() => setSortBias("cheapest")}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm font-medium transition",
                  sortBias === "cheapest"
                    ? "bg-secondary text-white shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                Cheapest quotes
              </button>
              <button
                type="button"
                onClick={() => setSortBias("fastest")}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm font-medium transition",
                  sortBias === "fastest"
                    ? "bg-secondary text-white shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                Fastest response
              </button>
            </div>
          </div>
        </div>

        <p className="mt-4 rounded-lg border border-dashed border-slate-200/90 bg-slate-50/80 px-4 py-3 text-xs text-muted-foreground dark:border-slate-700 dark:bg-slate-900/40">
          <strong className="font-medium text-foreground">Coming next:</strong> one-tap picks like
          “Most reliable plumber for this property” using your job history and outcomes.
        </p>

        <ul className="mt-8 space-y-4" aria-label="Vendor suggestions">
          {sortedRows.map((row) => (
            <VendorSuggestionCard
              key={row.vendor.slug}
              row={row}
              checked={selectedSlugs.has(row.vendor.slug)}
              onCheckedChange={(c) => toggleVendor(row.vendor.slug, c === true)}
            />
          ))}
        </ul>

        {sortedRows.length === 0 && (
          <p className="mt-8 text-center text-sm text-muted-foreground">
            No vendors in this category yet (mock dataset). Try another category.
          </p>
        )}
      </div>

      <div className="sticky bottom-4 z-10 flex flex-col gap-3 rounded-2xl border border-slate-200/90 bg-white/95 p-4 shadow-lg backdrop-blur dark:border-slate-700/90 dark:bg-slate-900/90 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{selectedSlugs.size}</span> vendor
          {selectedSlugs.size === 1 ? "" : "s"} selected
          {!canSend && (
            <span className="block text-xs text-amber-800 dark:text-amber-300">
              Select at least one vendor and add a short description.
            </span>
          )}
        </p>
        <Button type="submit" size="lg" className="min-h-[48px] w-full sm:w-auto" disabled={!canSend}>
          Send request to selected
        </Button>
      </div>
    </form>
  );
}

interface VendorSuggestionCardProps {
  /** Enriched vendor row for one list item. */
  row: VendorSuggestionRow;
  /** Whether this vendor is selected for the outbound request. */
  checked: boolean;
  /** Fired when the row checkbox changes. */
  onCheckedChange: (checked: boolean | "indeterminate") => void;
}

/**
 * Single selectable vendor row with badges for mock recommendation reasons.
 */
function VendorSuggestionCard({ row, checked, onCheckedChange }: VendorSuggestionCardProps) {
  const { vendor, usedOnThisPropertyBefore, usedInSameBlock, priceTier, responseMinutes } = row;
  const tierLabel =
    priceTier <= 2 ? "Budget-friendly" : priceTier >= 4 ? "Premium band" : "Mid-range quotes";

  return (
    <li className="flex gap-4 rounded-2xl border border-slate-200/90 bg-slate-50/50 p-4 dark:border-slate-700/90 dark:bg-slate-900/30 sm:items-center sm:p-5">
      <div className="flex h-11 w-11 shrink-0 items-center pt-1 sm:pt-0">
        <Checkbox
          checked={checked}
          onCheckedChange={onCheckedChange}
          aria-label={`Select ${vendor.businessName}`}
          className="h-5 w-5"
        />
      </div>
      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 ring-1 ring-slate-200/80 dark:ring-slate-600/80">
        {vendor.logoImageUrl ? (
          <Image
            src={vendor.logoImageUrl}
            alt=""
            width={56}
            height={56}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center font-display text-sm font-bold text-secondary dark:text-slate-200">
            {vendor.logoMark}
          </span>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href={`/services/vendors/${vendor.slug}`}
            className="font-display text-base font-semibold text-secondary hover:text-primary dark:text-slate-100"
          >
            {vendor.businessName}
          </Link>
          {vendor.verified && (
            <span className="inline-flex items-center gap-0.5 text-xs font-medium text-primary">
              <CheckBadgeSolid className="h-3.5 w-3.5" aria-hidden />
              Verified
            </span>
          )}
        </div>
        <div className="mt-1">
          <RatingStars rating={vendor.rating} reviewCount={vendor.reviewCount} />
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {usedOnThisPropertyBefore && (
            <BadgePill icon={ArrowPathIcon}>Used on this property</BadgePill>
          )}
          {usedInSameBlock && <BadgePill icon={BuildingOffice2Icon}>Active in this block</BadgePill>}
          <BadgePill icon={ClockIcon}>~{responseMinutes} min to reply</BadgePill>
          <BadgePill icon={CheckBadgeIcon}>{tierLabel}</BadgePill>
        </div>
        <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPinIcon className="h-3.5 w-3.5 shrink-0" aria-hidden />
          {vendor.location}
        </p>
      </div>
    </li>
  );
}

interface BadgePillProps {
  /** Small outline icon from Heroicons. */
  icon: ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  /** Badge text. */
  children: ReactNode;
}

/**
 * Compact badge for vendor suggestion reasons (icon + label).
 */
function BadgePill({ icon: Icon, children }: BadgePillProps) {
  return (
    <span className="inline-flex items-center gap-1 rounded-md bg-white px-2 py-0.5 text-xs font-medium text-slate-700 ring-1 ring-slate-200/90 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-600">
      <Icon className="h-3 w-3 text-primary" aria-hidden />
      {children}
    </span>
  );
}
