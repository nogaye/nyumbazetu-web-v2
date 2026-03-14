-- Migration: Full listing schema — add columns to existing tables, create new tables, add descriptions
-- Description: Adds missing columns and COMMENT ON to tb_listing_properties and tb_listing_images (no drops).
--              Creates tb_listing_amenities, property_amenities, availability, reservations, reviews, price_rules.
--              Depends on 006 (tb_organizations, tb_branches). Existing properties use UUID id; new tables reference it.

-- =============================================================================
-- 1. tb_listing_properties — add columns that don't exist, add descriptions
-- =============================================================================
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'tb_listing_properties' AND column_name = 'uuid') THEN
    ALTER TABLE public.tb_listing_properties ADD COLUMN uuid UUID NOT NULL DEFAULT gen_random_uuid();
    ALTER TABLE public.tb_listing_properties ADD CONSTRAINT uq_tb_listing_properties_uuid UNIQUE (uuid);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'tb_listing_properties' AND column_name = 'org_id') THEN
    ALTER TABLE public.tb_listing_properties ADD COLUMN org_id BIGINT NULL;
    ALTER TABLE public.tb_listing_properties ADD CONSTRAINT fk_tb_listing_properties_org FOREIGN KEY (org_id) REFERENCES public.tb_organizations(id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'tb_listing_properties' AND column_name = 'branch_id') THEN
    ALTER TABLE public.tb_listing_properties ADD COLUMN branch_id BIGINT NULL;
    ALTER TABLE public.tb_listing_properties ADD CONSTRAINT fk_tb_listing_properties_branch FOREIGN KEY (branch_id) REFERENCES public.tb_branches(id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'tb_listing_properties' AND column_name = 'listing_type') THEN
    ALTER TABLE public.tb_listing_properties ADD COLUMN listing_type VARCHAR(50) NULL;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'tb_listing_properties' AND column_name = 'max_guests') THEN
    ALTER TABLE public.tb_listing_properties ADD COLUMN max_guests INT NOT NULL DEFAULT 1;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'tb_listing_properties' AND column_name = 'beds') THEN
    ALTER TABLE public.tb_listing_properties ADD COLUMN beds INT NULL;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'tb_listing_properties' AND column_name = 'country') THEN
    ALTER TABLE public.tb_listing_properties ADD COLUMN country VARCHAR(100) NULL;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'tb_listing_properties' AND column_name = 'state_region') THEN
    ALTER TABLE public.tb_listing_properties ADD COLUMN state_region VARCHAR(100) NULL;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'tb_listing_properties' AND column_name = 'address_line_1') THEN
    ALTER TABLE public.tb_listing_properties ADD COLUMN address_line_1 VARCHAR(255) NULL;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'tb_listing_properties' AND column_name = 'address_line_2') THEN
    ALTER TABLE public.tb_listing_properties ADD COLUMN address_line_2 VARCHAR(255) NULL;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'tb_listing_properties' AND column_name = 'postal_code') THEN
    ALTER TABLE public.tb_listing_properties ADD COLUMN postal_code VARCHAR(50) NULL;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'tb_listing_properties' AND column_name = 'latitude') THEN
    ALTER TABLE public.tb_listing_properties ADD COLUMN latitude DECIMAL(10,7) NULL;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'tb_listing_properties' AND column_name = 'longitude') THEN
    ALTER TABLE public.tb_listing_properties ADD COLUMN longitude DECIMAL(10,7) NULL;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'tb_listing_properties' AND column_name = 'base_price') THEN
    ALTER TABLE public.tb_listing_properties ADD COLUMN base_price DECIMAL(14,2) NOT NULL DEFAULT 0;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'tb_listing_properties' AND column_name = 'currency_code') THEN
    ALTER TABLE public.tb_listing_properties ADD COLUMN currency_code VARCHAR(10) NOT NULL DEFAULT 'USD';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'tb_listing_properties' AND column_name = 'check_in_time') THEN
    ALTER TABLE public.tb_listing_properties ADD COLUMN check_in_time TIME NULL DEFAULT '14:00';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'tb_listing_properties' AND column_name = 'check_out_time') THEN
    ALTER TABLE public.tb_listing_properties ADD COLUMN check_out_time TIME NULL DEFAULT '10:00';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'tb_listing_properties' AND column_name = 'is_active') THEN
    ALTER TABLE public.tb_listing_properties ADD COLUMN is_active BOOLEAN NOT NULL DEFAULT TRUE;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'tb_listing_properties' AND column_name = 'is_published') THEN
    ALTER TABLE public.tb_listing_properties ADD COLUMN is_published BOOLEAN NOT NULL DEFAULT FALSE;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'tb_listing_properties' AND column_name = 'is_featured') THEN
    ALTER TABLE public.tb_listing_properties ADD COLUMN is_featured BOOLEAN NOT NULL DEFAULT FALSE;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'tb_listing_properties' AND column_name = 'sort_order') THEN
    ALTER TABLE public.tb_listing_properties ADD COLUMN sort_order INT NOT NULL DEFAULT 0;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'tb_listing_properties' AND column_name = 'notes') THEN
    ALTER TABLE public.tb_listing_properties ADD COLUMN notes TEXT NULL;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'tb_listing_properties' AND column_name = 'created_by') THEN
    ALTER TABLE public.tb_listing_properties ADD COLUMN created_by BIGINT NULL;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'tb_listing_properties' AND column_name = 'updated_by') THEN
    ALTER TABLE public.tb_listing_properties ADD COLUMN updated_by BIGINT NULL;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'tb_listing_properties' AND column_name = 'deleted_at') THEN
    ALTER TABLE public.tb_listing_properties ADD COLUMN deleted_at TIMESTAMPTZ NULL;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'tb_listing_properties' AND column_name = 'deleted_by') THEN
    ALTER TABLE public.tb_listing_properties ADD COLUMN deleted_by BIGINT NULL;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'tb_listing_properties' AND column_name = 'is_deleted') THEN
    ALTER TABLE public.tb_listing_properties ADD COLUMN is_deleted BOOLEAN NOT NULL DEFAULT FALSE;
  END IF;
