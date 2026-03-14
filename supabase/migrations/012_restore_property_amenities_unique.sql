-- Migration: Restore unique constraint on tb_listing_property_amenities (property_id, amenity_id).
-- Description: Migration 008 dropped the property_id column and recreated it, which removed the
--              uq_tb_listing_property_amenities_pair constraint. This restores it so upserts and
--              application logic can rely on one row per property-amenity pair.

ALTER TABLE public.tb_listing_property_amenities
  DROP CONSTRAINT IF EXISTS uq_tb_listing_property_amenities_pair;

ALTER TABLE public.tb_listing_property_amenities
  ADD CONSTRAINT uq_tb_listing_property_amenities_pair UNIQUE (property_id, amenity_id);
