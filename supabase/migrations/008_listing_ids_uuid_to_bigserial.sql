-- Migration: Convert id from UUID to BIGSERIAL for tb_listing_properties, tb_listing_images, tb_listing_inquiries
-- Description: Replaces UUID primary keys with BIGSERIAL. Also updates property_id FKs in child tables.
--              Run after 007. Handles all tables that reference tb_listing_properties(id).
-- Note: Table name in code/docs is tb_listing_inquiries (not "enqueries").

-- =============================================================================
-- Step 1: tb_listing_properties — add id_big, backfill
-- =============================================================================
ALTER TABLE public.tb_listing_properties ADD COLUMN IF NOT EXISTS id_big BIGINT;

CREATE SEQUENCE IF NOT EXISTS public.tb_listing_properties_id_big_seq;

-- Backfill id_big with stable ordering (e.g. by created_at so existing rows get deterministic ids)
UPDATE public.tb_listing_properties p
SET id_big = sub.rn
FROM (
  SELECT id, ROW_NUMBER() OVER (ORDER BY created_at, id) AS rn
  FROM public.tb_listing_properties
) sub
WHERE p.id = sub.id;

ALTER TABLE public.tb_listing_properties ALTER COLUMN id_big SET NOT NULL;
ALTER SEQUENCE public.tb_listing_properties_id_big_seq OWNED BY public.tb_listing_properties.id_big;
SELECT setval('public.tb_listing_properties_id_big_seq', (SELECT COALESCE(MAX(id_big), 1) FROM public.tb_listing_properties));

-- =============================================================================
-- Step 2: Child tables — add property_id_big, backfill from tb_listing_properties
-- =============================================================================

-- tb_listing_images (from 001, renamed in 005)
ALTER TABLE public.tb_listing_images ADD COLUMN IF NOT EXISTS property_id_big BIGINT;
UPDATE public.tb_listing_images i
SET property_id_big = p.id_big
FROM public.tb_listing_properties p
WHERE p.id = i.property_id;

-- tb_listing_inquiries (from 003, renamed in 005; property_id can be NULL)
ALTER TABLE public.tb_listing_inquiries ADD COLUMN IF NOT EXISTS property_id_big BIGINT;
UPDATE public.tb_listing_inquiries i
SET property_id_big = p.id_big
FROM public.tb_listing_properties p
WHERE p.id = i.property_id;

-- Optional: tables from 007 (may not exist)
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'tb_listing_property_amenities') THEN
    ALTER TABLE public.tb_listing_property_amenities ADD COLUMN IF NOT EXISTS property_id_big BIGINT;
    UPDATE public.tb_listing_property_amenities pa
    SET property_id_big = p.id_big
    FROM public.tb_listing_properties p
    WHERE p.id = pa.property_id;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'tb_listing_availability') THEN
    ALTER TABLE public.tb_listing_availability ADD COLUMN IF NOT EXISTS property_id_big BIGINT;
    UPDATE public.tb_listing_availability a
    SET property_id_big = p.id_big
    FROM public.tb_listing_properties p
    WHERE p.id = a.property_id;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'tb_listing_reservations') THEN
    ALTER TABLE public.tb_listing_reservations ADD COLUMN IF NOT EXISTS property_id_big BIGINT;
    UPDATE public.tb_listing_reservations r
    SET property_id_big = p.id_big
    FROM public.tb_listing_properties p
    WHERE p.id = r.property_id;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'tb_listing_reviews') THEN
    ALTER TABLE public.tb_listing_reviews ADD COLUMN IF NOT EXISTS property_id_big BIGINT;
    UPDATE public.tb_listing_reviews r
    SET property_id_big = p.id_big
    FROM public.tb_listing_properties p
    WHERE p.id = r.property_id;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'tb_listing_price_rules') THEN
    ALTER TABLE public.tb_listing_price_rules ADD COLUMN IF NOT EXISTS property_id_big BIGINT;
    UPDATE public.tb_listing_price_rules pr
    SET property_id_big = p.id_big
    FROM public.tb_listing_properties p
    WHERE p.id = pr.property_id;
  END IF;