END $$;

COMMENT ON TABLE public.tb_listing_properties IS 'Rental/listable properties; core listing entity with address, capacity, pricing, and check-in/out.';
COMMENT ON COLUMN public.tb_listing_properties.id IS 'Primary key (UUID).';
COMMENT ON COLUMN public.tb_listing_properties.uuid IS 'Public stable identifier for the property (e.g. in URLs or APIs).';
COMMENT ON COLUMN public.tb_listing_properties.org_id IS 'Organization that owns this property; NULL for system/global listings.';
COMMENT ON COLUMN public.tb_listing_properties.branch_id IS 'Branch within the organization; NULL if not branch-scoped.';
COMMENT ON COLUMN public.tb_listing_properties.title IS 'Short display title for the property.';
COMMENT ON COLUMN public.tb_listing_properties.slug IS 'URL-friendly unique identifier for the property.';
COMMENT ON COLUMN public.tb_listing_properties.description IS 'Full text description of the property.';
COMMENT ON COLUMN public.tb_listing_properties.property_type IS 'Type of property (e.g. apartment, house, villa).';
COMMENT ON COLUMN public.tb_listing_properties.listing_type IS 'Listing type (e.g. entire_place, private_room, shared_room).';
COMMENT ON COLUMN public.tb_listing_properties.max_guests IS 'Maximum number of guests allowed; default 1.';
COMMENT ON COLUMN public.tb_listing_properties.bedrooms IS 'Number of bedrooms; NULL if not applicable.';
COMMENT ON COLUMN public.tb_listing_properties.bathrooms IS 'Number of bathrooms; NULL if not applicable.';
COMMENT ON COLUMN public.tb_listing_properties.beds IS 'Number of beds; NULL if not applicable.';
COMMENT ON COLUMN public.tb_listing_properties.country IS 'Country (e.g. Kenya).';
COMMENT ON COLUMN public.tb_listing_properties.state_region IS 'State or region within the country.';
COMMENT ON COLUMN public.tb_listing_properties.city IS 'City or town.';
COMMENT ON COLUMN public.tb_listing_properties.area IS 'Area or district within the city.';
COMMENT ON COLUMN public.tb_listing_properties.address_line_1 IS 'First line of street address.';
COMMENT ON COLUMN public.tb_listing_properties.address_line_2 IS 'Second line of street address (optional).';
COMMENT ON COLUMN public.tb_listing_properties.postal_code IS 'Postal or ZIP code.';
COMMENT ON COLUMN public.tb_listing_properties.latitude IS 'Latitude for map display (decimal degrees).';
COMMENT ON COLUMN public.tb_listing_properties.longitude IS 'Longitude for map display (decimal degrees).';
COMMENT ON COLUMN public.tb_listing_properties.monthly_rent IS 'Monthly rent amount (legacy); base_price is used for nightly.';
COMMENT ON COLUMN public.tb_listing_properties.base_price IS 'Default price per night (or unit) in the listing currency.';
COMMENT ON COLUMN public.tb_listing_properties.currency_code IS 'ISO currency code (e.g. USD, KES); default USD.';
COMMENT ON COLUMN public.tb_listing_properties.check_in_time IS 'Default check-in time (e.g. 14:00).';
COMMENT ON COLUMN public.tb_listing_properties.check_out_time IS 'Default check-out time (e.g. 10:00).';
COMMENT ON COLUMN public.tb_listing_properties.size_sqm IS 'Size in square metres; NULL if not applicable.';
COMMENT ON COLUMN public.tb_listing_properties.is_tps_available IS 'Whether the property is available through Tenant Purchase Scheme (rent-to-own).';
COMMENT ON COLUMN public.tb_listing_properties.is_verified IS 'Whether the property is verified.';
COMMENT ON COLUMN public.tb_listing_properties.is_active IS 'Whether the property is active and can be used in reservations.';
COMMENT ON COLUMN public.tb_listing_properties.is_published IS 'Whether the property is visible on the public listing.';
COMMENT ON COLUMN public.tb_listing_properties.is_featured IS 'Whether the property is featured (e.g. on homepage).';
COMMENT ON COLUMN public.tb_listing_properties.sort_order IS 'Display order (lower = earlier).';
COMMENT ON COLUMN public.tb_listing_properties.notes IS 'Internal notes about the property.';
COMMENT ON COLUMN public.tb_listing_properties.created_at IS 'When the record was created.';
COMMENT ON COLUMN public.tb_listing_properties.created_by IS 'User or system that created the record; NULL if not tracked.';
COMMENT ON COLUMN public.tb_listing_properties.updated_at IS 'When the record was last updated.';
COMMENT ON COLUMN public.tb_listing_properties.updated_by IS 'User or system that last updated the record; NULL if not tracked.';
COMMENT ON COLUMN public.tb_listing_properties.deleted_at IS 'When the record was soft-deleted; NULL if not deleted.';
COMMENT ON COLUMN public.tb_listing_properties.deleted_by IS 'User or system that soft-deleted the record; NULL if not tracked.';
COMMENT ON COLUMN public.tb_listing_properties.is_deleted IS 'Soft-delete flag; true means the record is considered deleted.';

-- =============================================================================
-- 2. Amenities
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.tb_listing_amenities (
  id BIGSERIAL PRIMARY KEY,
  uuid UUID NOT NULL DEFAULT gen_random_uuid(),

  org_id BIGINT NULL,
  branch_id BIGINT NULL,

  name VARCHAR(100) NOT NULL,
  code VARCHAR(100) NULL,
  icon VARCHAR(100) NULL,
  category VARCHAR(100) NULL,
  description TEXT NULL,
  sort_order INT NOT NULL DEFAULT 0,

  is_active BOOLEAN NOT NULL DEFAULT TRUE,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by BIGINT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_by BIGINT NULL,
  deleted_at TIMESTAMPTZ NULL,
  deleted_by BIGINT NULL,
  is_deleted BOOLEAN NOT NULL DEFAULT FALSE,

  CONSTRAINT uq_tb_listing_amenities_uuid UNIQUE (uuid),
  CONSTRAINT fk_tb_listing_amenities_org
    FOREIGN KEY (org_id)
    REFERENCES public.tb_organizations(id),
  CONSTRAINT fk_tb_listing_amenities_branch
    FOREIGN KEY (branch_id)
    REFERENCES public.tb_branches(id)
);

