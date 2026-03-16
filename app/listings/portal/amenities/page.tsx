/**
 * Portal amenities page: manage amenity definitions (e.g. WiFi, Parking) for property listings.
 * Merged from admin; uses shared AmenitiesList component.
 */

import type { Metadata } from "next";
import { AmenitiesList } from "@/components/admin/AmenitiesList";

export const metadata: Metadata = {
  title: "Amenities | Nyumba Zetu Listings",
  description: "Create and edit amenity types to assign to properties.",
  robots: { index: false, follow: false },
};

export default function PortalAmenitiesPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-semibold text-slate-900 dark:text-slate-50">
          Amenities
        </h1>
        <p className="mt-1 text-slate-600 dark:text-slate-400">
          Create and edit amenity types (e.g. WiFi, Parking) to assign to properties.
        </p>
      </div>
      <AmenitiesList />
    </div>
  );
}
