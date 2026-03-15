"use client";

/**
 * Listing comments section: displays Q&A or discussion comments and optional comment form.
 * Used on the listing detail page. Data comes from tb_listing_comments where comment_type = 'comment'.
 */

import { MessageCircle, Send } from "lucide-react";
import Link from "next/link";
import type { ListingCommentDisplay } from "@/lib/listings/types";

export type ListingComment = ListingCommentDisplay;

export interface ListingCommentsProps {
  /** Property or listing title (for accessibility). */
  listingTitle: string;
  /** List of comments (from tb_listing_comments or sample data). */
  comments: ListingCommentDisplay[];
  /** Whether the current user can post (e.g. signed in). When false, show "Sign in to comment". */
  canComment?: boolean;
  /** Optional callback when user submits a comment (when canComment is true). */
  onSubmitComment?: (body: string) => void;
  className?: string;
}

/**
 * Renders the comments block: heading, list of comments, and either a comment form
 * or a prompt to sign in. Uses client-side state for the form when canComment is true.
 */
export function ListingComments({
  listingTitle,
  comments,
  canComment = false,
  onSubmitComment,
  className,
}: ListingCommentsProps) {
  return (
    <section className={className} aria-labelledby="comments-heading">
      <h2
        id="comments-heading"
        className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-2"
      >
        <MessageCircle className="h-4 w-4" aria-hidden />
        Comments & questions
      </h2>

      {/* Comment list */}
      {comments.length > 0 ? (
        <ul
          className="space-y-4 mb-6"
          aria-label={`Comments for ${listingTitle}`}
        >
          {comments.map((comment, idx) => (
            <li
              key={`${comment.author}-${comment.date}-${idx}`}
              className="rounded-lg border border-slate-200/80 bg-slate-50/50 px-4 py-3 dark:border-slate-700/80 dark:bg-slate-800/30"
            >
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="font-medium text-slate-900 dark:text-slate-50">
                  {comment.author}
                </span>
                {comment.label && (
                  <span className="rounded bg-slate-200/80 px-1.5 py-0.5 text-xs text-slate-600 dark:bg-slate-600 dark:text-slate-300">
                    {comment.label}
                  </span>
                )}
                <time
                  dateTime={comment.date}
                  className="text-xs text-slate-500 dark:text-slate-400"
                >
                  {new Date(comment.date).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </time>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {comment.body}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
          No comments yet. Be the first to ask a question about this listing.
        </p>
      )}

      {/* Comment CTA: sign in or placeholder form */}
      {canComment && onSubmitComment ? (
        <CommentForm onSubmit={onSubmitComment} />
      ) : (
        <div className="rounded-lg border border-slate-200/80 bg-slate-50 px-4 py-3 dark:border-slate-700/80 dark:bg-slate-800/30">
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
            Sign in to leave a comment or ask a question.
          </p>
          <Link
            href="/admin/login"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            <Send className="h-4 w-4" aria-hidden />
            Sign in to comment
          </Link>
        </div>
      )}
    </section>
  );
}

/**
 * Simple comment form: textarea + submit. Calls onSubmit with trimmed body.
 * Used when the user is allowed to comment.
 */
function CommentForm({ onSubmit }: { onSubmit: (body: string) => void }) {
  return (
    <form
      className="space-y-2"
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const textarea = form.querySelector("textarea");
        const body = textarea?.value?.trim();
        if (body) {
          onSubmit(body);
          if (textarea) textarea.value = "";
        }
      }}
    >
      <label htmlFor="listing-comment-body" className="sr-only">
        Your comment or question
      </label>
      <textarea
        id="listing-comment-body"
        name="body"
        rows={3}
        placeholder="Ask a question or leave a comment..."
        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-400"
      />
      <button
        type="submit"
        className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
      >
        <Send className="h-4 w-4" aria-hidden />
        Post comment
      </button>
    </form>
  );
}
