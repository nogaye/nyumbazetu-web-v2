# Seeding and Fetching Listings from the Database

This project seeds property listings into Supabase and fetches them in the app from `tb_listing_properties` and `tb_listing_images`.

## 1. Seed records into the database

### Option A: Minimal seed (no images, no external APIs)

Inserts a few sample properties and placeholder image rows. Fast, no OpenAI or image uploads.

```bash
npm run seed
```

**Requires in `.env.local`:**
- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

### Option B: Full seed (with images)

Inserts properties and uploads images to Supabase Storage (from URLs or DALL·E 3 if `OPENAI_API_KEY` is set).

```bash
npm run seed:one
```

**Requires in `.env.local`:**
- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- (Optional) `OPENAI_API_KEY` for AI-generated same-house images

## 2. Fetch from database tables

The app fetches listings from Supabase when both of these are set in `.env.local`:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

If either is missing, the app falls back to **mock data** (no database).

**Used in the app:**
- **Listings index** (`/listings`): `fetchListings()` → `tb_listing_properties` with join to `tb_listing_images` (cover image).
- **Listing detail** (`/listings/[slug]`): `fetchPropertyBySlug(slug)` and `fetchPropertyImages(propertyId)` → same tables.

## 3. Tables

| Table                    | Purpose                          |
|--------------------------|----------------------------------|
| `tb_listing_properties`  | Property metadata (title, rent, etc.) |
| `tb_listing_images`      | Image metadata (storage_path, is_cover, position) |

Storage bucket `property-images` holds the actual image files. The minimal seed does not upload files; the app will show placeholders or 404 for those paths unless you run `npm run seed:one` or upload images separately.
