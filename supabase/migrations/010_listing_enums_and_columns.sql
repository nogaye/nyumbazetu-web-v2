-- Migration: Add listing enums (property_type, listing_purpose, listing_type) and update tb_listing_properties
-- Description: Creates PostgreSQL enum types, adds listing_purpose, converts property_type and listing_type
--              from VARCHAR/TEXT to enums with mappings for existing data. Adds indexes and defaults.
-- Depends on: 009 (tb_listing_properties exists).

-- =============================================================================
-- 1. Create ENUM types (with descriptions via COMMENT)
-- =============================================================================

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_listing_property_type') THEN
    CREATE TYPE enum_listing_property_type AS ENUM (
      'apartment',
      'house',
      'villa',
      'land',
      'office',
      'commercial'
    );
  END IF;
END $$;
COMMENT ON TYPE enum_listing_property_type IS 'Type of property: apartment, house, villa, land, office, commercial.';

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_listing_purpose') THEN
    CREATE TYPE enum_listing_purpose AS ENUM (
      'buy',
      'rent',
      'short_stay'
    );
  END IF;
END $$;
COMMENT ON TYPE enum_listing_purpose IS 'Listing purpose: buy, rent, or short_stay (e.g. nightly).';

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_listing_type') THEN
    CREATE TYPE enum_listing_type AS ENUM (
      'entire_place',
      'private_room',
      'shared_room'
    );
  END IF;
END $$;
COMMENT ON TYPE enum_listing_type IS 'Listing type: entire_place, private_room, or shared_room.';

-- =============================================================================
-- 2. Add listing_purpose column if missing (default 'rent')
-- =============================================================================

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'tb_listing_properties' AND column_name = 'listing_purpose') THEN
    ALTER TABLE public.tb_listing_properties
    ADD COLUMN listing_purpose enum_listing_purpose NOT NULL DEFAULT 'rent';
    COMMENT ON COLUMN public.tb_listing_properties.listing_purpose IS 'Whether the listing is for buy, rent, or short_stay; used for search and display (price vs check-in/out).';
  END IF;
END $$;

-- =============================================================================
-- 3. Convert property_type to enum (add new column, backfill, drop old, rename)
--    Avoids ALTER COLUMN TYPE ... USING which can trigger enum=text operator errors.
--    Legacy: apartment, maisonette, bedsitter, office, shop, house, studio
-- =============================================================================

DO $$
DECLARE
  col_type text;
BEGIN
  SELECT data_type INTO col_type
  FROM information_schema.columns
  WHERE table_schema = 'public' AND table_name = 'tb_listing_properties' AND column_name = 'property_type';

  IF col_type IS NULL THEN
    RETURN;
  END IF;
  IF col_type = 'USER-DEFINED' THEN
    SELECT udt_name INTO col_type FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'tb_listing_properties' AND column_name = 'property_type';
    IF col_type = 'enum_listing_property_type' THEN
      RETURN; -- already enum, skip
    END IF;
  END IF;

  -- Add new enum column
  ALTER TABLE public.tb_listing_properties ADD COLUMN IF NOT EXISTS property_type_new enum_listing_property_type;
  -- Backfill from old column (all comparisons and literals are text; cast only the result)
  UPDATE public.tb_listing_properties
  SET property_type_new = (
    CASE trim(lower(COALESCE(property_type::text, 'apartment')))
      WHEN 'maisonette' THEN 'house'::enum_listing_property_type
      WHEN 'bedsitter' THEN 'apartment'::enum_listing_property_type
      WHEN 'shop' THEN 'commercial'::enum_listing_property_type
      WHEN 'studio' THEN 'apartment'::enum_listing_property_type
      WHEN 'apartment' THEN 'apartment'::enum_listing_property_type
      WHEN 'house' THEN 'house'::enum_listing_property_type
      WHEN 'office' THEN 'office'::enum_listing_property_type
      WHEN 'villa' THEN 'villa'::enum_listing_property_type
      WHEN 'land' THEN 'land'::enum_listing_property_type
      WHEN 'commercial' THEN 'commercial'::enum_listing_property_type
      ELSE 'apartment'::enum_listing_property_type
    END
  )
  WHERE property_type_new IS NULL;

  -- Drop old column and rename new one (only if we have the new column and it was populated)
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'tb_listing_properties' AND column_name = 'property_type_new') THEN
    ALTER TABLE public.tb_listing_properties DROP COLUMN property_type;
    ALTER TABLE public.tb_listing_properties RENAME COLUMN property_type_new TO property_type;
    ALTER TABLE public.tb_listing_properties ALTER COLUMN property_type SET NOT NULL;
  END IF;
END $$;

COMMENT ON COLUMN public.tb_listing_properties.property_type IS 'Type of property (apartment, house, villa, land, office, commercial).';

-- =============================================================================
-- 4. Convert listing_type to enum (add new column, backfill, drop old, rename)
-- =============================================================================

DO $$
DECLARE
  col_type text;
  udt text;
BEGIN
  SELECT data_type, udt_name INTO col_type, udt FROM information_schema.columns
  WHERE table_schema = 'public' AND table_name = 'tb_listing_properties' AND column_name = 'listing_type';

  IF col_type IS NULL THEN
    ALTER TABLE public.tb_listing_properties ADD COLUMN listing_type enum_listing_type NOT NULL DEFAULT 'entire_place';
    RETURN;
  END IF;
  IF col_type = 'USER-DEFINED' AND udt = 'enum_listing_type' THEN
    RETURN; -- already enum
  END IF;

  -- Backfill NULL/empty first (old column is still text/varchar)
  UPDATE public.tb_listing_properties
  SET listing_type = 'entire_place'
  WHERE listing_type IS NULL OR trim(listing_type::text) = '';

  ALTER TABLE public.tb_listing_properties ADD COLUMN IF NOT EXISTS listing_type_new enum_listing_type;
  UPDATE public.tb_listing_properties
  SET listing_type_new = (
    CASE lower(trim(COALESCE(listing_type::text, 'entire_place')))
      WHEN 'private_room' THEN 'private_room'::enum_listing_type
      WHEN 'shared_room' THEN 'shared_room'::enum_listing_type
      ELSE 'entire_place'::enum_listing_type
    END
  )
  WHERE listing_type_new IS NULL;

  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'tb_listing_properties' AND column_name = 'listing_type_new') THEN
    ALTER TABLE public.tb_listing_properties DROP COLUMN listing_type;
    ALTER TABLE public.tb_listing_properties RENAME COLUMN listing_type_new TO listing_type;
    ALTER TABLE public.tb_listing_properties ALTER COLUMN listing_type SET NOT NULL;
    ALTER TABLE public.tb_listing_properties ALTER COLUMN listing_type SET DEFAULT 'entire_place';
  END IF;
END $$;

COMMENT ON COLUMN public.tb_listing_properties.listing_type IS 'Listing type: entire_place, private_room, or shared_room; default entire_place.';

-- =============================================================================
-- 5. Recommended indexes for search filters
-- =============================================================================

CREATE INDEX IF NOT EXISTS idx_tb_listing_properties_property_type
  ON public.tb_listing_properties(property_type);

CREATE INDEX IF NOT EXISTS idx_tb_listing_properties_listing_purpose
  ON public.tb_listing_properties(listing_purpose);

CREATE INDEX IF NOT EXISTS idx_tb_listing_properties_listing_type
  ON public.tb_listing_properties(listing_type);