COMMENT ON TABLE public.tb_listing_amenities IS 'Amenity definitions (e.g. WiFi, pool); global (org_id NULL) or tenant-scoped (org_id set). Uniqueness: global by name where org_id IS NULL; tenant by (org_id, name).';
COMMENT ON COLUMN public.tb_listing_amenities.id IS 'Primary key.';
COMMENT ON COLUMN public.tb_listing_amenities.uuid IS 'Public stable identifier for the amenity.';
COMMENT ON COLUMN public.tb_listing_amenities.org_id IS 'Organization that owns this amenity; NULL for global/shared amenities.';
COMMENT ON COLUMN public.tb_listing_amenities.branch_id IS 'Branch within the organization; NULL if not branch-scoped.';
COMMENT ON COLUMN public.tb_listing_amenities.name IS 'Display name of the amenity (e.g. WiFi, Parking).';
COMMENT ON COLUMN public.tb_listing_amenities.code IS 'Optional machine-friendly code for the amenity.';
COMMENT ON COLUMN public.tb_listing_amenities.icon IS 'Icon identifier or class name for UI (e.g. icon name or CSS class).';
COMMENT ON COLUMN public.tb_listing_amenities.category IS 'Category for grouping (e.g. essentials, facilities).';
COMMENT ON COLUMN public.tb_listing_amenities.description IS 'Optional description of the amenity.';
COMMENT ON COLUMN public.tb_listing_amenities.sort_order IS 'Display order (lower = earlier).';
COMMENT ON COLUMN public.tb_listing_amenities.is_active IS 'Whether the amenity is active and can be assigned to properties.';
COMMENT ON COLUMN public.tb_listing_amenities.created_at IS 'When the record was created.';
COMMENT ON COLUMN public.tb_listing_amenities.created_by IS 'User or system that created the record; NULL if not tracked.';
COMMENT ON COLUMN public.tb_listing_amenities.updated_at IS 'When the record was last updated.';
COMMENT ON COLUMN public.tb_listing_amenities.updated_by IS 'User or system that last updated the record; NULL if not tracked.';
COMMENT ON COLUMN public.tb_listing_amenities.deleted_at IS 'When the record was soft-deleted; NULL if not deleted.';
COMMENT ON COLUMN public.tb_listing_amenities.deleted_by IS 'User or system that soft-deleted the record; NULL if not tracked.';
COMMENT ON COLUMN public.tb_listing_amenities.is_deleted IS 'Soft-delete flag; true means the record is considered deleted.';

-- =============================================================================
-- 3. Property amenities (junction) — property_id references tb_listing_properties(id) UUID
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.tb_listing_property_amenities (
  id BIGSERIAL PRIMARY KEY,
  uuid UUID NOT NULL DEFAULT gen_random_uuid(),

  org_id BIGINT NULL,
  branch_id BIGINT NULL,

  property_id UUID NOT NULL,
  amenity_id BIGINT NOT NULL,

  notes TEXT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by BIGINT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_by BIGINT NULL,
  deleted_at TIMESTAMPTZ NULL,
  deleted_by BIGINT NULL,
  is_deleted BOOLEAN NOT NULL DEFAULT FALSE,

  CONSTRAINT uq_tb_listing_property_amenities_uuid UNIQUE (uuid),
  CONSTRAINT uq_tb_listing_property_amenities_pair UNIQUE (property_id, amenity_id),
  CONSTRAINT fk_tb_listing_property_amenities_org
    FOREIGN KEY (org_id)
    REFERENCES public.tb_organizations(id),
  CONSTRAINT fk_tb_listing_property_amenities_branch
    FOREIGN KEY (branch_id)
    REFERENCES public.tb_branches(id),
  CONSTRAINT fk_tb_listing_property_amenities_property
    FOREIGN KEY (property_id)
    REFERENCES public.tb_listing_properties(id),
  CONSTRAINT fk_tb_listing_property_amenities_amenity
    FOREIGN KEY (amenity_id)
    REFERENCES public.tb_listing_amenities(id)
);

COMMENT ON TABLE public.tb_listing_property_amenities IS 'Junction table linking properties to amenities; one row per property-amenity pair with optional notes.';
COMMENT ON COLUMN public.tb_listing_property_amenities.id IS 'Primary key.';
COMMENT ON COLUMN public.tb_listing_property_amenities.uuid IS 'Public stable identifier for the assignment.';
COMMENT ON COLUMN public.tb_listing_property_amenities.org_id IS 'Organization for multi-tenant scoping; can mirror property or amenity org.';
COMMENT ON COLUMN public.tb_listing_property_amenities.branch_id IS 'Branch for scoping; can mirror property or amenity branch.';
COMMENT ON COLUMN public.tb_listing_property_amenities.property_id IS 'Property that has this amenity.';
COMMENT ON COLUMN public.tb_listing_property_amenities.amenity_id IS 'Amenity assigned to the property.';
COMMENT ON COLUMN public.tb_listing_property_amenities.notes IS 'Optional notes about this amenity for this property.';
COMMENT ON COLUMN public.tb_listing_property_amenities.is_active IS 'Whether this assignment is active (e.g. amenity temporarily unavailable).';
COMMENT ON COLUMN public.tb_listing_property_amenities.created_at IS 'When the record was created.';
COMMENT ON COLUMN public.tb_listing_property_amenities.created_by IS 'User or system that created the record; NULL if not tracked.';
COMMENT ON COLUMN public.tb_listing_property_amenities.updated_at IS 'When the record was last updated.';
COMMENT ON COLUMN public.tb_listing_property_amenities.updated_by IS 'User or system that last updated the record; NULL if not tracked.';
COMMENT ON COLUMN public.tb_listing_property_amenities.deleted_at IS 'When the record was soft-deleted; NULL if not deleted.';
COMMENT ON COLUMN public.tb_listing_property_amenities.deleted_by IS 'User or system that soft-deleted the record; NULL if not tracked.';
COMMENT ON COLUMN public.tb_listing_property_amenities.is_deleted IS 'Soft-delete flag; true means the record is considered deleted.';

