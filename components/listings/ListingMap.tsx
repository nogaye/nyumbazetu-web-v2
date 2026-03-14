/**
 * Listing map section: embeds an OpenStreetMap view centered on the listing location.
 * Uses area and city to build a search query (no API key required). For precise pins,
 * add latitude/longitude to the property schema and use them here.
 */

export interface ListingMapProps {
  /** Area or neighbourhood (e.g. Kilimani). */
  area: string;
  /** City (e.g. Nairobi). */
  city: string;
  /** Optional full address line for the embed query. */
  address?: string;
  /** Optional listing title for iframe title attribute. */
  listingTitle?: string;
  /** Height of the map container in pixels. */
  height?: number;
  className?: string;
}

/**
 * Builds an OpenStreetMap search URL for the location (area, city or full address).
 * Used for the "View larger map" link; embed uses a fixed bbox since OSM embed has no search param.
 */
function buildMapSearchUrl(area: string, city: string, address?: string): string {
  const query = address?.trim() || `${area}, ${city}`;
  return `https://www.openstreetmap.org/search?query=${encodeURIComponent(query)}`;
}

/** Default Nairobi-area bbox for embed when no coordinates are stored (lon,lat,lon,lat). */
const DEFAULT_NAIROBI_BBOX = "36.75,-1.35,37.05,-1.25";

/**
 * Renders an iframe embedding OpenStreetMap showing the listing area.
 * Uses a default Nairobi bbox; when property has lat/lng, pass them for a precise pin.
 */
export function ListingMap({
  area,
  city,
  address,
  listingTitle,
  height = 280,
  className,
}: ListingMapProps) {
  const searchUrl = buildMapSearchUrl(area, city, address);
  const embedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(DEFAULT_NAIROBI_BBOX)}&layer=mapnik`;

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
