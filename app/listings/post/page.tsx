/**
 * Post a listing: redirects to the portal new-listing flow.
 * Keeps /listings/post URLs valid (e.g. header, footer) without a separate placeholder page.
 */

import { redirect } from "next/navigation";

export default function ListingsPostPage() {
  redirect("/listings/portal/new");
}
