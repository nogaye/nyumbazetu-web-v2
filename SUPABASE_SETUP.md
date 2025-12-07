# Supabase Setup Guide

This guide will help you connect the listings page to your Supabase database.

## Prerequisites

- A Supabase account (sign up at https://supabase.com)
- A Supabase project created

## Step 1: Create Database Tables

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Open the file `supabase/migrations/001_create_properties_tables.sql`
4. Copy the entire SQL content
5. Paste it into the SQL Editor
6. Click **Run** to execute the migration

This will create:
- `properties` table with all required columns
- `property_images` table for storing image metadata
- Indexes for performance
- Row Level Security (RLS) policies for public read access
- Automatic `updated_at` timestamp trigger

## Step 2: Set Up Supabase Storage

1. Go to **Storage** in your Supabase dashboard
2. Click **New bucket**
3. Name it: `property-images`
4. Set it to **Public** (or configure RLS policies if you prefer)
5. Click **Create bucket**

### Upload Images

You can upload images either:
- Through the Supabase dashboard (Storage → property-images → Upload)
- Using the Supabase Storage API
- Using the Supabase CLI

Images should be organized by property ID:
```
property-images/
  {property-id}/
    image-1.webp
    image-2.webp
    cover.webp
```

## Step 3: Configure Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Get your Supabase credentials:
   - Go to your Supabase project settings: **Settings → API**
   - Copy the **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - Copy the **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Copy the **service_role** key → `SUPABASE_SERVICE_ROLE_KEY` (optional)

3. Update `.env.local` with your actual values:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

4. Restart your development server:
   ```bash
   npm run dev
   ```

## Step 4: Insert Test Data (Optional)

You can insert test data using the Supabase SQL Editor:

```sql
-- Insert a test property
INSERT INTO properties (
  title, slug, description, city, area, monthly_rent,
  bedrooms, bathrooms, size_sqm, property_type, is_tps_available, is_verified
) VALUES (
  '2BR Apartment – Kilimani',
  '2br-apartment-kilimani',
  'Spacious 2-bedroom apartment in the heart of Kilimani.',
  'Nairobi',
  'Kilimani',
  45000,
  2,
  2,
  85,
  'apartment',
  true,
  true
) RETURNING id;

-- Then insert images (replace {property_id} with the ID from above)
INSERT INTO property_images (property_id, storage_path, is_cover, position)
VALUES
  ('{property_id}', 'property-images/{property_id}/cover.webp', true, 0),
  ('{property_id}', 'property-images/{property_id}/image-1.webp', false, 1),
  ('{property_id}', 'property-images/{property_id}/image-2.webp', false, 2);
```

## Step 5: Verify Connection

1. Start your development server: `npm run dev`
2. Navigate to `/listings`
3. Check the browser console for any errors
4. If Supabase is configured correctly, you should see real data from your database
5. If not configured, the app will automatically use mock data (you'll see a console warning)

## Troubleshooting

### App still shows mock data

- Check that `.env.local` exists and has the correct values
- Restart your development server after changing `.env.local`
- Check browser console for warnings about missing Supabase configuration
- Verify your Supabase project URL and keys are correct

### Images not loading

- Verify the `property-images` bucket exists and is public
- Check that image paths in the database match actual files in Storage
- Verify RLS policies allow public read access to the bucket

### RLS Policy Errors

If you get permission errors:
1. Go to **Authentication → Policies** in Supabase
2. Verify the policies in `001_create_properties_tables.sql` were created
3. Ensure policies allow `SELECT` for public access

### Type Generation (Optional)

To generate TypeScript types from your Supabase schema:

1. Install Supabase CLI:
   ```bash
   npm install -g supabase
   ```

2. Link your project:
   ```bash
   supabase link --project-ref your-project-id
   ```

3. Generate types:
   ```bash
   supabase gen types typescript --linked > lib/supabase/database.types.ts
   ```

## Next Steps

Once Supabase is connected:

1. **Populate with real data**: Upload properties and images through your admin interface
2. **Implement blur generation**: Replace placeholder blur data URLs with real generated blurs
3. **Add authentication**: If you need user-specific features (saved listings, etc.)
4. **Set up backups**: Configure Supabase backups for your database
5. **Monitor performance**: Use Supabase dashboard to monitor query performance

## Support

- Supabase Docs: https://supabase.com/docs
- Supabase Discord: https://discord.supabase.com
- Project Issues: Check your project's issue tracker

