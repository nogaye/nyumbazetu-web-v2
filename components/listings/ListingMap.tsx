/**
 * Listing map section: embeds an OpenStreetMap view centered on the listing location.
 * Uses area and city for display; when latitude/longitude are provided, the embed is
 * centered on that point. Map data is sourced from the property (database).
 */

export interface ListingMapProps {
  /** Area or neighbourhood (e.g. Kilimani). */
  area: string;
  /** City (e.g. Nairobi). */
  city: string;
  /** Optional full address line for the embed query and "View larger map" link. */
  address?: string | null;
  /** Optional latitude (decimal degrees) to center the map. */
  latitude?: number | null;
  /** Optional longitude (decimal degrees) to center the map. */
  longitude?: number | null;
  /** Optional listing title for iframe title attribute. */
  listingTitle?: string;
  /** Height of the map container in pixels. */
  height?: number;
  className?: string;
}

/**
 * Builds an OpenStreetMap search URL for the location (area, city or full address).
 * Used for the "View larger map" link.
 */
function buildMapSearchUrl(area: string, city: string, address?: string | null): string {
  const query = address?.trim() || `${area}, ${city}`;
  return `https://www.openstreetmap.org/search?query=${encodeURIComponent(query)}`;
}

/** Default Nairobi-area bbox for embed when no coordinates are stored (minLon,minLat,maxLon,maxLat). */
const DEFAULT_NAIROBI_BBOX = "36.75,-1.35,37.05,-1.25";

/** Delta used to build a small bbox around a lat/lng point (degrees). */
const BBOX_DELTA = 0.008;

/**
 * Builds OSM embed bbox string from a center point.
 * @param lat - Latitude in decimal degrees.
 * @param lon - Longitude in decimal degrees.
 * @returns bbox string minLon,minLat,maxLon,maxLat.
 */
function bboxFromCenter(lat: number, lon: number): string {
  const minLon = lon - BBOX_DELTA;
  const minLat = lat - BBOX_DELTA;
  const maxLon = lon + BBOX_DELTA;
  const maxLat = lat + BBOX_DELTA;
  return `${minLon},${minLat},${maxLon},${maxLat}`;
}

/**
 * Renders an iframe embedding OpenStreetMap showing the listing location.
 * Uses latitude/longitude from the database when present; otherwise falls back to default Nairobi bbox.
 */
export function ListingMap({
  area,
  city,
  address,
  latitude,
  longitude,
  listingTitle,
  height = 280,
  className,
}: ListingMapProps) {
  const searchUrl = buildMapSearchUrl(area, city, address);
  const hasCoords =
    typeof latitude === "number" &&
    typeof longitude === "number" &&
    !Number.isNaN(latitude) &&
    !Number.isNaN(longitude);
  const embedBbox = hasCoords ? bboxFromCenter(latitude, longitude) : DEFAULT_NAIROBI_BBOX;
  const embedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(embedBbox)}&layer=mapnik`;

  return (
    <section
      className={className}
      aria-labelledby="map-heading"
    >
      <h2
        id="map-heading"
        className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-3"
      >
        Location
      </h2>
      <div className="rounded-xl overflow-hidden border border-slate-200/80 bg-slate-100 dark:border-slate-700/80 dark:bg-slate-800/50">
        <iframe
          title={listingTitle ? `Map: ${listingTitle}` : "Map of listing location"}
          src={embedUrl}
          width="100%"
          height={height}
          className="block border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <p className="px-3 py-2 text-xs text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800/80 border-t border-slate-200/80 dark:border-slate-700/80">
          {area}, {city}
        </p>
      </div>
      <p className="mt-2">
        <a
          href={searchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-primary hover:underline"
        >
          View larger map on OpenStreetMap
        </a>
      </p>
    </section>
  );
}
