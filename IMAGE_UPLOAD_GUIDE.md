# Image Upload Guide

Since the automated script is timing out, here are simpler ways to upload sample images:

## Option 1: Manual Upload via Supabase Dashboard (Recommended)

This is the easiest and most reliable method:

1. **Go to Supabase Storage**
   - Visit: https://supabase.com/dashboard/project/asxvrqtuikborpdmtrsq/storage/buckets/property-images

2. **For each property**, create a folder and upload images:
   - Click **New folder** or navigate to the property ID folder
   - Property IDs to create folders for:
     - `ead8141f-eb6a-4060-bd78-a60d4f5cff39`
     - `e0abde23-cd0f-4bd6-bb72-b2deb55fc2c1`
     - `721643c7-6207-4a0c-b0ea-91af0eb68c56`
     - `979263ee-949e-4e0d-aa73-5d6b23f94c2d`
     - `acec52f9-d9f5-46ae-be90-65688186d1c7`
     - `4a1e7e4e-b2ce-4645-9014-9a06a728a195`
     - `cc5e5ade-94e1-4c35-9192-db835e36b794`
     - `f5325d4e-8468-453e-935b-6dda480e3fc0`
     - `963bb993-71d4-49f2-a721-4aba89cb3b08`
     - `9273765c-e394-4c26-87b1-4dd4eeb91a8f`

3. **Upload images** with these names:
   - `cover.webp` (or `.jpg` - the extension doesn't matter, but `.webp` matches the database)
   - `image-1.webp`
   - `image-2.webp`
   - etc.

4. **Quick test**: You can use placeholder images from:
   - https://picsum.photos/1200/800 (random images)
   - Or any property images you have

## Option 2: Use Browser Extension

You can use a browser extension to bulk upload, or drag-and-drop multiple images at once in the Supabase dashboard.

## Option 3: Run Script Manually in Terminal

If you want to try the script, run it directly in your terminal (not through the IDE):

```bash
cd /Users/ogaye/Documents/develop/nyumbazetu/nyumbazetu-web-modern-v2
node scripts/upload-sample-images-simple.js
```

The script will:
- Download placeholder images from Picsum Photos
- Upload them to Supabase Storage
- Takes about 2-3 minutes for all 40 images

## Option 4: Upload Just Cover Images (Quick Test)

For a quick test, you can upload just the cover images for each property:

1. Go to Supabase Storage dashboard
2. For each property ID folder, upload just `cover.webp`
3. This will make all listings show images (even if galleries are incomplete)

## Current Status

- ✅ Storage bucket created
- ✅ Code ready to use images
- ✅ Fallback to placeholders working
- ⏳ Images need to be uploaded

Once images are uploaded, they'll automatically appear on your listings page!

## Quick Test URLs

After uploading, test these URLs (replace with your property ID):
```
https://asxvrqtuikborpdmtrsq.supabase.co/storage/v1/object/public/property-images/ead8141f-eb6a-4060-bd78-a60d4f5cff39/cover.webp
```

If the image loads, it's working! 🎉

