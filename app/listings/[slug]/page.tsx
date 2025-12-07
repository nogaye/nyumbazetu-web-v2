import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Bed, Bath, Square, CheckCircle2, Heart } from "lucide-react";
import { fetchPropertyBySlug, fetchPropertyImages } from "@/lib/listings/supabase-helpers";
import { PropertyImageGallery } from "@/components/listings/PropertyImageGallery";
import { Property } from "@/lib/listings/types";

// Fetch listing by slug (uses Supabase if configured, otherwise mock data)
async function getListing(slug: string): Promise<Property | null> {
  return fetchPropertyBySlug(slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const listing = await getListing(slug);

  if (!listing) {
    return {
      title: "Listing Not Found | Nyumba Zetu",
    };
  }

  return {
    title: `${listing.title} | Nyumba Zetu`,
    description: listing.description,
    openGraph: {
      title: `${listing.title} | Nyumba Zetu`,
      description: listing.description,
      type: "website",
    },
  };
}

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const listing = await getListing(slug);

  if (!listing) {
    notFound();
  }

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatBedrooms = (bedrooms: number): string => {
    if (bedrooms === 0) return "Studio";
    if (bedrooms === 1) return "1 Bedroom";
    return `${bedrooms} Bedrooms`;
  };

  const propertyTypeLabels: Record<string, string> = {
    apartment: "Apartment",
    maisonette: "Maisonette",
    bedsitter: "Bedsitter",
    house: "House",
    studio: "Studio",
    office: "Office",
    shop: "Shop",
  };

  const propertyImages = await fetchPropertyImages(listing.id);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link href="/listings">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Listings
          </Button>
        </Link>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="mb-6">
              <PropertyImageGallery
                images={propertyImages}
                propertyTitle={listing.title}
              />
            </div>

            {/* Badges */}
            <div className="mb-6 flex flex-wrap gap-2">
              {listing.is_verified && (
                <div className="rounded-full bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary">
                  <CheckCircle2 className="mr-1.5 inline h-4 w-4" />
                  Verified Property
                </div>
              )}
              {listing.is_tps_available && (
                <div className="rounded-full bg-primary px-3 py-1.5 text-sm font-medium text-white">
                  TPS Available
                </div>
              )}
            </div>

            {/* Title and Price */}
            <div className="mb-6">
              <h1 className="mb-2 text-3xl font-bold text-slate-900 dark:text-slate-50">
                {listing.title}
              </h1>
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <MapPin className="h-4 w-4" />
                <span>
                  {listing.area}, {listing.city}
                </span>
              </div>
            </div>

            {/* Property Details */}
            <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
              <h2 className="mb-4 text-xl font-semibold text-slate-900 dark:text-slate-50">
                Property Details
              </h2>
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
                <div>
                  <div className="mb-1 flex items-center gap-2 text-slate-600 dark:text-slate-400">
                    <Bed className="h-5 w-5" />
                    <span className="text-sm font-medium">Bedrooms</span>
                  </div>
                  <p className="text-lg font-semibold text-slate-900 dark:text-slate-50">
                    {formatBedrooms(listing.bedrooms)}
                  </p>
                </div>
                <div>
                  <div className="mb-1 flex items-center gap-2 text-slate-600 dark:text-slate-400">
                    <Bath className="h-5 w-5" />
                    <span className="text-sm font-medium">Bathrooms</span>
                  </div>
                  <p className="text-lg font-semibold text-slate-900 dark:text-slate-50">
                    {listing.bathrooms} {listing.bathrooms === 1 ? "Bathroom" : "Bathrooms"}
                  </p>
                </div>
                {listing.size_sqm && (
                  <div>
                    <div className="mb-1 flex items-center gap-2 text-slate-600 dark:text-slate-400">
                      <Square className="h-5 w-5" />
                      <span className="text-sm font-medium">Size</span>
                    </div>
                    <p className="text-lg font-semibold text-slate-900 dark:text-slate-50">
                      {listing.size_sqm} m²
                    </p>
                  </div>
                )}
                <div>
                  <div className="mb-1 flex items-center gap-2 text-slate-600 dark:text-slate-400">
                    <span className="text-sm font-medium">Type</span>
                  </div>
                  <p className="text-lg font-semibold text-slate-900 dark:text-slate-50">
                    {propertyTypeLabels[listing.property_type] || listing.property_type}
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
              <h2 className="mb-4 text-xl font-semibold text-slate-900 dark:text-slate-50">
                Description
              </h2>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                {listing.description}
              </p>
            </div>

            {/* Additional Info */}
            {listing.is_tps_available && (
              <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 dark:border-primary/30 dark:bg-primary/10">
                <h3 className="mb-2 text-lg font-semibold text-primary">
                  Tenant Purchase Scheme (TPS) Available
                </h3>
                <p className="text-slate-700 dark:text-slate-300">
                  This property is available through our Rent-to-Own program. Contact us to learn
                  more about how you can own this property while renting.
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              {/* Price */}
              <div className="mb-6">
                <div className="mb-2 text-sm text-slate-600 dark:text-slate-400">
                  Monthly Rent
                </div>
                <div className="text-3xl font-bold text-primary">
                  {formatPrice(listing.monthly_rent)}
                  <span className="ml-2 text-lg font-normal text-slate-600 dark:text-slate-400">
                    /month
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button className="w-full" size="lg">
                  Contact Owner
                </Button>
                <Button variant="outline" className="w-full" size="lg">
                  <Heart className="mr-2 h-4 w-4" />
                  Save Listing
                </Button>
              </div>

              {/* Quick Info */}
              <div className="mt-6 space-y-3 border-t border-slate-200 pt-6 dark:border-slate-800">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400">Property ID</span>
                  <span className="font-medium text-slate-900 dark:text-slate-50">
                    {listing.id}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400">Listed</span>
                  <span className="font-medium text-slate-900 dark:text-slate-50">
                    {new Date(listing.created_at).toLocaleDateString("en-KE", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                {listing.is_verified && (
                  <div className="flex items-center gap-2 text-sm text-primary">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Verified Property</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
