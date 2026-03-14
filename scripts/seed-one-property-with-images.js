/**
 * Seed script: insert realistic properties with 5+ images into the database.
 *
 * When OPENAI_API_KEY is set, generates photo-realistic images of the same Kenyan
 * property via DALL·E 3 so all photos match each listing and location.
 * Otherwise falls back to stock CDN URLs.
 *
 * Usage: node scripts/seed-one-property-with-images.js
 * Requires: .env.local with NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY
 * Optional: OPENAI_API_KEY for same-house Kenyan images
 */

const { createClient } = require('@supabase/supabase-js');
const OpenAI = require('openai').default;
const https = require('https');

require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const openaiApiKey = process.env.OPENAI_API_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error('❌ Missing Supabase credentials.');
  console.error('Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

/**
 * Prefix for DALL·E 3 to maximize photo-realism: real-estate style, no CGI/art.
 */
const PHOTO_REALISTIC_PREFIX =
  'Professional real estate photograph, shot on DSLR camera, natural lighting, high resolution. ' +
  'Realistic photograph of a real property, no illustration or CGI. ';

/**
 * Listing 1: 2-bed apartment, Kilimani. Same-house prompt base for image consistency.
 */
const LISTING_1_SAME_HOUSE_BASE =
  PHOTO_REALISTIC_PREFIX +
  'Same modern two-bedroom apartment in Kilimani, Nairobi, Kenya. ' +
  'Secure compound, East African urban residential style, bright and clean. ';

const LISTING_1_PROMPTS = [
  { label: 'exterior', prompt: `${LISTING_1_SAME_HOUSE_BASE} Exterior view of the apartment building from inside the compound, Kenyan residential architecture, green plants, parking area.` },
  { label: 'living-room', prompt: `${LISTING_1_SAME_HOUSE_BASE} Open-plan living and dining area, sofa, coffee table, large windows, same Kilimani apartment interior.` },
  { label: 'kitchen', prompt: `${LISTING_1_SAME_HOUSE_BASE} Fitted kitchen with built-in cabinets, countertops, same apartment, modern Kenyan home.` },
  { label: 'bedroom', prompt: `${LISTING_1_SAME_HOUSE_BASE} Master bedroom with double bed, wardrobe, en-suite, same apartment, natural light.` },
  { label: 'bathroom', prompt: `${LISTING_1_SAME_HOUSE_BASE} Modern bathroom with tiled walls, sink, toilet, same Kilimani apartment.` },
  { label: 'balcony', prompt: `${LISTING_1_SAME_HOUSE_BASE} Small balcony with view of compound or street, same apartment, Nairobi.` },
];

/**
 * Listing 2: 3-bed house, Lavington. More photo-realistic (HD). Same-house base for consistency.
 */
const LISTING_2_SAME_HOUSE_BASE =
  PHOTO_REALISTIC_PREFIX +
  'Same three-bedroom family house in Lavington, Nairobi, Kenya. ' +
  'Standalone house in a gated compound, Kenyan suburban style, well-maintained, natural daylight. ';

const LISTING_2_PROMPTS = [
  { label: 'exterior', prompt: `${LISTING_2_SAME_HOUSE_BASE} Exterior view of the house from the driveway, Lavington Nairobi, compound gate, garden, real photograph.` },
  { label: 'living-room', prompt: `${LISTING_2_SAME_HOUSE_BASE} Spacious living room, sofa, TV area, same Lavington house interior, real estate photo.` },
  { label: 'kitchen', prompt: `${LISTING_2_SAME_HOUSE_BASE} Fitted kitchen with cabinets and counter, same house, Kenyan home, realistic.` },
  { label: 'bedroom', prompt: `${LISTING_2_SAME_HOUSE_BASE} Master bedroom with double bed and wardrobe, same house, natural light.` },
  { label: 'bathroom', prompt: `${LISTING_2_SAME_HOUSE_BASE} Bathroom with tiles, sink, toilet, same Lavington house.` },
  { label: 'garden', prompt: `${LISTING_2_SAME_HOUSE_BASE} Back garden or compound space, same house, Nairobi suburb.` },
];

/**
 * Fallback: stock CDN URLs when OPENAI_API_KEY is not set.
 */
const FALLBACK_IMAGE_SOURCES = [
  { label: 'exterior', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80' },
  { label: 'living-room', url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80' },
  { label: 'kitchen', url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1200&q=80' },
  { label: 'bedroom', url: 'https://images.pexels.com/photos/2766345/pexels-photo-2766345.jpeg?auto=compress&cs=tinysrgb&w=1200' },
  { label: 'bathroom', url: 'https://images.pexels.com/photos/6782423/pexels-photo-6782423.jpeg?auto=compress&cs=tinysrgb&w=1200' },
  { label: 'extra', url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80' },
];

/**
 * All seed listings: property record + image prompts (when using OpenAI).
 * Each record matches properties table; prompts define same-house room shots.
 */
const SEED_LISTINGS = [
  {
    slug: 'spacious-2-bedroom-kilimani-nairobi-seed',
    record: {
      title: 'Spacious 2-Bedroom Apartment in Kilimani',
      description:
        'Bright and modern two-bedroom apartment in a secure compound. Features an open-plan living and dining area, fitted kitchen with built-in cabinets, two en-suite bedrooms with wardrobes, and a small balcony. Walking distance to shops, restaurants, and public transport. Ideal for professionals or a small family.',
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
    prompts: LISTING_1_PROMPTS,
  },
  {
    slug: '3-bedroom-house-lavington-nairobi-seed',
    record: {
      title: '3-Bedroom Family House in Lavington',
      description:
        'Spacious three-bedroom standalone house in a quiet, gated compound. Open-plan living and dining, fitted kitchen, master en-suite plus two additional bedrooms and a family bathroom. Small garden and parking. Ideal for families. Close to schools and shopping.',
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
    prompts: LISTING_2_PROMPTS,
    /** Use HD for this listing for higher photo realism. */
    useHd: true,
  },
];

/**
 * Generate one photo-realistic image with DALL·E 3.
 * @param {import('openai').OpenAI} openai - OpenAI client.
 * @param {string} prompt - Full image prompt.
 * @param {{ useHd?: boolean }} options - useHd: true for higher quality (slower, more cost).
 * @returns {Promise<Buffer>} PNG image buffer.
 */
async function generateImage(openai, prompt, options = {}) {
  const response = await openai.images.generate({
    model: 'dall-e-3',
    prompt,
    n: 1,
    size: '1792x1024',
    quality: options.useHd ? 'hd' : 'standard',
    style: 'natural',
    response_format: 'b64_json',
  });
  const b64 = response.data?.[0]?.b64_json;
  if (!b64) throw new Error('No image data in DALL·E response');
  return Buffer.from(b64, 'base64');
}

/**
 * Generate all images for one listing (same-house prompts).
 * @param {import('openai').OpenAI} openai - OpenAI client.
 * @param {{ label: string; prompt: string }[]} prompts - Room prompts in gallery order.
 * @param {{ useHd?: boolean }} options - useHd for HD quality.
 * @returns {Promise<Buffer[]>} Array of image buffers in prompt order.
 */
async function generateListingImages(openai, prompts, options = {}) {
  const buffers = [];
  for (let i = 0; i < prompts.length; i++) {
    const { label, prompt } = prompts[i];
    console.log(`  🎨 Generating ${label}...`);
    const buf = await generateImage(openai, prompt, options);
    buffers.push(buf);
    await new Promise((r) => setTimeout(r, 800));
  }
  return buffers;
}

/**
 * Download image from URL and return buffer (follows redirects).
 * Uses a browser-like User-Agent so image CDNs allow the request.
 * @param {string} url - Image URL.
 * @returns {Promise<Buffer>} Image buffer.
 */
function downloadImageBuffer(url) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const options = {
      hostname: parsed.hostname,
      path: parsed.pathname + parsed.search,
      method: 'GET',
      headers: { 'User-Agent': 'Nyumbazetu-Seed/1.0 (property listing seed script)' },
    };
    const request = https.get(options, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        return downloadImageBuffer(response.headers.location).then(resolve).catch(reject);
      }
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download: ${response.statusCode}`));
        return;
      }
      const chunks = [];
      response.on('data', (chunk) => chunks.push(chunk));
      response.on('end', () => resolve(Buffer.concat(chunks)));
    });
    request.on('error', reject);
  });
}

/**
 * Upload one image to Supabase Storage from a buffer or URL.
 * @param {string} propertyId - Property UUID.
 * @param {string} imageName - Filename (e.g. cover.webp, image-1.webp).
 * @param {Buffer | string} source - Image buffer or URL to fetch.
 * @returns {Promise<boolean>} True if upload succeeded.
 */
async function uploadImage(propertyId, imageName, source) {
  const storagePath = `property-images/${propertyId}/${imageName}`;
  try {
    const imageBuffer = Buffer.isBuffer(source) ? source : await downloadImageBuffer(source);
    const contentType = Buffer.isBuffer(source) ? 'image/png' : 'image/jpeg';
    const { error } = await supabase.storage
      .from('property-images')
      .upload(storagePath, imageBuffer, { contentType, upsert: true });
    if (error) throw error;
    return true;
  } catch (err) {
    console.error(`  ❌ Upload failed ${storagePath}:`, err.message);
    return false;
  }
}

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
 * Seed one listing: insert property, generate or fetch images, upload, insert property_images.
 * @param {typeof SEED_LISTINGS[0]} listing - Seed config (slug, record, prompts, useHd).
 * @param {import('openai').OpenAI | null} openai - OpenAI client when key is set.
 * @returns {Promise<{ propertyId: string; imagesInserted: number }>}
 */
async function seedOneListing(listing, openai) {
  const { slug, record, prompts } = listing;
  const useGenerated = Boolean(openaiApiKey && openai);

  await deleteExistingBySlug(slug);

  const insertPayload = { ...record, slug };
  const { data: property, error: insertError } = await supabase
    .from('properties')
    .insert(insertPayload)
    .select('id')
    .single();

  if (insertError) throw new Error(`Failed to insert property: ${insertError.message}`);

  const propertyId = property.id;
  const imageCount = useGenerated ? prompts.length : FALLBACK_IMAGE_SOURCES.length;
  const imageNames = [...Array(imageCount)].map((_, i) =>
    i === 0 ? 'cover.webp' : `image-${i}.webp`
  );

  if (useGenerated) {
    const useHd = Boolean(listing.useHd);
    if (useHd) console.log('  (DALL·E 3 HD quality for this listing.)');
    const buffers = await generateListingImages(openai, prompts, { useHd });
    for (let i = 0; i < buffers.length; i++) {
      const label = prompts[i].label;
      console.log(`  📤 Uploading ${imageNames[i]} (${label})...`);
      const ok = await uploadImage(propertyId, imageNames[i], buffers[i]);
      if (!ok) throw new Error(`Upload failed for ${imageNames[i]}`);
    }
  } else {
    for (let i = 0; i < FALLBACK_IMAGE_SOURCES.length; i++) {
      const { label, url } = FALLBACK_IMAGE_SOURCES[i];
      console.log(`  📤 Uploading ${imageNames[i]} (${label})...`);
      const ok = await uploadImage(propertyId, imageNames[i], url);
      if (!ok) throw new Error(`Upload failed for ${imageNames[i]}`);
      await new Promise((r) => setTimeout(r, 400));
    }
  }

  const imageRows = imageNames.map((name, index) => ({
    property_id: propertyId,
    storage_path: `property-images/${propertyId}/${name}`,
    is_cover: index === 0,
    position: index,
  }));

  const { error: imagesError } = await supabase.from('property_images').insert(imageRows);
  if (imagesError) throw new Error(`Failed to insert property_images: ${imagesError.message}`);

  console.log(`  ✅ Inserted ${imageRows.length} image records.`);
  return { propertyId, imagesInserted: imageRows.length };
}

async function main() {
  const useGenerated = Boolean(openaiApiKey);
  console.log(
    `🚀 Seeding ${SEED_LISTINGS.length} propert${SEED_LISTINGS.length === 1 ? 'y' : 'ies'}${useGenerated ? ' (same-house Kenyan, DALL·E 3)' : ' (stock fallback)'}...\n`
  );
  if (!useGenerated) {
    console.log('  (Set OPENAI_API_KEY in .env.local for same-house Kenyan images.)\n');
  }

  const openai = useGenerated ? new OpenAI({ apiKey: openaiApiKey }) : null;

  try {
    const results = [];
    for (let i = 0; i < SEED_LISTINGS.length; i++) {
      const listing = SEED_LISTINGS[i];
      console.log(`\n📦 [${i + 1}/${SEED_LISTINGS.length}] ${listing.record.title} (${listing.slug})`);
      const out = await seedOneListing(listing, openai);
      results.push({ slug: listing.slug, ...out });
    }
    console.log('\n✨ Done.');
    results.forEach((r) => console.log(`   ${r.slug}: ${r.propertyId} (${r.imagesInserted} images)`));
  } catch (err) {
    console.error('\n❌ Seed failed:', err.message);
    process.exit(1);
  }
}

main();