-- =============================================================================
-- 4. tb_listing_images — add columns that don't exist, add descriptions
-- =============================================================================
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'tb_listing_images' AND column_name = 'uuid') THEN
    ALTER TABLE public.tb_listing_images ADD COLUMN uuid UUID NOT NULL DEFAULT gen_random_uuid();
    ALTER TABLE public.tb_listing_images ADD CONSTRAINT uq_tb_listing_property_photos_uuid UNIQUE (uuid);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'tb_listing_images' AND column_name = 'org_id') THEN
    ALTER TABLE public.tb_listing_images ADD COLUMN org_id BIGINT NULL;
    ALTER TABLE public.tb_listing_images ADD CONSTRAINT fk_tb_listing_property_photos_org FOREIGN KEY (org_id) REFERENCES public.tb_organizations(id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'tb_listing_images' AND column_name = 'branch_id') THEN
    ALTER TABLE public.tb_listing_images ADD COLUMN branch_id BIGINT NULL;
    ALTER TABLE public.tb_listing_images ADD CONSTRAINT fk_tb_listing_property_photos_branch FOREIGN KEY (branch_id) REFERENCES public.tb_branches(id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'tb_listing_images' AND column_name = 'photo_url') THEN
    ALTER TABLE public.tb_listing_images ADD COLUMN photo_url TEXT NULL;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'tb_listing_images' AND column_name = 'thumbnail_url') THEN
    ALTER TABLE public.tb_listing_images ADD COLUMN thumbnail_url TEXT NULL;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'tb_listing_images' AND column_name = 'caption') THEN
    ALTER TABLE public.tb_listing_images ADD COLUMN caption TEXT NULL;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'tb_listing_images' AND column_name = 'alt_text') THEN
    ALTER TABLE public.tb_listing_images ADD COLUMN alt_text VARCHAR(255) NULL;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'tb_listing_images' AND column_name = 'sort_order') THEN
    ALTER TABLE public.tb_listing_images ADD COLUMN sort_order INT NOT NULL DEFAULT 0;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'tb_listing_images' AND column_name = 'is_active') THEN
    ALTER TABLE public.tb_listing_images ADD COLUMN is_active BOOLEAN NOT NULL DEFAULT TRUE;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'tb_listing_images' AND column_name = 'created_by') THEN
    ALTER TABLE public.tb_listing_images ADD COLUMN created_by BIGINT NULL;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'tb_listing_images' AND column_name = 'updated_at') THEN
    ALTER TABLE public.tb_listing_images ADD COLUMN updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW();
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'tb_listing_images' AND column_name = 'updated_by') THEN
    ALTER TABLE public.tb_listing_images ADD COLUMN updated_by BIGINT NULL;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'tb_listing_images' AND column_name = 'deleted_at') THEN
    ALTER TABLE public.tb_listing_images ADD COLUMN deleted_at TIMESTAMPTZ NULL;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'tb_listing_images' AND column_name = 'deleted_by') THEN
    ALTER TABLE public.tb_listing_images ADD COLUMN deleted_by BIGINT NULL;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'tb_listing_images' AND column_name = 'is_deleted') THEN
    ALTER TABLE public.tb_listing_images ADD COLUMN is_deleted BOOLEAN NOT NULL DEFAULT FALSE;
  END IF;
END $$;

COMMENT ON TABLE public.tb_listing_images IS 'Images/photos for a property; stores URL, thumbnail, caption, and cover flag.';
COMMENT ON COLUMN public.tb_listing_images.id IS 'Primary key (UUID).';
COMMENT ON COLUMN public.tb_listing_images.uuid IS 'Public stable identifier for the image.';
COMMENT ON COLUMN public.tb_listing_images.org_id IS 'Organization for multi-tenant scoping; typically matches property.';
COMMENT ON COLUMN public.tb_listing_images.branch_id IS 'Branch for scoping; typically matches property.';
COMMENT ON COLUMN public.tb_listing_images.property_id IS 'Property this image belongs to.';
COMMENT ON COLUMN public.tb_listing_images.storage_path IS 'Storage path for the image (e.g. in Supabase storage).';
COMMENT ON COLUMN public.tb_listing_images.photo_url IS 'Full-size image URL (storage or CDN); can be derived from storage_path.';
COMMENT ON COLUMN public.tb_listing_images.thumbnail_url IS 'Thumbnail image URL; NULL if not generated.';
COMMENT ON COLUMN public.tb_listing_images.caption IS 'Optional caption for the image.';
COMMENT ON COLUMN public.tb_listing_images.alt_text IS 'Accessibility alt text (e.g. for screen readers).';
COMMENT ON COLUMN public.tb_listing_images.position IS 'Order/position of the image (0 = first/cover image); legacy column.';
COMMENT ON COLUMN public.tb_listing_images.sort_order IS 'Display order (lower = earlier); used for gallery order.';
COMMENT ON COLUMN public.tb_listing_images.is_cover IS 'Whether this image is the main/cover image for the property.';
COMMENT ON COLUMN public.tb_listing_images.is_active IS 'Whether the image is active and visible.';
COMMENT ON COLUMN public.tb_listing_images.created_at IS 'When the record was created.';
COMMENT ON COLUMN public.tb_listing_images.created_by IS 'User or system that created the record; NULL if not tracked.';
COMMENT ON COLUMN public.tb_listing_images.updated_at IS 'When the record was last updated.';
COMMENT ON COLUMN public.tb_listing_images.updated_by IS 'User or system that last updated the record; NULL if not tracked.';
COMMENT ON COLUMN public.tb_listing_images.deleted_at IS 'When the record was soft-deleted; NULL if not deleted.';
COMMENT ON COLUMN public.tb_listing_images.deleted_by IS 'User or system that soft-deleted the record; NULL if not tracked.';
COMMENT ON COLUMN public.tb_listing_images.is_deleted IS 'Soft-delete flag; true means the record is considered deleted.';

