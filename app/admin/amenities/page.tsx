import type { Metadata } from "next";
import { AmenitiesList } from "@/components/admin/AmenitiesList";

export const metadata: Metadata = {
  title: "Amenities | Admin | Nyumba Zetu",
  description: "Manage amenity definitions for property listings",
  robots: { index: false, follow: false },
};

export default function AdminAmenitiesPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">
            Amenities
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Create and edit amenity types (e.g. WiFi, Parking) to assign to properties.
          </p>
        </div>
        <AmenitiesList />
      </div>
    </div>
  );
}
