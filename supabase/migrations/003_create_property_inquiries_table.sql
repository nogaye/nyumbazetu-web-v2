-- Migration: Create property_inquiries table
-- Created: 2024
-- Description: Stores inquiries from users interested in properties

CREATE TABLE IF NOT EXISTS property_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID REFERENCES properties(id) ON DELETE SET NULL,
  property_slug TEXT,
  property_title TEXT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'viewing_scheduled', 'closed')),
  source TEXT DEFAULT 'listing_detail', -- 'listing_detail', 'contact_page', etc.
  metadata JSONB, -- Additional metadata (user agent, referrer, etc.)
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_property_inquiries_property_id ON property_inquiries(property_id);
CREATE INDEX IF NOT EXISTS idx_property_inquiries_email ON property_inquiries(email);
CREATE INDEX IF NOT EXISTS idx_property_inquiries_status ON property_inquiries(status);
CREATE INDEX IF NOT EXISTS idx_property_inquiries_created_at ON property_inquiries(created_at DESC);

-- Function to update updated_at timestamp
CREATE TRIGGER update_property_inquiries_updated_at
  BEFORE UPDATE ON property_inquiries
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE property_inquiries ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Allow public to insert inquiries (but not read them)
-- This allows form submissions without exposing other users' data
CREATE POLICY "Allow public to insert property inquiries"
  ON property_inquiries
  FOR INSERT
  WITH CHECK (true);

-- RLS Policy: Only authenticated users (admins) can read inquiries
-- You'll need to add authentication and update this policy accordingly
-- For now, we'll allow service role to read (via server-side code)
-- CREATE POLICY "Allow admins to read property inquiries"
--   ON property_inquiries
--   FOR SELECT
--   USING (auth.role() = 'authenticated');

-- Comments for documentation
COMMENT ON TABLE property_inquiries IS 'Stores inquiries from users interested in properties';
COMMENT ON COLUMN property_inquiries.status IS 'Status of the inquiry: new, contacted, viewing_scheduled, closed';
COMMENT ON COLUMN property_inquiries.source IS 'Where the inquiry came from (listing_detail, contact_page, etc.)';
COMMENT ON COLUMN property_inquiries.metadata IS 'Additional metadata like user agent, referrer, etc.';