-- =============================================================================
-- 5. Availability (per-date) — property_id references tb_listing_properties(id) UUID
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.tb_listing_availability (
  id BIGSERIAL PRIMARY KEY,
  uuid UUID NOT NULL DEFAULT gen_random_uuid(),

  org_id BIGINT NULL,
  branch_id BIGINT NULL,

  property_id UUID NOT NULL,
  available_date DATE NOT NULL,

  is_available BOOLEAN NOT NULL DEFAULT TRUE,
  is_check_in_allowed BOOLEAN NOT NULL DEFAULT TRUE,
  is_check_out_allowed BOOLEAN NOT NULL DEFAULT TRUE,

  price_override DECIMAL(14,2) NULL,
  min_stay_nights INT NULL,
  max_stay_nights INT NULL,
  notes TEXT NULL,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by BIGINT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_by BIGINT NULL,
  deleted_at TIMESTAMPTZ NULL,
  deleted_by BIGINT NULL,
  is_deleted BOOLEAN NOT NULL DEFAULT FALSE,

  CONSTRAINT uq_tb_listing_availability_uuid UNIQUE (uuid),
  CONSTRAINT uq_tb_listing_availability_property_date UNIQUE (property_id, available_date),
  CONSTRAINT fk_tb_listing_availability_org
    FOREIGN KEY (org_id)
    REFERENCES public.tb_organizations(id),
  CONSTRAINT fk_tb_listing_availability_branch
    FOREIGN KEY (branch_id)
    REFERENCES public.tb_branches(id),
  CONSTRAINT fk_tb_listing_availability_property
    FOREIGN KEY (property_id)
    REFERENCES public.tb_listing_properties(id)
);

COMMENT ON TABLE public.tb_listing_availability IS 'Per-date availability and pricing overrides for a property; one row per property per date.';
COMMENT ON COLUMN public.tb_listing_availability.id IS 'Primary key.';
COMMENT ON COLUMN public.tb_listing_availability.uuid IS 'Public stable identifier for the availability record.';
COMMENT ON COLUMN public.tb_listing_availability.org_id IS 'Organization for multi-tenant scoping; typically matches property.';
COMMENT ON COLUMN public.tb_listing_availability.branch_id IS 'Branch for scoping; typically matches property.';
COMMENT ON COLUMN public.tb_listing_availability.property_id IS 'Property this availability row applies to.';
COMMENT ON COLUMN public.tb_listing_availability.available_date IS 'Calendar date (one row per property per date).';
COMMENT ON COLUMN public.tb_listing_availability.is_available IS 'Whether the property is available for booking on this date.';
COMMENT ON COLUMN public.tb_listing_availability.is_check_in_allowed IS 'Whether check-in is allowed on this date.';
COMMENT ON COLUMN public.tb_listing_availability.is_check_out_allowed IS 'Whether check-out is allowed on this date.';
COMMENT ON COLUMN public.tb_listing_availability.price_override IS 'Override price for this date; NULL to use property base or price rules.';
COMMENT ON COLUMN public.tb_listing_availability.min_stay_nights IS 'Minimum stay in nights for this date; NULL for no override.';
COMMENT ON COLUMN public.tb_listing_availability.max_stay_nights IS 'Maximum stay in nights for this date; NULL for no override.';
COMMENT ON COLUMN public.tb_listing_availability.notes IS 'Optional notes for this date.';
COMMENT ON COLUMN public.tb_listing_availability.created_at IS 'When the record was created.';
COMMENT ON COLUMN public.tb_listing_availability.created_by IS 'User or system that created the record; NULL if not tracked.';
COMMENT ON COLUMN public.tb_listing_availability.updated_at IS 'When the record was last updated.';
COMMENT ON COLUMN public.tb_listing_availability.updated_by IS 'User or system that last updated the record; NULL if not tracked.';
COMMENT ON COLUMN public.tb_listing_availability.deleted_at IS 'When the record was soft-deleted; NULL if not deleted.';
COMMENT ON COLUMN public.tb_listing_availability.deleted_by IS 'User or system that soft-deleted the record; NULL if not tracked.';
COMMENT ON COLUMN public.tb_listing_availability.is_deleted IS 'Soft-delete flag; true means the record is considered deleted.';

-- =============================================================================
-- 6. Reservations — property_id references tb_listing_properties(id) UUID
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.tb_listing_reservations (
  id BIGSERIAL PRIMARY KEY,
  uuid UUID NOT NULL DEFAULT gen_random_uuid(),

  org_id BIGINT NULL,
  branch_id BIGINT NULL,

  property_id UUID NOT NULL,

  guest_name VARCHAR(255) NOT NULL,
  guest_email VARCHAR(255) NULL,
  guest_phone VARCHAR(50) NULL,

  check_in_date DATE NOT NULL,
  check_out_date DATE NOT NULL,

  number_of_guests INT NOT NULL DEFAULT 1,
  number_of_adults INT NULL,
  number_of_children INT NULL,
  number_of_infants INT NULL,

  nights INT GENERATED ALWAYS AS (GREATEST(check_out_date - check_in_date, 0)) STORED,

  price_per_night DECIMAL(14,2) NULL,
  subtotal_amount DECIMAL(14,2) NULL,
  cleaning_fee_amount DECIMAL(14,2) NULL,
  service_fee_amount DECIMAL(14,2) NULL,
  tax_amount DECIMAL(14,2) NULL,
  total_amount DECIMAL(14,2) NULL,

  reservation_status VARCHAR(50) NOT NULL DEFAULT 'pending',
  payment_status VARCHAR(50) NOT NULL DEFAULT 'pending',

  special_requests TEXT NULL,
  notes TEXT NULL,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by BIGINT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_by BIGINT NULL,
  deleted_at TIMESTAMPTZ NULL,
  deleted_by BIGINT NULL,
  is_deleted BOOLEAN NOT NULL DEFAULT FALSE,

  CONSTRAINT uq_tb_listing_reservations_uuid UNIQUE (uuid),
  CONSTRAINT fk_tb_listing_reservations_org
    FOREIGN KEY (org_id)
    REFERENCES public.tb_organizations(id),
  CONSTRAINT fk_tb_listing_reservations_branch
    FOREIGN KEY (branch_id)
    REFERENCES public.tb_branches(id),
  CONSTRAINT fk_tb_listing_reservations_property
    FOREIGN KEY (property_id)
    REFERENCES public.tb_listing_properties(id),
  CONSTRAINT chk_tb_listing_reservations_dates
    CHECK (check_out_date > check_in_date)
);

