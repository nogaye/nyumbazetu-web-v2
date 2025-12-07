# Storage Setup Complete

## ✅ Completed Steps

### 1. Storage Bucket Created
- ✅ Created `property-images` bucket in Supabase
- ✅ Bucket is set to **public** (public read access enabled)
- ✅ File size limit: 10MB
- ✅ Allowed MIME types: `image/jpeg`, `image/png`, `image/webp`, `image/jpg`

### 2. Code Updated
- ✅ Updated `getImageUrl()` function to use Supabase Storage URLs
- ✅ Function now generates proper Supabase Storage public URLs
- ✅ Fallback to placeholder images if Supabase is not configured
- ✅ Fallback to placeholder images if there's an error

### 3. Storage Policies
- ⚠️ Note: Storage RLS policies migration requires admin permissions
- ✅ Since the bucket is **public**, it should work without explicit policies
- ✅ Public buckets in Supabase are accessible by default

## Current Behavior

The code now:
1. **First tries** to get the image URL from Supabase Storage
2. **Generates** the public URL using `getPublicUrl(storagePath)`
3. **Falls back** to placeholder images if:
   - Supabase is not configured
   - There's an error getting the URL
   - The image file doesn't exist in storage (browser will show broken image)

## Image URL Format

Images will now use Supabase Storage URLs like:
```
https://asxvrqtuikborpdmtrsq.supabase.co/storage/v1/object/public/property-images/{property-id}/cover.webp
```

## Next Steps

### 1. Upload Images to Storage

You can upload images in several ways:

#### Option A: Via Supabase Dashboard
1. Go to: https://supabase.com/dashboard/project/asxvrqtuikborpdmtrsq/storage/buckets/property-images
2. Click **Upload file** or **Upload folder**
3. Upload images organized by property ID:
   ```
   property-images/
     ead8141f-eb6a-4060-bd78-a60d4f5cff39/
       cover.webp
       image-1.webp
       image-2.webp
       image-3.webp
   ```

#### Option B: Via Supabase Storage API
Use the Supabase client to upload programmatically.

#### Option C: Via Supabase CLI
```bash
supabase storage upload property-images/{property-id}/cover.webp ./path/to/image.webp
```

### 2. Verify Images Load

After uploading images:
1. Restart your dev server: `npm run dev`
2. Visit: http://localhost:3000/listings
3. Check that images load from Supabase Storage
4. If images don't exist, you'll see broken images (expected until you upload)

### 3. Test Image URLs

You can test image URLs directly in your browser:
```
https://asxvrqtuikborpdmtrsq.supabase.co/storage/v1/object/public/property-images/ead8141f-eb6a-4060-bd78-a60d4f5cff39/cover.webp
```

If the image exists, it will display. If not, you'll get a 404 (which is expected until you upload).

## Storage Bucket Details

- **Bucket ID**: `property-images`
- **Bucket Name**: `property-images`
- **Public**: ✅ Yes
- **File Size Limit**: 10MB
- **Allowed Types**: image/jpeg, image/png, image/webp, image/jpg

## Property Image Paths in Database

All properties have image paths stored in the `property_images` table:
- Path format: `property-images/{property-id}/{filename}.webp`
- Each property has 3-6 images
- Cover images are marked with `is_cover = true`

## Troubleshooting

### Images show as broken
- **Cause**: Images haven't been uploaded to storage yet
- **Solution**: Upload images matching the paths in your database

### Images not loading from Supabase
- Check that the bucket is public (✅ it is)
- Verify the storage path in the database matches the file path
- Check browser console for CORS errors (shouldn't happen with public buckets)

### Need to add storage policies
If you need explicit RLS policies (for authenticated uploads, etc.):
1. Go to Supabase Dashboard → Storage → Policies
2. Create policies manually via the UI
3. Or use the service role key to run the migration

## Summary

✅ **Storage bucket created and configured**  
✅ **Code updated to use Supabase Storage URLs**  
✅ **Ready for image uploads**  
⏳ **Upload actual images** (when ready)

The system is now ready to use real images from Supabase Storage. Once you upload images matching the paths in your database, they will automatically display!

