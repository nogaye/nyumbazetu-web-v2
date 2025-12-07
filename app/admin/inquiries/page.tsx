import { InquiriesList } from "@/components/admin/InquiriesList";

export default function AdminInquiriesPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-slate-900 dark:text-slate-50">
        Property Inquiries
      </h1>
      <p className="mb-8 text-slate-600 dark:text-slate-400">
        Manage all incoming property inquiries from your website.
      </p>
      <InquiriesList limit={20} />
    </div>
  );
}