END $$;

-- =============================================================================
-- Step 3: Drop FKs that reference tb_listing_properties(id)
-- =============================================================================
ALTER TABLE public.tb_listing_images     DROP CONSTRAINT IF EXISTS property_images_property_id_fkey;
ALTER TABLE public.tb_listing_inquiries   DROP CONSTRAINT IF EXISTS property_inquiries_property_id_fkey;

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'tb_listing_property_amenities') THEN
    ALTER TABLE public.tb_listing_property_amenities DROP CONSTRAINT IF EXISTS fk_tb_listing_property_amenities_property;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'tb_listing_availability') THEN
    ALTER TABLE public.tb_listing_availability DROP CONSTRAINT IF EXISTS fk_tb_listing_availability_property;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'tb_listing_reservations') THEN
    ALTER TABLE public.tb_listing_reservations DROP CONSTRAINT IF EXISTS fk_tb_listing_reservations_property;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'tb_listing_reviews') THEN
    ALTER TABLE public.tb_listing_reviews DROP CONSTRAINT IF EXISTS fk_tb_listing_reviews_property;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'tb_listing_price_rules') THEN
    ALTER TABLE public.tb_listing_price_rules DROP CONSTRAINT IF EXISTS fk_tb_listing_price_rules_property;
  END IF;
END $$;

-- =============================================================================
-- Step 4: Replace property_id with property_id_big (drop old column, rename)
-- =============================================================================
ALTER TABLE public.tb_listing_images DROP COLUMN IF EXISTS property_id;
ALTER TABLE public.tb_listing_images RENAME COLUMN property_id_big TO property_id;
ALTER TABLE public.tb_listing_images ALTER COLUMN property_id SET NOT NULL;

ALTER TABLE public.tb_listing_inquiries DROP COLUMN IF EXISTS property_id;
ALTER TABLE public.tb_listing_inquiries RENAME COLUMN property_id_big TO property_id;
-- property_id stays nullable (ON DELETE SET NULL)

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'tb_listing_property_amenities' AND column_name = 'property_id_big') THEN
    ALTER TABLE public.tb_listing_property_amenities DROP COLUMN IF EXISTS property_id;
    ALTER TABLE public.tb_listing_property_amenities RENAME COLUMN property_id_big TO property_id;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'tb_listing_availability' AND column_name = 'property_id_big') THEN
    ALTER TABLE public.tb_listing_availability DROP COLUMN IF EXISTS property_id;
    ALTER TABLE public.tb_listing_availability RENAME COLUMN property_id_big TO property_id;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'tb_listing_reservations' AND column_name = 'property_id_big') THEN
    ALTER TABLE public.tb_listing_reservations DROP COLUMN IF EXISTS property_id;
    ALTER TABLE public.tb_listing_reservations RENAME COLUMN property_id_big TO property_id;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'tb_listing_reviews' AND column_name = 'property_id_big') THEN
    ALTER TABLE public.tb_listing_reviews DROP COLUMN IF EXISTS property_id;
    ALTER TABLE public.tb_listing_reviews RENAME COLUMN property_id_big TO property_id;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'tb_listing_price_rules' AND column_name = 'property_id_big') THEN
    ALTER TABLE public.tb_listing_price_rules DROP COLUMN IF EXISTS property_id;
    ALTER TABLE public.tb_listing_price_rules RENAME COLUMN property_id_big TO property_id;
  END IF;
END $$;

-- =============================================================================
-- Step 5: tb_listing_properties — drop UUID id, make id_big the new PK
-- =============================================================================
ALTER TABLE public.tb_listing_properties DROP CONSTRAINT IF EXISTS tb_listing_properties_pkey;
ALTER TABLE public.tb_listing_properties DROP CONSTRAINT IF EXISTS properties_pkey;
ALTER TABLE public.tb_listing_properties DROP COLUMN IF EXISTS id;
ALTER TABLE public.tb_listing_properties RENAME COLUMN id_big TO id;
ALTER TABLE public.tb_listing_properties ADD PRIMARY KEY (id);

