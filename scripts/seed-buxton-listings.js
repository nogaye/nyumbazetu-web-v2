/**
 * Seed script: insert Buxton Point (Mombasa) listings using Gulf Cap Real Estate info
 * and local images from public/images/listings/buxton/{unit}/.
 *
 * Data source: https://www.gulfcapre.co.ke/buxtonpoint
 * Usage: node scripts/seed-buxton-listings.js
 * Requires: .env.local with NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error('❌ Missing Supabase credentials.');
  console.error('Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

/** Base path to Buxton images (relative to project root). */
const BUXTON_IMAGES_BASE = path.join(
  __dirname,
  '..',
  'public',
  'images',
  'listings',
  'buxton'
);

/**
 * Shared description for all Buxton Point units (from Gulf Cap Buxton Point page).
 */
const BUXTON_DESCRIPTION =
  'Nestled within the serene Mombasa coast, Buxton Point offers a getaway where relaxation meets vibrant community life. ' +
  'Start your day with a morning walk along green-patched pathways, followed by a few laps in the Olympic-sized swimming pool, ' +
  'or energize your morning with aerobics in the fully equipped gym. Savor a meal at the estate\'s stylish food court, ' +
  'or relax under the light-shadowed courtyard while children enjoy the playground and state-of-the-art sports pitch. ' +
  'Amenities include basketball and football courts, kids play area, club house, cycling track, walking paths, landscaped lawns, ' +
  'and a minimart within the property. Ideal for a romantic escape, family retreat, or personal recharge.';

/**
 * Buxton Point unit config: unit code (folder name), bedrooms, size_sqm, monthly_rent, optional title override.
 * Unit codes map to folders under public/images/listings/buxton/.
 */
/** Monthly rent for all Buxton Point units (KES). */
const BUXTON_MONTHLY_RENT = 92000;

const BUXTON_UNITS = [
  { unit: 'bs001', bedrooms: 1, bathrooms: 1, size_sqm: 32 },
  { unit: 'cl102', bedrooms: 1, bathrooms: 1, size_sqm: 35 },
  { unit: 'bb202', bedrooms: 2, bathrooms: 2, size_sqm: 75 },
  { unit: 'cd201', bedrooms: 2, bathrooms: 2, size_sqm: 78 },
  { unit: 'ac301', bedrooms: 3, bathrooms: 2, size_sqm: 105 },
  { unit: 'am302', bedrooms: 3, bathrooms: 2, size_sqm: 108 },
  { unit: 'cc302', bedrooms: 3, bathrooms: 2, size_sqm: 102 },
  { unit: 'ap401', bedrooms: 3, bathrooms: 2, size_sqm: 120 },
];

/**
 * If a property with the given slug exists, delete it (and its images in DB and storage).
 * @param {string} slug - Property slug.
 * @returns {Promise<string | null>} Existing property id if deleted, null otherwise.
 */
async function deleteExistingBySlug(slug) {
  const { data: existing } = await supabase
    .from('properties')
    .select('id')
    .eq('slug', slug)
    .maybeSingle();
  if (!existing) return null;
  const id = existing.id;
  const { data: images } = await supabase
    .from('property_images')
    .select('storage_path')
    .eq('property_id', id);
  const paths = (images || [])
    .map((r) => r.storage_path)
    .filter(Boolean)
    .map((p) => p.replace(/^property-images\/?,?/, ''));
  if (paths.length) {
    await supabase.storage.from('property-images').remove(paths);
  }
  await supabase.from('property_images').delete().eq('property_id', id);
  await supabase.from('properties').delete().eq('id', id);
  console.log(`  🔄 Replaced existing property ${id} (slug: ${slug}).`);
  return id;
}

/**
 * List image filenames in a unit folder (sorted for consistent order).
 * @param {string} unit - Unit code, e.g. 'ac301'.
 * @returns {string[]} Sorted list of image filenames.
 */
function getUnitImageFiles(unit) {
  const dir = path.join(BUXTON_IMAGES_BASE, unit);
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter((f) => /\.(jpe?g|png|webp)$/i.test(f));
  return files.sort();
}

