-- Migration: Allow public read access to listing amenities and property-amenity junction.
-- Description: Ensures anonymous (and authenticated) users can read tb_listing_amenities and
--              tb_listing_property_amenities so the listing detail page can show amenities.
--              If RLS is not enabled, these tables are already readable; this adds policies
--              when RLS is enabled (e.g. by Supabase defaults or other migrations).

-- tb_listing_amenities: allow public SELECT
ALTER TABLE public.tb_listing_amenities ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can read listing amenities" ON public.tb_listing_amenities;
CREATE POLICY "Public can read listing amenities"
  ON public.tb_listing_amenities
  FOR SELECT
  USING (true);

-- tb_listing_property_amenities: allow public SELECT (so app can load amenities per property)
ALTER TABLE public.tb_listing_property_amenities ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can read property amenities" ON public.tb_listing_property_amenities;
CREATE POLICY "Public can read property amenities"
  ON public.tb_listing_property_amenities
  FOR SELECT
  USING (true);