-- Rename sequence and attach to new column name, then set default for new rows
ALTER SEQUENCE IF EXISTS public.tb_listing_properties_id_big_seq RENAME TO tb_listing_properties_id_seq;
ALTER SEQUENCE public.tb_listing_properties_id_seq OWNED BY public.tb_listing_properties.id;
ALTER TABLE public.tb_listing_properties ALTER COLUMN id SET DEFAULT nextval('public.tb_listing_properties_id_seq');
SELECT setval('public.tb_listing_properties_id_seq', (SELECT COALESCE(MAX(id), 1) FROM public.tb_listing_properties));

-- =============================================================================
-- Step 6: Re-add FKs to tb_listing_properties(id)
-- =============================================================================
ALTER TABLE public.tb_listing_images
  ADD CONSTRAINT fk_tb_listing_images_property
  FOREIGN KEY (property_id) REFERENCES public.tb_listing_properties(id) ON DELETE CASCADE;

ALTER TABLE public.tb_listing_inquiries
  ADD CONSTRAINT fk_tb_listing_inquiries_property
  FOREIGN KEY (property_id) REFERENCES public.tb_listing_properties(id) ON DELETE SET NULL;

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'tb_listing_property_amenities') AND
     EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'tb_listing_property_amenities' AND column_name = 'property_id') THEN
    ALTER TABLE public.tb_listing_property_amenities
      ADD CONSTRAINT fk_tb_listing_property_amenities_property
      FOREIGN KEY (property_id) REFERENCES public.tb_listing_properties(id);
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'tb_listing_availability') AND
     EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'tb_listing_availability' AND column_name = 'property_id') THEN
    ALTER TABLE public.tb_listing_availability
      ADD CONSTRAINT fk_tb_listing_availability_property
      FOREIGN KEY (property_id) REFERENCES public.tb_listing_properties(id);
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'tb_listing_reservations') AND
     EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'tb_listing_reservations' AND column_name = 'property_id') THEN
    ALTER TABLE public.tb_listing_reservations
      ADD CONSTRAINT fk_tb_listing_reservations_property
      FOREIGN KEY (property_id) REFERENCES public.tb_listing_properties(id);
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'tb_listing_reviews') AND
     EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'tb_listing_reviews' AND column_name = 'property_id') THEN
    ALTER TABLE public.tb_listing_reviews
      ADD CONSTRAINT fk_tb_listing_reviews_property
      FOREIGN KEY (property_id) REFERENCES public.tb_listing_properties(id);
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'tb_listing_price_rules') AND
     EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'tb_listing_price_rules' AND column_name = 'property_id') THEN
    ALTER TABLE public.tb_listing_price_rules
      ADD CONSTRAINT fk_tb_listing_price_rules_property
      FOREIGN KEY (property_id) REFERENCES public.tb_listing_properties(id);
  END IF;
END $$;

-- =============================================================================
-- Step 7: tb_listing_images — id UUID -> BIGSERIAL
-- =============================================================================
ALTER TABLE public.tb_listing_images ADD COLUMN IF NOT EXISTS id_big BIGINT;
CREATE SEQUENCE IF NOT EXISTS public.tb_listing_images_id_big_seq;

UPDATE public.tb_listing_images i
SET id_big = sub.rn
FROM (
  SELECT id, ROW_NUMBER() OVER (ORDER BY created_at, id) AS rn
  FROM public.tb_listing_images
) sub
WHERE i.id = sub.id;

ALTER TABLE public.tb_listing_images ALTER COLUMN id_big SET NOT NULL;
ALTER SEQUENCE public.tb_listing_images_id_big_seq OWNED BY public.tb_listing_images.id_big;
SELECT setval('public.tb_listing_images_id_big_seq', (SELECT COALESCE(MAX(id_big), 1) FROM public.tb_listing_images));

