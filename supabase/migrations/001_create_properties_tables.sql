-- Migration: Create properties and property_images tables
-- Created: 2024
-- Description: Sets up the database schema for property listings

-- Properties table
CREATE TABLE IF NOT EXISTS properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  city TEXT NOT NULL,
  area TEXT NOT NULL,
  monthly_rent INTEGER NOT NULL,
  bedrooms INTEGER NOT NULL,
  bathrooms INTEGER NOT NULL,
  size_sqm INTEGER,
  property_type TEXT NOT NULL CHECK (property_type IN ('apartment', 'maisonette', 'bedsitter', 'office', 'shop', 'house', 'studio')),
  is_tps_available BOOLEAN DEFAULT false,
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Property images table
CREATE TABLE IF NOT EXISTS property_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  storage_path TEXT NOT NULL,
  is_cover BOOLEAN DEFAULT false,
  position INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_properties_city ON properties(city);
CREATE INDEX IF NOT EXISTS idx_properties_area ON properties(area);
CREATE INDEX IF NOT EXISTS idx_properties_monthly_rent ON properties(monthly_rent);
CREATE INDEX IF NOT EXISTS idx_properties_bedrooms ON properties(bedrooms);
CREATE INDEX IF NOT EXISTS idx_properties_property_type ON properties(property_type);
CREATE INDEX IF NOT EXISTS idx_properties_is_tps_available ON properties(is_tps_available);
CREATE INDEX IF NOT EXISTS idx_properties_slug ON properties(slug);
CREATE INDEX IF NOT EXISTS idx_property_images_property_id ON property_images(property_id);
CREATE INDEX IF NOT EXISTS idx_property_images_is_cover ON property_images(is_cover);
CREATE INDEX IF NOT EXISTS idx_property_images_position ON property_images(property_id, position);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_properties_updated_at
  BEFORE UPDATE ON properties
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_images ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Allow public read access to properties and images
CREATE POLICY "Allow public read access to properties"
  ON properties
  FOR SELECT
  USING (true);

CREATE POLICY "Allow public read access to property_images"
  ON property_images
  FOR SELECT
  USING (true);

-- Comments for documentation
COMMENT ON TABLE properties IS 'Stores property listing information';
COMMENT ON TABLE property_images IS 'Stores image metadata for properties';
COMMENT ON COLUMN properties.slug IS 'URL-friendly unique identifier for the property';
COMMENT ON COLUMN properties.is_tps_available IS 'Whether the property is available through Tenant Purchase Scheme (rent-to-own)';
COMMENT ON COLUMN property_images.is_cover IS 'Whether this image is the main/cover image for the property';
COMMENT ON COLUMN property_images.position IS 'Order/position of the image (0 = first/cover image)';

