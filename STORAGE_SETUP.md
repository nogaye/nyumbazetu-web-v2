# Supabase Storage Setup Guide

This guide will help you set up the `property-images` storage bucket in Supabase for storing property listing images.

## Step 1: Create the Storage Bucket

1. **Go to Supabase Dashboard**
   - Visit https://supabase.com/dashboard
   - Select your project: **Nyumba Zetu** (asxvrqtuikborpdmtrsq)

2. **Navigate to Storage**
   - Click on **Storage** in the left sidebar
   - Click **New bucket**

3. **Configure the Bucket**
   - **Name**: `property-images`
   - **Public bucket**: ✅ **Enable** (check this box)
   - **File size limit**: Leave default or set to 10MB
   - **Allowed MIME types**: Leave empty (allows all types) or specify:
     - `image/jpeg`
     - `image/png`
     - `image/webp`
     - `image/jpg`
   - Click **Create bucket**

## Step 2: Configure Storage Policies (RLS)

After creating the bucket, you need to set up Row Level Security (RLS) policies to allow public read access.

### Option A: Using Supabase Dashboard

1. Go to **Storage** → **Policies** → `property-images`
2. Click **New Policy**
3. Select **For full customization**
4. Create a policy with:
   - **Policy name**: `Public read access`
   - **Allowed operation**: `SELECT` (read)
   - **Policy definition**: 
     ```sql
     (bucket_id = 'property-images')
     ```
   - **Target roles**: `public`
   - Click **Review** then **Save policy**

### Option B: Using SQL Editor

Run this SQL in the Supabase SQL Editor:

```sql
-- Enable RLS on storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access to property-images bucket
CREATE POLICY "Public read access for property-images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'property-images');
```

## Step 3: Upload Test Images (Optional)

You can upload images either:

### Method 1: Via Supabase Dashboard
1. Go to **Storage** → `property-images`
2. Click **Upload file** or **Upload folder**
3. Upload images organized by property ID:
   ```
   property-images/
     {property-id}/
       cover.webp
       image-1.webp
       image-2.webp
   ```

### Method 2: Via Supabase Storage API
Use the Supabase client to upload images programmatically.

### Method 3: Via Supabase CLI
```bash
supabase storage upload property-images/{property-id}/cover.webp ./path/to/image.webp
```

## Step 4: Update Code to Use Storage URLs

Once you have images uploaded, update `lib/listings/supabase-helpers.ts`:

1. Uncomment the Supabase Storage code in `getImageUrl()` function
2. Remove or comment out the placeholder image code
3. The function will automatically use Supabase Storage URLs

## Step 5: Verify Setup

1. **Check bucket exists**: Go to Storage → You should see `property-images` bucket
2. **Test image access**: Try accessing an image URL directly:
   ```
   https://asxvrqtuikborpdmtrsq.supabase.co/storage/v1/object/public/property-images/{property-id}/cover.webp
   ```
3. **Test in app**: Restart dev server and check if images load

## Current Status

✅ **Database tables created**  
✅ **10 properties with image metadata inserted**  
✅ **Placeholder images working**  
⏳ **Storage bucket setup** (this guide)  
⏳ **Upload actual images** (when ready)

## Troubleshooting

### Images still not loading after setup

1. **Check bucket is public**: Storage → `property-images` → Settings → Public bucket should be enabled
2. **Verify RLS policies**: Storage → Policies → Should have a public read policy
3. **Check image paths**: Ensure paths in database match actual file paths in storage
4. **Check CORS**: If accessing from browser, ensure CORS is configured (usually automatic for public buckets)

### Permission errors

- Verify RLS policies are set correctly
- Check that the bucket is marked as public
- Ensure the policy allows `SELECT` operation for `public` role

### File upload errors

- Check file size limits
- Verify MIME type is allowed
- Ensure you have proper permissions (service role key for admin operations)

## Next Steps After Storage Setup

1. **Upload real property images** to match the paths in your database
2. **Update `getImageUrl()`** to use Supabase Storage URLs instead of placeholders
3. **Implement image upload functionality** for adding new properties
4. **Add image optimization** (resize, compress, generate thumbnails)
5. **Set up CDN** (Supabase Storage uses CDN by default)

## Support

- Supabase Storage Docs: https://supabase.com/docs/guides/storage
- Storage API Reference: https://supabase.com/docs/reference/javascript/storage
- Project Dashboard: https://supabase.com/dashboard/project/asxvrqtuikborpdmtrsq/storage/buckets

