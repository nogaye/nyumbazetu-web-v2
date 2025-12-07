/**
 * Mock data generator for property listings
 * 
 * This will be replaced with real Supabase queries once the database is set up.
 */

import { Property, PropertyImage, ListingWithCoverImage, PropertyType } from "./types";

// Mock property data
const mockProperties: Property[] = [
  {
    id: "1",
    title: "2BR Apartment – Kilimani",
    slug: "2br-apartment-kilimani",
    description: "Spacious 2-bedroom apartment in the heart of Kilimani. Modern finishes, secure parking, and close to amenities.",
    city: "Nairobi",
    area: "Kilimani",
    monthly_rent: 45000,
    bedrooms: 2,
    bathrooms: 2,
    size_sqm: 85,
    property_type: "apartment",
    is_tps_available: true,
    is_verified: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    title: "3BR Maisonette – Kileleshwa",
    slug: "3br-maisonette-kileleshwa",
    description: "Beautiful 3-bedroom maisonette with private garden. Perfect for families.",
    city: "Nairobi",
    area: "Kileleshwa",
    monthly_rent: 85000,
    bedrooms: 3,
    bathrooms: 3,
    size_sqm: 120,
    property_type: "maisonette",
    is_tps_available: false,
    is_verified: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "3",
    title: "1BR Bedsitter – Westlands",
    slug: "1br-bedsitter-westlands",
    description: "Cozy bedsitter in Westlands, ideal for young professionals. Close to business district.",
    city: "Nairobi",
    area: "Westlands",
    monthly_rent: 25000,
    bedrooms: 1,
    bathrooms: 1,
    size_sqm: 35,
    property_type: "bedsitter",
    is_tps_available: false,
    is_verified: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "4",
    title: "2BR Apartment – Ruaka",
    slug: "2br-apartment-ruaka",
    description: "Modern 2-bedroom apartment in Ruaka. Gated community with amenities.",
    city: "Nairobi",
    area: "Ruaka",
    monthly_rent: 35000,
    bedrooms: 2,
    bathrooms: 2,
    size_sqm: 75,
    property_type: "apartment",
    is_tps_available: true,
    is_verified: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "5",
    title: "Studio Apartment – Mombasa",
    slug: "studio-apartment-mombasa",
    description: "Furnished studio apartment near the beach. Perfect for short-term stays.",
    city: "Mombasa",
    area: "Nyali",
    monthly_rent: 30000,
    bedrooms: 0,
    bathrooms: 1,
    size_sqm: 30,
    property_type: "studio",
    is_tps_available: false,
    is_verified: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "6",
    title: "4BR House – Kisumu",
    slug: "4br-house-kisumu",
    description: "Spacious 4-bedroom family home in a quiet neighborhood.",
    city: "Kisumu",
    area: "Milimani",
    monthly_rent: 60000,
    bedrooms: 4,
    bathrooms: 3,
    size_sqm: 180,
    property_type: "house",
    is_tps_available: true,
    is_verified: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "7",
    title: "Office Space – Westlands",
    slug: "office-space-westlands",
    description: "Modern office space suitable for small businesses. Prime location.",
    city: "Nairobi",
    area: "Westlands",
    monthly_rent: 55000,
    bedrooms: 0,
    bathrooms: 2,
    size_sqm: 100,
    property_type: "office",
    is_tps_available: false,
    is_verified: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "8",
    title: "1BR Apartment – Kilimani",
    slug: "1br-apartment-kilimani-2",
    description: "Cozy 1-bedroom apartment in Kilimani. Close to Yaya Center.",
    city: "Nairobi",
    area: "Kilimani",
    monthly_rent: 38000,
    bedrooms: 1,
    bathrooms: 1,
    size_sqm: 50,
    property_type: "apartment",
    is_tps_available: false,
    is_verified: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "9",
    title: "2BR Apartment – Lavington",
    slug: "2br-apartment-lavington",
    description: "Elegant 2-bedroom apartment in Lavington. Secure and well-maintained.",
    city: "Nairobi",
    area: "Lavington",
    monthly_rent: 52000,
    bedrooms: 2,
    bathrooms: 2,
    size_sqm: 90,
    property_type: "apartment",
    is_tps_available: true,
    is_verified: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "10",
    title: "Shop Space – Mombasa",
    slug: "shop-space-mombasa",
    description: "Prime retail space in busy Mombasa area. High foot traffic.",
    city: "Mombasa",
    area: "Mombasa CBD",
    monthly_rent: 40000,
    bedrooms: 0,
    bathrooms: 1,
    size_sqm: 60,
    property_type: "shop",
    is_tps_available: false,
    is_verified: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

// Generate more mock properties for testing
function generateMockProperties(count: number): Property[] {
  const cities = ["Nairobi", "Mombasa", "Kisumu", "Nakuru"];
  const areas = {
    Nairobi: ["Kilimani", "Kileleshwa", "Westlands", "Lavington", "Ruaka", "Parklands"],
    Mombasa: ["Nyali", "Mombasa CBD", "Bamburi", "Likoni"],
    Kisumu: ["Milimani", "Kisumu CBD", "Nyalenda"],
    Nakuru: ["Nakuru CBD", "Milimani"],
  };
  const propertyTypes: PropertyType[] = ["apartment", "maisonette", "bedsitter", "house", "studio"];
  
  const properties: Property[] = [];
  
  for (let i = 0; i < count; i++) {
    const city = cities[Math.floor(Math.random() * cities.length)];
    const area = areas[city as keyof typeof areas][Math.floor(Math.random() * areas[city as keyof typeof areas].length)];
    const propertyType = propertyTypes[Math.floor(Math.random() * propertyTypes.length)];
    const bedrooms = propertyType === "studio" ? 0 : Math.floor(Math.random() * 4) + 1;
    const bathrooms = Math.max(1, bedrooms);
    const monthlyRent = (Math.floor(Math.random() * 100) + 20) * 1000; // 20k - 120k
    const sizeSqm = bedrooms * 30 + Math.floor(Math.random() * 40);
    
    properties.push({
      id: `mock-${i + 11}`,
      title: `${bedrooms === 0 ? "Studio" : `${bedrooms}BR`} ${propertyType.charAt(0).toUpperCase() + propertyType.slice(1)} – ${area}`,
      slug: `${bedrooms === 0 ? "studio" : `${bedrooms}br`}-${propertyType}-${area.toLowerCase().replace(/\s+/g, "-")}-${i}`,
      description: `Beautiful ${propertyType} in ${area}, ${city}.`,
      city,
      area,
      monthly_rent: monthlyRent,
      bedrooms,
      bathrooms,
      size_sqm: sizeSqm,
      property_type: propertyType,
      is_tps_available: Math.random() > 0.6,
      is_verified: Math.random() > 0.3,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
  }
  
  return properties;
}

// Combine initial mock data with generated data
const allMockProperties = [...mockProperties, ...generateMockProperties(50)];

/**
 * Get mock properties with filters applied
 */
export function getMockProperties(filters: {
  city?: string;
  area?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number | "3+";
  propertyType?: PropertyType;
  tps?: boolean;
}): Property[] {
  let filtered = [...allMockProperties];

  if (filters.city) {
    filtered = filtered.filter((p) =>
      p.city.toLowerCase().includes(filters.city!.toLowerCase())
    );
  }

  if (filters.area) {
    filtered = filtered.filter((p) =>
      p.area.toLowerCase().includes(filters.area!.toLowerCase())
    );
  }

  if (filters.minPrice !== undefined) {
    filtered = filtered.filter((p) => p.monthly_rent >= filters.minPrice!);
  }

  if (filters.maxPrice !== undefined) {
    filtered = filtered.filter((p) => p.monthly_rent <= filters.maxPrice!);
  }

  if (filters.bedrooms !== undefined) {
    if (filters.bedrooms === "3+") {
      filtered = filtered.filter((p) => p.bedrooms >= 3);
    } else {
      filtered = filtered.filter((p) => p.bedrooms === filters.bedrooms);
    }
  }

  if (filters.propertyType) {
    filtered = filtered.filter((p) => p.property_type === filters.propertyType);
  }

  if (filters.tps === true) {
    filtered = filtered.filter((p) => p.is_tps_available === true);
  }

  return filtered;
}

/**
 * Generate a placeholder image URL
 * Using Picsum Photos for placeholder images (reliable, no auth required)
 * TODO: Replace with actual Supabase Storage URLs once connected
 */
export function getPlaceholderImageUrl(propertyId: string, width = 800, height = 600): string {
  // Using Picsum Photos (Lorem Picsum) - reliable placeholder service
  // The seed ensures consistent images per property ID
  const seed = propertyId.split("-").pop() || propertyId;
  return `https://picsum.photos/seed/${seed}/${width}/${height}`;
}

/**
 * Generate a simple blur data URL placeholder
 * This is a minimal base64-encoded 1x1 pixel image
 * TODO: Implement proper blur generation from actual images
 */
export function getBlurDataURL(): string {
  // Minimal 1x1 transparent pixel as base64
  return "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNmMWY1ZjkiLz48L3N2Zz4=";
}

/**
 * Get a single property by slug
 * TODO: Replace with real Supabase query
 */
export function getPropertyBySlug(slug: string): Property | null {
  return allMockProperties.find((p) => p.slug === slug) || null;
}
