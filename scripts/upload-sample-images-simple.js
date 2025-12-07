/**
 * Simplified script to upload sample images to Supabase Storage
 * Uploads images directly from URLs without downloading first
 * 
 * Usage: node scripts/upload-sample-images-simple.js
 */

const { createClient } = require('@supabase/supabase-js');
const https = require('https');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error('❌ Missing Supabase credentials!');
  console.error('Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

// Property IDs and their image paths
const properties = [
  { id: 'ead8141f-eb6a-4060-bd78-a60d4f5cff39', images: ['cover.webp', 'image-1.webp', 'image-2.webp', 'image-3.webp'] },
  { id: 'e0abde23-cd0f-4bd6-bb72-b2deb55fc2c1', images: ['cover.webp', 'image-1.webp', 'image-2.webp', 'image-3.webp', 'image-4.webp'] },
  { id: '721643c7-6207-4a0c-b0ea-91af0eb68c56', images: ['cover.webp', 'image-1.webp', 'image-2.webp'] },
  { id: '979263ee-949e-4e0d-aa73-5d6b23f94c2d', images: ['cover.webp', 'image-1.webp', 'image-2.webp', 'image-3.webp'] },
  { id: 'acec52f9-d9f5-46ae-be90-65688186d1c7', images: ['cover.webp', 'image-1.webp', 'image-2.webp'] },
  { id: '4a1e7e4e-b2ce-4645-9014-9a06a728a195', images: ['cover.webp', 'image-1.webp', 'image-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp'] },
  { id: 'cc5e5ade-94e1-4c35-9192-db835e36b794', images: ['cover.webp', 'image-1.webp', 'image-2.webp', 'image-3.webp'] },
  { id: 'f5325d4e-8468-453e-935b-6dda480e3fc0', images: ['cover.webp', 'image-1.webp', 'image-2.webp'] },
  { id: '963bb993-71d4-49f2-a721-4aba89cb3b08', images: ['cover.webp', 'image-1.webp', 'image-2.webp', 'image-3.webp', 'image-4.webp'] },
  { id: '9273765c-e394-4c26-87b1-4dd4eeb91a8f', images: ['cover.webp', 'image-1.webp', 'image-2.webp'] },
];

/**
 * Download image from URL and return as buffer (handles redirects)
 */
function downloadImageBuffer(url) {
  return new Promise((resolve, reject) => {
    const request = https.get(url, (response) => {
      // Follow redirects
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
 * Upload image to Supabase Storage
 */
async function uploadImage(propertyId, imageName, imageUrl) {
  const storagePath = `property-images/${propertyId}/${imageName}`;
  
  try {
    console.log(`  📥 Downloading: ${imageName}...`);
    const imageBuffer = await downloadImageBuffer(imageUrl);
    
    console.log(`  ⬆️  Uploading: ${storagePath}...`);
    const { error } = await supabase.storage
      .from('property-images')
      .upload(storagePath, imageBuffer, {
        contentType: 'image/jpeg',
        upsert: true,
      });

    if (error) {
      throw error;
    }

    console.log(`  ✅ Success: ${storagePath}\n`);
    return true;
  } catch (error) {
    console.error(`  ❌ Error: ${storagePath} - ${error.message}\n`);
    return false;
  }
}

/**
 * Main function
 */
async function main() {
  console.log('🚀 Starting image upload process...\n');
  console.log(`📦 Total properties: ${properties.length}\n`);

  let totalUploaded = 0;
  let totalFailed = 0;

  for (const property of properties) {
    console.log(`📦 Property: ${property.id}`);
    
    for (let i = 0; i < property.images.length; i++) {
      const imageName = property.images[i];
      const seed = `${property.id}-${i}`.replace(/-/g, '').substring(0, 20);
      const imageUrl = `https://picsum.photos/seed/${seed}/1200/800`;
      
      const success = await uploadImage(property.id, imageName, imageUrl);
      if (success) {
        totalUploaded++;
      } else {
        totalFailed++;
      }
      
      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }

  console.log('\n✨ Upload complete!');
  console.log(`✅ Successfully uploaded: ${totalUploaded} images`);
  if (totalFailed > 0) {
    console.log(`❌ Failed: ${totalFailed} images`);
  }
  console.log('\n🎉 Done! Images are now in Supabase Storage.');
}

main().catch(console.error);

