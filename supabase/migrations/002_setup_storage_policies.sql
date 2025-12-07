-- Migration: Set up storage policies for property-images bucket
-- Created: 2024
-- Description: Creates RLS policies for public read access to property-images bucket
-- 
-- NOTE: This migration assumes the 'property-images' bucket has been created
-- via the Supabase Dashboard. Run this AFTER creating the bucket.

-- Enable RLS on storage.objects (if not already enabled)
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Drop existing policy if it exists (for idempotency)
DROP POLICY IF EXISTS "Public read access for property-images" ON storage.objects;

-- Create policy for public read access to property-images bucket
CREATE POLICY "Public read access for property-images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'property-images');

-- Optional: Allow authenticated users to upload (if you want user uploads later)
-- Uncomment if needed:
/*
DROP POLICY IF EXISTS "Authenticated users can upload to property-images" ON storage.objects;

CREATE POLICY "Authenticated users can upload to property-images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'property-images');
*/

-- Comments for documentation
COMMENT ON POLICY "Public read access for property-images" ON storage.objects IS 
'Allows public read access to images in the property-images bucket';

