-- Migration: Rename listing tables to tb_listing_* convention
-- Created: 2025
-- Description: Renames properties → tb_listing_properties, property_images → tb_listing_images,
--              property_inquiries → tb_listing_inquiries (correct spelling). Run after 001 and 003.

-- Rename tables (FKs and triggers follow the table; indexes keep names but remain on renamed tables)
ALTER TABLE properties RENAME TO tb_listing_properties;
ALTER TABLE property_images RENAME TO tb_listing_images;
ALTER TABLE property_inquiries RENAME TO tb_listing_inquiries;
