import type { Metadata } from "next";
import { InquiriesList } from "@/components/admin/InquiriesList";

export const metadata: Metadata = {
  title: "Property Inquiries | Admin | Nyumba Zetu",
  description: "View and manage property inquiries",
  robots: {
    index: false, // Don't index admin pages
    follow: false,
  },
};

export default function AdminInquiriesPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">
            Property Inquiries
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Manage and respond to property inquiries from potential tenants
          </p>
        </div>

        <InquiriesList limit={50} />
      </div>
    </div>
  );
}

