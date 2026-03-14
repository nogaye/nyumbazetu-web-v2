/**
 * Minimal database seed: inserts listing records into tb_listing_properties and
 * tb_listing_images. No external APIs (no OpenAI, no image download). Use this
 * to quickly seed the DB and verify the app fetches from Supabase.
 *
 * Usage: node scripts/seed-database.js
 * Requires: .env.local with NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY
 *
 * After seeding, run the app with NEXT_PUBLIC_SUPABASE_URL and
 * NEXT_PUBLIC_SUPABASE_ANON_KEY set so listings are fetched from the database.
 */

const { createClient } = require('@supabase/supabase-js');

require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error('❌ Missing Supabase credentials.');
  console.error('Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

/** Sample listings to insert. Matches tb_listing_properties columns. */
const SEED_PROPERTIES = [
  {
    title: 'Spacious 2-Bedroom Apartment in Kilimani',
    slug: 'spacious-2-bedroom-kilimani-nairobi',
    description:
      'Bright and modern two-bedroom apartment in a secure compound. Open-plan living and dining, fitted kitchen, two en-suite bedrooms, small balcony. Walking distance to shops and transport.',
    city: 'Nairobi',
    area: 'Kilimani',
    monthly_rent: 85000,
    bedrooms: 2,
    bathrooms: 2,
    size_sqm: 95,
    property_type: 'apartment',
    is_tps_available: false,
    is_verified: true,
  },
  {
    title: '3-Bedroom Family House in Lavington',
    slug: '3-bedroom-house-lavington-nairobi',
    description:
      'Spacious three-bedroom standalone house in a quiet, gated compound. Open-plan living and dining, fitted kitchen, master en-suite plus two bedrooms and family bathroom. Small garden and parking.',
    city: 'Nairobi',
    area: 'Lavington',
    monthly_rent: 145000,
    bedrooms: 3,
    bathrooms: 2,
    size_sqm: 165,
    property_type: 'house',
    is_tps_available: true,
    is_verified: true,
  },
  {
    title: 'Studio Apartment in Westlands',
    slug: 'studio-westlands-nairobi',
    description:
      'Compact studio with combined living and sleeping area, kitchenette, and bathroom. Ideal for a single professional. Secure building, close to offices and amenities.',
    city: 'Nairobi',
    area: 'Westlands',
    monthly_rent: 45000,
    bedrooms: 0,
    bathrooms: 1,
    size_sqm: 35,
    property_type: 'studio',
    is_tps_available: false,
    is_verified: false,
  },
];

/**
 * Delete existing property by slug (and its images) so re-runs are idempotent.
 * @param {string} slug
 * @returns {Promise<string | null>} Deleted property id or null.
 */
async function deleteExistingBySlug(slug) {
  const { data: existing } = await supabase
    .from('tb_listing_properties')
    .select('id')
    .eq('slug', slug)
    .maybeSingle();
  if (!existing) return null;
  const id = existing.id;
  await supabase.from('tb_listing_images').delete().eq('property_id', id);
  await supabase.from('tb_listing_properties').delete().eq('id', id);
  return id;
}

/**
 * Insert one property and one placeholder image row (no file upload).
 * @param {object} record - Property row for tb_listing_properties.
 * @returns {Promise<{ propertyId: string; imagesInserted: number }>}
 */
async function seedOne(record) {
  await deleteExistingBySlug(record.slug);

  const { data: property, error: insertError } = await supabase
    .from('tb_listing_properties')
    .insert(record)
    .select('id')
    .single();

  if (insertError) throw new Error(`Failed to insert property: ${insertError.message}`);

  const propertyId = property.id;
  const imageRows = [
    {
      property_id: propertyId,
      storage_path: `property-images/${propertyId}/cover.webp`,
      is_cover: true,
      position: 0,
    },
  ];

  const { error: imagesError } = await supabase.from('tb_listing_images').insert(imageRows);
  if (imagesError) throw new Error(`Failed to insert tb_listing_images: ${imagesError.message}`);

  return { propertyId, imagesInserted: imageRows.length };
}

async function main() {
  console.log('🚀 Seeding database (tb_listing_properties + tb_listing_images)...\n');

  try {
    const results = [];
    for (let i = 0; i < SEED_PROPERTIES.length; i++) {
      const record = SEED_PROPERTIES[i];
      console.log(`  [${i + 1}/${SEED_PROPERTIES.length}] ${record.title} (${record.slug})`);
      const out = await seedOne(record);
      results.push({ slug: record.slug, ...out });
    }
    console.log('\n✨ Done. Seeded', results.length, 'properties.');
    results.forEach((r) => console.log(`   ${r.slug}: ${r.propertyId} (${r.imagesInserted} image row(s))`));
    console.log('\nTo fetch these from the app, set in .env.local:');
    console.log('  NEXT_PUBLIC_SUPABASE_URL=' + supabaseUrl);
    console.log('  NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>');
  } catch (err) {
    console.error('\n❌ Seed failed:', err.message);
    process.exit(1);
  }
}

main();
