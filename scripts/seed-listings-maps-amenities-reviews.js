/**
 * Seed script: populates maps (lat/lng, address), amenities, reviews, and comments for listings.
 *
 * - Ensures tb_users has a system user (id=1) for comments/reviews.
 * - Inserts global amenities into tb_listing_amenities and links them to existing properties via tb_listing_property_amenities.
 * - Updates tb_listing_properties with latitude, longitude, address_line_1 for map display.
 * - Inserts sample reviews and comments into tb_listing_comments for existing properties.
 *
 * Run after seed-database.js (or after any seed that creates tb_listing_properties).
 *
 * Usage: node scripts/seed-listings-maps-amenities-reviews.js
 * Requires: .env.local with NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY
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

/** Global amenities to seed (org_id NULL). name + code + icon for UI. */
const AMENITIES = [
  { name: 'Wifi', code: 'wifi', icon: 'wifi', sort_order: 1 },
  { name: 'Free parking on premises', code: 'free_parking', icon: 'parking', sort_order: 2 },
  { name: 'Kitchen', code: 'kitchen', icon: 'kitchen', sort_order: 3 },
  { name: 'Dedicated workspace', code: 'workspace', icon: 'briefcase', sort_order: 4 },
  { name: 'TV', code: 'tv', icon: 'tv', sort_order: 5 },
  { name: 'Air conditioning', code: 'air_conditioning', icon: 'snowflake', sort_order: 6 },
  { name: 'Hot water', code: 'hot_water', icon: 'flame', sort_order: 7 },
  { name: 'Security cameras', code: 'security_cameras', icon: 'camera', sort_order: 8 },
  { name: 'Pets allowed', code: 'pets_allowed', icon: 'dog', sort_order: 9 },
  { name: 'Garden or backyard', code: 'garden', icon: 'tree-pine', sort_order: 10 },
  { name: '24/7 security', code: 'security_24_7', icon: 'shield-check', sort_order: 11 },
  { name: 'Waterfront', code: 'waterfront', icon: 'waves', sort_order: 12 },
  { name: 'Private pool', code: 'pool', icon: 'waves', sort_order: 13 },
];

/** Area -> approximate lat, lng, address for Nairobi. */
const AREA_COORDS = {
  Kilimani: { lat: -1.298, lng: 36.7875, address_line_1: 'Kilimani, Nairobi' },
  Lavington: { lat: -1.292, lng: 36.779, address_line_1: 'Lavington, Nairobi' },
  Westlands: { lat: -1.267, lng: 36.806, address_line_1: 'Westlands, Nairobi' },
};

/** Sample reviews (body, rating, is_verified_review) for seeding. */
const SAMPLE_REVIEWS = [
  {
    body: 'Great location and very clean. The host was responsive and check-in was smooth. Would stay again.',
    rating: 5,
    is_verified_review: true,
  },
  {
    body: 'Spacious and quiet. Minor issue with hot water on the first day but it was fixed quickly.',
    rating: 4,
    is_verified_review: true,
  },
  {
    body: 'Perfect for a family stay. Safe neighbourhood and close to shops and transport.',
    rating: 5,
    is_verified_review: false,
  },
];

/** Sample comments (body only) for seeding. */
const SAMPLE_COMMENTS = [
  { body: "Check-in is from 2 PM. We'll send you the key collection details after booking." },
  { body: 'Is parking available on site?' },
];

/**
 * Ensure tb_users has a system user with id=1 for comments/reviews.
 * @returns {Promise<number>} user id (1).
 */
async function ensureSystemUser() {
  const { data: existing } = await supabase.from('tb_users').select('id').eq('id', 1).maybeSingle();
  if (existing) {
    return 1;
  }
  const { data: inserted, error } = await supabase
    .from('tb_users')
    .insert({
      id: 1,
      email: 'system@nyumbazetu.local',
      display_name: 'System',
    })
    .select('id')
    .single();
  if (error) {
    throw new Error(`Failed to insert system user: ${error.message}`);
  }
  return inserted.id;
}

/**
 * Seed tb_listing_amenities with global amenities; return map name -> id.
 * @returns {Promise<Map<string, number>>}
 */
async function seedAmenities() {
  const nameToId = new Map();
  for (const a of AMENITIES) {
    const { data: existing } = await supabase
      .from('tb_listing_amenities')
      .select('id')
      .eq('name', a.name)
      .is('org_id', null)
      .maybeSingle();
    if (existing) {
      nameToId.set(a.name, existing.id);
      continue;
    }
    const { data: inserted, error } = await supabase
      .from('tb_listing_amenities')
      .insert({
        org_id: null,
        branch_id: null,
        name: a.name,
        code: a.code,
        icon: a.icon,
        sort_order: a.sort_order,
        is_active: true,
      })
      .select('id')
      .single();
    if (error) throw new Error(`Failed to insert amenity ${a.name}: ${error.message}`);
    nameToId.set(a.name, inserted.id);
  }
  return nameToId;
}

