/**
 * Test script - uploads just ONE image to verify the setup works
 * Run this first to make sure everything is configured correctly
 */

const { createClient } = require('@supabase/supabase-js');
const https = require('https');

require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error('❌ Missing credentials!');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

// Test with just one property
const testProperty = {
  id: 'ead8141f-eb6a-4060-bd78-a60d4f5cff39',
  image: 'cover.webp'
};

function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const request = https.get(url, (res) => {
      // Follow redirects
      if (res.statusCode === 301 || res.statusCode === 302) {
        return downloadImage(res.headers.location).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode}`));
        return;
      }
      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    });
    request.on('error', reject);
  });
}

async function test() {
  console.log('🧪 Testing image upload...\n');
  
  const storagePath = `property-images/${testProperty.id}/${testProperty.image}`;
  const imageUrl = 'https://picsum.photos/1200/800';
  
  try {
    console.log('📥 Downloading test image...');
    const buffer = await downloadImage(imageUrl);
    
    console.log('⬆️  Uploading to Supabase...');
    const { data, error } = await supabase.storage
      .from('property-images')
      .upload(storagePath, buffer, {
        contentType: 'image/jpeg',
        upsert: true,
      });

    if (error) {
      console.error('❌ Error:', error.message);
      process.exit(1);
    }

    console.log('✅ Success!');
    console.log(`\n📸 Test the image at:`);
    console.log(`https://${supabaseUrl.replace('https://', '')}/storage/v1/object/public/${storagePath}\n`);
    console.log('🎉 If you can see the image, the setup is working!');
  } catch (error) {
    console.error('❌ Failed:', error.message);
    process.exit(1);
  }
}

test();