/**
 * Upload one image from local file to Supabase Storage.
 * @param {string} propertyId - Property UUID.
 * @param {string} imageName - Filename (e.g. IMG_7854.jpeg).
 * @param {string} localPath - Full path to the image file.
 * @returns {Promise<boolean>} True if upload succeeded.
 */
async function uploadLocalImage(propertyId, imageName, localPath) {
  const storagePath = `property-images/${propertyId}/${imageName}`;
  try {
    const buffer = fs.readFileSync(localPath);
    const ext = path.extname(imageName).toLowerCase();
    const contentType = ext === '.png' ? 'image/png' : ext === '.webp' ? 'image/webp' : 'image/jpeg';
    const { error } = await supabase.storage
      .from('property-images')
      .upload(storagePath, buffer, { contentType, upsert: true });
    if (error) throw error;
    return true;
  } catch (err) {
    console.error(`  ❌ Upload failed ${storagePath}:`, err.message);
    return false;
  }
}

/**
 * Seed one Buxton unit: insert property, upload local images, insert property_images.
 * @param {{ unit: string; bedrooms: number; bathrooms: number; size_sqm: number }} config - Unit config.
 * @returns {Promise<{ propertyId: string; imagesInserted: number }>}
 */
async function seedOneBuxtonUnit(config) {
  const { unit, bedrooms, bathrooms, size_sqm } = config;
  const slug = `buxton-point-${unit}-mombasa`;
  const title = `Buxton Point ${unit.toUpperCase()} – ${bedrooms}-Bedroom Apartment, Mombasa`;

  await deleteExistingBySlug(slug);

  const record = {
    title,
    slug,
    description: BUXTON_DESCRIPTION,
    city: 'Mombasa',
    area: 'Buxton Point',
    monthly_rent: BUXTON_MONTHLY_RENT,
    bedrooms,
    bathrooms,
    size_sqm,
    property_type: 'apartment',
    is_tps_available: false,
    is_verified: true,
  };

  const { data: property, error: insertError } = await supabase
    .from('properties')
    .insert(record)
    .select('id')
    .single();

  if (insertError) throw new Error(`Failed to insert property: ${insertError.message}`);

  const propertyId = property.id;
  const imageFiles = getUnitImageFiles(unit);

  if (imageFiles.length === 0) {
    console.warn(`  ⚠️ No images in public/images/listings/buxton/${unit}/`);
  }

  for (let i = 0; i < imageFiles.length; i++) {
    const name = imageFiles[i];
    const localPath = path.join(BUXTON_IMAGES_BASE, unit, name);
    console.log(`  📤 Uploading ${name} (${i + 1}/${imageFiles.length})...`);
    const ok = await uploadLocalImage(propertyId, name, localPath);
    if (!ok) throw new Error(`Upload failed for ${name}`);
  }

  const imageRows = imageFiles.map((name, index) => ({
    property_id: propertyId,
    storage_path: `property-images/${propertyId}/${name}`,
    is_cover: index === 0,
    position: index,
  }));

  if (imageRows.length) {
    const { error: imagesError } = await supabase.from('property_images').insert(imageRows);
    if (imagesError) throw new Error(`Failed to insert property_images: ${imagesError.message}`);
  }

  console.log(`  ✅ Inserted property + ${imageRows.length} image records.`);
  return { propertyId, imagesInserted: imageRows.length };
}

async function main() {
  console.log(`🚀 Seeding ${BUXTON_UNITS.length} Buxton Point listings (local images)...\n`);

  const results = [];
  try {
    for (let i = 0; i < BUXTON_UNITS.length; i++) {
      const config = BUXTON_UNITS[i];
      console.log(`\n📦 [${i + 1}/${BUXTON_UNITS.length}] ${config.unit} – ${config.bedrooms}-bed`);
      const out = await seedOneBuxtonUnit(config);
      results.push({ unit: config.unit, ...out });
    }
    console.log('\n✨ Done.');
    results.forEach((r) => console.log(`   ${r.unit}: ${r.propertyId} (${r.imagesInserted} images)`));
  } catch (err) {
    console.error('\n❌ Seed failed:', err.message);
    process.exit(1);
  }
}

main();