/**
 * Link a property to a set of amenities (idempotent: only insert pairs that do not already exist).
 * Does not rely on ON CONFLICT so it works even if the unique constraint is missing.
 * @param {number} propertyId
 * @param {number[]} amenityIds
 */
async function linkPropertyToAmenities(propertyId, amenityIds) {
  const { data: existing } = await supabase
    .from('tb_listing_property_amenities')
    .select('amenity_id')
    .eq('property_id', propertyId)
    .eq('is_deleted', false);

  const existingIds = new Set((existing || []).map((r) => r.amenity_id));
  const toInsert = amenityIds.filter((id) => !existingIds.has(id));
  if (toInsert.length === 0) return;

  const rows = toInsert.map((amenity_id) => ({
    property_id: propertyId,
    amenity_id,
    is_active: true,
  }));

  const { error } = await supabase.from('tb_listing_property_amenities').insert(rows);
  if (error) {
    console.warn(`  Warning: could not link property ${propertyId} to amenities: ${error.message}`);
  }
}

/**
 * Update property with map fields (latitude, longitude, address_line_1) when area is known.
 * @param {number} id
 * @param {string} area
 */
async function updatePropertyMap(id, area) {
  const coords = AREA_COORDS[area];
  if (!coords) return;
  const { error } = await supabase
    .from('tb_listing_properties')
    .update({
      latitude: coords.lat,
      longitude: coords.lng,
      address_line_1: coords.address_line_1,
    })
    .eq('id', id);
  if (error) console.warn(`  Warning: could not update map for property ${id}: ${error.message}`);
}

/**
 * Insert sample reviews and comments for a property (skips if property already has reviews — idempotent).
 * @param {number} propertyId
 * @param {number} userId
 * @returns {Promise<boolean>} true if any rows were inserted.
 */
async function seedCommentsAndReviews(propertyId, userId) {
  const { data: existing } = await supabase
    .from('tb_listing_comments')
    .select('id')
    .eq('property_id', propertyId)
    .eq('comment_type', 'review')
    .limit(1);
  if (existing?.length) return false;

  for (const r of SAMPLE_REVIEWS) {
    const { error } = await supabase.from('tb_listing_comments').insert({
      property_id: propertyId,
      user_id: userId,
      comment_type: 'review',
      body: r.body,
      rating: r.rating,
      is_verified_review: r.is_verified_review,
      is_visible: true,
      moderation_status: 'published',
    });
    if (error) console.warn(`  Warning: could not insert review for property ${propertyId}: ${error.message}`);
  }
  for (const c of SAMPLE_COMMENTS) {
    const { error } = await supabase.from('tb_listing_comments').insert({
      property_id: propertyId,
      user_id: userId,
      comment_type: 'comment',
      body: c.body,
      is_visible: true,
      moderation_status: 'published',
    });
    if (error) console.warn(`  Warning: could not insert comment for property ${propertyId}: ${error.message}`);
  }
  return true;
}

async function main() {
  console.log('🚀 Seeding maps, amenities, reviews and comments...\n');

  try {
    const userId = await ensureSystemUser();
    console.log('  ✓ System user (id=1) ready');

    const nameToId = await seedAmenities();
    console.log(`  ✓ ${nameToId.size} amenities in tb_listing_amenities`);

    const amenityIds = Array.from(nameToId.values());

    const { data: properties, error: listError } = await supabase
      .from('tb_listing_properties')
      .select('id, area, title')
      .eq('is_deleted', false);

    if (listError) {
      throw new Error(`Failed to list properties: ${listError.message}`);
    }

    if (!properties?.length) {
      console.log('  No properties found. Run seed-database.js first.');
      return;
    }

    console.log(`  Processing ${properties.length} properties...`);

    for (const p of properties) {
      await updatePropertyMap(p.id, p.area);
      await linkPropertyToAmenities(p.id, amenityIds);
      const added = await seedCommentsAndReviews(p.id, userId);
      console.log(`  ✓ ${p.title} (id=${p.id}): map updated, amenities linked${added ? ', reviews/comments added' : ''}`);
    }

    console.log('\n✨ Done. Maps, amenities, reviews and comments are now in the database.');
  } catch (err) {
    console.error('\n❌ Seed failed:', err.message);
    process.exit(1);
  }
}

main();
