-- Migration: Drop beds column from tb_listing_properties
-- Description: Removes the beds column; bedroom count is sufficient for listing display.
-- Run after 008.

ALTER TABLE public.tb_listing_properties DROP COLUMN IF EXISTS beds;
