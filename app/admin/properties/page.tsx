import type { Metadata } from "next";
import { PropertiesAdminList } from "@/components/admin/PropertiesAdminList";

export const metadata: Metadata = {
  title: "Manage Properties | Admin | Nyumba Zetu",
  description: "Manage property listings",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPropertiesPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">
            Manage Properties
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Create, edit, and manage property listings
          </p>
        </div>

        <PropertiesAdminList />
      </div>
    </div>
  );
}