COMMENT ON TABLE public.tb_listing_reservations IS 'Bookings/reservations for a property; guest details, dates, amounts, and status.';
COMMENT ON COLUMN public.tb_listing_reservations.id IS 'Primary key.';
COMMENT ON COLUMN public.tb_listing_reservations.uuid IS 'Public stable identifier for the reservation.';
COMMENT ON COLUMN public.tb_listing_reservations.org_id IS 'Organization for multi-tenant scoping; typically matches property.';
COMMENT ON COLUMN public.tb_listing_reservations.branch_id IS 'Branch for scoping; typically matches property.';
COMMENT ON COLUMN public.tb_listing_reservations.property_id IS 'Property being reserved.';
COMMENT ON COLUMN public.tb_listing_reservations.guest_name IS 'Full name of the guest.';
COMMENT ON COLUMN public.tb_listing_reservations.guest_email IS 'Guest email address; NULL if not provided.';
COMMENT ON COLUMN public.tb_listing_reservations.guest_phone IS 'Guest phone number; NULL if not provided.';
COMMENT ON COLUMN public.tb_listing_reservations.check_in_date IS 'Check-in date (inclusive).';
COMMENT ON COLUMN public.tb_listing_reservations.check_out_date IS 'Check-out date (exclusive; must be after check_in_date).';
COMMENT ON COLUMN public.tb_listing_reservations.number_of_guests IS 'Total number of guests; default 1.';
COMMENT ON COLUMN public.tb_listing_reservations.number_of_adults IS 'Number of adults; NULL if not broken down.';
COMMENT ON COLUMN public.tb_listing_reservations.number_of_children IS 'Number of children; NULL if not broken down.';
COMMENT ON COLUMN public.tb_listing_reservations.number_of_infants IS 'Number of infants; NULL if not broken down.';
COMMENT ON COLUMN public.tb_listing_reservations.nights IS 'Computed number of nights (check_out_date - check_in_date); stored generated column.';
COMMENT ON COLUMN public.tb_listing_reservations.price_per_night IS 'Agreed or calculated price per night for this reservation.';
COMMENT ON COLUMN public.tb_listing_reservations.subtotal_amount IS 'Subtotal before fees and tax.';
COMMENT ON COLUMN public.tb_listing_reservations.cleaning_fee_amount IS 'Cleaning fee amount; NULL if not applied.';
COMMENT ON COLUMN public.tb_listing_reservations.service_fee_amount IS 'Service fee amount; NULL if not applied.';
COMMENT ON COLUMN public.tb_listing_reservations.tax_amount IS 'Tax amount; NULL if not applied.';
COMMENT ON COLUMN public.tb_listing_reservations.total_amount IS 'Total amount for the reservation.';
COMMENT ON COLUMN public.tb_listing_reservations.reservation_status IS 'Status of the reservation (e.g. pending, confirmed, cancelled).';
COMMENT ON COLUMN public.tb_listing_reservations.payment_status IS 'Status of payment (e.g. pending, paid, refunded).';
COMMENT ON COLUMN public.tb_listing_reservations.special_requests IS 'Guest special requests or notes.';
COMMENT ON COLUMN public.tb_listing_reservations.notes IS 'Internal notes about the reservation.';
COMMENT ON COLUMN public.tb_listing_reservations.created_at IS 'When the record was created.';
COMMENT ON COLUMN public.tb_listing_reservations.created_by IS 'User or system that created the record; NULL if not tracked.';
COMMENT ON COLUMN public.tb_listing_reservations.updated_at IS 'When the record was last updated.';
COMMENT ON COLUMN public.tb_listing_reservations.updated_by IS 'User or system that last updated the record; NULL if not tracked.';
COMMENT ON COLUMN public.tb_listing_reservations.deleted_at IS 'When the record was soft-deleted; NULL if not deleted.';
COMMENT ON COLUMN public.tb_listing_reservations.deleted_by IS 'User or system that soft-deleted the record; NULL if not tracked.';
COMMENT ON COLUMN public.tb_listing_reservations.is_deleted IS 'Soft-delete flag; true means the record is considered deleted.';

