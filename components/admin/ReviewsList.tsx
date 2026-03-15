"use client";

/**
 * Admin list and moderation for listing reviews.
 * Follows UX rules: filter left, clear actions, loading/error/success feedback.
 */

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { PencilIcon, TrashIcon, ExclamationCircleIcon, CheckCircleIcon, StarIcon } from "@heroicons/react/24/outline";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";

/** Review row from API. */
export interface ReviewRow {
  id: number;
  property_id: number;
  property_title: string | null;
  property_slug: string | null;
  body: string;
  headline: string | null;
  rating: number | null;
  is_visible: boolean;
  is_featured: boolean;
  is_verified_review: boolean;
  moderation_status: string;
  like_count: number;
  created_at: string;
}

export function ReviewsList() {
  const [reviews, setReviews] = useState<ReviewRow[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [propertyFilter, setPropertyFilter] = useState<string>("");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editing, setEditing] = useState<ReviewRow | null>(null);
  const [form, setForm] = useState({
    body: "",
    headline: "",
    rating: 5,
    is_visible: true,
    is_featured: false,
    moderation_status: "published",
  });
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  const fetchReviews = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (propertyFilter) params.set("property_id", propertyFilter);
      const res = await fetch(`/api/admin/reviews?${params.toString()}`);
      const data = await res.json();
      if (res.ok) {
        setReviews(data.reviews ?? []);
        setTotal(data.total ?? 0);
      } else {
        setError(data.error ?? "Failed to load reviews");
      }
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [propertyFilter]);

  const openEdit = (r: ReviewRow) => {
    setEditing(r);
    setForm({
      body: r.body,
      headline: r.headline ?? "",
      rating: r.rating ?? 5,
      is_visible: r.is_visible,
      is_featured: r.is_featured,
      moderation_status: r.moderation_status,
    });
    setSubmitStatus("idle");
    setSheetOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    setSubmitStatus("idle");
    try {
      const res = await fetch(`/api/admin/reviews/${editing.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          body: form.body,
          headline: form.headline.trim() || null,
          rating: form.rating,
          is_visible: form.is_visible,
          is_featured: form.is_featured,
          moderation_status: form.moderation_status,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setSubmitStatus("success");
        setSubmitMessage("Review updated.");
        setTimeout(() => {
          setSheetOpen(false);
          fetchReviews();
        }, 800);
      } else {
        setSubmitStatus("error");
        setSubmitMessage(data.error ?? "Update failed.");
      }
    } catch {
      setSubmitStatus("error");
      setSubmitMessage("Network error.");
    }
  };

  const handleDelete = async (r: ReviewRow) => {
    if (!confirm("Delete this review? It will be hidden from the listing.")) return;
    try {
      const res = await fetch(`/api/admin/reviews/${r.id}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok) {
        fetchReviews();
        setSheetOpen(false);
      } else {
        alert(data.error ?? "Delete failed.");
      }
    } catch {
      alert("Network error.");
    }
  };

  const formatDate = (s: string) => {
    try {
      return new Date(s).toLocaleDateString(undefined, { dateStyle: "short", timeStyle: "short" });
    } catch {
      return s;
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="text-xl">Reviews ({total})</CardTitle>
            <div className="flex items-center gap-2">
              <Select value={propertyFilter || "all"} onValueChange={(v) => setPropertyFilter(v === "all" ? "" : v)}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="All properties" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All properties</SelectItem>
                  {[...new Set(reviews.map((r) => r.property_id))].map((pid) => {
                    const r = reviews.find((x) => x.property_id === pid);
                    return (
                      <SelectItem key={pid} value={String(pid)}>
                        {r?.property_title ?? `Property #${pid}`}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading && (
            <p className="py-8 text-center text-slate-500 dark:text-slate-400">Loading reviews…</p>
          )}
          {error && (
            <Alert variant="destructive" className="mb-4">
              <ExclamationCircleIcon className="h-5 w-5" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
              <Button variant="outline" size="sm" onClick={fetchReviews} className="mt-2">
                Retry
              </Button>
            </Alert>
          )}
          {!loading && !error && reviews.length === 0 && (
            <p className="py-8 text-center text-slate-500 dark:text-slate-400">No reviews found.</p>
          )}
          {!loading && !error && reviews.length > 0 && (
            <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 dark:bg-slate-900">
                  <tr>
                    <th className="px-4 py-3 font-semibold text-slate-900 dark:text-slate-50">Property</th>
                    <th className="px-4 py-3 font-semibold text-slate-900 dark:text-slate-50">Rating</th>
                    <th className="px-4 py-3 font-semibold text-slate-900 dark:text-slate-50">Preview</th>
                    <th className="px-4 py-3 font-semibold text-slate-900 dark:text-slate-50">Status</th>
                    <th className="px-4 py-3 font-semibold text-slate-900 dark:text-slate-50">Date</th>
                    <th className="px-4 py-3 text-right font-semibold text-slate-900 dark:text-slate-50">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reviews.map((r) => (
                    <tr
                      key={r.id}
                      className="border-t border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900/50"
                    >
                      <td className="px-4 py-3">
                        {r.property_slug ? (
                          <Link
                            href={`/listings/${r.property_slug}`}
                            className="font-medium text-primary hover:underline"
                          >
                            {r.property_title ?? `#${r.property_id}`}
                          </Link>
                        ) : (
                          <span className="text-slate-600 dark:text-slate-400">{r.property_title ?? `#${r.property_id}`}</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-0.5 font-medium text-amber-600 dark:text-amber-400">
                          <StarIcon className="h-4 w-4 fill-current" />
                          {r.rating ?? "—"}
                        </span>
                      </td>
                      <td className="max-w-[200px] truncate px-4 py-3 text-slate-600 dark:text-slate-400" title={r.body}>
                        {r.headline || r.body}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1">
                          <span
                            className={
                              r.is_visible
                                ? "rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-300"
                                : "rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                            }
                          >
                            {r.is_visible ? "Visible" : "Hidden"}
                          </span>
                          {r.is_featured && (
                            <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                              Featured
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{formatDate(r.created_at)}</td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" onClick={() => openEdit(r)} aria-label="Edit">
                            <PencilIcon className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700 dark:text-red-400"
                            onClick={() => handleDelete(r)}
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
        <SheetContent className="overflow-y-auto sm:max-w-lg">
          <SheetHeader className="border-b border-slate-200 dark:border-slate-800 pb-4">
            <SheetTitle>Edit review</SheetTitle>
            <SheetDescription>Update visibility, featured flag, and content.</SheetDescription>
          </SheetHeader>
          {editing && (
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
                <label className="text-sm font-medium">Rating (1–5)</label>
                <Select
                  value={String(form.rating)}
                  onValueChange={(v) => setForm((f) => ({ ...f, rating: parseInt(v, 10) }))}
                >
                  <SelectTrigger className="w-[100px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <SelectItem key={n} value={String(n)}>
                        {n} star{n > 1 ? "s" : ""}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Headline</label>
                <input
                  className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
                  value={form.headline}
                  onChange={(e) => setForm((f) => ({ ...f, headline: e.target.value }))}
                  placeholder="Optional headline"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Body</label>
                <textarea
                  className="w-full min-h-[100px] rounded-md border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
                  value={form.body}
                  onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
                />
              </div>
              <div className="flex flex-wrap gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={form.is_visible}
                    onChange={(e) => setForm((f) => ({ ...f, is_visible: e.target.checked }))}
                    className="rounded border-slate-300 text-primary focus:ring-primary"
                  />
                  <span className="text-sm">Visible</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={form.is_featured}
                    onChange={(e) => setForm((f) => ({ ...f, is_featured: e.target.checked }))}
                    className="rounded border-slate-300 text-primary focus:ring-primary"
                  />
                  <span className="text-sm">Featured</span>
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Status</span>
                  <Select
                    value={form.moderation_status}
                    onValueChange={(v) => setForm((f) => ({ ...f, moderation_status: v }))}
                  >
                    <SelectTrigger className="w-[140px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="pt-4 flex flex-wrap gap-2">
                <Button type="submit" size="lg" className="min-h-11">
                  Update
                </Button>
                <Button type="button" variant="outline" size="lg" onClick={() => setSheetOpen(false)}>
                  Cancel
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="text-red-600 hover:text-red-700 dark:text-red-400"
                  onClick={() => handleDelete(editing)}
                >
                  Delete
                </Button>
              </div>
            </form>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
