# Next Steps for Property Listings

## ✅ Current Status

The listings page is fully implemented with mock data and ready for testing. All TypeScript errors have been resolved.

## Immediate Next Steps

### 1. Test the Implementation Locally

```bash
npm run dev
```

Then navigate to `http://localhost:3000/listings` and test:
- ✅ Filter functionality (city, area, price, bedrooms, property type, TPS)
- ✅ Pagination
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Loading states
- ✅ Empty states
- ✅ Dark mode

### 2. Connect to Supabase (Recommended Next)

#### Step 2.1: Install Supabase Client
```bash
npm install @supabase/supabase-js
```

#### Step 2.2: Create Supabase Client Utility
Create `lib/supabase/client.ts`:

```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// For server-side operations (service role)
export const supabaseAdmin = createClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)
```

#### Step 2.3: Set Up Environment Variables
Add to `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

#### Step 2.4: Create Database Tables
Run this SQL in your Supabase SQL Editor:

```sql
-- Properties table
CREATE TABLE properties (
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
CREATE TABLE property_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  storage_path TEXT NOT NULL,
  is_cover BOOLEAN DEFAULT false,
  position INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_properties_city ON properties(city);
CREATE INDEX idx_properties_area ON properties(area);
CREATE INDEX idx_properties_monthly_rent ON properties(monthly_rent);
CREATE INDEX idx_properties_bedrooms ON properties(bedrooms);
CREATE INDEX idx_properties_property_type ON properties(property_type);
CREATE INDEX idx_properties_is_tps_available ON properties(is_tps_available);
CREATE INDEX idx_property_images_property_id ON property_images(property_id);
CREATE INDEX idx_property_images_is_cover ON property_images(is_cover);
```

#### Step 2.5: Set Up Supabase Storage
1. Go to Storage in Supabase dashboard
2. Create a bucket named `property-images`
3. Set it to public (or configure RLS policies)
4. Upload test images

#### Step 2.6: Replace Mock Data with Real Queries
Update `lib/listings/supabase-helpers.ts`:

```typescript
import { supabase } from '@/lib/supabase/client'
import { ListingFilters, ListingWithCoverImage } from './types'

export async function fetchListings(
  filters: ListingFilters
): Promise<ListingsResponse> {
  let query = supabase
    .from('properties')
    .select(`
      *,
      property_images!inner(storage_path, is_cover, position)
    `)
    .eq('property_images.is_cover', true)
    .order('created_at', { ascending: false })

  // Apply filters
  if (filters.city) {
    query = query.ilike('city', `%${filters.city}%`)
  }
  
  if (filters.area) {
    query = query.ilike('area', `%${filters.area}%`)
  }
  
  if (filters.minPrice !== undefined) {
    query = query.gte('monthly_rent', filters.minPrice)
  }
  
  if (filters.maxPrice !== undefined) {
    query = query.lte('monthly_rent', filters.maxPrice)
  }
  
  if (filters.bedrooms !== undefined) {
    if (filters.bedrooms === '3+') {
      query = query.gte('bedrooms', 3)
    } else {
      query = query.eq('bedrooms', filters.bedrooms)
    }
  }
  
  if (filters.propertyType) {
    query = query.eq('property_type', filters.propertyType)
  }
  
  if (filters.tps === true) {
    query = query.eq('is_tps_available', true)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching listings:', error)
    return {
      listings: [],
      total: 0,
      page: filters.page || 1,
      perPage: 24,
      totalPages: 0,
    }
  }

  // Transform to ListingWithCoverImage
  const listings: ListingWithCoverImage[] = (data || []).map((property: any) => {
    const coverImage = property.property_images?.[0]
    return {
      ...property,
      cover_image_url: getImageUrl(coverImage?.storage_path || ''),
      blur_data_url: getBlurDataURL(), // TODO: Generate real blur
    }
  })

  // Apply pagination
  const page = filters.page || 1
  const perPage = 24
  const start = (page - 1) * perPage
  const end = start + perPage

  return {
    listings: listings.slice(start, end),
    total: listings.length,
    page,
    perPage,
    totalPages: Math.ceil(listings.length / perPage),
  }
}

export function getImageUrl(storagePath: string): string {
  const { data } = supabase.storage
    .from('property-images')
    .getPublicUrl(storagePath)
  return data.publicUrl
}
```

### 3. Enhance Features

#### 3.1: Implement Sorting
Update the sort dropdown in `app/listings/page.tsx` to actually sort results.

#### 3.2: Add Search Functionality
Add a search input that filters by title/description.

#### 3.3: Implement Individual Listing Page
Complete the `/listings/[slug]` page with:
- Image gallery
- Full property details
- Contact form/button
- Map integration (optional)
- Similar listings section

#### 3.4: Add Save/Favorite Functionality
Implement the heart button to save listings (requires user authentication).

#### 3.5: Implement Blur Data URLs
Generate proper blur placeholders from actual images using a service like:
- `plaiceholder` package
- `sharp` for server-side processing
- Or use Supabase image transformations

### 4. Performance Optimizations

- [ ] Add React Query or SWR for client-side caching
- [ ] Implement infinite scroll as alternative to pagination
- [ ] Add image lazy loading optimizations
- [ ] Add skeleton loading for better perceived performance
- [ ] Implement debounced search/filter inputs

### 5. Testing & Quality Assurance

- [ ] Test all filter combinations
- [ ] Test pagination edge cases
- [ ] Test responsive design on various devices
- [ ] Test accessibility (keyboard navigation, screen readers)
- [ ] Test dark mode
- [ ] Performance testing (Lighthouse scores)
- [ ] Cross-browser testing

### 6. SEO Enhancements

- [ ] Add structured data (JSON-LD) for listings
- [ ] Implement dynamic sitemap for listings
- [ ] Add Open Graph images for individual listings
- [ ] Optimize meta descriptions per filter combination

## Quick Start Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run production build locally
npm start

# Type check
npx tsc --noEmit

# Lint
npm run lint
```

## Priority Order

1. **Test current implementation** (5 min)
2. **Connect to Supabase** (30-60 min)
3. **Populate with real data** (ongoing)
4. **Enhance individual listing page** (2-3 hours)
5. **Add advanced features** (ongoing)

## Questions or Issues?

If you encounter any issues or need help with any of these steps, let me know!