-- =============================================================================
-- 7. Reviews — property_id UUID, reservation_id references tb_listing_reservations(id)
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.tb_listing_reviews (
  id BIGSERIAL PRIMARY KEY,
  uuid UUID NOT NULL DEFAULT gen_random_uuid(),

  org_id BIGINT NULL,
  branch_id BIGINT NULL,

  property_id UUID NOT NULL,
  reservation_id BIGINT NULL,

  guest_name VARCHAR(255) NULL,
  guest_email VARCHAR(255) NULL,

  rating INT NOT NULL,
  review_title VARCHAR(255) NULL,
  review_text TEXT NULL,

  is_visible BOOLEAN NOT NULL DEFAULT TRUE,
  is_verified BOOLEAN NOT NULL DEFAULT FALSE,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by BIGINT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_by BIGINT NULL,
  deleted_at TIMESTAMPTZ NULL,
  deleted_by BIGINT NULL,
  is_deleted BOOLEAN NOT NULL DEFAULT FALSE,

  CONSTRAINT uq_tb_listing_reviews_uuid UNIQUE (uuid),
  CONSTRAINT fk_tb_listing_reviews_org
    FOREIGN KEY (org_id)
    REFERENCES public.tb_organizations(id),
  CONSTRAINT fk_tb_listing_reviews_branch
    FOREIGN KEY (branch_id)
    REFERENCES public.tb_branches(id),
  CONSTRAINT fk_tb_listing_reviews_property
    FOREIGN KEY (property_id)
    REFERENCES public.tb_listing_properties(id),
  CONSTRAINT fk_tb_listing_reviews_reservation
    FOREIGN KEY (reservation_id)
    REFERENCES public.tb_listing_reservations(id),
  CONSTRAINT chk_tb_listing_reviews_rating
    CHECK (rating BETWEEN 1 AND 5)
);

COMMENT ON TABLE public.tb_listing_reviews IS 'Guest reviews for a property; optional link to reservation; rating 1–5 and visibility/verified flags.';
COMMENT ON COLUMN public.tb_listing_reviews.id IS 'Primary key.';
COMMENT ON COLUMN public.tb_listing_reviews.uuid IS 'Public stable identifier for the review.';
COMMENT ON COLUMN public.tb_listing_reviews.org_id IS 'Organization for multi-tenant scoping; typically matches property.';
COMMENT ON COLUMN public.tb_listing_reviews.branch_id IS 'Branch for scoping; typically matches property.';
COMMENT ON COLUMN public.tb_listing_reviews.property_id IS 'Property being reviewed.';
COMMENT ON COLUMN public.tb_listing_reviews.reservation_id IS 'Reservation this review is tied to; NULL if submitted without a reservation.';
COMMENT ON COLUMN public.tb_listing_reviews.guest_name IS 'Display name of the reviewer; NULL if anonymous.';
COMMENT ON COLUMN public.tb_listing_reviews.guest_email IS 'Email of the reviewer; NULL if not stored.';
COMMENT ON COLUMN public.tb_listing_reviews.rating IS 'Numeric rating from 1 to 5 (inclusive).';
COMMENT ON COLUMN public.tb_listing_reviews.review_title IS 'Optional short title for the review.';
COMMENT ON COLUMN public.tb_listing_reviews.review_text IS 'Full text of the review.';
COMMENT ON COLUMN public.tb_listing_reviews.is_visible IS 'Whether the review is visible on the listing.';
COMMENT ON COLUMN public.tb_listing_reviews.is_verified IS 'Whether the review is from a verified stay (e.g. linked reservation).';
COMMENT ON COLUMN public.tb_listing_reviews.created_at IS 'When the record was created.';
COMMENT ON COLUMN public.tb_listing_reviews.created_by IS 'User or system that created the record; NULL if not tracked.';
COMMENT ON COLUMN public.tb_listing_reviews.updated_at IS 'When the record was last updated.';
COMMENT ON COLUMN public.tb_listing_reviews.updated_by IS 'User or system that last updated the record; NULL if not tracked.';
COMMENT ON COLUMN public.tb_listing_reviews.deleted_at IS 'When the record was soft-deleted; NULL if not deleted.';
COMMENT ON COLUMN public.tb_listing_reviews.deleted_by IS 'User or system that soft-deleted the record; NULL if not tracked.';
COMMENT ON COLUMN public.tb_listing_reviews.is_deleted IS 'Soft-delete flag; true means the record is considered deleted.';

-- =============================================================================
-- 8. Price rules — property_id references tb_listing_properties(id) UUID
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.tb_listing_price_rules (
  id BIGSERIAL PRIMARY KEY,
  uuid UUID NOT NULL DEFAULT gen_random_uuid(),

  org_id BIGINT NULL,
  branch_id BIGINT NULL,

  property_id UUID NOT NULL,

  rule_name VARCHAR(255) NOT NULL,
  start_date DATE NULL,
  end_date DATE NULL,
  day_of_week INT NULL,
  price_amount DECIMAL(14,2) NOT NULL,
  min_stay_nights INT NULL,

  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  notes TEXT NULL,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by BIGINT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_by BIGINT NULL,
  deleted_at TIMESTAMPTZ NULL,
  deleted_by BIGINT NULL,
  is_deleted BOOLEAN NOT NULL DEFAULT FALSE,

  CONSTRAINT uq_tb_listing_price_rules_uuid UNIQUE (uuid),
  CONSTRAINT fk_tb_listing_price_rules_org
    FOREIGN KEY (org_id)
    REFERENCES public.tb_organizations(id),
  CONSTRAINT fk_tb_listing_price_rules_branch
    FOREIGN KEY (branch_id)
    REFERENCES public.tb_branches(id),
  CONSTRAINT fk_tb_listing_price_rules_property
    FOREIGN KEY (property_id)
    REFERENCES public.tb_listing_properties(id)
);

