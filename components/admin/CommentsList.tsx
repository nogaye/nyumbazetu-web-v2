"use client";

/**
 * Admin list and moderation for listing comments (Q&A).
 * Follows UX rules: filter left, primary actions clear, loading/error/success feedback.
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
import { PencilIcon, TrashIcon, ExclamationCircleIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";

/** Comment row from API. */
export interface CommentRow {
  id: number;
  property_id: number;
  property_title: string | null;
  property_slug: string | null;
  body: string;
  title: string | null;
  is_visible: boolean;
  moderation_status: string;
  reply_count: number;
  like_count: number;
  created_at: string;
}

export function CommentsList() {
  const [comments, setComments] = useState<CommentRow[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [propertyFilter, setPropertyFilter] = useState<string>("");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editing, setEditing] = useState<CommentRow | null>(null);
  const [form, setForm] = useState({ body: "", title: "", is_visible: true, moderation_status: "published" });
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  const fetchComments = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (propertyFilter) params.set("property_id", propertyFilter);
      const res = await fetch(`/api/admin/comments?${params.toString()}`);
      const data = await res.json();
      if (res.ok) {
        setComments(data.comments ?? []);
        setTotal(data.total ?? 0);
      } else {
        setError(data.error ?? "Failed to load comments");
      }
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [propertyFilter]);

  const openEdit = (c: CommentRow) => {
    setEditing(c);
    setForm({
      body: c.body,
      title: c.title ?? "",
      is_visible: c.is_visible,
      moderation_status: c.moderation_status,
    });
    setSubmitStatus("idle");
    setSheetOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    setSubmitStatus("idle");
    try {
      const res = await fetch(`/api/admin/comments/${editing.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          body: form.body,
          title: form.title.trim() || null,
          is_visible: form.is_visible,
          moderation_status: form.moderation_status,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setSubmitStatus("success");
        setSubmitMessage("Comment updated.");
        setTimeout(() => {
          setSheetOpen(false);
          fetchComments();
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

  const handleDelete = async (c: CommentRow) => {
    if (!confirm("Delete this comment? It will be hidden from the listing.")) return;
    try {
      const res = await fetch(`/api/admin/comments/${c.id}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok) {
        fetchComments();
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
      return new Date(s).toLocaleDateString(undefined, {
        dateStyle: "short",
        timeStyle: "short",
      });
    } catch {
      return s;
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="text-xl">Comments ({total})</CardTitle>
            <div className="flex items-center gap-2">
              <Select value={propertyFilter || "all"} onValueChange={(v) => setPropertyFilter(v === "all" ? "" : v)}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="All properties" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All properties</SelectItem>
                  {[...new Set(comments.map((c) => c.property_id))].map((pid) => {
                    const c = comments.find((x) => x.property_id === pid);
                    return (
                      <SelectItem key={pid} value={String(pid)}>
                        {c?.property_title ?? `Property #${pid}`}
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
            <p className="py-8 text-center text-slate-500 dark:text-slate-400">Loading comments…</p>
          )}
          {error && (
            <Alert variant="destructive" className="mb-4">
              <ExclamationCircleIcon className="h-5 w-5" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
              <Button variant="outline" size="sm" onClick={fetchComments} className="mt-2">
                Retry
              </Button>
            </Alert>
          )}
          {!loading && !error && comments.length === 0 && (
            <p className="py-8 text-center text-slate-500 dark:text-slate-400">No comments found.</p>
          )}
          {!loading && !error && comments.length > 0 && (
            <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 dark:bg-slate-900">
                  <tr>
                    <th className="px-4 py-3 font-semibold text-slate-900 dark:text-slate-50">Property</th>
                    <th className="px-4 py-3 font-semibold text-slate-900 dark:text-slate-50">Preview</th>
                    <th className="px-4 py-3 font-semibold text-slate-900 dark:text-slate-50">Status</th>
                    <th className="px-4 py-3 font-semibold text-slate-900 dark:text-slate-50">Date</th>
                    <th className="px-4 py-3 text-right font-semibold text-slate-900 dark:text-slate-50">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {comments.map((c) => (
                    <tr
                      key={c.id}
                      className="border-t border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900/50"
                    >
                      <td className="px-4 py-3">
                        {c.property_slug ? (
                          <Link
                            href={`/listings/${c.property_slug}`}
                            className="font-medium text-primary hover:underline"
                          >
                            {c.property_title ?? `#${c.property_id}`}
                          </Link>
                        ) : (
                          <span className="text-slate-600 dark:text-slate-400">{c.property_title ?? `#${c.property_id}`}</span>
                        )}
                      </td>
                      <td className="max-w-[240px] truncate px-4 py-3 text-slate-600 dark:text-slate-400" title={c.body}>
                        {c.body}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={
                            c.is_visible
                              ? "rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-300"
                              : "rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                          }
                        >
                          {c.is_visible ? "Visible" : "Hidden"}
                        </span>
                        <span className="ml-1 text-xs text-slate-500">{c.moderation_status}</span>
                      </td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{formatDate(c.created_at)}</td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" onClick={() => openEdit(c)} aria-label="Edit">
                            <PencilIcon className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700 dark:text-red-400"
                            onClick={() => handleDelete(c)}
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
            <SheetTitle>Edit comment</SheetTitle>
            <SheetDescription>Update visibility and moderation status.</SheetDescription>
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
                <label className="text-sm font-medium">Body</label>
                <textarea
                  className="w-full min-h-[100px] rounded-md border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
                  value={form.body}
                  onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Title (optional)</label>
                <input
                  className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
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
                  <span className="text-sm">Visible on listing</span>
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
              <div className="pt-4 flex gap-2">
                <Button type="submit" size="lg" className="flex-1 min-h-11">
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
