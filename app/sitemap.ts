import { MetadataRoute } from "next";
import { getAllFeatureSlugs } from "@/lib/features";
import { getAllListingSlugs } from "@/lib/listings/supabase-helpers";
import { getAllBlogSlugs } from "@/lib/blogs/content";
import { getAllMigratedBlogParams } from "@/lib/blogs/migrated-content";
import { getAllResourceSlugs } from "@/lib/resources/content";
import { APARTMENTS_RENT_HUB_SLUGS } from "@/lib/listings/apartments-rent-seo-hubs";
import {
  getAllVendorSlugs,
  SERVICE_CATEGORY_SLUGS,
} from "@/lib/services/vendors-mock";

/**
 * Generates the sitemap for www.nyumbazetu.com: static marketing/solution pages,
 * SEO pillar pages, feature pages, blog posts, partnership pages, and dynamic
 * apartment-rent SEO hubs, listing detail URLs (when Supabase is available).
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.nyumbazetu.com";

  /** Feature detail page routes from central registry. */
  const featureRoutes = getAllFeatureSlugs().map((slug) => `/features/${slug}`);

  /** SEO pillar pages (high priority for organic search). */
  const pillarRoutes = [
    "/property-management-software-kenya",
    "/rent-collection-software-kenya",
    "/hoa-management-software-kenya",
    "/estate-management-system",
    "/property-management-for-developers",
    "/mpesa-rent-collection",
  ];

  /** Blog post URLs: legacy /blogs/{id}/{slug} plus single-slug guides. */
  const blogSlugs = getAllBlogSlugs();
  const migratedBlogParams = getAllMigratedBlogParams();
  const blogEntries: MetadataRoute.Sitemap = [
    ...migratedBlogParams.map(({ id, slug }) => ({
      url: `${baseUrl}/blogs/${id}/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...blogSlugs.map((slug) => ({
      url: `${baseUrl}/blogs/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];

  /** Resource article URLs (guides, case studies, blog, webinars). */
  const resourceSlugs = getAllResourceSlugs();
  const resourceEntries: MetadataRoute.Sitemap = resourceSlugs.map((slug) => ({
    url: `${baseUrl}/resources/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  /** Location-intent apartment rent hubs (Zillow/Property24-style URLs). */
  const apartmentRentHubEntries: MetadataRoute.Sitemap =
    APARTMENTS_RENT_HUB_SLUGS.map((hub) => ({
      url: `${baseUrl}/apartments-for-rent-${hub}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.85,
    }));

  /** Vendor marketplace marketing routes (mock vendor profiles and category hubs). */
  const vendorMarketplaceEntries: MetadataRoute.Sitemap = [
    "/services",
    "/services/request",
    "/services/property-managers",
    "/services/vendors",
    "/services/for-vendors",
    "/services/for-managers",
    "/services/how-it-works",
    ...getAllVendorSlugs().map((slug) => ({
      url: `${baseUrl}/services/vendors/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
    ...SERVICE_CATEGORY_SLUGS.map((cat) => ({
      url: `${baseUrl}/services/categories/${cat}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.72,
    })),
  ].map((entry) =>
    typeof entry === "string"
      ? {
          url: `${baseUrl}${entry}`,
          lastModified: new Date(),
          changeFrequency: "monthly" as const,
          priority: 0.78,
        }
      : entry,
  );

  /** Public listing detail URLs for SEO; empty if DB unavailable. */
  const listingSlugs = await getAllListingSlugs();
  const listingEntries: MetadataRoute.Sitemap = listingSlugs.map(
    ({ slug, updated_at }) => ({
      url: `${baseUrl}/listings/${slug}`,
      lastModified: new Date(updated_at),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }),
  );

  const routes = [
    "",
    "/product",
    "/pricing",
    "/resources",
    "/about",
    "/contact",
    "/compare",
    "/blogs",
    "/faqs",
    "/careers",
    "/press",
    "/events",
    "/newsletters",
    "/privacy",
    "/terms",
    "/error",
    "/listings",
    "/solutions",
    "/solutions/landlords",
    "/solutions/managers",
    "/solutions/committees",
    "/solutions/developers",
    "/solutions/banks",
    "/solutions/diaspora",
    "/features",
    ...pillarRoutes,
    ...featureRoutes,
    "/partnerships",
    "/partnerships/ncba",
    "/partnerships/boma-yangu",
    "/partnerships/hfc",
    "/partnerships/aiesec",
    "/clients",
  ];

  const staticEntries: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  return [
    ...staticEntries,
    ...vendorMarketplaceEntries,
    ...apartmentRentHubEntries,
    ...blogEntries,
    ...resourceEntries,
    ...listingEntries,
  ];
}