COMMENT ON TABLE public.tb_listing_price_rules IS 'Pricing rules per property: date range or day-of-week overrides, price amount, and optional min stay.';
COMMENT ON COLUMN public.tb_listing_price_rules.id IS 'Primary key.';
COMMENT ON COLUMN public.tb_listing_price_rules.uuid IS 'Public stable identifier for the rule.';
COMMENT ON COLUMN public.tb_listing_price_rules.org_id IS 'Organization for multi-tenant scoping; typically matches property.';
COMMENT ON COLUMN public.tb_listing_price_rules.branch_id IS 'Branch for scoping; typically matches property.';
COMMENT ON COLUMN public.tb_listing_price_rules.property_id IS 'Property this rule applies to.';
COMMENT ON COLUMN public.tb_listing_price_rules.rule_name IS 'Human-readable name for the rule (e.g. Weekend rate, High season).';
COMMENT ON COLUMN public.tb_listing_price_rules.start_date IS 'Start of date range; NULL if rule is day-of-week only.';
COMMENT ON COLUMN public.tb_listing_price_rules.end_date IS 'End of date range; NULL if rule is day-of-week only.';
COMMENT ON COLUMN public.tb_listing_price_rules.day_of_week IS 'Day of week (0–6 or 1–7 per convention); NULL if rule is date-range only.';
COMMENT ON COLUMN public.tb_listing_price_rules.price_amount IS 'Price amount for this rule (same currency as property).';
COMMENT ON COLUMN public.tb_listing_price_rules.min_stay_nights IS 'Minimum stay in nights for this rule; NULL for no minimum.';
COMMENT ON COLUMN public.tb_listing_price_rules.is_active IS 'Whether the rule is active and applied in pricing.';
COMMENT ON COLUMN public.tb_listing_price_rules.notes IS 'Optional notes about the rule.';
COMMENT ON COLUMN public.tb_listing_price_rules.created_at IS 'When the record was created.';
COMMENT ON COLUMN public.tb_listing_price_rules.created_by IS 'User or system that created the record; NULL if not tracked.';
COMMENT ON COLUMN public.tb_listing_price_rules.updated_at IS 'When the record was last updated.';
COMMENT ON COLUMN public.tb_listing_price_rules.updated_by IS 'User or system that last updated the record; NULL if not tracked.';
COMMENT ON COLUMN public.tb_listing_price_rules.deleted_at IS 'When the record was soft-deleted; NULL if not deleted.';
COMMENT ON COLUMN public.tb_listing_price_rules.deleted_by IS 'User or system that soft-deleted the record; NULL if not tracked.';
COMMENT ON COLUMN public.tb_listing_price_rules.is_deleted IS 'Soft-delete flag; true means the record is considered deleted.';

-- Indexes for common lookups
CREATE INDEX IF NOT EXISTS idx_tb_listing_properties_org_id ON public.tb_listing_properties(org_id);
CREATE INDEX IF NOT EXISTS idx_tb_listing_properties_branch_id ON public.tb_listing_properties(branch_id);
CREATE INDEX IF NOT EXISTS idx_tb_listing_properties_is_published ON public.tb_listing_properties(is_published) WHERE is_deleted = FALSE;
CREATE INDEX IF NOT EXISTS idx_tb_listing_properties_property_type ON public.tb_listing_properties(property_type);
CREATE INDEX IF NOT EXISTS idx_tb_listing_properties_city ON public.tb_listing_properties(city);

CREATE INDEX IF NOT EXISTS idx_tb_listing_amenities_org_id ON public.tb_listing_amenities(org_id);

CREATE INDEX IF NOT EXISTS idx_tb_listing_property_amenities_property_id ON public.tb_listing_property_amenities(property_id);
CREATE INDEX IF NOT EXISTS idx_tb_listing_property_amenities_amenity_id ON public.tb_listing_property_amenities(amenity_id);

CREATE INDEX IF NOT EXISTS idx_tb_listing_images_property_id ON public.tb_listing_images(property_id);
CREATE INDEX IF NOT EXISTS idx_tb_listing_images_is_cover ON public.tb_listing_images(property_id, is_cover) WHERE is_cover = TRUE;

CREATE INDEX IF NOT EXISTS idx_tb_listing_availability_property_date ON public.tb_listing_availability(property_id, available_date);

CREATE INDEX IF NOT EXISTS idx_tb_listing_reservations_property_id ON public.tb_listing_reservations(property_id);
CREATE INDEX IF NOT EXISTS idx_tb_listing_reservations_check_in ON public.tb_listing_reservations(property_id, check_in_date, check_out_date);

CREATE INDEX IF NOT EXISTS idx_tb_listing_reviews_property_id ON public.tb_listing_reviews(property_id);

CREATE INDEX IF NOT EXISTS idx_tb_listing_price_rules_property_id ON public.tb_listing_price_rules(property_id);
CREATE INDEX IF NOT EXISTS idx_tb_listing_price_rules_dates ON public.tb_listing_price_rules(property_id, start_date, end_date) WHERE is_active = TRUE AND is_deleted = FALSE;

-- =============================================================================
-- tb_listing_inquiries — descriptions (table preserved; add/refresh comments)
-- =============================================================================
COMMENT ON TABLE public.tb_listing_inquiries IS 'Stores inquiries from users interested in properties; submitted via listing or contact forms.';
COMMENT ON COLUMN public.tb_listing_inquiries.id IS 'Primary key (UUID).';
COMMENT ON COLUMN public.tb_listing_inquiries.property_id IS 'Property the inquiry is about; NULL if property was deleted.';
COMMENT ON COLUMN public.tb_listing_inquiries.property_slug IS 'Slug of the property at time of inquiry (denormalized).';
COMMENT ON COLUMN public.tb_listing_inquiries.property_title IS 'Title of the property at time of inquiry (denormalized).';
COMMENT ON COLUMN public.tb_listing_inquiries.name IS 'Name of the person submitting the inquiry.';
COMMENT ON COLUMN public.tb_listing_inquiries.email IS 'Email address of the inquirer.';
COMMENT ON COLUMN public.tb_listing_inquiries.phone IS 'Phone number of the inquirer; NULL if not provided.';
COMMENT ON COLUMN public.tb_listing_inquiries.message IS 'Message content of the inquiry.';
COMMENT ON COLUMN public.tb_listing_inquiries.status IS 'Status of the inquiry: new, contacted, viewing_scheduled, closed.';
COMMENT ON COLUMN public.tb_listing_inquiries.source IS 'Where the inquiry came from (e.g. listing_detail, contact_page).';
COMMENT ON COLUMN public.tb_listing_inquiries.metadata IS 'Additional metadata (e.g. user agent, referrer).';
COMMENT ON COLUMN public.tb_listing_inquiries.created_at IS 'When the inquiry was submitted.';
COMMENT ON COLUMN public.tb_listing_inquiries.updated_at IS 'When the record was last updated.';
