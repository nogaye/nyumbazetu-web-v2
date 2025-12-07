/**
 * Script to upload sample images to Supabase Storage
 * 
 * This script:
 * 1. Fetches placeholder images from Picsum Photos
 * 2. Uploads them to Supabase Storage matching the paths in the database
 * 
 * Usage: npx tsx scripts/upload-sample-images.ts
 */

import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import * as https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error('❌ Missing Supabase credentials!');
  console.error('Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

// Property IDs and their image paths from the database
const properties = [
  {
    id: 'ead8141f-eb6a-4060-bd78-a60d4f5cff39',
    images: ['cover.webp', 'image-1.webp', 'image-2.webp', 'image-3.webp'],
  },
  {
    id: 'e0abde23-cd0f-4bd6-bb72-b2deb55fc2c1',
    images: ['cover.webp', 'image-1.webp', 'image-2.webp', 'image-3.webp', 'image-4.webp'],
  },
  {
    id: '721643c7-6207-4a0c-b0ea-91af0eb68c56',
    images: ['cover.webp', 'image-1.webp', 'image-2.webp'],
  },
  {
    id: '979263ee-949e-4e0d-aa73-5d6b23f94c2d',
    images: ['cover.webp', 'image-1.webp', 'image-2.webp', 'image-3.webp'],
  },
  {
    id: 'acec52f9-d9f5-46ae-be90-65688186d1c7',
    images: ['cover.webp', 'image-1.webp', 'image-2.webp'],
  },
  {
    id: '4a1e7e4e-b2ce-4645-9014-9a06a728a195',
    images: ['cover.webp', 'image-1.webp', 'image-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp'],
  },
  {
    id: 'cc5e5ade-94e1-4c35-9192-db835e36b794',
    images: ['cover.webp', 'image-1.webp', 'image-2.webp', 'image-3.webp'],
  },
  {
    id: 'f5325d4e-8468-453e-935b-6dda480e3fc0',
    images: ['cover.webp', 'image-1.webp', 'image-2.webp'],
  },
  {
    id: '963bb993-71d4-49f2-a721-4aba89cb3b08',
    images: ['cover.webp', 'image-1.webp', 'image-2.webp', 'image-3.webp', 'image-4.webp'],
  },
  {
    id: '9273765c-e394-4c26-87b1-4dd4eeb91a8f',
    images: ['cover.webp', 'image-1.webp', 'image-2.webp'],
  },
];

/**
 * Download an image from a URL
 */
function downloadImage(url: string, filePath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filePath);
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download image: ${response.statusCode}`));
        return;
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filePath, () => {});
      reject(err);
    });
  });
}

/**
 * Upload an image to Supabase Storage
 */
async function uploadImage(propertyId: string, imageName: string, imagePath: string): Promise<void> {
  const storagePath = `property-images/${propertyId}/${imageName}`;
  
  // Read the file
  const fileBuffer = fs.readFileSync(imagePath);
  
  // Upload to Supabase Storage
  const { error } = await supabase.storage
    .from('property-images')
    .upload(storagePath, fileBuffer, {
      contentType: 'image/webp',
      upsert: true, // Overwrite if exists
    });

  if (error) {
    throw new Error(`Failed to upload ${storagePath}: ${error.message}`);
  }

  console.log(`✅ Uploaded: ${storagePath}`);
}

/**
 * Main function
 */
async function main() {
  console.log('🚀 Starting image upload process...\n');

  // Create temp directory
  const tempDir = path.join(__dirname, '../.temp-images');
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }

  try {
    let totalUploaded = 0;
    let totalFailed = 0;

    for (const property of properties) {
      console.log(`\n📦 Processing property: ${property.id}`);
      
      for (let i = 0; i < property.images.length; i++) {
        const imageName = property.images[i];
        const tempFilePath = path.join(tempDir, `${property.id}-${imageName}`);
        
        try {
          // Generate a unique seed for each image based on property ID and image index
          const seed = `${property.id}-${i}`;
          const imageUrl = `https://picsum.photos/seed/${seed}/1200/800`;
          
          // Download image
          console.log(`  📥 Downloading: ${imageName}...`);
          await downloadImage(imageUrl, tempFilePath);
          
          // Upload to Supabase
          await uploadImage(property.id, imageName, tempFilePath);
          
          // Clean up temp file
          fs.unlinkSync(tempFilePath);
          
          totalUploaded++;
        } catch (error) {
          console.error(`  ❌ Error processing ${imageName}:`, error);
          totalFailed++;
          
          // Clean up temp file if it exists
          if (fs.existsSync(tempFilePath)) {
            fs.unlinkSync(tempFilePath);
          }
        }
      }
    }

    // Clean up temp directory
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }

    console.log('\n✨ Upload complete!');
    console.log(`✅ Successfully uploaded: ${totalUploaded} images`);
    if (totalFailed > 0) {
      console.log(`❌ Failed: ${totalFailed} images`);
    }
    console.log('\n🎉 All images are now available in Supabase Storage!');
  } catch (error) {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  }
}

// Run the script
main();