ALTER TABLE public.tb_listing_images DROP CONSTRAINT IF EXISTS tb_listing_images_pkey;
ALTER TABLE public.tb_listing_images DROP CONSTRAINT IF EXISTS property_images_pkey;
ALTER TABLE public.tb_listing_images DROP COLUMN IF EXISTS id;
ALTER TABLE public.tb_listing_images RENAME COLUMN id_big TO id;
ALTER TABLE public.tb_listing_images ADD PRIMARY KEY (id);
ALTER SEQUENCE IF EXISTS public.tb_listing_images_id_big_seq RENAME TO tb_listing_images_id_seq;
ALTER SEQUENCE public.tb_listing_images_id_seq OWNED BY public.tb_listing_images.id;
ALTER TABLE public.tb_listing_images ALTER COLUMN id SET DEFAULT nextval('public.tb_listing_images_id_seq');
SELECT setval('public.tb_listing_images_id_seq', (SELECT COALESCE(MAX(id), 1) FROM public.tb_listing_images));

-- =============================================================================
-- Step 8: tb_listing_inquiries — id UUID -> BIGSERIAL
-- =============================================================================
ALTER TABLE public.tb_listing_inquiries ADD COLUMN IF NOT EXISTS id_big BIGINT;
CREATE SEQUENCE IF NOT EXISTS public.tb_listing_inquiries_id_big_seq;

UPDATE public.tb_listing_inquiries i
SET id_big = sub.rn
FROM (
  SELECT id, ROW_NUMBER() OVER (ORDER BY created_at, id) AS rn
  FROM public.tb_listing_inquiries
) sub
WHERE i.id = sub.id;

ALTER TABLE public.tb_listing_inquiries ALTER COLUMN id_big SET NOT NULL;
ALTER SEQUENCE public.tb_listing_inquiries_id_big_seq OWNED BY public.tb_listing_inquiries.id_big;
SELECT setval('public.tb_listing_inquiries_id_big_seq', (SELECT COALESCE(MAX(id_big), 1) FROM public.tb_listing_inquiries));

ALTER TABLE public.tb_listing_inquiries DROP CONSTRAINT IF EXISTS tb_listing_inquiries_pkey;
ALTER TABLE public.tb_listing_inquiries DROP CONSTRAINT IF EXISTS property_inquiries_pkey;
ALTER TABLE public.tb_listing_inquiries DROP COLUMN IF EXISTS id;
ALTER TABLE public.tb_listing_inquiries RENAME COLUMN id_big TO id;
ALTER TABLE public.tb_listing_inquiries ADD PRIMARY KEY (id);
ALTER SEQUENCE IF EXISTS public.tb_listing_inquiries_id_big_seq RENAME TO tb_listing_inquiries_id_seq;
ALTER SEQUENCE public.tb_listing_inquiries_id_seq OWNED BY public.tb_listing_inquiries.id;
ALTER TABLE public.tb_listing_inquiries ALTER COLUMN id SET DEFAULT nextval('public.tb_listing_inquiries_id_seq');
SELECT setval('public.tb_listing_inquiries_id_seq', (SELECT COALESCE(MAX(id), 1) FROM public.tb_listing_inquiries));

-- =============================================================================
-- Comments
-- =============================================================================
COMMENT ON COLUMN public.tb_listing_properties.id IS 'Primary key (BIGSERIAL).';
COMMENT ON COLUMN public.tb_listing_images.id IS 'Primary key (BIGSERIAL).';
COMMENT ON COLUMN public.tb_listing_images.property_id IS 'Property this image belongs to (FK to tb_listing_properties.id).';
COMMENT ON COLUMN public.tb_listing_inquiries.id IS 'Primary key (BIGSERIAL).';
COMMENT ON COLUMN public.tb_listing_inquiries.property_id IS 'Property the inquiry is about; NULL if property was deleted (FK to tb_listing_properties.id).';
