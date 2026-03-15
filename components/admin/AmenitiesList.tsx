"use client";

/**
 * Admin list and CRUD for amenity definitions (tb_listing_amenities).
 * Follows UX rules: filters left, primary action top-right, loading/success/error feedback.
 */

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

/** Single amenity row from API. */
export interface AmenityRow {
  id: number;
  name: string;
  code: string | null;
  icon: string | null;
  category: string | null;
  description: string | null;
  sort_order: number;
  is_active: boolean;
  created_at?: string;
}

interface AmenitiesListProps {
  /** Include inactive amenities in the list when true. */
  includeInactive?: boolean;
}

export function AmenitiesList({ includeInactive = false }: AmenitiesListProps) {
  const [amenities, setAmenities] = useState<AmenityRow[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showInactive, setShowInactive] = useState(includeInactive);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editing, setEditing] = useState<AmenityRow | null>(null);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [submitMessage, setSubmitMessage] = useState<string>("");

  const [form, setForm] = useState({
    name: "",
    code: "",
    icon: "",
    category: "",
    description: "",
    sort_order: 0,
    is_active: true,
  });

  const fetchAmenities = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (showInactive) params.set("include_inactive", "true");
      const res = await fetch(`/api/admin/amenities?${params.toString()}`);
      const data = await res.json();
      if (res.ok) {
        setAmenities(data.amenities ?? []);
        setTotal(data.total ?? 0);
      } else {
        setError(data.error ?? "Failed to load amenities");
      }
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAmenities();
  }, [showInactive]);

  const openCreate = () => {
    setEditing(null);
    setForm({
      name: "",
      code: "",
      icon: "",
      category: "",
      description: "",
      sort_order: 0,
      is_active: true,
    });
    setSubmitStatus("idle");
    setSheetOpen(true);
  };

  const openEdit = (row: AmenityRow) => {
    setEditing(row);
    setForm({
      name: row.name,
      code: row.code ?? "",
      icon: row.icon ?? "",
      category: row.category ?? "",
      description: row.description ?? "",
      sort_order: row.sort_order,
      is_active: row.is_active,
    });
    setSubmitStatus("idle");
    setSheetOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus("idle");
    const url = editing
      ? `/api/admin/amenities/${editing.id}`
      : "/api/admin/amenities";
    const method = editing ? "PATCH" : "POST";
    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          code: form.code.trim() || undefined,
          icon: form.icon.trim() || undefined,
          category: form.category.trim() || undefined,
          description: form.description.trim() || undefined,
          sort_order: Number(form.sort_order) || 0,
          is_active: form.is_active,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setSubmitStatus("success");
        setSubmitMessage(editing ? "Amenity updated." : "Amenity created.");
        setTimeout(() => {
          setSheetOpen(false);
          fetchAmenities();
        }, 800);
      } else {
        setSubmitStatus("error");
        setSubmitMessage(data.error ?? "Save failed.");
      }
    } catch {
      setSubmitStatus("error");
      setSubmitMessage("Network error.");
    }
  };

  const handleDelete = async (row: AmenityRow) => {
    if (!confirm(`Remove amenity "${row.name}"? This does not remove it from properties that already have it assigned.`)) return;
    try {
      const res = await fetch(`/api/admin/amenities/${row.id}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok) {
        fetchAmenities();
      } else {
        alert(data.error ?? "Delete failed.");
      }
    } catch {
      alert("Network error.");
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="text-xl">Amenities ({total})</CardTitle>
            <div className="flex flex-wrap items-center gap-2">
              <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <input
                  type="checkbox"
                  checked={showInactive}
                  onChange={(e) => setShowInactive(e.target.checked)}
                  className="rounded border-slate-300 text-primary focus:ring-primary"
                />
                Show inactive
              </label>
              <Button onClick={openCreate} size="default" className="min-h-10 px-4">
                <PlusIcon className="mr-2 h-4 w-4" />
                Add amenity
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading && (
            <p className="py-8 text-center text-slate-500 dark:text-slate-400">
              Loading amenities…
            </p>
          )}
          {error && (
            <Alert variant="destructive" className="mb-4">
              <ExclamationCircleIcon className="h-5 w-5" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
              <Button variant="outline" size="sm" onClick={fetchAmenities} className="mt-2">
                Retry
              </Button>
            </Alert>
          )}
          {!loading && !error && amenities.length === 0 && (
            <p className="py-8 text-center text-slate-500 dark:text-slate-400">
              No amenities yet. Add one to get started.
            </p>
          )}
          {!loading && !error && amenities.length > 0 && (
            <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 dark:bg-slate-900">
                  <tr>
                    <th className="px-4 py-3 font-semibold text-slate-900 dark:text-slate-50">Name</th>
                    <th className="px-4 py-3 font-semibold text-slate-900 dark:text-slate-50">Category</th>
                    <th className="px-4 py-3 font-semibold text-slate-900 dark:text-slate-50">Sort</th>
                    <th className="px-4 py-3 font-semibold text-slate-900 dark:text-slate-50">Status</th>
                    <th className="px-4 py-3 text-right font-semibold text-slate-900 dark:text-slate-50">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {amenities.map((a) => (
                    <tr
                      key={a.id}
                      className="border-t border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900/50"
                    >
                      <td className="px-4 py-3 font-medium">{a.name}</td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{a.category ?? "—"}</td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{a.sort_order}</td>
                      <td className="px-4 py-3">
                        <span
                          className={
                            a.is_active
                              ? "rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-300"
                              : "rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-700 dark:text-slate-400"
                          }
                        >
                          {a.is_active ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" onClick={() => openEdit(a)} aria-label="Edit">
                            <PencilIcon className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700 dark:text-red-400"
                            onClick={() => handleDelete(a)}
                            aria-label="Delete"
                          >
                            <TrashIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="overflow-y-auto sm:max-w-md">
          <SheetHeader className="border-b border-slate-200 dark:border-slate-800 pb-4">
            <SheetTitle>{editing ? "Edit amenity" : "Add amenity"}</SheetTitle>
            <SheetDescription>
              {editing ? "Update the amenity details below." : "Create a new amenity to assign to properties."}
            </SheetDescription>
          </SheetHeader>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {submitStatus === "success" && (
              <Alert className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20">
                <CheckCircleIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
                <AlertTitle className="text-green-800 dark:text-green-200">Saved</AlertTitle>
                <AlertDescription className="text-green-700 dark:text-green-300">{submitMessage}</AlertDescription>
              </Alert>
            )}
            {submitStatus === "error" && (
              <Alert variant="destructive">
                <ExclamationCircleIcon className="h-5 w-5" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{submitMessage}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="amenity-name">Name *</Label>
              <Input
                id="amenity-name"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="e.g. WiFi, Parking"
                required
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="amenity-code">Code</Label>
                <Input
                  id="amenity-code"
                  value={form.code}
                  onChange={(e) => setForm((f) => ({ ...f, code: e.target.value }))}
                  placeholder="wifi"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amenity-category">Category</Label>
                <Input
                  id="amenity-category"
                  value={form.category}
                  onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                  placeholder="essentials, facilities"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="amenity-icon">Icon</Label>
              <Input
                id="amenity-icon"
                value={form.icon}
                onChange={(e) => setForm((f) => ({ ...f, icon: e.target.value }))}
                placeholder="wifi or icon class"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amenity-desc">Description</Label>
              <Input
                id="amenity-desc"
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                placeholder="Optional"
              />
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <div className="space-y-2">
                <Label htmlFor="amenity-sort">Sort order</Label>
                <Input
                  id="amenity-sort"
                  type="number"
                  min={0}
                  value={form.sort_order}
                  onChange={(e) => setForm((f) => ({ ...f, sort_order: parseInt(e.target.value, 10) || 0 }))}
                />
              </div>
              <label className="flex items-center gap-2 pt-6">
                <input
                  type="checkbox"
                  checked={form.is_active}
                  onChange={(e) => setForm((f) => ({ ...f, is_active: e.target.checked }))}
                  className="rounded border-slate-300 text-primary focus:ring-primary"
                />
                <span className="text-sm text-slate-700 dark:text-slate-300">Active</span>
              </label>
            </div>
            <div className="pt-4 flex gap-2">
              <Button type="submit" size="lg" className="flex-1 min-h-11">
                {editing ? "Update" : "Create"}
              </Button>
              <Button type="button" variant="outline" size="lg" onClick={() => setSheetOpen(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
}
